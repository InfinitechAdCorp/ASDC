'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import {
  Button,
  Input,
  Tooltip,
  Image,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";
import { FilePenLine, Plus, Search, Trash2Icon } from 'lucide-react';


import CreateRoomModal from './create-room-modal';
import DeleteRoomModal from './delete-room-modal';
import UpdateRoomModal from './update-room-modal';

import BlueLoading from '@/components/admin/blue-loading';
import CustomToastContainer from '@/components/admin/custom_toast_container';


interface Room {
  id: number;
  title: string;
  description: string;
  image: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const RoomTable: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // For add modal
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onOpenChange: onUpdateOpenChange,
  } = useDisclosure(); // For update modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure(); // For delete modal
  const {
    data: rooms = [],
    error,
    mutate,
  } = useSWR<Room[]>(`/api/room/index`, fetcher);
  const [expandedRooms, setExpandedRooms] = useState<{
    [key: number]: boolean;
  }>({});

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  if (error)
    return (
      <div>
        <BlueLoading />
      </div>
    );

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
    <div>
      <CustomToastContainer />
      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Search by ..."
          // Uncomment to enable search functionality
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 text-default-600"
          startContent={<Search size={20} />}
        />
        <Button size="md" onPress={onOpen} color="primary">
          <Plus size={16} /> New Room
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {rooms.length === 0 ? (
          <div>No available data</div>
        ) : (
          rooms.map((room) => (
            <Card key={room.id}>
              <CardHeader className="p-0">
                <Image
                  isZoomed
                  alt={room.title}
                  src={room.image}
                  width={1000}
                  height={200}
                  className="object-cover"
                />
                <Tooltip content="Edit room">
                  <span
                    onClick={() => {
                      setSelectedRoom(room);
                      onUpdateOpen();
                    }}
                    className="absolute right-8 top-2 z-10 cursor-pointer text-lg text-white active:opacity-50"
                  >
                    <FilePenLine size={20} />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete room">
                  <span
                    onClick={() => {
                      setSelectedRoom(room);
                      onDeleteOpen();
                    }}
                    className="absolute right-2 top-2 z-10 cursor-pointer text-lg text-danger active:opacity-50"
                  >
                    <Trash2Icon size={20} />
                  </span>
                </Tooltip>
              </CardHeader>
              <CardBody>
                <div className="flex items-center">
                  <div>
                    <p className="font-bold">{room.title}</p>
                    <small className="text-gray-600 dark:text-gray-400">
                      Room # : {room.id}
                    </small>
                    <p>
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
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
      <CreateRoomModal isOpen={isOpen} onClose={onOpenChange} />
      {selectedRoom && (
        <UpdateRoomModal
          room={selectedRoom}
          isOpen={isUpdateOpen}
          onClose={onUpdateOpenChange}
          onSave={() => {
            mutate();
          }}
        />
      )}
      {selectedRoom && (
        <DeleteRoomModal
          room={selectedRoom}
          isOpen={isDeleteOpen}
          onClose={onDeleteOpenChange}
          onSave={() => {
            mutate();
          }}
        />
      )}
    </div>
  );
};

export default RoomTable;
