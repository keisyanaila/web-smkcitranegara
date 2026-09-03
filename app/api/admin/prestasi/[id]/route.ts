import { NextResponse } from 'next/server';
import { adminGuard, requireDb } from '@/lib/apiGuard';
import { serializeAnggota } from '@/lib/prestasi';

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (guard) return guard;
  const sql = requireDb();
  const { id } = await ctx.params;

  const p = await req.json();
  const nama = String(p.nama || '').trim();
  if (!nama) return NextResponse.json({ error: 'Nama prestasi wajib diisi' }, { status: 400 });

  const rows = await sql`
    update prestasi set
      nama = ${nama},
      tahun = ${p.tahun || ''},
      kategori = ${p.kategori || 'Akademik'},
      tingkat = ${p.tingkat || ''},
      anggota = ${serializeAnggota(p.anggota)},
      foto = ${p.foto || ''},
      deskripsi = ${p.deskripsi || ''},
      published = ${p.published !== false},
      updated_at = now()
    where id = ${id}
    returning id
  `;
  if (rows.length === 0) return NextResponse.json({ error: 'Tidak ditemukan' }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (guard) return guard;
  const sql = requireDb();
  const { id } = await ctx.params;

  await sql`delete from prestasi where id = ${id}`;
  return NextResponse.json({ ok: true });
}
