'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import EskulFX from '@/components/EskulFX';
import EskulMusic from '@/components/EskulMusic';

type Jurusan = {
  id: string;
  nama: string;
  singkatan: string;
  tagline: string;
  deskripsi: string;
  icon: string;
  accent: string;
  accent2: string;
  bidang: string;
  skills: {
    title: string;
    desc: string;
    icon: string;
  }[];
  projects: {
    title: string;
    desc: string;
  }[];
};

const JURUSAN: Jurusan[] = [
  {
    id: 'pplg',
    nama: 'Pengembangan Perangkat Lunak dan Gim',
    singkatan: 'PPLG',
    tagline: 'CODE. BUILD. CREATE.',
    deskripsi:
      'PPLG mempelajari proses pengembangan perangkat lunak dan gim, mulai dari memahami algoritma dan logika pemrograman, membuat website dan aplikasi, mengelola basis data, hingga mengembangkan produk digital yang dapat digunakan.',
    icon: '</>',
    accent: '#1E3A5F',
    accent2: '#ffff00',
    bidang: 'Pemrograman & Teknologi Digital',
    skills: [
      {
        title: 'Pemrograman',
        desc: 'Mempelajari logika, algoritma, struktur program, dan bahasa pemrograman untuk membuat perangkat lunak.',
        icon: '</>',
      },
      {
        title: 'Web Development',
        desc: 'Membuat website dari sisi tampilan hingga fungsi menggunakan teknologi web modern.',
        icon: '◫',
      },
      {
        title: 'Basis Data',
        desc: 'Mempelajari cara menyimpan, mengelola, mengolah, dan mengambil data dalam sebuah aplikasi.',
        icon: '▦',
      },
      {
        title: 'Pengembangan Gim',
        desc: 'Mengenal konsep game development seperti gameplay, logic, asset, dan interaksi pengguna.',
        icon: '◈',
      },
    ],
    projects: [
      {
        title: 'Website Sekolah',
        desc: 'Membangun website informatif dan interaktif untuk kebutuhan sekolah.',
      },
      {
        title: 'Aplikasi Digital',
        desc: 'Membuat aplikasi untuk menyelesaikan kebutuhan atau permasalahan tertentu.',
      },
      {
        title: 'Game Prototype',
        desc: 'Mengembangkan konsep gim sederhana dari ide hingga menjadi prototype.',
      },
    ],
  },

  {
    id: 'dkv',
    nama: 'Desain Komunikasi Visual',
    singkatan: 'DKV',
    tagline: 'THINK. DESIGN. COMMUNICATE.',
    deskripsi:
      'DKV mempelajari bagaimana menyampaikan pesan dan gagasan melalui bahasa visual. Siswa mengembangkan kemampuan desain grafis, ilustrasi, fotografi, tipografi, identitas visual, serta media komunikasi kreatif.',
    icon: '✦',
    accent: '#DC2626',
    accent2: '#120308',
    bidang: 'Desain & Komunikasi Visual',
    skills: [
      {
        title: 'Desain Grafis',
        desc: 'Mengolah teks, gambar, warna, dan komposisi menjadi karya visual yang komunikatif.',
        icon: '✦',
      },
      {
        title: 'Ilustrasi',
        desc: 'Mengembangkan kemampuan menggambar dan menciptakan visual untuk menyampaikan sebuah ide.',
        icon: '◒',
      },
      {
        title: 'Tipografi',
        desc: 'Mempelajari pemilihan, pengaturan, dan penggunaan huruf agar pesan visual lebih efektif.',
        icon: 'Aa',
      },
      {
        title: 'Branding',
        desc: 'Membangun identitas visual sebuah produk atau organisasi melalui logo, warna, dan elemen grafis.',
        icon: '◇',
      },
    ],
    projects: [
      {
        title: 'Visual Identity',
        desc: 'Merancang identitas visual seperti logo, warna, dan elemen grafis sebuah brand.',
      },
      {
        title: 'Poster & Campaign',
        desc: 'Membuat media kampanye visual untuk menyampaikan informasi kepada masyarakat.',
      },
      {
        title: 'Creative Portfolio',
        desc: 'Mengembangkan kumpulan karya desain sebagai portofolio kreatif.',
      },
    ],
  },

  {
    id: 'tjkt',
    nama: 'Teknik Jaringan Komputer dan Telekomunikasi',
    singkatan: 'TJKT',
    tagline: 'CONNECT. CONFIGURE. PROTECT.',
    deskripsi:
      'TJKT mempelajari instalasi, konfigurasi, pemeliharaan, dan troubleshooting jaringan komputer serta teknologi telekomunikasi. Siswa mengenal perangkat jaringan, server, konektivitas, hingga dasar keamanan jaringan.',
    icon: '⌁',
    accent: '#3a96d0',
    accent2: '#175e8b',
    bidang: 'Jaringan & Infrastruktur Teknologi',
    skills: [
      {
        title: 'Jaringan Komputer',
        desc: 'Mempelajari konsep jaringan LAN, WAN, topologi, IP address, serta komunikasi antarperangkat.',
        icon: '⌁',
      },
      {
        title: 'Routing & Switching',
        desc: 'Mempelajari konfigurasi perangkat jaringan agar data dapat dikirim dan diterima dengan baik.',
        icon: '⇄',
      },
      {
        title: 'Server',
        desc: 'Mengenal instalasi dan pengelolaan server serta layanan jaringan untuk kebutuhan pengguna.',
        icon: '▣',
      },
      {
        title: 'Keamanan Jaringan',
        desc: 'Mengenal konsep dasar keamanan jaringan untuk membantu melindungi perangkat dan data.',
        icon: '◇',
      },
    ],
    projects: [
      {
        title: 'Network Lab',
        desc: 'Membangun simulasi jaringan untuk mempraktikkan konfigurasi dan konektivitas.',
      },
      {
        title: 'Server Setup',
        desc: 'Melakukan instalasi dan konfigurasi layanan server sesuai kebutuhan jaringan.',
      },
      {
        title: 'Network Troubleshooting',
        desc: 'Menganalisis masalah koneksi dan melakukan perbaikan pada jaringan.',
      },
    ],
  },
];

