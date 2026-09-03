'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbarsmk';
import Footer from '@/components/layout/Footersmk';
import EskulFX from '@/components/EskulFX';
import Image from 'next/image';

const STATS = [
  { angka: '2014', label: 'Tahun Berdiri' },
  { angka: '25+', label: 'Anggota Aktif' },
  { angka: '11', label: 'Pementasan' },
  { angka: '100%', label: 'Total Aksi' },
];

const TUJUAN = [
  { icon: '🎭', judul: 'Kreativitas', deskripsi: 'Mendorong siswa berpikir kreatif dalam menciptakan karakter, alur cerita, dan pertunjukan yang memukau.' },
  { icon: '🎤', judul: 'Percaya Diri', deskripsi: 'Lewat latihan dialog dan akting, siswa belajar berkomunikasi efektif dan menaklukkan rasa gugup di depan publik.' },
  { icon: '🌟', judul: 'Apresiasi Seni', deskripsi: 'Memahami setiap aspek produksi panggung dan berkolaborasi lintas peran kreatif.' },
];

const SCENE = [
  { no: '01', nama: 'Latihan Akting', detail: 'Ekspresi wajah, gestur tubuh, dan intonasi suara.' },
  { no: '02', nama: 'Pembacaan Naskah', detail: 'Membedah karakter dan membangun interpretasi peran.' },
  { no: '03', nama: 'Improvisasi', detail: 'Berpikir cepat dan kreatif dalam situasi tak terduga.' },
  { no: '04', nama: 'Produksi Pentas', detail: 'Blocking, tata panggung, kostum, hingga hari-H.' },
  { no: '05', nama: 'Kerja Kolaboratif', detail: 'Sutradara, penulis naskah, dan kru teknis satu napas.' },
  { no: '06', nama: 'Workshop', detail: 'Menimba ilmu langsung dari praktisi teater.' },
];

const MARQUEE = ['NOW PLAYING', 'TEATER SMK CITRA NEGARA', 'ACT I · SCENE I', 'BEHIND THE CURTAIN', 'STANDING OVATION', 'ENCORE!'];

const EMOSI = [
  { face: '😄', label: 'SENANG', warna: '#F5A524', quote: '“Tawa penonton adalah upah termahal buat pemain di atas panggung.”' },
  { face: '😠', label: 'MARAH', warna: '#E4572E', quote: '“Amarah yang jujur di panggung lahir dari latihan mengenal emosi sendiri.”' },
  { face: '😢', label: 'SEDIH', warna: '#4F86C6', quote: '“Air mata yang meyakinkan butuh keberanian untuk benar-benar merasakannya.”' },
  { face: '😨', label: 'TAKUT', warna: '#7C5CFF', quote: '“Rasa gugup itu wajar — kami ubah jadi energi begitu lampu menyala.”' },
  { face: '😲', label: 'TERKEJUT', warna: '#2EC4B6', quote: '“Momen kejut yang pas bikin cerita hidup dan penonton terpaku.”' },
];

