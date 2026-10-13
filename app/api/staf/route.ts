import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { publicJson } from '@/lib/publicCache';
import { STAF_DEFAULT } from '@/lib/staf';

// Daftar guru & staf untuk halaman publik /gurustaffsmk.
// DB belum di-set / tabel belum ada / masih kosong -> pakai daftar bawaan supaya halaman tidak kosong.
export async function GET() {
  if (sql) {
    try {
      const rows = await sql`
        select id, nama, jabatan, kategori, foto
        from staf
        where published = true
        order by lower(nama)
      `;
      if (rows.length > 0) return publicJson(rows);
      // Ada data tapi semuanya Draft -> memang sengaja disembunyikan.
      const any = await sql`select 1 from staf limit 1`;
      if (any.length > 0) return publicJson([]);
    } catch (e) {
      console.error('GET /api/staf', e);
      // 503 (tidak di-cache): browser tetap memakai data terakhir / data bawaan, lalu mencoba lagi.
      return NextResponse.json({ error: 'Database sedang tidak bisa diakses' }, { status: 503 });
    }
  }
  return publicJson(STAF_DEFAULT);
}
