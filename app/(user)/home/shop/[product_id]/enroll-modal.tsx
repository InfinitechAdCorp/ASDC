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
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { toast, Toaster } from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import BlueLoading from '@/components/admin/blue-loading';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Batch {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
}

export default function EnrollModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [batch_id, setBatch_id] = useState<number>(0);
  const [enrolledStudents, setEnrolledStudents] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userEnrolled, setUserEnrolled] = useState<boolean>(false);
  const router = useRouter();

  const userId = typeof window !== 'undefined' ? Number(localStorage.getItem('id')) : 0;
  const pathname = usePathname();
  const course_id = pathname?.split('/').pop();

  // Fetch course schedule
  const { data, error } = useSWR(
    `/api/batch/enroll/get-course-schedule?id=${course_id}`,
    fetcher,
  );

  const checkEnrollmentStatus = async (batchId: number) => {
    try {
      const response = await fetch(`/api/batch/student?id=${batchId}`);
      const data = await response.json();
      const enrolledStudentIds = data.students.map(
        (student: any) => student.user_id,
      );

      setEnrolledStudents(enrolledStudentIds);
      setUserEnrolled(enrolledStudentIds.includes(userId)); // Check if current user is enrolled
    } catch (error) {
      toast.error('Failed to load enrollment status.');
    }
  };


  const handleOpen = async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      router.push("/account/sign-in-required");
      return;
    }

    setLoading(true);
    setUserEnrolled(false);
    setBatch_id(0);

    if (data && data.length > 0 && Array.isArray(data[0].batch) && data[0].batch.length > 0) {
      const firstBatchId = data[0].batch[0].id;
      await checkEnrollmentStatus(firstBatchId);
    } else {
      console.error("No available schedule.");
    }

    setLoading(false);
    onOpen();
  };


  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = { user_id: userId, batch_id };

    try {
      const response = await fetch(`/api/batch/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Enrollment failed. Please try again.');
      }

      toast.success('You have successfully enrolled!');
      onOpenChange();
    } catch (error) {
      toast.error('Please select a schedule before proceeding.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button color="primary" onPress={handleOpen}>
        Enroll
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
                Please select an available schedule
              </ModalHeader>
              <ModalBody>
                {error && (
                  <p className="text-red-500">Failed to load schedules.</p>
                )}

                {loading ? (
                  <BlueLoading />
                ) : data && data.length > 0 && Array.isArray(data[0].batch) && data[0].batch.length > 0 ? (
                  <Select
                    label="Select available date/time"
                    labelPlacement="outside"
                    placeholder="Select available date/time"
                    variant="underlined"
                    value={batch_id}
                    onChange={(e) => setBatch_id(Number(e.target.value))}
                    isRequired
                  >
                    {data[0].batch.map((batch: Batch) => (
                      <SelectItem
                        key={batch.id.toString()}
                        isDisabled={userEnrolled || enrolledStudents.includes(userId)}
                      >
                        {`${batch.name} | ${new Intl.DateTimeFormat('en-US', {
                          dateStyle: 'long',
                          timeStyle: 'short',
                        }).format(new Date(batch.start_date))} - ${new Intl.DateTimeFormat('en-US', {
                          dateStyle: 'long',
                          timeStyle: 'short',
                        }).format(new Date(batch.end_date))}`}
                      </SelectItem>
                    ))}
                  </Select>
                ) : (
                  <p className="text-gray-500">No available schedule.</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isDisabled={isSubmitting || userEnrolled || !data || !data.length || !data[0].batch.length || batch_id === 0}
                >
                  {isSubmitting ? <Spinner color="current" size="sm" /> : "Submit"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
