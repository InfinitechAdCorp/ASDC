// app\api\reservation\room\route.tsx
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const diveCount = await prisma.diveBooking.count({
    where: { user_id: Number(id) },
  });

  const studentCount = await prisma.student.count({
    where: { user_id: Number(id) },
  });

  const roomCount = await prisma.booking.count({
    where: { user_id: Number(id) },
  });

  return NextResponse.json({ diveCount, studentCount, roomCount });
}
