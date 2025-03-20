// app\api\auth\admin\route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });

    response.cookies.set('AdminVerified', 'True', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
    });

    return response;
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
