'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Skeleton,
  Button,
} from "@heroui/react";


import { RoomViewer } from './room-viewer';
import ReservationCard from './reservation-card';

import { fetchRooms } from '@/app/data';


interface Room {
  id: number;
  title: string;
  description: string;
  image: string;
}

const RoomCardSkeleton = () => {
  return (
    <Card className="flex max-h-[400px] flex-col">
      <CardBody className="flex h-full flex-col justify-between">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="mt-2 h-4 w-full" />
        <div className="mt-4 w-full flex-grow">
          <Skeleton className="h-70 w-full rounded-xl object-cover" />
        </div>
      </CardBody>
    </Card>
  );
};

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedRooms, setExpandedRooms] = useState<{
    [key: number]: boolean;
  }>({});

  const [dates, setDates] = useState({ startDate: '', endDate: '' });

  const handleDatesChange = (start: any, end: any) => {
    setDates({ startDate: start, endDate: end });
    console.log('Selected Dates:', { startDate: start, endDate: end });
  };

  useEffect(() => {
    const getRooms = async () => {
      try {
        setLoading(true);
        const data = await fetchRooms();

        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    const interval = setInterval(getRooms, 60000);

    getRooms();

    return () => clearInterval(interval);
  }, []);

  const handleRoomImageClick = (room: Room) => {
    setSelectedRoom(room);
    setIsSignInOpen(true);
  };

  const truncateDescription = (description: string, limit: number) => {
    if (description.length <= limit) return description;

    return description.slice(0, limit) + '...';
  };

  const toggleDescription = (roomId: number) => {
    setExpandedRooms((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }));
  };

  return (
    <div className="container mx-auto min-h-screen max-w-[90%] pb-24 pt-20 md:pt-32">
      <div className="pl-4 pr-4">
        <ReservationCard onDatesChange={handleDatesChange} />
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <RoomCardSkeleton key={index} />
            ))
          : rooms.map((room) => (
              <Card key={room.id} className="flex max-h-full flex-col">
                <CardHeader className="flex flex-col">
                  <div className="flex w-full items-start justify-between">
                    <div>
                      <div className="text-xl font-bold dark:text-white">
                        {room.title}
                      </div>
                      <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                        {expandedRooms[room.id]
                          ? room.description
                          : truncateDescription(room.description, 50)}
                        {room.description.length > 50 && (
                          <Button
                            color="primary"
                            variant="light"
                            size="sm"
                            className="ml-1 p-0"
                            onClick={() => toggleDescription(room.id)}
                          >
                            {expandedRooms[room.id] ? 'Read less' : 'Read more'}
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Link
                        href={`/room/${room.id}?start=${encodeURIComponent(dates.startDate)}&end=${encodeURIComponent(dates.endDate)}`}
                        passHref
                      >
                        <Button type="button" size="sm" color="primary">
                          Book
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="flex flex-col justify-end p-0">
                  <button onClick={() => handleRoomImageClick(room)}>
                    <Image
                      isZoomed
                      src={room.image}
                      width={1000}
                      height={300}
                      className="object-cover"
                      alt="thumbnail"
                      radius="none"
                    />
                    <img
                      src="/img/360-degrees.png"
                      alt="360 Icon"
                      className="absolute left-1/2 top-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform"
                    />
                  </button>
                </CardBody>
              </Card>
            ))}
        {selectedRoom && (
          <RoomViewer
            room={selectedRoom}
            isOpen={isSignInOpen}
            onClose={() => setIsSignInOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Rooms;
