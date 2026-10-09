import Link from 'next/link';
import { CalendarDays, CheckCircle2, Newspaper, Trophy } from 'lucide-react';
import { getAdminStatus, getDashboardSummary } from '@/lib/adminStatus';

export default async function AdminDashboard() {
  const [status, sum] = await Promise.all([getAdminStatus(), getDashboardSummary()]);
  const allOk = status.every((s) => s.ok);

  const statusList = (
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
  );

  return (
    <div>
      <div className="adm-head">
        <div>
          <h1>Dashboard</h1>
          <p>Kelola konten situs SMK Citra Negara dari sini.</p>
        </div>
      </div>

      {allOk ? (
        <div className="adm-health">
          <CheckCircle2 size={18} aria-hidden="true" />
          Sistem siap — database terhubung dan semua tabel lengkap.
          <details>
            <summary>Lihat detail</summary>
            {statusList}
          </details>
        </div>
      ) : (
        <div className="adm-card" style={{ borderColor: '#fecaca' }}>
          <h2>Status sistem: perlu diperbaiki</h2>
          <p className="adm-muted" style={{ marginBottom: 12 }}>
            Selama ada poin merah, simpan/hapus Berita, Prestasi &amp; Jadwal SPMB akan gagal. Ikuti petunjuk di bawahnya,
            lalu muat ulang halaman ini.
          </p>
          {statusList}
        </div>
      )}

      <div className="adm-dash-grid">
        <Link href="/admin/berita" className="adm-dash-card">
          <span className="adm-dash-icon"><Newspaper size={20} aria-hidden="true" /></span>
          <h3>Berita</h3>
          {sum.berita && (
            <div className="adm-dash-num">
              {sum.berita.total}
              <small>berita{sum.berita.draft ? ` · ${sum.berita.draft} draft` : ''}</small>
            </div>
          )}
          <p>Tambah, edit, dan hapus berita yang tampil di halaman /berita.</p>
          <span className="adm-dash-link">Kelola berita →</span>
        </Link>

        <Link href="/admin/prestasi" className="adm-dash-card">
          <span className="adm-dash-icon"><Trophy size={20} aria-hidden="true" /></span>
          <h3>Prestasi</h3>
          {sum.prestasi && (
            <div className="adm-dash-num">
              {sum.prestasi.total}
              <small>prestasi{sum.prestasi.draft ? ` · ${sum.prestasi.draft} draft` : ''}</small>
            </div>
          )}
          <p>Kelola daftar prestasi yang tampil di halaman /prestasi.</p>
          <span className="adm-dash-link">Kelola prestasi →</span>
        </Link>

        <Link href="/admin/spmb" className="adm-dash-card">
          <span className="adm-dash-icon"><CalendarDays size={20} aria-hidden="true" /></span>
          <h3>Jadwal SPMB</h3>
          {sum.spmb && (
            <div className="adm-dash-num">
              {sum.spmb.tahunAjaran}
              <small>{sum.spmb.aktif ? `${sum.spmb.aktif} berjalan` : `${sum.spmb.gelombang} gelombang`}</small>
            </div>
          )}
          <p>Atur tahun ajaran dan tanggal gelombang pendaftaran yang tampil di Beranda.</p>
          <span className="adm-dash-link">Atur jadwal →</span>
        </Link>
      </div>
    </div>
  );
}
