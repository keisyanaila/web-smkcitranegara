'use client';

import { useEffect } from 'react';

// Animasi CSS di section yang lagi di luar layar di-pause (class .anim-offscreen
// di globals.css), biar HP nggak kerja buat hal yang nggak kelihatan.
// Video nggak terpengaruh — ini cuma CSS animation.
export default function PauseOffscreenAnimations() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('anim-offscreen', !e.isIntersecting)),
      { rootMargin: '200px 0px' },
    );
    const observed = new Set<Element>();
    let raf = 0;

    const scan = () => {
      const current = new Set(document.querySelectorAll('main > *'));
      observed.forEach(el => {
        if (!current.has(el)) { io.unobserve(el); el.classList.remove('anim-offscreen'); observed.delete(el); }
      });
      current.forEach(el => { if (!observed.has(el)) { io.observe(el); observed.add(el); } });
    };

    scan();
    const mo = new MutationObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(scan); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
      observed.forEach(el => el.classList.remove('anim-offscreen'));
    };
  }, []);

  return null;
}
