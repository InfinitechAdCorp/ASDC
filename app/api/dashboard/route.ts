//app\api\dashboard\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const userCount = await prisma.user.count();
  const bookingCount = await prisma.booking.count();
  const roomCount = await prisma.room.count();
  const productCount = await prisma.product.count();

  const recentBooking = await prisma.booking.findMany({
    take: 3,
    orderBy: {
      created_at: 'desc',
    },
  });

  return NextResponse.json({
    userCount,
    bookingCount,
    roomCount,
    productCount,
    recentBooking,
  });
}
