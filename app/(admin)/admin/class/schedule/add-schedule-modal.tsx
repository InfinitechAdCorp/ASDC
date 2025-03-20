import React, { useState } from 'react';
import useSWR from 'swr';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  DatePicker,
} from "@heroui/react";
import { Plus } from 'lucide-react';
import {
  DateValue,
  today,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from '@internationalized/date';
import { toast, Toaster } from 'react-hot-toast';


const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Product {
  id: number;
  name: string;
}

interface AddScheduleModalProps {
  mutate: () => void;
}

// const AddTestimonialModal: React.FC<AddModalProps> = ({ mutate }) => {
const AddScheduleModal: React.FC<AddScheduleModalProps> = ({ mutate }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = useState('');
  const [product_id, setProduct_id] = useState<number>(0);
  const [start_date, setStart_date] = useState<DateValue>(
    parseAbsoluteToLocal(new Date().toISOString()),
  );
  const [end_date, setEnd_date] = useState<DateValue>(
    parseAbsoluteToLocal(
      new Date(new Date().getTime() + 6 * 60 * 60 * 1000).toISOString(),
    ),
  );
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { data: products, error, isLoading } = useSWR('/api/product', fetcher);

  if (error) return <div>Failed to load products</div>;
  if (isLoading) return <div>Loading products...</div>;

  const handleSubmit = async () => {
    setIsLoadingSubmit(true);
    setErrorMessage('');

    const startDate = start_date.toDate(getLocalTimeZone()).toISOString();
    const endDate = end_date.toDate(getLocalTimeZone()).toISOString();

    const data = {
      name,
      product_id,
      start_date: startDate,
      end_date: endDate,
    };

    console.log(data);

    try {
      const response = await fetch('/api/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the schedule');
      }

      toast.success('Schedule added successfully!', {
        style: {
          maxWidth: 600,
        },
      });
      setName('');
      setProduct_id(0);
      // Reset the dates
      onOpenChange();
      mutate();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Class&nbsp;
        <Plus size={20} />
      </Button>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 150,
        }}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Class
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Class Name"
                  labelPlacement="outside"
                  placeholder="Enter class name"
                  variant="underlined"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isRequired
                />
                <Select
                  label="Select Course"
                  labelPlacement="outside"
                  placeholder="Select a course"
                  variant="underlined"
                  value={product_id}
                  onChange={(e) => setProduct_id(Number(e.target.value))}
                  isRequired
                >
                  {products?.map((product: Product) => (
                    <SelectItem key={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </Select>
                <DatePicker
                  label="Start Date"
                  labelPlacement="outside"
                  variant="underlined"
                  granularity="minute"
                  value={start_date}
                  minValue={today(getLocalTimeZone())}
                  onChange={(date) => {
                    if (date) {
                      setStart_date(date);
                    }
                  }}
                  isRequired
                />
                <DatePicker
                  label="End Date"
                  labelPlacement="outside"
                  variant="underlined"
                  granularity="minute"
                  value={end_date}
                  minValue={today(getLocalTimeZone())}
                  onChange={(date) => {
                    if (date) {
                      setEnd_date(date);
                    }
                  }}
                  isRequired
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isDisabled={
                    isLoadingSubmit ||
                    !name ||
                    !product_id ||
                    !start_date ||
                    !end_date
                  }
                >
                  {isLoadingSubmit ? 'Submit' : 'Submit'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddScheduleModal;