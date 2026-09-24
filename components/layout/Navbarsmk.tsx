'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLang, LangSwitch } from '@/lib/i18n';


// ─── Data ────────────────────────────────────────────────────────────────────

// `en` diisi kalau nama berbahasa Inggrisnya beda
const ESKUL_LIST = [
  { nama: 'Paskibra',   href: '/eskul/paskibra'  },
  { nama: 'Futsal',     href: '/eskul/futsal'    },
  { nama: 'Taekwondo',  href: '/eskul/taekwondo' },
  { nama: 'Basket',     en: 'Basketball', href: '/eskul/basket' },
  { nama: 'Voli',       en: 'Volleyball', href: '/eskul/voli'   },
  { nama: 'Theater',    href: '/eskul/theater'   },
  { nama: 'Tari',       en: 'Dance',      href: '/eskul/tari'   },
  { nama: 'Pramuka',    en: 'Scouts',     href: '/eskul/pramuka' },
  { nama: 'IT Club',    href: '/eskul/itclub'    },
  { nama: 'Band',       href: '/eskul/band'      },
  { nama: 'IRMA',       href: '/eskul/irma'      },
  { nama: 'E-Sport',    href: '/eskul/esport'    },
  { nama: 'CN Gakuen',  href: '/eskul/cngakuen'  },
  { nama: 'Silat',      href: '/eskul/silat'     },
  { nama: 'Badminton',  href: '/eskul/badminton' },
  { nama: 'Paduan Suara', en: 'Choir', href: '/eskul/paduansuara' },
];

