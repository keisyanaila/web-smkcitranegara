import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdmin } from '@/lib/adminAuth';
import { isDbConfigured } from '@/lib/db';
import LogoutButton from './LogoutButton';
import AdminNav from './AdminNav';

export const metadata = { title: 'Admin · SMK Citra Negara' };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect('/admin/login');

  return (
    <div className="adm-root">
      <header className="adm-topbar">
        <div className="adm-topbar-inner">
          <Link href="/admin" className="adm-brand">
            <img src="/images/logo-badge.png" alt="" className="adm-brand-logo" />
            <span>
              SMK Citra Negara
              <small>Panel Admin</small>
            </span>
          </Link>
          <AdminNav />
          <LogoutButton />
        </div>
      </header>

      <div className="adm-content">
      {!isDbConfigured && (
        <div className="adm-banner">
          DATABASE_URL belum di-set. Salin <code>.env.local.example</code> jadi <code>.env.local</code>, isi nilainya,
          jalankan <code>node db/run-schema.mjs</code>, lalu restart <code>npm run dev</code> (di Vercel: isi
          Environment Variables lalu Redeploy). Sebelum itu, form tidak bisa menyimpan.
        </div>
      )}

      <main className="adm-main">{children}</main>
      </div>

      <style>{`
        .adm-root {
          --adm-green: #0B3D2E; --adm-green-2: #145a43; --adm-gold: #C8973A; --adm-gold-2: #E8B84B;
          --adm-ink: #0A1628; --adm-text: #1f2937; --adm-muted: #6b7280; --adm-line: #e5e7eb; --adm-bg: #f4f5f7;
          min-height: 100vh; background: var(--adm-bg); color: var(--adm-text);
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        /* ── Topbar ── */
        .adm-topbar { position: sticky; top: 0; z-index: 50; background: var(--adm-green); color: #fff; border-bottom: 2px solid var(--adm-gold); box-shadow: 0 2px 12px rgba(0,0,0,0.12); }
        .adm-topbar-inner { max-width: 1100px; margin: 0 auto; padding: 10px 22px; display: flex; align-items: center; gap: 22px; }
        .adm-brand { display: flex; align-items: center; gap: 10px; color: #fff; text-decoration: none; flex-shrink: 0; }
        .adm-brand span { display: flex; flex-direction: column; font-weight: 800; font-size: 14px; line-height: 1.15; }
        .adm-brand small { font-weight: 600; font-size: 11px; color: var(--adm-gold-2); letter-spacing: .04em; text-transform: uppercase; }
        .adm-brand-logo { width: 34px; height: 34px; object-fit: contain; }
        .adm-nav { display: flex; gap: 4px; flex: 1; align-items: center; }
        .adm-nav a { display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; color: rgba(255,255,255,0.78); text-decoration: none; font-size: 13.5px; font-weight: 600; padding: 8px 12px; border-radius: 9px; transition: background .15s, color .15s; }
        .adm-nav a:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .adm-nav a.is-active { background: rgba(232,184,75,0.16); color: var(--adm-gold-2); }
        .adm-nav a.adm-nav-site { margin-left: auto; color: rgba(255,255,255,0.6); font-weight: 500; }

        .adm-logout { display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.22); color: #fff; padding: 7px 13px; border-radius: 9px; font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .adm-logout:hover { background: rgba(255,255,255,0.16); }

        .adm-banner { background: #FEF3C7; color: #92400E; font-size: 13px; padding: 10px 22px; border-bottom: 1px solid #FDE68A; text-align: center; }
        .adm-banner code { background: rgba(146,64,14,0.12); padding: 1px 5px; border-radius: 4px; }
        .adm-main { max-width: 1100px; margin: 0 auto; padding: 28px 22px 70px; }

        /* ── Judul halaman ── */
        .adm-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 18px; gap: 12px; flex-wrap: wrap; }
        .adm-head h1 { font-size: 24px; font-weight: 800; color: var(--adm-ink); line-height: 1.2; }
        .adm-head p { font-size: 13.5px; color: var(--adm-muted); margin-top: 4px; }

        /* ── Kartu ── */
        .adm-card { background: #fff; border: 1px solid var(--adm-line); border-radius: 14px; padding: 20px; margin-bottom: 18px; box-shadow: 0 1px 2px rgba(16,24,40,0.04); }
        .adm-card h2 { font-size: 16px; font-weight: 800; margin-bottom: 14px; color: var(--adm-ink); }
        .adm-card-flush { padding: 0; overflow: hidden; }

        /* ── Form ── */
        .adm-form { border-color: rgba(200,151,58,0.45); box-shadow: 0 8px 28px rgba(16,24,40,0.08); padding: 0; }
        .adm-form-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 20px; border-bottom: 1px solid var(--adm-line); }
        .adm-form-head h2 { margin: 0; }
        .adm-form-body { padding: 18px 20px 4px; }
        .adm-form-grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 16px; }
        .adm-form-grid > .adm-field { grid-column: 1 / -1; }
        .adm-form-grid > .adm-field.adm-field-half { grid-column: auto; }
        .adm-close { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--adm-line); background: #fff; color: var(--adm-muted); cursor: pointer; }
        .adm-close:hover { color: var(--adm-ink); border-color: #cbd5e1; }

        .adm-field { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; min-width: 0; }
        .adm-field > label { font-size: 12.5px; font-weight: 700; color: #374151; }
        .adm-field > label .adm-req { color: #b91c1c; }
        .adm-field input[type=text], .adm-field input[type=date], .adm-field input[type=search], .adm-field textarea, .adm-field select, .adm-input {
          width: 100%; padding: 9px 11px; border: 1.5px solid #d1d5db; border-radius: 9px;
          font-size: 14px; font-family: inherit; background: #fff; color: var(--adm-ink); transition: border-color .15s, box-shadow .15s;
        }
        .adm-field input:focus, .adm-field textarea:focus, .adm-field select:focus, .adm-input:focus {
          outline: none; border-color: var(--adm-gold); box-shadow: 0 0 0 3px rgba(200,151,58,0.15);
        }
        .adm-field textarea { resize: vertical; line-height: 1.6; }
        .adm-field small { color: var(--adm-muted); font-size: 11.5px; line-height: 1.5; }

        /* checkbox sebagai toggle */
        .adm-check { display: inline-flex; align-items: center; gap: 10px; font-size: 13.5px; font-weight: 600; color: #374151; cursor: pointer; user-select: none; width: fit-content; }
        .adm-check input { position: absolute; opacity: 0; width: 1px; height: 1px; }
        .adm-switch { position: relative; width: 38px; height: 22px; border-radius: 999px; background: #d1d5db; transition: background .2s; flex-shrink: 0; }
        .adm-switch::after { content: ''; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.25); transition: transform .2s; }
        .adm-check input:checked + .adm-switch { background: #16a34a; }
        .adm-check input:checked + .adm-switch::after { transform: translateX(16px); }
        .adm-check input:focus-visible + .adm-switch { box-shadow: 0 0 0 3px rgba(200,151,58,0.35); }

        /* gambar */
        .adm-img-field { display: flex; gap: 14px; align-items: flex-start; flex-wrap: wrap; }
        .adm-img-box { width: 160px; aspect-ratio: 4 / 3; border-radius: 10px; border: 1.5px dashed #cbd5e1; background: #f8fafc; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 12px; overflow: hidden; flex-shrink: 0; }
        .adm-img-box img { width: 100%; height: 100%; object-fit: cover; }
        .adm-img-side { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 8px; }
        .adm-img-preview { max-width: 220px; max-height: 150px; object-fit: cover; border-radius: 10px; border: 1px solid var(--adm-line); }
        .adm-img-actions { display: flex; gap: 8px; flex-wrap: wrap; }

        .adm-form-actions { display: flex; gap: 10px; align-items: center; margin-top: 8px; }
        .adm-form .adm-form-actions { position: sticky; bottom: 0; margin: 0; padding: 14px 20px; background: #fff; border-top: 1px solid var(--adm-line); border-radius: 0 0 14px 14px; }
        .adm-form-actions .adm-spacer { flex: 1; }

        /* ── Tombol ── */
        .adm-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 9px 16px; border-radius: 9px; font-size: 13px; font-weight: 700; cursor: pointer; border: 1.5px solid transparent; font-family: inherit; white-space: nowrap; text-decoration: none; transition: background .15s, border-color .15s, filter .15s; }
        .adm-btn:disabled { opacity: 0.55; cursor: default; }
        .adm-btn-primary { background: linear-gradient(135deg,var(--adm-gold),var(--adm-gold-2)); color: var(--adm-ink); box-shadow: 0 2px 8px rgba(200,151,58,0.3); }
        .adm-btn-primary:hover:not(:disabled) { filter: brightness(1.05); }
        .adm-btn-ghost { background: #fff; border-color: #d1d5db; color: #374151; }
        .adm-btn-ghost:hover:not(:disabled) { background: #f9fafb; border-color: var(--adm-gold); }
        .adm-btn-danger { background: #fff; border-color: #fecaca; color: #b91c1c; }
        .adm-btn-danger:hover:not(:disabled) { background: #fef2f2; }
        .adm-btn-sm { padding: 6px 11px; font-size: 12.5px; }

        /* ── Pesan ── */
        .adm-error { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 13px; padding: 10px 12px; border-radius: 9px; margin-bottom: 14px; line-height: 1.5; }
        .adm-notice { background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d; font-size: 13px; padding: 10px 12px; border-radius: 9px; margin-bottom: 14px; }
        .adm-muted { color: var(--adm-muted); font-size: 14px; line-height: 1.6; }

        /* ── Toolbar daftar ── */
        .adm-toolbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 14px 16px; border-bottom: 1px solid var(--adm-line); }
        .adm-search { position: relative; flex: 1; min-width: 200px; max-width: 360px; }
        .adm-search svg { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }
        .adm-search input { width: 100%; padding: 8px 11px 8px 34px; border: 1.5px solid #d1d5db; border-radius: 9px; font-size: 13.5px; font-family: inherit; color: var(--adm-ink); }
        .adm-search input:focus { outline: none; border-color: var(--adm-gold); box-shadow: 0 0 0 3px rgba(200,151,58,0.15); }
        .adm-seg { display: inline-flex; padding: 3px; background: #f3f4f6; border-radius: 9px; gap: 2px; }
        .adm-seg button { border: none; background: none; padding: 6px 11px; border-radius: 7px; font-size: 12.5px; font-weight: 700; color: var(--adm-muted); cursor: pointer; font-family: inherit; }
        .adm-seg button.is-on { background: #fff; color: var(--adm-ink); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .adm-count { margin-left: auto; font-size: 12.5px; color: var(--adm-muted); }

        /* ── Tabel ── */
        .adm-table-wrap { overflow-x: auto; }
        .adm-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .adm-table th { text-align: left; padding: 10px 16px; background: #f9fafb; border-bottom: 1px solid var(--adm-line); color: var(--adm-muted); font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap; }
        .adm-table td { padding: 12px 16px; border-bottom: 1px solid #f1f2f4; vertical-align: middle; }
        .adm-table tbody tr:last-child td { border-bottom: none; }
        .adm-table tbody tr:hover td { background: #fcfcfd; }
        .adm-table tr.is-editing td { background: #fffbeb; }
        .adm-table .adm-col-actions { width: 1%; white-space: nowrap; text-align: right; }
        .adm-row-actions { display: flex; gap: 6px; justify-content: flex-end; white-space: nowrap; }
        .adm-row-actions .adm-btn { padding: 6px 11px; }
        .adm-cell-main { display: flex; align-items: center; gap: 12px; min-width: 220px; }
        .adm-cell-main strong { display: block; font-weight: 700; color: var(--adm-ink); line-height: 1.4; }
        .adm-cell-main small { display: block; color: var(--adm-muted); font-size: 12px; margin-top: 2px; }
        .adm-thumb { width: 52px; height: 40px; border-radius: 7px; object-fit: cover; background: #f1f5f9; border: 1px solid var(--adm-line); flex-shrink: 0; }
        .adm-thumb-empty { display: inline-flex; align-items: center; justify-content: center; color: #94a3b8; }
        .adm-empty { text-align: center; padding: 44px 20px; color: var(--adm-muted); font-size: 14px; }
        .adm-empty strong { display: block; color: var(--adm-ink); font-size: 15px; margin-bottom: 4px; }

        .adm-tag { display: inline-block; font-size: 11px; font-weight: 800; padding: 3px 9px; border-radius: 999px; white-space: nowrap; }
        .adm-tag-on { background: #dcfce7; color: #15803d; }
        .adm-tag-off { background: #f3f4f6; color: #6b7280; }
        .adm-tag-gold { background: #fef3c7; color: #92400e; }

        /* ── Dashboard ── */
        .adm-status { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .adm-status li { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; line-height: 1.5; }
        .adm-status-dot { flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: #fff; margin-top: 1px; }
        .adm-status-ok { background: #16a34a; }
        .adm-status-bad { background: #dc2626; }
        .adm-status small { display: block; color: var(--adm-muted); font-size: 12px; }
        .adm-status code { background: #f3f4f6; padding: 1px 5px; border-radius: 4px; font-size: 12px; }
        .adm-health { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; border-radius: 12px; padding: 12px 16px; margin-bottom: 18px; font-size: 13.5px; font-weight: 600; }
        .adm-health details { margin-left: auto; font-weight: 500; }
        .adm-health summary { cursor: pointer; color: #15803d; font-size: 12.5px; }
        .adm-health .adm-status { margin-top: 10px; }

        .adm-dash-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .adm-dash-card { display: flex; flex-direction: column; gap: 6px; background: #fff; border: 1px solid var(--adm-line); border-radius: 14px; padding: 20px; text-decoration: none; color: var(--adm-ink); transition: border-color .15s, transform .15s, box-shadow .15s; }
        .adm-dash-card:hover { border-color: var(--adm-gold); transform: translateY(-2px); box-shadow: 0 10px 24px rgba(16,24,40,0.08); }
        .adm-dash-icon { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; background: rgba(11,61,46,0.08); color: var(--adm-green); margin-bottom: 6px; }
        .adm-dash-card h3 { font-size: 16px; font-weight: 800; }
        .adm-dash-num { font-size: 28px; font-weight: 800; line-height: 1.1; color: var(--adm-ink); }
        .adm-dash-num small { font-size: 13px; font-weight: 600; color: var(--adm-muted); margin-left: 4px; }
        .adm-dash-card p { font-size: 13px; color: var(--adm-muted); line-height: 1.5; }
        .adm-dash-link { margin-top: auto; padding-top: 8px; font-size: 12.5px; font-weight: 700; color: #92681A; }

        /* ── Desktop: sidebar kiri ── */
        @media (min-width: 761px) {
          .adm-root { display: flex; align-items: flex-start; }
          .adm-topbar { position: sticky; top: 0; flex: 0 0 236px; height: 100vh; border-bottom: none; border-right: 2px solid var(--adm-gold); box-shadow: none; overflow-y: auto; }
          .adm-topbar-inner { height: 100%; flex-direction: column; align-items: stretch; gap: 18px; padding: 20px 14px; }
          .adm-brand { padding: 0 6px 16px; border-bottom: 1px solid rgba(255,255,255,0.12); }
          .adm-nav { flex-direction: column; align-items: stretch; flex: 1; gap: 2px; }
          .adm-nav a { padding: 10px 12px; }
          .adm-nav a.adm-nav-site { margin: auto 0 0; }
          .adm-logout { justify-content: center; padding: 9px 13px; }
          .adm-content { flex: 1; min-width: 0; }
          .adm-main { max-width: 1040px; padding: 30px 32px 70px; }
          .adm-dash-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
        }

        /* ── HP ── */
        @media (max-width: 900px) {
          .adm-dash-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 760px) {
          .adm-topbar-inner { flex-wrap: wrap; gap: 8px 12px; padding: 10px 16px 0; }
          .adm-brand { flex: 1; }
          .adm-nav { order: 3; flex-basis: 100%; overflow-x: auto; scrollbar-width: none; margin: 0 -16px; padding: 4px 16px 10px; }
          .adm-nav::-webkit-scrollbar { display: none; }
          .adm-nav a { padding: 7px 11px; font-size: 13px; }
          .adm-nav a.adm-nav-site { margin-left: 0; }
          .adm-main { padding: 20px 14px 60px; }
          .adm-head h1 { font-size: 21px; }
          .adm-head > .adm-btn { width: 100%; }
          .adm-card { padding: 16px; }
          .adm-card.adm-card-flush { padding: 0; }
          .adm-toolbar { padding: 12px 14px; }
          .adm-dash-card { padding: 16px; }
          .adm-form-head, .adm-form-body { padding-left: 16px; padding-right: 16px; }
          .adm-form .adm-form-actions { padding: 12px 16px; }
          .adm-form-grid { grid-template-columns: 1fr; }
          .adm-dash-grid { grid-template-columns: 1fr; }
          .adm-search { max-width: none; flex-basis: 100%; }
          .adm-count { margin-left: 0; }

          /* tabel jadi kartu */
          .adm-table-cards thead { display: none; }
          .adm-table-cards, .adm-table-cards tbody, .adm-table-cards tr, .adm-table-cards td { display: block; width: 100%; }
          .adm-table-cards tr { padding: 14px 16px; border-bottom: 1px solid var(--adm-line); }
          .adm-table-cards tbody tr:last-child { border-bottom: none; }
          .adm-table-cards td { padding: 4px 0; border: none !important; background: none !important; }
          .adm-table-cards td[data-label]:not(.adm-td-main)::before { content: attr(data-label); display: block; font-size: 10.5px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: .04em; margin-bottom: 1px; }
          .adm-table-cards td.adm-td-main { padding-bottom: 8px; }
          .adm-table-cards .adm-cell-main { min-width: 0; }
          .adm-table-cards .adm-col-actions { width: 100%; text-align: left; padding-top: 10px; }
          .adm-table-cards .adm-row-actions { justify-content: flex-start; }
          .adm-table-cards .adm-row-actions .adm-btn { flex: 1; }
          .adm-table-cards .adm-td-inline { display: inline-block; width: auto; margin-right: 18px; vertical-align: top; }
        }
      `}</style>
    </div>
  );
}
