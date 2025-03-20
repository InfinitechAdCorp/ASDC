import nodemailer from 'nodemailer';
import { render } from '@react-email/render';

import prisma from '@/app/lib/prisma';
import { DiveReminderEmail } from '@/emails/upcoming-dive-email';

export const runtime = 'nodejs';

const now = new Date();
const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

export async function GET() {
  try {
    const upcomingBookings = await prisma.diveBooking.findMany({
      where: {
        date: {
          gte: now.toISOString(),
          lte: threeDaysFromNow.toISOString(),
        },
      },
      select:{
        id: true,
        name: true,
        email: true,
        date: true,
        level: true,
      }
    });

    console.log('Upcoming bookings within 3 days:', upcomingBookings);

    if (!upcomingBookings.length) {
      return new Response(
        JSON.stringify({ message: 'No upcoming bookings.' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const emailPromises = upcomingBookings.map(async (booking) => {
      const email = booking.email;

      const emailHtml = await render(
        DiveReminderEmail({
          fullname: booking.name,
          start_date: booking.date.toISOString(),
          level: booking.level,
        }),
      );

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Reminder: Your Dive is Approaching!',
        html: emailHtml,
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);

    return new Response(
      JSON.stringify({
        message: `Sent notifications for ${upcomingBookings.length} bookings.`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error sending emails:', error);

    return new Response(
      JSON.stringify({ error: 'Failed to send notifications' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
