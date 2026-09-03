import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getBerita } from '@/lib/berita';

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;

  // DB di-set -> hanya dari DB (tidak jatuh ke data contoh).
  if (sql) {
    try {
      const rows = await sql`
        select slug, judul, to_char(tanggal, 'YYYY-MM-DD') as tanggal,
               kategori, penulis, gambar, ringkasan, konten
        from berita
        where slug = ${slug} and published = true
        limit 1
      `;
      if (rows.length === 0) {
        return NextResponse.json({ error: 'not found' }, { status: 404 });
      }
      const r = rows[0];
      return NextResponse.json({
        slug: r.slug,
        judul: r.judul,
        tanggal: r.tanggal,
        kategori: r.kategori,
        penulis: r.penulis,
        gambar: r.gambar,
        ringkasan: r.ringkasan,
        konten: String(r.konten || '')
          .split(/\n\s*\n/)
          .map((p: string) => p.trim())
          .filter(Boolean),
      });
    } catch (e) {
      console.error('GET /api/berita/[slug]', e);
      return NextResponse.json({ error: 'error' }, { status: 500 });
    }
  }

  const fallback = getBerita(slug);
  if (fallback) return NextResponse.json(fallback);
  return NextResponse.json({ error: 'not found' }, { status: 404 });
}
