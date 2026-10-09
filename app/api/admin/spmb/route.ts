import { NextResponse } from 'next/server';
import { adminGuard, badBody, errorResponse, readJson, requireDb } from '@/lib/apiGuard';
import { SPMB_DEFAULT, SPMB_KEY, normalizeSpmb, validateSpmb } from '@/lib/spmbData';

// Data jadwal SPMB untuk form admin. `sumber` memberi tahu apakah data sudah
// pernah disimpan ('database') atau masih jadwal bawaan dari kode ('bawaan').
export async function GET() {
  const guard = await adminGuard();
  if (guard) return guard;

  try {
    const sql = requireDb();
    const rows = await sql`
      select nilai, to_char(updated_at, 'YYYY-MM-DD HH24:MI') as updated_at
      from pengaturan where kunci = ${SPMB_KEY} limit 1
    `;
    if (rows.length === 0) return NextResponse.json({ ...SPMB_DEFAULT, sumber: 'bawaan' });
    let parsed: unknown = {};
    try { parsed = JSON.parse(String(rows[0].nilai || '{}')); } catch { /* data rusak -> bawaan */ }
    const data = normalizeSpmb(parsed);
    if (validateSpmb(data).length > 0) return NextResponse.json({ ...SPMB_DEFAULT, sumber: 'bawaan' });
    return NextResponse.json({ ...data, sumber: 'database', updatedAt: rows[0].updated_at });
  } catch (e) {
    return errorResponse(e, 'GET /api/admin/spmb');
  }
}

export async function PUT(req: Request) {
  const guard = await adminGuard();
  if (guard) return guard;

  const body = await readJson(req);
  if (!body) return badBody();
  const data = normalizeSpmb(body);
  const errors = validateSpmb(data);
  if (errors.length > 0) return NextResponse.json({ error: errors.join(' '), errors }, { status: 400 });

  try {
    const sql = requireDb();
    const rows = await sql`
      insert into pengaturan (kunci, nilai, updated_at)
      values (${SPMB_KEY}, ${JSON.stringify(data)}, now())
      on conflict (kunci) do update set nilai = excluded.nilai, updated_at = now()
      returning to_char(updated_at, 'YYYY-MM-DD HH24:MI') as updated_at
    `;
    return NextResponse.json({ ...data, sumber: 'database', updatedAt: rows[0].updated_at });
  } catch (e) {
    return errorResponse(e, 'PUT /api/admin/spmb');
  }
}
