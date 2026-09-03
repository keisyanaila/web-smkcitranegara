'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import EskulFX from '@/components/EskulFX';
import EskulMusic from '@/components/EskulMusic';
import Image from 'next/image';

const STATS = [
  { angka: '2015', label: 'Tahun Berdiri' },
  { angka: '25+', label: 'Anggota Aktif' },
  { angka: '12', label: 'Prestasi Diraih' },
  { angka: '100%', label: 'Dedikasi' },
];

const TUJUAN = [
  { icon: '⚡', judul: 'Kebugaran Fisik', deskripsi: 'Latihan intens dan pertandingan dinamis membangun daya tahan, kecepatan, dan kekuatan tubuh secara menyeluruh.' },
  { icon: '⚽', judul: 'Keterampilan Teknis', deskripsi: 'Dribbling, passing, kontrol bola, dan tembakan diasah lewat drill terukur di ruang sempit khas futsal.' },
  { icon: '🤝', judul: 'Kerjasama Tim', deskripsi: 'Komunikasi, kepercayaan, dan strategi bersama — lima pemain bergerak seperti satu.' },
];

const KEGIATAN = [
  { no: '01', nama: 'Latihan Teknik Dasar', detail: 'Dribbling, passing, shooting, dan penguasaan bola.', kategori: 'teknik' },
  { no: '02', nama: 'Latihan Fisik', detail: 'Jogging, sprint interval, dan latihan kekuatan.', kategori: 'fisik' },
  { no: '03', nama: 'Strategi & Taktik', detail: 'Formasi, pergerakan tanpa bola, dan pola serangan.', kategori: 'strategi' },
  { no: '04', nama: 'Pertandingan Internal', detail: 'Scrimmage antar anggota untuk menguji kemampuan.', kategori: 'kompetisi' },
  { no: '05', nama: 'Partisipasi Turnamen', detail: 'Kompetisi futsal regional hingga nasional.', kategori: 'kompetisi' },
  { no: '06', nama: 'Pengembangan Mentalitas', detail: 'Sportivitas, fair play, dan mental pemenang.', kategori: 'mental' },
];

const FILTERS = [
  { key: 'semua', label: 'Semua' },
  { key: 'teknik', label: 'Teknik' },
  { key: 'fisik', label: 'Fisik' },
  { key: 'strategi', label: 'Strategi' },
  { key: 'kompetisi', label: 'Kompetisi' },
  { key: 'mental', label: 'Mental' },
];

const POSISI = [
  { nama: 'Kiper', peran: 'Penjaga gawang sekaligus pemantik serangan dari belakang.' },
  { nama: 'Anchor', peran: 'Jangkar pertahanan, mengatur tempo dan menutup ruang tengah.' },
  { nama: 'Flank', peran: 'Sayap kiri & kanan — motor transisi cepat dan lebar lapangan.' },
  { nama: 'Pivot', peran: 'Ujung tombak, jadi tumpuan bola dan penyelesai peluang.' },
];

const MARQUEE = ['GOL!', 'FAST BREAK', 'ONE — TWO', 'PIVOT PLAY', 'PRESSING TINGGI', 'CLEAN SHEET', 'FULL PRESS'];