const TENTANG_LIST = [
  { nama: 'Profil Sekolah', en: 'School Profile',   href: '/tentang' },
  { nama: 'Staff & Guru',   en: 'Teachers & Staff', href: '/gurustaffsmk' },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface Session {
  role: string;
  namaLengkap?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const NAV_LINK: React.CSSProperties = {
  color: 'rgba(255,255,255,0.78)',
  textDecoration: 'none',
  padding: '10px 13px',
  borderRadius: 999,
  fontSize: 13.5,
  fontWeight: 600,
  letterSpacing: '0.01em',
  whiteSpace: 'nowrap',
  transition: 'all 0.22s ease',
};

const CSS = `
  :root {
    --nav-ink: #f8f5ee;
    --nav-muted: rgba(248,245,238,0.72);
    --nav-deep: #071d19;
    --nav-deep-2: #0b2b24;
    --nav-gold: #e5b95a;
    --nav-gold-soft: rgba(229,185,90,0.14);
    --nav-line: rgba(229,185,90,0.58);
  }

  @keyframes dropFadeIn {
    from { opacity: 0; transform: translateY(-8px) scale(.985); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes navGlow {
    0%, 100% { box-shadow: 0 8px 28px rgba(0,0,0,.16); }
    50% { box-shadow: 0 12px 34px rgba(0,0,0,.22); }
  }

  .site-nav-shell {
    width: min(1380px, calc(100% - 80px));
    margin: 8px auto 0;
  }

  .site-nav-inner {
    min-height: 68px;
    padding: 0 28px 0 30px;
    border: 1px solid rgba(255,255,255,0.11);
    border-bottom-color: rgba(229,185,90,0.34);
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(8,34,29,.97), rgba(10,45,37,.94));
    box-shadow: 0 10px 36px rgba(3,18,15,.22), inset 0 1px 0 rgba(255,255,255,.05);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    position: relative;
    overflow: visible;
  }

  .site-nav-inner::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: linear-gradient(90deg, rgba(229,185,90,.06), transparent 25%, transparent 75%, rgba(229,185,90,.04));
  }

  .brand-wrap {
    display: flex;
    align-items: center;
    gap: 11px;
    text-decoration: none;
    min-width: 0;
    position: relative;
    z-index: 1;
  }

  .brand-logo {
    height: 44px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .brand-logo img { height: 100%; width: auto; object-fit: contain; }

  .brand-name { color: #fff; font-weight: 800; font-size: 14.5px; line-height: 1.15; letter-spacing: -.01em; white-space: nowrap; }
  .brand-tagline { color: #e5b95a; font-size: 10px; font-weight: 600; margin-top: 3px; white-space: nowrap; letter-spacing: .015em; }

  .nav-desktop-only { display: none !important; }
  .nav-links { align-items: center; gap: 10px; flex: 0 1 auto; justify-content: center; min-width: 0; white-space: nowrap; }
  .nav-action { display: flex; align-items: center; gap: 13px; flex: 0 0 auto; white-space: nowrap; }
  /* Auth desktop harus benar-benar hilang di mobile.
     .nav-action sebelumnya menimpa .nav-desktop-only karena sama-sama mengatur display. */
  .nav-desktop-only.nav-action { display: none !important; }

  .nav-mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 13px;
    background: rgba(255,255,255,.055);
    border: 1px solid rgba(255,255,255,.1);
    color: #fff;
    cursor: pointer;
    position: relative;
    z-index: 20001;
    transition: .22s ease;
  }
  .nav-mobile-toggle:hover { background: var(--nav-gold-soft); border-color: rgba(229,185,90,.45); color: #f2c968; transform: translateY(-1px); }

  .nav-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 17px;
    border-radius: 999px;
    background: linear-gradient(135deg, #efc866, #dba63d);
    color: #15261f;
    text-decoration: none;
    font-size: 12.5px;
    font-weight: 800;
    white-space: nowrap;
    box-shadow: 0 7px 18px rgba(214,166,61,.18), inset 0 1px 0 rgba(255,255,255,.42);
    transition: .22s ease;
  }
  .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 10px 22px rgba(214,166,61,.28); filter: saturate(1.05); }

  .nav-login { white-space: nowrap; color: rgba(255,255,255,.76); text-decoration: none; font-size: 13px; font-weight: 600; padding: 9px 10px; border-radius: 999px; transition: .2s ease; }
  .nav-login:hover { color: #fff; background: rgba(255,255,255,.06); }

  .drop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
  .eskul-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px 10px; }
  .drop-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; text-decoration: none; border: 1px solid transparent; transition: .15s ease; }
  .drop-item:hover { background: #f8f4eb; border-color: #eadfc9; }
  .eskul-text-item, .tentang-item { display: flex; align-items: center; padding: 7px 9px; border-radius: 9px; text-decoration: none; color: #24312c; font-size: 13px; font-weight: 600; transition: .15s ease; }
  .eskul-text-item:hover, .tentang-item:hover { background: #f8f4eb; color: #7a5a1e; }

  /* Menu lengkap baru muat di layar ≥1280px; di bawah itu pakai tombol ☰ + drawer */
  @media (min-width: 1280px) {
    .brand-wrap { flex-shrink: 0; }
    .nav-desktop-only { display: flex !important; }
    .nav-desktop-only.nav-action { display: flex !important; }
    .nav-mobile-toggle { display: none; }
    .mnav-backdrop, .mnav-drawer { display: none !important; }
    .site-nav-shell { width: min(1380px, calc(100% - 80px)); }
  }

  .mnav-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(3,14,11,.68);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    z-index: 20050;
    opacity: 0;
    pointer-events: none;
    transition: opacity .25s ease;
  }
  .mnav-backdrop.is-open { opacity: 1; pointer-events: auto; }

  .mnav-drawer {
    position: fixed;
    top: max(6px, env(safe-area-inset-top));
    right: max(6px, env(safe-area-inset-right));
    bottom: max(6px, env(safe-area-inset-bottom));
    width: min(430px, calc(100vw - 12px));
    max-width: calc(100vw - 12px);
    background: linear-gradient(160deg,#092c24,#071d19);
    border: 1px solid rgba(229,185,90,.32);
    border-radius: 22px;
    z-index: 20060;
    display: flex;
    flex-direction: column;
    transform: translate3d(calc(100% + 24px),0,0);
    transition: transform .32s cubic-bezier(.33,1,.68,1);
    box-shadow: -20px 24px 70px rgba(0,0,0,.42);
    overflow: hidden;
    isolation: isolate;
  }
  .mnav-drawer.is-open { transform: translate3d(0,0,0); }

  .mnav-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 14px 14px 16px;
    min-height: 66px;
    border-bottom: 1px solid rgba(255,255,255,.08);
    flex-shrink: 0;
  }
  .mnav-brand {
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
    color: #fff;
    font-weight: 800;
    font-size: 14px;
    text-decoration: none;
  }
  .mnav-brand span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .mnav-lang { margin-left: auto; flex-shrink: 0; }

  .mnav-close {
    flex: 0 0 38px;
    width: 38px;
    height: 38px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.08);
    color: #fff;
    border-radius: 11px;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    transition:.2s ease;
  }
  .mnav-close:hover { background: var(--nav-gold-soft); color: #f2c968; border-color: rgba(229,185,90,.35); }

  .mnav-body {
    flex:1;
    min-height:0;
    overflow-y:auto;
    overscroll-behavior:contain;
    -webkit-overflow-scrolling:touch;
    scrollbar-width:thin;
    padding:10px 10px 16px;
  }
  .mnav-link {
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:12px;
    min-height:48px;
    padding:12px 13px;
    border-radius:12px;
    color:rgba(255,255,255,.88);
    font-size:15px;
    font-weight:650;
    text-decoration:none;
    width:100%;
    background:none;
    border:1px solid transparent;
    text-align:left;
    cursor:pointer;
    transition:.18s ease;
    box-sizing:border-box;
  }
  .mnav-link:hover, .mnav-link:active, .mnav-link:focus-visible {
    background: rgba(229,185,90,.09);
    border-color: rgba(229,185,90,.14);
    color:#f1c86a;
    outline:none;
  }
  .mnav-link > svg { color:rgba(255,255,255,.35); flex-shrink:0; }

  .mnav-acc-btn .mnav-chev { color:#dcae50; transition:transform .25s ease; }
  .mnav-acc-btn.is-open .mnav-chev { transform:rotate(180deg); }
  .mnav-acc-btn.is-open { color:#f1c86a; }

  .mnav-acc-panel { display:grid; grid-template-rows:0fr; transition:grid-template-rows .28s ease; }
  .mnav-acc-panel.is-open { grid-template-rows:1fr; }
  .mnav-acc-clip { overflow:hidden; min-height:0; }
  .mnav-acc-inner { padding:2px 4px 8px; }

  .mnav-sub {
    display:block;
    min-width:0;
    padding:9px 11px;
    border-radius:10px;
    color:rgba(255,255,255,.62);
    font-size:13.5px;
    font-weight:500;
    text-decoration:none;
    transition:.15s ease;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .mnav-sub:hover,.mnav-sub:active,.mnav-sub:focus-visible {
    background:rgba(255,255,255,.055);
    color:#fff;
    outline:none;
  }
  .mnav-sub-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; }

  .mnav-foot {
    flex-shrink:0;
    padding:12px 14px max(12px, env(safe-area-inset-bottom));
    border-top:1px solid rgba(255,255,255,.08);
    display:flex;
    flex-direction:column;
    gap:8px;
    background:rgba(5,24,20,.72);
  }
  .mnav-btn-primary {
    display:block;
    width:100%;
    box-sizing:border-box;
    text-align:center;
    padding:12px;
    border-radius:12px;
    border:1px solid rgba(229,185,90,.3);
    background:linear-gradient(135deg,#efc866,#dba63d);
    color:#15261f;
    text-decoration:none;
    font-size:14px;
    font-weight:800;
  }
  .mnav-btn-outline {
    display:block;
    width:100%;
    box-sizing:border-box;
    text-align:center;
    padding:12px;
    border-radius:12px;
    border:1px solid rgba(255,255,255,.22);
    color:#fff;
    text-decoration:none;
    font-size:14px;
    font-weight:650;
    transition:.2s ease;
  }
  .mnav-btn-outline:hover { border-color:#e5b95a; background:rgba(229,185,90,.1); }

  @media (max-width: 380px) {
    .site-nav-shell { width: calc(100% - 8px); }
    .site-nav-inner { padding-left:9px; padding-right:8px; }
    .brand-wrap { gap:7px; }
    .brand-logo { height:34px; }
    .brand-name { font-size:12.5px; }
    .nav-mobile-toggle { width:40px; height:40px; border-radius:12px; }
    .mnav-drawer { border-radius:18px; }
    .mnav-sub-grid { grid-template-columns:1fr; }
  }

  /* Tagline disembunyikan kalau navbar mulai sempit, biar menu tidak turun baris */
  @media (max-width: 1599px) { .nav-tagline { display: none !important; } }
  /* Layar 1280–1439px: jarak dirapatkan supaya semua menu muat satu baris */
  @media (min-width: 1280px) and (max-width: 1439px) {
    .site-nav-shell { width: calc(100% - 32px); }
    .site-nav-inner { padding: 0 14px 0 16px; }
    .nav-links { gap: 0; }
    .nav-action { gap: 6px; }
    .nav-link-item { padding: 9px 8px !important; font-size: 13px !important; }
  }

  @media (max-width: 900px) and (min-width: 768px) {
    .brand-tagline { display:none; }
    .site-nav-inner { padding-right: 7px; }
    .nav-links { gap:0; }
    .nav-action { gap:2px; }
  }

  @media (max-width: 640px) {
    .site-nav-shell { width: calc(100% - 10px); margin-top: 6px; }
    .site-nav-inner {
      min-height: 66px;
      border-radius: 16px;
      padding: 0 9px 0 11px;
    }
    .brand-wrap { flex: 1 1 auto; overflow: hidden; }
    .brand-logo { height:38px; }
    .brand-wrap > div:last-child { min-width:0; overflow:hidden; }
    .brand-name { font-size:13.5px; overflow:hidden; text-overflow:ellipsis; }
    .brand-tagline { display:none; }
    .nav-mobile-toggle { flex:0 0 44px; width:44px; height:44px; }
  }

  /* Mobile: header hanya brand + hamburger. Auth desktop tidak boleh ikut tampil. */
  @media (max-width: 767px) {
    .site-nav-inner .nav-desktop-only,
    .site-nav-inner .nav-desktop-only.nav-action,
    .site-nav-inner .nav-action,
    .site-nav-inner .nav-links {
      display: none !important;
    }

    .site-nav-inner .brand-wrap {
      flex: 1 1 auto !important;
      min-width: 0 !important;
      max-width: calc(100% - 52px) !important;
    }

    .site-nav-inner .nav-mobile-toggle {
      display: flex !important;
      flex: 0 0 44px !important;
      margin-left: auto !important;
    }
  }

  @media (prefers-reduced-motion: reduce) { .mnav-drawer,.mnav-backdrop,.mnav-acc-panel,.mnav-chev,.nav-cta,.nav-mobile-toggle { transition:none !important; } }
`;


// ─── Sub-components ───────────────────────────────────────────────────────────

function DropdownPanel({ children, triggerRef, panelWidth = 560, id }: {
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  panelWidth?: number;
  id: string;
}) {
  const [style, setStyle] = useState<React.CSSProperties>({ visibility: 'hidden', position: 'fixed' });
  const [arrowLeft, setArrowLeft] = useState(0);

  useEffect(() => {
    if (!triggerRef.current) return;

    const update = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const vw = window.innerWidth;
      const MARGIN = 12;
      const width = Math.min(panelWidth, vw - MARGIN * 2);

      // Center panel under trigger button
      let left = triggerRect.left + triggerRect.width / 2 - width / 2;
      // Clamp so it never goes off-screen
      left = Math.max(MARGIN, Math.min(left, vw - width - MARGIN));

      // Arrow always points at the trigger center
      setArrowLeft((triggerRect.left + triggerRect.width / 2) - left);

      setStyle({
        position: 'fixed',
        top: triggerRect.bottom + 10,
        left,
        width,
        visibility: 'visible',
      });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [triggerRef, panelWidth]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <div style={{
      ...style,
      background: 'white',
      borderRadius: 14,
      boxShadow: '0 16px 48px rgba(0,0,0,0.16)',
      border: '1px solid #eadfc9',
      padding: '14px',
      zIndex: 99999,
      animation: 'dropFadeIn 0.15s ease',
    }}
    data-dropdown={id}>
      {/* Arrow always points at trigger center */}
      <div style={{
        position: 'absolute',
        top: -7,
        left: arrowLeft,
        transform: 'translateX(-50%) rotate(45deg)',
        width: 13, height: 13,
        background: 'white',
        border: '1px solid #eadfc9',
        borderBottom: 'none', borderRight: 'none',
      }} />
      {children}
    </div>,
    document.body
  );
}

function NavButton({
  label, isOpen, onClick,
}: {
  label: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="nav-link-item"
      style={{
        ...NAV_LINK,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        color: isOpen ? '#e5b95a' : 'rgba(255,255,255,0.78)',
      }}
    >
      {label}
      <ChevronDown
        size={14}
        style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
      />
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [eskulOpen,      setEskulOpen]      = useState(false);
  const [tentangOpen,    setTentangOpen]    = useState(false);
  const [mobileEskul,    setMobileEskul]    = useState(false);
  const [mobileTentang,  setMobileTentang]  = useState(false);
  const [session,        setSession]        = useState<Session | null>(null);
  const [mounted,        setMounted]        = useState(false);
  const { lang, t } = useLang();
  const namaItem = (item: { nama: string; en?: string }) => (lang === 'en' && item.en) || item.nama;

  useEffect(() => { setMounted(true); }, []);

  const eskulRef   = useRef<HTMLDivElement>(null);
  const tentangRef = useRef<HTMLDivElement>(null);

  // Scroll listener + session fetch
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);

    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => { if (d.user) setSession(d.user); })
      .catch(() => {});

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on outside click
  // NOTE: panels are portaled to document.body, so we use data attributes to detect them
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const inEskul   = eskulRef.current?.contains(target)   || (target as HTMLElement).closest?.('[data-dropdown="eskul"]');
      const inTentang = tentangRef.current?.contains(target) || (target as HTMLElement).closest?.('[data-dropdown="tentang"]');
      if (!inEskul)   setEskulOpen(false);
      if (!inTentang) setTentangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Kunci scroll body + tutup drawer dengan tombol Esc saat menu mobile terbuka
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileEskul(false);
    setMobileTentang(false);
  };

  return (
    <>
      <style>{CSS}</style>

      <nav style={{
        background: 'transparent',
        position: 'sticky', top: 0, zIndex: 20000,
        transition: 'background 0.3s',
      }}>
        <div className="site-nav-shell">
          <div className="site-nav-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* ── Logo ── */}
            <Link href="/" className="brand-wrap">
              <div className="brand-logo">
                <Image src="/images/logo.png" alt="Logo SMK Citra Negara" width={1200} height={484} />
              </div>
              <div className="brand-text" style={{ minWidth: 0 }}>
                <div style={{ color: 'white', fontWeight: 800, fontSize: 15, lineHeight: 1.2, whiteSpace: 'nowrap' }}>SMK Citra Negara</div>
                <div className="nav-desktop-only nav-tagline" style={{ color: '#C8973A', fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap' }}>{t('Pilihan Tepat di Sekolah yang MANTAP', 'The Right Choice for Your Future')}</div>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="nav-desktop-only nav-links">

              <NavLink href="/">{t('Beranda', 'Home')}</NavLink>

              {/* Tentang Kami */}
              <div ref={tentangRef} style={{ position: 'relative' }}>
                <NavButton label={t('Tentang Kami', 'About Us')} isOpen={tentangOpen} onClick={() => setTentangOpen(v => !v)} />

                {tentangOpen && (
                  <DropdownPanel triggerRef={tentangRef} panelWidth={220} id="tentang">
                    {TENTANG_LIST.map(item => (
                      <Link key={item.nama} href={item.href} className="tentang-item" onClick={() => setTentangOpen(false)}>
                        {namaItem(item)}
                      </Link>
                    ))}
                  </DropdownPanel>
                )}
              </div>

              {/* Jurusan */}
              <NavLink href="/jurusan">{t('Jurusan', 'Programs')}</NavLink>

              {/* Ekstrakurikuler */}
              <div ref={eskulRef} style={{ position: 'relative' }}>
                <NavButton label={t('Ekstrakurikuler', 'Activities')} isOpen={eskulOpen} onClick={() => setEskulOpen(v => !v)} />

                {eskulOpen && (
                  <DropdownPanel triggerRef={eskulRef} panelWidth={480} id="eskul">
                    <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 700, letterSpacing: 1, marginBottom: 12, paddingLeft: 2 }}>
                      {t('16+ EKSTRAKURIKULER', '16+ EXTRACURRICULARS')}
                    </p>
                    <div className="eskul-grid">
                      {ESKUL_LIST.map(e => (
                        <Link key={e.nama} href={e.href} className="eskul-text-item" onClick={() => setEskulOpen(false)}>
                          {namaItem(e)}
                        </Link>
                      ))}
                    </div>
                  </DropdownPanel>
                )}
              </div>

              <NavLink href="/prestasi">{t('Prestasi', 'Achievements')}</NavLink>
              <NavLink href="/berita">{t('Berita', 'News')}</NavLink>
              <NavLink href="/spmb">SPMB</NavLink>
            </div>

            {/* ── Auth Buttons (Desktop) ── */}
            <div className="nav-desktop-only nav-action">
              <LangSwitch />
              {session ? (
                <>
                  <Link
                    href={session.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                    style={{ color: '#e5b95a', fontSize: 13, fontWeight: 700, textDecoration: 'none', padding: '8px 10px' }}
                  >
                    {session.namaLengkap || 'Dashboard'}
                  </Link>
                  <button type="button" onClick={handleLogout} style={{
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
                    color: 'rgba(255,255,255,0.7)', padding: '7px 16px',
                    borderRadius: 6, cursor: 'pointer', fontSize: 13,
                  }}>
                    {t('Keluar', 'Log Out')}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="nav-login">{t('Masuk', 'Log In')}</Link>
                  <Link href="/register" className="nav-cta">{t('Daftar Sekarang', 'Apply Now')}</Link>
                </>
              )}
            </div>

            {/* ── Mobile Toggle ── */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="nav-mobile-toggle"
              aria-label={t('Buka menu', 'Open menu')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer (portal ke <body>) ── */}
      {mounted && createPortal(
        <>
          <div
            className={`mnav-backdrop ${mobileOpen ? 'is-open' : ''}`}
            onClick={closeMobile}
            aria-hidden="true"
          />
          <aside
            className={`mnav-drawer ${mobileOpen ? 'is-open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={t('Menu navigasi', 'Navigation menu')}
            id="mobile-navigation"
          >
            <div className="mnav-head">
              <Link href="/" onClick={closeMobile} className="mnav-brand">
                <Image src="/images/logo.png" alt="" width={1200} height={484} style={{ height: 30, width: 'auto' }} />
                <span>SMK Citra Negara</span>
              </Link>
              <LangSwitch className="mnav-lang" />
              <button type="button" className="mnav-close" onClick={closeMobile} aria-label={t('Tutup menu', 'Close menu')}>
                <X size={20} />
              </button>
            </div>

            <div className="mnav-body">
              <Link href="/" onClick={closeMobile} className="mnav-link">{t('Beranda', 'Home')}</Link>

              <button
                type="button"
                className={`mnav-link mnav-acc-btn ${mobileTentang ? 'is-open' : ''}`}
                onClick={() => setMobileTentang(v => !v)}
                aria-expanded={mobileTentang}
              >
                {t('Tentang Kami', 'About Us')}
                <ChevronDown size={18} className="mnav-chev" />
              </button>
              <div className={`mnav-acc-panel ${mobileTentang ? 'is-open' : ''}`}>
                <div className="mnav-acc-clip">
                  <div className="mnav-acc-inner">
                    {TENTANG_LIST.map(item => (
                      <Link key={item.nama} href={item.href} onClick={closeMobile} className="mnav-sub">{namaItem(item)}</Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/jurusan" onClick={closeMobile} className="mnav-link">{t('Jurusan', 'Programs')}</Link>

              <button
                type="button"
                className={`mnav-link mnav-acc-btn ${mobileEskul ? 'is-open' : ''}`}
                onClick={() => setMobileEskul(v => !v)}
                aria-expanded={mobileEskul}
              >
                {t('Ekstrakurikuler', 'Extracurriculars')}
                <ChevronDown size={18} className="mnav-chev" />
              </button>
              <div className={`mnav-acc-panel ${mobileEskul ? 'is-open' : ''}`}>
                <div className="mnav-acc-clip">
                  <div className="mnav-acc-inner mnav-sub-grid">
                    {ESKUL_LIST.map(e => (
                      <Link key={e.nama} href={e.href} onClick={closeMobile} className="mnav-sub">{namaItem(e)}</Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/prestasi" onClick={closeMobile} className="mnav-link">{t('Prestasi', 'Achievements')}</Link>
              <Link href="/berita" onClick={closeMobile} className="mnav-link">{t('Berita', 'News')}</Link>
              <Link href="/spmb" onClick={closeMobile} className="mnav-link">SPMB</Link>
            </div>

            <div className="mnav-foot">
              {session ? (
                <>
                  <Link
                    href={session.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                    onClick={closeMobile}
                    className="mnav-btn-primary"
                  >
                    {session.namaLengkap || 'Dashboard'}
                  </Link>
                  <button
                    type="button"
                    onClick={() => { closeMobile(); handleLogout(); }}
                    className="mnav-btn-outline"
                    style={{ background: 'none', cursor: 'pointer' }}
                  >
                    {t('Keluar', 'Log Out')}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={closeMobile} className="mnav-btn-outline">{t('Masuk', 'Log In')}</Link>
                  <Link
                    href="/register"
                    onClick={closeMobile}
                    className="mnav-btn-primary"
                  >
                    {t('Daftar Sekarang', 'Apply Now')}
                  </Link>
                </>
              )}
            </div>
          </aside>
        </>,
        document.body,
      )}
    </>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="nav-link-item"
      style={NAV_LINK}
      onMouseEnter={e => applyHover(e, true)}
      onMouseLeave={e => applyHover(e, false)}
    >
      {children}
    </Link>
  );
}

function applyHover(e: React.MouseEvent, hovered: boolean) {
  const el = e.currentTarget as HTMLElement;
  el.style.color      = hovered ? '#C8973A' : 'rgba(255,255,255,0.85)';
  el.style.background = hovered ? 'rgba(200,151,58,0.1)' : 'transparent';
}