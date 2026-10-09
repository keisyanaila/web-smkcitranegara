'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';
import { STATUS_LABEL, formatTanggalRange, statusGelombang } from '@/lib/spmb';
import { MAX_GELOMBANG, normalizeSpmb, validateSpmb, type Gelombang, type SpmbJadwal } from '@/lib/spmbData';

type Loaded = SpmbJadwal & { sumber?: 'database' | 'bawaan'; updatedAt?: string };

/** Tambah n hari ke tanggal "YYYY-MM-DD". */
function addDays(iso: string, n: number) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return '';
  d.setDate(d.getDate() + n);
  const p = (x: number) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

async function readBody(res: Response): Promise<Record<string, unknown>> {
  try { return JSON.parse(await res.text()); } catch { return {}; }
}

const UNAUTHORIZED = 'unauthorized';

/** Ambil jadwal untuk form; lempar Error(UNAUTHORIZED) kalau sesi admin habis. */
async function fetchJadwal(): Promise<Loaded> {
  const res = await fetch('/api/admin/spmb', { cache: 'no-store' });
  if (res.status === 401) throw new Error(UNAUTHORIZED);
  const data = await readBody(res);
  if (!res.ok) throw new Error(String(data.error || `Gagal memuat (kode ${res.status}).`));
  return data as unknown as Loaded;
}

