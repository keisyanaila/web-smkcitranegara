'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronDown } from 'lucide-react';


// ─── Data ────────────────────────────────────────────────────────────────────

const ESKUL_LIST = [
  { nama: 'Paskibra',   href: '/eskul/paskibra'  },
  { nama: 'Futsal',     href: '/eskul/futsal'    },
  { nama: 'Taekwondo',  href: '/eskul/taekwondo' },
  { nama: 'Basket',     href: '/eskul/basket'    },
  { nama: 'Voli',       href: '/eskul/voli'      },
  { nama: 'Theater',    href: '/eskul/theater'   },
  { nama: 'Tari',       href: '/eskul/tari'      },
  { nama: 'Pramuka',    href: '/eskul/pramuka'   },
  { nama: 'IT Club',    href: '/eskul/itclub'    },
  { nama: 'Band',       href: '/eskul/band'      },
  { nama: 'IRMA',       href: '/eskul/irma'      },
  { nama: 'E-Sport',    href: '/eskul/esport'    },
  { nama: 'CN Gakuen',  href: '/eskul/cngakuen'  },
  { nama: 'Silat',      href: '/eskul/silat'     },
  { nama: 'Badminton',  href: '/eskul/badminton' },
  { nama: 'Paduan Suara', href: '/eskul/paduansuara' },
];

