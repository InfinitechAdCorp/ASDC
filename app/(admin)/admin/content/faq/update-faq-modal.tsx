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
  question: string;
  answer: string;
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
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
    }
  }, [faq]);

  const handleSave = async () => {
    if (!faq) return;

    setLoading(true);

    try {
      const response = await fetch('/api/faq', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: faq.id,
          question: question,
          answer: answer,
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
            label="Question"
            id="firstname"
            value={question}
            variant="underlined"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Textarea
            label="Answer"
            id="lastname"
            value={answer}
            variant="underlined"
            onChange={(e) => setAnswer(e.target.value)}
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
