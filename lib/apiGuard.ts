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

/** slug ramah URL dari judul. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

export { requireDb };
