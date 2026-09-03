import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getBeritaTerbaru } from '@/lib/berita';

// Daftar berita untuk halaman publik /berita.
// DB sudah di-set (DATABASE_URL ada) -> selalu pakai DB, walau kosong.
// DB belum di-set -> baru pakai data contoh.
export async function GET() {
  if (sql) {
    try {
      const rows = await sql`
        select slug, judul, to_char(tanggal, 'YYYY-MM-DD') as tanggal,
               kategori, penulis, gambar, ringkasan, konten
        from berita
        where published = true
        order by tanggal desc, created_at desc
      `;
      return NextResponse.json(rows.map(toBerita));
    } catch (e) {
      console.error('GET /api/berita', e);
      return NextResponse.json([], { status: 200 });
    }
  }
  return NextResponse.json(getBeritaTerbaru());
}

function toBerita(r: Record<string, unknown>) {
  return {
    slug: r.slug,
    judul: r.judul,
    tanggal: r.tanggal,
    kategori: r.kategori,
    penulis: r.penulis,
    gambar: r.gambar,
    ringkasan: r.ringkasan,
    konten: String(r.konten || '')
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
  };
}
