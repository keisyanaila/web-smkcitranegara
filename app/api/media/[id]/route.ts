import { sql } from '@/lib/db';

// Menyajikan gambar yang di-upload (disimpan base64 di tabel media).
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!sql) return new Response('Not found', { status: 404 });

  try {
    const rows = await sql`select mime, data from media where id = ${id} limit 1`;
    if (rows.length === 0) return new Response('Not found', { status: 404 });

    const bytes = Buffer.from(rows[0].data as string, 'base64');
    return new Response(new Uint8Array(bytes), {
      headers: {
        'Content-Type': (rows[0].mime as string) || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (e) {
    console.error('GET /api/media/[id]', e);
    return new Response('Error', { status: 500 });
  }
}
