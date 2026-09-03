'use client';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import Link from 'next/link';
import { CheckCircle, Users, Clock, Monitor, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const JURUSAN = [
  {
    id: 'pplg',
    href: '/jurusan/pplg',
    logo: '/images/logopplg.png',
    kode: 'PPLG',
    nama: 'Pengembangan Perangkat Lunak & Gim',
    deskripsi: 'Mempersiapkan siswa menjadi pengembang software profesional: web, game, mobile, database, dan rekayasa sistem.',
    kuota: 72,
    kelas: 2,
    kompetensi: ['Pemrograman Dasar', 'Database', 'UI/UX Design', 'Testing & Debugging'],
    color: '#1E3A5F',
    kategori: 'Teknologi',
  },
  {
    id: 'tjkt',
    href: '/jurusan/tjkt',
    logo: '/images/logotjkt.png',
    kode: 'TJKT',
    nama: 'Teknik Jaringan Komputer dan Telekomunikasi',
    deskripsi: 'Membekali siswa dengan pengetahuan dan keterampilan praktis di bidang jaringan komputer dan telekomunikasi.',
    kuota: 72,
    kelas: 2,
    kompetensi: ['Jaringan LAN/WAN', 'Keamanan Jaringan', 'Teknologi Nirkabel', 'Manajemen Jaringan'],
    color: '#3a96d0',
    kategori: 'Teknologi',
  },
  {
    id: 'dkv',
    href: '/jurusan/dkv',
    logo: '/images/logodkv.png',
    kode: 'DKV',
    nama: 'Desain Komunikasi Visual',
    deskripsi: 'Fokus pada pengembangan keterampilan desain grafis, ilustrasi, fotografi, animasi, dan multimedia.',
    kuota: 36,
    kelas: 3,
    kompetensi: ['Desain Grafis', 'Fotografi', 'Animasi', 'Produksi Video'],
    color: '#DC2626',
    kategori: 'Kreatif',
  },
  {
    id: 'pm',
    href: '/jurusan/pm',
    logo: '/images/logopm.png',
    kode: 'PM',
    nama: 'Bisnis Digital Dan Retail',
    deskripsi: 'Membangun keterampilan pemasaran dan penjualan, dari riset pasar hingga pemasaran digital.',
    kuota: 36,
    kelas: 1,
    kompetensi: ['Riset Pasar', 'Strategi Pemasaran', 'Penjualan', 'E-commerce'],
    color: '#92681A',
    kategori: 'Bisnis',
  },
  {
    id: 'mplb',
    href: '/jurusan/mplb',
    logo: '/images/logomplb.png',
    kode: 'MPLB',
    nama: 'Manajemen Perkantoran & Layanan Bisnis',
    deskripsi: 'Mempersiapkan siswa mengelola administrasi perkantoran dan layanan bisnis secara efektif.',
    kuota: 36,
    kelas: 1,
    kompetensi: ['Administrasi Perkantoran', 'Komunikasi Bisnis', 'Layanan Pelanggan', 'Keuangan Dasar'],
    color: '#92681A',
    kategori: 'Bisnis',
  },
  {
    id: 'ph',
    href: '/jurusan/ph',
    logo: '/images/logoph.png',
    kode: 'PH',
    nama: 'Perhotelan',
    deskripsi: 'Mencetak profesional muda yang siap terjun ke industri pariwisata dan perhotelan.',
    kuota: 36,
    kelas: 1,
    kompetensi: ['Front Office', 'Housekeeping', 'F&B Service', 'Kewirausahaan'],
    color: '#024d20',
    kategori: 'Pariwisata',
  },
];

const KATEGORI = ['Semua', ...Array.from(new Set(JURUSAN.map((j) => j.kategori)))];

const STATS: {
  icon: typeof Users;
  label: string;
  value: number | null;
  suffix: string;
  display?: string;
}[] = [
  { icon: Users, label: 'Total Kuota', value: 288, suffix: ' Siswa' },
  { icon: Monitor, label: 'Program Keahlian', value: 6, suffix: ' Jurusan' },
  { icon: Clock, label: 'Masa Belajar', value: 3, suffix: ' Tahun' },
  { icon: CheckCircle, label: 'Akreditasi', value: null, suffix: '', display: 'A (Unggul)' },
];

const SCROLL_OFFSET = 86;

/* ══════════════════════════════════════════
   HOOKS
══════════════════════════════════════════ */
function useInViewOnce<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fallback: kalau IntersectionObserver tidak tersedia, langsung tampilkan.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function useCountUp(target: number | null, trigger: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger || target === null) return;
    let raf: number;
    let start: number | null = null;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration]);

  return value;
}

/* ══════════════════════════════════════════
   SCROLL TO HASH (unchanged behaviour)
══════════════════════════════════════════ */
function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return null;
}

