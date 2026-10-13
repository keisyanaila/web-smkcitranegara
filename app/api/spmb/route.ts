import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { publicJson } from '@/lib/publicCache';
import { SPMB_DEFAULT, SPMB_KEY, normalizeSpmb, validateSpmb } from '@/lib/spmbData';

// Jadwal SPMB untuk halaman publik. Diatur dari /admin/spmb.
// Belum ada data / DB belum siap / data rusak -> pakai jadwal bawaan.
export async function GET() {
  if (sql) {
    try {
      const rows = await sql`select nilai from pengaturan where kunci = ${SPMB_KEY} limit 1`;
      if (rows.length > 0) {
        const data = normalizeSpmb(JSON.parse(String(rows[0].nilai || '{}')));
        if (validateSpmb(data).length === 0) return publicJson(data);
      }
    } catch (e) {
      console.error('GET /api/spmb', e);
      // 503 (tidak di-cache): browser tetap memakai data terakhir / data bawaan, lalu mencoba lagi.
      return NextResponse.json({ error: 'Database sedang tidak bisa diakses' }, { status: 503 });
    }
  }
  return publicJson(SPMB_DEFAULT);
}
