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

interface Product {
  id: string;
}

interface DeleteProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteRoom = async () => {
    if (!product) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/certification?id=${product.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
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
        <ModalHeader>Delete {product?.id}</ModalHeader>
        <ModalBody>Are you sure you want to delete this certificate?</ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="flat" disabled={loading}>
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

export default DeleteProductModal;
