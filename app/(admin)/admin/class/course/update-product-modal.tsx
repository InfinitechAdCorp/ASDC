import { useEffect, useState, useRef } from 'react';
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

interface Room {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

interface UpdateRoomModalProps {
  product: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const UpdateProductModal: React.FC<UpdateRoomModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price);
      setImageFile(null);
    }
  }, [product]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!product) return;

    setLoading(true);

    try {
      let imageUrl = product.image;

      if (imageFile) {
        const newBlob = await upload(`products/${imageFile.name}`, imageFile, {
          access: 'public',
          handleUploadUrl: '/api/vercel/upload',
        });

        imageUrl = newBlob.url;
      }

      const response = await fetch('/api/product', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id,
          name,
          description,
          category,
          price: Number(price),
          image: imageUrl,
        }),
      });

      if (!response.ok) throw new Error('Failed to update room');

      toast.success('Success');
      onSave();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating the room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Edit {product?.name} Room</ModalHeader>
        <ModalBody>
          <Input
            label="Name"
            id="title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="underlined"
          />
          <Textarea
            label="Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="underlined"
          />
          <Select
            label="Category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            defaultSelectedKeys={[category]}
            variant="underlined"
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
            id="title"
            type="number"
            value={price.toString()}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            variant="underlined"
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
            onChange={handleFileChange}
            ref={inputFileRef}
            variant="underlined"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose} disabled={loading}>
            Close
          </Button>
          <Button color="primary" onClick={handleSave} isLoading={loading}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProductModal;
