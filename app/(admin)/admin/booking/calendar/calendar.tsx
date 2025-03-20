'use client';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useSWR from 'swr';
import { toast } from 'react-hot-toast';

import ApprovalModal from './approval-modal';
import DeclineModal from './decline-modal';

import BlueLoading from '@/components/admin/blue-loading';

interface Booking {
  id: number;
  user_id: number;
  room_id: number;
  fullname: string;
  guest: number;
  status: string;
  start_date: string;
  end_date: string;
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
  const { data, error, mutate } = useSWR<Booking[]>(`/api/bookings`, fetcher);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false); // New state for Decline Modal

  if (!data && !error)
    return (
      <div>
        <BlueLoading />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const currentDate = new Date();

  const events = data!.map((booking) => {
    const startDate = new Date(booking.start_date);
    const endDate = new Date(booking.end_date);

    const isOngoing = currentDate >= startDate && currentDate <= endDate;

    const isApprovedAndOngoing = isOngoing && booking.status === 'Approved';
    const isApprovedAndNotOngoing = !isOngoing && booking.status === 'Approved';
    const isIncomingAndApproved =
      currentDate < startDate && booking.status === 'Approved';

    return {
      id: `${booking.id.toString()} ${new Date(
        booking.created_at,
      ).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })}`,
      classNames: `hover:bg-blue-500 hover:scale-105 transition-transform duration-200 `,
      title: `${booking.fullname} (${booking.guest} guests)`,
      start: booking.start_date,
      end: booking.end_date,
      color: isApprovedAndOngoing
        ? '#FF6347'
        : isIncomingAndApproved
          ? '#ADD8E6'
          : isApprovedAndNotOngoing
            ? '#FFD700'
            : '#17C964',
    };
  });

  const handleEventClick = (info: any) => {
    const bookingId = parseInt(info.event.id);
    const booking = data?.find((b) => b.id === bookingId) || null;
    console.log(booking);
    setSelectedBooking(booking);

    // If the booking status is "Approved", open the DeclineModal
    if (booking && booking.status === 'Approved') {
      setIsDeclineModalOpen(true);
    } else {
      setIsModalOpen(true); // Otherwise, open the ApprovalModal
    }
  };

  const handleApprove = async () => {
    if (!selectedBooking) return;

    try {
      await fetch(`/api/bookings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ booking_id: selectedBooking.id }),
      });
      await mutate();
      toast.success('Success!');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to approve booking');
    }
  };

  const handleDecline = async () => {
    if (!selectedBooking) return;

    try {
      // Send decline request to API
      await fetch(`/api/bookings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ booking_id: selectedBooking.id }),
      });
      await mutate();
      toast.success('Booking Declined!');
      setIsDeclineModalOpen(false); // Close decline modal
    } catch (error) {
      toast.error('Failed to decline booking');
    }
  };

  // Custom event content renderer
  const renderEventContent = (eventInfo: any) => {
    return (
      <div className="event-content p-2">
        <strong>
          <span>Booking # : {eventInfo.event.id}</span>
          <br />
        </strong>
        <span>Reserved by : {eventInfo.event.title}</span>
        <br />
        <span>
          Duration&nbsp;:&nbsp;
          {new Date(eventInfo.event.start).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
          &nbsp;-&nbsp;
          {new Date(eventInfo.event.end).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventClassNames="cursor-pointer"
        timeZone="UTC"
        headerToolbar={{
          right: 'prev,next',
          center: 'title',
          left: 'dayGridMonth,dayGridWeek',
        }}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: 'short',
        }}
      />
      <ApprovalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
