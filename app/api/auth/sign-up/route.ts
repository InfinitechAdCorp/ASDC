// src/app/api/auth/sign-up/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';

import prisma from '@/app/lib/prisma';
import { SignupConfirmationEmail } from '@/emails/signup-confirmation-email';


export async function POST(req: Request) {
  const { email, first_name, last_name, password } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const emailHtml = await render(
    SignupConfirmationEmail({
      first_name: first_name,
      last_name: last_name,
      email: email,
    }),
  );

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 },
      );
    }

    const user = await prisma.user.create({
      data: { email, first_name, last_name, password },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Hi, please verify your ASDC account',
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ message: 'Success', user }, { status: 200 });
  } catch (error) {
    console.error('Error creating user:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') || undefined;

  await prisma.user.update({
    where: { email },
    data: { is_verified: true },
  });

  return NextResponse.json(200);
}
