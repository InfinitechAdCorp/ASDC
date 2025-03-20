import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { toast } from 'react-toastify';

interface Room {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface DeleteRoomModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const DeleteRoomModal: React.FC<DeleteRoomModalProps> = ({
  room,
  isOpen,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteRoom = async () => {
    if (!room) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/room/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: room.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete room');
      }

      toast.success('Success');
      onSave();
    } catch (error) {
      console.error('Failed to delete room', error);
      toast.error('Failed to delete room');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Delete {room?.title} room</ModalHeader>
        <ModalBody>Are you sure you want to delete this room?</ModalBody>
        <ModalFooter>
          <Button onClick={onClose} disabled={loading}>
            Close
          </Button>
          <Button color="danger" onClick={handleDeleteRoom} isLoading={loading}>
            Yes, Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteRoomModal;
