import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const enrolledCourse = await prisma.student.findMany({
    where: { user_id: Number(id) },
    select: {
      id: true,
      user_id: true,
      batch: {
        select: {
          id: true,
          name: true,
          product_id: true,
          start_date: true,
          end_date: true,
          created_at: true,
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(enrolledCourse);
}