/* ══════════════════════════════════════════
   STAT ITEM (dengan hitungan angka berjalan)
══════════════════════════════════════════ */
function StatItem({
  item,
  index,
  trigger,
}: {
  item: (typeof STATS)[number];
  index: number;
  trigger: boolean;
}) {
  const count = useCountUp(item.value, trigger);
  const text = item.display ?? `${count}${item.suffix}`;

  return (
    <div className="jrs-stat-item" style={{ animationDelay: `${index * 90}ms` }}>
      <div className="jrs-stat-icon">
        <item.icon size={18} color="#C8973A" />
      </div>
      <div>
        <div className="jrs-stat-label">{item.label}</div>
        <div className="jrs-stat-val">{text}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   KARTU JURUSAN (tilt 3D + spotlight cursor)
══════════════════════════════════════════ */
function JurusanCard({ j, index }: { j: (typeof JURUSAN)[number]; index: number }) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const rx = (0.5 - (e.clientY - rect.top) / rect.height) * 8;
    el.style.setProperty('--mx', `${px}%`);
    el.style.setProperty('--my', `${py}%`);
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  const go = () => router.push(j.href);

  return (
    <div className="jrs-card-wrap" style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}>
      <div
        ref={cardRef}
        className="jrs-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={go}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') go();
        }}
        style={{ scrollMarginTop: SCROLL_OFFSET }}
        id={j.id}
      >
        <span className="jrs-card-glow" aria-hidden="true" />

        <div className="jrs-card-top" style={{ background: j.color }}>
          <div className="jrs-card-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={j.logo} alt={`Logo ${j.kode}`} width={48} height={48} style={{ objectFit: 'contain', width: 48, height: 48 }} />
          </div>
          <span className="jrs-card-badge">{j.kode}</span>
        </div>

        <div className="jrs-card-body">
          <h3 className="font-display jrs-card-title">{j.nama}</h3>
          <p className="jrs-card-desc">{j.deskripsi}</p>

          <div className="jrs-tags">
            {j.kompetensi.map((k, i) => (
              <span key={i} className="jrs-tag">{k}</span>
            ))}
          </div>

          <div className="jrs-card-meta">
            <span><strong>{j.kuota}</strong> kuota/tahun</span>
            <span className="jrs-dot">•</span>
            <span><strong>{j.kelas}</strong> rombel</span>
          </div>

          <Link href={j.href} className="jrs-detail-btn" onClick={(e) => e.stopPropagation()}>
            Lihat Detail <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HALAMAN
