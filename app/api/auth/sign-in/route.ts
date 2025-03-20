// src/app/api/auth/sign-in/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: 'Invalid email or password.' },
        { status: 401 },
      );
    }

    if (!user || user.is_verified == false) {
      return NextResponse.json(
        { message: 'Check your inbox for the verification link.' },
        { status: 401 },
      );
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
