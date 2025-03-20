// src\app\api\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const room = await prisma.room.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
      },
    });

    if (!room) {
      return NextResponse.json({ message: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room);
  }
  const rooms = await prisma.room.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
    },
  });

  return NextResponse.json(rooms);
}
