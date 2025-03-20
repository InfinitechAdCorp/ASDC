// app\api\auth\admin\logout\route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  response.cookies.set('AdminVerified', 'False', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'strict',
  });

  return response;
}
