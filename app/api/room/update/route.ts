// app\api\room\update\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  const { id, title, description, image } = await request.json();

  const updatedRoom = await prisma.room.update({
    where: { id },
    data: { title, description, image },
  });

  return NextResponse.json(updatedRoom);
}
