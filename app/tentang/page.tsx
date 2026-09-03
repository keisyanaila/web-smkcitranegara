'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import {
  Target, Eye, GraduationCap, Users, CalendarDays, Award,
  ChevronDown, Sparkles, HeartHandshake, Rocket, ShieldCheck, Code2,
} from 'lucide-react';

/* ══════════════════════════════════════════
   CSS (responsif + animasi scroll-reveal)
══════════════════════════════════════════ */
const CSS = `
  /* ── Scroll reveal ── */
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity .7s ease, transform .7s ease; }
  .reveal.in { opacity: 1; transform: none; }
  .reveal.d1 { transition-delay: .08s; }
  .reveal.d2 { transition-delay: .16s; }
  .reveal.d3 { transition-delay: .24s; }
  .reveal.d4 { transition-delay: .32s; }
  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1; transform: none; transition: none; }
  }

  /* ── Hero ── */
  .hero-section { padding: 90px 24px 70px; }
  .hero-inner { max-width: 820px; margin: 0 auto; text-align: center; }
  .hero-logo-wrap { width: 170px; height: 170px; }
  .hero-title { font-size: 46px; }
  .hero-desc { color: rgba(255,255,255,0.75); font-size: 17px; line-height: 1.7; max-width: 600px; margin: 0 auto; }

  /* ── Stat strip ── */
  .stat-strip {
    max-width: 1000px; margin: -46px auto 0; padding: 0 24px;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
    position: relative; z-index: 5;
  }
  .stat-card {
    background: #fff; border: 1px solid #ECE3D2; border-radius: 16px;
    padding: 22px 16px; text-align: center;
    box-shadow: 0 14px 34px rgba(10,22,40,0.10);
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .stat-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(10,22,40,0.16); }
  .stat-ico {
    width: 42px; height: 42px; border-radius: 11px; margin: 0 auto 10px;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #C8973A, #E8B84B);
  }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: #123524; line-height: 1; }
  .stat-lbl { font-size: 12.5px; color: #6B7280; margin-top: 6px; font-weight: 600; letter-spacing: .3px; }

  /* ── Section shell ── */
  .sec { padding: 78px 24px; }
  .sec-cream { background: #FAF7F0; }
  .sec-white { background: #fff; }
  .sec-head { text-align: center; margin-bottom: 48px; }
  .sec-title { font-size: 36px; color: #0A1628; margin: 6px 0 0; }
  .sec-kicker { color: #C8973A; font-weight: 700; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; }

  /* ── Sambutan ── */
  .sambutan-grid {
    display: grid; grid-template-areas: "photo" "text";
    grid-template-columns: 1fr; gap: 28px; max-width: 700px; margin: 0 auto;
  }
  .sambutan-photo-area { grid-area: photo; }
  .sambutan-text-area { grid-area: text; }
  .sambutan-photo-wrap {
    width: 210px; margin: 0 auto; border-radius: 16px; overflow: hidden;
    box-shadow: 0 16px 34px rgba(0,0,0,0.16); border: 4px solid #fff;
  }
  .sambutan-name { font-family: 'Playfair Display', serif; font-size: 20px; color: #123524; margin-top: 14px; text-align: center; }
  .sambutan-role { font-size: 12.5px; color: #C8973A; font-weight: 700; text-align: center; letter-spacing: 1px; }
  .sambutan-p { color: #4B5563; line-height: 1.9; font-size: 15px; margin-bottom: 14px; }
  .sambutan-fade {
    position: relative; max-height: 168px; overflow: hidden;
    transition: max-height .5s ease;
  }
  .sambutan-fade.open { max-height: 1400px; }
  .sambutan-fade:not(.open)::after {
    content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 70px;
    background: linear-gradient(transparent, #FAF7F0);
  }
  .read-btn {
    display: inline-flex; align-items: center; gap: 6px; margin-top: 6px;
    background: none; border: none; cursor: pointer;
    color: #123524; font-weight: 700; font-size: 14px; font-family: inherit;
  }
  .read-btn svg { transition: transform .3s ease; }
  .read-btn.open svg { transform: rotate(180deg); }
  @media (min-width: 861px) {
    .sambutan-grid {
      grid-template-areas: "photo text"; grid-template-columns: 300px 1fr;
      max-width: 1080px; gap: 60px; align-items: start;
    }
    .sambutan-photo-wrap { width: 100%; max-width: 300px; position: sticky; top: 100px; }
  }

  /* ── Visi Misi tabs ── */
  .vm-wrap { max-width: 900px; margin: 0 auto; }
  .vm-tabs { display: flex; gap: 10px; justify-content: center; margin-bottom: 26px; flex-wrap: wrap; }
  .vm-tab {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 24px; border-radius: 999px; cursor: pointer;
    border: 1.5px solid #E2D9C8; background: #fff; color: #6B7280;
    font-weight: 700; font-size: 14px; font-family: inherit; transition: all .2s ease;
  }
  .vm-tab.active { background: linear-gradient(135deg, #123524, #1E5A3D); color: #fff; border-color: #123524; }
  .vm-tab:not(.active):hover { border-color: #C8973A; color: #123524; }
  .vm-panel {
    background: linear-gradient(160deg, #123524, #0B2A1C); color: #fff;
    border-radius: 20px; padding: 40px; box-shadow: 0 20px 50px rgba(18,53,36,0.28);
  }
  .vm-panel h3 { font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
  .vm-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
  .vm-list li { display: flex; gap: 12px; font-size: 14.5px; line-height: 1.75; color: rgba(255,255,255,0.85); }
  .vm-list li::before {
    content: ''; flex-shrink: 0; width: 22px; height: 22px; border-radius: 7px; margin-top: 2px;
    background: rgba(200,151,58,0.22);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23E8B84B' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: center;
  }
  .vm-single { font-size: 16px; line-height: 1.9; color: rgba(255,255,255,0.9); }

  /* ── Keunggulan ── */
  .val-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
  .val-card {
    background: #fff; border: 1px solid #ECE3D2; border-radius: 18px; padding: 30px 26px;
    transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  }
  .val-card:hover { transform: translateY(-6px); box-shadow: 0 22px 44px rgba(10,22,40,0.12); border-color: #C8973A; }
  .val-ico {
    width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center;
    background: #FAF7F0; border: 1px solid #ECE3D2; margin-bottom: 18px;
  }
  .val-card:hover .val-ico { background: linear-gradient(135deg,#123524,#1E5A3D); border-color: #123524; }
  .val-card:hover .val-ico svg { stroke: #E8B84B; }
  .val-card h4 { font-family: 'Playfair Display', serif; font-size: 19px; color: #0A1628; margin-bottom: 8px; }
  .val-card p { color: #6B7280; font-size: 13.5px; line-height: 1.75; }

  /* ── Program keahlian ── */
  .prog-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .prog-card {
    display: flex; align-items: center; gap: 14px; text-decoration: none;
    background: #fff; border: 1px solid #ECE3D2; border-radius: 14px; padding: 16px 18px;
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .prog-card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px rgba(10,22,40,0.12); }
  .prog-badge {
    width: 46px; height: 46px; border-radius: 11px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif; font-weight: 700; font-size: 15px; color: #fff;
  }
  .prog-card b { display: block; color: #0A1628; font-size: 14px; }
  .prog-card span { color: #9CA3AF; font-size: 12px; }

  /* ── Struktur toggle ── */
  .struktur-toggle { display: flex; justify-content: center; margin: 0 auto 8px; }
  .struktur-toggle button {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #C8973A, #E8B84B); color: #0A1628;
    border: none; border-radius: 999px; padding: 11px 26px; cursor: pointer;
    font-weight: 700; font-size: 14px; font-family: inherit;
  }
  .struktur-toggle button svg { transition: transform .3s ease; }
  .struktur-toggle button.open svg { transform: rotate(180deg); }

  /* ── Struktur diagram ── */
  .struktur-section { padding: 40px 16px 70px; background: #fff; overflow-x: auto; }
  .struktur-tree { min-width: 1100px; }
  .struktur-hint { display: none; }
  .struktur-box {
    border-radius: 9px; padding: 8px 14px; text-align: center;
    min-width: 148px; max-width: 200px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); flex-shrink: 0;
  }
  .struktur-box-wide { min-width: 220px; max-width: 260px; }
  .struktur-box-name { font-size: 12px; font-weight: 700; line-height: 1.35; }
  .struktur-box-label { font-size: 10px; margin-top: 2px; font-weight: 600; }

  @media (max-width: 900px) {
    .stat-strip { grid-template-columns: 1fr 1fr; gap: 14px; }
    .val-grid, .prog-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .hero-section { padding: 60px 20px 56px; }
    .hero-title { font-size: 29px; }
    .hero-logo-wrap { width: 120px; height: 120px; }
    .hero-desc { font-size: 15px; }
    .sec { padding: 56px 20px; }
    .sec-title { font-size: 26px; }
    .vm-panel { padding: 26px 22px; }
    .val-grid, .prog-grid { grid-template-columns: 1fr; }
    .struktur-hint { display: block; }
    .struktur-tree { min-width: 900px; }
    .struktur-box { min-width: 128px; max-width: 170px; padding: 7px 10px; }
    .struktur-box-wide { min-width: 190px; max-width: 220px; }
    .struktur-box-name { font-size: 11px; }
    .struktur-box-label { font-size: 9.5px; }
  }
  @media (max-width: 480px) {
    .hero-title { font-size: 24px; }
    .stat-strip { grid-template-columns: 1fr 1fr; }
    .struktur-tree { min-width: 760px; }
    .struktur-box { min-width: 112px; max-width: 150px; padding: 6px 8px; }
    .struktur-box-wide { min-width: 170px; max-width: 200px; }
    .struktur-box-name { font-size: 10.5px; }
    .struktur-box-label { font-size: 9px; }
  }
`;

