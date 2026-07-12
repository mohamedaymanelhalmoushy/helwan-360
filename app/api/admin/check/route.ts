import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookie = cookies().get('admin_session');
  const authenticated = cookie?.value === '1';
  return NextResponse.json({ authenticated });
}
