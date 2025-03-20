// app\api\content\announcement-banner\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const id = 1;

  const data = await prisma.announcementBanner.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      content: true,
      color: true,
      visibility: true,
    },
  });

  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const { content, color, visibility } = await request.json();

  const updatedBanner = await prisma.announcementBanner.update({
    where: { id: 1 },
    data: { content, color, visibility },
  });

  return NextResponse.json(updatedBanner);
}
