import { NextResponse } from 'next/server';
import { adminGuard, badBody, errorResponse, readJson, requireDb, slugify } from '@/lib/apiGuard';

export async function GET() {
  const guard = await adminGuard();
  if (guard) return guard;

  try {
    const sql = requireDb();
    const rows = await sql`
      select id, slug, judul, to_char(tanggal, 'YYYY-MM-DD') as tanggal,
             kategori, penulis, gambar, ringkasan, konten, published,
             to_char(updated_at, 'YYYY-MM-DD HH24:MI') as updated_at
      from berita
      order by tanggal desc, created_at desc
    `;
    return NextResponse.json(rows);
  } catch (e) {
    return errorResponse(e, 'GET /api/admin/berita');
  }
}

export async function POST(req: Request) {
  const guard = await adminGuard();
  if (guard) return guard;

  const b = await readJson(req);
  if (!b) return badBody();
  const judul = String(b.judul || '').trim();
  if (!judul) return NextResponse.json({ error: 'Judul wajib diisi' }, { status: 400 });

  try {
    const sql = requireDb();
    let slug = slugify(String(b.slug || '').trim() || judul) || `berita-${Date.now().toString(36)}`;
    // pastikan unik
    const exists = await sql`select 1 from berita where slug = ${slug} limit 1`;
    if (exists.length > 0) slug = `${slug}-${Date.now().toString(36)}`;

    const rows = await sql`
      insert into berita (slug, judul, tanggal, kategori, penulis, gambar, ringkasan, konten, published)
      values (
        ${slug}, ${judul},
        coalesce(${b.tanggal || null}::date, current_date),
        ${String(b.kategori || 'Kegiatan')},
        ${String(b.penulis || 'Humas SMK Citra Negara')},
        ${String(b.gambar || '')}, ${String(b.ringkasan || '')}, ${String(b.konten || '')},
        ${b.published !== false}
      )
      returning id, slug
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (e) {
    return errorResponse(e, 'POST /api/admin/berita');
  }
}
