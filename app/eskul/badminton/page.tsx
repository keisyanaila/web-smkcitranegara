'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import EskulFX from '@/components/EskulFX';
import EskulMusic from '@/components/EskulMusic';
import Image from 'next/image';

const STATS = [
  { angka: '2011', label: 'Tahun Berdiri' },
  { angka: '26+',  label: 'Anggota Aktif' },
  { angka: '18',   label: 'Prestasi Diraih' },
  { angka: '100%', label: 'Semangat' },
];

const TUJUAN = [
  {
    icon: '🏸',
    judul: 'Kelincahan & Refleks',
    deskripsi:
      'Latihan footwork, pukulan, dan reaksi cepat melatih kelincahan, keseimbangan, serta refleks siswa di setiap sesi.',
  },
  {
    icon: '💪',
    judul: 'Kebugaran & Stamina',
    deskripsi:
      'Rally panjang dan drill intensitas tinggi membangun daya tahan kardio, kekuatan kaki, dan kontrol napas.',
  },
  {
    icon: '🎯',
    judul: 'Fokus & Sportivitas',
    deskripsi:
      'Bulu tangkis menuntut konsentrasi penuh dan sikap jujur — belajar menang dengan rendah hati dan kalah dengan lapang dada.',
  },
];

const KEGIATAN = [
  { no: '01', nama: 'Latihan Teknik Dasar', detail: 'Grip, servis, clear, drop shot, netting, dan smash.' },
  { no: '02', nama: 'Latihan Footwork',     detail: 'Pola langkah 6 titik dan perpindahan cepat di lapangan.' },
  { no: '03', nama: 'Drill & Rally',        detail: 'Multi-shuttle, rally terkontrol, dan ketahanan pukulan.' },
  { no: '04', nama: 'Simulasi Pertandingan',detail: 'Tunggal & ganda dengan sistem skor rally point.' },
  { no: '05', nama: 'Fisik & Kelenturan',   detail: 'Skipping, plyometric, core, dan peregangan.' },
  { no: '06', nama: 'Turnamen',             detail: 'Kompetisi internal sekolah dan antar-sekolah.' },
];

