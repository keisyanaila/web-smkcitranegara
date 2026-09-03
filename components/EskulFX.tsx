'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Lapisan efek interaktif untuk halaman ekstrakurikuler.
 * 100% aditif — tidak menyentuh layout/CSS bawaan tiap halaman.
 *  - Progress bar baca-scroll di atas
 *  - Cursor glow yang mengikuti mouse (desktop, hormati reduced-motion)
 *  - Tombol "kembali ke atas" muncul saat scroll
 *
 * Pakai: <EskulFX /> (sekali per halaman, dekat <Footer />)
 */
export default function EskulFX() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // scroll -> progress + tombol top
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
      setShowTop(el.scrollTop > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // cursor glow (desktop + bukan reduced motion)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    let gx = 0, gy = 0, mx = 0, my = 0, raf = 0;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      const interactive = (e.target as HTMLElement)?.closest?.('a, button, [role="button"], input, label, select');
      if (glowRef.current) glowRef.current.classList.toggle('eskfx-glow-hot', !!interactive);
    };
    const loop = () => {
      gx += (mx - gx) * 0.14;
      gy += (my - gy) * 0.14;
      if (glowRef.current) glowRef.current.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <div className="eskfx-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div ref={glowRef} className="eskfx-glow" aria-hidden="true" />
      <div ref={dotRef} className="eskfx-dot" aria-hidden="true" />

      <button
        type="button"
        onClick={toTop}
        className={`eskfx-top ${showTop ? 'eskfx-top-show' : ''}`}
        aria-label="Kembali ke atas"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      <style jsx global>{`
        .eskfx-progress {
          position: fixed; top: 0; left: 0; height: 3px; z-index: 9998;
          background: linear-gradient(90deg, #C8973A, #E8B84B, #15803d);
          box-shadow: 0 0 12px rgba(200,151,58,0.6);
          transition: width 0.12s linear; pointer-events: none;
        }
        .eskfx-glow {
          position: fixed; top: 0; left: 0; width: 460px; height: 460px; z-index: 9990;
          border-radius: 50%; pointer-events: none; will-change: transform;
          background: radial-gradient(circle, rgba(232,184,75,0.16), rgba(232,184,75,0) 62%);
          mix-blend-mode: multiply; opacity: 0.9;
          transition: width 0.35s ease, height 0.35s ease, background 0.35s ease;
        }
        .eskfx-glow.eskfx-glow-hot {
          width: 620px; height: 620px;
          background: radial-gradient(circle, rgba(21,128,61,0.16), rgba(232,184,75,0.14) 40%, rgba(232,184,75,0) 66%);
        }
        .eskfx-dot {
          position: fixed; top: 0; left: 0; width: 7px; height: 7px; z-index: 9999;
          border-radius: 50%; background: #E8B84B; pointer-events: none; will-change: transform;
          box-shadow: 0 0 10px rgba(232,184,75,0.9);
        }
        @media (pointer: coarse) { .eskfx-glow, .eskfx-dot { display: none; } }
        @media (prefers-reduced-motion: reduce) {
          .eskfx-glow, .eskfx-dot { display: none; }
          .eskfx-progress { transition: none; }
          .eskfx-top { transition: none; }
        }

        .eskfx-top {
          position: fixed; left: 20px; bottom: 20px; z-index: 60;
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #0B3D2E, #15803d);
          color: #E8B84B; border: 1px solid rgba(232,184,75,0.4);
          box-shadow: 0 10px 26px rgba(11,61,46,0.4);
          cursor: pointer;
          opacity: 0; transform: translateY(16px) scale(0.9); pointer-events: none;
          transition: opacity 0.28s ease, transform 0.28s ease, background 0.2s ease;
        }
        .eskfx-top-show { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .eskfx-top:hover { background: linear-gradient(135deg, #15803d, #1EA34C); transform: translateY(-3px) scale(1.05); }
        @media (max-width: 640px) { .eskfx-top { left: 14px; bottom: 14px; width: 40px; height: 40px; } }
      `}</style>
    </>
  );
}
