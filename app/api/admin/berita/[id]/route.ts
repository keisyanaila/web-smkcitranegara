import { NextResponse } from 'next/server';
import { adminGuard, badBody, errorResponse, readJson, requireDb, slugify } from '@/lib/apiGuard';

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (guard) return guard;
  const { id } = await ctx.params;

  const b = await readJson(req);
  if (!b) return badBody();
  const judul = String(b.judul || '').trim();
  if (!judul) return NextResponse.json({ error: 'Judul wajib diisi' }, { status: 400 });

  try {
    const sql = requireDb();
    let slug = slugify(String(b.slug || '').trim() || judul) || `berita-${Date.now().toString(36)}`;
    const clash = await sql`select 1 from berita where slug = ${slug} and id <> ${id} limit 1`;
    if (clash.length > 0) slug = `${slug}-${Date.now().toString(36)}`;

    const rows = await sql`
      update berita set
        slug = ${slug},
        judul = ${judul},
        tanggal = coalesce(${b.tanggal || null}::date, tanggal),
        kategori = ${String(b.kategori || 'Kegiatan')},
        penulis = ${String(b.penulis || 'Humas SMK Citra Negara')},
        gambar = ${String(b.gambar || '')},
        ringkasan = ${String(b.ringkasan || '')},
        konten = ${String(b.konten || '')},
        published = ${b.published !== false},
        updated_at = now()
      where id = ${id}
      returning id, slug
    `;
    if (rows.length === 0) return NextResponse.json({ error: 'Berita tidak ditemukan (mungkin sudah dihapus)' }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (e) {
    return errorResponse(e, 'PUT /api/admin/berita/[id]');
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (guard) return guard;
  const { id } = await ctx.params;

  try {
    const sql = requireDb();
    const rows = await sql`delete from berita where id = ${id} returning id`;
    if (rows.length === 0) return NextResponse.json({ error: 'Berita tidak ditemukan (mungkin sudah dihapus)' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e, 'DELETE /api/admin/berita/[id]');
  }
}
