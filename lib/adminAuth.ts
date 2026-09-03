import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

/**
 * Auth admin sederhana: satu password di env (ADMIN_PASSWORD).
 * Login sukses -> set cookie httpOnly berisi token HMAC.
 * Tidak ada tabel user.
 */

export const ADMIN_COOKIE = 'cn_admin';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

function secret() {
  return process.env.ADMIN_PASSWORD || '';
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Token = HMAC-SHA256("admin") pakai ADMIN_PASSWORD sebagai kunci. */
export function makeToken() {
  return createHmac('sha256', secret()).update('admin').digest('hex');
}

export function checkPassword(input: string) {
  const a = Buffer.from(input || '');
  const b = Buffer.from(secret());
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function tokenValid(token: string | undefined) {
  if (!token || !adminConfigured()) return false;
  const expected = makeToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Dipakai di route handler / server component untuk memastikan sudah login. */
export async function isAdmin() {
  const jar = await cookies();
  return tokenValid(jar.get(ADMIN_COOKIE)?.value);
}

export const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: MAX_AGE,
  secure: process.env.NODE_ENV === 'production',
};
