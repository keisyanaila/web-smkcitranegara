"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./SplashWelcome.module.css";

interface SplashWelcomeProps {
  /**
   * Durasi splash tampil penuh, dalam milidetik.
   * Default 4500ms — mengikuti choreography animasi di SplashWelcome.module.css:
   *   - huruf terakhir selesai reveal di ~2.7s (delay 1.65s + durasi 1.05s)
   *   - underline selesai grow di ~3.35s (delay 2.25s + durasi 1.1s)
   *   - dots selesai muncul di ~3.9s (delay 3.2s + durasi 0.7s)
   * + jeda ~600ms biar sempat "dilihat" sebelum fade out.
   * Kalau delay/durasi animasi di CSS diubah, sesuaikan juga angka ini.
   */
  duration?: number;
  /** Durasi animasi fade-out, dalam ms. HARUS sama dengan transition di .splash (CSS: 0.7s). */
  fadeOutDuration?: number;
  onFinish?: () => void;
}

const BRAND = "SMK CITRA NEGARA";

// 7 maskot. File ada di folder: public/images/maskot/
// PENTING: path di web TIDAK pakai "/public" — file public/images/maskot/x.png diakses sebagai "/images/maskot/x.png"
// `besar: true` -> maskot ini dirender lebih besar dari yang lain.
const MASKOT = [
  { src: "/images/maskot/PPLGMASKOT.png", alt: "Maskot PPLG" },
  { src: "/images/maskot/TJKTMASKOT.png", alt: "Maskot TJKT" },
  { src: "/images/maskot/DKVMASKOT.png", alt: "Maskot DKV" },
  { src: "/images/maskot/MASKOTCITRANEGARA.png", alt: "Maskot Citra Negara", besar: true },
  { src: "/images/maskot/PMMASKOT.png", alt: "Maskot PM" },
  { src: "/images/maskot/MPLBMASKOT.png", alt: "Maskot MPLB" },
  { src: "/images/maskot/PHMASKOT.png", alt: "Maskot PH" },
];
// SHOW_ONCE = true  -> splash hanya tampil sekali pas pertama masuk web (per sesi browser).
// SHOW_ONCE = false -> splash tampil tiap kali halaman di-refresh (dipakai buat ngetes desain).
const SHOW_ONCE = true;
const SPLASH_KEY = "citra-negara-splash-shown";
const DEFAULT_DURATION = 4500;
const DEFAULT_FADE_OUT = 700; // harus match transition di .splash (CSS)

// Guard 1x per page-load. Penting untuk React Strict Mode (next dev) yang menjalankan
// useEffect dua kali — tanpa ini, run ke-2 akan mengira splash "sudah pernah tampil"
// dan langsung men-skip animasinya.
let splashStartedThisLoad = false;


export default function SplashWelcome({
  duration = DEFAULT_DURATION,
  fadeOutDuration = DEFAULT_FADE_OUT,
  onFinish,
}: SplashWelcomeProps) {
  // Selalu mulai dari "tampil penuh" (true = default render, bukan null).
  // Ini mencegah halaman di belakangnya sempat mengintip sebelum JS jalan.
  const [hiding, setHiding] = useState(false);
  const [instant, setInstant] = useState(false);
  const [done, setDone] = useState(false);

useEffect(() => {
  // Sudah pernah tampil di page-load SEBELUMNYA (sesi ini) → skip, jangan animasi lagi.
  // Cek `splashStartedThisLoad` supaya double-run Strict Mode tidak salah menganggap
  // splash sudah tampil padahal baru saja dimulai di run pertama.
  if (SHOW_ONCE && !splashStartedThisLoad && sessionStorage.getItem(SPLASH_KEY)) {
    setInstant(true);
    setHiding(true);
    setDone(true);
    onFinish?.();
    return;
  }

  splashStartedThisLoad = true;

  const timer = setTimeout(() => {
    // Baru tandai "sudah tampil" SETELAH splash benar-benar selesai diputar.
    if (SHOW_ONCE) sessionStorage.setItem(SPLASH_KEY, "true");
    setHiding(true);

    const finishTimer = setTimeout(() => {
      setDone(true);
      onFinish?.();
    }, fadeOutDuration);

    return () => clearTimeout(finishTimer);
  }, duration);

  return () => clearTimeout(timer);
}, [duration, fadeOutDuration, onFinish]);

  const letters = useMemo(() => BRAND.split(""), []);

  // Baru unmount total setelah benar-benar selesai (termasuk fade-out).
  if (done) return null;

  return (
    <div
      className={`${styles.splash} ${hiding ? styles.hide : ""} ${
        instant ? styles.instant : ""
      }`}
      aria-hidden={hiding}
      role="status"
      aria-live="polite"
    >
      <div className={styles.auroraA} />
      <div className={styles.auroraB} />
      <div className={styles.auroraC} />
      <div className={styles.grain} />

      <div className={styles.centerGlow} />

      <div className={styles.textStage}>
        <div className={styles.maskotRow}>
          {MASKOT.map((m, i) => (
            <img
              key={i}
              src={m.src}
              alt={m.alt}
              className={`${styles.maskot} ${m.besar ? styles.maskotBig : ""}`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
              }}
            />
          ))}
        </div>

        <div className={styles.brandWrapper}>
          <h1 className={styles.brandText} aria-label={BRAND}>
            {letters.map((char, i) => (
              <span
                key={i}
                className={styles.letter}
                style={{
                  animationDelay: `${0.45 + i * 0.1}s`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <div className={styles.underlineWrapper}>
            <span className={styles.underline} />
            <span className={styles.underlineGlow} />
          </div>
        </div>

        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}