import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdmin } from '@/lib/adminAuth';
import { isDbConfigured } from '@/lib/db';
import LogoutButton from './LogoutButton';

export const metadata = { title: 'Admin · SMK Citra Negara' };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect('/admin/login');

  return (
    <div className="adm-root">
      <header className="adm-topbar">
        <div className="adm-brand">SMK Citra Negara · Admin</div>
        <nav className="adm-nav">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/berita">Berita</Link>
          <Link href="/admin/prestasi">Prestasi</Link>
          <Link href="/" target="_blank">Lihat situs ↗</Link>
        </nav>
        <LogoutButton />
      </header>

      {!isDbConfigured && (
        <div className="adm-banner">
          DATABASE_URL belum di-set. Isi <code>.env.local</code> dan jalankan <code>db/schema.sql</code> di Neon,
          lalu restart <code>npm run dev</code>. Sebelum itu, form tidak bisa menyimpan.
        </div>
      )}

      <main className="adm-main">{children}</main>

      <style>{`
        .adm-root { min-height: 100vh; background: #f4f5f7; color: #1f2937; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        .adm-topbar { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; padding: 14px 22px; background: #0B3D2E; color: #fff; border-bottom: 2px solid #C8973A; }
        .adm-brand { font-weight: 800; font-size: 14px; }
        .adm-nav { display: flex; gap: 6px; flex: 1; flex-wrap: wrap; }
        .adm-nav a { color: rgba(255,255,255,0.82); text-decoration: none; font-size: 13.5px; font-weight: 600; padding: 7px 12px; border-radius: 8px; }
        .adm-nav a:hover { background: rgba(200,151,58,0.18); color: #E8B84B; }
        .adm-banner { background: #FEF3C7; color: #92400E; font-size: 13px; padding: 10px 22px; border-bottom: 1px solid #FDE68A; }
        .adm-banner code { background: rgba(146,64,14,0.12); padding: 1px 5px; border-radius: 4px; }
        .adm-main { max-width: 960px; margin: 0 auto; padding: 28px 22px 60px; }

        .adm-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; gap: 12px; flex-wrap: wrap; }
        .adm-head h1 { font-size: 24px; font-weight: 800; color: #0A1628; }

        .adm-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 20px; margin-bottom: 20px; }
        .adm-card h2 { font-size: 16px; font-weight: 800; margin-bottom: 14px; color: #0A1628; }

        .adm-field { margin-bottom: 14px; display: flex; flex-direction: column; gap: 5px; }
        .adm-field > label { font-size: 12.5px; font-weight: 700; color: #374151; }
        .adm-field input[type=text], .adm-field input[type=date], .adm-field textarea, .adm-field select {
          width: 100%; padding: 9px 11px; border: 1.5px solid #d1d5db; border-radius: 9px;
          font-size: 14px; font-family: inherit; background: #fff; color: #0A1628;
        }
        .adm-field input:focus, .adm-field textarea:focus, .adm-field select:focus {
          outline: none; border-color: #C8973A; box-shadow: 0 0 0 3px rgba(200,151,58,0.15);
        }
        .adm-field textarea { resize: vertical; line-height: 1.6; }
        .adm-field small { color: #6b7280; font-size: 11.5px; }
        .adm-check { flex-direction: row; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #374151; }
        .adm-check input { width: 16px; height: 16px; }

        .adm-img-field { display: flex; flex-direction: column; gap: 8px; }
        .adm-img-preview { max-width: 220px; max-height: 150px; object-fit: cover; border-radius: 10px; border: 1px solid #e5e7eb; }
        .adm-img-actions { display: flex; gap: 8px; flex-wrap: wrap; }

        .adm-form-actions { display: flex; gap: 10px; margin-top: 8px; }

        .adm-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 9px; font-size: 13px; font-weight: 700; cursor: pointer; border: 1.5px solid transparent; font-family: inherit; }
        .adm-btn:disabled { opacity: 0.6; cursor: default; }
        .adm-btn-primary { background: linear-gradient(135deg,#C8973A,#E8B84B); color: #0A1628; }
        .adm-btn-primary:hover:not(:disabled) { filter: brightness(1.05); }
        .adm-btn-ghost { background: #fff; border-color: #d1d5db; color: #374151; }
        .adm-btn-ghost:hover:not(:disabled) { background: #f9fafb; border-color: #C8973A; }
        .adm-btn-danger { background: #fff; border-color: #fecaca; color: #b91c1c; }
        .adm-btn-danger:hover:not(:disabled) { background: #fef2f2; }

        .adm-error { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 13px; padding: 9px 12px; border-radius: 8px; margin-bottom: 12px; }
        .adm-muted { color: #6b7280; font-size: 14px; }

        .adm-table-wrap { overflow-x: auto; }
        .adm-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .adm-table th { text-align: left; padding: 10px 12px; border-bottom: 2px solid #e5e7eb; color: #6b7280; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em; }
        .adm-table td { padding: 11px 12px; border-bottom: 1px solid #f3f4f6; vertical-align: middle; }
        .adm-table tr:hover td { background: #fafafa; }
        .adm-row-actions { display: flex; gap: 6px; white-space: nowrap; }
        .adm-row-actions .adm-btn { padding: 6px 11px; }

        .adm-tag { font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 999px; }
        .adm-tag-on { background: #dcfce7; color: #15803d; }
        .adm-tag-off { background: #f3f4f6; color: #6b7280; }

        .adm-logout { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25); color: #fff; padding: 7px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; }
        .adm-logout:hover { background: rgba(255,255,255,0.18); }

        .adm-dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .adm-dash-card { display: block; background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 22px; text-decoration: none; color: #0A1628; transition: border-color .15s, transform .15s; }
        .adm-dash-card:hover { border-color: #C8973A; transform: translateY(-2px); }
        .adm-dash-card h3 { font-size: 17px; font-weight: 800; margin-bottom: 4px; }
        .adm-dash-card p { font-size: 13px; color: #6b7280; }
        @media (max-width: 600px) { .adm-dash-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
