// app/(user)/room/[roomId]/page.tsx
import React from 'react';
import { Toaster } from 'react-hot-toast';

import LeftCard from './left-card';
import RightCard from './right-card';
import BackButton2 from '@/components/user/back-button-2';

interface RoomProps {
  room: {
    id: number;
    title: string;
    description: string;
    image: string;
  } | null;
}

const RoomPage: React.FC<RoomProps> = ({ room }) => {
  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <div className="px-4">
        <BackButton2 />
      </div>
      <div className="flex flex-col gap-4 px-4 md:flex-row">
        <div className="order-2 w-full md:order-1 md:w-[70%]">
          <LeftCard
            title={room.title}
            description={room.description}
            image={room.image}
          />
        </div>
        <div className="order-1 w-full md:order-2 md:w-[30%]">
          <RightCard
            title={room.title}
            description={room.description}
            image={room.image}
          />
        </div>
      </div>
    </div>
  );
};

const fetchRoomData = async (roomId: string) => {
  const res = await fetch(`${process.env.URL}/api/room/index?id=${roomId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch room data');
  }

  const data = await res.json();

  return data;
};

export async function generateMetadata({
  params,
}: {
  params: { roomId: string };
}) {
  const room = await fetchRoomData(params.roomId);

  return {
    title: room.title,
    description: room.description,
  };
}

export default async function RoomPageWrapper({
  params,
}: {
  params: { roomId: string };
}) {
  const room = await fetchRoomData(params.roomId);

  return <RoomPage room={room} />;
}
