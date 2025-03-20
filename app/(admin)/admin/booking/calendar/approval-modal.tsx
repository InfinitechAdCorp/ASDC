import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';

interface Booking {
  id: number;
  fullname: string;
  guest: number;
  start_date: string;
  end_date: string;
}

interface ApprovalModalProps {
  booking: Booking | null;
  onApprove: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function ApprovalModal({
  booking,
  onApprove,
  onClose,
  isOpen,
}: ApprovalModalProps) {
  if (!booking) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Booking #</ModalHeader>
          <ModalBody>
            <p>No booking selected.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Booking : {booking.id}
        </ModalHeader>
        <ModalBody>
          <p>
            <strong>Name:</strong> {booking.fullname}
          </p>
          <p>
            <strong>Guests:</strong> {booking.guest}
          </p>
          <p>
            <strong>Start Date:</strong>{' '}
            {new Date(booking.start_date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <p>
            <strong>End Date:</strong>{' '}
            {new Date(booking.end_date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={onApprove}>
            Approve
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
