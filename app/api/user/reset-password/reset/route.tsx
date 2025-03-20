import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';

import prisma from '@/app/lib/prisma';
import { ResetPasswordSuccessEmail } from '@/emails/reset-password-sucess-email';

export async function PATCH(request: Request) {
  const { email, otp, newPassword } = await request.json();

  // Create nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  try {
    // Fetch user data and check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { first_name: true, last_name: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Email does not exist' },
        { status: 400 },
      );
    }

    const emailHtml = await render(
      ResetPasswordSuccessEmail({
        first_name: user.first_name,
        last_name: user.last_name,
      }),
    );

    // Define email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Change Confirmation for Anilao Scuba Dive Center',
      html: emailHtml,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);

    // Update user password
    await prisma.user.update({
      where: { email, otp_pin: otp },
      data: {
        password: newPassword,
      },
    });

    return NextResponse.json(
      { message: 'Password reset sucess' },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error occurred:', error.message);

      return NextResponse.json(
        { message: 'Error occurred', error: error.message },
        { status: 500 },
      );
    } else {
      console.error('Unexpected error:', error);

      return NextResponse.json(
        { message: 'Unexpected error occurred', error },
        { status: 500 },
      );
    }
  }
}
