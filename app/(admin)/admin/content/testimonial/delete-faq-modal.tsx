import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { toast } from 'react-toastify';

interface FAQ {
  id: number;
}

interface ArchiveUserModalProps {
  faq: FAQ | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ArchiveUserModal: React.FC<ArchiveUserModalProps> = ({
  faq,
  isOpen,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);

  const handleArchiveUser = async () => {
    if (!faq) return;

    setLoading(true);
    try {
      await fetch(`/api/testimonial?id=${faq.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Success');
      console.log(faq.id);
      onSave();
    } catch (error) {
      console.error('Failed to archive user', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this testimonial?</ModalBody>
        <ModalFooter>
          <Button onClick={onClose} disabled={loading}>
            Close
          </Button>
          <Button
            color="danger"
            onClick={handleArchiveUser}
            isLoading={loading}
          >
            Yes, Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ArchiveUserModal;
