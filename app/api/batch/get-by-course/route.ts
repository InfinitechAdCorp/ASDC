// app\api\batch\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      image: true,
      batch: true,
    },
  });

  return NextResponse.json(products);
}
