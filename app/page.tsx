'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import SplashWelcome from '@/components/SplashWelcome';
import {
  ArrowRight, Monitor, Wifi, BookOpen, Presentation, Camera, Coffee,
  Trophy, Printer, Landmark, Users, Sparkles, CalendarDays, Check, Globe2,
} from 'lucide-react';
import { GELOMBANG, TAHUN_AJARAN, STATUS_LABEL, STATUS_LABEL_EN, formatTanggalRange, useSpmbGelombang } from '@/lib/spmb';
import { useLang } from '@/lib/i18n';

// Teks dua bahasa: `id` = Indonesia, `en` = English
type Teks = { id: string; en: string };

const JURUSAN = [
  { href: '/jurusan/pplg', img: '/images/logopplg.png', kode: 'PPLG', kuota: 72,
    nama: { id: 'Pengembangan Perangkat Lunak dan Gim', en: 'Software & Game Development' },
    desc: { id: 'Coding, pengembangan aplikasi, database, UI/UX, game development, dan software engineering.', en: 'Coding, app development, databases, UI/UX, game development, and software engineering.' } },
  { href: '/jurusan/tjkt', img: '/images/logotjkt.png', kode: 'TJKT', kuota: 72,
    nama: { id: 'Teknik Jaringan Komputer dan Telekomunikasi', en: 'Computer Networking & Telecommunications' },
    desc: { id: 'Jaringan komputer, server, keamanan sistem, telekomunikasi, dan troubleshooting jaringan.', en: 'Computer networks, servers, system security, telecommunications, and network troubleshooting.' } },
  { href: '/jurusan/dkv', img: '/images/logodkv.png', kode: 'DKV', kuota: 36,
    nama: { id: 'Desain Komunikasi Visual', en: 'Visual Communication Design' },
    desc: { id: 'Desain grafis, ilustrasi, fotografi, animasi, videografi, dan branding kreatif.', en: 'Graphic design, illustration, photography, animation, videography, and creative branding.' } },
  { href: '/jurusan/pm', img: '/images/logopm.png', kode: 'PM', kuota: 36,
    nama: { id: 'Pemasaran', en: 'Marketing' },
    desc: { id: 'Pemasaran, penjualan, promosi digital, e-commerce, dan layanan pelanggan.', en: 'Marketing, sales, digital promotion, e-commerce, and customer service.' } },
  { href: '/jurusan/mplb', img: '/images/logomplb.png', kode: 'MPLB', kuota: 36,
    nama: { id: 'Manajemen Perkantoran dan Layanan Bisnis', en: 'Office Management & Business Services' },
    desc: { id: 'Administrasi, teknologi perkantoran, komunikasi bisnis, layanan pelanggan, dan manajemen dokumen.', en: 'Administration, office technology, business communication, customer service, and document management.' } },
  { href: '/jurusan/ph', img: '/images/logoph.png', kode: 'PH', kuota: 36,
    nama: { id: 'Perhotelan', en: 'Hospitality' },
    desc: { id: 'Pelayanan hotel, tata graha. food & beverage, komunikasi industri, dan hospitality.', en: 'Hotel services, housekeeping, food & beverage, industry communication, and hospitality.' } },
];

const STATS: { value: string; label: Teks }[] = [
  { value: '1.200+', label: { id: 'Siswa Aktif', en: 'Active Students' } },
  { value: '98%', label: { id: 'Tingkat Kelulusan', en: 'Graduation Rate' } },
  { value: '85%', label: { id: 'Terserap Kerja/PT', en: 'Employed / In University' } },
  { value: '15+', label: { id: 'Tahun Berdiri', en: 'Years Established' } },
];

const FASILITAS_LIST: Teks[] = [
  { id: 'Tersedia Lab Untuk Masinng-Masing Jurusan', en: 'Dedicated Labs for Every Program' },
  { id: 'Tersedia WiFi Untuk Siswa/i di Setiap Gedung & Lantai', en: 'Student WiFi in Every Building & Floor' },
  { id: 'Ruang Perpustakaan', en: 'Library' },
  { id: 'Auditorium', en: 'Auditorium' },
  { id: 'Studio Multimedia', en: 'Multimedia Studio' },
  { id: 'Kantin', en: 'Canteen' },
  { id: '2 Lapangan (Gedung A & Gedung E)', en: '2 Sports Fields (Building A & Building E)' },
  { id: 'CN Digital Printing oleh Multimedia', en: 'CN Digital Printing by Multimedia' },
  { id: 'Bank Mini', en: 'School Mini Bank' },
];
const FASILITAS_ICONS = [Monitor, Wifi, BookOpen, Presentation, Camera, Coffee, Trophy, Printer, Landmark];

