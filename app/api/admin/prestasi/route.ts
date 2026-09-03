import { NextResponse } from 'next/server';
import { adminGuard, requireDb } from '@/lib/apiGuard';

export async function GET() {
  const guard = await adminGuard();
  if (guard) return guard;
  const sql = requireDb();

  const rows = await sql`
    select id, nama, tahun, kategori, tingkat, foto, deskripsi, published,
           to_char(updated_at, 'YYYY-MM-DD HH24:MI') as updated_at
    from prestasi
    order by created_at desc
  `;
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const guard = await adminGuard();
  if (guard) return guard;
  const sql = requireDb();

  const p = await req.json();
  const nama = String(p.nama || '').trim();
  if (!nama) return NextResponse.json({ error: 'Nama prestasi wajib diisi' }, { status: 400 });

  const rows = await sql`
    insert into prestasi (nama, tahun, kategori, tingkat, foto, deskripsi, published)
    values (
      ${nama}, ${p.tahun || ''}, ${p.kategori || 'Akademik'}, ${p.tingkat || ''},
      ${p.foto || ''}, ${p.deskripsi || ''}, ${p.published !== false}
    )
    returning id
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