/* ══════════════════════════════════════════
   Hook: scroll reveal
══════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ══════════════════════════════════════════
   Angka beranimasi saat terlihat
══════════════════════════════════════════ */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} className="stat-num">
      {val}
      {suffix}
    </span>
  );
}

/* ══════════════════════════════════════════
   Data — sesuaikan bila perlu
══════════════════════════════════════════ */
const STATS = [
  { icon: CalendarDays, to: 2004, suffix: '', label: 'Tahun Berdiri' },
  { icon: GraduationCap, to: 6, suffix: '', label: 'Program Keahlian' },
  { icon: Users, to: 1200, suffix: '+', label: 'Siswa Aktif' },
  { icon: Award, to: 100, suffix: '+', label: 'Prestasi Diraih' },
];

const VISI =
  'Terwujudnya Sekolah Kejujuran yang Religius, Disiplin dan Terampil Dalam Menyongsong Generasi Emas di Tahun 2045.';

const MISI = [
  'Mewujudkan insan yang taat beribadah, cinta kepada kitab suci, dan pandai dalam dakwah keagamaan.',
  'Mewujudkan peserta didik yang berperilaku baik, patuh, dan memiliki jiwa kepemimpinan.',
  'Mewujudkan peserta didik yang ahli sesuai kejuruannya melalui sinkronisasi kurikulum intrakurikuler dengan ekstrakurikuler.',
  'Mengembangkan kerja sama dengan dunia usaha dan dunia industri (DUDI).',
];

