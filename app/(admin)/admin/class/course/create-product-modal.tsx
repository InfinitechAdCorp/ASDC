import { useState, useRef } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { toast } from 'react-toastify';
import { upload } from '@vercel/blob/client';
import { PhilippinePeso } from 'lucide-react';

interface UpdateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProductModal: React.FC<UpdateRoomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number>(0);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const file = inputFileRef.current?.files?.[0];

    if (!file) {
      toast.error('No file selected');
      setLoading(false);

      return;
    }

    try {
      const newBlob = await upload(`products/${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/vercel/upload',
      });

      const productData = {
        name,
        description,
        category,
        price,
        image: newBlob.url,
      };

      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      // const data = await response.json();

      setName('');
      setDescription('');
      setCategory('');
      setPrice(0);
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
      toast.success('Success');
      setLoading(false);
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Add new product</ModalHeader>
        <ModalBody>
          <Input
            label="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="underlined"
            isRequired
          />
          <Textarea
            label="Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="underlined"
            isRequired
          />
          <Select
            label="Category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="underlined"
            isRequired
          >
            <SelectItem key={'Beginner'}>
              Beginner
            </SelectItem>
            <SelectItem key={'Youth'}>
              Youth
            </SelectItem>
            <SelectItem key={'Continued Educational'}>
              Continued Educational
            </SelectItem>
            <SelectItem key={'Professional'}>
              Professional
            </SelectItem>
          </Select>
          <Input
            label="Price"
            id="price"
            type="number"
            value={price.toString()}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            variant="underlined"
            isRequired
            startContent={
              <PhilippinePeso
                size={12}
                className="pointer-events-none mb-1 flex-shrink-0 text-default-400"
              />
            }
          />
          <Input
            label="Image"
            name="image"
            id="image"
            type="file"
            accept="image/*"
            ref={inputFileRef}
            variant="underlined"
            isRequired
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose} disabled={loading}>
            Close
          </Button>
          <Button color="primary" onClick={handleSubmit} isLoading={loading}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateProductModal;
