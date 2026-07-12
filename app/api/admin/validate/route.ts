import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const password = typeof body.password === 'string' ? body.password : '';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'university360';

  if (!password) {
    return NextResponse.json({ authenticated: false, message: 'Password is required.' }, { status: 400 });
  }

  const authenticated = password === adminPassword;
  const response = NextResponse.json({ authenticated });

  if (authenticated) {
    response.cookies.set('admin_session', '1', {
      path: '/',
      maxAge: 60 * 60 * 8,
      httpOnly: true,
    });
  }

  return response;
}
