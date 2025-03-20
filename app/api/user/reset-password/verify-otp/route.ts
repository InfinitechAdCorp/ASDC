import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { otp_pin: true, otp_expiry: true },
    });

    if (!user || user.otp_pin !== otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 401 });
    }

    // Check if OTP has expired
    if (!user.otp_expiry || new Date() > new Date(user.otp_expiry)) {
      return NextResponse.json({ message: 'OTP Expired.' }, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
