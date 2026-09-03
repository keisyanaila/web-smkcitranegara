'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import EskulFX from '@/components/EskulFX';
import EskulMusic from '@/components/EskulMusic';
import Image from 'next/image';
import { Flag, ShieldCheck, UsersRound } from 'lucide-react';

const STATS = [
  { angka: '2023', label: 'Tahun Berdiri' },
  { angka: '45+', label: 'Anggota Aktif' },
  { angka: '12', label: 'Prestasi Diraih' },
  { angka: '100', label: 'Dedikasi', suffix: '%' },
];

const TUJUAN = [
  { icon: Flag, judul: 'Nasionalisme', deskripsi: 'Menanamkan cinta tanah air dan penghormatan pada simbol negara, khususnya Sang Merah Putih.' },
  { icon: ShieldCheck, judul: 'Karakter Unggul', deskripsi: 'Kedisiplinan, tanggung jawab, dan kerja sama ditempa di setiap sesi latihan dan penugasan.' },
  { icon: UsersRound, judul: 'Jiwa Kepemimpinan', deskripsi: 'Anggota dilatih memimpin barisan dan berani menghadapi tekanan di lapangan nyata.' },
];

const KEGIATAN = [
  { no: '01', nama: 'Baris-Berbaris (PBB)', detail: 'Formasi, kerapian, dan ketepatan gerakan.', aba: 'SIAP GERAK' },
  { no: '02', nama: 'Pengibaran Protokoler', detail: 'Prosedur resmi sesuai standar nasional.', aba: 'KIBARKAN' },
  { no: '03', nama: 'Ketahanan Fisik & Mental', detail: 'Drill intensif membangun kepercayaan diri.', aba: 'TAHAN!' },
  { no: '04', nama: 'Upacara Kenegaraan', detail: 'Bertugas di hari besar nasional.', aba: 'HORMAT' },
  { no: '05', nama: 'Pelatihan Kedisiplinan', detail: 'Etika, sikap, dan tanggung jawab.', aba: 'TEGAP' },
  { no: '06', nama: 'Kompetisi Antar Sekolah', detail: 'Membawa nama sekolah di tingkat daerah.', aba: 'MAJU JALAN' },
];

const MARQUEE = ['SIAP — GERAK', 'LENCANG KANAN', 'HITUNG MULAI', 'HADAP KANAN', 'MAJU — JALAN', 'BALIK KANAN', 'ISTIRAHAT DI TEMPAT'];

/* Formasi pasukan (posisi tiap titik dalam %) */
const FORMASI: { nama: string; titik: [number, number][] }[] = [
  {
    nama: 'BANJAR',
    titik: [[20, 30], [35, 30], [50, 30], [65, 30], [80, 30], [20, 55], [35, 55], [50, 55], [65, 55], [80, 55], [20, 80], [35, 80], [50, 80], [65, 80], [80, 80]],
  },
  {
    nama: 'BAJI (WEDGE)',
    titik: [[50, 18], [42, 34], [58, 34], [34, 50], [50, 50], [66, 50], [26, 66], [42, 66], [58, 66], [74, 66], [18, 82], [38, 82], [50, 82], [62, 82], [82, 82]],
  },
  {
    nama: 'LINGKARAN',
    titik: [[50, 14], [69, 20], [82, 36], [86, 55], [80, 73], [66, 85], [50, 88], [34, 85], [20, 73], [14, 55], [18, 36], [31, 20], [50, 40], [40, 55], [60, 55]],
  },
  {
    nama: 'PANJI',
    titik: [[50, 16], [50, 30], [50, 44], [50, 58], [50, 72], [36, 30], [64, 30], [30, 46], [70, 46], [26, 62], [74, 62], [24, 80], [50, 86], [76, 80], [50, 50]],
  },
];

/* ── reveal on scroll + count-up ── */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function Reveal({
  children, delay = 0, className = '', as: Tag = 'div',
}: {
  children: React.ReactNode; delay?: number; className?: string; as?: React.ElementType;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={`psk-reveal ${inView ? 'psk-reveal-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Component>
  );
}

function CountUp({ value, suffix = '' }: { value: string; suffix?: string }) {
  const target = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const duration = 1100;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return <div ref={ref} className="psk-stat-num">{display}{suffix}</div>;
}

/* ── bendera berkibar (SVG displacement/turbulence) ── */
function FlagRipple() {
  return (
    <svg viewBox="0 0 300 200" className="psk-flag-svg" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="psk-ripple">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.028" numOctaves="2" seed="7" result="n">
            <animate attributeName="baseFrequency" dur="13s" values="0.012 0.026;0.018 0.04;0.012 0.026" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="20" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <linearGradient id="psk-sheen" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#000" stopOpacity="0.10" />
        </linearGradient>
      </defs>
      <g filter="url(#psk-ripple)">
        <rect x="0" y="0" width="300" height="100" fill="#C81E1E" />
        <rect x="0" y="100" width="300" height="100" fill="#ffffff" />
        <rect x="0" y="0" width="300" height="200" fill="url(#psk-sheen)" />
      </g>
    </svg>
  );
}


export default function PaskibraPage() {
  const title = 'PASKIBRA';
  const heroRef = useRef<HTMLElement | null>(null);
  const [salutes, setSalutes] = useState<{ id: number }[]>([]);
  const [salCount, setSalCount] = useState(0);
  const salId = useRef(0);

  // spotlight komandan ikut kursor di hero
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

  const salute = () => {
    setSalCount((c) => c + 1);
    const id = ++salId.current;
    setSalutes((p) => [...p, { id }]);
    setTimeout(() => setSalutes((p) => p.filter((s) => s.id !== id)), 1600);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&display=swap');

        .psk-root {
          --psk-red: #C81E1E; --psk-red-dark: #8F1414; --psk-navy: #0A1628;
          --psk-gold: #C8973A; --psk-cream: #FAF7F0; --psk-white: #FFFFFF;
          --psk-muted: #6B7280; --psk-border: #E8DCC8;
          font-family: 'Barlow', sans-serif; background: var(--psk-cream); color: var(--psk-navy); min-height: 100vh; overflow-x: clip;
        }

        /* ── HERO ── */
        .psk-hero { position: relative; overflow: hidden; background: #0A1628; --sx: 60%; --sy: 40%; }
        .psk-hero-img { position: relative; width: 100%; height: min(78vh, 660px); }
        .psk-hero-img img { object-fit: cover; object-position: center 25%; filter: brightness(0.5) contrast(1.08) saturate(1.05); }
        .psk-hero-overlay { position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(10,22,40,0.2) 10%, rgba(10,22,40,0.5) 55%, var(--psk-cream) 100%); }
        .psk-hero-spot { position: absolute; inset: 0; z-index: 2; pointer-events: none; mix-blend-mode: screen;
          background: radial-gradient(circle 240px at var(--sx) var(--sy), rgba(255,240,200,0.22), transparent 70%); }
        @media (pointer: coarse) { .psk-hero-spot { display: none; } }
        .psk-flag-strip { position: absolute; top: 0; left: 0; right: 0; height: 6px; z-index: 4;
          background: linear-gradient(90deg, var(--psk-red) 0 50%, var(--psk-white) 50% 100%); background-size: 40px 100%; }

        .psk-hero-content { position: absolute; z-index: 5; bottom: 0; left: 0; right: 0;
          padding: 0 clamp(24px, 6vw, 80px) clamp(44px, 6vw, 76px);
          display: flex; align-items: flex-end; justify-content: space-between; gap: 28px; }
        .psk-hero-text { max-width: 640px; }
        .psk-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; color: #F4D9A8; margin-bottom: 14px; }
        .psk-eyebrow::after { content: ''; width: 32px; height: 2px; background: var(--psk-gold); }
        .psk-flag-icon { display: inline-block; transform-origin: left center; animation: pskWave 2.4s ease-in-out infinite; }
        @keyframes pskWave { 0%,100%{transform:skewY(0) rotate(0)} 25%{transform:skewY(6deg) rotate(2deg)} 75%{transform:skewY(-6deg) rotate(-2deg)} }
        .psk-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(72px, 13vw, 168px); line-height: 0.86;
          color: #fff; letter-spacing: 3px; margin: 0 0 18px; text-shadow: 0 6px 30px rgba(0,0,0,0.4); }
        .psk-letter { display: inline-block; opacity: 0; animation: pskMarchIn 0.55s cubic-bezier(.2,.8,.2,1) forwards; }
        .psk-letter-accent { color: var(--psk-red); }
        @keyframes pskMarchIn {
          0% { opacity: 0; transform: translateY(-26px) scaleY(1.4); }
          60% { opacity: 1; transform: translateY(4px) scaleY(0.92); }
          100% { opacity: 1; transform: translateY(0) scaleY(1); }
        }
        .psk-subtitle { max-width: 560px; font-size: clamp(15px, 1.8vw, 18px); color: rgba(255,255,255,0.86); line-height: 1.75; }

        /* bendera berkibar di hero (desktop) */
        .psk-flag { position: relative; width: 190px; height: 150px; flex-shrink: 0; display: none;
          filter: drop-shadow(0 14px 26px rgba(0,0,0,0.4)); }
        @media (min-width: 980px) { .psk-flag { display: block; } }
        .psk-pole { position: absolute; left: -6px; top: -14px; bottom: -40px; width: 6px; border-radius: 3px;
          background: linear-gradient(180deg, #E7C98B, #8a6a2f); }
        .psk-flag-svg { display: block; width: 100%; height: 100%; border-radius: 2px; }

        /* ── MARQUEE aba-aba ── */
        .psk-marquee { background: var(--psk-navy); border-top: 3px solid var(--psk-red); border-bottom: 3px solid var(--psk-gold); overflow: hidden; }
        .psk-marquee-track { display: flex; width: max-content; gap: 40px; padding: 13px 0; animation: pskMarquee 20s linear infinite; }
        .psk-marquee-track span { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; letter-spacing: 3px;
          text-transform: uppercase; font-size: 13.5px; color: #F4D9A8; display: inline-flex; align-items: center; gap: 40px; white-space: nowrap; }
        .psk-marquee-track span::after { content: '★'; color: var(--psk-red); }
        .psk-marquee:hover .psk-marquee-track { animation-play-state: paused; }
        @keyframes pskMarquee { to { transform: translateX(-50%); } }

        /* ── STATS: plat medali ── */
        .psk-stats { max-width: 1100px; margin: 0 auto; padding: clamp(44px,7vw,76px) clamp(24px,6vw,60px);
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        @media (max-width: 640px) { .psk-stats { grid-template-columns: repeat(2, 1fr); } }
        .psk-stat { position: relative; text-align: center; padding: 26px 18px; background: var(--psk-white);
          border: 1px solid var(--psk-border); border-radius: 14px; box-shadow: 0 4px 16px rgba(10,22,40,0.05);
          transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s; }
        .psk-stat::before { content: ''; position: absolute; top: 0; left: 22px; right: 22px; height: 3px; border-radius: 0 0 4px 4px;
          background: linear-gradient(90deg, var(--psk-red), var(--psk-gold)); }
        .psk-stat:hover { transform: translateY(-6px) rotate(-1.2deg); box-shadow: 0 20px 40px rgba(10,22,40,0.13); }
        .psk-stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 46px; color: var(--psk-red); line-height: 1; }
        .psk-stat-label { font-size: 10.5px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--psk-muted); margin-top: 4px; }

        /* ── SECTION ── */
        .psk-section { max-width: 1100px; margin: 0 auto; padding: clamp(44px,7vw,88px) clamp(24px,6vw,80px); }
        .psk-label { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: var(--psk-red); margin-bottom: 10px; }
        .psk-heading { font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px,5.4vw,66px); color: var(--psk-navy); line-height: 1; margin-bottom: 44px; }


        /* ── TUJUAN ── */
        .psk-tujuan-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 768px) { .psk-tujuan-grid { grid-template-columns: 1fr; } }
        .psk-tcard { position: relative; overflow: hidden; background: var(--psk-white); padding: 34px 28px;
          border: 1px solid var(--psk-border); border-radius: 16px; box-shadow: 0 4px 16px rgba(10,22,40,0.05);
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
        .psk-tcard::before { content: ''; position: absolute; top: -1px; right: -1px; width: 46px; height: 46px;
          background: linear-gradient(135deg, var(--psk-red) 50%, transparent 50%); }
        .psk-tcard::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--psk-red), var(--psk-gold)); transform: scaleX(0); transform-origin: left; transition: transform .35s ease; }
        .psk-tcard:hover { transform: translateY(-7px); box-shadow: 0 18px 34px rgba(10,22,40,0.13); border-color: rgba(200,30,30,0.3); }
        .psk-tcard:hover::after { transform: scaleX(1); }
        .psk-tcard-icon { width: 56px; height: 56px; border-radius: 14px; background: rgba(200,30,30,0.08); color: var(--psk-red);
          display: flex; align-items: center; justify-content: center; margin-bottom: 20px; transition: transform .3s ease; }
        .psk-tcard:hover .psk-tcard-icon { transform: translateY(-4px) rotate(-8deg) scale(1.1); }
        .psk-tcard-title { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 800; color: var(--psk-navy);
          text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .psk-tcard-desc { font-size: 14px; color: var(--psk-muted); line-height: 1.75; }

        /* ── KEGIATAN: aba-aba ── */
        .psk-keg-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--psk-border);
          border: 1px solid var(--psk-border); border-radius: 16px; overflow: hidden; }
        @media (max-width: 640px) { .psk-keg-grid { grid-template-columns: 1fr; } }
        .psk-keg-item { background: var(--psk-white); padding: 24px 28px; display: flex; align-items: flex-start; gap: 18px;
          position: relative; transition: background .2s ease; }
        .psk-keg-item::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--psk-red);
          transform: scaleY(0); transform-origin: bottom; transition: transform .3s ease; }
        .psk-keg-item:hover { background: var(--psk-cream); }
        .psk-keg-item:hover::before { transform: scaleY(1); }
        .psk-keg-no { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: rgba(200,30,30,0.35); line-height: 1;
          flex-shrink: 0; width: 38px; transition: color .2s ease; }
        .psk-keg-item:hover .psk-keg-no { color: var(--psk-red); animation: pskStep .42s ease; }
        @keyframes pskStep { 0%{transform:translateY(0)} 35%{transform:translateY(-5px)} 60%{transform:translateY(2px)} 100%{transform:translateY(0)} }
        .psk-keg-nama { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 800; color: var(--psk-navy);
          text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
        .psk-keg-detail { font-size: 13px; color: var(--psk-muted); line-height: 1.6; }
        .psk-keg-aba { position: absolute; right: 20px; bottom: 16px; font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
          font-size: 11px; letter-spacing: 2px; color: #fff; background: var(--psk-navy); padding: 3px 10px; border-radius: 999px;
          opacity: 0; transform: translateX(10px); transition: .3s ease; }
        .psk-keg-item:hover .psk-keg-aba { opacity: 1; transform: none; }

        /* ── CTA HORMAT ── */
        .psk-cta { position: relative; text-align: center; overflow: hidden; padding: clamp(60px,9vw,110px) 24px;
          background: radial-gradient(70% 90% at 50% 0%, rgba(200,30,30,0.12), transparent 70%); }
        .psk-cta h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px,6vw,58px); color: var(--psk-navy); margin-bottom: 12px; }
        .psk-cta p { max-width: 440px; margin: 0 auto 24px; font-size: 15px; color: var(--psk-muted); line-height: 1.7; }
        .psk-cta-btn { position: relative; font-family: 'Barlow Condensed', sans-serif; font-weight: 800; letter-spacing: 2px;
          text-transform: uppercase; font-size: 16px; border: none; cursor: pointer; color: #fff;
          background: linear-gradient(135deg, var(--psk-red), var(--psk-red-dark)); padding: 16px 34px; border-radius: 999px;
          box-shadow: 0 14px 32px rgba(200,30,30,0.35); transition: transform .15s ease, box-shadow .3s; }
        .psk-cta-btn:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 20px 42px rgba(200,30,30,0.45); }
        .psk-cta-btn:active { transform: scale(.96); }
        .psk-cta-count { display: block; margin-top: 16px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--psk-muted); }
        .psk-salute-fly { position: absolute; bottom: 36%; left: 50%; font-size: 30px; pointer-events: none;
          animation: pskSalute 1.6s cubic-bezier(.2,.7,.2,1) forwards; }
        @keyframes pskSalute { 0%{opacity:0;transform:translate(-50%,0) scale(.5)} 15%{opacity:1} 100%{opacity:0;transform:translate(-50%,-240px) scale(1.1)} }

        /* ── divider + reveal ── */
        .psk-divider { display: flex; align-items: center; gap: 16px; max-width: 1100px; margin: 0 auto; padding: 0 clamp(24px,6vw,80px); opacity: .6; }
        .psk-divider::before, .psk-divider::after { content: ''; flex: 1; height: 1px; background: var(--psk-gold); }
        .psk-divider-icon { font-size: 14px; color: var(--psk-red); }
        .psk-reveal { opacity: 0; transform: translateY(26px); transition: opacity .6s ease, transform .6s ease; }
        .psk-reveal-in { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .psk-letter, .psk-reveal, .psk-flag-icon, .psk-tcard, .psk-keg-item, .psk-keg-no, .psk-marquee-track {
            animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important;
          }
        }
      `}</style>

      <div className="psk-root">
        <Navbar />

        <main>
          {/* HERO */}
          <section className="psk-hero" ref={heroRef}>
            <div className="psk-flag-strip" />
            <div className="psk-hero-img">
              <Image src="/images/eskul/eskulpaskibra.jpg" alt="Paskibra SMK Citra Negara" fill priority />
              <div className="psk-hero-spot" />
              <div className="psk-hero-overlay" />
            </div>
            <div className="psk-hero-content">
              <div className="psk-hero-text">
                <div className="psk-eyebrow">
                  <Flag size={16} className="psk-flag-icon" />
                  Ekstrakurikuler SMK Citra Negara
                </div>
                <h1 className="psk-title">
                  {title.split('').map((ch, i) => (
                    <span key={i} className={`psk-letter ${i >= 5 ? 'psk-letter-accent' : ''}`} style={{ animationDelay: `${i * 60}ms` }}>{ch}</span>
                  ))}
                </h1>
                <p className="psk-subtitle">
                  Pasukan Pengibar Bendera — garda kehormatan bangsa. Bukan sekadar berseragam:
                  kami simbol disiplin, kebanggaan, dan dedikasi tanpa kompromi.
                </p>
              </div>
              <div className="psk-flag" aria-hidden="true">
                <span className="psk-pole" />
                <FlagRipple />
              </div>
            </div>
          </section>

          {/* MARQUEE */}
          <div className="psk-marquee" aria-hidden="true">
            <div className="psk-marquee-track">
              {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
            </div>
          </div>

          {/* STATS */}
          <div className="psk-stats">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="psk-stat">
                <CountUp value={s.angka} suffix={s.suffix} />
                <div className="psk-stat-label">{s.label}</div>
              </Reveal>
            ))}
          </div>

          {/* TUJUAN */}
          <section className="psk-section" style={{ paddingTop: 'clamp(44px,7vw,80px)' }}>
            <Reveal><div className="psk-label">Mengapa Paskibra</div></Reveal>
            <Reveal delay={60}><h2 className="psk-heading">Tujuan Kami</h2></Reveal>
            <div className="psk-tujuan-grid">
              {TUJUAN.map((t, i) => (
                <Reveal key={t.judul} delay={i * 120} className="psk-tcard">
                  <div className="psk-tcard-icon"><t.icon size={26} /></div>
                  <div className="psk-tcard-title">{t.judul}</div>
                  <p className="psk-tcard-desc">{t.deskripsi}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* KEGIATAN */}
          <section className="psk-section" style={{ paddingTop: 'clamp(20px,3vw,40px)' }}>
            <Reveal><div className="psk-label">Program Latihan</div></Reveal>
            <Reveal delay={60}><h2 className="psk-heading">Kegiatan Rutin</h2></Reveal>
            <div className="psk-keg-grid">
              {KEGIATAN.map((k, i) => (
                <Reveal key={k.no} delay={i * 70} className="psk-keg-item" as="div">
                  <div className="psk-keg-no">{k.no}</div>
                  <div>
                    <div className="psk-keg-nama">{k.nama}</div>
                    <div className="psk-keg-detail">{k.detail}</div>
                  </div>
                  <span className="psk-keg-aba">{k.aba}</span>
                </Reveal>
              ))}
            </div>
          </section>

          {/* CTA HORMAT */}
          <section className="psk-cta">
            <h2>Hormat, Grak!</h2>
            <p>Satu penghormatan untuk barisan yang menjaga kehormatan Merah Putih.</p>
            <button type="button" className="psk-cta-btn" onClick={salute}>🫡 Beri Hormat</button>
            <span className="psk-cta-count">{salCount > 0 ? `${salCount} penghormatan` : 'jadilah yang pertama'}</span>
            {salutes.map((s) => <span key={s.id} className="psk-salute-fly">🫡</span>)}
          </section>
        </main>

        <EskulMusic src="/audio/paskibra.mp3" />
        <EskulFX />
        <Footer />
      </div>
    </>
  );
}
