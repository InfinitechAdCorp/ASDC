'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import useSWR from 'swr';
import { toast } from 'react-hot-toast';

import ApprovalModal from './dive-approval-modal';
import DeclineModal from './dive-decline-modal'; // Import DeclineModal

import BlueLoading from '@/components/admin/blue-loading';

interface DiveBooking {
  id: number;
  user_id: number;
  name: string;
  email: string;
  status: string;
  date: string;
  time: string;
  participant: string;
  level: string;
  message: string;
  created_at: string;
}

// Fetcher function for SWR
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    return res.json();
  });

export default function MyCalendar() {
  const { data, error, mutate } = useSWR<DiveBooking[]>(
    `/api/bookings/dive`,
    fetcher,
  );
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<DiveBooking | null>(
    null,
  );

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute.toString().padStart(2, '0');
    const period = isPM ? 'PM' : 'AM';

    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  if (!data && !error) return <BlueLoading />;
  if (error) return <div>Error: {error.message}</div>;

  const events = data!.map((booking) => ({
    id: booking.id.toString(),
    title: `${new Date(booking.date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })} - ${formatTime(booking.time)}`,
    date: booking.date,
    classNames: `p-1 text-white hover:bg-blue-500 hover:scale-105 transition-transform duration-200 ${
      booking.status === 'Pending' ? 'bg-red-500' : 'bg-green-500'
    }`,
  }));

  function renderEventContent(eventInfo: any) {
    return (
      <div className="event-content p-2">
        <b>{`Booking #${eventInfo.event.id}`}</b>
        <br />
        <p>{eventInfo.event.title}</p>
      </div>
    );
  }

  const handleEventClick = (info: any) => {
    const bookingId = parseInt(info.event.id, 10);
    const booking = data?.find((b) => b.id === bookingId) || null;

    setSelectedBooking(booking);

    // If status is "Pending", open ApprovalModal
    if (booking && booking.status === 'Pending') {
      setIsApprovalModalOpen(true);
    }
    // If status is "Declined", allow re-approval
    else if (booking && booking.status === 'Declined') {
      setIsApprovalModalOpen(true);
    }
    // If status is "Approved", allow decline
    else {
      setIsDeclineModalOpen(true);
    }
  };

  const handleApprove = async () => {
    if (!selectedBooking) return;

    try {
      await fetch(`/api/bookings/dive`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: selectedBooking.id,
          action: 'approve',
        }),
      });
      await mutate();
      toast.success('Booking approved!');
      setIsApprovalModalOpen(false);
    } catch (error) {
      toast.error('Failed to approve booking');
    }
  };

  const handleDecline = async () => {
    if (!selectedBooking) return;

    try {
      await fetch(`/api/bookings/dive`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: selectedBooking.id,
          action: 'decline',
        }),
      });
      await mutate();
      toast.success('Booking declined!');
      setIsDeclineModalOpen(false);
    } catch (error) {
      toast.error('Failed to decline booking');
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventClassNames="cursor-pointer"
        timeZone="UTC"
        headerToolbar={{
          right: 'prev,next',
          center: 'title',
          left: 'dayGridMonth,dayGridWeek,list',
        }}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: 'short',
        }}
      />
      <ApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        booking={selectedBooking}
        onApprove={handleApprove}
      />
      <DeclineModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        booking={selectedBooking}
        onDecline={handleDecline}
      />
    </div>
  );
}
