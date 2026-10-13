'use client';

import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';

/**
 * Cache data JSON dari API publik (stale-while-revalidate).
 *
 * - Data terakhir disimpan di memori + localStorage, jadi saat halaman dibuka lagi
 *   isi langsung tampil tanpa menunggu server (juga saat sinyal jelek / offline).
 * - Setelah itu data diperbarui diam-diam di belakang.
 * - Request ke URL yang sama digabung (tidak dobel), ada timeout & retry otomatis,
 *   dan dicoba lagi saat koneksi kembali online / tab dibuka lagi.
 */

type Status = 'loading' | 'ok' | 'notfound' | 'error';
export type CacheEntry<T = unknown> = { data?: T; status: Status; at: number };

const PREFIX = 'cn-cache:v1:';
const FRESH_MS = 30_000;               // < 30 detik sejak diambil -> tidak perlu ambil ulang
const MAX_AGE_MS = 7 * 24 * 3600_000;  // salinan lokal dipakai maksimal 7 hari
const TIMEOUT_MS = 12_000;
const RETRIES = 2;

const EMPTY: CacheEntry = { status: 'loading', at: 0 };
const store = new Map<string, CacheEntry>();
const listeners = new Map<string, Set<() => void>>();
const inflight = new Map<string, Promise<void>>();

function readLocal(url: string): CacheEntry | undefined {
  try {
    const raw = localStorage.getItem(PREFIX + url);
    if (!raw) return;
    const e = JSON.parse(raw) as { data: unknown; at: number };
    if (!e || Date.now() - e.at > MAX_AGE_MS) return;
    return { data: e.data, status: 'ok', at: e.at };
  } catch {
    return;
  }
}

function writeLocal(url: string, data: unknown, at: number) {
  try {
    const s = JSON.stringify({ data, at });
    if (s.length < 1_500_000) localStorage.setItem(PREFIX + url, s);
  } catch {}
}

function removeLocal(url: string) {
  try { localStorage.removeItem(PREFIX + url); } catch {}
}

function getEntry(url: string): CacheEntry {
  let e = store.get(url);
  if (!e) {
    e = (typeof window !== 'undefined' && readLocal(url)) || EMPTY;
    store.set(url, e);
  }
  return e;
}

function setEntry(url: string, e: CacheEntry) {
  store.set(url, e);
  listeners.get(url)?.forEach((cb) => cb());
}

/** Ambil data dari cache tanpa request (untuk dipakai sebagai isi awal). */
export function peekJson<T>(url: string): T | undefined {
  const e = getEntry(url);
  return e.status === 'ok' ? (e.data as T) : undefined;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url: string): Promise<Response> {
  for (let i = 0; ; i++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const r = await fetch(url, { signal: ctrl.signal });
      if (r.status >= 500 && i < RETRIES) throw new Error(String(r.status));
      return r;
    } catch (err) {
      if (i >= RETRIES) throw err;
      await sleep(700 * (i + 1));
    } finally {
      clearTimeout(timer);
    }
  }
}

/** Ambil ulang data dari server (digabung kalau sedang berjalan). */
export function revalidate(url: string, force = false): Promise<void> {
  const cur = getEntry(url);
  if (!force && cur.status === 'ok' && Date.now() - cur.at < FRESH_MS) return Promise.resolve();
  const running = inflight.get(url);
  if (running) return running;

  const p = fetchWithRetry(url)
    .then(async (r) => {
      if (r.status === 404) {
        removeLocal(url);
        setEntry(url, { status: 'notfound', at: Date.now() });
        return;
      }
      if (!r.ok) throw new Error(String(r.status));
      const data = await r.json();
      const at = Date.now();
      setEntry(url, { data, status: 'ok', at });
      writeLocal(url, data, at);
    })
    .catch(() => {
      const e = getEntry(url);
      // Masih ada data lama -> tetap tampilkan data lama.
      if (e.status !== 'ok') setEntry(url, { ...e, status: 'error' });
    })
    .finally(() => inflight.delete(url));

  inflight.set(url, p);
  return p;
}

/** Ambil data lebih awal (mis. saat browser sedang santai) supaya halaman berikutnya instan. */
export function prefetchJson(url: string) {
  void revalidate(url);
}

// Koneksi kembali / tab dibuka lagi -> segarkan data yang sedang dipakai.
let globalBound = false;
function bindGlobal() {
  if (globalBound || typeof window === 'undefined') return;
  globalBound = true;
  const refreshActive = () => {
    listeners.forEach((set, url) => { if (set.size > 0) void revalidate(url); });
  };
  window.addEventListener('online', refreshActive);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshActive();
  });
}

function subscribe(url: string, cb: () => void) {
  bindGlobal();
  let set = listeners.get(url);
  if (!set) listeners.set(url, (set = new Set()));
  set.add(cb);
  return () => { set.delete(cb); };
}

const noopUnsub = () => () => {};

export function useCachedJson<T>(url: string | null): CacheEntry<T> {
  const sub = useCallback((cb: () => void) => (url ? subscribe(url, cb) : noopUnsub()), [url]);
  const entry = useSyncExternalStore(
    sub,
    () => (url ? getEntry(url) : EMPTY),
    () => EMPTY,
  ) as CacheEntry<T>;

  useEffect(() => {
    if (url) void revalidate(url);
  }, [url]);

  // Gagal total (mis. sinyal hilang) -> coba lagi beberapa kali (8 dtk, 16 dtk, 32 dtk).
  // Setelah itu menunggu koneksi kembali online / tab dibuka lagi.
  const tries = useRef(0);
  useEffect(() => {
    if (!url) return;
    if (entry.status !== 'error') { tries.current = 0; return; }
    if (tries.current >= 3) return;
    const timer = setTimeout(() => { tries.current++; void revalidate(url, true); }, 8000 * 2 ** tries.current);
    return () => clearTimeout(timer);
  }, [url, entry]);

  return entry;
}
