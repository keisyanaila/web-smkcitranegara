import { NextResponse } from 'next/server';
import { adminGuard, requireDb, slugify } from '@/lib/apiGuard';

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (guard) return guard;
  const sql = requireDb();
  const { id } = await ctx.params;

  const b = await req.json();
  const judul = String(b.judul || '').trim();
  if (!judul) return NextResponse.json({ error: 'Judul wajib diisi' }, { status: 400 });

  let slug = String(b.slug || '').trim() || slugify(judul);
  const clash = await sql`select 1 from berita where slug = ${slug} and id <> ${id} limit 1`;
  if (clash.length > 0) slug = `${slug}-${Date.now().toString(36)}`;

  const rows = await sql`
    update berita set
      slug = ${slug},
      judul = ${judul},
      tanggal = coalesce(${b.tanggal || null}::date, tanggal),
      kategori = ${b.kategori || 'Kegiatan'},
      penulis = ${b.penulis || 'Humas SMK Citra Negara'},
      gambar = ${b.gambar || ''},
      ringkasan = ${b.ringkasan || ''},
      konten = ${b.konten || ''},
      published = ${b.published !== false},
      updated_at = now()
    where id = ${id}
    returning id, slug
  `;
  if (rows.length === 0) return NextResponse.json({ error: 'Tidak ditemukan' }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await adminGuard();
  if (guard) return guard;
  const sql = requireDb();
  const { id } = await ctx.params;

  await sql`delete from berita where id = ${id}`;
  return NextResponse.json({ ok: true });
}
