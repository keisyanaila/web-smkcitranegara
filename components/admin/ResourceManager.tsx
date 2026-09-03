'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export type Field =
  | { name: string; label: string; type: 'text' | 'date'; required?: boolean; placeholder?: string; help?: string }
  | { name: string; label: string; type: 'textarea'; required?: boolean; placeholder?: string; help?: string; rows?: number }
  | { name: string; label: string; type: 'select'; options: string[]; help?: string }
  | { name: string; label: string; type: 'image'; help?: string }
  | { name: string; label: string; type: 'checkbox'; help?: string }
  | { name: string; label: string; type: 'people'; help?: string };

type Person = { nama: string; kelas: string };

interface Props {
  title: string;
  singular: string;
  endpoint: string; // '/api/admin/berita'
  fields: Field[];
  columns: { name: string; label: string }[];
  emptyRow: Record<string, unknown>;
  rowKey?: string; // default 'id'
}

type Row = Record<string, unknown>;

export default function ResourceManager({
  title, singular, endpoint, fields, columns, emptyRow, rowKey = 'id',
}: Props) {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Row | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState<string | null>(null);
  const formTop = useRef<HTMLDivElement>(null);

  const handle401 = useCallback((res: Response) => {
    if (res.status === 401) {
      router.push('/admin/login');
      return true;
    }
    return false;
  }, [router]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (handle401(res)) return;
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch {
      setError('Gagal memuat data.');
    } finally {
      setLoading(false);
    }
  }, [endpoint, handle401]);

  useEffect(() => { load(); }, [load]);

  const startCreate = () => {
    setEditingId(null);
    setForm({ ...emptyRow });
    setError('');
    setTimeout(() => formTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  const startEdit = (row: Row) => {
    setEditingId(String(row[rowKey]));
    setForm({ ...emptyRow, ...row });
    setError('');
    setTimeout(() => formTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  const cancel = () => { setForm(null); setEditingId(null); setError(''); };

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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload gagal');
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
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan');
      cancel();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: Row) => {
    if (!confirm(`Hapus "${String(row[columns[0].name] ?? '')}"?`)) return;
    const res = await fetch(`${endpoint}/${row[rowKey]}`, { method: 'DELETE' });
    if (handle401(res)) return;
    await load();
  };

  const formTitle = useMemo(
    () => (editingId ? `Edit ${singular}` : `Tambah ${singular}`),
    [editingId, singular],
  );

  return (
    <div>
      <div className="adm-head">
        <h1>{title}</h1>
        {!form && (
          <button className="adm-btn adm-btn-primary" onClick={startCreate}>+ Tambah {singular}</button>
        )}
      </div>

      <div ref={formTop} />

      {form && (
        <div className="adm-card adm-form">
          <h2>{formTitle}</h2>
          {error && <div className="adm-error">{error}</div>}

          {fields.map((f) => (
            <div className="adm-field" key={f.name}>
              <label>{f.label}{'required' in f && f.required ? ' *' : ''}</label>

              {f.type === 'text' || f.type === 'date' ? (
                <input
                  type={f.type === 'date' ? 'date' : 'text'}
                  value={String(form[f.name] ?? '')}
                  placeholder={f.placeholder}
                  onChange={(e) => setField(f.name, e.target.value)}
                />
              ) : f.type === 'textarea' ? (
                <textarea
                  rows={f.rows ?? 4}
                  value={String(form[f.name] ?? '')}
                  placeholder={f.placeholder}
                  onChange={(e) => setField(f.name, e.target.value)}
                />
              ) : f.type === 'select' ? (
                <select value={String(form[f.name] ?? '')} onChange={(e) => setField(f.name, e.target.value)}>
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === 'checkbox' ? (
                <label className="adm-check">
                  <input
                    type="checkbox"
                    checked={form[f.name] !== false}
                    onChange={(e) => setField(f.name, e.target.checked)}
                  />
                  <span>Tampilkan di situs</span>
                </label>
              ) : f.type === 'people' ? (
                (() => {
                  const people: Person[] = Array.isArray(form[f.name]) ? (form[f.name] as Person[]) : [];
                  const setPeople = (arr: Person[]) => setField(f.name, arr);
                  return (
                    <div>
                      {people.map((p, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                          <input
                            style={{ flex: 2 }}
                            placeholder="Nama siswa"
                            value={p.nama}
                            onChange={(e) => setPeople(people.map((x, j) => (j === i ? { ...x, nama: e.target.value } : x)))}
                          />
                          <input
                            style={{ flex: 1 }}
                            placeholder="Kelas (mis. XI PPLG 1)"
                            value={p.kelas}
                            onChange={(e) => setPeople(people.map((x, j) => (j === i ? { ...x, kelas: e.target.value } : x)))}
                          />
                          <button
                            type="button"
                            className="adm-btn adm-btn-danger"
                            style={{ flexShrink: 0, padding: '6px 12px' }}
                            onClick={() => setPeople(people.filter((_, j) => j !== i))}
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="adm-btn adm-btn-ghost"
                        onClick={() => setPeople([...people, { nama: '', kelas: '' }])}
                      >
                        + Tambah siswa
                      </button>
                    </div>
                  );
                })()
              ) : (
                <div className="adm-img-field">
                  {form[f.name] ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={String(form[f.name])} alt="" className="adm-img-preview" />
                  ) : null}
                  <div className="adm-img-actions">
                    <label className="adm-btn adm-btn-ghost">
                      {uploading === f.name ? 'Mengupload…' : (form[f.name] ? 'Ganti gambar' : 'Upload gambar')}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadImage(f.name, file);
                          e.target.value = '';
                        }}
                      />
                    </label>
                    {form[f.name] ? (
                      <button className="adm-btn adm-btn-ghost" onClick={() => setField(f.name, '')}>Hapus gambar</button>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    placeholder="atau tempel URL / path gambar"
                    value={String(form[f.name] ?? '')}
                    onChange={(e) => setField(f.name, e.target.value)}
                  />
                </div>
              )}

              {'help' in f && f.help ? <small>{f.help}</small> : null}
            </div>
          ))}

          <div className="adm-form-actions">
            <button className="adm-btn adm-btn-primary" onClick={save} disabled={saving || !!uploading}>
              {saving ? 'Menyimpan…' : 'Simpan'}
            </button>
            <button className="adm-btn adm-btn-ghost" onClick={cancel} disabled={saving}>Batal</button>
          </div>
        </div>
      )}

      <div className="adm-card">
        {loading ? (
          <p className="adm-muted">Memuat…</p>
        ) : rows.length === 0 ? (
          <p className="adm-muted">Belum ada data. Klik “Tambah {singular}”.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  {columns.map((c) => <th key={c.name}>{c.label}</th>)}
                  <th style={{ width: 140 }}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={String(row[rowKey])}>
                    {columns.map((c) => (
                      <td key={c.name}>
                        {c.name === 'published'
                          ? (row[c.name] === false ? <span className="adm-tag adm-tag-off">Draft</span> : <span className="adm-tag adm-tag-on">Tayang</span>)
                          : Array.isArray(row[c.name])
                            ? (row[c.name] as Person[]).map((p) => [p.nama, p.kelas].filter(Boolean).join(' — ')).filter(Boolean).join(', ') || '—'
                            : String(row[c.name] ?? '')}
                      </td>
                    ))}
                    <td className="adm-row-actions">
                      <button className="adm-btn adm-btn-ghost" onClick={() => startEdit(row)}>Edit</button>
                      <button className="adm-btn adm-btn-danger" onClick={() => remove(row)}>Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
