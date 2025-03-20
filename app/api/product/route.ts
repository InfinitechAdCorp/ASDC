// src\app\api\route.ts
import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        price: true,
        image: true,
      },
    });

    if (!product) {
      return NextResponse.json({ message: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  }
  const products = await prisma.product.findMany({
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      price: true,
      image: true,
    },
  });

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const { name, description, category, price, image } = await request.json();

  const createProduct = await prisma.product.create({
    data: { name, description, category, price, image },
  });

  return NextResponse.json(createProduct);
}

export async function PUT(request: Request) {
  const { id, name, description, category, price, image } =
    await request.json();

  const updateProduct = await prisma.product.update({
    where: { id },
    data: { name, description, category, price, image },
  });

  return NextResponse.json(updateProduct);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  await prisma.product.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ status: 200 });
}