export default function AdminSpmbPage() {
  const router = useRouter();
  const [form, setForm] = useState<SpmbJadwal | null>(null);
  const [meta, setMeta] = useState<{ sumber?: string; updatedAt?: string }>({});
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  const onLoaded = useCallback((d: Loaded) => {
    const { sumber, updatedAt, ...rest } = d;
    setForm(normalizeSpmb(rest));
    setMeta({ sumber, updatedAt });
    setDirty(false);
    setLoadError('');
  }, []);

  const onLoadError = useCallback((e: unknown) => {
    if (e instanceof Error && e.message === UNAUTHORIZED) { router.push('/admin/login'); return; }
    setLoadError(e instanceof Error ? e.message : 'Gagal memuat jadwal.');
  }, [router]);

  const load = () => fetchJadwal().then(onLoaded, onLoadError);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setNow(new Date()));
    fetchJadwal().then(onLoaded, onLoadError);
    return () => cancelAnimationFrame(raf);
  }, [onLoaded, onLoadError]);

  const errors = useMemo(() => (form ? validateSpmb(form) : []), [form]);

  const update = (fn: (f: SpmbJadwal) => SpmbJadwal) => {
    setForm((f) => (f ? fn(f) : f));
    setDirty(true);
    setNotice('');
    setSaveError('');
  };

  const setG = (i: number, patch: Partial<Gelombang>) =>
    update((f) => ({ ...f, gelombang: f.gelombang.map((g, j) => (j === i ? { ...g, ...patch } : g)) }));

  const addG = () =>
    update((f) => {
      const last = f.gelombang[f.gelombang.length - 1];
      const mulai = last?.selesai ? addDays(last.selesai, 1) : '';
      return {
        ...f,
        gelombang: [...f.gelombang, { nama: `Gelombang ${f.gelombang.length + 1}`, mulai, selesai: mulai ? addDays(mulai, 60) : '' }],
      };
    });

  const removeG = (i: number) => update((f) => ({ ...f, gelombang: f.gelombang.filter((_, j) => j !== i) }));

  const save = async () => {
    if (!form || errors.length) return;
    setSaving(true);
    setSaveError('');
    setNotice('');
    try {
      const res = await fetch('/api/admin/spmb', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await readBody(res);
      if (!res.ok) throw new Error(String(data.error || `Gagal menyimpan (kode ${res.status}).`));
      onLoaded(data as unknown as Loaded);
      setNotice('Jadwal tersimpan. Beranda situs langsung memakai jadwal ini.');
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Gagal menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="adm-head">
        <div>
          <h1>Jadwal SPMB</h1>
          <p>Tahun ajaran &amp; gelombang ini tampil di Beranda (kartu &ldquo;Jadwal SPMB&rdquo;).</p>
        </div>
      </div>

      {loadError && <div className="adm-error">{loadError}</div>}
      {notice && <div className="adm-notice">{notice}</div>}

      {!form ? (
        !loadError && <div className="adm-card"><p className="adm-muted">Memuat…</p></div>
      ) : (
        <div className="adm-card">
          <p className="adm-muted" style={{ marginBottom: 16 }}>
            {meta.sumber === 'database'
              ? `Terakhir disimpan: ${meta.updatedAt ?? '-'}.`
              : 'Belum pernah disimpan dari admin — yang tampil di situs saat ini adalah jadwal bawaan di bawah. Klik Simpan untuk mulai memakai jadwal dari admin.'}
            {' '}Status (Selesai / Sedang Berlangsung / Akan Datang) dihitung otomatis dari tanggal hari ini.
          </p>

          <div className="adm-field" style={{ maxWidth: 220 }}>
            <label>Tahun ajaran *</label>
            <input
              type="text"
              value={form.tahunAjaran}
              placeholder="2027/2028"
              onChange={(e) => update((f) => ({ ...f, tahunAjaran: e.target.value }))}
            />
            <small>Format: 2027/2028</small>
          </div>

          <div className="adm-field">
            <label>Gelombang pendaftaran *</label>
            <div className="adm-table-wrap spmb-wrap">
              <table className="adm-table adm-table-cards spmb-table">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Mulai</th>
                    <th>Selesai</th>
                    <th>Status</th>
                    <th className="adm-col-actions"><span className="sr-only">Aksi</span></th>
                  </tr>
                </thead>
                <tbody>
                  {form.gelombang.map((g, i) => {
                    const valid = /^\d{4}-\d{2}-\d{2}$/.test(g.mulai) && /^\d{4}-\d{2}-\d{2}$/.test(g.selesai) && g.selesai >= g.mulai;
                    const st = valid && now ? statusGelombang(g.mulai, g.selesai, now) : null;
                    return (
                      <tr key={i}>
                        <td data-label="Nama"><input type="text" aria-label="Nama gelombang" value={g.nama} onChange={(e) => setG(i, { nama: e.target.value })} /></td>
                        <td data-label="Mulai"><input type="date" aria-label="Tanggal mulai" value={g.mulai} onChange={(e) => setG(i, { mulai: e.target.value })} /></td>
                        <td data-label="Selesai"><input type="date" aria-label="Tanggal selesai" value={g.selesai} onChange={(e) => setG(i, { selesai: e.target.value })} /></td>
                        <td data-label="Status">
                          {st ? (
                            <span className={`adm-tag ${st === 'berlangsung' ? 'adm-tag-on' : 'adm-tag-off'}`} title={formatTanggalRange(g.mulai, g.selesai)}>
                              {STATUS_LABEL[st]}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="adm-col-actions">
                          <div className="adm-row-actions">
                            <button type="button" className="adm-btn adm-btn-danger" onClick={() => removeG(i)} disabled={form.gelombang.length <= 1}>
                              <Trash2 size={14} aria-hidden="true" /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <button type="button" className="adm-btn adm-btn-ghost" onClick={addG} disabled={form.gelombang.length >= MAX_GELOMBANG} style={{ marginTop: 8 }}>
                <Plus size={14} aria-hidden="true" /> Tambah gelombang
              </button>
            </div>
            <small>Urutan gelombang otomatis mengikuti tanggal mulai setelah disimpan. Gelombang boleh bersambung di hari yang sama, tapi tidak boleh tumpang tindih.</small>
          </div>

          {errors.length > 0 && (
            <div className="adm-error">
              <strong>Perbaiki dulu sebelum menyimpan:</strong>
              <ul style={{ margin: '6px 0 0 18px' }}>{errors.map((e) => <li key={e}>{e}</li>)}</ul>
            </div>
          )}
          {saveError && <div className="adm-error">{saveError}</div>}

          <div className="adm-form-actions">
            <button className="adm-btn adm-btn-primary" onClick={save} disabled={saving || errors.length > 0 || (!dirty && meta.sumber === 'database')}>
              {saving ? 'Menyimpan…' : 'Simpan'}
            </button>
            <button className="adm-btn adm-btn-ghost" onClick={load} disabled={saving || !dirty}>Batalkan perubahan</button>
          </div>
        </div>
      )}

      <style>{`
        .spmb-table input { width: 100%; min-width: 130px; padding: 8px 10px; border: 1.5px solid #d1d5db; border-radius: 8px; font-size: 13.5px; font-family: inherit; color: #0A1628; background: #fff; }
        .spmb-table input:focus { outline: none; border-color: #C8973A; box-shadow: 0 0 0 3px rgba(200,151,58,0.15); }
        .spmb-table td { vertical-align: middle; }
        .spmb-wrap { border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
        @media (max-width: 760px) { .spmb-table input { min-width: 0; } }
      `}</style>
    </div>
  );
}
