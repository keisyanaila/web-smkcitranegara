import { adminConfigured } from '@/lib/adminAuth';
import { sql } from '@/lib/db';

/**
 * Cek kesiapan admin: env, koneksi database, dan tabel/kolom yang dibutuhkan.
 * Dipakai di dashboard admin supaya penyebab "gagal simpan" langsung kelihatan.
 */

export interface StatusItem {
  ok: boolean;
  label: string;
  hint?: string;
}

// Kolom yang dipakai oleh API admin (lihat db/schema.sql).
const REQUIRED: Record<string, string[]> = {
  berita: ['id', 'slug', 'judul', 'tanggal', 'kategori', 'penulis', 'gambar', 'ringkasan', 'konten', 'published', 'created_at', 'updated_at'],
  prestasi: ['id', 'nama', 'tahun', 'kategori', 'tingkat', 'anggota', 'foto', 'deskripsi', 'published', 'created_at', 'updated_at'],
  media: ['id', 'filename', 'mime', 'data', 'size', 'created_at'],
};

const RUN_SCHEMA = 'Buka Neon → SQL Editor, tempel seluruh isi db/schema.sql, lalu Run (aman diulang).';

export async function getAdminStatus(): Promise<StatusItem[]> {
  const items: StatusItem[] = [
    {
      ok: adminConfigured(),
      label: 'ADMIN_PASSWORD di-set',
      hint: 'Isi ADMIN_PASSWORD di .env.local (lokal) atau Environment Variables di Vercel.',
    },
  ];

  if (!sql) {
    items.push({
      ok: false,
      label: 'DATABASE_URL di-set',
      hint: 'Salin .env.local.example jadi .env.local dan isi DATABASE_URL dari Neon. Di Vercel: Settings → Environment Variables, lalu Redeploy.',
    });
    return items;
  }
  items.push({ ok: true, label: 'DATABASE_URL di-set' });

  let cols: Record<string, unknown>[];
  try {
    cols = await sql`
      select table_name, column_name
      from information_schema.columns
      where table_schema = 'public' and table_name in ('berita', 'prestasi', 'media')
    `;
  } catch (e) {
    items.push({
      ok: false,
      label: 'Terhubung ke database',
      hint: `Gagal terhubung: ${e instanceof Error ? e.message : String(e)}. Salin ulang connection string dari Neon ke DATABASE_URL.`,
    });
    return items;
  }
  items.push({ ok: true, label: 'Terhubung ke database' });

  for (const [table, needed] of Object.entries(REQUIRED)) {
    const have = new Set(cols.filter((c) => c.table_name === table).map((c) => String(c.column_name)));
    if (have.size === 0) {
      items.push({ ok: false, label: `Tabel "${table}" ada`, hint: `Tabel belum dibuat. ${RUN_SCHEMA}` });
      continue;
    }
    const missing = needed.filter((c) => !have.has(c));
    items.push(
      missing.length === 0
        ? { ok: true, label: `Tabel "${table}" lengkap` }
        : { ok: false, label: `Tabel "${table}" lengkap`, hint: `Kolom belum ada: ${missing.join(', ')}. ${RUN_SCHEMA}` },
    );
  }

  return items;
}
