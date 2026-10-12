import { NextResponse } from 'next/server';
import { adminGuard, badBody, errorResponse, readJson, requireDb } from '@/lib/apiGuard';

export async function GET() {
  const guard = await adminGuard();
  if (guard) return guard;

  try {
    const sql = requireDb();
    const rows = await sql`
      select id, nama, jabatan, kategori, foto, published,
             to_char(updated_at, 'YYYY-MM-DD HH24:MI') as updated_at
      from staf
      order by lower(nama)
    `;
    return NextResponse.json(rows);
  } catch (e) {
    return errorResponse(e, 'GET /api/admin/staf');
  }
}

export async function POST(req: Request) {
  const guard = await adminGuard();
  if (guard) return guard;

  const b = await readJson(req);
  if (!b) return badBody();
  const nama = String(b.nama || '').trim();
  if (!nama) return NextResponse.json({ error: 'Nama wajib diisi' }, { status: 400 });

  try {
    const sql = requireDb();
    const rows = await sql`
      insert into staf (nama, jabatan, kategori, foto, published)
      values (
        ${nama}, ${String(b.jabatan || '').trim()}, ${String(b.kategori || 'Guru')},
        ${String(b.foto || '')}, ${b.published !== false}
      )
      returning id
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (e) {
    return errorResponse(e, 'POST /api/admin/staf');
  }
}
