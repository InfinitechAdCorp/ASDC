import nodemailer from 'nodemailer';
import { render } from '@react-email/render';


import prisma from '@/app/lib/prisma';
import { ClassReminderEmail } from '@/emails/upcoming-class-email';

export const runtime = 'nodejs';

const now = new Date();
const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

export async function GET() {
  try {
    const upcomingBookings = await prisma.batch.findMany({
      where: {
        start_date: {
          gte: now.toISOString(),
          lte: threeDaysFromNow.toISOString(),
        },
      },
      select: {
        id: true,
        name: true,
        product:{
          select: {
            name: true,
            category: true,
          },
        },
        students: {
          select: {
            id: true,
            user_id: true,
            batch_id: true,
            created_at: true,
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
              },
            },
          },
        },
        start_date: true,
        end_date: true,
        created_at: true,
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
      try {
        const userEmails = booking.students.map(student => student.user.email);
        const fullNames = booking.students.map(student => `${student.user.first_name} ${student.user.last_name}`).join(', ');
        const category = `${booking.product.name} - ${booking.product.category}`;
    
        const emailHtml = await render(
          ClassReminderEmail({
            fullname: fullNames,
            start_date: booking.start_date.toISOString(),
            class_name: booking.name,
            category: category,
          }),
        );
    
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: userEmails,
          subject: 'Reminder: Your Diving Class is Approaching!',
          html: emailHtml,
        };
    
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error(`Error sending email for booking ${booking.id}:`, emailError);
      }
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
