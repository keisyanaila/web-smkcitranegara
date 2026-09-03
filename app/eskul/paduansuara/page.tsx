'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import EskulFX from '@/components/EskulFX';
import EskulMusic from '@/components/EskulMusic';
import Image from 'next/image';

const STATS = [
  { angka: '2010', label: 'Tahun Berdiri' },
  { angka: '40+',  label: 'Anggota Aktif' },
  { angka: '4',    label: 'Jenis Suara (SATB)' },
  { angka: '100%', label: 'Harmoni' },
];

const TUJUAN = [
  {
    icon: '🎼',
    judul: 'Musikalitas & Vokal',
    deskripsi:
      'Melatih teknik pernapasan, artikulasi, intonasi, dan pembacaan notasi agar setiap anggota mampu bernyanyi dengan tepat dan ekspresif.',
  },
  {
    icon: '🤝',
    judul: 'Kekompakan & Harmoni',
    deskripsi:
      'Paduan suara adalah kerja bersama — belajar mendengarkan, menyatukan suara, dan menjaga keseimbangan antar kelompok suara.',
  },
  {
    icon: '✨',
    judul: 'Percaya Diri di Panggung',
    deskripsi:
      'Melalui latihan rutin dan pementasan, siswa terbiasa tampil di depan publik dengan sikap tenang dan penuh percaya diri.',
  },
];

const KEGIATAN = [
  { no: '01', nama: 'Pemanasan Vokal', detail: 'Latihan napas, resonansi, dan pelemasan pita suara.' },
  { no: '02', nama: 'Latihan Seksional', detail: 'Sopran, Alto, Tenor, Bass berlatih part masing-masing.' },
  { no: '03', nama: 'Latihan Gabungan', detail: 'Menyatukan seluruh suara, dinamika, dan frasering.' },
  { no: '04', nama: 'Pembacaan Partitur', detail: 'Solmisasi, ritme, dan interpretasi lagu baru.' },
  { no: '05', nama: 'Gladi & Pementasan', detail: 'Upacara, wisuda, lomba, dan konser sekolah.' },
  { no: '06', nama: 'Workshop Vokal', detail: 'Kelas bersama pelatih paduan suara profesional.' },
];

const SUARA = ['Sopran', 'Alto', 'Tenor', 'Bass'];

