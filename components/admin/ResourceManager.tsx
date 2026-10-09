'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageIcon, Pencil, Plus, Search, Trash2, Upload, X } from 'lucide-react';

type FieldBase = { name: string; label: string; help?: string; /** setengah lebar di layar lebar */ half?: boolean };

export type Field = FieldBase & (
  | { type: 'text' | 'date'; required?: boolean; placeholder?: string }
  | { type: 'textarea'; required?: boolean; placeholder?: string; rows?: number }
  | { type: 'select'; options: string[] }
  | { type: 'image' }
  | { type: 'checkbox' }
  | { type: 'people' }
);

export interface Column {
  name: string;
  label: string;
}

type Person = { nama: string; kelas: string };

interface Props {
  title: string;
  /** Kalimat pendek di bawah judul halaman. */
  description?: string;
  singular: string;
  endpoint: string; // '/api/admin/berita'
  fields: Field[];
  /** Kolom tabel. Kolom pertama jadi kolom utama (tebal + gambar mini). */
  columns: Column[];
  emptyRow: Record<string, unknown>;
  rowKey?: string; // default 'id'
  /** Nama field gambar untuk thumbnail di kolom utama. */
  imageField?: string;
  /** Field yang ikut dicari di kotak pencarian (default: semua kolom). */
  searchFields?: string[];
}

type Row = Record<string, unknown>;
type Filter = 'semua' | 'tayang' | 'draft';

const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

