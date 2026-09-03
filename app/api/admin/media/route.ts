import { NextResponse } from 'next/server';
import { adminGuard, requireDb } from '@/lib/apiGuard';

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB
const OK_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

// Upload gambar dari form admin. Terima multipart/form-data field "file".
// Disimpan sebagai base64 di tabel `media`. Balikan { url } -> "/api/media/<id>".
export async function POST(req: Request) {
  const guard = await adminGuard();
  if (guard) return guard;

  const sql = requireDb();

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Field "file" tidak ada' }, { status: 400 });
  }
  if (!OK_MIME.includes(file.type)) {
    return NextResponse.json({ error: 'Format harus JPG/PNG/WEBP/GIF/AVIF' }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > MAX_BYTES) {
    return NextResponse.json({ error: 'Ukuran maksimal 4 MB' }, { status: 400 });
  }

  const rows = await sql`
    insert into media (filename, mime, data, size)
    values (${file.name || 'upload'}, ${file.type}, ${buf.toString('base64')}, ${buf.length})
    returning id
  `;

  return NextResponse.json({ url: `/api/media/${rows[0].id}` });
}