/* ── glyph not balok, motif berulang ── */
function Note({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <ellipse cx="34" cy="74" rx="17" ry="13" fill="#E8C773" stroke="#1B1235" strokeWidth="3" transform="rotate(-18 34 74)" />
      <path d="M49 68 V20 q0 -8 8 -10 l20 -6" fill="none" stroke="#1B1235" strokeWidth="4" strokeLinecap="round" />
      <path d="M49 24 l28 -8 v14 l-28 8 Z" fill="#E8C773" stroke="#1B1235" strokeWidth="3" strokeLinejoin="round" />
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
    <div className="psu-stat">
      <div className="psu-stat-num">{display}{suffix}</div>
      <div className="psu-stat-label">{label}</div>
    </div>
  );
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`psu-reveal ${inView ? 'psu-reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function PaduanSuaraPage() {
  const [statsRef, statsInView] = useInView<HTMLDivElement>(0.4);
  const [sing, setSing] = useState(false);

  const doSing = () => {
    setSing(true);
    setTimeout(() => setSing(false), 1400);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .psu-root {
          --psu-bg: #F6F2FB;
          --psu-paper: #FFFFFF;
          --psu-ink: #1B1235;
          --psu-indigo: #3A2A6B;
          --psu-indigo-deep: #150F2E;
          --psu-gold: #E8C773;
          --psu-gold-deep: #C79B45;
          --psu-line: #E4DAF3;
          --psu-muted: rgba(27,18,53,0.62);

          font-family: 'Barlow', sans-serif;
          background: var(--psu-bg);
          color: var(--psu-ink);
          min-height: 100vh;
          overflow-x: hidden;
        }
        .psu-root * { box-sizing: border-box; }

        @media (prefers-reduced-motion: reduce) {
          .psu-root *, .psu-root *::before, .psu-root *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }

        /* ══ hero ══ */
        .psu-hero { position: relative; overflow: hidden; background: var(--psu-indigo-deep); }
        .psu-hero-img { position: relative; width: 100%; height: min(72vh, 620px); }
        .psu-hero-img img { object-fit: cover; object-position: center 28%; filter: saturate(1.02) brightness(0.72); }
        .psu-hero-overlay {
          position: absolute; inset: 0;
          background:
            radial-gradient(46% 40% at 84% 12%, rgba(232,199,115,0.26), transparent 60%),
            linear-gradient(to bottom, rgba(21,15,46,0.35) 0%, rgba(21,15,46,0.6) 55%, var(--psu-bg) 100%);
        }
        /* garis paranada yang tergambar masuk */
        .psu-staff { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .psu-staff span {
          position: absolute; left: 0; right: 0; height: 1px; background: rgba(255,255,255,0.18);
          transform: scaleX(0); transform-origin: left; animation: psuLine 1.1s cubic-bezier(.2,.8,.2,1) forwards;
        }
        .psu-staff span:nth-child(1) { top: 22%; animation-delay: .1s; }
        .psu-staff span:nth-child(2) { top: 33%; animation-delay: .2s; }
        .psu-staff span:nth-child(3) { top: 44%; animation-delay: .3s; }
        .psu-staff span:nth-child(4) { top: 55%; animation-delay: .4s; }
        .psu-staff span:nth-child(5) { top: 66%; animation-delay: .5s; }
        @keyframes psuLine { to { transform: scaleX(1); } }

        .psu-hero-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 0 clamp(24px, 6vw, 80px) clamp(40px, 6vw, 72px);
          display: flex; align-items: flex-end; justify-content: space-between; gap: 24px;
        }
        .psu-hero-text { max-width: 660px; }
        .psu-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase; color: #fff; margin-bottom: 18px;
        }
        .psu-eyebrow::before { content: ''; width: 28px; height: 2px; background: var(--psu-gold); }
        .psu-title {
          font-family: 'Cormorant Garamond', serif; font-weight: 700;
          font-size: clamp(52px, 9vw, 128px); line-height: 0.92; color: #fff; letter-spacing: 1px; margin: 0 0 18px;
          text-shadow: 0 6px 30px rgba(0,0,0,0.4);
        }
        .psu-word { display: inline-block; white-space: nowrap; }
        .psu-letter { display: inline-block; opacity: 0; animation: psuRise 0.7s cubic-bezier(.2,.8,.2,1) forwards; }
        .psu-letter-accent { color: var(--psu-gold); font-style: italic; }
        @keyframes psuRise {
          0%   { opacity: 0; transform: translateY(26px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .psu-subtitle { max-width: 580px; font-size: clamp(15px, 1.8vw, 18px); color: rgba(255,255,255,0.86); line-height: 1.75; }

        /* motif equalizer bar + not melayang */
        .psu-eq-zone { position: relative; width: 150px; height: 190px; flex-shrink: 0; display: none; }
        @media (min-width: 900px) { .psu-eq-zone { display: flex; } }
        .psu-eq { display: flex; align-items: flex-end; gap: 7px; height: 120px; margin-top: auto; }
        .psu-eq i { width: 10px; border-radius: 6px 6px 0 0; background: linear-gradient(180deg, var(--psu-gold), var(--psu-gold-deep)); animation: psuBar 1.1s ease-in-out infinite; }
        .psu-eq i:nth-child(1) { height: 40%; animation-delay: -.1s; }
        .psu-eq i:nth-child(2) { height: 80%; animation-delay: -.5s; }
        .psu-eq i:nth-child(3) { height: 55%; animation-delay: -.9s; }
        .psu-eq i:nth-child(4) { height: 95%; animation-delay: -.3s; }
        .psu-eq i:nth-child(5) { height: 65%; animation-delay: -.7s; }
        @keyframes psuBar { 0%,100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
        .psu-float-note { position: absolute; top: 0; right: 6px; animation: psuFloatNote 3.4s ease-in-out infinite; opacity: 0.9; }
        @keyframes psuFloatNote {
          0%   { transform: translateY(10px) rotate(-8deg); opacity: 0; }
          20%  { opacity: 0.9; }
          100% { transform: translateY(-70px) rotate(12deg); opacity: 0; }
        }

        /* ══ reveal ══ */
        .psu-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .psu-reveal-in { opacity: 1; transform: translateY(0); }

        /* ══ stats ══ */
        .psu-scoreboard { background: var(--psu-indigo-deep); }
        .psu-stats { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 640px) { .psu-stats { grid-template-columns: repeat(2, 1fr); } }
        .psu-stat { padding: clamp(26px, 4vw, 40px) 20px; text-align: center; border-right: 1px solid rgba(232,199,115,0.18); }
        .psu-stat:last-child { border-right: none; }
        .psu-stat-num {
          font-family: 'Cormorant Garamond', serif; font-weight: 700; font-size: clamp(34px, 5vw, 48px); color: var(--psu-gold);
          line-height: 1; margin-bottom: 6px; text-shadow: 0 0 18px rgba(232,199,115,0.35); font-variant-numeric: tabular-nums;
        }
        .psu-stat-label { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(246,242,251,0.55); }

        /* ══ section ══ */
        .psu-section { max-width: 1100px; margin: 0 auto; padding: clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px); }
        .psu-section-label { font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--psu-gold-deep); margin-bottom: 12px; }
        .psu-section-heading { font-family: 'Cormorant Garamond', serif; font-weight: 700; font-size: clamp(38px, 5vw, 60px); color: var(--psu-ink); line-height: 1.05; margin-bottom: 44px; }

        /* ══ jenis suara pills ══ */
        .psu-voices { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 40px; }
        .psu-voice {
          font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 800;
          letter-spacing: 1px; text-transform: uppercase; color: var(--psu-indigo);
          background: var(--psu-paper); border: 1px solid var(--psu-line); border-radius: 999px;
          padding: 9px 20px; transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .psu-voice:hover { transform: translateY(-3px); background: linear-gradient(135deg, var(--psu-indigo), #5a44a6); color: #fff; border-color: transparent; }

        /* ══ tujuan ══ */
        .psu-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 768px) { .psu-grid-3 { grid-template-columns: 1fr; } }
        .psu-card {
          background: var(--psu-paper); padding: 36px 28px; border: 1px solid var(--psu-line);
          border-radius: 16px; box-shadow: 0 6px 20px rgba(27,18,53,0.06); position: relative; overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .psu-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--psu-indigo), var(--psu-gold));
          transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease;
        }
        .psu-card:hover { transform: translateY(-6px); box-shadow: 0 18px 34px rgba(27,18,53,0.14); border-color: var(--psu-gold); }
        .psu-card:hover::after { transform: scaleX(1); }
        .psu-card-icon { font-size: 32px; margin-bottom: 18px; display: inline-block; }
        .psu-card:hover .psu-card-icon { animation: psuSway 0.9s ease-in-out; }
        @keyframes psuSway { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-14deg) translateY(-4px); } 75% { transform: rotate(14deg) translateY(-4px); } }
        .psu-card-title { font-family: 'Barlow Condensed', sans-serif; font-size: 21px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .psu-card-desc { font-size: 14px; color: var(--psu-muted); line-height: 1.75; }

        /* ══ divider paranada ══ */
        .psu-divider { max-width: 1100px; margin: 0 auto; padding: 0 clamp(24px, 6vw, 80px); }
        .psu-divider svg { width: 100%; height: 34px; display: block; opacity: 0.55; }

        /* ══ kegiatan ══ */
        .psu-keg-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px;
          background: var(--psu-line); border: 1px solid var(--psu-line); border-radius: 16px; overflow: hidden;
        }
        @media (max-width: 640px) { .psu-keg-grid { grid-template-columns: 1fr; } }
        .psu-keg-item { background: var(--psu-paper); padding: 26px 28px; display: flex; align-items: flex-start; gap: 20px; position: relative; transition: background 0.2s ease; }
        .psu-keg-item::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--psu-gold); transform: scaleY(0); transform-origin: bottom; transition: transform 0.3s ease; }
        .psu-keg-item:hover { background: var(--psu-bg); }
        .psu-keg-item:hover::before { transform: scaleY(1); }
        .psu-keg-no { font-family: 'Cormorant Garamond', serif; font-weight: 700; font-size: 34px; color: rgba(58,42,107,0.32); line-height: 1; width: 40px; flex-shrink: 0; transition: color 0.2s ease; }
        .psu-keg-item:hover .psu-keg-no { color: var(--psu-indigo); }
        .psu-keg-nama { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .psu-keg-detail { font-size: 13px; color: var(--psu-muted); }

        /* ══ join / CTA ══ */
        .psu-join { text-align: center; padding: clamp(64px, 9vw, 100px) clamp(24px, 6vw, 80px); background: radial-gradient(60% 80% at 50% 0%, rgba(232,199,115,0.16), transparent 70%); }
        .psu-join-heading { font-family: 'Cormorant Garamond', serif; font-weight: 700; font-size: clamp(34px, 6vw, 56px); line-height: 1.05; margin-bottom: 16px; }
        .psu-join-heading span { color: var(--psu-gold-deep); font-style: italic; }
        .psu-join-copy { max-width: 480px; margin: 0 auto 30px; font-size: 15px; color: var(--psu-muted); line-height: 1.75; }
        .psu-join-motif { display: inline-flex; flex-direction: column; align-items: center; gap: 12px; cursor: pointer; background: none; border: none; padding: 0; position: relative; }
        .psu-join-bars { display: flex; align-items: flex-end; gap: 6px; height: 60px; }
        .psu-join-bars i { width: 9px; border-radius: 5px 5px 0 0; background: linear-gradient(180deg, var(--psu-gold), var(--psu-gold-deep)); height: 30%; transition: height 0.2s ease; }
        .psu-join-motif:hover .psu-join-bars i { height: 60%; }
        .psu-join-motif.sing .psu-join-bars i { animation: psuSingBar 0.5s ease-in-out infinite; }
        .psu-join-motif.sing .psu-join-bars i:nth-child(2) { animation-delay: .12s; }
        .psu-join-motif.sing .psu-join-bars i:nth-child(3) { animation-delay: .24s; }
        .psu-join-motif.sing .psu-join-bars i:nth-child(4) { animation-delay: .36s; }
        .psu-join-motif.sing .psu-join-bars i:nth-child(5) { animation-delay: .48s; }
        @keyframes psuSingBar { 0%,100% { height: 25%; } 50% { height: 100%; } }
        .psu-join-note { position: absolute; left: 50%; top: 0; opacity: 0; }
        .psu-join-motif.sing .psu-join-note { animation: psuNoteUp 1.2s ease-out forwards; }
        .psu-join-motif.sing .psu-join-note.n2 { animation-delay: .18s; }
        .psu-join-motif.sing .psu-join-note.n3 { animation-delay: .38s; }
        @keyframes psuNoteUp {
          0%   { opacity: 0; transform: translate(-50%, 0) rotate(-10deg) scale(0.6); }
          20%  { opacity: 1; }
          100% { opacity: 0; transform: translate(-120%, -120px) rotate(20deg) scale(1); }
        }
        .psu-join-hint { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(27,18,53,0.45); }
      `}</style>

      <div className="psu-root">
        <Navbar />

        <main>
          {/* Hero */}
          <section className="psu-hero">
            <div className="psu-hero-img">
              <Image src="/images/eskul/eskulpaduansuara.jpg" alt="Paduan Suara SMK Citra Negara" fill priority sizes="100vw" />
              <div className="psu-staff" aria-hidden="true"><span /><span /><span /><span /><span /></div>
              <div className="psu-hero-overlay" />
            </div>
            <div className="psu-hero-content">
              <div className="psu-hero-text">
                <div className="psu-eyebrow">Ekstrakurikuler SMK Citra Negara</div>
                <h1 className="psu-title">
                  {['PADUAN', 'SUARA'].map((word, wi) => (
                    <span key={wi} className="psu-word">
                      {word.split('').map((ch, i) => (
                        <span
                          key={i}
                          className={`psu-letter ${wi === 1 ? 'psu-letter-accent' : ''}`}
                          style={{ animationDelay: `${(wi * 6 + i) * 60}ms` }}
                        >
                          {ch}
                        </span>
                      ))}
                      {wi === 0 ? ' ' : null}
                    </span>
                  ))}
                </h1>
                <p className="psu-subtitle">
                  Satu suara dari banyak hati. Ekstrakurikuler paduan suara melatih teknik vokal,
                  kepekaan harmoni, dan keberanian tampil — menghadirkan lagu yang menyentuh di setiap panggung.
                </p>
              </div>
              <div className="psu-eq-zone" aria-hidden="true">
                <Note size={30} className="psu-float-note" />
                <div className="psu-eq"><i /><i /><i /><i /><i /></div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <div className="psu-scoreboard">
            <div className="psu-stats" ref={statsRef}>
              {STATS.map((s, i) => (
                <StatCounter key={s.label} angka={s.angka} label={s.label} inView={statsInView} delay={i * 110} />
              ))}
            </div>
          </div>

          {/* Tujuan */}
          <section className="psu-section">
            <Reveal><div className="psu-section-label">Mengapa Paduan Suara</div></Reveal>
            <Reveal delay={60}><h2 className="psu-section-heading">Menyatukan Suara, Menyentuh Hati</h2></Reveal>
            <Reveal delay={100}>
              <div className="psu-voices">
                {SUARA.map((v) => <span key={v} className="psu-voice">{v}</span>)}
              </div>
            </Reveal>
            <div className="psu-grid-3">
              {TUJUAN.map((t, i) => (
                <Reveal key={t.judul} delay={i * 120} className="psu-card">
                  <span className="psu-card-icon" aria-hidden="true">{t.icon}</span>
                  <div className="psu-card-title">{t.judul}</div>
                  <p className="psu-card-desc">{t.deskripsi}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* divider paranada */}
          <div className="psu-divider" aria-hidden="true">
            <svg viewBox="0 0 1000 34" preserveAspectRatio="none">
              {[6, 13, 20, 27, 34].map((y) => (
                <line key={y} x1="0" y1={y * 0.7 + 2} x2="1000" y2={y * 0.7 + 2} stroke="#3A2A6B" strokeWidth="1" />
              ))}
              <circle cx="120" cy="12" r="5" fill="#C79B45" />
              <circle cx="360" cy="22" r="5" fill="#C79B45" />
              <circle cx="620" cy="9" r="5" fill="#C79B45" />
              <circle cx="860" cy="19" r="5" fill="#C79B45" />
            </svg>
          </div>

          {/* Kegiatan */}
          <section className="psu-section" style={{ paddingTop: 'clamp(40px, 5vw, 64px)' }}>
            <Reveal><div className="psu-section-label">Jadwal Latihan</div></Reveal>
            <Reveal delay={60}><h2 className="psu-section-heading">Kegiatan Rutin</h2></Reveal>
            <div className="psu-keg-grid">
              {KEGIATAN.map((k, i) => (
                <Reveal key={k.no} delay={i * 80} className="psu-keg-item">
                  <div className="psu-keg-no">{k.no}</div>
                  <div>
                    <div className="psu-keg-nama">{k.nama}</div>
                    <div className="psu-keg-detail">{k.detail}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Join */}
          <section className="psu-join">
            <div className="psu-section-label" style={{ display: 'inline-block' }}>Gabung Yuk</div>
            <h2 className="psu-join-heading">Punya suara? <span>Bawa ke sini.</span></h2>
            <p className="psu-join-copy">
              Nggak perlu bisa baca not balok dari awal — semua diajarkan bertahap. Hubungi pembina
              ekstrakurikuler paduan suara di sekolah untuk ikut audisi ringan.
            </p>
            <button type="button" className={`psu-join-motif${sing ? ' sing' : ''}`} onClick={doSing} aria-label="Coba bernyanyi">
              <Note size={22} className="psu-join-note n1" />
              <Note size={18} className="psu-join-note n2" />
              <Note size={20} className="psu-join-note n3" />
              <span className="psu-join-bars"><i /><i /><i /><i /><i /></span>
              <span className="psu-join-hint">ketuk buat bernyanyi</span>
            </button>
          </section>
        </main>

        <EskulMusic src="/audio/paduansuara.mp3" />
        <EskulFX />
        <Footer />
      </div>
    </>
  );
}
