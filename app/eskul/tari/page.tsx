'use client';

import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import EskulMusic from '@/components/EskulMusic';
import Image from 'next/image';
import { useState } from 'react';

type Mode = 'tradisional' | 'modern';

interface TariContent {
  heroImg: string;
  musicSrc: string;
  eyebrow: string;
  titleMain: string;
  titleAccent: string;
  subtitle: string;
  stats: { angka: string; label: string }[];
  tujuanLabel: string;
  tujuanHeading: string;
  tujuan: { icon: string; judul: string; deskripsi: string }[];
  ragamLabel: string;
  ragamHeading: string;
  ragamTag: string;
  ragam: { nama: string; daerah: string; deskripsi: string }[];
  kegiatan: { no: string; nama: string; detail: string }[];
  quoteText: string;
  quoteSmall: string;
}

const CONTENT: Record<Mode, TariContent> = {
  tradisional: {
    heroImg: '/images/eskul/eskultari.jpg',
    musicSrc: '/audio/taritradisional.mp3',
    eyebrow: 'Ekstrakurikuler SMK Citra Negara',
    titleMain: 'TARI',
    titleAccent: 'TRADISIONAL',
    subtitle:
      'Menghidupkan gerak, menjaga tradisi, dan merayakan kekayaan budaya Nusantara melalui seni tari.',
    stats: [
      { angka: '2013', label: 'Tahun Berdiri' },
      { angka: '28+', label: 'Anggota Aktif' },
      { angka: '16', label: 'Prestasi Diraih' },
      { angka: '100%', label: 'Dedikasi' },
    ],
    tujuanLabel: 'Mengapa Tari Tradisional?',
    tujuanHeading: 'GERAK YANG BERMAKNA',
    tujuan: [
      {
        icon: '✿',
        judul: 'Kreativitas & Ekspresi',
        deskripsi:
          'Mengembangkan kreativitas siswa melalui gerakan, ekspresi, irama, dan koreografi yang penuh makna.',
      },
      {
        icon: '❋',
        judul: 'Melestarikan Budaya',
        deskripsi:
          'Mengenalkan berbagai tari tradisional Nusantara sekaligus menumbuhkan rasa bangga terhadap budaya Indonesia.',
      },
      {
        icon: '✦',
        judul: 'Karakter & Kekompakan',
        deskripsi:
          'Melatih kedisiplinan, kepercayaan diri, tanggung jawab, dan kekompakan melalui latihan bersama.',
      },
    ],
    ragamLabel: 'Kekayaan Budaya Indonesia',
    ragamHeading: 'TARI NUSANTARA',
    ragamTag: 'Warisan Budaya Nusantara',
    ragam: [
      { nama: 'Jaipong', daerah: 'Jawa Barat', deskripsi: 'Tari khas Jawa Barat dengan karakter gerakan yang dinamis, enerjik, dan ekspresif.' },
      { nama: 'Saman', daerah: 'Aceh', deskripsi: 'Tarian yang mengutamakan kekompakan, ketepatan ritme, dan koordinasi gerakan para penarinya.' },
      { nama: 'Piring', daerah: 'Sumatera Barat', deskripsi: 'Tarian Minangkabau yang menggunakan piring sebagai properti dan ditampilkan dengan gerakan yang atraktif.' },
      { nama: 'Gambyong', daerah: 'Jawa Tengah', deskripsi: 'Tari Jawa yang dikenal dengan gerakan lembut, anggun, dan penuh keindahan ekspresi.' },
    ],
    kegiatan: [
      { no: '01', nama: 'Latihan Teknik Dasar', detail: 'Mempelajari gerakan dasar, posisi tubuh, ritme, dan ekspresi.' },
      { no: '02', nama: 'Latihan Koreografi', detail: 'Menyusun gerakan, pola lantai, dan kekompakan kelompok.' },
      { no: '03', nama: 'Pertunjukan & Penampilan', detail: 'Menampilkan karya tari dalam berbagai acara sekolah.' },
      { no: '04', nama: 'Eksplorasi Budaya', detail: 'Mengenal sejarah, makna, busana, musik, dan properti tari.' },
      { no: '05', nama: 'Workshop Seni', detail: 'Mendapatkan pengalaman dan wawasan dari pembina maupun praktisi.' },
      { no: '06', nama: 'Festival & Kompetisi', detail: 'Mengembangkan pengalaman dan prestasi melalui kompetisi seni.' },
    ],
    quoteText: '“Setiap gerakan memiliki cerita, setiap tarian membawa warisan.”',
    quoteSmall: 'Tari Tradisional · SMK Citra Negara',
  },
  modern: {
    heroImg: '/images/eskul/eskultarimodern.png',
    musicSrc: '/audio/tarimodern.mp3',
    eyebrow: 'Ekstrakurikuler SMK Citra Negara',
    titleMain: 'TARI',
    titleAccent: 'MODERN',
    subtitle:
      'Mengeksplorasi gerak masa kini — hip-hop, K-pop, kontemporer, dan koreografi kreatif yang energik dan ekspresif.',
    stats: [
      { angka: '2018', label: 'Tahun Berdiri' },
      { angka: '30+', label: 'Anggota Aktif' },
      { angka: '12', label: 'Prestasi Diraih' },
      { angka: '100%', label: 'Energi' },
    ],
    tujuanLabel: 'Mengapa Tari Modern?',
    tujuanHeading: 'GERAK MASA KINI',
    tujuan: [
      {
        icon: '⚡',
        judul: 'Kreativitas & Gaya Personal',
        deskripsi:
          'Mengembangkan gaya gerak personal melalui koreografi modern, musikalitas, dan eksplorasi tubuh.',
      },
      {
        icon: '🔥',
        judul: 'Kebugaran & Stamina',
        deskripsi:
          'Melatih kekuatan, kelenturan, dan daya tahan lewat rutinitas latihan yang dinamis dan intens.',
      },
      {
        icon: '✦',
        judul: 'Karakter & Kekompakan',
        deskripsi:
          'Membangun kedisiplinan, kepercayaan diri, dan kekompakan tim dalam setiap penampilan panggung.',
      },
    ],
    ragamLabel: 'Ragam Gaya Tari Modern',
    ragamHeading: 'GENRE & GAYA',
    ragamTag: 'Gerak & Ekspresi Masa Kini',
    ragam: [
      { nama: 'Hip-Hop', daerah: 'Street Dance', deskripsi: 'Gaya bebas berbasis groove, isolation, dan footwork yang enerjik serta penuh karakter.' },
      { nama: 'K-Pop Dance', daerah: 'Korea', deskripsi: 'Koreografi rapi mengikuti idol group, menuntut kekompakan, presisi, dan ekspresi.' },
      { nama: 'Kontemporer', daerah: 'Modern', deskripsi: 'Eksplorasi gerak ekspresif yang memadukan balet, modern, dan improvisasi.' },
      { nama: 'Dance Cover', daerah: 'Panggung', deskripsi: 'Menampilkan ulang koreografi populer dengan interpretasi, formasi, dan gaya sendiri.' },
    ],
    kegiatan: [
      { no: '01', nama: 'Latihan Basic Movement', detail: 'Groove, isolation, footwork, dan kontrol tubuh.' },
      { no: '02', nama: 'Latihan Koreografi', detail: 'Menyusun formasi, transisi, dan sinkronisasi kelompok.' },
      { no: '03', nama: 'Dance Cover & Challenge', detail: 'Membawakan ulang koreografi populer dengan gaya sendiri.' },
      { no: '04', nama: 'Produksi Konten', detail: 'Merekam dan mengedit video tari untuk media sosial sekolah.' },
      { no: '05', nama: 'Workshop Koreografer', detail: 'Belajar teknik dan tren terbaru dari praktisi tari modern.' },
      { no: '06', nama: 'Festival & Kompetisi', detail: 'Mengasah mental panggung lewat lomba dance antar sekolah.' },
    ],
    quoteText: '“Setiap beat adalah bahasa, setiap gerak adalah ekspresi.”',
    quoteSmall: 'Tari Modern · SMK Citra Negara',
  },
};

