// app\api\reservation\room\route.tsx
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const bookings = await prisma.booking.findMany({
    where: { user_id: Number(id) },
    select: {
      id: true,
      user_id: true,
      room_id: true,
      fullname: true,
      guest: true,
      status: true,
      start_date: true,
      end_date: true,
      created_at: true,
    },
  });

  return NextResponse.json(bookings);
}
