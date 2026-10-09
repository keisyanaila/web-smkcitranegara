import { NextResponse } from 'next/server';
import { adminGuard, badBody, errorResponse, readJson, requireDb } from '@/lib/apiGuard';
import { serializeAnggota } from '@/lib/prestasi';

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (guard) return guard;
  const { id } = await ctx.params;

  const p = await readJson(req);
  if (!p) return badBody();
  const nama = String(p.nama || '').trim();
  if (!nama) return NextResponse.json({ error: 'Nama prestasi wajib diisi' }, { status: 400 });

  try {
    const sql = requireDb();
    const rows = await sql`
      update prestasi set
        nama = ${nama},
        tahun = ${String(p.tahun || '')},
        kategori = ${String(p.kategori || 'Akademik')},
        tingkat = ${String(p.tingkat || '')},
        anggota = ${serializeAnggota(p.anggota)},
        foto = ${String(p.foto || '')},
        deskripsi = ${String(p.deskripsi || '')},
        published = ${p.published !== false},
        updated_at = now()
      where id = ${id}
      returning id
    `;
    if (rows.length === 0) return NextResponse.json({ error: 'Prestasi tidak ditemukan (mungkin sudah dihapus)' }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (e) {
    return errorResponse(e, 'PUT /api/admin/prestasi/[id]');
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (guard) return guard;
  const { id } = await ctx.params;

  try {
    const sql = requireDb();
    const rows = await sql`delete from prestasi where id = ${id} returning id`;
    if (rows.length === 0) return NextResponse.json({ error: 'Prestasi tidak ditemukan (mungkin sudah dihapus)' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e, 'DELETE /api/admin/prestasi/[id]');
  }
}