/* ── glyph kok / shuttlecock, motif berulang di halaman ini ── */
function Shuttle({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="50" cy="74" r="16" fill="#F4FAF2" stroke="#123524" strokeWidth="3" />
      <path d="M50 62 L30 16 M50 62 L42 14 M50 62 L58 14 M50 62 L70 16" stroke="#123524" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 16 Q50 4 70 16 L58 30 Q50 24 42 30 Z" fill="#B7F171" stroke="#123524" strokeWidth="3" strokeLinejoin="round" />
      <line x1="42" y1="34" x2="58" y2="34" stroke="#123524" strokeWidth="2.5" />
    </svg>
  );
}

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function StatCounter({ angka, label, inView, delay }: { angka: string; label: string; inView: boolean; delay: number }) {
  const { num, suffix } = parseStat(angka);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now() + delay;
    const duration = 1100;
    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * num));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, delay]);
  return (
    <div className="bdm-stat">
      <div className="bdm-stat-num">{display}{suffix}</div>
      <div className="bdm-stat-label">{label}</div>
    </div>
  );
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`bdm-reveal ${inView ? 'bdm-reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function BadmintonPage() {
  const [statsRef, statsInView] = useInView<HTMLDivElement>(0.4);
  const [hit, setHit] = useState(false);

  const smash = () => {
    setHit(true);
    setTimeout(() => setHit(false), 700);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .bdm-root {
          --bdm-paper: #F4FAF2;
          --bdm-paper-2: #FFFFFF;
          --bdm-ink: #10241B;
          --bdm-green: #1E5A3D;
          --bdm-green-deep: #0B2A1C;
          --bdm-lime: #8FE154;
          --bdm-line: #C7E7B7;
          --bdm-muted: rgba(16,36,27,0.62);

          font-family: 'Barlow', sans-serif;
          background: var(--bdm-paper);
          color: var(--bdm-ink);
          min-height: 100vh;
          overflow-x: hidden;
        }
        .bdm-root * { box-sizing: border-box; }

        @media (prefers-reduced-motion: reduce) {
          .bdm-root *, .bdm-root *::before, .bdm-root *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }

        /* ══ hero ══ */
        .bdm-hero { position: relative; overflow: hidden; background: var(--bdm-green-deep); }
        .bdm-hero-img { position: relative; width: 100%; height: min(72vh, 620px); }
        .bdm-hero-img img { object-fit: cover; object-position: center 30%; filter: saturate(1.05) brightness(0.82); }
        .bdm-hero-overlay {
          position: absolute; inset: 0;
          background:
            radial-gradient(50% 40% at 82% 12%, rgba(143,225,84,0.28), transparent 60%),
            linear-gradient(to bottom, rgba(11,42,28,0.25) 0%, rgba(11,42,28,0.55) 55%, var(--bdm-paper) 100%);
        }
        /* garis-garis lapangan yang menyapu masuk */
        .bdm-court-lines { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .bdm-court-lines span {
          position: absolute; left: 0; right: 0; height: 2px; background: rgba(255,255,255,0.22);
          transform: scaleX(0); transform-origin: left; animation: bdmLine 1s cubic-bezier(.2,.8,.2,1) forwards;
        }
        .bdm-court-lines span:nth-child(1) { top: 26%; animation-delay: .15s; }
        .bdm-court-lines span:nth-child(2) { top: 50%; animation-delay: .3s; }
        .bdm-court-lines span:nth-child(3) { top: 74%; animation-delay: .45s; }
        @keyframes bdmLine { to { transform: scaleX(1); } }

        .bdm-hero-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 0 clamp(24px, 6vw, 80px) clamp(40px, 6vw, 72px);
          display: flex; align-items: flex-end; justify-content: space-between; gap: 24px;
        }
        .bdm-hero-text { max-width: 640px; }
        .bdm-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase; color: #fff; margin-bottom: 18px;
        }
        .bdm-eyebrow::before { content: ''; width: 28px; height: 2px; background: var(--bdm-lime); }
        .bdm-title {
          font-family: 'Bebas Neue', sans-serif; font-size: clamp(60px, 11vw, 150px);
          line-height: 0.88; color: #fff; letter-spacing: 2px; margin: 0 0 18px;
          text-shadow: 0 6px 28px rgba(0,0,0,0.35);
        }
        .bdm-letter { display: inline-block; opacity: 0; animation: bdmDrop 0.6s cubic-bezier(.2,.8,.2,1) forwards; }
        .bdm-letter-accent { color: var(--bdm-lime); }
        @keyframes bdmDrop {
          0%   { opacity: 0; transform: translateY(-40px) rotate(-12deg); }
          60%  { opacity: 1; transform: translateY(8px) rotate(4deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0); }
        }
        .bdm-subtitle { max-width: 560px; font-size: clamp(15px, 1.8vw, 18px); color: rgba(255,255,255,0.86); line-height: 1.7; }

        /* motif kok terbang bolak-balik seperti rally */
        .bdm-rally-zone { position: relative; width: 150px; height: 210px; flex-shrink: 0; display: none; }
        @media (min-width: 900px) { .bdm-rally-zone { display: block; } }
        .bdm-shuttle-fly { position: absolute; top: 20px; left: 10px; animation: bdmRally 2.2s cubic-bezier(.45,0,.55,1) infinite; }
        .bdm-shuttle-fly svg { animation: bdmWobble 0.6s ease-in-out infinite; display: block; }
        @keyframes bdmRally {
          0%   { transform: translate(0,0) rotate(-25deg); }
          50%  { transform: translate(70px,150px) rotate(200deg); }
          100% { transform: translate(0,0) rotate(-25deg); }
        }
        @keyframes bdmWobble { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }

        /* ══ reveal ══ */
        .bdm-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .bdm-reveal-in { opacity: 1; transform: translateY(0); }

        /* ══ stats ══ */
        .bdm-scoreboard { background: var(--bdm-green-deep); }
        .bdm-stats { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 640px) { .bdm-stats { grid-template-columns: repeat(2, 1fr); } }
        .bdm-stat { padding: clamp(26px, 4vw, 40px) 20px; text-align: center; border-right: 1px solid rgba(143,225,84,0.22); }
        .bdm-stat:last-child { border-right: none; }
        .bdm-stat-num {
          font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 5vw, 50px); color: var(--bdm-lime);
          line-height: 1; margin-bottom: 6px; text-shadow: 0 0 18px rgba(143,225,84,0.4); font-variant-numeric: tabular-nums;
        }
        .bdm-stat-label { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(244,250,242,0.55); }

        /* ══ section ══ */
        .bdm-section { max-width: 1100px; margin: 0 auto; padding: clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px); }
        .bdm-section-label { font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--bdm-green); margin-bottom: 12px; }
        .bdm-section-heading { font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px, 5vw, 64px); color: var(--bdm-ink); line-height: 1; margin-bottom: 48px; }

        /* ══ tujuan ══ */
        .bdm-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 768px) { .bdm-grid-3 { grid-template-columns: 1fr; } }
        .bdm-card {
          background: var(--bdm-paper-2); padding: 36px 28px; border: 1px solid var(--bdm-line);
          border-radius: 16px; box-shadow: 0 4px 16px rgba(16,36,27,0.05); position: relative; overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .bdm-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--bdm-green), var(--bdm-lime));
          transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease;
        }
        .bdm-card:hover { transform: translateY(-6px); box-shadow: 0 16px 30px rgba(16,36,27,0.12); border-color: var(--bdm-lime); }
        .bdm-card:hover::after { transform: scaleX(1); }
        .bdm-card-icon { font-size: 34px; margin-bottom: 18px; display: inline-block; }
        .bdm-card:hover .bdm-card-icon { animation: bdmPop 0.6s cubic-bezier(.36,.02,.4,1.4); }
        @keyframes bdmPop { 0% { transform: translateY(0) scale(1); } 35% { transform: translateY(-12px) scale(1.15) rotate(-10deg); } 100% { transform: translateY(0) scale(1); } }
        .bdm-card-title { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .bdm-card-desc { font-size: 14px; color: var(--bdm-muted); line-height: 1.75; }

        /* ══ divider: baris kok ══ */
        .bdm-divider { max-width: 1100px; margin: 0 auto; padding: 0 clamp(24px, 6vw, 80px); display: flex; align-items: center; gap: 14px; opacity: 0.55; }
        .bdm-divider::before, .bdm-divider::after { content: ''; flex: 1; height: 1px; background: repeating-linear-gradient(90deg, var(--bdm-green) 0 8px, transparent 8px 16px); }
        .bdm-divider svg { animation: bdmSpinSlow 4s linear infinite; }
        @keyframes bdmSpinSlow { to { transform: rotate(360deg); } }

        /* ══ kegiatan ══ */
        .bdm-keg-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px;
          background: var(--bdm-line); border: 1px solid var(--bdm-line); border-radius: 16px; overflow: hidden;
        }
        @media (max-width: 640px) { .bdm-keg-grid { grid-template-columns: 1fr; } }
        .bdm-keg-item { background: var(--bdm-paper-2); padding: 26px 28px; display: flex; align-items: flex-start; gap: 20px; position: relative; transition: background 0.2s ease; }
        .bdm-keg-item::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--bdm-lime); transform: scaleY(0); transform-origin: bottom; transition: transform 0.3s ease; }
        .bdm-keg-item:hover { background: var(--bdm-paper); }
        .bdm-keg-item:hover::before { transform: scaleY(1); }
        .bdm-keg-no { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: rgba(30,90,61,0.35); line-height: 1; width: 40px; flex-shrink: 0; transition: color 0.2s ease; }
        .bdm-keg-item:hover .bdm-keg-no { color: var(--bdm-green); animation: bdmSmash 0.35s ease; }
        @keyframes bdmSmash { 0% { transform: scale(1) rotate(0); } 40% { transform: scale(1.35) rotate(-10deg); } 100% { transform: scale(1) rotate(0); } }
        .bdm-keg-nama { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .bdm-keg-detail { font-size: 13px; color: var(--bdm-muted); }

        /* ══ join / CTA ══ */
        .bdm-join { text-align: center; padding: clamp(64px, 9vw, 100px) clamp(24px, 6vw, 80px); background: radial-gradient(60% 80% at 50% 0%, rgba(143,225,84,0.14), transparent 70%); }
        .bdm-join-heading { font-family: 'Bebas Neue', sans-serif; font-size: clamp(34px, 6vw, 56px); text-transform: uppercase; line-height: 1.05; margin-bottom: 16px; }
        .bdm-join-heading span { color: var(--bdm-green); }
        .bdm-join-copy { max-width: 460px; margin: 0 auto 30px; font-size: 15px; color: var(--bdm-muted); line-height: 1.75; }
        .bdm-join-motif { display: inline-flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer; background: none; border: none; padding: 0; }
        .bdm-join-motif svg { transition: transform 0.15s ease; }
        .bdm-join-motif:hover svg { transform: scale(1.08) rotate(-8deg); }
        .bdm-join-motif.hit svg { animation: bdmServe 0.7s cubic-bezier(.2,.8,.2,1); }
        @keyframes bdmServe {
          0%   { transform: translateY(0) scale(1) rotate(0); }
          25%  { transform: translateY(20px) scale(0.85) rotate(20deg); }
          60%  { transform: translateY(-60px) scale(1.15) rotate(-220deg); }
          100% { transform: translateY(0) scale(1) rotate(-360deg); }
        }
        .bdm-join-ripple { position: relative; }
        .bdm-join-ripple::after { content: ''; position: absolute; inset: -14px; border-radius: 50%; border: 2px solid var(--bdm-green); opacity: 0; }
        .bdm-join-motif.hit .bdm-join-ripple::after { animation: bdmRipple 0.6s ease-out; }
        @keyframes bdmRipple { 0% { opacity: 0.8; transform: scale(0.6); } 100% { opacity: 0; transform: scale(1.9); } }
        .bdm-join-hint { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(16,36,27,0.45); }
      `}</style>

      <div className="bdm-root">
        <Navbar />

        <main>
          {/* Hero */}
          <section className="bdm-hero">
            <div className="bdm-hero-img">
              <Image src="/images/eskul/eskulbadminton.jpg" alt="Badminton SMK Citra Negara" fill priority sizes="100vw" />
              <div className="bdm-court-lines" aria-hidden="true"><span /><span /><span /></div>
              <div className="bdm-hero-overlay" />
            </div>
            <div className="bdm-hero-content">
              <div className="bdm-hero-text">
                <div className="bdm-eyebrow">Ekstrakurikuler SMK Citra Negara</div>
                <h1 className="bdm-title">
                  {'BADMINTON'.split('').map((ch, i) => (
                    <span key={i} className={`bdm-letter ${i >= 3 ? 'bdm-letter-accent' : ''}`} style={{ animationDelay: `${i * 70}ms` }}>{ch}</span>
                  ))}
                </h1>
                <p className="bdm-subtitle">
                  Cepat, presisi, dan penuh strategi. Ekstrakurikuler bulu tangkis melatih kelincahan,
                  stamina, dan mental bertanding lewat rally seru di setiap latihan.
                </p>
              </div>
              <div className="bdm-rally-zone" aria-hidden="true">
                <div className="bdm-shuttle-fly"><Shuttle size={64} /></div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <div className="bdm-scoreboard">
            <div className="bdm-stats" ref={statsRef}>
              {STATS.map((s, i) => (
                <StatCounter key={s.label} angka={s.angka} label={s.label} inView={statsInView} delay={i * 110} />
              ))}
            </div>
          </div>

          {/* Tujuan */}
          <section className="bdm-section">
            <Reveal><div className="bdm-section-label">Mengapa Badminton</div></Reveal>
            <Reveal delay={60}><h2 className="bdm-section-heading">TUJUAN KAMI</h2></Reveal>
            <div className="bdm-grid-3">
              {TUJUAN.map((t, i) => (
                <Reveal key={t.judul} delay={i * 120} className="bdm-card">
                  <span className="bdm-card-icon" aria-hidden="true">{t.icon}</span>
                  <div className="bdm-card-title">{t.judul}</div>
                  <p className="bdm-card-desc">{t.deskripsi}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <div className="bdm-divider" aria-hidden="true"><Shuttle size={26} /></div>

          {/* Kegiatan */}
          <section className="bdm-section" style={{ paddingTop: 'clamp(40px, 5vw, 64px)' }}>
            <Reveal><div className="bdm-section-label">Program Latihan</div></Reveal>
            <Reveal delay={60}><h2 className="bdm-section-heading">KEGIATAN RUTIN</h2></Reveal>
            <div className="bdm-keg-grid">
              {KEGIATAN.map((k, i) => (
                <Reveal key={k.no} delay={i * 80} className="bdm-keg-item">
                  <div className="bdm-keg-no">{k.no}</div>
                  <div>
                    <div className="bdm-keg-nama">{k.nama}</div>
                    <div className="bdm-keg-detail">{k.detail}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Join */}
          <section className="bdm-join">
            <div className="bdm-section-label" style={{ display: 'inline-block' }}>Gabung Yuk</div>
            <h2 className="bdm-join-heading">SIAP <span>SMASH</span> PERTAMA?</h2>
            <p className="bdm-join-copy">
              Nggak harus jago dulu — yang penting mau belajar dan konsisten latihan. Hubungi pembina
              ekstrakurikuler di sekolah untuk info pendaftaran.
            </p>
            <button type="button" className={`bdm-join-motif${hit ? ' hit' : ''}`} onClick={smash} aria-label="Coba servis kok">
              <span className="bdm-join-ripple"><Shuttle size={78} /></span>
              <span className="bdm-join-hint">ketuk buat servis</span>
            </button>
          </section>
        </main>

        <EskulMusic src="/audio/badminton.mp3" />
        <EskulFX />
        <Footer />
      </div>
    </>
  );
}