const VALUES = [
  { icon: ShieldCheck, title: 'Sekolah Kejujuran', desc: 'Budaya jujur ditanamkan lewat kantin kejujuran dan pembiasaan harian di setiap kelas.' },
  { icon: HeartHandshake, title: 'Religius & Berkarakter', desc: 'Pembiasaan ibadah, tahsin, dan kegiatan keagamaan untuk membentuk akhlak mulia.' },
  { icon: Code2, title: 'Kompeten & Terampil', desc: 'Pembelajaran berbasis praktik dengan lab dan alat sesuai standar industri.' },
  { icon: Rocket, title: 'Link & Match Industri', desc: 'Kerja sama DUDI untuk magang, guru tamu, dan penyerapan lulusan.' },
  { icon: Sparkles, title: 'Ekstrakurikuler Aktif', desc: '14+ ekskul mulai dari Paskibra, E-Sport, hingga CN Gakuen untuk menyalurkan minat bakat.' },
  { icon: Users, title: 'Pendampingan Siswa', desc: 'Guru BK dan wali kelas mendampingi perkembangan akademik dan non-akademik siswa.' },
];

const PROGRAMS = [
  { kode: 'PPLG', nama: 'Perangkat Lunak & Gim', color: '#1E3A5F' },
  { kode: 'TJKT', nama: 'Jaringan & Telekomunikasi', color: '#3a96d0' },
  { kode: 'DKV', nama: 'Desain Komunikasi Visual', color: '#DC2626' },
  { kode: 'PM', nama: 'Pemasaran', color: '#92681A' },
  { kode: 'MPLB', nama: 'Manajemen Perkantoran', color: '#b59a00' },
  { kode: 'PH', nama: 'Perhotelan', color: '#024d20' },
];

