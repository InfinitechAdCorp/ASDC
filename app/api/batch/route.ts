// app\api\batch\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { name, product_id, start_date, end_date } = await request.json();

  await prisma.batch.create({
    data: {
      name,
      product_id,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
    },
  });

  return new NextResponse(null, { status: 201 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const batches = await prisma.batch.findMany({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        product: true,
        students: {
          select: {
            id: true,
            user_id: true,
            batch_id: true,
            created_at: true,
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
              },
            },
          },
        },
        start_date: true,
        end_date: true,
        created_at: true,
      },
    });

    if (!batches) {
      return NextResponse.json(
        { message: 'Reservation not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(batches);
  }

  const batches = await prisma.batch.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      name: true,
      product: true,
      students: true,
      start_date: true,
      end_date: true,
      created_at: true,
    },
  });

  return NextResponse.json(batches);
}
