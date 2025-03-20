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

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface ArchiveUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ArchiveUserModal: React.FC<ArchiveUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);

  const handleArchiveUser = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await fetch(`/api/user/archive`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });
      toast.success('Success');
      onSave();
    } catch (error) {
      toast.error('Failed to archive user');
      // console.error("Failed to archive user", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          Archive {user?.first_name} {user?.last_name}
        </ModalHeader>
        <ModalBody>Are you sure you want to archive this user?</ModalBody>
        <ModalFooter>
          <Button onClick={onClose} disabled={loading}>
            Close
          </Button>
          <Button
            color="danger"
            onClick={handleArchiveUser}
            isLoading={loading}
          >
            Yes, Archive
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ArchiveUserModal;