const FASILITAS_STATS = [
  { label: { id: '7 Lab Komputer', en: '7 Computer Labs' }, val: '150+', sub: { id: 'Unit Komputer', en: 'Computers' }, bg: '#17713b', icon: Monitor },
  { label: { id: 'Internet', en: 'Internet' }, val: '1 Gbps', sub: { id: 'Starlink', en: 'Starlink' }, bg: '#cf962b', icon: Wifi },
  { label: { id: 'Akreditasi', en: 'Accreditation' }, val: 'A', sub: { id: 'BAN-S/M', en: 'BAN-S/M' }, bg: '#0f4c35', icon: Landmark },
  { label: { id: 'Alumni', en: 'Alumni' }, val: '5000+', sub: { id: 'Tersebar Nasional', en: 'Across Indonesia' }, bg: '#093b1e', icon: Users },
];

const MARQUEE_ITEMS: Teks[] = [
  { id: `PPDB ${TAHUN_AJARAN} DIBUKA`, en: `ADMISSIONS ${TAHUN_AJARAN} OPEN` },
  { id: 'GO INTERNASIONAL', en: 'GO INTERNATIONAL' },
  { id: 'INGGRIS · JEPANG · KOREA · JERMAN · TURKI', en: 'UK · JAPAN · KOREA · GERMANY · TURKEY' },
  { id: '6 JURUSAN UNGGULAN', en: '6 TOP PROGRAMS' },
  { id: 'AKREDITASI A', en: 'A-ACCREDITED' },
  { id: 'KUOTA TERBATAS', en: 'LIMITED SEATS' },
  { id: 'DAFTAR SEKARANG', en: 'APPLY NOW' },
];

// Bendera digambar SVG (emoji bendera tidak tampil di Windows)
const FLAGS: Record<string, React.ReactNode> = {
  indonesia: (
    <svg viewBox="0 0 30 20"><rect width="30" height="10" fill="#E70011" /><rect y="10" width="30" height="10" fill="#fff" /></svg>
  ),
  jepang: (
    <svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff" /><circle cx="15" cy="10" r="6" fill="#BC002D" /></svg>
  ),
  korea: (
    <svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#fff" />
      <path d="M10 10a5 5 0 0 1 10 0a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 0-5 0z" fill="#CD2E3A" />
      <path d="M20 10a5 5 0 0 1-10 0a2.5 2.5 0 0 1 5 0a2.5 2.5 0 0 0 5 0z" fill="#0047A0" />
      <g stroke="#000" strokeWidth="1.2">
        <path d="M4 5.5l3-2.5M4.8 6.5l3-2.5M5.6 7.5l3-2.5M22 15l3-2.5M22.8 16l3-2.5M23.6 17l3-2.5" transform="translate(-1 0)" />
        <path d="M22 5l3 2.5M22.8 4l3 2.5M23.6 3l3 2.5M4 14.5l3 2.5M4.8 13.5l3 2.5M5.6 12.5l3 2.5" transform="translate(-1 0)" />
      </g>
    </svg>
  ),
  jerman: (
    <svg viewBox="0 0 30 20"><rect width="30" height="7" fill="#000" /><rect y="6.66" width="30" height="6.7" fill="#DD0000" /><rect y="13.33" width="30" height="6.67" fill="#FFCE00" /></svg>
  ),
  turki: (
    <svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="11" cy="10" r="5" fill="#fff" />
      <circle cx="12.25" cy="10" r="4" fill="#E30A17" />
      <path d="M16.5 10l3.8-1.24-2.35 3.24v-4l2.35 3.24z" fill="#fff" />
    </svg>
  ),
  inggris: (
    <svg viewBox="0 0 60 30" preserveAspectRatio="none">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  ),
};

const GO_INTL: { key: string; nama: Teks }[] = [
  { key: 'indonesia', nama: { id: 'Indonesia', en: 'Indonesia' } },
  { key: 'inggris', nama: { id: 'Inggris', en: 'UK' } },
  { key: 'jepang', nama: { id: 'Jepang', en: 'Japan' } },
  { key: 'korea', nama: { id: 'Korea', en: 'Korea' } },
  { key: 'jerman', nama: { id: 'Jerman', en: 'Germany' } },
  { key: 'turki', nama: { id: 'Turki', en: 'Turkey' } },
];

/* ---------- helpers & small components ---------- */

function useInView(threshold = 0.15) {
  const ref = useRef<any>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function useMagnetic(strength = 16) {
  const ref = useRef<any>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);
  return ref;
}

function parseStatValue(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: parseInt(match[1].replace(/\./g, ''), 10), suffix: match[2] };
}

