import { NextResponse } from 'next/server';

/**
 * Header cache untuk API publik (dibaca CDN Vercel).
 * - s-maxage=60: selama 60 detik CDN langsung menjawab tanpa query ke database.
 * - stale-while-revalidate: setelah itu pengunjung tetap dapat jawaban instan
 *   sementara CDN mengambil data terbaru di belakang.
 * Jadi perubahan dari admin muncul di situs paling lambat sekitar 1 menit.
 */
export const PUBLIC_CACHE = 'public, s-maxage=60, stale-while-revalidate=86400';

export function publicJson(data: unknown, init?: ResponseInit) {
  const res = NextResponse.json(data, init);
  if (!init?.status || init.status === 200) res.headers.set('Cache-Control', PUBLIC_CACHE);
  return res;
}
