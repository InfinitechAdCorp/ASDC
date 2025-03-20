import React from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { Modal, ModalContent, ModalBody, Button } from "@heroui/react";
import { X } from 'lucide-react';

interface Room {
  title: string;
  description: string;
  image: string;
}
interface RoomViewerProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
}

export function RoomViewer({ room, isOpen, onClose }: RoomViewerProps) {
  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent className="w-full max-w-7xl">
        <ModalBody className="p-0">
          <div className="absolute left-4 top-4 z-10 font-semibold text-white">
            {room.title}
          </div>
          <div className="absolute right-4 top-2 z-10 font-semibold text-white">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="text-white"
              onPress={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>
          <div className="flex h-[64vh] w-full">
            <ReactPhotoSphereViewer
              src={room.image}
              height="100%"
              width="100%"
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
