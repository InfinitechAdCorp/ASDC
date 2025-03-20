import { useEffect, useState, useRef } from 'react';
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

interface Room {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface UpdateRoomModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const UpdateRoomModal: React.FC<UpdateRoomModalProps> = ({
  room,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (room) {
      setTitle(room.title);
      setDescription(room.description);
      setImageFile(null);
    }
  }, [room]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!room) return;

    setLoading(true);

    try {
      let imageUrl = room.image;

      if (imageFile) {
        const newBlob = await upload(`rooms/${imageFile.name}`, imageFile, {
          access: 'public',
          handleUploadUrl: '/api/room/upload',
        });

        imageUrl = newBlob.url;
      }

      const response = await fetch('/api/room/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: room.id,
          title,
          description,
          image: imageUrl,
        }),
      });

      if (!response.ok) throw new Error('Failed to update room');

      toast.success('Success');
      onSave();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating the room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Edit {room?.title} Room</ModalHeader>
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
            onChange={handleFileChange}
            ref={inputFileRef}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleSave} isLoading={loading}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateRoomModal;
