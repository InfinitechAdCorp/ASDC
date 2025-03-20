// app\api\certification\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { user_id, type } = await request.json();

  const certificate = await prisma.certificate.create({
    data: { user_id, type },
  });

  return NextResponse.json(certificate);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const certificate = await prisma.certificate.findMany({
      where: { user_id: Number(id) },
      select: {
        id: true,
        user_id: true,
        type: true,
        date_issued: true,
        user: {
          select: {
            first_name: true, 
            last_name: true,
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { message: 'Certification not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(certificate);
  }

  const certificate = await prisma.certificate.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      user_id: true,
      type: true,
      date_issued: true,
      user: { 
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  });

  return NextResponse.json(certificate);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id')!;

  await prisma.certificate.delete({
    where: { id },
  });

  return NextResponse.json(200);
}

