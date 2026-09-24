'use client';

import { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

/**
 * Pilihan bahasa situs (Indonesia / English).
 * Disimpan di localStorage supaya pilihan pengunjung diingat antar halaman.
 * Pakai di komponen client:
 *   const { lang, t } = useLang();
 *   t('Beranda', 'Home')
 */

export type Lang = 'id' | 'en';

const STORAGE_KEY = 'lang';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <T>(id: T, en: T) => T;
}

const LangContext = createContext<LangContextValue>({
  lang: 'id',
  setLang: () => {},
  t: (id) => id,
});

// Store kecil di atas localStorage. `memoryLang` jadi cadangan kalau
// localStorage diblokir browser (mode privat, dll).
let memoryLang: Lang = 'id';
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener('storage', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', cb);
  };
}

function getSnapshot(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'id' || saved === 'en') return saved;
  } catch {}
  return memoryLang;
}

function setLang(next: Lang) {
  memoryLang = next;
  try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  listeners.forEach((cb) => cb());
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Server selalu render bahasa Indonesia; pilihan pengunjung dipakai setelah hydrate.
  const lang = useSyncExternalStore(subscribe, getSnapshot, () => 'id' as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = <T,>(id: T, en: T) => (lang === 'en' ? en : id);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Tombol ganti bahasa ID / EN */
export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Pilih bahasa / Choose language">
      {(['id', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          className={lang === l ? 'is-active' : ''}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
      <style>{`
        .lang-switch { display: inline-flex; padding: 3px; border-radius: 999px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.14); }
        .lang-switch button { border: none; background: none; color: rgba(255,255,255,.65); font-size: 11.5px; font-weight: 800; letter-spacing: .04em; padding: 5px 9px; border-radius: 999px; cursor: pointer; transition: .18s ease; font-family: inherit; }
        .lang-switch button:hover { color: #fff; }
        .lang-switch button.is-active { background: #e5b95a; color: #15261f; }
      `}</style>
    </div>
  );
}
