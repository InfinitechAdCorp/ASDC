import { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Textarea,
} from "@heroui/react";
import { toast } from 'react-toastify';

interface FAQ {
  id: number;
  title: string;
  body: string;
  show: boolean;
  fullname: string;
  created_at: string;
  updated_at: string;
}

interface UpdateUserModalProps {
  faq: FAQ | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  faq,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (faq) {
      setTitle(faq.title);
      setBody(faq.body);
    }
  }, [faq]);

  const handleSave = async () => {
    if (!faq) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/testimonial?id=${faq.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          body: body,
        }),
      });

      toast.success('Success');
      if (!response.ok) throw new Error('Failed to update user');
      onSave();
      onClose();
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating the user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Edit</ModalHeader>
        <ModalBody>
          <Input
            label="Title"
            id="title"
            value={title}
            variant="underlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="Body"
            id="body"
            value={body}
            variant="underlined"
            onChange={(e) => setBody(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
          <Button color="primary" onClick={handleSave} isLoading={loading}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUserModal;
