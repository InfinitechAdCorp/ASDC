import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { toast, Toaster } from 'react-hot-toast';

interface Student {
  id: number;
  user: { first_name: string; last_name: string };
}

interface RemoveStudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const RemoveStudentModal: React.FC<RemoveStudentModalProps> = ({
  student,
  isOpen,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteStudent = async () => {
    if (!student) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/batch/student?id=${student.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to remove student');
      }

      toast.success('Student removed successfully!');
      onSave();
    } catch (error) {
      console.error(error);
      toast.error('Failed to remove student');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 250,
        }}
      />

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader>
            Remove {student?.user.first_name} {student?.user.last_name}
          </ModalHeader>
          <ModalBody>
            Are you sure you want to remove this student from the batch?
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="flat" disabled={loading}>
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={handleDeleteStudent}
              isLoading={loading}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RemoveStudentModal;