══════════════════════════════════════════ */
export default function JurusanPage() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const filtered = activeFilter === 'Semua' ? JURUSAN : JURUSAN.filter((j) => j.kategori === activeFilter);

  const [statsRef, statsInView] = useInViewOnce<HTMLDivElement>(0.3);
  const [cardsRef, cardsInView] = useInViewOnce<HTMLDivElement>(0.05);
  const [ctaRef, ctaInView] = useInViewOnce<HTMLDivElement>(0.3);

  return (
    <>
      <Navbar />
      <ScrollToHash />
      <main>
        {/* Hero */}
        <section className="hero-gradient jrs-hero">
          <span className="jrs-blob jrs-blob-1" aria-hidden="true" />
          <span className="jrs-blob jrs-blob-2" aria-hidden="true" />
          <div className="jrs-hero-inner">
            <div className="gold-line" style={{ margin: '0 auto 20px' }} />
            <h1 className="font-display jrs-hero-title">Program Keahlian</h1>
            <p className="jrs-hero-desc">
              6 program keahlian dirancang bersama industri untuk memastikan lulusan siap kerja dan kompeten.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="jrs-stats">
          <div ref={statsRef} className={`jrs-stats-inner ${statsInView ? 'is-visible' : ''}`}>
            {STATS.map((item, i) => (
              <StatItem key={item.label} item={item} index={i} trigger={statsInView} />
            ))}
          </div>
        </section>

        {/* Filter kategori */}
        <section className="jrs-filter-section">
          <div className="jrs-filter-bar">
            {KATEGORI.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`jrs-filter-chip ${activeFilter === cat ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Jurusan Cards */}
        <section className="jrs-cards-section">
          <div ref={cardsRef} className={`jrs-cards-grid ${cardsInView ? 'is-visible' : ''}`}>
            {filtered.map((j, i) => (
              <JurusanCard key={j.kode} j={j} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="jrs-empty">Belum ada jurusan di kategori ini.</p>
          )}
        </section>

        {/* CTA */}
        <section className="jrs-cta">
          <div ref={ctaRef} className={`jrs-cta-inner ${ctaInView ? 'is-visible' : ''}`}>
            <h2 className="font-display jrs-cta-title">Sudah Tentukan Pilihan?</h2>
            <p className="jrs-cta-desc">
              Daftar sekarang dan mulai perjalanan menuju karir impian Anda bersama SMK Citra Negara.
            </p>
            <div className="jrs-cta-buttons">
              <Link href="/spmb" className="btn-primary jrs-shine" style={{ fontSize: 16 }}>Daftar SPMB Sekarang</Link>
              <Link href="/spmb" className="btn-outline jrs-shine" style={{ fontSize: 16 }}>Info Lebih Lanjut</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx global>{`
        /* ===== Hero ===== */
        .jrs-hero { padding: 80px 24px; position: relative; overflow: hidden; }
        .jrs-hero-inner { max-width: 800px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
        .jrs-hero-title { font-size: 48px; color: white; margin-bottom: 16px; }
        .jrs-hero-desc { color: rgba(255,255,255,0.7); font-size: 17px; line-height: 1.7; max-width: 560px; margin: 0 auto; }

        .jrs-hero-inner > * { opacity: 0; animation: fadeUp 0.7s cubic-bezier(.16,.8,.3,1) forwards; }
        .jrs-hero-inner > *:nth-child(1) { animation-delay: 0s; }
        .jrs-hero-inner > *:nth-child(2) { animation-delay: 0.1s; }
        .jrs-hero-inner > *:nth-child(3) { animation-delay: 0.2s; }

        .jrs-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
          opacity: 0.35;
          animation: floatBlob 9s ease-in-out infinite alternate;
        }
        .jrs-blob-1 { width: 280px; height: 280px; background: #c8973a; top: -80px; left: -60px; }
        .jrs-blob-2 { width: 220px; height: 220px; background: #3a96d0; bottom: -80px; right: -40px; animation-delay: -3s; }

        @keyframes floatBlob {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, 20px) scale(1.12); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ===== Stats bar ===== */
        .jrs-stats { background: #023d17; padding: 28px 24px; border-bottom: 2px solid #c8973a; }
        .jrs-stats-inner { max-width: 1100px; margin: 0 auto; display: flex; gap: 40px; justify-content: center; flex-wrap: wrap; }
        .jrs-stat-item { display: flex; align-items: center; gap: 12px; opacity: 0; }
        .jrs-stats-inner.is-visible .jrs-stat-item { animation: fadeUp 0.6s cubic-bezier(.16,.8,.3,1) forwards; }
        .jrs-stat-icon { width: 40px; height: 40px; background: rgba(200,151,58,0.15); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.3s ease; }
        .jrs-stat-item:hover .jrs-stat-icon { transform: scale(1.1) rotate(-6deg); }
        .jrs-stat-label { color: rgba(255,255,255,0.5); font-size: 11px; }
        .jrs-stat-val { color: white; font-weight: 700; font-size: 15px; font-variant-numeric: tabular-nums; }

        /* ===== Filter kategori ===== */
        .jrs-filter-section { padding: 28px 24px 0; background: #faf7f0; }
        .jrs-filter-bar {
          max-width: 1100px; margin: 0 auto;
          display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
        }
        .jrs-filter-chip {
          border: 1.5px solid #eee2cc;
          background: white;
          color: #6b7280;
          font-weight: 600;
          font-size: 13px;
          padding: 9px 18px;
          border-radius: 999px;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .jrs-filter-chip:hover { border-color: #c8973a; color: #92681A; transform: translateY(-2px); }
        .jrs-filter-chip:active { transform: translateY(0) scale(0.97); }
        .jrs-filter-chip.is-active {
          background: linear-gradient(135deg, #c8973a, #e8b84b);
          border-color: transparent;
          color: #0A1628;
          box-shadow: 0 6px 16px rgba(200,151,58,0.35);
        }
        .jrs-filter-chip:focus-visible { outline: 3px solid #c8973a; outline-offset: 2px; }

        /* ===== Cards section ===== */
        .jrs-cards-section { padding: 40px 24px 70px; background: #faf7f0; }
        .jrs-cards-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }
        .jrs-empty { text-align: center; color: #6b7280; padding: 40px 0; }

        .jrs-card-wrap { height: 100%; opacity: 0; }
        .jrs-cards-grid.is-visible .jrs-card-wrap { animation: cardIn 0.6s cubic-bezier(.16,.8,.3,1) forwards; }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .jrs-card {
          --rx: 0deg; --ry: 0deg; --mx: 50%; --my: 50%;
          height: 100%;
          background: white;
          border-radius: 16px;
          border: 1px solid #eee2cc;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transform: perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry));
          transition: transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .jrs-card:hover {
          border-color: #c8973a;
          box-shadow: 0 20px 45px rgba(2,61,23,0.18);
        }
        .jrs-card:focus-visible {
          outline: 3px solid #c8973a;
          outline-offset: 3px;
        }
        .jrs-card-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          background: radial-gradient(220px circle at var(--mx) var(--my), rgba(200,151,58,0.25), transparent 70%);
        }
        .jrs-card:hover .jrs-card-glow { opacity: 1; }

        .jrs-card-top {
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }
        .jrs-card-logo {
          width: 56px;
          height: 56px;
          background: rgba(255,255,255,0.15);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid rgba(255,255,255,0.2);
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        .jrs-card:hover .jrs-card-logo { transform: scale(1.08) rotate(-4deg); }
        .jrs-card-badge {
          background: rgba(255,255,255,0.15);
          color: white;
          font-size: 11px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
          transition: transform 0.3s ease;
        }
        .jrs-card:hover .jrs-card-badge { transform: scale(1.06); }

        .jrs-card-body { padding: 20px; display: flex; flex-direction: column; flex: 1; position: relative; z-index: 1; }
        .jrs-card-title { font-size: 17px; color: #1a1a1a; line-height: 1.3; margin-bottom: 8px; }
        .jrs-card-desc { font-size: 13px; color: #6b7280; line-height: 1.6; margin-bottom: 14px; }
        .jrs-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .jrs-tag {
          font-size: 11px;
          color: #92681A;
          background: #faf3e3;
          padding: 4px 9px;
          border-radius: 20px;
          font-weight: 500;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .jrs-card:hover .jrs-tag { background: #f5e6c4; }
        .jrs-card-meta {
          font-size: 12px;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .jrs-card-meta strong { color: #1a1a1a; }
        .jrs-dot { color: #d1d5db; }

        /* ===== "Lihat Detail" button ===== */
        .jrs-detail-btn {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 1.5px solid #c8973a;
          color: #92681A;
          background: transparent;
          font-weight: 700;
          font-size: 13px;
          padding: 10px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .jrs-detail-btn:hover { background: #c8973a; color: white; }
        .jrs-detail-btn svg { transition: transform 0.25s ease; }
        .jrs-card:hover .jrs-detail-btn svg { transform: translateX(4px); }

        /* ===== CTA ===== */
        .jrs-cta { padding: 70px 24px; background: #023d17; text-align: center; overflow: hidden; }
        .jrs-cta-inner { max-width: 600px; margin: 0 auto; }
        .jrs-cta-title { color: white; font-size: 38px; margin-bottom: 16px; opacity: 0; }
        .jrs-cta-desc { color: rgba(255,255,255,0.65); font-size: 16px; line-height: 1.7; margin-bottom: 32px; opacity: 0; }
        .jrs-cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; opacity: 0; }
        .jrs-cta-inner.is-visible .jrs-cta-title { animation: fadeUp 0.6s cubic-bezier(.16,.8,.3,1) forwards; }
        .jrs-cta-inner.is-visible .jrs-cta-desc { animation: fadeUp 0.6s cubic-bezier(.16,.8,.3,1) 0.1s forwards; }
        .jrs-cta-inner.is-visible .jrs-cta-buttons { animation: fadeUp 0.6s cubic-bezier(.16,.8,.3,1) 0.2s forwards; }

        .jrs-shine { position: relative; overflow: hidden; }
        .jrs-shine::after {
          content: '';
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
        }
        .jrs-shine:hover::after { left: 120%; }

        /* ===== Tablet ===== */
        @media (max-width: 900px) {
          .jrs-cards-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ===== Mobile ===== */
        @media (max-width: 640px) {
          .jrs-hero { padding: 56px 20px; }
          .jrs-hero-title { font-size: 32px; }
          .jrs-hero-desc { font-size: 15px; }
          .jrs-blob { opacity: 0.2; }

          .jrs-stats-inner { gap: 20px; justify-content: flex-start; }
          .jrs-stat-item { width: calc(50% - 10px); }

          .jrs-filter-section { padding: 20px 16px 0; }
          .jrs-filter-bar { justify-content: flex-start; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; }
          .jrs-filter-chip { flex-shrink: 0; }

          .jrs-cards-section { padding: 32px 16px 44px; }
          .jrs-cards-grid { grid-template-columns: 1fr; gap: 16px; }

          .jrs-cta { padding: 48px 20px; }
          .jrs-cta-title { font-size: 28px; }
          .jrs-cta-buttons { flex-direction: column; }
          .jrs-cta-buttons a { width: 100%; }
        }

        /* ===== Hormati preferensi reduced motion ===== */
        @media (prefers-reduced-motion: reduce) {
          .jrs-hero-inner > *,
          .jrs-blob,
          .jrs-stat-item,
          .jrs-card-wrap,
          .jrs-cta-title,
          .jrs-cta-desc,
          .jrs-cta-buttons {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .jrs-card { transition: none !important; }
        }
      `}</style>
    </>
  );
}