// app/api/room/create/route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  const { title, description, image } = await request.json();

  try {
    const newRoom = await prisma.room.create({
      data: {
        title,
        description,
        image,
      },
    });

    return NextResponse.json(newRoom, { status: 201 });
  } catch (error) {
    console.error('Error creating room:', error);

    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 },
    );
  }
}
