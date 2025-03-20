import { useState, useRef } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Button,
} from "@heroui/react";
import { toast } from 'react-toastify';
import { upload } from '@vercel/blob/client';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const file = inputFileRef.current?.files?.[0];

    if (!file) {
      console.error('No file selected');

      return;
    }

    try {
      const newBlob = await upload(`rooms/${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/room/upload',
      });

      const roomData = {
        title,
        description,
        image: newBlob.url,
      };

      const response = await fetch('/api/room/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error('Failed to add room');
      }

      const data = await response.json();

      console.log('Success', data);

      setTitle('');
      setDescription('');
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
      toast.success('Success');
      setLoading(false);
      onClose();
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add new room</ModalHeader>
        <ModalBody>
          <Input
            label="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Image"
            name="image"
            id="image"
            type="file"
            accept="image/*"
            ref={inputFileRef}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose} disabled={loading}>
            Close
          </Button>
          <Button color="primary" onClick={handleSubmit} isLoading={loading}>
            Save Room
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomModal;