export default function JurusanPPLGDKVTJKTPage() {
  const [active, setActive] = useState('pplg');
  const [changing, setChanging] = useState(false);

  const current =
    JURUSAN.find((item) => item.id === active) ?? JURUSAN[0];

  const changeMajor = (id: string) => {
    if (id === active) return;

    setChanging(true);

    setTimeout(() => {
      setActive(id);
      setChanging(false);
    }, 180);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>('.interactive-card');

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX =
          ((y - rect.height / 2) / rect.height) * -5;

        const rotateY =
          ((x - rect.width / 2) / rect.width) * 5;

        card.style.setProperty('--rx', `${rotateX}deg`);
        card.style.setProperty('--ry', `${rotateY}deg`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`major-page ${changing ? 'is-changing' : ''}`}
      style={
        {
          '--accent': current.accent,
          '--accent2': current.accent2,
        } as React.CSSProperties
      }
    >
      <style>{`
        * {
          box-sizing: border-box;
        }

        .major-page {
          --ink: #10172b;
          --muted: #667085;
          --soft: #f5f7ff;

          min-height: 100vh;

          color: var(--ink);

          background:
            radial-gradient(
              circle at 5% 5%,
              color-mix(
                in srgb,
                var(--accent) 13%,
                transparent
              ),
              transparent 27%
            ),
            radial-gradient(
              circle at 95% 15%,
              color-mix(
                in srgb,
                var(--accent2) 10%,
                transparent
              ),
              transparent 25%
            ),
            #fbfcff;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          overflow: hidden;

          transition:
            background .6s ease,
            color .4s ease;
        }

        .major-page.is-changing
          .hero-copy,
        .major-page.is-changing
          .info-card {
          opacity: .3;
          transform: translateY(10px);
        }

        /* ===============================
           HERO
        =============================== */

        .major-hero {
          position: relative;

          min-height: 690px;

          display: flex;
          align-items: center;

          padding:
            90px
            max(24px, 7vw);

          overflow: hidden;

          isolation: isolate;
        }

        .major-grid {
          position: absolute;
          inset: 0;

          opacity: .45;

          background-image:
            linear-gradient(
              rgba(16,23,43,.055) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(16,23,43,.055) 1px,
              transparent 1px
            );

          background-size: 44px 44px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 92%
            );

          z-index: -5;

          animation:
            gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          from {
            background-position:
              0 0,
              0 0;
          }

          to {
            background-position:
              44px 44px,
              44px 44px;
          }
        }

        /* BIG ORB */

        .major-blob {
          position: absolute;

          width: 500px;
          height: 500px;

          right: -160px;
          top: 55px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 30%,
              color-mix(
                in srgb,
                var(--accent2) 45%,
                white
              ),
              color-mix(
                in srgb,
                var(--accent) 15%,
                white
              ) 60%,
              transparent 72%
            );

          filter: blur(2px);

          z-index: -3;

          animation:
            blobFloat 8s ease-in-out infinite;

          transition:
            background .6s ease;
        }

        @keyframes blobFloat {
          0%,100% {
            transform:
              translate(0,0)
              scale(1);
          }

          50% {
            transform:
              translate(-25px,28px)
              scale(1.05);
          }
        }

        /* ORBIT */

        .major-orbit {
          position: absolute;

          width: 400px;
          height: 400px;

          right: 5%;
          top: 17%;

          border:
            1px dashed
            color-mix(
              in srgb,
              var(--accent) 40%,
              transparent
            );

          border-radius: 50%;

          animation:
            orbitSpin 20s linear infinite;

          z-index: -2;
        }

        .major-orbit::before,
        .major-orbit::after {
          content: '';

          position: absolute;

          width: 18px;
          height: 18px;

          border-radius: 50%;

          background: var(--accent);

          box-shadow:
            0 0 0 10px
            color-mix(
              in srgb,
              var(--accent) 12%,
              transparent
            );
        }

        .major-orbit::before {
          top: 20px;
          left: 60px;
        }

        .major-orbit::after {
          right: 20px;
          bottom: 75px;
        }

        @keyframes orbitSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* PARTICLES */

        .particle {
          position: absolute;

          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: var(--accent);

          opacity: .45;

          z-index: -1;

          animation:
            particleFloat 5s ease-in-out infinite;
        }

        .particle:nth-child(1) {
          left: 18%;
          top: 24%;
          animation-delay: -1s;
        }

        .particle:nth-child(2) {
          left: 43%;
          top: 12%;
          animation-delay: -3s;
        }

        .particle:nth-child(3) {
          left: 55%;
          top: 75%;
          animation-delay: -2s;
        }

        .particle:nth-child(4) {
          left: 75%;
          top: 30%;
          animation-delay: -4s;
        }

        @keyframes particleFloat {
          0%,100% {
            transform:
              translate(0,0)
              scale(1);
          }

          50% {
            transform:
              translate(12px,-22px)
              scale(1.6);
          }
        }

        /* HERO COPY */

        .hero-copy {
          width: min(900px, 100%);

          position: relative;
          z-index: 3;

          transition:
            opacity .25s ease,
            transform .25s ease;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;

          padding: 9px 14px;

          border-radius: 999px;

          background: rgba(255,255,255,.88);

          color: var(--accent);

          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;

          box-shadow:
            0 10px 30px rgba(30,40,80,.08);

          animation:
            rise .7s ease both;
        }

        .eyebrow::before {
          content: '';

          width: 8px;
          height: 8px;

          border-radius: 50%;

          background: var(--accent);

          box-shadow:
            0 0 0 6px
            color-mix(
              in srgb,
              var(--accent) 12%,
              transparent
            );
        }

        .hero-title {
          margin: 25px 0 15px;

          font-size:
            clamp(
              90px,
              16vw,
              190px
            );

          line-height: .74;

          letter-spacing: -9px;

          font-weight: 1000;

          color: var(--ink);

          animation:
            heroTitle .8s ease both;
        }

        .hero-title span {
          color: var(--accent);

          text-shadow:
            9px 9px 0
            color-mix(
              in srgb,
              var(--accent) 12%,
              transparent
            );

          transition:
            color .5s ease,
            text-shadow .5s ease;
        }

        @keyframes heroTitle {
          from {
            opacity: 0;
            transform:
              translateY(30px)
              scale(.95);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        .hero-name {
          margin: 0 0 15px;

          max-width: 800px;

          font-size:
            clamp(18px, 2.5vw, 28px);

          line-height: 1.3;

          font-weight: 900;

          animation:
            rise .8s .1s ease both;
        }

        .hero-tagline {
          display: inline-block;

          margin: 0 0 20px;

          color: var(--accent);

          font-size:
            clamp(18px, 2.5vw, 30px);

          font-weight: 1000;

          letter-spacing: 1px;

          animation:
            rise .8s .16s ease both;
        }

        .hero-desc {
          max-width: 720px;

          color: var(--muted);

          font-size: 16px;

          line-height: 1.85;

          animation:
            rise .8s .22s ease both;
        }

        /* ===============================
           SWITCHER
        =============================== */

        .switcher {
          display: flex;

          gap: 12px;

          flex-wrap: wrap;

          margin-top: 34px;

          animation:
            rise .8s .28s ease both;
        }

        .switch-btn {
          position: relative;

          border:
            1px solid
            rgba(16,23,43,.09);

          background:
            rgba(255,255,255,.9);

          color: var(--ink);

          padding: 15px 22px;

          border-radius: 16px;

          font-weight: 900;

          cursor: pointer;

          overflow: hidden;

          transition:
            transform .3s ease,
            border-color .3s ease,
            color .3s ease,
            background .3s ease,
            box-shadow .3s ease;
        }

        .switch-btn::before {
          content: '';

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              110deg,
              transparent 30%,
              rgba(255,255,255,.35),
              transparent 70%
            );

          transform:
            translateX(-120%);

          transition:
            transform .6s ease;
        }

        .switch-btn:hover {
          transform:
            translateY(-5px)
            scale(1.02);

          border-color: var(--accent);

          box-shadow:
            0 15px 30px
            color-mix(
              in srgb,
              var(--accent) 15%,
              transparent
            );
        }

        .switch-btn:hover::before {
          transform:
            translateX(120%);
        }

        .switch-btn.active {
          color: white;

          background: var(--accent);

          border-color: var(--accent);

          box-shadow:
            0 15px 35px
            color-mix(
              in srgb,
              var(--accent) 30%,
              transparent
            );
        }

        /* ===============================
           CONTENT
        =============================== */

        .major-content {
          width:
            min(
              1140px,
              calc(100% - 48px)
            );

          margin:
            -45px auto
            110px;

          position: relative;

          z-index: 5;
        }

        .info-card {
          background:
            rgba(255,255,255,.94);

          border:
            1px solid
            rgba(16,23,43,.07);

          border-radius: 34px;

          padding:
            clamp(28px, 5vw, 55px);

          box-shadow:
            0 30px 90px
            rgba(30,40,80,.11);

          backdrop-filter:
            blur(18px);

          transition:
            opacity .25s ease,
            transform .25s ease;
        }

        .section-head {
          display: flex;

          justify-content:
            space-between;

          gap: 30px;

          align-items: end;

          margin-bottom: 32px;
        }

        .section-kicker {
          color: var(--accent);

          font-size: 12px;

          font-weight: 900;

          letter-spacing: 2px;

          text-transform:
            uppercase;
        }

        .section-title {
          margin:
            8px 0 0;

          font-size:
            clamp(32px, 5vw, 56px);

          letter-spacing: -2.5px;
        }

        .section-icon {
          flex: 0 0 78px;

          width: 78px;
          height: 78px;

          display: grid;
          place-items: center;

          border-radius: 24px;

          color: var(--accent);

          background:
            color-mix(
              in srgb,
              var(--accent) 10%,
              white
            );

          font-size: 34px;

          font-weight: 1000;

          animation:
            iconFloat 3s ease-in-out infinite;

          transition:
            color .4s ease,
            background .4s ease;
        }

        @keyframes iconFloat {
          0%,100% {
            transform:
              translateY(0)
              rotate(0);
          }

          50% {
            transform:
              translateY(-7px)
              rotate(5deg);
          }
        }

        /* ===============================
           SKILL CARDS
        =============================== */

        .cards {
          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 15px;
        }

        .interactive-card {
          --rx: 0deg;
          --ry: 0deg;

          transform:
            perspective(800px)
            rotateX(var(--rx))
            rotateY(var(--ry));

          transition:
            transform .18s ease,
            box-shadow .3s ease,
            border-color .3s ease,
            background .3s ease;
        }

        .skill-card {
          min-height: 260px;

          padding: 25px;

          border-radius: 24px;

          background:
            linear-gradient(
              145deg,
              #f7f8ff,
              #f1f4ff
            );

          border:
            1px solid
            rgba(16,23,43,.06);

          position: relative;

          overflow: hidden;

          cursor: default;
        }

        .skill-card::before {
          content: '';

          position: absolute;

          width: 130px;
          height: 130px;

          right: -60px;
          bottom: -60px;

          border-radius: 50%;

          background:
            color-mix(
              in srgb,
              var(--accent) 15%,
              transparent
            );

          transition:
            transform .5s ease;
        }

        .skill-card::after {
          content: '';

          position: absolute;

          width: 70px;
          height: 70px;

          left: -35px;
          top: -35px;

          border:
            1px solid
            color-mix(
              in srgb,
              var(--accent) 22%,
              transparent
            );

          border-radius: 50%;
        }

        .skill-card:hover {
          box-shadow:
            0 22px 45px
            rgba(30,40,80,.12);

          border-color:
            color-mix(
              in srgb,
              var(--accent) 30%,
              transparent
            );
        }

        .skill-card:hover::before {
          transform:
            scale(2.2);
        }

        .skill-number {
          position: relative;
          z-index: 2;

          color: var(--accent);

          font-size: 11px;

          font-weight: 900;

          letter-spacing: 2px;
        }

        .skill-icon {
          position: relative;
          z-index: 2;

          margin-top: 22px;

          color: var(--accent);

          font-size: 32px;

          font-weight: 1000;
        }

        .skill-card h3 {
          position: relative;
          z-index: 2;

          margin:
            18px 0 9px;

          font-size: 20px;
        }

        .skill-card p {
          position: relative;
          z-index: 2;

          margin: 0;

          color: var(--muted);

          font-size: 13px;

          line-height: 1.65;
        }

        /* ===============================
           PROJECT
        =============================== */

        .project-row {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 15px;

          margin-top: 38px;
        }

        .project {
          position: relative;

          min-height: 190px;

          padding: 27px;

          border-radius: 25px;

          color: white;

          background:
            linear-gradient(
              135deg,
              var(--accent),
              color-mix(
                in srgb,
                var(--accent) 55%,
                #10172b
              )
            );

          overflow: hidden;

          transition:
            transform .35s ease,
            box-shadow .35s ease;
        }

        .project::before {
          content: '';

          position: absolute;

          width: 180px;
          height: 180px;

          right: -80px;
          top: -80px;

          border:
            1px solid
            rgba(255,255,255,.3);

          border-radius: 50%;

          transition:
            transform .5s ease;
        }

        .project::after {
          content: '';

          position: absolute;

          inset: 10px;

          border:
            1px solid
            rgba(255,255,255,.12);

          border-radius: 18px;

          pointer-events: none;
        }

        .project:hover {
          transform:
            translateY(-10px)
            rotate(-1deg);

          box-shadow:
            0 25px 50px
            color-mix(
              in srgb,
              var(--accent) 30%,
              transparent
            );
        }

        .project:hover::before {
          transform:
            scale(1.4)
            rotate(30deg);
        }

        .project small {
          position: relative;
          z-index: 2;

          opacity: .7;

          font-size: 10px;

          font-weight: 900;

          letter-spacing: 2px;
        }

        .project strong {
          position: relative;
          z-index: 2;

          display: block;

          margin-top: 38px;

          font-size: 21px;
        }

        .project p {
          position: relative;
          z-index: 2;

          margin:
            8px 0 0;

          color:
            rgba(255,255,255,.75);

          font-size: 13px;

          line-height: 1.55;
        }

        /* ===============================
           BOTTOM LABEL
        =============================== */

        .major-bottom {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 12px;

          margin-top: 45px;

          padding-top: 30px;

          border-top:
            1px solid
            rgba(16,23,43,.08);
        }

        .bottom-item {
          padding: 18px;

          border-radius: 18px;

          background: #f8f9fd;
        }

        .bottom-item span {
          display: block;

          margin-bottom: 6px;

          color: var(--accent);

          font-size: 10px;

          font-weight: 900;

          letter-spacing: 1.5px;

          text-transform: uppercase;
        }

        .bottom-item strong {
          font-size: 14px;
        }

        /* ===============================
           RESPONSIVE
        =============================== */

        @media (max-width: 900px) {
          .major-hero {
            min-height: 650px;
          }

          .major-orbit {
            right: -130px;
            opacity: .5;
          }

          .cards {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .project-row {
            grid-template-columns:
              1fr;
          }
        }

        @media (max-width: 600px) {
          .major-hero {
            min-height: 680px;

            padding:
              70px 24px;
          }

          .hero-title {
            font-size: 90px;
            letter-spacing: -5px;
          }

          .major-content {
            width:
              calc(100% - 28px);
          }

          .info-card {
            border-radius: 25px;
          }

          .cards {
            grid-template-columns:
              1fr;
          }

          .major-bottom {
            grid-template-columns:
              1fr;
          }

          .section-icon {
            display: none;
          }

          .hero-name {
            font-size: 17px;
          }

          .hero-desc {
            font-size: 14px;
          }

          .switch-btn {
            flex: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <Navbar />

      <main>
        <section className="major-hero">
          <div className="major-grid" />

          <div className="major-blob" />

          <div className="major-orbit" />

          <span className="particle" />
          <span className="particle" />
          <span className="particle" />
          <span className="particle" />

          <div className="hero-copy">
            <div className="eyebrow">
              PROGRAM KEAHLIAN · SMK CITRA NEGARA
            </div>

            <h1 className="hero-title">
              <span>{current.singkatan}</span>
            </h1>

            <div className="hero-name">
              {current.nama}
            </div>

            <div className="hero-tagline">
              {current.tagline}
            </div>

            <p className="hero-desc">
              {current.deskripsi}
            </p>

            <div
              className="switcher"
              role="tablist"
              aria-label="Pilih program keahlian"
            >
              {JURUSAN.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`switch-btn ${
                    active === item.id
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    changeMajor(item.id)
                  }
                  role="tab"
                  aria-selected={
                    active === item.id
                  }
                >
                  {item.singkatan}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="major-content">
          <div className="info-card">
            <div className="section-head">
              <div>
                <div className="section-kicker">
                  Yang Dipelajari
                </div>

                <h2 className="section-title">
                  Dunia {current.singkatan}
                </h2>
              </div>

              <div className="section-icon">
                {current.icon}
              </div>
            </div>

            <div className="cards">
              {current.skills.map(
                (skill, index) => (
                  <article
                    key={skill.title}
                    className="skill-card interactive-card"
                  >
                    <div className="skill-number">
                      0{index + 1}
                    </div>

                    <div className="skill-icon">
                      {skill.icon}
                    </div>

                    <h3>
                      {skill.title}
                    </h3>

                    <p>
                      {skill.desc}
                    </p>
                  </article>
                )
              )}
            </div>

            <div
              className="section-head"
              style={{
                marginTop: 65,
                marginBottom: 0,
              }}
            >
              <div>
                <div className="section-kicker">
                  Contoh Penerapan
                </div>

                <h2 className="section-title">
                  MAKE IT REAL.
                </h2>
              </div>
            </div>

            <div className="project-row">
              {current.projects.map(
                (project, index) => (
                  <article
                    className="project interactive-card"
                    key={project.title}
                  >
                    <small>
                      PROJECT 0{index + 1}
                    </small>

                    <strong>
                      {project.title}
                    </strong>

                    <p>
                      {project.desc}
                    </p>
                  </article>
                )
              )}
            </div>

            <div className="major-bottom">
              <div className="bottom-item">
                <span>Program Keahlian</span>
                <strong>
                  {current.singkatan}
                </strong>
              </div>

              <div className="bottom-item">
                <span>Fokus Utama</span>
                <strong>
                  {current.bidang}
                </strong>
              </div>

              <div className="bottom-item">
                <span>Gaya Belajar</span>
                <strong>
                  Teori + Praktik + Proyek
                </strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      <EskulMusic src="/audio/itclub.mp3" />
      <EskulFX />
      <Footer />
    </div>
  );
}