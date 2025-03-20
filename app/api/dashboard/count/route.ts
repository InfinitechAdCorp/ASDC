import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch counts in a single transaction
    const [
      testimonialCount,
      faqCount,
      userCount,
      certificateCount,
      productCount,
      batchCount,
      roomCount,
      roomBookingCount,
      diveCount,
    ] = await prisma.$transaction([
      prisma.testimonial.count({
        where: { show: true }, // ✅ Count only testimonials where `show` is true
      }),
      prisma.fAQ.count(),
      prisma.user.count({
        where: { is_archived: false }, // ✅ Exclude archived users
      }),
      prisma.certificate.count(),
      prisma.product.count(),
      prisma.batch.count(),
      prisma.room.count(),
      prisma.booking.count(),
      prisma.diveBooking.count(),
    ]);

    console.log("🔍 Debugging Counts");
    console.log("✅ Total Visible Testimonials (show: true):", testimonialCount);
    console.log("✅ Total Active Users (is_archived: false):", userCount);

    // **Fetch all visible testimonials for verification**
    const allTestimonials = await prisma.testimonial.findMany({
      where: { show: true }, // ✅ Only fetch testimonials where `show` is true
      select: { id: true, title: true, body: true, fullname: true, show: true },
    });
    console.log("🛠 Visible Testimonial List:", allTestimonials);

    return NextResponse.json({
      testimonialCount,
      faqCount,
      userCount,
      certificateCount,
      productCount,
      batchCount,
      roomCount,
      roomBookingCount,
      diveCount,
    });
  } catch (error) {
    console.error("❌ Error in Dashboard Count API:", error);
    return NextResponse.json({ error: "Failed to fetch counts" }, { status: 500 });
  }
}
