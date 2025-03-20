// app\api\contact-form\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { email, name, message } = await request.json();

  const contactForm = await prisma.contactForm.create({
    data: { email, name, message },
  });

  return NextResponse.json(contactForm);
}

export async function GET() {
  const contactForm = await prisma.contactForm.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      email: true,
      name: true,
      message: true,
      createdAt: true,
    },
  });

  return NextResponse.json(contactForm);
}