const TENTANG_LIST = [
  { nama: 'Profil Sekolah', href: '/tentang' },
  { nama: 'Staff & Guru',   href: '/gurustaffsmk' },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface Session {
  role: string;
  namaLengkap?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const NAV_LINK: React.CSSProperties = {
  color: 'rgba(255,255,255,0.85)',
  textDecoration: 'none',
  padding: '8px 14px',
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 500,
  transition: 'all 0.2s',
};

const CSS = `
  @keyframes dropFadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .drop-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
  }
  .eskul-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px 12px;
  }
  @media (max-width: 640px) {
    .drop-grid  { grid-template-columns: 1fr; }
    .eskul-grid { grid-template-columns: 1fr 1fr; }
  }
  .drop-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    text-decoration: none;
    border: 1px solid transparent;
    transition: background 0.15s, border-color 0.15s;
  }
  .drop-item:hover {
    background: #FAF7F0;
    border-color: #E8DCC8;
  }
  .eskul-text-item {
    display: flex;
    align-items: center;
    padding: 6px 8px;
    border-radius: 8px;
    text-decoration: none;
    color: #1F2937;
    font-size: 13px;
    font-weight: 500;
    transition: background 0.15s;
  }
  .eskul-text-item:hover { background: #FAF7F0; }

  .tentang-item {
    display: block;
    padding: 10px 14px;
    border-radius: 10px;
    text-decoration: none;
    color: #1F2937;
    font-size: 14px;
    font-weight: 600;
    transition: background 0.15s;
  }
  .tentang-item:hover { background: #FAF7F0; }

  /* ── Responsif: desktop nav vs mobile toggle ── */
  .nav-desktop-only { display: none; }
  .nav-mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(255,255,255,0.06);
    border: none;
    color: #fff;
    cursor: pointer;
    position: relative;
    z-index: 20001;
    transition: background 0.2s ease;
  }
  .nav-mobile-toggle:hover { background: rgba(200,151,58,0.2); }
  @media (min-width: 768px) {
    .nav-desktop-only { display: flex; }
    .nav-mobile-toggle { display: none; }
    .mnav-backdrop, .mnav-drawer { display: none !important; }
  }

  /* ── Mobile drawer ── */
  .mnav-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(6,20,14,0.55);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 20050;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.28s ease;
  }
  .mnav-backdrop.is-open { opacity: 1; pointer-events: auto; }

  .mnav-drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: min(86vw, 340px);
    background: #0B3D2E;
    border-left: 2px solid #C8973A;
    z-index: 20060;
    display: flex;
    flex-direction: column;
    transform: translateX(102%);
    transition: transform 0.34s cubic-bezier(0.33, 1, 0.68, 1);
    box-shadow: -24px 0 64px rgba(0,0,0,0.45);
  }
  .mnav-drawer.is-open { transform: translateX(0); }

  .mnav-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 18px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    flex-shrink: 0;
  }
  .mnav-brand { display: flex; align-items: center; gap: 10px; color: #fff; font-weight: 800; font-size: 14px; text-decoration: none; }
  .mnav-close {
    background: rgba(255,255,255,0.06);
    border: none;
    color: #fff;
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .mnav-close:hover { background: rgba(200,151,58,0.2); }

  .mnav-body { flex: 1; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; padding: 12px 12px 18px; }

  .mnav-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 13px 14px;
    border-radius: 12px;
    color: rgba(255,255,255,0.9);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    width: 100%;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: background 0.18s ease, color 0.18s ease;
  }
  .mnav-link:hover, .mnav-link:active { background: rgba(200,151,58,0.14); color: #E8B84B; }
  .mnav-link > svg { color: rgba(255,255,255,0.35); flex-shrink: 0; }
  .mnav-acc-btn .mnav-chev { color: #C8973A; transition: transform 0.25s ease; }
  .mnav-acc-btn.is-open .mnav-chev { transform: rotate(180deg); }
  .mnav-acc-btn.is-open { color: #E8B84B; }

  .mnav-acc-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.28s ease; }
  .mnav-acc-panel.is-open { grid-template-rows: 1fr; }
  .mnav-acc-clip { overflow: hidden; min-height: 0; }
  .mnav-acc-inner { padding: 2px 4px 8px; }

  .mnav-sub {
    display: block;
    padding: 10px 14px;
    border-radius: 10px;
    color: rgba(255,255,255,0.62);
    font-size: 13.5px;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .mnav-sub:hover, .mnav-sub:active { background: rgba(255,255,255,0.06); color: #fff; }
  .mnav-sub-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }

  .mnav-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 10px 10px; }

  .mnav-foot {
    flex-shrink: 0;
    padding: 16px 16px 22px;
    border-top: 1px solid rgba(255,255,255,0.08);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .mnav-btn-outline {
    text-align: center;
    padding: 12px;
    border-radius: 10px;
    border: 1.5px solid rgba(255,255,255,0.28);
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    transition: border-color 0.2s ease, background 0.2s ease;
  }
  .mnav-btn-outline:hover { border-color: #C8973A; background: rgba(200,151,58,0.12); }

  @media (prefers-reduced-motion: reduce) {
    .mnav-drawer, .mnav-backdrop, .mnav-acc-panel, .mnav-chev { transition: none !important; }
  }
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
      border: '1px solid #F0EBE0',
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
        border: '1px solid #F0EBE0',
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
      style={{
        ...NAV_LINK,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        color: isOpen ? '#C8973A' : 'rgba(255,255,255,0.85)',
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
        background: scrolled ? '#145A45' : '#0B3D2E',
        borderBottom: '2px solid #C8973A',
        position: 'sticky', top: 0, zIndex: 20000, // FIX: dinaikkan supaya navbar (dan tombol di dalamnya) tidak ketiban elemen lain di halaman
        transition: 'background 0.3s',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>

            {/* ── Logo ── */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0, minWidth: 0 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                <Image src="/images/logo.png" alt="Logo SMK Citra Negara" width={44} height={44} style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: 'white', fontWeight: 800, fontSize: 15, lineHeight: 1.2, whiteSpace: 'nowrap' }}>SMK Citra Negara</div>
                <div className="nav-desktop-only" style={{ color: '#C8973A', fontSize: 11, fontWeight: 500 }}>Pilihan Tepat di Sekolah yang MANTAP</div>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="nav-desktop-only" style={{ alignItems: 'center', gap: 4 }}>

              <NavLink href="/">Beranda</NavLink>

              {/* Tentang Kami */}
              <div ref={tentangRef} style={{ position: 'relative' }}>
                <NavButton label="Tentang Kami" isOpen={tentangOpen} onClick={() => setTentangOpen(v => !v)} />

                {tentangOpen && (
                  <DropdownPanel triggerRef={tentangRef} panelWidth={220} id="tentang">
                    {TENTANG_LIST.map(t => (
                      <Link key={t.nama} href={t.href} className="tentang-item" onClick={() => setTentangOpen(false)}>
                        {t.nama}
                      </Link>
                    ))}
                  </DropdownPanel>
                )}
              </div>

              {/* Jurusan */}
              <NavLink href="/jurusan">Jurusan</NavLink>

              {/* Ekstrakurikuler */}
              <div ref={eskulRef} style={{ position: 'relative' }}>
                <NavButton label="Ekstrakurikuler" isOpen={eskulOpen} onClick={() => setEskulOpen(v => !v)} />

                {eskulOpen && (
                  <DropdownPanel triggerRef={eskulRef} panelWidth={480} id="eskul">
                    <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 700, letterSpacing: 1, marginBottom: 12, paddingLeft: 2 }}>
                      16+ EKSTRAKURIKULER
                    </p>
                    <div className="eskul-grid">
                      {ESKUL_LIST.map(e => (
                        <Link key={e.nama} href={e.href} className="eskul-text-item" onClick={() => setEskulOpen(false)}>
                          {e.nama}
                        </Link>
                      ))}
                    </div>
                  </DropdownPanel>
                )}
              </div>

              <NavLink href="/prestasi">Prestasi</NavLink>
              <NavLink href="/berita">Berita</NavLink>
              <NavLink href="/spmb">SPMB</NavLink>
            </div>

            {/* ── Auth Buttons (Desktop) ── */}
            <div className="nav-desktop-only" style={{ alignItems: 'center', gap: 10, flexShrink: 0 }}>
              {session ? (
                <>
                  <Link
                    href={session.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                    style={{ color: '#C8973A', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
                  >
                    {session.namaLengkap || 'Dashboard'}
                  </Link>
                  <button type="button" onClick={handleLogout} style={{
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
                    color: 'rgba(255,255,255,0.7)', padding: '7px 16px',
                    borderRadius: 6, cursor: 'pointer', fontSize: 13,
                  }}>
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" style={{
                    color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                    fontSize: 14, fontWeight: 500, padding: '8px 16px',
                  }}>
                    Masuk
                  </Link>
                  <Link href="/register" className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>
                    Daftar Sekarang
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile Toggle ── */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="nav-mobile-toggle"
              aria-label="Buka menu"
              aria-expanded={mobileOpen}
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
            aria-label="Menu navigasi"
          >
            <div className="mnav-head">
              <Link href="/" onClick={closeMobile} className="mnav-brand">
                <Image src="/images/logo.png" alt="" width={30} height={30} style={{ borderRadius: 7 }} />
                SMK Citra Negara
              </Link>
              <button type="button" className="mnav-close" onClick={closeMobile} aria-label="Tutup menu">
                <X size={20} />
              </button>
            </div>

            <div className="mnav-body">
              <Link href="/" onClick={closeMobile} className="mnav-link">Beranda</Link>

              <button
                type="button"
                className={`mnav-link mnav-acc-btn ${mobileTentang ? 'is-open' : ''}`}
                onClick={() => setMobileTentang(v => !v)}
                aria-expanded={mobileTentang}
              >
                Tentang Kami
                <ChevronDown size={18} className="mnav-chev" />
              </button>
              <div className={`mnav-acc-panel ${mobileTentang ? 'is-open' : ''}`}>
                <div className="mnav-acc-clip">
                  <div className="mnav-acc-inner">
                    {TENTANG_LIST.map(t => (
                      <Link key={t.nama} href={t.href} onClick={closeMobile} className="mnav-sub">{t.nama}</Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/jurusan" onClick={closeMobile} className="mnav-link">Jurusan</Link>

              <button
                type="button"
                className={`mnav-link mnav-acc-btn ${mobileEskul ? 'is-open' : ''}`}
                onClick={() => setMobileEskul(v => !v)}
                aria-expanded={mobileEskul}
              >
                Ekstrakurikuler
                <ChevronDown size={18} className="mnav-chev" />
              </button>
              <div className={`mnav-acc-panel ${mobileEskul ? 'is-open' : ''}`}>
                <div className="mnav-acc-clip">
                  <div className="mnav-acc-inner mnav-sub-grid">
                    {ESKUL_LIST.map(e => (
                      <Link key={e.nama} href={e.href} onClick={closeMobile} className="mnav-sub">{e.nama}</Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/prestasi" onClick={closeMobile} className="mnav-link">Prestasi</Link>
              <Link href="/berita" onClick={closeMobile} className="mnav-link">Berita</Link>
              <Link href="/spmb" onClick={closeMobile} className="mnav-link">SPMB</Link>
            </div>

            <div className="mnav-foot">
              {session ? (
                <>
                  <Link
                    href={session.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                    onClick={closeMobile}
                    className="btn-primary"
                    style={{ textAlign: 'center', padding: 12, fontSize: 14 }}
                  >
                    {session.namaLengkap || 'Dashboard'}
                  </Link>
                  <button
                    type="button"
                    onClick={() => { closeMobile(); handleLogout(); }}
                    className="mnav-btn-outline"
                    style={{ background: 'none', cursor: 'pointer' }}
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={closeMobile} className="mnav-btn-outline">Masuk</Link>
                  <Link
                    href="/register"
                    onClick={closeMobile}
                    className="btn-primary"
                    style={{ textAlign: 'center', padding: 12, fontSize: 14 }}
                  >
                    Daftar Sekarang
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