import { useState } from 'react';
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

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
  mutate,
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const roomData = {
        question,
        answer,
      };

      const response = await fetch('/api/testimonial', {
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

      setQuestion('');
      setAnswer('');
      toast.success('Success');
      setLoading(false);
      onClose();
      mutate();
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Add new Testimonial
        </ModalHeader>
        <ModalBody>
          <Input
            label="Question"
            id="question"
            value={question}
            variant="underlined"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Textarea
            label="Answer"
            id="answer"
            value={answer}
            variant="underlined"
            onChange={(e) => setAnswer(e.target.value)}
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
