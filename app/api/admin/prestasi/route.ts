import { NextResponse } from 'next/server';
import { adminGuard, badBody, errorResponse, readJson, requireDb } from '@/lib/apiGuard';
import { parseAnggota, serializeAnggota } from '@/lib/prestasi';

export async function GET() {
  const guard = await adminGuard();
  if (guard) return guard;

  try {
    const sql = requireDb();
    const rows = await sql`
      select id, nama, tahun, kategori, tingkat, anggota, foto, deskripsi, published,
             to_char(updated_at, 'YYYY-MM-DD HH24:MI') as updated_at
      from prestasi
      order by created_at desc
    `;
    return NextResponse.json(rows.map((r) => ({ ...r, anggota: parseAnggota(r.anggota) })));
  } catch (e) {
    return errorResponse(e, 'GET /api/admin/prestasi');
  }
}

export async function POST(req: Request) {
  const guard = await adminGuard();
  if (guard) return guard;

  const p = await readJson(req);
  if (!p) return badBody();
  const nama = String(p.nama || '').trim();
  if (!nama) return NextResponse.json({ error: 'Nama prestasi wajib diisi' }, { status: 400 });

  try {
    const sql = requireDb();
    const rows = await sql`
      insert into prestasi (nama, tahun, kategori, tingkat, anggota, foto, deskripsi, published)
      values (
        ${nama}, ${String(p.tahun || '')}, ${String(p.kategori || 'Akademik')}, ${String(p.tingkat || '')},
        ${serializeAnggota(p.anggota)},
        ${String(p.foto || '')}, ${String(p.deskripsi || '')}, ${p.published !== false}
      )
      returning id
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (e) {
    return errorResponse(e, 'POST /api/admin/prestasi');
  }
}
