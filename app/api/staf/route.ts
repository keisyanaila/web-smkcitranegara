import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
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
      if (rows.length > 0) return NextResponse.json(rows);
      // Ada data tapi semuanya Draft -> memang sengaja disembunyikan.
      const any = await sql`select 1 from staf limit 1`;
      if (any.length > 0) return NextResponse.json([]);
    } catch (e) {
      console.error('GET /api/staf', e);
    }
  }
  return NextResponse.json(STAF_DEFAULT);
}
