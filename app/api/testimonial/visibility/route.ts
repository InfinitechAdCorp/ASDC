// app\api\testimonial\visibility\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const testimonial = await prisma.testimonial.findUnique({
    where: { id: Number(id) },
  });

  if (!testimonial) {
    return new Response('Testimonial not found', { status: 404 });
  }

  const updatedTestimonial = await prisma.testimonial.update({
    where: { id: Number(id) },
    data: { show: !testimonial.show },
  });

  return NextResponse.json(updatedTestimonial);
}
