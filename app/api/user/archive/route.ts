// app\api\user\archive\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export async function PUT(request: Request) {
  const { userId } = await request.json();
  const archivedUser = await prisma.user.update({
    where: { id: userId },
    data: { is_archived: true },
  });

  return NextResponse.json(archivedUser);
}