/* ── glyph bola futsal ── */
function Ball({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="#FFF4E6" stroke="#7C2D12" strokeWidth="3" />
      <path d="M50 22 L66 34 L60 54 L40 54 L34 34 Z" fill="#7C2D12" />
      <path d="M50 22 L50 6 M66 34 L82 28 M60 54 L72 70 M40 54 L28 70 M34 34 L18 28" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 70 Q50 82 72 70 M18 28 Q10 46 22 62 M82 28 Q90 46 78 62" stroke="#7C2D12" strokeWidth="3" fill="none" strokeLinecap="round" />
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
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function parseStat(value: string) {
  const m = value.match(/^(\d+)(.*)$/);
  if (!m) return { num: 0, suffix: value };
  return { num: parseInt(m[1], 10), suffix: m[2] };
}

function StatCounter({ angka, label, inView, delay }: { angka: string; label: string; inView: boolean; delay: number }) {
  const { num, suffix } = parseStat(angka);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now() + delay;
    const dur = 1100;
    const tick = (now: number) => {
      const el = now - start;
      if (el < 0) { raf = requestAnimationFrame(tick); return; }
      const t = Math.min(el / dur, 1);
      setDisplay(Math.round((1 - Math.pow(1 - t, 3)) * num));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, delay]);
  return (
    <div className="fts-stat">
      <div className="fts-stat-num">{display}{suffix}</div>
      <div className="fts-stat-label">{label}</div>
    </div>
  );
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`fts-reveal ${inView ? 'fts-reveal-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function FutsalPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [statsRef, statsInView] = useInView<HTMLDivElement>(0.4);
  const [filter, setFilter] = useState('semua');
  const [gol, setGol] = useState(0);
  const [shots, setShots] = useState<{ id: number }[]>([]);
  const [flash, setFlash] = useState(false);
  const shotId = useRef(0);

  const filtered = filter === 'semua' ? KEGIATAN : KEGIATAN.filter((k) => k.kategori === filter);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--sx', `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty('--sy', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    };
    el.addEventListener('mousemove', onMove);
    return () => { el.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  const tendang = () => {
    setGol((g) => g + 1);
    setFlash(true);
    setTimeout(() => setFlash(false), 700);
    const id = ++shotId.current;
    setShots((p) => [...p, { id }]);
    setTimeout(() => setShots((p) => p.filter((s) => s.id !== id)), 900);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800;900&family=Space+Mono:wght@400;700&display=swap');

        .fts-root {
          --fts-paper: #FFF7ED; --fts-paper-2: #FFFFFF; --fts-ink: #431407;
          --fts-orange: #F97316; --fts-orange-deep: #C2410C; --fts-night: #1C0D04;
          --fts-muted: rgba(67,20,7,0.62);
          font-family: 'Barlow', sans-serif; background: var(--fts-paper); color: var(--fts-ink);
          min-height: 100vh; overflow-x: clip;
        }
        .fts-root * { box-sizing: border-box; }
        @media (prefers-reduced-motion: reduce) {
          .fts-root *, .fts-root *::before, .fts-root *::after {
            animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important;
          }
          .fts-reveal { opacity: 1; transform: none; }
        }

        /* ══ HERO ══ */
        .fts-hero { position: relative; overflow: hidden; background: var(--fts-night); --sx: 60%; --sy: 40%; }
        .fts-hero-img { position: relative; width: 100%; height: min(78vh, 640px); }
        .fts-hero-img img { object-fit: cover; object-position: center 35%; filter: brightness(.52) contrast(1.12) saturate(1.15); }
        .fts-hero-overlay { position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(28,13,4,.25) 0%, rgba(28,13,4,.55) 55%, var(--fts-paper) 100%); }
        .fts-hero-spot { position: absolute; inset: 0; z-index: 2; pointer-events: none; mix-blend-mode: screen;
          background: radial-gradient(circle 240px at var(--sx) var(--sy), rgba(249,115,22,.3), transparent 70%); }
        @media (pointer: coarse) { .fts-hero-spot { display: none; } }
        .fts-lines { position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
        .fts-lines span { position: absolute; left: 0; right: 0; height: 2px; background: rgba(255,255,255,.2);
          transform: scaleX(0); transform-origin: left; animation: ftsLine .9s cubic-bezier(.2,.8,.2,1) forwards; }
        .fts-lines span:nth-child(1) { top: 30%; animation-delay: .1s; }
        .fts-lines span:nth-child(2) { top: 52%; animation-delay: .25s; }
        .fts-lines span:nth-child(3) { top: 74%; animation-delay: .4s; }
        .fts-lines i { position: absolute; left: 50%; top: 52%; width: 120px; height: 120px; margin: -60px 0 0 -60px;
          border: 2px solid rgba(255,255,255,.2); border-radius: 50%; transform: scale(0); animation: ftsCircle .8s cubic-bezier(.2,.8,.2,1) .5s forwards; }
        @keyframes ftsLine { to { transform: scaleX(1); } }
        @keyframes ftsCircle { to { transform: scale(1); } }

        .fts-hero-content { position: absolute; z-index: 5; bottom: 0; left: 0; right: 0;
          padding: 0 clamp(24px,6vw,80px) clamp(44px,6vw,76px);
          display: flex; align-items: flex-end; justify-content: space-between; gap: 26px; }
        .fts-hero-text { max-width: 640px; }
        .fts-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: 'Space Mono', monospace;
          font-size: 12px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: #fff; margin-bottom: 16px; }
        .fts-eyebrow::before { content: ''; width: 28px; height: 2px; background: var(--fts-orange); box-shadow: 0 0 12px var(--fts-orange); }
        .fts-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(72px,13vw,168px); line-height: .84; color: #fff;
          letter-spacing: 3px; margin: 0 0 16px; text-shadow: 0 6px 30px rgba(249,115,22,.4); }
        .fts-letter { display: inline-block; opacity: 0; animation: ftsKick .55s cubic-bezier(.2,.8,.2,1) forwards; }
        .fts-letter-accent { color: var(--fts-orange); }
        @keyframes ftsKick { 0% { opacity: 0; transform: translateY(26px) rotate(8deg); } 60% { opacity: 1; transform: translateY(-8px) rotate(-3deg); } 100% { opacity: 1; transform: none; } }
        .fts-subtitle { max-width: 560px; font-size: clamp(15px,1.8vw,18px); color: rgba(255,255,255,.86); line-height: 1.75; }

        .fts-bounce-zone { position: relative; width: 150px; height: 210px; flex-shrink: 0; display: none; }
        @media (min-width: 920px) { .fts-bounce-zone { display: block; } }
        .fts-bounce { position: absolute; bottom: 44px; left: 34px; animation: ftsBounce 1.5s cubic-bezier(.4,0,.2,1) infinite; }
        .fts-bounce svg { animation: ftsRoll 1.5s linear infinite; display: block; }
        @keyframes ftsBounce { 0%,100% { transform: translateY(0); } 45% { transform: translateY(-130px); } 55% { transform: translateY(-130px); } }
        @keyframes ftsRoll { to { transform: rotate(360deg); } }
        .fts-bounce-shadow { position: absolute; bottom: 30px; left: 34px; width: 56px; height: 14px; border-radius: 50%;
          background: rgba(0,0,0,.4); filter: blur(2px); animation: ftsShadow 1.5s cubic-bezier(.4,0,.2,1) infinite; }
        @keyframes ftsShadow { 0%,100% { transform: scale(1); opacity: .4; } 45% { transform: scale(.4); opacity: .12; } 55% { transform: scale(.4); opacity: .12; } }

        .fts-reveal { opacity: 0; transform: translateY(26px); transition: opacity .6s ease, transform .6s ease; }
        .fts-reveal-in { opacity: 1; transform: translateY(0); }

        /* ══ MARQUEE ══ */
        .fts-marquee { background: var(--fts-night); border-top: 3px solid var(--fts-orange); border-bottom: 3px solid var(--fts-orange); overflow: hidden; }
        .fts-marquee-track { display: flex; width: max-content; gap: 42px; padding: 13px 0; animation: ftsMarquee 20s linear infinite; }
        .fts-marquee-track span { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; letter-spacing: 3px;
          text-transform: uppercase; font-size: 14px; color: #FED7AA; display: inline-flex; align-items: center; gap: 42px; white-space: nowrap; }
        .fts-marquee-track span::after { content: '⚽'; }
        .fts-marquee:hover .fts-marquee-track { animation-play-state: paused; }
        @keyframes ftsMarquee { to { transform: translateX(-50%); } }

        /* ══ SCOREBOARD STATS ══ */
        .fts-scoreboard { background: var(--fts-night); }
        .fts-stats { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 640px) { .fts-stats { grid-template-columns: repeat(2, 1fr); } }
        .fts-stat { padding: clamp(26px,4vw,40px) 20px; text-align: center; border-right: 1px solid rgba(249,115,22,.25); }
        .fts-stat:last-child { border-right: none; }
        .fts-stat-num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px,5vw,52px); color: var(--fts-orange);
          line-height: 1; margin-bottom: 6px; text-shadow: 0 0 18px rgba(249,115,22,.45); font-variant-numeric: tabular-nums; }
        .fts-stat-label { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,237,213,.55); }

        /* ══ SECTION ══ */
        .fts-section { max-width: 1100px; margin: 0 auto; padding: clamp(52px,8vw,92px) clamp(24px,6vw,80px); }
        .fts-label { font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--fts-orange-deep); margin-bottom: 12px; }
        .fts-heading { font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px,5.4vw,66px); color: var(--fts-ink); line-height: 1; margin-bottom: 44px; }

        /* ══ TUJUAN ══ */
        .fts-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 768px) { .fts-grid-3 { grid-template-columns: 1fr; } }
        .fts-card { --mx: 50%; --my: 0%; position: relative; overflow: hidden; background: var(--fts-paper-2);
          border: 1px solid rgba(249,115,22,.16); border-radius: 16px; padding: 34px 28px;
          box-shadow: 0 4px 16px rgba(67,20,7,.05); transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
        .fts-card::before { content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity .35s; pointer-events: none;
          background: radial-gradient(260px circle at var(--mx) var(--my), rgba(249,115,22,.16), transparent 70%); }
        .fts-card:hover { transform: translateY(-7px); border-color: var(--fts-orange); box-shadow: 0 20px 40px rgba(249,115,22,.16); }
        .fts-card:hover::before { opacity: 1; }
        .fts-card-icon { font-size: 36px; display: inline-block; transition: transform .4s cubic-bezier(.36,.02,.4,1.4); }
        .fts-card:hover .fts-card-icon { transform: translateX(8px) rotate(-14deg) scale(1.15); }
        .fts-card-title { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 1px; margin: 18px 0 10px; }
        .fts-card-desc { font-size: 14px; color: var(--fts-muted); line-height: 1.75; }

        /* ══ POSISI ══ */
        .fts-pos { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        @media (max-width: 760px) { .fts-pos { grid-template-columns: repeat(2, 1fr); } }
        .fts-pos-item { background: var(--fts-paper-2); border: 1px solid rgba(249,115,22,.16); border-radius: 14px; padding: 22px 20px;
          transition: transform .25s ease, box-shadow .25s ease, background .25s ease; }
        .fts-pos-item:hover { transform: translateY(-5px); background: #FFF0E1; box-shadow: 0 14px 28px rgba(67,20,7,.1); }
        .fts-pos-nama { font-family: 'Bebas Neue', sans-serif; font-size: 26px; color: var(--fts-orange-deep); letter-spacing: 1px; }
        .fts-pos-peran { font-size: 13px; color: var(--fts-muted); line-height: 1.6; margin-top: 6px; }

        /* ══ KEGIATAN + FILTER ══ */
        .fts-filter { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
        .fts-chip { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;
          font-size: 13px; padding: 9px 18px; border-radius: 999px; cursor: pointer;
          background: var(--fts-paper-2); border: 1.5px solid rgba(249,115,22,.25); color: var(--fts-muted); transition: .2s; }
        .fts-chip:hover { border-color: var(--fts-orange); color: var(--fts-ink); transform: translateY(-2px); }
        .fts-chip.on { background: linear-gradient(135deg, var(--fts-orange), var(--fts-orange-deep)); border-color: transparent; color: #fff;
          box-shadow: 0 8px 20px rgba(249,115,22,.35); }
        .fts-keg-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: rgba(249,115,22,.16);
          border: 1px solid rgba(249,115,22,.16); border-radius: 16px; overflow: hidden; }
        @media (max-width: 640px) { .fts-keg-grid { grid-template-columns: 1fr; } }
        .fts-keg-item { background: var(--fts-paper-2); padding: 24px 28px; display: flex; align-items: flex-start; gap: 18px;
          position: relative; transition: background .2s ease; animation: ftsKegIn .35s ease; }
        @keyframes ftsKegIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .fts-keg-item::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--fts-orange);
          transform: scaleY(0); transform-origin: bottom; transition: transform .3s ease; }
        .fts-keg-item:hover { background: var(--fts-paper); }
        .fts-keg-item:hover::before { transform: scaleY(1); }
        .fts-keg-no { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: rgba(249,115,22,.35); line-height: 1;
          flex-shrink: 0; width: 38px; transition: color .2s ease; }
        .fts-keg-item:hover .fts-keg-no { color: var(--fts-orange); }
        .fts-keg-nama { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
        .fts-keg-detail { font-size: 13px; color: var(--fts-muted); line-height: 1.6; }
        .fts-keg-tag { position: absolute; right: 18px; bottom: 14px; font-family: 'Space Mono', monospace; font-size: 10px;
          letter-spacing: 2px; text-transform: uppercase; color: var(--fts-orange-deep); opacity: .7; }

        /* ══ CETAK GOL ══ */
        .fts-goal { position: relative; text-align: center; overflow: hidden; padding: clamp(60px,9vw,110px) 24px;
          background: radial-gradient(70% 90% at 50% 0%, rgba(249,115,22,.12), transparent 70%); }
        .fts-goal h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px,6vw,58px); color: var(--fts-ink); margin-bottom: 10px; }
        .fts-goal p { max-width: 440px; margin: 0 auto 22px; font-size: 15px; color: var(--fts-muted); line-height: 1.7; }
        .fts-net { position: relative; width: 220px; height: 130px; margin: 0 auto 22px;
          border: 4px solid var(--fts-ink); border-bottom: none; border-radius: 8px 8px 0 0;
          background-image: linear-gradient(rgba(67,20,7,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(67,20,7,.18) 1px, transparent 1px);
          background-size: 16px 16px; overflow: hidden; }
        .fts-net.shake { animation: ftsNet .5s ease; }
        @keyframes ftsNet { 0%,100% { transform: none; } 25% { transform: translateX(-4px) scaleY(1.03); } 75% { transform: translateX(4px) scaleY(1.02); } }
        .fts-net-ball { position: absolute; left: 50%; bottom: -60px; transform: translateX(-50%); animation: ftsShot .85s cubic-bezier(.3,.7,.4,1) forwards; }
        @keyframes ftsShot { 0% { bottom: -70px; transform: translateX(-50%) scale(1) rotate(0); }
          60% { bottom: 84px; transform: translateX(-50%) scale(.7) rotate(400deg); }
          100% { bottom: 60px; transform: translateX(-50%) scale(.55) rotate(520deg); opacity: .85; } }
        .fts-gol-flash { position: absolute; inset: 0; display: grid; place-items: center; pointer-events: none;
          font-family: 'Bebas Neue', sans-serif; font-size: clamp(60px,12vw,140px); color: var(--fts-orange);
          text-shadow: 0 0 40px rgba(249,115,22,.6); opacity: 0; }
        .fts-gol-flash.on { animation: ftsGol .7s ease; }
        @keyframes ftsGol { 0% { opacity: 0; transform: scale(.5); } 30% { opacity: 1; transform: scale(1.1); } 100% { opacity: 0; transform: scale(1.3); } }
        .fts-kick-btn { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;
          font-size: 16px; border: none; cursor: pointer; color: #fff;
          background: linear-gradient(135deg, var(--fts-orange), var(--fts-orange-deep)); padding: 16px 36px; border-radius: 999px;
          box-shadow: 0 14px 32px rgba(249,115,22,.35); transition: transform .15s ease, box-shadow .3s; }
        .fts-kick-btn:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 20px 42px rgba(249,115,22,.45); }
        .fts-kick-btn:active { transform: scale(.95); }
        .fts-gol-count { display: block; margin-top: 14px; font-family: 'Space Mono', monospace; font-size: 12px;
          letter-spacing: 2px; text-transform: uppercase; color: var(--fts-muted); }

        /* ══ divider ══ */
        .fts-divider { display: flex; align-items: center; gap: 16px; max-width: 1100px; margin: 0 auto; padding: 0 clamp(24px,6vw,80px); opacity: .5; }
        .fts-divider::before, .fts-divider::after { content: ''; flex: 1; height: 2px;
          background: repeating-linear-gradient(90deg, var(--fts-orange) 0 10px, transparent 10px 20px); }
        .fts-divider svg { animation: ftsRoll 4s linear infinite; }
      `}</style>

      <div className="fts-root">
        <Navbar />

        <main>
          {/* HERO */}
          <section className="fts-hero" ref={heroRef}>
            <div className="fts-hero-img">
              <Image src="/images/eskul/futsal.jpg" alt="Futsal SMK Citra Negara" fill priority sizes="100vw" />
              <div className="fts-lines" aria-hidden="true"><span /><span /><span /><i /></div>
              <div className="fts-hero-spot" />
              <div className="fts-hero-overlay" />
            </div>
            <div className="fts-hero-content">
              <div className="fts-hero-text">
                <div className="fts-eyebrow">Ekstrakurikuler SMK Citra Negara</div>
                <h1 className="fts-title">
                  {'FUTSAL'.split('').map((ch, i) => (
                    <span key={i} className={`fts-letter ${i >= 3 ? 'fts-letter-accent' : ''}`} style={{ animationDelay: `${i * 70}ms` }}>{ch}</span>
                  ))}
                </h1>
                <p className="fts-subtitle">
                  Ruang sempit, tempo tinggi, keputusan cepat. Futsal menempa teknik, stamina, dan
                  kekompakan tim di setiap detik pertandingan.
                </p>
              </div>
              <div className="fts-bounce-zone" aria-hidden="true">
                <div className="fts-bounce-shadow" />
                <div className="fts-bounce"><Ball size={66} /></div>
              </div>
            </div>
          </section>

          {/* MARQUEE */}
          <div className="fts-marquee" aria-hidden="true">
            <div className="fts-marquee-track">
              {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
            </div>
          </div>

          {/* STATS */}
          <div className="fts-scoreboard">
            <div className="fts-stats" ref={statsRef}>
              {STATS.map((s, i) => (
                <StatCounter key={s.label} angka={s.angka} label={s.label} inView={statsInView} delay={i * 110} />
              ))}
            </div>
          </div>

          {/* TUJUAN */}
          <section className="fts-section">
            <Reveal><div className="fts-label">Kenapa Futsal</div></Reveal>
            <Reveal delay={60}><h2 className="fts-heading">Tujuan Kami</h2></Reveal>
            <div className="fts-grid-3">
              {TUJUAN.map((t, i) => (
                <div
                  key={t.judul}
                  className="fts-card fts-reveal fts-reveal-in"
                  style={{ transitionDelay: `${i * 120}ms` }}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
                  }}
                >
                  <span className="fts-card-icon" aria-hidden="true">{t.icon}</span>
                  <div className="fts-card-title">{t.judul}</div>
                  <p className="fts-card-desc">{t.deskripsi}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="fts-divider" aria-hidden="true"><Ball size={22} /></div>

          {/* POSISI */}
          <section className="fts-section" style={{ paddingTop: 'clamp(36px,5vw,60px)' }}>
            <Reveal><div className="fts-label">Susunan Pemain</div></Reveal>
            <Reveal delay={60}><h2 className="fts-heading">Peran di Lapangan</h2></Reveal>
            <div className="fts-pos">
              {POSISI.map((p, i) => (
                <Reveal key={p.nama} delay={i * 90} className="fts-pos-item">
                  <div className="fts-pos-nama">{p.nama}</div>
                  <div className="fts-pos-peran">{p.peran}</div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* KEGIATAN + FILTER */}
          <section className="fts-section" style={{ paddingTop: 'clamp(20px,3vw,40px)' }}>
            <Reveal><div className="fts-label">Program Latihan</div></Reveal>
            <Reveal delay={60}><h2 className="fts-heading">Kegiatan Rutin</h2></Reveal>
            <Reveal delay={100}>
              <div className="fts-filter">
                {FILTERS.map((f) => (
                  <button key={f.key} type="button" className={`fts-chip ${filter === f.key ? 'on' : ''}`} onClick={() => setFilter(f.key)}>
                    {f.label}
                  </button>
                ))}
              </div>
            </Reveal>
            <div className="fts-keg-grid">
              {filtered.map((k) => (
                <div key={k.no} className="fts-keg-item">
                  <div className="fts-keg-no">{k.no}</div>
                  <div>
                    <div className="fts-keg-nama">{k.nama}</div>
                    <div className="fts-keg-detail">{k.detail}</div>
                  </div>
                  <span className="fts-keg-tag">{k.kategori}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CETAK GOL */}
          <section className="fts-goal">
            <div className="fts-label" style={{ display: 'inline-block' }}>Ayo Cetak Gol</div>
            <h2>Tendangan Pertamamu?</h2>
            <p>Nggak perlu jago dulu — yang penting mau latihan rutin. Hubungi pembina ekstrakurikuler di sekolah.</p>
            <div className={`fts-net ${flash ? 'shake' : ''}`} aria-hidden="true">
              {shots.map((s) => <div key={s.id} className="fts-net-ball"><Ball size={40} /></div>)}
              <div className={`fts-gol-flash ${flash ? 'on' : ''}`}>GOL!</div>
            </div>
            <button type="button" className="fts-kick-btn" onClick={tendang}>⚽ Tendang!</button>
            <span className="fts-gol-count">{gol > 0 ? `${gol} gol tercipta` : 'belum ada gol'}</span>
          </section>
        </main>

        <EskulMusic src="/audio/futsal.mp3" />
        <EskulFX />
        <Footer />
      </div>
    </>
  );
}

