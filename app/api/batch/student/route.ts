// app\api\batch\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const students = await prisma.student.findMany({
    where: { batch_id: Number(id) },
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      user_id: true,
      batch_id: true,
    },
  });

  return NextResponse.json({
    message: 'Student Enrolled in Batch',
    batch_id: id,
    students,
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  await prisma.student.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(200);
}
