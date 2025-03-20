// app\api\testimonial\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        body: true,
        fullname: true,
        show: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!testimonial) {
      return NextResponse.json(
        { message: 'Testimonial not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(testimonial);
  }
  const testimonials = await prisma.testimonial.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      title: true,
      body: true,
      fullname: true,
      show: true,
      created_at: true,
      updated_at: true,
    },
  });

  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const { title, body, fullname } = await request.json();

  const createTestimonial = await prisma.testimonial.create({
    data: { title, body, fullname },
  });

  return NextResponse.json(createTestimonial);
}

export async function PATCH(request: Request) {
  const { title, body, fullname } = await request.json();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  await prisma.testimonial.update({
    where: { id: Number(id) },
    data: { title, body, fullname },
  });

  return NextResponse.json('Testimonial update success!');
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  await prisma.testimonial.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json('Testimonial delete success!');
}
