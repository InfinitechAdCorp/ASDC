import { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@heroui/react";
import { toast } from 'react-toastify';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface UpdateUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          first_name: firstName,
          last_name: lastName,
          email,
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
        <ModalHeader>
          Edit {user?.first_name} {user?.last_name}
        </ModalHeader>
        <ModalBody>
          <Input
            label="First name"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label="Last name"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            name="email"
            label="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
