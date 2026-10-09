import { adminConfigured } from '@/lib/adminAuth';
import { sql } from '@/lib/db';
import { SPMB_DEFAULT, SPMB_KEY, normalizeSpmb, validateSpmb } from '@/lib/spmbData';

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
  pengaturan: ['kunci', 'nilai', 'updated_at'],
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
      where table_schema = 'public' and table_name in ('berita', 'prestasi', 'media', 'pengaturan')
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

export interface DashboardSummary {
  berita: { total: number; draft: number } | null;
  prestasi: { total: number; draft: number } | null;
  spmb: { tahunAjaran: string; gelombang: number; aktif: string | null } | null;
}

/** Angka ringkas untuk kartu dashboard. Bagian yang gagal dibaca bernilai null. */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  const out: DashboardSummary = { berita: null, prestasi: null, spmb: null };
  if (!sql) return out;
  const db = sql;

  const count = async (table: 'berita' | 'prestasi') => {
    try {
      const rows = table === 'berita'
        ? await db`select count(*)::int as total, count(*) filter (where published = false)::int as draft from berita`
        : await db`select count(*)::int as total, count(*) filter (where published = false)::int as draft from prestasi`;
      return { total: Number(rows[0].total), draft: Number(rows[0].draft) };
    } catch {
      return null;
    }
  };
  [out.berita, out.prestasi] = await Promise.all([count('berita'), count('prestasi')]);

  try {
    const rows = await db`select nilai from pengaturan where kunci = ${SPMB_KEY} limit 1`;
    let data = SPMB_DEFAULT;
    if (rows.length) {
      const n = normalizeSpmb(JSON.parse(String(rows[0].nilai || '{}')));
      if (validateSpmb(n).length === 0) data = n;
    }
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' }); // YYYY-MM-DD (WIB)
    const aktif = data.gelombang.find((g) => g.mulai <= today && today <= g.selesai);
    out.spmb = { tahunAjaran: data.tahunAjaran, gelombang: data.gelombang.length, aktif: aktif?.nama ?? null };
  } catch {
    out.spmb = null;
  }
  return out;
}
