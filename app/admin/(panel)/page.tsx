import Link from 'next/link';
import { getAdminStatus } from '@/lib/adminStatus';

export default async function AdminDashboard() {
  const status = await getAdminStatus();
  const allOk = status.every((s) => s.ok);

  return (
    <div>
      <div className="adm-head"><h1>Dashboard</h1></div>

      <div className="adm-card">
        <h2>{allOk ? 'Status sistem: siap' : 'Status sistem: perlu diperbaiki'}</h2>
        {!allOk && (
          <p className="adm-muted" style={{ marginBottom: 12 }}>
            Selama ada poin merah, simpan/hapus Berita & Prestasi akan gagal. Ikuti petunjuk di bawahnya,
            lalu muat ulang halaman ini.
          </p>
        )}
        <ul className="adm-status">
          {status.map((s) => (
            <li key={s.label}>
              <span className={`adm-status-dot ${s.ok ? 'adm-status-ok' : 'adm-status-bad'}`}>{s.ok ? '✓' : '!'}</span>
              <div>
                {s.label}
                {!s.ok && s.hint ? <small>{s.hint}</small> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="adm-dash-grid">
        <Link href="/admin/berita" className="adm-dash-card">
          <h3>Berita</h3>
          <p>Tambah, edit, dan hapus berita yang tampil di halaman /berita.</p>
        </Link>
        <Link href="/admin/prestasi" className="adm-dash-card">
          <h3>Prestasi</h3>
          <p>Kelola daftar prestasi yang tampil di halaman /prestasi.</p>
        </Link>
      </div>
    </div>
  );
}
