import { neon } from '@neondatabase/serverless';

/**
 * Klien database Neon (PostgreSQL).
 *
 * `sql` dipakai sebagai tagged template:
 *   const rows = await sql`select * from berita where slug = ${slug}`;
 *
 * Kalau DATABASE_URL belum di-set, `sql` = null dan `isDbConfigured` = false,
 * sehingga halaman publik jatuh ke data contoh (fallback) tanpa error.
 */

const url = process.env.DATABASE_URL;

export const isDbConfigured = Boolean(url);

export const sql = url ? neon(url) : null;

/** Lempar error yang jelas kalau route DB dipanggil tanpa konfigurasi. */
export function requireDb() {
  if (!sql) {
    throw new Error(
      'DATABASE_URL belum di-set. Salin .env.local.example jadi .env.local dan isi DATABASE_URL dari Neon.',
    );
  }
  return sql;
}
