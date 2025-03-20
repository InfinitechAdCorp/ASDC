'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  RangeCalendar,
  DateValue,
  RangeValue,
  Button,
} from "@heroui/react";
import { today, getLocalTimeZone } from '@internationalized/date';
import { User, X } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface RightCardProps {
  title: string;
  description: string;
  image: string;
}

const RightCard: React.FC<RightCardProps> = ({ title }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [guest, setGuest] = useState('');
  const [value, setValue] = useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
  const [visibleMonths, setVisibleMonths] = useState(2);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get user_id from local storage
    const storedUserId = localStorage.getItem('id');

    setUserId(storedUserId);

    // Get room_id from URL
    const pathParts = window.location.pathname.split('/');
    const roomIdFromPath = pathParts[pathParts.length - 1];

    setRoomId(roomIdFromPath);

    // Parse start and end date from query parameters
    const params = new URLSearchParams(window.location.search);
    const start = params.get('start');
    const end = params.get('end');

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);

      setValue({
        start: today(getLocalTimeZone()).set({
          year: startDate.getFullYear(),
          month: startDate.getMonth() + 1,
          day: startDate.getDate(),
        }),
        end: today(getLocalTimeZone()).set({
          year: endDate.getFullYear(),
          month: endDate.getMonth() + 1,
          day: endDate.getDate(),
        }),
      });
    }

    const updateVisibleMonths = () => {
      setVisibleMonths(window.innerWidth <= 768 ? 1 : 2);
    };

    updateVisibleMonths();
    window.addEventListener('resize', updateVisibleMonths);

    return () => window.removeEventListener('resize', updateVisibleMonths);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId || !roomId) {
      console.log('UserID', userId);
      console.log('RoomID', roomId);
      setError('User ID or Room ID is missing');

      return;
    }

    const bookingData = {
      user_id: parseInt(userId, 10),
      room_id: parseInt(roomId, 10),
      fullname: fullName,
      guest: parseInt(guest, 10),
      start_date: value.start?.toString(),
      end_date: value.end?.toString(),
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();

        setError(errorData.message || 'Something went wrong');

        return;
      }

      toast.success('Booking created successfully');
      // console.log("Booking created successfully:", await response.json());
    } catch (error) {
      // console.error("Error creating booking:", error);
      setError('Network error, please try again later');
    }
  };

  return (
    <div>
      <Card className="h-full">
        <CardHeader className="flex justify-between">
          {title}
          <Link
            href="/home/accommodation"
            className="aboslute left-6 top-4 flex cursor-pointer items-center gap-1"
          >
            <X size={18} className="text-primary" />
          </Link>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
            <Input
              label="Full name"
              variant="underlined"
              id="fullname"
              isRequired
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              endContent={
                <User
                  size={22}
                  className="pointer-events-none flex-shrink-0 text-2xl text-primary"
                />
              }
            />
            <Input
              label="Guests"
              variant="underlined"
              id="guest"
              type="number"
              isRequired
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
              endContent={
                <User
                  size={22}
                  className="pointer-events-none flex-shrink-0 text-2xl text-primary"
                />
              }
            />
            <RangeCalendar
              aria-label="Date (Controlled)"
              value={value}
              onChange={setValue}
              minValue={today(getLocalTimeZone())}
              visibleMonths={visibleMonths}
              style={{ width: '100%' }}
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-auto">
              <Button color="primary" type="submit" className="w-full">
                Book
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default RightCard;