export default function TheaterPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [actGone, setActGone] = useState(false);
  const [emo, setEmo] = useState(0);
  const [claps, setClaps] = useState<{ id: number; x: number }[]>([]);
  const [clapCount, setClapCount] = useState(0);
  const clapId = useRef(0);

  useEffect(() => {
    const items = document.querySelectorAll('.thr-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); }),
      { threshold: 0.12 },
    );
    items.forEach((i) => observer.observe(i));

    const t = setTimeout(() => setActGone(true), 2600);

    const audio = audioRef.current;
    const start = async () => {
      if (!audio) return;
      audio.volume = 0.55;
      try { await audio.play(); setPlaying(true); }
      catch {
        const resume = async () => {
          try { await audio.play(); setPlaying(true); } catch { setPlaying(false); }
          window.removeEventListener('pointerdown', resume);
          window.removeEventListener('keydown', resume);
        };
        window.addEventListener('pointerdown', resume, { once: true });
        window.addEventListener('keydown', resume, { once: true });
      }
    };
    start();

    return () => { observer.disconnect(); clearTimeout(t); };
  }, []);

  // Spotlight panggung mengikuti kursor di hero
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
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

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); return; }
    try { await audioRef.current.play(); setPlaying(true); } catch { setPlaying(false); }
  };

  const applause = () => {
    setClapCount((c) => c + 1);
    const burst = Array.from({ length: 6 }).map(() => {
      const id = ++clapId.current;
      return { id, x: 50 + (Math.random() * 60 - 30) };
    });
    setClaps((prev) => [...prev, ...burst]);
    burst.forEach((b) => setTimeout(() => setClaps((prev) => prev.filter((p) => p.id !== b.id)), 1400));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&display=swap');

        .thr-root { font-family:'Barlow',sans-serif; background:linear-gradient(180deg,#FFFDF9 0%,#FFF4EC 45%,#FFEDE4 100%); color:#5A3040; min-height:100vh; overflow-x:clip; }
        .thr-root ::selection { background:#FF4F81; color:#fff; }

        /* ============ GRAND CURTAIN (intro) ============ */
        .thr-grand { position:fixed; inset:0; z-index:9995; pointer-events:none; display:grid; grid-template-columns:1fr 1fr; }
        .thr-grand-panel { position:relative; height:100%; background:
            linear-gradient(90deg, rgba(0,0,0,.35), transparent 12%, transparent 88%, rgba(0,0,0,.35)),
            repeating-linear-gradient(90deg,#8E1230 0,#C21E4B 34px,#9A163A 70px);
          box-shadow:inset 0 0 120px rgba(0,0,0,.5);
          animation:thrCurtain 1.5s cubic-bezier(.7,0,.15,1) 1s forwards; }
        .thr-grand-panel.r { animation-name:thrCurtainR; }
        .thr-grand-panel::after { content:''; position:absolute; top:0; bottom:0; width:60px; background:linear-gradient(90deg,rgba(255,255,255,.14),transparent); }
        .thr-grand-panel.r::after { right:0; transform:scaleX(-1); }
        .thr-act { position:fixed; inset:0; z-index:9996; display:grid; place-items:center; pointer-events:none;
          animation:thrActOut .6s ease 2s forwards; }
        .thr-act span { font-family:'Playfair Display',serif; font-style:italic; font-weight:800; font-size:clamp(40px,8vw,96px);
          color:#FFD68C; text-shadow:0 4px 40px rgba(0,0,0,.6); letter-spacing:2px;
          animation:thrActIn .8s cubic-bezier(.2,.8,.2,1) 1.1s both; }
        .thr-act.gone { display:none; }
        @keyframes thrCurtain { to { transform:translateX(-102%); } }
        @keyframes thrCurtainR { to { transform:translateX(102%); } }
        @keyframes thrActIn { from{opacity:0;transform:scale(.8) translateY(20px)} to{opacity:1;transform:none} }
        @keyframes thrActOut { to { opacity:0; } }

        /* ============ HERO — STAGE ============ */
        .thr-hero { position:relative; overflow:hidden; background:#1A0710; --sx:62%; --sy:44%; }
        .thr-hero-img { position:relative; width:100%; height:min(78vh,660px); }
        .thr-hero-img img { object-fit:cover; object-position:center 28%; filter:brightness(.82) saturate(1.1) contrast(1.04); }
        @media (min-width:900px){ .thr-hero-img img { object-position:center 62%; } }
        /* dim panggung + lubang cahaya ikut kursor */
        .thr-stage-dim { position:absolute; inset:0; z-index:3; pointer-events:none;
          background:radial-gradient(circle 260px at var(--sx) var(--sy), rgba(8,3,6,0) 0%, rgba(8,3,6,0) 34%, rgba(8,3,6,.78) 80%);
          transition:background .12s linear; }
        .thr-stage-beam { position:absolute; inset:0; z-index:3; pointer-events:none; mix-blend-mode:screen;
          background:radial-gradient(circle 220px at var(--sx) var(--sy), rgba(255,216,150,.3), transparent 72%); }
        @media (pointer:coarse){ .thr-stage-dim{ background:radial-gradient(circle 300px at 50% 40%, rgba(8,3,6,0), rgba(8,3,6,.55) 82%); } }
        .thr-dust { position:absolute; inset:0; z-index:2; pointer-events:none; overflow:hidden; }
        .thr-dust i { position:absolute; width:4px; height:4px; border-radius:50%; background:rgba(255,224,170,.55); filter:blur(.5px); animation:thrDust linear infinite; }
        @keyframes thrDust { from{ transform:translateY(20px); opacity:0 } 10%{opacity:.9} 90%{opacity:.6} to{ transform:translateY(-80vh); opacity:0 } }
        .thr-hero-vig { position:absolute; inset:0; z-index:4; pointer-events:none; box-shadow:inset 0 -120px 120px -40px #1A0710, inset 0 60px 80px -40px rgba(0,0,0,.5); }

        .thr-hero-content { position:absolute; z-index:6; bottom:0; left:0; right:0; padding:0 clamp(24px,6vw,80px) clamp(44px,6vw,76px); animation:thrRise 1s ease 2.2s both; }
        .thr-eyebrow { display:inline-flex; align-items:center; gap:10px; font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:800; letter-spacing:4px; text-transform:uppercase; color:#FFB3C9; margin-bottom:14px; }
        .thr-eyebrow::before { content:''; width:34px; height:2px; background:#FF4F81; box-shadow:0 0 14px #FF4F81; }
        .thr-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(72px,13vw,168px); line-height:.86; color:#FFF3F6; letter-spacing:3px; margin:0 0 18px; text-shadow:0 6px 40px rgba(255,79,129,.35); }
        .thr-title span { color:#FF4F81; animation:thrGlow 2.8s ease-in-out infinite; }
        .thr-title .thr-l { display:inline-block; opacity:0; animation:thrLetter .55s cubic-bezier(.2,.8,.2,1) forwards; }
        .thr-subtitle { max-width:580px; font-size:clamp(15px,1.8vw,18px); color:rgba(255,240,244,.9); line-height:1.75; }
        @keyframes thrRise { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes thrGlow { 0%,100%{text-shadow:0 0 0 rgba(255,79,129,0)} 50%{text-shadow:0 0 34px rgba(255,79,129,.75)} }
        @keyframes thrLetter { from{opacity:0;transform:translateY(30px) rotate(-6deg)} to{opacity:1;transform:none} }

        /* ============ MARQUEE / PLAYBILL ============ */
        .thr-marquee { background:#240A16; border-top:3px solid #FF4F81; border-bottom:3px solid #FF4F81; overflow:hidden; position:relative; }
        .thr-marquee::before, .thr-marquee::after { content:''; position:absolute; left:0; right:0; height:8px;
          background:radial-gradient(circle 3px at 12px 4px, #FFD68C 60%, transparent 62%) repeat-x; background-size:28px 8px; opacity:.9; }
        .thr-marquee::before { top:2px; } .thr-marquee::after { bottom:2px; }
        .thr-marquee-track { display:flex; gap:44px; white-space:nowrap; padding:14px 0; width:max-content; animation:thrMarquee 22s linear infinite; }
        .thr-marquee-track span { font-family:'Barlow Condensed',sans-serif; font-weight:800; letter-spacing:3px; text-transform:uppercase; font-size:14px; color:#FFE9D0; display:inline-flex; align-items:center; gap:44px; }
        .thr-marquee-track span::after { content:'✦'; color:#FF4F81; }
        .thr-marquee:hover .thr-marquee-track { animation-play-state:paused; }
        @keyframes thrMarquee { to { transform:translateX(-50%); } }

        /* ============ TICKET STATS ============ */
        .thr-stats { max-width:1100px; margin:0 auto; padding:clamp(48px,7vw,80px) clamp(24px,6vw,60px); display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .thr-ticket { position:relative; background:#FFF6EF; border:1.5px dashed rgba(255,79,129,.5); border-radius:10px; padding:26px 18px; text-align:center;
          transition:transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s; }
        .thr-ticket::before, .thr-ticket::after { content:''; position:absolute; top:50%; width:16px; height:16px; border-radius:50%; background:linear-gradient(180deg,#FFFDF9,#FFF4EC); transform:translateY(-50%); }
        .thr-ticket::before { left:-9px; } .thr-ticket::after { right:-9px; }
        .thr-ticket:hover { transform:translateY(-6px) rotate(-1.5deg); box-shadow:0 20px 40px rgba(160,70,90,.16); }
        .thr-ticket-num { font-family:'Bebas Neue',sans-serif; font-size:46px; color:#FF4F81; line-height:1; }
        .thr-ticket-label { font-size:10.5px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:rgba(90,48,64,.6); margin-top:6px; }

        /* ============ SECTION ============ */
        .thr-section { max-width:1100px; margin:0 auto; padding:clamp(48px,7vw,90px) clamp(24px,6vw,80px); }
        .thr-label { font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:800; letter-spacing:3px; text-transform:uppercase; color:#FF4F81; margin-bottom:10px; }
        .thr-heading { font-family:'Bebas Neue',sans-serif; font-size:clamp(40px,5.4vw,68px); color:#6A2945; line-height:1; margin-bottom:44px; }

        /* ============ MASK FLIP ============ */
        .thr-mask-wrap { display:grid; grid-template-columns:auto 1fr; gap:clamp(24px,5vw,56px); align-items:center; }
        @media (max-width:760px){ .thr-mask-wrap{ grid-template-columns:1fr; text-align:center; } }
        .thr-face { width:clamp(160px,26vw,230px); aspect-ratio:1; border:3px solid #fff; cursor:pointer; padding:0; justify-self:center;
          border-radius:50%; display:grid; place-items:center; font-size:clamp(84px,14vw,128px);
          box-shadow:0 30px 60px rgba(160,70,90,.22); animation:thrFacePop .45s cubic-bezier(.34,1.6,.64,1);
          transition:transform .3s cubic-bezier(.34,1.56,.64,1); }
        .thr-face:hover { transform:scale(1.05) rotate(-3deg); }
        .thr-face:active { transform:scale(.92); }
        @keyframes thrFacePop { 0%{transform:scale(.65) rotate(-14deg)} 60%{transform:scale(1.12) rotate(5deg)} 100%{transform:scale(1)} }
        .thr-mood-tag { display:inline-flex; align-items:center; gap:8px; font-family:'Barlow Condensed',sans-serif; font-weight:800; letter-spacing:3px; font-size:13px; text-transform:uppercase; padding:6px 14px; border-radius:999px; color:#fff; transition:background .4s; }
        .thr-mood-quote { font-family:'Playfair Display',serif; font-style:italic; font-size:clamp(20px,2.6vw,30px); color:#6A2945; line-height:1.5; margin:16px 0 10px; }
        .thr-emo-dots { display:flex; gap:8px; margin:4px 0 12px; }
        @media (max-width:760px){ .thr-emo-dots{ justify-content:center; } }
        .thr-emo-dots span { width:8px; height:8px; border-radius:50%; background:rgba(106,41,69,.22); transition:all .3s; }
        .thr-emo-dots span.on { background:#FF4F81; transform:scale(1.35); box-shadow:0 0 10px rgba(255,79,129,.6); }
        .thr-mood-hint { font-size:12px; color:rgba(90,48,64,.5); letter-spacing:1px; }

        /* ============ SCENE RUNDOWN ============ */
        .thr-scene-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:rgba(255,79,129,.16); border-radius:14px; overflow:hidden; }
        @media (max-width:640px){ .thr-scene-grid{ grid-template-columns:1fr; } }
        .thr-scene-item { --mx:50%; --my:50%; background:#FFF9F4; padding:26px 30px; display:flex; align-items:flex-start; gap:20px; position:relative; overflow:hidden; transition:background .3s; }
        .thr-scene-item::before { content:''; position:absolute; inset:0; opacity:0; transition:opacity .3s; pointer-events:none;
          background:radial-gradient(240px circle at var(--mx) var(--my), rgba(255,79,129,.14), transparent 70%); }
        .thr-scene-item:hover { background:#FFF0E7; }
        .thr-scene-item:hover::before { opacity:1; }
        .thr-scene-clap { flex-shrink:0; width:44px; height:40px; position:relative; }
        .thr-scene-clap b, .thr-scene-clap i { position:absolute; left:0; right:0; display:block; }
        .thr-scene-clap b { bottom:0; height:26px; background:#2A0E1A; border-radius:3px; }
        .thr-scene-clap i { top:0; height:12px; background:repeating-linear-gradient(115deg,#2A0E1A 0 8px,#FFF 8px 16px); border-radius:3px; transform-origin:left bottom; transition:transform .25s ease; }
        .thr-scene-item:hover .thr-scene-clap i { transform:rotate(-32deg); }
        .thr-scene-no { position:absolute; right:20px; top:14px; font-family:'Bebas Neue',sans-serif; font-size:20px; color:rgba(255,79,129,.4); letter-spacing:1px; }
        .thr-scene-nama { font-family:'Barlow Condensed',sans-serif; font-size:18px; font-weight:800; color:#6A2945; text-transform:uppercase; letter-spacing:.5px; margin-bottom:4px; }
        .thr-scene-detail { font-size:13px; color:rgba(90,48,64,.66); line-height:1.6; }

        /* ============ TUJUAN SPOTLIT ============ */
        .thr-tujuan-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        @media (max-width:768px){ .thr-tujuan-grid{ grid-template-columns:1fr; } }
        .thr-tcard { --mx:50%; --my:0%; position:relative; overflow:hidden; background:#FFF6EF; border:1px solid rgba(255,79,129,.16); border-radius:16px; padding:34px 28px; transition:transform .3s, box-shadow .3s, border-color .3s; }
        .thr-tcard::before { content:''; position:absolute; inset:0; opacity:0; transition:opacity .35s; pointer-events:none;
          background:radial-gradient(260px circle at var(--mx) var(--my), rgba(255,79,129,.18), transparent 70%); }
        .thr-tcard::after { content:''; position:absolute; left:var(--mx); top:-40px; width:2px; height:120px; background:linear-gradient(#FFD68C,transparent); opacity:0; transform:translateX(-50%); transition:opacity .35s; }
        .thr-tcard:hover { transform:translateY(-8px); border-color:rgba(255,79,129,.45); box-shadow:0 24px 48px rgba(160,70,90,.14); }
        .thr-tcard:hover::before, .thr-tcard:hover::after { opacity:1; }
        .thr-tcard-icon { font-size:38px; display:inline-block; transition:transform .4s; }
        .thr-tcard:hover .thr-tcard-icon { transform:translateY(-6px) rotate(-6deg) scale(1.12); }
        .thr-tcard-title { font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:#6A2945; text-transform:uppercase; letter-spacing:1px; margin:18px 0 10px; }
        .thr-tcard-desc { font-size:14px; color:rgba(90,48,64,.76); line-height:1.75; }

        /* ============ APPLAUSE CTA ============ */
        .thr-cta { position:relative; text-align:center; padding:clamp(64px,10vw,120px) 24px; overflow:hidden;
          background:radial-gradient(70% 90% at 50% 0%, rgba(255,79,129,.14), transparent 70%); }
        .thr-cta h2 { font-family:'Bebas Neue',sans-serif; font-size:clamp(36px,6vw,60px); color:#6A2945; margin-bottom:12px; }
        .thr-cta p { max-width:440px; margin:0 auto 26px; font-size:15px; color:rgba(90,48,64,.7); line-height:1.7; }
        .thr-clap-btn { position:relative; font-family:'Barlow Condensed',sans-serif; font-weight:800; letter-spacing:2px; text-transform:uppercase; font-size:16px;
          border:none; cursor:pointer; color:#fff; background:linear-gradient(135deg,#FF4F81,#F5A524); padding:16px 34px; border-radius:999px;
          box-shadow:0 14px 34px rgba(255,79,129,.35); transition:transform .15s ease, box-shadow .3s; }
        .thr-clap-btn:hover { transform:translateY(-3px) scale(1.03); box-shadow:0 20px 42px rgba(255,79,129,.45); }
        .thr-clap-btn:active { transform:scale(.96); }
        .thr-clap-count { display:block; margin-top:16px; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:rgba(90,48,64,.55); }
        .thr-clap-fly { position:absolute; bottom:38%; font-size:30px; pointer-events:none; animation:thrClap 1.4s ease-out forwards; }
        @keyframes thrClap { 0%{opacity:0;transform:translateY(0) scale(.4)} 15%{opacity:1} 100%{opacity:0;transform:translateY(-220px) scale(1.2) rotate(20deg)} }

        /* ============ MUSIC BUTTON ============ */
        .thr-music { position:fixed; z-index:55; right:20px; bottom:20px; display:flex; align-items:center; gap:10px; padding:10px 16px 10px 10px; border:1px solid rgba(255,79,129,.42); background:rgba(255,255,255,.96); backdrop-filter:blur(12px); color:#6A2945; cursor:pointer; border-radius:999px; box-shadow:0 10px 35px rgba(160,70,90,.16); transition:.3s; }
        .thr-music:hover { border-color:#FF4F81; transform:translateY(-3px); box-shadow:0 0 26px rgba(255,79,129,.3); }
        .thr-music-icon { width:32px; height:32px; border-radius:50%; display:grid; place-items:center; background:#FF4F81; color:#fff; font-weight:800; font-size:12px; }
        .thr-eq { display:flex; align-items:flex-end; gap:3px; height:16px; }
        .thr-eq i { width:3px; height:5px; background:#FF4F81; border-radius:3px; }
        .thr-music.playing .thr-eq i { animation:thrEq .7s ease-in-out infinite alternate; }
        .thr-eq i:nth-child(2){animation-delay:.15s}.thr-eq i:nth-child(3){animation-delay:.3s}.thr-eq i:nth-child(4){animation-delay:.1s}
        .thr-music span { font-family:'Barlow Condensed',sans-serif; font-weight:800; letter-spacing:1.5px; font-size:12px; }
        @keyframes thrEq { from{height:4px} to{height:16px} }
        @media (max-width:768px){ .thr-music span{ display:none; } }

        /* ============ DIVIDER + REVEAL ============ */
        .thr-divider { display:flex; align-items:center; gap:16px; max-width:1100px; margin:0 auto; padding:0 clamp(24px,6vw,80px); opacity:.3; }
        .thr-divider::before,.thr-divider::after { content:''; flex:1; height:1px; background:#FF4F81; }
        .thr-divider span { font-size:14px; animation:thrSpin 6s linear infinite; }
        @keyframes thrSpin { to{transform:rotate(360deg)} }
        .thr-reveal { opacity:0; transform:translateY(34px); transition:opacity .8s ease, transform .8s ease; }
        .thr-reveal.is-visible { opacity:1; transform:none; }
        .thr-d1{transition-delay:.08s}.thr-d2{transition-delay:.16s}.thr-d3{transition-delay:.24s}

        @media (prefers-reduced-motion:reduce){
          *,*::before,*::after{ animation-duration:.01ms!important; animation-iteration-count:1!important; transition-duration:.01ms!important; }
          .thr-reveal{ opacity:1; transform:none; }
          .thr-grand-panel{ transform:translateX(-102%); } .thr-grand-panel.r{ transform:translateX(102%); }
          .thr-act{ display:none; }
        }
      `}</style>

      <div className="thr-root">
        <Navbar />
        <audio ref={audioRef} src="/audio/theater.mp3" loop preload="none" onEnded={() => setPlaying(false)} />

        {/* Tirai pembuka */}
        <div className="thr-grand" aria-hidden="true">
          <div className="thr-grand-panel l" />
          <div className="thr-grand-panel r r" />
        </div>
        <div className={`thr-act ${actGone ? 'gone' : ''}`} aria-hidden="true"><span>Act I</span></div>

        <button className={`thr-music ${playing ? 'playing' : ''}`} onClick={toggleMusic} aria-label={playing ? 'Matikan musik' : 'Putar musik teater'}>
          <div className="thr-music-icon">{playing ? '❚❚' : '▶'}</div>
          <div className="thr-eq"><i /><i /><i /><i /></div>
          <span>{playing ? 'Panggung Hidup' : 'Nyalakan Suasana'}</span>
        </button>

        <main>
          {/* HERO */}
          <section className="thr-hero" ref={heroRef}>
            <div className="thr-hero-img">
              <Image src="/images/eskul/eskultheater.jpg" alt="Teater SMK Citra Negara" fill priority />
              <div className="thr-dust" aria-hidden="true">
                {Array.from({ length: 14 }).map((_, i) => (
                  <i key={i} style={{ left: `${(i * 7 + 4) % 100}%`, animationDuration: `${6 + (i % 5) * 2}s`, animationDelay: `${-(i % 7)}s` }} />
                ))}
              </div>
              <div className="thr-stage-beam" />
              <div className="thr-stage-dim" />
              <div className="thr-hero-vig" />
            </div>
            <div className="thr-hero-content">
              <div className="thr-eyebrow">Ekstrakurikuler SMK Citra Negara</div>
              <h1 className="thr-title">
                {'THE'.split('').map((ch, i) => <span key={i} className="thr-l" style={{ animationDelay: `${2.3 + i * 0.06}s` }}>{ch}</span>)}
                <span>
                  {'ATER'.split('').map((ch, i) => <span key={i} className="thr-l" style={{ animationDelay: `${2.3 + (i + 3) * 0.06}s`, color: '#FF4F81' }}>{ch}</span>)}
                </span>
              </h1>
              <p className="thr-subtitle">
                Dari akting sampai produksi panggung — kami membentuk seniman muda yang berani, ekspresif, dan percaya diri.
                Geser kursor di panggung: cari sorot lampunya. ✦
              </p>
            </div>
          </section>

          {/* MARQUEE */}
          <div className="thr-marquee" aria-hidden="true">
            <div className="thr-marquee-track">
              {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
            </div>
          </div>

          {/* TICKET STATS */}
          <div className="thr-stats">
            {STATS.map((s, i) => (
              <div key={s.label} className={`thr-ticket thr-reveal thr-d${(i % 3) + 1}`}>
                <div className="thr-ticket-num">{s.angka}</div>
                <div className="thr-ticket-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* EMOSI DASAR */}
          <section className="thr-section">
            <div className="thr-label thr-reveal">Bahasa Panggung</div>
            <h2 className="thr-heading thr-reveal">Lima Emosi Dasar</h2>
            <div className="thr-mask-wrap">
              <button
                key={emo}
                className="thr-face"
                style={{ background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), ${EMOSI[emo].warna})` }}
                onClick={() => setEmo((e) => (e + 1) % EMOSI.length)}
                aria-label={`Emosi: ${EMOSI[emo].label}. Ketuk untuk ganti`}
              >
                {EMOSI[emo].face}
              </button>
              <div className="thr-reveal">
                <span className="thr-mood-tag" style={{ background: EMOSI[emo].warna }}>
                  {EMOSI[emo].face} {EMOSI[emo].label}
                </span>
                <p className="thr-mood-quote">{EMOSI[emo].quote}</p>
                <div className="thr-emo-dots" aria-hidden="true">
                  {EMOSI.map((_, i) => (
                    <span key={i} className={i === emo ? 'on' : ''} />
                  ))}
                </div>
                <span className="thr-mood-hint">— ketuk wajahnya untuk mengganti emosi —</span>
              </div>
            </div>
          </section>

          <div className="thr-divider" aria-hidden="true"><span>✦</span></div>

          {/* TUJUAN */}
          <section className="thr-section" style={{ paddingTop: 'clamp(36px,5vw,60px)' }}>
            <div className="thr-label thr-reveal">Mengapa Teater</div>
            <h2 className="thr-heading thr-reveal">Yang Kami Latih</h2>
            <div className="thr-tujuan-grid">
              {TUJUAN.map((t, i) => (
                <article
                  key={t.judul}
                  className={`thr-tcard thr-reveal thr-d${i + 1}`}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
                  }}
                >
                  <span className="thr-tcard-icon">{t.icon}</span>
                  <div className="thr-tcard-title">{t.judul}</div>
                  <p className="thr-tcard-desc">{t.deskripsi}</p>
                </article>
              ))}
            </div>
          </section>

          {/* SCENE RUNDOWN */}
          <section className="thr-section" style={{ paddingTop: 'clamp(36px,5vw,60px)' }}>
            <div className="thr-label thr-reveal">Rundown Latihan</div>
            <h2 className="thr-heading thr-reveal">Adegan Demi Adegan</h2>
            <div className="thr-scene-grid">
              {SCENE.map((k, i) => (
                <div
                  key={k.no}
                  className={`thr-scene-item thr-reveal thr-d${(i % 3) + 1}`}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
                  }}
                >
                  <div className="thr-scene-clap" aria-hidden="true"><i /><b /></div>
                  <div>
                    <div className="thr-scene-nama">{k.nama}</div>
                    <div className="thr-scene-detail">{k.detail}</div>
                  </div>
                  <span className="thr-scene-no">SC {k.no}</span>
                </div>
              ))}
            </div>
          </section>

          {/* APPLAUSE CTA */}
          <section className="thr-cta">
            <h2>Layak Dapat Standing Ovation</h2>
            <p>Setiap pementasan lahir dari latihan berbulan-bulan. Beri tepuk tangan buat mereka!</p>
            <button className="thr-clap-btn" onClick={applause}>👏 Beri Tepuk Tangan</button>
            <span className="thr-clap-count">{clapCount > 0 ? `${clapCount} tepuk tangan` : 'jadilah yang pertama'}</span>
            {claps.map((c) => (
              <span key={c.id} className="thr-clap-fly" style={{ left: `${c.x}%` }}>👏</span>
            ))}
          </section>
        </main>

        <EskulFX />
        <Footer />
      </div>
    </>
  );
}
