// app\api\faq\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { question, answer } = await request.json();

  const faq = await prisma.fAQ.create({
    data: { question, answer },
  });

  return NextResponse.json(faq);
}

export async function GET() {
  const faq = await prisma.fAQ.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      question: true,
      answer: true,
      created_at: true,
      updated_at: true,
    },
  });

  return NextResponse.json(faq);
}

export async function PATCH(request: Request) {
  const { id, question, answer } = await request.json();

  await prisma.fAQ.update({
    where: { id },
    data: { question, answer },
  });

  return NextResponse.json(200);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.fAQ.delete({
    where: { id },
  });

  return NextResponse.json(200);
}