/** Baca body respons sebagai JSON; kalau server membalas HTML/teks (mis. error 500), jangan crash. */
async function readBody(res: Response): Promise<{ error?: string } & Record<string, unknown>> {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

/** Ambil daftar data. Lempar Error('401') kalau sesi admin habis. */
async function fetchRows(endpoint: string): Promise<Row[]> {
  const res = await fetch(endpoint, { cache: 'no-store' });
  if (res.status === 401) throw new Error('401');
  const data = await readBody(res);
  if (!res.ok) throw new Error(data.error || `Gagal memuat data (kode ${res.status}).`);
  return Array.isArray(data) ? data : [];
}

/** Tampilkan nilai sel: tanggal jadi "11 Sep 2026", daftar siswa jadi "Nama — Kelas, ...". */
function cellText(v: unknown): string {
  if (Array.isArray(v)) {
    return (v as Person[]).map((p) => [p.nama, p.kelas].filter(Boolean).join(' — ')).filter(Boolean).join(', ') || '—';
  }
  const s = String(v ?? '').trim();
  const d = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (d) return `${Number(d[3])} ${BULAN[Number(d[2]) - 1]} ${d[1]}`;
  return s || '—';
}

export default function ResourceManager({
  title, description, singular, endpoint, fields, columns, emptyRow, rowKey = 'id', imageField, searchFields,
}: Props) {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Row | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState<string | null>(null);
  const [listError, setListError] = useState('');
  const [notice, setNotice] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('semua');
  const formTop = useRef<HTMLDivElement>(null);

  const handle401 = useCallback((res: Response) => {
    if (res.status === 401) {
      router.push('/admin/login');
      return true;
    }
    return false;
  }, [router]);

  const onRows = useCallback((r: Row[]) => {
    setRows(r);
    setListError('');
    setLoading(false);
  }, []);

  const onRowsError = useCallback((e: unknown) => {
    if (e instanceof Error && e.message === '401') { router.push('/admin/login'); return; }
    setListError(e instanceof Error ? e.message : 'Gagal memuat data.');
    setLoading(false);
  }, [router]);

  const load = useCallback(() => fetchRows(endpoint).then(onRows, onRowsError), [endpoint, onRows, onRowsError]);

  useEffect(() => {
    fetchRows(endpoint).then(onRows, onRowsError);
  }, [endpoint, onRows, onRowsError]);

  const scrollToForm = () =>
    setTimeout(() => formTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);

  const startCreate = () => {
    setNotice('');
    setEditingId(null);
    setForm({ ...emptyRow });
    setError('');
    scrollToForm();
  };

  const startEdit = (row: Row) => {
    setNotice('');
    setEditingId(String(row[rowKey]));
    setForm({ ...emptyRow, ...row });
    setError('');
    scrollToForm();
  };

  const cancel = useCallback(() => { setForm(null); setEditingId(null); setError(''); }, []);

  // Esc menutup form
  useEffect(() => {
    if (!form) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !saving) cancel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [form, saving, cancel]);

  const setField = (name: string, value: unknown) =>
    setForm((f) => (f ? { ...f, [name]: value } : f));

  const uploadImage = async (name: string, file: File) => {
    setUploading(name);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/media', { method: 'POST', body: fd });
      if (handle401(res)) return;
      const data = await readBody(res);
      if (!res.ok) throw new Error(data.error || `Upload gagal (kode ${res.status}).`);
      setField(name, data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload gagal');
    } finally {
      setUploading(null);
    }
  };

  const save = async () => {
    if (!form) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch(editingId ? `${endpoint}/${editingId}` : endpoint, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (handle401(res)) return;
      const data = await readBody(res);
      if (!res.ok) throw new Error(data.error || `Gagal menyimpan (kode ${res.status}).`);
      const wasEditing = !!editingId;
      cancel();
      setNotice(wasEditing ? 'Perubahan tersimpan.' : `${singular[0].toUpperCase()}${singular.slice(1)} baru tersimpan.`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: Row) => {
    if (!confirm(`Hapus "${String(row[columns[0].name] ?? '')}"?\nData yang dihapus tidak bisa dikembalikan.`)) return;
    const id = String(row[rowKey]);
    setDeleting(id);
    setListError('');
    setNotice('');
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
      if (handle401(res)) return;
      const data = await readBody(res);
      if (!res.ok) throw new Error(data.error || `Gagal menghapus (kode ${res.status}).`);
      if (editingId === id) cancel();
      setNotice('Data terhapus.');
      await load();
    } catch (e) {
      setListError(e instanceof Error ? e.message : 'Gagal menghapus.');
    } finally {
      setDeleting(null);
    }
  };

  const formTitle = useMemo(
    () => (editingId ? `Edit ${singular}` : `Tambah ${singular}`),
    [editingId, singular],
  );

  const hasStatus = columns.some((c) => c.name === 'published');
  const counts = useMemo(() => ({
    semua: rows.length,
    tayang: rows.filter((r) => r.published !== false).length,
    draft: rows.filter((r) => r.published === false).length,
  }), [rows]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const keys = searchFields ?? columns.map((c) => c.name);
    return rows.filter((r) => {
      if (filter === 'tayang' && r.published === false) return false;
      if (filter === 'draft' && r.published !== false) return false;
      if (!q) return true;
      return keys.some((k) => cellText(r[k]).toLowerCase().includes(q));
    });
  }, [rows, query, filter, columns, searchFields]);

  const [mainCol, ...restCols] = columns;

  return (
    <div>
      <div className="adm-head">
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        {!form && (
          <button className="adm-btn adm-btn-primary" onClick={startCreate}>
            <Plus size={16} aria-hidden="true" /> Tambah {singular}
          </button>
        )}
      </div>

      {notice && <div className="adm-notice">{notice}</div>}

      <div ref={formTop} style={{ scrollMarginTop: 90 }} />

      {form && (
        <div className="adm-card adm-form">
          <div className="adm-form-head">
            <h2>{formTitle}</h2>
            <button type="button" className="adm-close" onClick={cancel} disabled={saving} aria-label="Tutup form" title="Tutup (Esc)">
              <X size={16} />
            </button>
          </div>

          <div className="adm-form-body">
            {error && <div className="adm-error">{error}</div>}

            <div className="adm-form-grid">
              {fields.map((f) => (
                <div className={`adm-field${f.half ? ' adm-field-half' : ''}`} key={f.name}>
                  {f.type !== 'checkbox' && (
                    <label htmlFor={`fld-${f.name}`}>
                      {f.label}
                      {'required' in f && f.required ? <span className="adm-req"> *</span> : null}
                    </label>
                  )}

                  {f.type === 'text' || f.type === 'date' ? (
                    <input
                      id={`fld-${f.name}`}
                      type={f.type === 'date' ? 'date' : 'text'}
                      value={String(form[f.name] ?? '')}
                      placeholder={f.placeholder}
                      onChange={(e) => setField(f.name, e.target.value)}
                    />
                  ) : f.type === 'textarea' ? (
                    <textarea
                      id={`fld-${f.name}`}
                      rows={f.rows ?? 4}
                      value={String(form[f.name] ?? '')}
                      placeholder={f.placeholder}
                      onChange={(e) => setField(f.name, e.target.value)}
                    />
                  ) : f.type === 'select' ? (
                    <select id={`fld-${f.name}`} value={String(form[f.name] ?? '')} onChange={(e) => setField(f.name, e.target.value)}>
                      {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : f.type === 'checkbox' ? (
                    <>
                      <label style={{ fontSize: 12.5, fontWeight: 700, color: '#374151' }}>{f.label}</label>
                      <label className="adm-check">
                        <input
                          type="checkbox"
                          checked={form[f.name] !== false}
                          onChange={(e) => setField(f.name, e.target.checked)}
                        />
                        <span className="adm-switch" aria-hidden="true" />
                        <span>{form[f.name] !== false ? 'Tayang di situs' : 'Draft (disembunyikan)'}</span>
                      </label>
                    </>
                  ) : f.type === 'people' ? (
                    (() => {
                      const people: Person[] = Array.isArray(form[f.name]) ? (form[f.name] as Person[]) : [];
                      const setPeople = (arr: Person[]) => setField(f.name, arr);
                      return (
                        <div>
                          {people.map((p, i) => (
                            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                              <input
                                className="adm-input"
                                style={{ flex: 2, minWidth: 0 }}
                                placeholder="contoh : keisya naila azmika"
                                value={p.nama}
                                onChange={(e) => setPeople(people.map((x, j) => (j === i ? { ...x, nama: e.target.value } : x)))}
                              />
                              <input
                                className="adm-input"
                                style={{ flex: 1, minWidth: 0 }}
                                placeholder="Kelas (mis. XI PPLG 1)"
                                value={p.kelas}
                                onChange={(e) => setPeople(people.map((x, j) => (j === i ? { ...x, kelas: e.target.value } : x)))}
                              />
                              <button
                                type="button"
                                className="adm-btn adm-btn-danger"
                                style={{ flexShrink: 0, padding: '6px 10px' }}
                                onClick={() => setPeople(people.filter((_, j) => j !== i))}
                                aria-label={`Hapus siswa ${i + 1}`}
                                title="Hapus siswa"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="adm-btn adm-btn-ghost adm-btn-sm"
                            onClick={() => setPeople([...people, { nama: '', kelas: '' }])}
                          >
                            <Plus size={14} aria-hidden="true" /> Tambah siswa
                          </button>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="adm-img-field">
                      <div className="adm-img-box">
                        {form[f.name] ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={String(form[f.name])} alt="Pratinjau" />
                        ) : (
                          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                            <ImageIcon size={22} aria-hidden="true" />
                            Belum ada gambar
                          </span>
                        )}
                      </div>
                      <div className="adm-img-side">
                        <div className="adm-img-actions">
                          <label className={`adm-btn adm-btn-ghost adm-btn-sm${uploading ? ' is-busy' : ''}`}>
                            <Upload size={14} aria-hidden="true" />
                            {uploading === f.name ? 'Mengupload…' : (form[f.name] ? 'Ganti gambar' : 'Upload gambar')}
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              disabled={!!uploading}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) uploadImage(f.name, file);
                                e.target.value = '';
                              }}
                            />
                          </label>
                          {form[f.name] ? (
                            <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setField(f.name, '')}>
                              Hapus gambar
                            </button>
                          ) : null}
                        </div>
                        <input
                          id={`fld-${f.name}`}
                          className="adm-input"
                          type="text"
                          placeholder="atau tempel URL / path gambar"
                          value={String(form[f.name] ?? '')}
                          onChange={(e) => setField(f.name, e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {f.help ? <small>{f.help}</small> : null}
                </div>
              ))}
            </div>
          </div>

          <div className="adm-form-actions">
            <button className="adm-btn adm-btn-primary" onClick={save} disabled={saving || !!uploading}>
              {saving ? 'Menyimpan…' : editingId ? 'Simpan perubahan' : `Simpan ${singular}`}
            </button>
            <button className="adm-btn adm-btn-ghost" onClick={cancel} disabled={saving}>Batal</button>
          </div>
        </div>
      )}

      <div className="adm-card adm-card-flush">
        {listError && <div className="adm-error" style={{ margin: 16 }}>{listError}</div>}

        {!loading && rows.length > 0 && (
          <div className="adm-toolbar">
            <label className="adm-search">
              <Search size={15} aria-hidden="true" />
              <input
                type="search"
                placeholder={`Cari ${singular}…`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={`Cari ${singular}`}
              />
            </label>
            {hasStatus && (
              <div className="adm-seg" role="group" aria-label="Filter status">
                {(['semua', 'tayang', 'draft'] as Filter[]).map((k) => (
                  <button key={k} type="button" className={filter === k ? 'is-on' : ''} onClick={() => setFilter(k)}>
                    {k === 'semua' ? 'Semua' : k === 'tayang' ? 'Tayang' : 'Draft'} ({counts[k]})
                  </button>
                ))}
              </div>
            )}
            <span className="adm-count">
              {visible.length === rows.length ? `${rows.length} ${singular}` : `${visible.length} dari ${rows.length} ${singular}`}
            </span>
          </div>
        )}

        {loading ? (
          <div className="adm-empty">Memuat…</div>
        ) : rows.length === 0 ? (
          !listError && (
            <div className="adm-empty">
              <strong>Belum ada {singular}</strong>
              Klik &ldquo;Tambah {singular}&rdquo; untuk membuat yang pertama.
            </div>
          )
        ) : visible.length === 0 ? (
          <div className="adm-empty">
            <strong>Tidak ada yang cocok</strong>
            Coba kata kunci lain atau ubah filter status.
          </div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table adm-table-cards">
              <thead>
                <tr>
                  {columns.map((c) => <th key={c.name}>{c.label}</th>)}
                  <th className="adm-col-actions"><span className="sr-only">Aksi</span></th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => {
                  const id = String(row[rowKey]);
                  const img = imageField ? String(row[imageField] ?? '') : '';
                  return (
                    <tr key={id} className={editingId === id ? 'is-editing' : ''}>
                      <td className="adm-td-main" data-label={mainCol.label}>
                        <div className="adm-cell-main">
                          {imageField && (
                            img
                              /* eslint-disable-next-line @next/next/no-img-element */
                              ? <img src={img} alt="" className="adm-thumb" loading="lazy" />
                              : <span className="adm-thumb adm-thumb-empty"><ImageIcon size={16} aria-hidden="true" /></span>
                          )}
                          <strong>{cellText(row[mainCol.name])}</strong>
                        </div>
                      </td>
                      {restCols.map((c) => (
                        <td key={c.name} data-label={c.label} className={c.name === 'published' || c.name === 'kategori' || c.name === 'tanggal' ? 'adm-td-inline' : ''}>
                          {c.name === 'published'
                            ? (row[c.name] === false
                              ? <span className="adm-tag adm-tag-off">Draft</span>
                              : <span className="adm-tag adm-tag-on">Tayang</span>)
                            : cellText(row[c.name])}
                        </td>
                      ))}
                      <td className="adm-col-actions">
                        <div className="adm-row-actions">
                          <button className="adm-btn adm-btn-ghost" onClick={() => startEdit(row)}>
                            <Pencil size={14} aria-hidden="true" /> Edit
                          </button>
                          <button className="adm-btn adm-btn-danger" onClick={() => remove(row)} disabled={deleting === id}>
                            <Trash2 size={14} aria-hidden="true" /> {deleting === id ? 'Menghapus…' : 'Hapus'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}`}</style>
    </div>
  );
}
