// app\api\reservation\room\route.tsx
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const diveBookings = await prisma.diveBooking.findMany({
    where: { user_id: Number(id) },
    select: {
      id: true,
      user_id: true,
      name: true,
      email: true,
      status: true,
      date: true,
      time: true,
      participant: true,
      level: true,
      message: true,
      created_at: true,
      updated_at: true,
    },
  });

  return NextResponse.json(diveBookings);
}
