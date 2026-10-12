import { NextResponse } from 'next/server';
import { adminGuard, badBody, errorResponse, readJson, requireDb } from '@/lib/apiGuard';

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (guard) return guard;
  const { id } = await ctx.params;

  const b = await readJson(req);
  if (!b) return badBody();
  const nama = String(b.nama || '').trim();
  if (!nama) return NextResponse.json({ error: 'Nama wajib diisi' }, { status: 400 });

  try {
    const sql = requireDb();
    const rows = await sql`
      update staf set
        nama = ${nama},
        jabatan = ${String(b.jabatan || '').trim()},
        kategori = ${String(b.kategori || 'Guru')},
        foto = ${String(b.foto || '')},
        published = ${b.published !== false},
        updated_at = now()
      where id = ${id}
      returning id
    `;
    if (rows.length === 0) return NextResponse.json({ error: 'Data tidak ditemukan (mungkin sudah dihapus)' }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (e) {
    return errorResponse(e, 'PUT /api/admin/staf/[id]');
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (guard) return guard;
  const { id } = await ctx.params;

  try {
    const sql = requireDb();
    const rows = await sql`delete from staf where id = ${id} returning id`;
    if (rows.length === 0) return NextResponse.json({ error: 'Data tidak ditemukan (mungkin sudah dihapus)' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e, 'DELETE /api/admin/staf/[id]');
  }
}
