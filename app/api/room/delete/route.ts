// app\api\room\delete\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const deleteRoom = await prisma.room.delete({
    where: { id },
  });

  return NextResponse.json(deleteRoom);
}
