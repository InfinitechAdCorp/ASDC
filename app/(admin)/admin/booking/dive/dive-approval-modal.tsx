import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

interface DiveBooking {
  id: number;
  user_id: number;
  name: string;
  email: string;
  status: string;
  date: string;
  time: string;
  participant: string;
  level: string;
  message: string;
  created_at: string;
}

interface ApprovalModalProps {
  booking: DiveBooking | null;
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
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute.toString().padStart(2, '0');
    const period = isPM ? 'PM' : 'AM';

    return `${formattedHour}:${formattedMinute} ${period}`;
  };

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
          Booking #{booking.id}
        </ModalHeader>
        <ModalBody>
          <p>
            <small>
              <strong>Name</strong>
            </small>{' '}
            <br />
            {booking.name}
          </p>
          <p>
            <small>
              <strong>Email</strong>
            </small>{' '}
            <br />
            {booking.email}
          </p>
          <p>
            <small>
              <strong>Status</strong>
            </small>{' '}
            <br />
            {booking.status}
          </p>
          <p>
            <small>
              <strong>Guests</strong>
            </small>{' '}
            <br />
            {booking.participant}
          </p>
          <p>
            <small>
              <strong>Date/Time</strong>
            </small>{' '}
            <br />
            {new Date(booking.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}{' '}
            - {formatTime(booking.time)}
          </p>
          <p>
            <small>
              <strong>Level:</strong>
            </small>{' '}
            <br />
            {booking.level}
          </p>
          <p>
            <small>
              <strong>Message</strong>
            </small>{' '}
            <br />
            {booking.message}
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
