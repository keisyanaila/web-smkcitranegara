import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, COOKIE_OPTS, adminConfigured, checkPassword, makeToken } from '@/lib/adminAuth';

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD belum di-set di .env.local' },
      { status: 500 },
    );
  }

  let password = '';
  try {
    const body = await req.json();
    password = String(body?.password ?? '');
  } catch {
    /* ignore */
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: 'Password salah' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeToken(), COOKIE_OPTS);
  return res;
}
