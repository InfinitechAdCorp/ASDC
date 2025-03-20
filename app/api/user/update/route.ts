// app\api\user\update\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export async function PUT(request: Request) {
  const { id, avatar, first_name, last_name, email, password } =
    await request.json();

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { avatar, first_name, last_name, email, password },
  });

  return NextResponse.json(updatedUser);
}
