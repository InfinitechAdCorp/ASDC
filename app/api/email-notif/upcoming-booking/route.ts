import nodemailer from 'nodemailer';
import { render } from '@react-email/render';


import prisma from '@/app/lib/prisma';
import { BookingReminderEmail } from '@/emails/upcoming-booking-email';

export const runtime = 'nodejs';

const now = new Date();
const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

export async function GET() {
  try {
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        start_date: {
          gte: now.toISOString(),
          lte: threeDaysFromNow.toISOString(),
        },
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    console.log('Upcoming dive bookings within 3 days:', upcomingBookings);

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
      const userEmail = booking.user?.email;

      if (!userEmail) {
        console.warn(`No email found for user ID: ${booking.user_id}`);

        return; // Skip sending the email if no user email exists
      }

      const emailHtml = await render(
        BookingReminderEmail({
          fullname: booking.fullname,
          start_date: booking.start_date.toISOString(),
          end_date: booking.end_date.toISOString(),
        }),
      );

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: userEmail,
        subject: 'Reminder: Your Booking is Approaching!',
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