export default function TariPage() {
  const [mode, setMode] = useState<Mode>('tradisional');
  const [activeTari, setActiveTari] = useState(0);
  const c = CONTENT[mode];

  const switchMode = (next: Mode) => {
    setMode(next);
    setActiveTari(0);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&family=Playfair+Display:wght@600;700;800&display=swap');

        * {
          box-sizing: border-box;
        }

        .tari-root {
          /* ── palet TRADISIONAL (default) ── */
          --cream: #fff9eb;
          --cream-dark: #f3e5c9;
          --paper: #fffdf7;
          --brown: #633a27;
          --brown-dark: #432519;
          --terracotta: #ae5534;
          --gold: #c99a3c;
          --gold-light: #e6ca8a;
          --green: #66754b;
          --text: #4a382e;
          --muted: #806e61;

          --card-radius: 0px;

          min-height: 100vh;
          overflow-x: clip;
          background: var(--cream);
          color: var(--text);
          font-family: 'Barlow', sans-serif;
          transition: background .5s ease, color .5s ease;
        }

        /* =========================================
           PALET MODERN — terang, bersih, neon-pop (bukan hitam)
        ========================================= */
        .tari-modern {
          --cream: #f6f6fc;        /* off-white sejuk (tradisional: cream hangat) */
          --cream-dark: #eceaf6;   /* lavender muda utk chip/ikon */
          --paper: #ffffff;
          --brown: #241f38;        /* ink sejuk utk teks sekunder */
          --brown-dark: #120e22;   /* judul */
          --terracotta: #ff2e88;   /* magenta */
          --gold: #7c3aed;         /* ungu (ganti emas hangat) */
          --gold-light: #22d3ee;   /* cyan */
          --green: #10b981;
          --text: #4b4660;
          --muted: #857f9e;

          --card-radius: 16px;
        }

        /* MODERN: font judul tegas/kondensasi + glow, beda jauh dari serif tradisional */
        .tari-modern .tri-section-heading,
        .tari-modern .tari-info h3,
        .tari-modern .tari-quote-text { font-family: 'Bebas Neue', sans-serif; }
        .tari-modern .tri-section-heading,
        .tari-modern .tari-info h3 { letter-spacing: 2px; text-transform: uppercase; }
        .tari-modern .tri-section-heading {
          text-shadow: 0 0 30px rgba(124,58,237,.18);
          background: linear-gradient(100deg, var(--brown-dark) 0%, #7c3aed 55%, #ff2e88 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .tari-modern .tri-tujuan-title,
        .tari-modern .tari-menu-btn { font-family: 'Barlow Condensed', sans-serif; letter-spacing: 1.5px; text-transform: uppercase; }

        .tari-modern .tri-hero-img img { filter: brightness(.6) contrast(1.14) saturate(1.22); }
        .tari-modern .tri-title span { color: #22d3ee; text-shadow: 0 0 22px rgba(34,211,238,.6); }
        .tari-modern .tri-section-heading::after { content: '◆'; color: rgba(124,58,237,.4); }

        .tari-modern .tri-stats { background: #fff; border-color: rgba(124,58,237,.16); }
        .tari-modern .tri-stat { border-right-color: rgba(124,58,237,.12); }
        .tari-modern .tri-stat:hover { background: rgba(255,46,136,.06); }
        .tari-modern .tri-stat::before { content: '◆'; }

        .tari-modern .tri-tujuan-card {
          background: #fff;
          border-color: rgba(18,14,34,.08);
          border-radius: var(--card-radius);
          box-shadow: 0 10px 30px rgba(124,58,237,.08);
        }
        .tari-modern .tri-tujuan-card:hover {
          border-color: var(--terracotta);
          box-shadow: 0 24px 50px rgba(255,46,136,.16);
        }
        .tari-modern .tri-tujuan-card:hover .tri-tujuan-icon { background: rgba(255,46,136,.14); }
        .tari-modern .tri-tujuan-card::before { border-color: rgba(124,58,237,.22); }
        .tari-modern .tri-tujuan-card::after { content: '◆'; color: rgba(124,58,237,.07); }

        .tari-modern .tari-budaya {
          background:
            radial-gradient(circle at 88% 6%, rgba(124,58,237,.1), transparent 34%),
            radial-gradient(circle at 6% 100%, rgba(255,46,136,.09), transparent 36%),
            #f1effb;
          border-color: rgba(18,14,34,.06);
        }
        .tari-modern .tari-menu-btn:hover { background: rgba(124,58,237,.06); color: var(--brown-dark); }
        .tari-modern .tari-menu-btn.active {
          background: #fff;
          border-color: rgba(255,46,136,.4);
          box-shadow: 0 10px 26px rgba(255,46,136,.14);
        }
        .tari-modern .tari-info {
          background: #fff;
          border-color: rgba(18,14,34,.08);
          border-radius: var(--card-radius);
          box-shadow: 0 20px 46px rgba(124,58,237,.1);
        }
        .tari-modern .tari-info::before { content: '◆'; color: rgba(124,58,237,.07); }
        .tari-modern .tari-info-tag {
          background: linear-gradient(135deg, rgba(255,46,136,.14), rgba(124,58,237,.14));
          color: #7c3aed;
        }

        .tari-modern .tri-kegiatan-item {
          background: #fff;
          border-color: rgba(18,14,34,.07);
          border-radius: var(--card-radius);
        }
        .tari-modern .tri-kegiatan-item:hover { background: #faf9ff; box-shadow: 0 12px 28px rgba(124,58,237,.1); }
        .tari-modern .tri-kegiatan-no { color: rgba(255,46,136,.4); }

        /* quote = blok gradien vivid (bukan hitam) */
        .tari-modern .tari-quote { background: linear-gradient(135deg, #ff2e88, #7c3aed 55%, #22d3ee); color: #fff; }
        .tari-modern .tari-quote::before,
        .tari-modern .tari-quote::after { color: rgba(255,255,255,.16); }
        .tari-modern .tari-quote-symbol { color: #fff; }
        .tari-modern .tari-quote-small { color: rgba(255,255,255,.6); }

        .tari-modern .tari-mode { background: rgba(246,246,252,.85); border-bottom-color: rgba(18,14,34,.08); }
        .tari-modern .tari-mode-inner { background: #fff; border-color: rgba(124,58,237,.2); }
        .tari-modern .tari-mode-btn.active { color: #fff; }

        /* kelopak: bunga (tradisional) → bentuk geometris neon (modern) */
        .tari-modern .tari-petal { filter: drop-shadow(0 0 7px currentColor); opacity: .7; }
        .tari-modern .petal-1 { color: var(--terracotta); }
        .tari-modern .petal-2 { color: #7c3aed; }
        .tari-modern .petal-3 { color: #22d3ee; }
        .tari-modern .petal-4 { color: #7c3aed; }
        .tari-modern .petal-5 { color: var(--terracotta); }

        /* ornamen hero disesuaikan ke nuansa modern (bukan cokelat/emas hangat) */
        .tari-modern .tri-hero-overlay {
          background: linear-gradient(
            to bottom,
            rgba(18,14,34,.05) 10%,
            rgba(124,58,237,.14) 44%,
            rgba(18,14,34,.5) 72%,
            var(--cream) 100%
          );
        }
        .tari-modern .hero-motif-left,
        .tari-modern .hero-motif-right { border-color: rgba(34,211,238,.5); }
        .tari-modern .hero-motif-left::before,
        .tari-modern .hero-motif-left::after { border-color: rgba(255,46,136,.4); }
        .tari-modern .selendang {
          background: linear-gradient(90deg, transparent, rgba(124,58,237,.85), rgba(34,211,238,.7), transparent);
        }
        .tari-modern .selendang::after { background: rgba(255,46,136,.5); }

        /* =========================================
           FLOATING TARI ELEMENTS
        ========================================= */

        .tari-floating {
          position: fixed;
          z-index: 20;
          pointer-events: none;
          user-select: none;
        }

        .tari-petal {
          position: fixed;
          top: -30px;
          z-index: 50;
          pointer-events: none;
          color: var(--terracotta);
          font-size: 14px;
          opacity: .65;
          animation: petalFall linear infinite;
        }

        .petal-1 {
          left: 8%;
          animation-duration: 9s;
          animation-delay: -2s;
        }

        .petal-2 {
          left: 24%;
          animation-duration: 12s;
          animation-delay: -7s;
          font-size: 10px;
        }

        .petal-3 {
          left: 47%;
          animation-duration: 10s;
          animation-delay: -4s;
          font-size: 17px;
        }

        .petal-4 {
          left: 72%;
          animation-duration: 13s;
          animation-delay: -9s;
          font-size: 11px;
        }

        .petal-5 {
          left: 91%;
          animation-duration: 11s;
          animation-delay: -5s;
          font-size: 15px;
        }

        @keyframes petalFall {
          0% {
            transform:
              translate3d(0, -20px, 0)
              rotate(0deg);
            opacity: 0;
          }

          10% {
            opacity: .65;
          }

          25% {
            transform:
              translate3d(35px, 25vh, 0)
              rotate(90deg);
          }

          50% {
            transform:
              translate3d(-30px, 50vh, 0)
              rotate(180deg);
          }

          75% {
            transform:
              translate3d(40px, 75vh, 0)
              rotate(270deg);
          }

          100% {
            transform:
              translate3d(-20px, 110vh, 0)
              rotate(360deg);
            opacity: 0;
          }
        }

        /* =========================================
           HERO — LAYOUT TETAP SEPERTI AWAL
        ========================================= */

        .tri-hero {
          position: relative;
          overflow: hidden;
          background: var(--cream);
        }

        .tri-hero-img {
          position: relative;
          width: 100%;
          height: min(70vh, 600px);
        }

        .tri-hero-img img {
          object-fit: cover;
          object-position: center top;
          filter:
            brightness(.72)
            contrast(1.04)
            saturate(.92);
          transition:
            transform 1.2s cubic-bezier(.2,.8,.2,1),
            filter .8s ease;
        }

        .tri-hero:hover .tri-hero-img img {
          transform: scale(1.035);
          filter:
            brightness(.78)
            contrast(1.04)
            saturate(1);
        }

        .tri-hero-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              to bottom,
              rgba(255,249,235,.02) 10%,
              rgba(75,40,25,.08) 38%,
              rgba(63,31,21,.35) 68%,
              rgba(67,37,25,.82) 100%
            );
        }

        /* Ornamen pada hero */

        .hero-motif {
          position: absolute;
          z-index: 3;
          pointer-events: none;
          opacity: .72;
        }

        .hero-motif-left {
          width: 120px;
          height: 120px;
          left: 25px;
          top: 30px;
          border: 1px solid rgba(255,232,177,.55);
          border-radius: 50%;
          animation: motifSpin 18s linear infinite;
        }

        .hero-motif-left::before,
        .hero-motif-left::after {
          content: '';
          position: absolute;
          inset: 17px;
          border: 1px solid rgba(255,232,177,.4);
          border-radius: 45% 55%;
        }

        .hero-motif-right {
          width: 150px;
          height: 150px;
          right: 35px;
          top: 40px;
          border: 1px solid rgba(255,232,177,.4);
          transform: rotate(45deg);
          animation: motifFloat 5s ease-in-out infinite;
        }

        @keyframes motifSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes motifFloat {
          0%, 100% {
            transform:
              rotate(45deg)
              translateY(0);
          }

          50% {
            transform:
              rotate(52deg)
              translateY(-12px);
          }
        }

        /* =========================================
           SELENDANG / KAIN
        ========================================= */

        .selendang {
          position: absolute;
          z-index: 4;
          pointer-events: none;
          width: 180px;
          height: 25px;
          right: -30px;
          bottom: 145px;
          border-radius: 50%;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(230,202,138,.8),
              rgba(174,85,52,.7),
              transparent
            );
          filter: blur(.2px);
          opacity: .65;
          transform: rotate(-15deg);
          animation: selendangDance 4s ease-in-out infinite;
        }

        .selendang::after {
          content: '';
          position: absolute;
          width: 130px;
          height: 12px;
          left: 10px;
          top: 16px;
          border-radius: 50%;
          background: rgba(255,235,186,.55);
          transform: rotate(12deg);
        }

        @keyframes selendangDance {
          0%, 100% {
            transform:
              translate3d(0,0,0)
              rotate(-15deg)
              scaleX(1);
          }

          25% {
            transform:
              translate3d(-30px,-10px,0)
              rotate(-7deg)
              scaleX(1.1);
          }

          50% {
            transform:
              translate3d(-65px,4px,0)
              rotate(-20deg)
              scaleX(.9);
          }

          75% {
            transform:
              translate3d(-30px,12px,0)
              rotate(-10deg)
              scaleX(1.08);
          }
        }

        .tri-hero-content {
          position: absolute;
          z-index: 5;
          bottom: 0;
          left: 0;
          right: 0;
          padding:
            0
            clamp(24px, 6vw, 80px)
            clamp(40px, 6vw, 72px);
        }

        .tri-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;

          margin-bottom: 16px;

          color: #f3cf83;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;

          animation: heroText .8s ease both;
        }

        .tri-eyebrow::before {
          content: '';
          width: 35px;
          height: 2px;
          background: #e4bc69;
        }

        .tri-title {
          margin: 0 0 20px;

          color: #fffdf5;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 12vw, 160px);
          line-height: .82;
          letter-spacing: 2px;

          animation: heroTitle 1s cubic-bezier(.2,.8,.2,1) both;
        }

        .tri-title span {
          color: #efbd67;
          text-shadow:
            0 4px 20px rgba(0,0,0,.18);
        }

        .tri-subtitle {
          max-width: 620px;
          margin: 0;

          color: rgba(255,250,238,.86);
          font-size: clamp(15px, 1.8vw, 18px);
          line-height: 1.7;

          animation: heroText 1s .2s ease both;
        }

        @keyframes heroTitle {
          from {
            opacity: 0;
            transform:
              translateY(35px)
              scale(.97);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes heroText {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =========================================
           STATS
        ========================================= */

        .tri-stats {
          position: relative;
          z-index: 8;

          display: grid;
          grid-template-columns: repeat(4, 1fr);

          background: #fffdf7;

          border-top: 1px solid rgba(174,85,52,.18);
          border-bottom: 1px solid rgba(174,85,52,.18);
        }

        .tri-stat {
          position: relative;
          padding: 30px 20px;
          text-align: center;

          border-right: 1px solid rgba(174,85,52,.12);

          transition:
            background .3s ease,
            transform .3s ease;
        }

        .tri-stat:last-child {
          border-right: none;
        }

        .tri-stat:hover {
          background: #fff6df;
          transform: translateY(-5px);
        }

        .tri-stat::before {
          content: '✦';

          position: absolute;
          top: 9px;
          left: 50%;

          color: var(--gold);
          font-size: 10px;

          transform: translateX(-50%);
          animation: starPulse 2s ease-in-out infinite;
        }

        .tri-stat-num {
          color: var(--terracotta);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 44px;
          line-height: 1;
        }

        .tri-stat-label {
          margin-top: 7px;

          color: var(--muted);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @keyframes starPulse {
          0%, 100% {
            opacity: .45;
            transform:
              translateX(-50%)
              scale(1);
          }

          50% {
            opacity: 1;
            transform:
              translateX(-50%)
              scale(1.35)
              rotate(20deg);
          }
        }

        /* =========================================
           GENERAL SECTION
        ========================================= */

        .tri-section {
          position: relative;

          max-width: 1150px;
          margin: 0 auto;

          padding:
            clamp(65px, 8vw, 100px)
            clamp(24px, 6vw, 80px);
        }

        .tri-section-label {
          color: var(--terracotta);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .tri-section-heading {
          position: relative;

          margin: 8px 0 45px;

          color: var(--brown-dark);
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 6vw, 72px);
          line-height: .95;
        }

        .tri-section-heading::after {
          content: '✿';

          position: absolute;
          margin-left: 15px;

          color: rgba(174,85,52,.3);
          font-size: 25px;

          animation: flowerFloat 3s ease-in-out infinite;
        }

        @keyframes flowerFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-7px) rotate(12deg);
          }
        }

        /* =========================================
           TUJUAN CARDS
        ========================================= */

        .tri-tujuan-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .tri-tujuan-card {
          position: relative;
          overflow: hidden;

          min-height: 300px;
          padding: 34px 28px;

          background:
            linear-gradient(
              145deg,
              #fffdf7,
              #fff8e9
            );

          border: 1px solid rgba(91,48,34,.1);

          box-shadow:
            0 8px 25px rgba(91,48,34,.045);

          transition:
            transform .45s cubic-bezier(.2,.8,.2,1),
            box-shadow .45s ease,
            border-color .3s ease;
        }

        .tri-tujuan-card::before {
          content: '';

          position: absolute;
          left: -70px;
          top: -70px;

          width: 140px;
          height: 140px;

          border: 1px solid rgba(201,154,60,.3);
          border-radius: 50%;

          transition: transform .7s ease;
        }

        .tri-tujuan-card::after {
          content: '❋';

          position: absolute;
          right: 18px;
          bottom: 8px;

          color: rgba(174,85,52,.08);
          font-size: 90px;

          transition:
            transform .7s ease,
            color .4s ease;
        }

        .tri-tujuan-card:hover {
          transform:
            translateY(-12px)
            rotate(-.5deg);

          border-color: rgba(174,85,52,.3);

          box-shadow:
            0 22px 45px rgba(91,48,34,.12);
        }

        .tri-tujuan-card:hover::before {
          transform: scale(1.6);
        }

        .tri-tujuan-card:hover::after {
          color: rgba(174,85,52,.16);
          transform:
            rotate(25deg)
            scale(1.08);
        }

        .tri-tujuan-icon {
          display: grid;
          place-items: center;

          width: 54px;
          height: 54px;

          background: var(--cream-dark);
          border-radius: 50%;

          color: var(--terracotta);
          font-size: 24px;

          transition:
            transform .5s ease,
            background .3s ease;
        }

        .tri-tujuan-card:hover .tri-tujuan-icon {
          background: #f0d89d;
          transform:
            rotate(12deg)
            scale(1.12);
        }

        .tri-tujuan-title {
          position: relative;
          z-index: 2;

          margin-top: 40px;

          color: var(--brown-dark);
          font-family: 'Cinzel', serif;
          font-size: 18px;
          font-weight: 700;
        }

        .tri-tujuan-desc {
          position: relative;
          z-index: 2;

          margin-top: 12px;

          color: var(--muted);
          font-size: 14px;
          line-height: 1.75;
        }

        /* =========================================
           BATIK DIVIDER
        ========================================= */

        .tri-divider {
          display: flex;
          align-items: center;
          gap: 18px;

          max-width: 1100px;
          margin: 0 auto;
          padding: 0 25px;

          opacity: .75;
        }

        .tri-divider::before,
        .tri-divider::after {
          content: '';
          flex: 1;
          height: 1px;

          background:
            repeating-linear-gradient(
              90deg,
              var(--gold) 0 7px,
              transparent 7px 14px
            );
        }

        .tri-divider-icon {
          color: var(--terracotta);
          font-size: 18px;

          animation: dividerDance 2s ease-in-out infinite;
        }

        @keyframes dividerDance {
          0%, 100% {
            transform: rotate(0);
          }

          50% {
            transform: rotate(180deg);
          }
        }

        /* =========================================
           TARI NUSANTARA
        ========================================= */

        .tari-budaya {
          position: relative;

          background:
            radial-gradient(
              circle at 90% 15%,
              rgba(201,154,60,.14),
              transparent 22%
            ),
            #f5e8cf;

          border-top: 1px solid rgba(91,48,34,.08);
          border-bottom: 1px solid rgba(91,48,34,.08);
        }

        .tari-budaya-inner {
          max-width: 1150px;
          margin: auto;

          padding:
            clamp(65px, 8vw, 100px)
            clamp(24px, 6vw, 80px);
        }

        .tari-budaya-grid {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 35px;
        }

        .tari-menu {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .tari-menu-btn {
          position: relative;

          padding: 18px 20px;

          border: 1px solid transparent;
          background: transparent;

          color: var(--muted);

          font-family: 'Cinzel', serif;
          font-size: 13px;
          font-weight: 700;

          text-align: left;

          cursor: pointer;

          transition: all .3s ease;
        }

        .tari-menu-btn::before {
          content: '';

          position: absolute;
          left: 0;
          top: 50%;

          width: 0;
          height: 2px;

          background: var(--terracotta);

          transform: translateY(-50%);

          transition: width .3s ease;
        }

        .tari-menu-btn:hover {
          padding-left: 27px;
          color: var(--brown);
          background: rgba(255,253,247,.45);
        }

        .tari-menu-btn.active {
          padding-left: 32px;

          color: var(--terracotta);
          background: var(--paper);

          border-color: rgba(174,85,52,.18);

          box-shadow:
            0 10px 25px rgba(91,48,34,.07);
        }

        .tari-menu-btn.active::before {
          width: 18px;
        }

        .tari-info {
          position: relative;
          overflow: hidden;

          min-height: 340px;
          padding: 45px;

          background: var(--paper);

          border: 1px solid rgba(91,48,34,.1);

          box-shadow:
            0 20px 45px rgba(91,48,34,.08);

          animation: infoAppear .5s ease;
        }

        @keyframes infoAppear {
          from {
            opacity: .4;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tari-info::before {
          content: '✿';

          position: absolute;
          right: 30px;
          top: 10px;

          color: rgba(174,85,52,.09);
          font-size: 120px;

          animation: flowerFloat 4s ease-in-out infinite;
        }

        .tari-info-symbol {
          position: relative;
          z-index: 2;

          color: var(--gold);
          font-size: 30px;
        }

        .tari-info h3 {
          position: relative;
          z-index: 2;

          margin: 18px 0 4px;

          color: var(--brown-dark);
          font-family: 'Playfair Display', serif;
          font-size: clamp(35px, 4vw, 52px);
        }

        .tari-info-region {
          position: relative;
          z-index: 2;

          color: var(--terracotta);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .tari-info p {
          position: relative;
          z-index: 2;

          max-width: 650px;
          margin: 25px 0 0;

          color: var(--muted);
          line-height: 1.85;
        }

        .tari-info-tag {
          position: relative;
          z-index: 2;

          display: inline-block;

          margin-top: 25px;
          padding: 9px 14px;

          background: var(--cream-dark);

          color: var(--brown);

          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        /* =========================================
           KEGIATAN
        ========================================= */

        .tri-kegiatan-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .tri-kegiatan-item {
          position: relative;
          overflow: hidden;

          display: flex;
          gap: 20px;

          padding: 27px 30px;

          background: var(--paper);

          border: 1px solid rgba(91,48,34,.08);

          transition:
            transform .35s ease,
            box-shadow .35s ease,
            background .35s ease;
        }

        .tri-kegiatan-item::before {
          content: '';

          position: absolute;
          left: 0;
          bottom: 0;

          width: 0;
          height: 3px;

          background:
            linear-gradient(
              90deg,
              var(--terracotta),
              var(--gold)
            );

          transition: width .4s ease;
        }

        .tri-kegiatan-item:hover {
          transform: translateX(8px);
          background: #fffaf0;

          box-shadow:
            0 12px 30px rgba(91,48,34,.08);
        }

        .tri-kegiatan-item:hover::before {
          width: 100%;
        }

        .tri-kegiatan-no {
          flex-shrink: 0;

          color: rgba(174,85,52,.35);

          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          line-height: 1;
        }

        .tri-kegiatan-nama {
          color: var(--brown-dark);

          font-family: 'Barlow Condensed', sans-serif;
          font-size: 19px;
          font-weight: 800;
          letter-spacing: .5px;
          text-transform: uppercase;
        }

        .tri-kegiatan-detail {
          margin-top: 5px;

          color: var(--muted);

          font-size: 13px;
          line-height: 1.65;
        }

        /* =========================================
           QUOTE
        ========================================= */

        .tari-quote {
          position: relative;
          overflow: hidden;

          padding: 100px 25px;

          background: var(--brown-dark);

          color: var(--cream);

          text-align: center;
        }

        .tari-quote::before,
        .tari-quote::after {
          position: absolute;

          color: rgba(230,202,138,.12);

          font-size: 150px;
        }

        .tari-quote::before {
          content: '❋';
          left: 3%;
          top: 10%;

          animation: slowDance 8s linear infinite;
        }

        .tari-quote::after {
          content: '✿';
          right: 3%;
          bottom: 0;

          animation: slowDanceReverse 9s linear infinite;
        }

        @keyframes slowDance {
          from {
            transform: rotate(0);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slowDanceReverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0);
          }
        }

        .tari-quote-symbol {
          position: relative;

          color: var(--gold-light);
          font-size: 23px;

          animation: starPulse 2s ease-in-out infinite;
        }

        .tari-quote-text {
          position: relative;

          max-width: 800px;
          margin: 25px auto 0;

          font-family: 'Playfair Display', serif;
          font-size: clamp(27px, 4vw, 46px);
          line-height: 1.4;
        }

        .tari-quote-small {
          position: relative;

          margin-top: 22px;

          color: rgba(255,249,235,.55);

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        /* =========================================
           MODE TOGGLE (Tradisional / Modern)
        ========================================= */

        .tari-mode {
          position: sticky;
          top: 70px;
          z-index: 15;

          display: flex;
          justify-content: center;

          padding: 16px;

          background: rgba(255, 249, 235, 0.9);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(174, 85, 52, 0.16);
        }

        .tari-mode-inner {
          display: inline-flex;
          gap: 4px;
          padding: 5px;

          background: var(--paper);
          border: 1px solid rgba(174, 85, 52, 0.22);
          border-radius: 999px;
          box-shadow: 0 8px 22px rgba(91, 48, 34, 0.08);
        }

        .tari-mode-btn {
          padding: 10px 26px;

          border: none;
          border-radius: 999px;
          background: transparent;

          color: var(--muted);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;

          cursor: pointer;
          transition: color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }

        .tari-mode-btn:hover { color: var(--brown); }

        .tari-mode-btn.active {
          color: #fffdf5;
          background: linear-gradient(135deg, var(--terracotta), var(--gold));
          box-shadow: 0 6px 16px rgba(174, 85, 52, 0.32);
        }

        @media (max-width: 500px) {
          .tari-mode-btn { padding: 9px 16px; font-size: 12px; letter-spacing: 1px; }
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 768px) {
          .tri-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .tri-stat:nth-child(2) {
            border-right: none;
          }

          .tri-stat:nth-child(-n+2) {
            border-bottom: 1px solid rgba(174,85,52,.12);
          }

          .tri-tujuan-grid {
            grid-template-columns: 1fr;
          }

          .tari-budaya-grid {
            grid-template-columns: 1fr;
          }

          .tari-menu {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }

          .tri-kegiatan-grid {
            grid-template-columns: 1fr;
          }

          .selendang {
            display: none;
          }
        }

        @media (max-width: 500px) {
          .tri-title {
            font-size: 70px;
          }

          .tri-subtitle {
            font-size: 14px;
          }

          .tri-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .tri-stat {
            padding: 25px 10px;
          }

          .tri-stat-num {
            font-size: 36px;
          }

          .tri-section-heading {
            font-size: 42px;
          }

          .tari-menu {
            grid-template-columns: 1fr 1fr;
          }

          .tari-info {
            padding: 30px;
          }

          .tari-info h3 {
            font-size: 34px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* Kelopak jatuh — bentuknya beda antara tradisional & modern */}
      {(mode === 'modern'
        ? ['✦', '◆', '✧', '●', '▲']
        : ['✿', '❋', '✦', '✿', '❋']
      ).map((glyph, i) => (
        <div key={i} className={`tari-petal petal-${i + 1}`}>{glyph}</div>
      ))}

      <div className={`tari-root tari-${mode}`}>
        <Navbar />

        <main>
          {/* =====================================
              TOGGLE — Tradisional / Modern
          ====================================== */}

          <div className="tari-mode">
            <div className="tari-mode-inner" role="tablist" aria-label="Jenis tari">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'tradisional'}
                className={`tari-mode-btn ${mode === 'tradisional' ? 'active' : ''}`}
                onClick={() => switchMode('tradisional')}
              >
                Tradisional
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'modern'}
                className={`tari-mode-btn ${mode === 'modern' ? 'active' : ''}`}
                onClick={() => switchMode('modern')}
              >
                Modern
              </button>
            </div>
          </div>

          {/* =====================================
              HERO
          ====================================== */}

          <section className="tri-hero" key={`hero-${mode}`}>
            <div className="tri-hero-img">
              <Image
                src={c.heroImg}
                alt={`Tari ${c.titleAccent} SMK Citra Negara`}
                fill
                priority
              />

              <div className="tri-hero-overlay" />

              <div className="hero-motif hero-motif-left" />
              <div className="hero-motif hero-motif-right" />

              <div className="selendang" />
            </div>

            <div className="tri-hero-content">
              <div className="tri-eyebrow">{c.eyebrow}</div>

              <h1 className="tri-title">
                {c.titleMain} <span>{c.titleAccent}</span>
              </h1>

              <p className="tri-subtitle">{c.subtitle}</p>
            </div>
          </section>

          {/* =====================================
              STATS
          ====================================== */}

          <div className="tri-stats">
            {c.stats.map((stat) => (
              <div className="tri-stat" key={stat.label}>
                <div className="tri-stat-num">{stat.angka}</div>
                <div className="tri-stat-label">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* =====================================
              TUJUAN
          ====================================== */}

          <section className="tri-section">
            <div className="tri-section-label">{c.tujuanLabel}</div>

            <h2 className="tri-section-heading">{c.tujuanHeading}</h2>

            <div className="tri-tujuan-grid">
              {c.tujuan.map((item) => (
                <article
                  className="tri-tujuan-card"
                  key={item.judul}
                >
                  <div className="tri-tujuan-icon">
                    {item.icon}
                  </div>

                  <div className="tri-tujuan-title">
                    {item.judul}
                  </div>

                  <p className="tri-tujuan-desc">
                    {item.deskripsi}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* DIVIDER */}

          <div className="tri-divider">
            <span />
            <span className="tri-divider-icon">{mode === 'modern' ? '◆' : '✿'}</span>
            <span />
          </div>

          {/* =====================================
              RAGAM / GENRE
          ====================================== */}

          <section className="tari-budaya">
            <div className="tari-budaya-inner">
              <div className="tri-section-label">{c.ragamLabel}</div>

              <h2 className="tri-section-heading">{c.ragamHeading}</h2>

              <div className="tari-budaya-grid">
                <div className="tari-menu">
                  {c.ragam.map((tari, index) => (
                    <button
                      key={tari.nama}
                      type="button"
                      className={`tari-menu-btn ${
                        activeTari === index ? 'active' : ''
                      }`}
                      onClick={() => setActiveTari(index)}
                    >
                      {tari.nama}
                    </button>
                  ))}
                </div>

                <div className="tari-info" key={`${mode}-${activeTari}`}>
                  <div className="tari-info-symbol">
                    {(mode === 'modern'
                      ? ['◆', '▲', '✦', '●']
                      : ['❋', '✦', '❈', '✿'])[activeTari] ?? '✦'}
                  </div>

                  <h3>{c.ragam[activeTari].nama}</h3>

                  <div className="tari-info-region">
                    {c.ragam[activeTari].daerah}
                  </div>

                  <p>{c.ragam[activeTari].deskripsi}</p>

                  <span className="tari-info-tag">{c.ragamTag}</span>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================
              KEGIATAN
          ====================================== */}

          <section className="tri-section">
            <div className="tri-section-label">
              Program Latihan
            </div>

            <h2 className="tri-section-heading">
              KEGIATAN RUTIN
            </h2>

            <div className="tri-kegiatan-grid">
              {c.kegiatan.map((item) => (
                <article
                  className="tri-kegiatan-item"
                  key={item.no}
                >
                  <div className="tri-kegiatan-no">
                    {item.no}
                  </div>

                  <div>
                    <div className="tri-kegiatan-nama">
                      {item.nama}
                    </div>

                    <div className="tri-kegiatan-detail">
                      {item.detail}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* =====================================
              QUOTE
          ====================================== */}

          <section className="tari-quote">
            <div className="tari-quote-symbol">✦</div>

            <div className="tari-quote-text">{c.quoteText}</div>

            <div className="tari-quote-small">{c.quoteSmall}</div>
          </section>
        </main>

        <EskulMusic key={c.musicSrc} src={c.musicSrc} />
        <Footer />
      </div>
    </>
  );
}