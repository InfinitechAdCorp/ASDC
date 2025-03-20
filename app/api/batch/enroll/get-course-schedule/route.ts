// app\api\batch\enroll\get-course-schedule\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const products = await prisma.product.findMany({
    where: { id: Number(id) },
    select: {
      id: true,
      batch: true,
    },
  });

  return NextResponse.json(products);
}