/* ══════════════════════════════════════════
   KOMPONEN STRUKTUR ORGANISASI (dari versi sebelumnya)
══════════════════════════════════════════ */
function Box({ name, label, variant = 'default', wide = false }: {
  name: string; label: string; variant?: string; wide?: boolean;
}) {
  const styles: Record<string, { bg: string; border: string; nameColor: string; labelColor: string }> = {
    default: { bg: 'white', border: '#E2D9C8', nameColor: '#0A1628', labelColor: '#6B7280' },
    dark: { bg: '#023d17', border: '#C8973A', nameColor: 'white', labelColor: '#C8973A' },
    gold: { bg: 'linear-gradient(135deg,#C8973A,#E8B84B)', border: '#C8973A', nameColor: '#0A1628', labelColor: '#0A1628' },
    cream: { bg: '#FAF7F0', border: '#E2D9C8', nameColor: '#0A1628', labelColor: '#6B7280' },
  };
  const s = styles[variant] ?? styles.default;
  return (
    <div className={`struktur-box ${wide ? 'struktur-box-wide' : ''}`} style={{ background: s.bg, border: `1.5px solid ${s.border}` }}>
      <div className="struktur-box-name" style={{ color: s.nameColor }}>{name}</div>
      <div className="struktur-box-label" style={{ color: s.labelColor }}>{label}</div>
    </div>
  );
}
const VLine = ({ h = 18 }: { h?: number }) => (
  <div style={{ width: 2, height: h, background: '#C8973A', alignSelf: 'center', flexShrink: 0 }} />
);
const HLine = ({ w = 32 }: { w?: number }) => (
  <div style={{ height: 2, width: w, background: '#C8973A', alignSelf: 'center', flexShrink: 0 }} />
);
function VCol({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{children}</div>;
}

function StrukturDiagram() {
  return (
    <div className="struktur-section">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <p className="struktur-hint" style={{ textAlign: 'center', color: '#9CA3AF', fontSize: 12, marginBottom: 12 }}>
          ← Geser untuk melihat struktur lengkap →
        </p>
        <div className="struktur-tree" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Box name="Dr. M. Rizki Darmaguna Hasan, S.Tr., M.Pd" label="Ketua BPH" variant="gold" wide />
            <HLine w={40} />
            <Box name="Hj. Mutiah, S.Pd., MM" label="Advisor BPH" />
          </div>
          <VLine />
          <Box name="Agustin Wijayanti, S.H., MM" label="Wakil Ketua BPH" />
          <VLine />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Box name="Mursyid Waskito, MT" label="Ketua Komite" variant="cream" />
            <HLine w={32} />
            <Box name="Abdul Kodir Zaelani, S.Pd.I" label="Kepala SMK Citra Negara" variant="dark" wide />
          </div>
          <VLine h={24} />
          <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: 2, background: '#C8973A' }} />
            <VCol>
              <VLine h={16} />
              <Box name="Endang Eva Yurita, MM" label="Waka Kurikulum" />
              <VLine />
              <div style={{ display: 'flex', gap: 8 }}>
                <VCol>
                  <Box name="Tubagus Soca, S.Kom" label="Kaprog TJKT" variant="cream" />
                  <VLine h={10} />
                  <Box name="Nurhakim Wirasena, S.IKom" label="Kaprog DKV" variant="cream" />
                  <VLine h={10} />
                  <Box name="Nurul Pratiwi" label="Kaprog PM" variant="cream" />
                </VCol>
                <VCol>
                  <Box name="Satria Yudha, S.Kom" label="Kaprog PPLG & BKK" variant="cream" />
                  <VLine h={10} />
                  <Box name="Ebon Sunarti, S.Pd" label="Kaprog MPLB" variant="cream" />
                </VCol>
              </div>
              <VLine h={10} />
              <Box name="Salmah, S.Pd" label="BK & Piket Gedung A" variant="cream" />
            </VCol>
            <VCol>
              <VLine h={16} />
              <Box name="Ir. Lukman Kharis, M.Pd" label="Waka Humas" />
              <VLine />
              <Box name="Rista Bagus H. Handoko, S.Pd" label="Pembina Kedisiplinan Siswa" variant="cream" />
              <VLine h={10} />
              <Box name="Fikri Zaenurihal, S.Pd" label="Pembina IRMA" variant="cream" />
              <VLine h={10} />
              <Box name="Helmi Fathurrahman, S.Pd" label="BK & Piket Gedung C" variant="cream" />
            </VCol>
            <VCol>
              <VLine h={16} />
              <Box name="M. Djunaedi Lubis, S.Sn" label="Waka Kesiswaan" />
              <VLine />
              <Box name="Moh. Aries S.Hum, M.Pd" label="Pembina OSIS" variant="cream" />
              <VLine h={10} />
              <Box name="Rustandi, M.Pd" label="SARPRAS" variant="cream" />
              <VLine h={10} />
              <Box name="Zahara Maharani, S.Pd" label="BK & Piket Gedung D & E" variant="cream" />
            </VCol>
            <VCol>
              <VLine h={16} />
              <Box name="Decky Ryansyah, M.Kom" label="Kepala IT" />
              <VLine />
              <Box name="Hari Suryanto, A.Md" label="Medsos" variant="cream" />
              <VLine h={10} />
              <Box name="Dita Aprilya SP" label="Media Kreatif" variant="cream" />
              <VLine h={10} />
              <Box name="Alvino Andina Rahman, S.Pd" label="Desain Grafis" variant="cream" />
              <VLine h={10} />
              <Box name="Nazwan" label="Server" variant="cream" />
              <VLine h={10} />
              <Box name="M. Nugraha" label="Teknisi" variant="cream" />
            </VCol>
            <VCol>
              <VLine h={16} />
              <Box name="Dina Sundari Wijaya, SE" label="KA TU Keuangan" />
              <VLine />
              <Box name="Andi Septiani Nabillah" label="Staff TU Keuangan" variant="cream" />
              <VLine h={10} />
              <Box name="Siti Afifah N, S.Pd" label="Staff TU Keuangan" variant="cream" />
              <VLine h={10} />
              <Box name="Nindi Tiara, S.Pd" label="Admin Kurikulum & Keuangan" variant="cream" />
              <VLine h={10} />
              <Box name="Naviyanti, S.Pd" label="Admin Kurikulum & Keuangan" variant="cream" />
              <VLine h={10} />
              <Box name="Imam Suzzai, S.IKom" label="Bendahara BOS" variant="cream" />
            </VCol>
            <VCol>
              <VLine h={16} />
              <Box name="Rohmat" label="Kepala TU & DAPODIK" />
              <VLine />
              <Box name="Seta Fitriana, A.Md" label="Logistik" variant="cream" />
              <VLine h={10} />
              <Box name="Yeni Herawati, S.Kom" label="Admin Keguruan" variant="cream" />
              <VLine h={10} />
              <Box name="Lia Lestari" label="Admin Kesiswaan" variant="cream" />
              <VLine h={10} />
              <Box name="Fitri Yanti" label="Perpustakaan" variant="cream" />
              <VLine h={10} />
              <Box name="Nandhita D.H, S.Pd" label="Seragam, BTBA & Piket Gedung D" variant="cream" />
              <VLine h={10} />
              <Box name="Putri Irmawati" label="Seragam, BTBA & Piket Gedung E" variant="cream" />
            </VCol>
          </div>
          <VLine h={24} />
          <div style={{ background: '#FAF7F0', border: '1.5px solid #C8973A', borderRadius: 10, padding: '10px 60px', fontWeight: 800, color: '#0A1628', fontSize: 14, letterSpacing: 2 }}>WALAS</div>
          <VLine />
          <div style={{ background: '#FAF7F0', border: '1.5px solid #C8973A', borderRadius: 10, padding: '10px 60px', fontWeight: 800, color: '#0A1628', fontSize: 14, letterSpacing: 2 }}>GURU</div>
          <VLine />
          <div style={{ background: 'linear-gradient(135deg,#C8973A,#E8B84B)', border: '1.5px solid #C8973A', borderRadius: 10, padding: '10px 60px', fontWeight: 800, color: '#0A1628', fontSize: 14, letterSpacing: 2 }}>PESERTA DIDIK</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HALAMAN
══════════════════════════════════════════ */
export default function TentangPage() {
  useReveal();
  const [readMore, setReadMore] = useState(false);
  const [vmTab, setVmTab] = useState<'visi' | 'misi'>('visi');
  const [showStruktur, setShowStruktur] = useState(false);

  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <main>
        {/* ── HERO ── */}
        <section className="hero-gradient hero-section">
          <div className="hero-inner">
            <div className="flex justify-center mb-6">
              <div className="hero-logo-wrap" style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', margin: '0 auto' }}>
                <Image src="/images/logo.png" alt="Logo SMK Citra Negara" fill style={{ objectFit: 'contain' }} />
              </div>
            </div>
            <h1 className="font-display hero-title" style={{ color: 'white', marginBottom: 16 }}>
              Tentang SMK Citra Negara
            </h1>
            <p className="hero-desc">
              Berdiri sejak 2004, kami menjadi institusi pendidikan kejuruan terkemuka di Palembang yang
              menghasilkan lulusan siap kerja, religius, dan berkarakter.
            </p>
          </div>
        </section>

        {/* ── STAT STRIP ── */}
        <div className="stat-strip">
          {STATS.map((s, i) => (
            <div key={s.label} className={`stat-card reveal d${i + 1}`}>
              <div className="stat-ico">
                <s.icon size={20} color="#0A1628" />
              </div>
              <Counter to={s.to} suffix={s.suffix} />
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── SAMBUTAN ── */}
        <section className="sec sec-cream">
          <div className="sec-head reveal">
            <span className="sec-kicker">Sambutan</span>
            <h2 className="font-display sec-title">Kepala Sekolah</h2>
          </div>
          <div className="sambutan-grid">
            <div className="sambutan-photo-area reveal">
              <div className="sambutan-photo-wrap">
                <Image
                  src="/images/kepseksmk.png"
                  alt="Kepala Sekolah SMK Citra Negara"
                  width={360}
                  height={440}
                  sizes="(min-width: 861px) 300px, 210px"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                />
              </div>
              <div className="sambutan-name">Abdul Kodir Zaelani, S.Pd.I</div>
              <div className="sambutan-role">KEPALA SMK CITRA NEGARA</div>
            </div>

            <div className="sambutan-text-area reveal d1">
              <div className={`sambutan-fade ${readMore ? 'open' : ''}`}>
                <p className="sambutan-p">Assalamu&rsquo;alaikum warahmatullahi wabarakatuh.</p>
                <p className="sambutan-p">
                  Salam sejahtera untuk seluruh siswa-siswi, orang tua, guru, dan staf sekolah kita yang
                  tercinta. Selamat datang di SMK Citra Negara, lembaga pendidikan yang berkomitmen mencetak
                  generasi yang terampil, berkarakter, dan siap bersaing di dunia kerja maupun melanjutkan
                  pendidikan ke jenjang yang lebih tinggi.
                </p>
                <p className="sambutan-p">
                  Di era globalisasi dan digitalisasi ini, tantangan dunia industri semakin kompleks. Oleh
                  karena itu, kami senantiasa berupaya memberikan pendidikan berbasis kompetensi yang
                  mengedepankan nilai kejujuran, disiplin, dan inovasi. Dengan kurikulum yang relevan, tenaga
                  pendidik profesional, serta fasilitas yang mendukung, kami berharap dapat memberikan
                  pengalaman belajar terbaik bagi para siswa.
                </p>
                <p className="sambutan-p">
                  Kami berharap semua pihak dapat bersinergi dalam mewujudkan visi dan misi sekolah. Semoga
                  Allah SWT senantiasa meridhoi setiap langkah kita dalam mencerdaskan kehidupan bangsa.
                </p>
              </div>
              <button
                className={`read-btn ${readMore ? 'open' : ''}`}
                onClick={() => setReadMore((v) => !v)}
              >
                {readMore ? 'Tutup' : 'Baca selengkapnya'} <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* ── VISI & MISI (tab) ── */}
        <section className="sec sec-white">
          <div className="sec-head reveal">
            <span className="sec-kicker">Arah Sekolah</span>
            <h2 className="font-display sec-title">Visi &amp; Misi</h2>
          </div>
          <div className="vm-wrap">
            <div className="vm-tabs reveal">
              <button className={`vm-tab ${vmTab === 'visi' ? 'active' : ''}`} onClick={() => setVmTab('visi')}>
                <Eye size={16} /> Visi
              </button>
              <button className={`vm-tab ${vmTab === 'misi' ? 'active' : ''}`} onClick={() => setVmTab('misi')}>
                <Target size={16} /> Misi
              </button>
            </div>
            <div className="vm-panel reveal d1">
              {vmTab === 'visi' ? (
                <>
                  <h3><Eye size={22} color="#E8B84B" /> Visi</h3>
                  <p className="vm-single">{VISI}</p>
                </>
              ) : (
                <>
                  <h3><Target size={22} color="#E8B84B" /> Misi</h3>
                  <ul className="vm-list">
                    {MISI.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── KEUNGGULAN ── */}
        <section className="sec sec-cream">
          <div className="sec-head reveal">
            <span className="sec-kicker">Kenapa Kami</span>
            <h2 className="font-display sec-title">Keunggulan SMK Citra Negara</h2>
          </div>
          <div className="val-grid">
            {VALUES.map((v, i) => (
              <div key={v.title} className={`val-card reveal d${(i % 3) + 1}`}>
                <div className="val-ico">
                  <v.icon size={24} color="#123524" />
                </div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROGRAM KEAHLIAN ── */}
        <section className="sec sec-white">
          <div className="sec-head reveal">
            <span className="sec-kicker">Jurusan</span>
            <h2 className="font-display sec-title">6 Program Keahlian</h2>
          </div>
          <div className="prog-grid">
            {PROGRAMS.map((p, i) => (
              <Link
                key={p.kode}
                href={`/jurusan#${p.kode.toLowerCase()}`}
                className={`prog-card reveal d${(i % 3) + 1}`}
              >
                <div className="prog-badge" style={{ background: p.color }}>{p.kode}</div>
                <div>
                  <b>{p.kode}</b>
                  <span>{p.nama}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── STRUKTUR ORGANISASI (collapsible) ── */}
        <section className="sec sec-cream" style={{ paddingBottom: showStruktur ? 24 : 78 }}>
          <div className="sec-head reveal" style={{ marginBottom: 28 }}>
            <span className="sec-kicker">SMK Citra Negara</span>
            <h2 className="font-display sec-title">Struktur Organisasi</h2>
          </div>
          <div className="struktur-toggle">
            <button
              className={showStruktur ? 'open' : ''}
              onClick={() => setShowStruktur((v) => !v)}
            >
              {showStruktur ? 'Sembunyikan bagan' : 'Lihat bagan struktur'} <ChevronDown size={16} />
            </button>
          </div>
        </section>
        {showStruktur && <StrukturDiagram />}
      </main>
      <Footer />
    </>
  );
}
