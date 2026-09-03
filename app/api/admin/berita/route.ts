import { NextResponse } from 'next/server';
import { adminGuard, requireDb, slugify } from '@/lib/apiGuard';

export async function GET() {
  const guard = await adminGuard();
  if (guard) return guard;
  const sql = requireDb();

  const rows = await sql`
    select id, slug, judul, to_char(tanggal, 'YYYY-MM-DD') as tanggal,
           kategori, penulis, gambar, ringkasan, konten, published,
           to_char(updated_at, 'YYYY-MM-DD HH24:MI') as updated_at
    from berita
    order by tanggal desc, created_at desc
  `;
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const guard = await adminGuard();
  if (guard) return guard;
  const sql = requireDb();

  const b = await req.json();
  const judul = String(b.judul || '').trim();
  if (!judul) return NextResponse.json({ error: 'Judul wajib diisi' }, { status: 400 });

  let slug = String(b.slug || '').trim() || slugify(judul);
  // pastikan unik
  const exists = await sql`select 1 from berita where slug = ${slug} limit 1`;
  if (exists.length > 0) slug = `${slug}-${Date.now().toString(36)}`;

  const rows = await sql`
    insert into berita (slug, judul, tanggal, kategori, penulis, gambar, ringkasan, konten, published)
    values (
      ${slug}, ${judul},
      ${b.tanggal || null}::date,
      ${b.kategori || 'Kegiatan'},
      ${b.penulis || 'Humas SMK Citra Negara'},
      ${b.gambar || ''}, ${b.ringkasan || ''}, ${b.konten || ''},
      ${b.published !== false}
    )
    returning id, slug
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
