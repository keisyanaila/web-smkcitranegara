import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getPrestasiFallback } from '@/lib/prestasi';

export async function GET() {
  if (sql) {
    try {
      const rows = await sql`
        select id, nama, tahun, kategori, tingkat, foto, deskripsi
        from prestasi
        where published = true
        order by created_at desc
      `;
      return NextResponse.json(
        rows.map((r) => ({
          id: r.id,
          nama: r.nama,
          tahun: r.tahun,
          kategori: r.kategori,
          tingkat: r.tingkat,
          foto: r.foto,
          deskripsi: r.deskripsi,
          href: `/prestasi/${r.id}`,
        })),
      );
    } catch (e) {
      console.error('GET /api/prestasi', e);
      return NextResponse.json([], { status: 200 });
    }
  }
  return NextResponse.json(getPrestasiFallback());
}
