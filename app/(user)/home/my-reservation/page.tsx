'use client';

import { useState, useEffect } from 'react';
import { Tabs, Tab } from "@heroui/react";
import { Calendar, Book, Anchor } from 'lucide-react';

import RoomReservationTable from './room-reservation-table';
import DiveReservationTable from './dive-reservation-table';
import EnrollmentReservationTable from './enrollment-reservation-table';
import { useCountReservation } from './data';

import BlueLoading from '@/components/admin/blue-loading';

export default function MyReservationPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [userId, setUserId] = useState<number>(0);
  const { data, isLoading, isError } = useCountReservation(userId);

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');

    if (storedUserId) {
      setUserId(Number(storedUserId));
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const CountBadge = ({ label }: { label: number }) => (
    <div className="absolute right-0 hidden h-5 w-6 items-center justify-center rounded-full border-2 border-white bg-logo-blue text-[10px] font-bold text-white dark:border-gray-900 lg:inline-flex">
      {label}
    </div>
  );

  if (isLoading)
    return (
      <BlueLoading />
    );

  if (isError)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <BlueLoading />
        <button
          className="mt-4 rounded bg-logo-blue px-4 py-2 text-white"
          onClick={() => location.reload()}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="container mx-auto min-h-screen p-4 py-20 lg:p-0 lg:pt-32">
      <Tabs
        variant="light"
        placement={isMobile ? 'top' : 'start'}
        className="flex justify-center"
      >
        <Tab
          key="photos"
          title={
            <div className="flex space-x-2 lg:w-48">
              <Book size={20} />
              <span className="hidden sm:inline">Course Enrollments</span>
              <span className="sm:hidden">Courses</span>
              <CountBadge label={data.studentCount} />
            </div>
          }
          className="w-full justify-start"
        >
          <EnrollmentReservationTable />
        </Tab>
        <Tab
          key="music"
          title={
            <div className="flex space-x-2 lg:w-48">
              <Anchor size={20} />
              <span className="hidden sm:inline">Dive Reservations</span>
              <span className="sm:hidden">Dives</span>
              <CountBadge label={data.diveCount} />
            </div>
          }
          className="w-full justify-start"
        >
          <DiveReservationTable />
        </Tab>
        <Tab
          key="videos"
          title={
            <div className="flex space-x-2 lg:w-48">
              <Calendar size={20} />
              <span className="hidden sm:inline">Room Reservations</span>
              <span className="sm:hidden">Rooms</span>
              <CountBadge label={data.roomCount} />
            </div>
          }
          className="w-full justify-start"
        >
          <RoomReservationTable />
        </Tab>
      </Tabs>
    </div>
  );
}