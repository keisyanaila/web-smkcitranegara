import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getPrestasiByIdFallback } from '@/lib/prestasi';

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;

  // DB di-set -> hanya dari DB.
  if (sql) {
    try {
      const rows = await sql`
        select id, nama, tahun, kategori, tingkat, foto, deskripsi
        from prestasi
        where id = ${id} and published = true
        limit 1
      `;
      if (rows.length === 0) {
        return NextResponse.json({ error: 'not found' }, { status: 404 });
      }
      const r = rows[0];
      return NextResponse.json({
        id: r.id,
        nama: r.nama,
        tahun: r.tahun,
        kategori: r.kategori,
        tingkat: r.tingkat,
        foto: r.foto,
        deskripsi: r.deskripsi,
        href: `/prestasi/${r.id}`,
      });
    } catch (e) {
      console.error('GET /api/prestasi/[id]', e);
      return NextResponse.json({ error: 'error' }, { status: 500 });
    }
  }

  const fallback = getPrestasiByIdFallback(id);
  if (fallback) return NextResponse.json(fallback);
  return NextResponse.json({ error: 'not found' }, { status: 404 });
}
