import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <div className="adm-head"><h1>Dashboard</h1></div>
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
