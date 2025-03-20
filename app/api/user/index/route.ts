// app/api/user/route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const users = await prisma.user.findMany({
    where: {
      is_archived: false,
    },
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      avatar: true,
      first_name: true,
      last_name: true,
      email: true,
      is_archived: true,
      is_verified: true,
      created_at: true,
      updated_at: true,
    },
  });

  return NextResponse.json(users);
}