function StatCounter({ value, inView }: { value: string; inView: boolean }) {
  const { target, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);
  return <>{display.toLocaleString('id-ID')}{suffix}</>;
}

// Judul hero bergantian 6 bahasa. Bahasa situs yang dipilih (ID/EN) selalu tampil duluan.
const HERO_HEADLINES = [
  { lang: 'id', flag: 'indonesia', label: { id: 'Bahasa Indonesia', en: 'Bahasa Indonesia · Indonesian' }, before: 'Raih Masa Depan ', highlight: 'Cerah', after: ' Bersama SMK Citra Negara' },
  { lang: 'en', flag: 'inggris', label: { id: 'English · Inggris', en: 'English' }, before: 'Shape Your ', highlight: 'Bright Future', after: ' with SMK Citra Negara' },
  { lang: 'ja', flag: 'jepang', label: { id: '日本語 · Jepang', en: '日本語 · Japanese' }, before: 'SMK Citra Negaraで', highlight: '輝く未来', after: 'をつかもう' },
  { lang: 'ko', flag: 'korea', label: { id: '한국어 · Korea', en: '한국어 · Korean' }, before: 'SMK Citra Negara와 함께 ', highlight: '빛나는 미래', after: '를 잡으세요' },
  { lang: 'de', flag: 'jerman', label: { id: 'Deutsch · Jerman', en: 'Deutsch · German' }, before: 'Gestalte deine ', highlight: 'glänzende Zukunft', after: ' mit SMK Citra Negara' },
  { lang: 'tr', flag: 'turki', label: { id: 'Türkçe · Turki', en: 'Türkçe · Turkish' }, before: 'SMK Citra Negara ile ', highlight: 'parlak geleceğini', after: ' yakala' },
];

function RotatingHeadline() {
  const { lang } = useLang();
  const [index, setIndex] = useState(0);
  const headlines = lang === 'en'
    ? [HERO_HEADLINES[1], HERO_HEADLINES[0], ...HERO_HEADLINES.slice(2)]
    : HERO_HEADLINES;
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex(i => (i + 1) % HERO_HEADLINES.length), 3600);
    return () => clearInterval(id);
  }, []);
  const h = headlines[index];
  return (
    <>
      <span key={`tag-${lang}-${index}`} className="hero-lang-tag rotating-word">
        <span className="hero-intl-flag">{FLAGS[h.flag]}</span>
        {h.label[lang]}
      </span>
      <span key={`${lang}-${index}`} lang={h.lang} className={`hero-headline rotating-word hero-headline-${h.lang}`}>
        {h.before}<span className="gradient-text">{h.highlight}</span>{h.after}
      </span>
    </>
  );
}

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

function CustomCursor() {
  const dotRef = useRef<any>(null);
  const ringRef = useRef<any>(null);
  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || reduced) return;
    document.body.classList.add('custom-cursor-active');
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    const move = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest?.('a, button, [role="button"]');
      if (ringRef.current) ringRef.current.classList.toggle('cursor-ring-hover', !!interactive);
    };
    let raf = 0;
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

function handleTilt(e: React.MouseEvent<HTMLElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateX = ((y / rect.height) - 0.5) * -8;
  const rotateY = ((x / rect.width) - 0.5) * 8;
  card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
  card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
}
function resetTilt(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = '';
}

function JurusanCard({ j, index }: { j: (typeof JURUSAN)[number]; index: number }) {
  const [ref, inView] = useInView(0.2);
  const { lang, t } = useLang();
  return (
    <Link
      ref={ref}
      href={j.href}
      className={`jurusan-card reveal ${inView ? 'in-view' : ''}`}
      style={{
        transitionDelay: inView ? `${index * 70}ms` : '0ms',
        background: 'white', border: '1.5px solid #F0EBE0', borderRadius: 14,
        padding: 24, textDecoration: 'none', display: 'block',
      }}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
    >
      <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <img src={j.img} alt={j.kode} style={{ width: 70, height: 70, objectFit: 'contain' }} />
        <div style={{ background: '#C8973A', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>{j.kode}</div>
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 8, lineHeight: 1.3 }}>{j.nama[lang]}</h3>
      <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5, marginBottom: 12 }}>{j.desc[lang]}</p>
      <div className="kuota-bar">
        <div className="kuota-bar-fill" style={{ width: inView ? `${(j.kuota / 72) * 100}%` : '0%' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <div style={{ fontSize: 12, color: '#C8973A', fontWeight: 600 }}>{t(`Kuota: ${j.kuota} siswa`, `Quota: ${j.kuota} students`)}</div>
        <ArrowRight size={16} color="#C8973A" className="card-arrow" />
      </div>
    </Link>
  );
}

