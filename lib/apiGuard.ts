import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/adminAuth';
import { requireDb } from '@/lib/db';

/**
 * Dipakai di awal setiap route handler /api/admin/*:
 *   const guard = await adminGuard(); if (guard) return guard;
 * Mengembalikan Response 401 kalau belum login, atau null kalau boleh lanjut.
 */
export async function adminGuard() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Tidak diizinkan' }, { status: 401 });
  }
  return null;
}

/**
 * Ubah error (biasanya dari database) jadi Response JSON dengan pesan yang bisa
 * dibaca admin, supaya form tidak cuma menampilkan "Gagal menyimpan".
 *   try { ... } catch (e) { return errorResponse(e, 'POST /api/admin/berita'); }
 */
export function errorResponse(e: unknown, where: string) {
  console.error(where, e);
  const msg = e instanceof Error ? e.message : String(e);

  let error = `Kesalahan server: ${msg}`;
  let status = 500;
  const table = msg.match(/relation "([^"]+)" does not exist/);
  const column = msg.match(/column "([^"]+)"(?: of relation "[^"]+")? does not exist/);
  if (msg.includes('DATABASE_URL')) {
    error = 'DATABASE_URL belum di-set. Isi di .env.local (lokal) atau Environment Variables di Vercel, lalu restart/redeploy.';
  } else if (column) {
    // dicek sebelum `table`: pesan kolom juga memuat 'relation "..." does not exist'
    error = `Kolom "${column[1]}" belum ada di database. Jalankan ulang isi db/schema.sql di Neon (aman diulang), lalu coba lagi.`;
  } else if (table) {
    error = `Tabel "${table[1]}" belum ada di database. Jalankan isi db/schema.sql di Neon (SQL Editor), lalu coba lagi.`;
  } else if (/invalid input syntax for type uuid/.test(msg)) {
    error = 'ID data tidak valid.';
    status = 400;
  } else if (/duplicate key/.test(msg)) {
    error = 'Data yang sama sudah ada (slug/nama bentrok). Ubah sedikit lalu simpan lagi.';
    status = 409;
  } else if (/fetch failed|ENOTFOUND|ECONNREFUSED|password authentication failed/i.test(msg)) {
    error = 'Tidak bisa terhubung ke database. Periksa DATABASE_URL (salin ulang connection string dari Neon).';
  }
  return NextResponse.json({ error }, { status });
}

/** Baca body JSON; kalau rusak/kosong, balikan null (handler membalas 400). */
export async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const b = await req.json();
    return b && typeof b === 'object' ? (b as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export const badBody = () => NextResponse.json({ error: 'Data yang dikirim tidak valid' }, { status: 400 });

/** slug ramah URL dari judul. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
    .replace(/^-+|-+$/g, '');
}

export { requireDb };
