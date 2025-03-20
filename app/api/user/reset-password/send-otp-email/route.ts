import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';

import prisma from '@/app/lib/prisma';
import { ResetPasswordEmail } from '@/emails/reset-password-email';

export async function PATCH(request: Request) {
  const { email } = await request.json();

  // Create OTP expiration time
  const generateOtp = Math.floor(100000 + Math.random() * 900000);
  // Create OTP expiration time
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

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
      ResetPasswordEmail({
        first_name: user.first_name,
        last_name: user.last_name,
        reset_pin: generateOtp,
      }),
    );

    // Define email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: '6-Digit PIN for Your Anilao Scuba Dive Center Password Reset',
      html: emailHtml,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);

    // Update user OTP and expiry time in the database
    await prisma.user.update({
      where: { email },
      data: {
        otp_pin: generateOtp,
        otp_expiry: otpExpiry,
      },
    });

    return NextResponse.json(
      { message: 'OTP sent successfully' },
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
