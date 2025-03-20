// app\api\bookings\dive\route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function GET() {
  const diveBooking = await prisma.diveBooking.findMany();

  return NextResponse.json(diveBooking);
}

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');

//   if (id) {
//     const bookings = await prisma.booking.findMany({
//       where: { user_id: Number(id) },
//       select: {
//         id: true,
//         user_id: true,
//         room_id: true,
//         fullname: true,
//         guest: true,
//         status: true,
//         start_date: true,
//         end_date: true,
//         created_at: true,
//       },
//     });

//     if (!bookings) {
//       return NextResponse.json({ message: 'Reservation not found' }, { status: 404 });
//     }

//     return NextResponse.json(bookings);
//   }

//   const bookings = await prisma.booking.findMany({
//     orderBy: {
//       id: 'asc',
//     },
//     select: {
//         id: true,
//         user_id: true,
//         room_id: true,
//         fullname: true,
//         guest: true,
//         status: true,
//         start_date: true,
//         end_date: true,
//         created_at: true,
//       },
//   });

//   return NextResponse.json(bookings);
// }

export async function POST(req: Request) {
  const {
    user_id,
    name,
    email,
    status,
    date,
    time,
    participant,
    level,
    message,
  } = await req.json();

  const diveBooking = await prisma.diveBooking.create({
    data: {
      user_id,
      name,
      email,
      status,
      date: new Date(date),
      time,
      participant,
      level,
      message,
    },
  });

  return new Response(JSON.stringify(diveBooking), { status: 201 });
}

export async function PATCH(request: Request) {
  try {
    const { booking_id, action } = await request.json();  // Expecting action: "approve" or "decline"
    console.log("🔹 Received booking_id:", booking_id, "Action:", action);

    // **Fetch dive booking details and include user email**
    const booking = await prisma.diveBooking.update({
      where: { id: booking_id },
      data: { status: action === 'approve' ? 'Approved' : 'Declined' }, // Update status based on action
      include: {
        user: { select: { email: true } }, // Fetch email from related user
      },
    });

    console.log("✅ Booking Status Updated:", booking);

    if (!booking || !booking.user || !booking.user.email) {
      return NextResponse.json({ error: 'Booking or user email not found' }, { status: 404 });
    }

    const userEmail = booking.user.email;
    console.log("📩 User Email:", userEmail);

    // **Send Email Notification**
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // **Create appropriate email content based on action**
    const subject = action === 'approve' ? 'Booking Approved ✅' : 'Booking Declined ❌';
    const statusMessage = action === 'approve'
      ? `<p>Your diving booking on <strong>${new Date(booking.date).toLocaleDateString()}</strong> at <strong>${booking.time}</strong> has been <strong>approved</strong>.</p>`
      : `<p>Your diving booking on <strong>${new Date(booking.date).toLocaleDateString()}</strong> at <strong>${booking.time}</strong> has been <strong>declined</strong>.</p>`;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: userEmail, // Use fetched email
      subject: subject,
      html: `<p>Dear ${booking.name},</p>
             ${statusMessage}
             <p>Thank you for choosing us! If you have any questions, please contact us.</p>
             <br/>
             <p>Best regards,</p>
             <p>Your Dive Center Team</p>`,
    };

    // Send the email and log success or failure
    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully!");
    } catch (mailError) {
      console.error("❌ Error sending email:", mailError);
    }

    return NextResponse.json({ message: 'Success! Email sent.' });
  } catch (error) {
    console.error("❌ Error processing request:", error);
    return NextResponse.json({ error: 'Failed to process booking or send email.' }, { status: 500 });
  }
}