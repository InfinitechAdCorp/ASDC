// app\api\batch\enroll\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { user_id, batch_id } = await request.json();

  await prisma.student.create({
    data: { user_id, batch_id },
  });

  return new NextResponse(null, { status: 201 });
}
