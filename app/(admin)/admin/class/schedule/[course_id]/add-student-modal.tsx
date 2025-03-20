import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from "@heroui/react";
import { Plus } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Product {
  id: number;
  first_name: string;
  last_name: string;
}

export default function AddStudentModal({
  course_id,
  onMutate,
}: {
  course_id: number;
  onMutate: () => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [product_id, setProduct_id] = useState<number>(0);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [enrolledStudents, setEnrolledStudents] = useState<number[]>([]);

  const { data: products } = useSWR('/api/user/index', fetcher);

  const { data: batchStudents, mutate } = useSWR(
    `/api/batch/student?id=${course_id}`,
    fetcher,
  );

  useEffect(() => {
    if (batchStudents) {
      const enrolled = batchStudents.students.map(
        (student: { user_id: number }) => student.user_id,
      );

      setEnrolledStudents(enrolled);
    }
  }, [batchStudents]);

  const handleSubmit = async () => {
    setIsLoadingSubmit(true);
    setErrorMessage('');

    const data = {
      user_id: product_id,
      batch_id: course_id,
    };

    try {
      const response = await fetch(`/api/batch/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the schedule');
      }

      toast.success('Student added successfully!');
      setProduct_id(0);
      onOpenChange();

      onMutate();
      await mutate();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const filteredProducts = products?.filter(
    (product: Product) => !enrolledStudents.includes(product.id),
  );

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Student&nbsp;
        <Plus size={20} />
      </Button>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 250,
        }}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add student
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Select student"
                  labelPlacement="outside"
                  placeholder="Select a student"
                  variant="underlined"
                  value={product_id}
                  onChange={(e) => setProduct_id(Number(e.target.value))}
                  isRequired
                >
                  {filteredProducts?.map((product: Product) => (
                    <SelectItem key={product.id}>
                      {`${product.first_name} ${product.last_name}`}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isDisabled={isLoadingSubmit || !product_id}
                  isLoading={isLoadingSubmit}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