function FacilityPill({ text, Icon, index }: { text: string; Icon: React.ElementType; index: number }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} className={`facility-pill reveal ${inView ? 'in-view' : ''}`} style={{ transitionDelay: inView ? `${index * 60}ms` : '0ms' }}>
      <Icon size={14} />
      <span>{text}</span>
    </div>
  );
}

function FacilityStatCard({ item, index }: { item: (typeof FASILITAS_STATS)[number]; index: number }) {
  const [ref, inView] = useInView(0.2);
  const Icon = item.icon;
  const isGold = item.bg === '#C8973A';
  const { lang } = useLang();
  return (
    <div
      ref={ref}
      className={`stat-tile reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: inView ? `${index * 90}ms` : '0ms', background: item.bg, borderRadius: 16, padding: 28, color: 'white' }}
    >
      <Icon size={20} color={isGold ? '#0A1628' : '#E8B84B'} style={{ marginBottom: 10, opacity: 0.9 }} />
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>{item.label[lang]}</div>
      <div className="font-display" style={{ fontSize: 36, fontWeight: 700, color: isGold ? '#0A1628' : '#E8B84B' }}>{item.val}</div>
      <div style={{ fontSize: 12, color: isGold ? 'rgba(10,22,40,0.6)' : 'rgba(255,255,255,0.5)', marginTop: 4 }}>{item.sub[lang]}</div>
    </div>
  );
}

/* ---------- page ---------- */

export default function HomePage() {
  const heroRef = useRef<any>(null);
  const blobWrap1Ref = useRef<any>(null);
  const blobWrap2Ref = useRef<any>(null);
  const [statsRef, statsInView] = useInView(0.4);
  const magneticHero = useMagnetic();
  const magneticTimeline = useMagnetic();
  const magneticCta = useMagnetic();
  const { list: gelombangList, fokus: gelombangFokus } = useSpmbGelombang();
  const { lang, t } = useLang();

  function handleHeroMove(e: React.MouseEvent<HTMLElement>) {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => {
      const y = window.scrollY * 0.15;
      if (blobWrap1Ref.current) blobWrap1Ref.current.style.transform = `translateY(${y}px)`;
      if (blobWrap2Ref.current) blobWrap2Ref.current.style.transform = `translateY(${-y}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SplashWelcome />
      <ScrollProgressBar />
      <CustomCursor />
      <Navbar />
      <main>
        {/* HERO */}
        <section ref={heroRef} onMouseMove={handleHeroMove} className="hero-gradient hero-section grain-overlay">
          {/* Background video — file di public/videos/smk.mp4 (loop, tanpa suara).
              Kalau file dihapus/diganti nama, gradient hijau tetap tampil sebagai fallback. */}
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/smk.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-tint" />
          <div ref={blobWrap1Ref} className="hero-blob-wrap"><div className="hero-blob hero-blob-1" /></div>
          <div ref={blobWrap2Ref} className="hero-blob-wrap"><div className="hero-blob hero-blob-2" /></div>
          <div className="hero-inner">
            <div className="hero-enter">
              <div className="hero-badge">
                <span className="badge-dot" />
                {t('PENERIMAAN PESERTA DIDIK BARU', 'NEW STUDENT ADMISSIONS')} {TAHUN_AJARAN}
              </div>
              <h1 className="font-display hero-title">
                {/* key={lang}: ganti bahasa → rotasi mulai lagi dari bahasa situs */}
                <RotatingHeadline key={lang} />
              </h1>
              <p className="hero-desc">
                {t(
                  'Bergabunglah dengan ribuan alumni sukses. Pendidikan kejuruan berkualitas tinggi dengan kurikulum industri terkini.',
                  'Join thousands of successful alumni. High-quality vocational education with an up-to-date, industry-driven curriculum.',
                )}
              </p>
              <div className="hero-intl">
                <span className="hero-intl-label"><Globe2 size={15} /> {t('Go Internasional', 'Go International')}</span>
                <div className="hero-intl-flags">
                  {GO_INTL.map((c, i) => (
                    <span key={c.key} className="hero-intl-chip" style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
                      <span className="hero-intl-flag">{FLAGS[c.key]}</span>
                      {c.nama[lang]}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hero-btn-row">
                <Link ref={magneticHero} href="/spmb" className="btn-primary magnetic" style={{ fontSize: 15 }}>{t('Daftar SPMB Sekarang', 'Apply for Admission')} →</Link>
                <Link href="/tentang" className="btn-outline" style={{ fontSize: 15 }}>{t('Pelajari Lebih Lanjut', 'Learn More')}</Link>
              </div>
              <div className="hero-stats-row" ref={statsRef}>
                {STATS.map(s => (
                  <div key={s.label.id}>
                    <div className="font-display hero-stat-value">
                      <StatCounter value={s.value} inView={statsInView} />
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{s.label[lang]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jadwal SPMB Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="spmb-card">
                <div className="spmb-card-glow" />
                <div className="spmb-card-head">
                  <div className="spmb-cal"><CalendarDays size={20} /></div>
                  <div>
                    <h3 className="font-display spmb-card-title">{t('Jadwal SPMB', 'Admission Schedule')} {GELOMBANG[0].mulai.slice(0, 4)}</h3>
                    <p className="spmb-card-sub">{t('Tahun Ajaran', 'Academic Year')} {TAHUN_AJARAN}</p>
                  </div>
                </div>

                <div className="spmb-track">
                  {gelombangList.map((item, i) => {
                    const aktif = i === gelombangFokus;
                    return (
                      <div key={item.nama} className={`spmb-item spmb-${item.status}${aktif ? ' spmb-aktif' : ''}`}>
                        <div className="spmb-node-col">
                          <div className={`spmb-node${aktif ? ' spmb-node-pulse' : ''}`}>
                            {item.status === 'selesai' ? <Check size={15} strokeWidth={3} /> : i + 1}
                          </div>
                          {i < gelombangList.length - 1 && <span className="spmb-node-line" />}
                        </div>
                        <div className="spmb-item-body">
                          <div className="spmb-item-row">
                            <span className="spmb-item-name">{t(item.nama, `Wave ${i + 1}`)}</span>
                            <span className={`spmb-chip spmb-chip-${item.status}`}>
                              {item.status === 'berlangsung' && <span className="spmb-chip-dot" />}
                              {t(STATUS_LABEL, STATUS_LABEL_EN)[item.status]}
                            </span>
                          </div>
                          <div className="spmb-item-date">{t(item.rentang, formatTanggalRange(item.mulai, item.selesai, 'en-GB'))}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Link ref={magneticTimeline} href="/register" className="btn-primary magnetic spmb-cta">
                  {t('Mulai Pendaftaran', 'Start Application')} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee-strip">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((m, i) => (
              <span key={i}><Sparkles size={13} /> {m[lang]}</span>
            ))}
          </div>
        </div>

        {/* JURUSAN */}
        <section className="section-pad" style={{ background: 'white' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="gold-line" style={{ margin: '0 auto 16px' }} />
              <h2 className="font-display section-title">{t('Program Keahlian', 'Study Programs')}</h2>
              <p style={{ color: '#6B7280', maxWidth: 500, margin: '0 auto', fontSize: 16 }}>{t('Pilih jurusan sesuai minat dan bakat.', 'Choose a program that fits your interests and talents.')}</p>
            </div>
            <div className="jurusan-grid">
              {JURUSAN.map((j, i) => <JurusanCard key={j.kode} j={j} index={i} />)}
            </div>
          </div>
        </section>

        {/* FASILITAS */}
        <section className="section-pad" style={{ background: '#FAF7F0' }}>
          <div className="fasilitas-inner">
            <div>
              <div className="gold-line" style={{ marginBottom: 16 }} />
              <h2 className="font-display section-title">{t('Fasilitas Sekolah', 'School Facilities')}</h2>
              <p style={{ color: '#6B7280', lineHeight: 1.8, marginBottom: 32, fontSize: 16 }}>{t('Lingkungan belajar terbaik dengan fasilitas modern yang mendukung proses pembelajaran berkualitas tinggi.', 'A great learning environment with modern facilities that support high-quality learning.')}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {FASILITAS_LIST.map((f, i) => (
                  <FacilityPill key={f.id} text={f[lang]} Icon={FASILITAS_ICONS[i]} index={i} />
                ))}
              </div>
            </div>
            <div className="fasilitas-stats-grid">
              {FASILITAS_STATS.map((item, i) => <FacilityStatCard key={item.label.id} item={item} index={i} />)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad cta-section grain-overlay" style={{ background: '#15803d' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Sparkles size={28} color="#E8B84B" className="cta-sparkle" />
            <h2 className="font-display cta-title">{t('Siap Bergabung?', 'Ready to Join Us?')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
              {t(
                `Pendaftaran Peserta Didik Baru tahun ajaran ${TAHUN_AJARAN} sudah dibuka. Jangan lewatkan kesempatan ini!`,
                `New student admissions for the ${TAHUN_AJARAN} academic year are now open. Don't miss this opportunity!`,
              )}
            </p>
            <div className="cta-btn-row">
              <Link ref={magneticCta} href="/register" className="btn-primary magnetic" style={{ fontSize: 16 }}>{t('Daftar Sekarang', 'Apply Now')}</Link>
              <Link href="/spmb" className="btn-outline" style={{ fontSize: 16 }}>{t('Info SPMB', 'Admission Info')}</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx global>{`
        .scroll-progress { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, #C8973A, #E8B84B, #17713b); z-index: 100; transition: width .1s linear; }

        .cursor-dot { position: fixed; top: 0; left: 0; width: 8px; height: 8px; background: #E8B84B; border-radius: 50%; pointer-events: none; z-index: 200; will-change: transform; }
        .cursor-ring { position: fixed; top: 0; left: 0; width: 36px; height: 36px; border: 1.5px solid rgba(232,184,75,0.6); border-radius: 50%; pointer-events: none; z-index: 199; will-change: transform; transition: width .25s ease, height .25s ease, border-color .25s ease, background .25s ease; }
        .cursor-ring.cursor-ring-hover { width: 56px; height: 56px; background: rgba(232,184,75,0.12); border-color: #E8B84B; }
        @media (pointer: coarse) { .cursor-dot, .cursor-ring { display: none; } }

        .magnetic { transition: transform .2s ease-out; display: inline-block; }

        .hero-section {
          padding: 100px 24px 120px;
          position: relative;
          overflow: hidden;
        }
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
          border: 0;
        }
        /* Lapisan gelap di atas video biar teks tetap kebaca */
        .hero-video-tint {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: linear-gradient(160deg, rgba(5,46,22,0.82) 0%, rgba(6,32,18,0.62) 45%, rgba(21,128,61,0.55) 100%);
        }
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(500px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(232,184,75,0.14), transparent 60%);
          pointer-events: none;
          z-index: 0;
        }
        .grain-overlay { position: relative; }
        .grain-overlay::after {
          content: '';
          position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.05; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .hero-blob-wrap { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .hero-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.32; }
        .hero-blob-1 { width: 420px; height: 420px; background: #C8973A; top: -120px; right: -100px; animation: float-blob 10s ease-in-out infinite; }
        .hero-blob-2 { width: 320px; height: 320px; background: #17713b; bottom: -100px; left: -80px; animation: float-blob 12s ease-in-out infinite reverse; }
        @keyframes float-blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-20px) scale(1.08); }
        }
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .hero-enter > * { opacity: 0; animation: fade-up-in .8s cubic-bezier(.22,1,.36,1) forwards; }
        .hero-enter > *:nth-child(1) { animation-delay: .05s; }
        .hero-enter > *:nth-child(2) { animation-delay: .15s; }
        .hero-enter > *:nth-child(3) { animation-delay: .25s; }
        .hero-enter > *:nth-child(4) { animation-delay: .35s; }
        .hero-enter > *:nth-child(5) { animation-delay: .45s; }
        @keyframes fade-up-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(200,151,58,0.15);
          border: 1px solid rgba(200,151,58,0.3);
          border-radius: 20px;
          padding: 6px 16px;
          color: #E8B84B;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ADE80; animation: badge-pulse 1.8s ease-out infinite; }
        @keyframes badge-pulse {
          0% { box-shadow: 0 0 0 0 rgba(74,222,128,0.6); }
          70% { box-shadow: 0 0 0 8px rgba(74,222,128,0); }
          100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
        }
        .hero-title { font-size: 56px; color: white; line-height: 1.15; margin-bottom: 24px; font-weight: 700; }
        .gradient-text {
          background: linear-gradient(90deg, #E8B84B, #C8973A, #E8B84B);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-text-move 3s linear infinite;
        }
        @keyframes gradient-text-move { to { background-position: 200% center; } }
        .rotating-word { display: inline-block; animation: word-pop-in .5s cubic-bezier(.22,1,.36,1); }
        .hero-title { min-height: calc(3 * 1.15em + 34px); }
        .hero-lang-tag {
          display: flex; width: fit-content; align-items: center; gap: 7px; margin-bottom: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.04em;
          color: rgba(255,255,255,0.85); padding: 4px 11px 4px 5px; border-radius: 999px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
        }
        .hero-headline { display: block; }
        .hero-headline-ja, .hero-headline-ko { font-family: 'Noto Serif JP', 'Noto Serif KR', 'Yu Mincho', 'Batang', 'Playfair Display', serif; font-weight: 700; line-height: 1.3; }
        @keyframes word-pop-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .hero-desc { color: rgba(255,255,255,0.75); font-size: 17px; line-height: 1.7; margin-bottom: 36px; max-width: 480px; }
        .hero-intl { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin: -14px 0 32px; }
        .hero-intl-label { display: inline-flex; align-items: center; gap: 6px; color: #E8B84B; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
        .hero-intl-flags { display: flex; gap: 8px; flex-wrap: wrap; }
        .hero-intl-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 12px 5px 6px; border-radius: 999px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          color: #fff; font-size: 12.5px; font-weight: 600;
          opacity: 0; animation: intl-in .5s ease forwards;
          transition: background .2s ease, border-color .2s ease, transform .2s ease;
        }
        .hero-intl-chip:hover { background: rgba(200,151,58,0.2); border-color: rgba(232,184,75,0.5); transform: translateY(-2px); }
        .hero-intl-flag { display: inline-flex; width: 21px; height: 14px; border-radius: 3px; overflow: hidden; box-shadow: 0 0 0 1px rgba(0,0,0,0.25); }
        .hero-intl-flag svg { width: 100%; height: 100%; display: block; }
        @keyframes intl-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .hero-btn-row { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn-primary, .btn-outline { transition: transform .25s ease, box-shadow .25s ease; }
        .btn-primary:hover { box-shadow: 0 10px 24px rgba(200,151,58,0.35); }
        .hero-stats-row { display: flex; gap: 32px; margin-top: 48px; flex-wrap: wrap; }
        .hero-stat-value { color: #E8B84B; font-size: 28px; font-weight: 700; }
        /* ---------- Jadwal SPMB card ---------- */
        .spmb-card {
          position: relative;
          isolation: isolate;
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(200,151,58,0.35);
          border-radius: 22px;
          padding: 30px 28px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 24px 60px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
          overflow: hidden;
        }
        .spmb-card-glow {
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(232,184,75,0.35), transparent 70%);
          filter: blur(20px);
          z-index: -1;
          pointer-events: none;
        }
        .spmb-card-head { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
        .spmb-cal {
          width: 44px; height: 44px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px;
          background: linear-gradient(135deg, #C8973A, #E8B84B);
          color: #0A1628;
          box-shadow: 0 8px 20px rgba(200,151,58,0.35);
        }
        .spmb-card-title { color: #fff; font-size: 21px; line-height: 1.2; }
        .spmb-card-sub { color: #E8B84B; font-size: 12px; font-weight: 600; letter-spacing: 0.02em; margin-top: 3px; }

        .spmb-track { display: flex; flex-direction: column; }
        .spmb-item { display: flex; gap: 14px; }
        .spmb-node-col { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
        .spmb-node {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.12);
          transition: all .3s ease;
        }
        .spmb-node-line { flex: 1; width: 2px; min-height: 22px; background: rgba(255,255,255,0.12); margin: 4px 0; }
        .spmb-item-body { padding-bottom: 22px; padding-top: 4px; }
        .spmb-item:last-child .spmb-item-body { padding-bottom: 0; }
        .spmb-item-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .spmb-item-name { color: rgba(255,255,255,0.55); font-size: 14px; font-weight: 600; transition: color .3s ease; }
        .spmb-item-date { color: rgba(255,255,255,0.35); font-size: 12px; margin-top: 3px; transition: color .3s ease; }
        .spmb-chip {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase;
          padding: 2px 9px; border-radius: 999px;
        }
        .spmb-chip-selesai { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.4); }
        .spmb-chip-berlangsung { background: rgba(74,222,128,0.16); color: #4ADE80; }
        .spmb-chip-akan-datang { background: rgba(200,151,58,0.16); color: #E8B84B; }
        .spmb-chip-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ADE80; animation: badge-pulse 1.8s ease-out infinite; }

        /* selesai */
        .spmb-selesai .spmb-node { background: rgba(74,222,128,0.14); color: #4ADE80; border-color: rgba(74,222,128,0.3); }

        /* gelombang yang jadi fokus */
        .spmb-aktif .spmb-node {
          background: linear-gradient(135deg, #C8973A, #E8B84B);
          color: #0A1628;
          border-color: transparent;
          transform: scale(1.08);
        }
        .spmb-aktif .spmb-item-name { color: #fff; }
        .spmb-aktif .spmb-item-date { color: #E8B84B; }
        .spmb-aktif .spmb-item-body {
          margin-left: -12px; padding-left: 12px; margin-right: -10px; padding-right: 10px;
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(200,151,58,0.14), rgba(200,151,58,0.03));
          box-shadow: inset 0 0 0 1px rgba(200,151,58,0.28);
        }
        .spmb-node-pulse { animation: pulse-ring 2s ease-out infinite; }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(232,184,75,0.5); }
          70% { box-shadow: 0 0 0 10px rgba(232,184,75,0); }
          100% { box-shadow: 0 0 0 0 rgba(232,184,75,0); }
        }

        .spmb-cta {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 26px; width: 100%; font-size: 14px;
        }

        .marquee-strip { background: #0A1628; overflow: hidden; padding: 14px 0; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); }
        .marquee-track { display: flex; width: max-content; animation: marquee 22s linear infinite; gap: 40px; }
        .marquee-track span { display: flex; align-items: center; gap: 8px; color: #E8B84B; font-weight: 700; font-size: 13px; letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .section-pad { padding: 80px 24px; }
        .section-title { font-size: 38px; color: #0A1628; margin-bottom: 12px; }
        .cta-title { color: white; font-size: 40px; margin-bottom: 16px; }
        .cta-btn-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .cta-section { position: relative; overflow: hidden; }
        .cta-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(400px circle at 50% 0%, rgba(232,184,75,0.18), transparent 70%);
          animation: pulse-glow 4s ease-in-out infinite;
        }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .cta-sparkle { margin-bottom: 12px; animation: spin-slow 6s linear infinite; }
        @keyframes spin-slow { to { transform: rotate(360deg); } }

        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .reveal.in-view { opacity: 1; transform: none; }

        .jurusan-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }
        .jurusan-card { position: relative; isolation: isolate; transition: border-color .2s, box-shadow .2s, transform .15s ease-out; will-change: transform; }
        .jurusan-card::before {
          content: '';
          position: absolute; inset: -2px; border-radius: 16px;
          background: linear-gradient(120deg, #C8973A, #15803d, #E8B84B, #C8973A);
          background-size: 300% 300%;
          z-index: -1; opacity: 0;
          transition: opacity .3s ease;
          animation: shimmer-move 3s linear infinite;
        }
        .jurusan-card:hover::before { opacity: 1; }
        @keyframes shimmer-move { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }
        .jurusan-card::after {
          content: '';
          position: absolute; inset: 0; border-radius: 14px;
          background: radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(200,151,58,0.12), transparent 70%);
          opacity: 0; transition: opacity .3s; pointer-events: none;
        }
        .jurusan-card:hover::after { opacity: 1; }
        .jurusan-card:hover { border-color: #C8973A; box-shadow: 0 8px 30px rgba(200,151,58,0.15); }
        .card-arrow { transition: transform .25s ease; }
        .jurusan-card:hover .card-arrow { transform: translateX(4px); }
        .kuota-bar { height: 4px; background: #F0EBE0; border-radius: 2px; overflow: hidden; margin-top: 8px; }
        .kuota-bar-fill { height: 100%; background: linear-gradient(90deg, #C8973A, #E8B84B); border-radius: 2px; transition: width 1s ease .1s; }

        .fasilitas-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .fasilitas-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .facility-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: white; border: 1px solid #F0EBE0; border-radius: 999px;
          padding: 10px 16px; margin: 4px 6px 4px 0; font-size: 13px; color: #374151;
          transition: all .25s ease;
        }
        .facility-pill:hover {
          background: linear-gradient(135deg, #17713b, #0f4c35);
          color: white; border-color: transparent;
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 20px rgba(23,113,59,0.25);
        }
        .stat-tile { transition: transform .3s ease, box-shadow .3s ease; }
        .stat-tile:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 16px 32px rgba(0,0,0,0.18); }

        :focus-visible { outline: 2px solid #E8B84B; outline-offset: 2px; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        @media (max-width: 1024px) {
          .hero-inner { grid-template-columns: 1fr; gap: 48px; }
          .hero-title { font-size: 44px; }
          .fasilitas-inner { grid-template-columns: 1fr; gap: 40px; }
        }

        @media (max-width: 640px) {
          .hero-section { padding: 64px 20px 72px; }
          .hero-badge { font-size: 11px; padding: 5px 12px; }
          .hero-title { font-size: 32px; margin-bottom: 16px; }
          .hero-desc { font-size: 15px; margin-bottom: 28px; max-width: 100%; }
          .hero-btn-row { flex-direction: column; gap: 12px; }
          .hero-btn-row a { text-align: center; width: 100%; }
          .hero-stats-row { gap: 20px; margin-top: 36px; }
          .hero-stat-value { font-size: 22px; }
          .spmb-card { padding: 24px 20px; max-width: 100%; }
          .section-pad { padding: 56px 16px; }
          .section-title { font-size: 28px; }
          .cta-title { font-size: 28px; }
          .cta-btn-row { flex-direction: column; }
          .cta-btn-row a { text-align: center; width: 100%; }
          .jurusan-grid { grid-template-columns: 1fr; }
          .fasilitas-stats-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
        }

        @media (max-width: 380px) {
          .fasilitas-stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}