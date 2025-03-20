'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { usePathname } from 'next/navigation';
import {
  Card,
  Table,
  CardBody,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@heroui/react";
import { Calendar, Users, BookOpen, Trash2 } from 'lucide-react';


import AddStudentModal from './add-student-modal';
import RemoveStudentModal from './remove-student-modal';

import BlueLoading from '@/components/admin/blue-loading';


interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
}

interface Student {
  id: number;
  user_id: number;
  batch_id: number;
  created_at: string;
  user: User;
}

interface Batch {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  product: Product;
  students: Student[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BatchStudentsPage = () => {
  const pathname = usePathname();
  const course_id = pathname?.split('/').pop();

  const { data, error, mutate } = useSWR<Batch[]>(
    `/api/batch?id=${course_id}`,
    fetcher,
  );

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (error || !data) return <BlueLoading />;

  const batch = data[0];
  const students = batch.students;

  const handleRemoveStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto">
      <Card className="mb-6">
        <CardBody>
          <div className="flex justify-between">
            <h1 className="mb-4 text-2xl font-bold">{batch.name}</h1>
            <AddStudentModal
              course_id={parseInt(course_id || '0', 10)}
              onMutate={() => mutate()}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center">
              <Calendar className="mr-2 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p>
                  {new Date(batch.start_date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
                <p>
                  {new Date(batch.end_date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">
                  Course #{batch.product.id}
                </p>
                <p>{batch.product.name}</p>
                <Chip size="sm" color="primary">
                  {batch.product.category}
                </Chip>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Students</p>
                <p>{students.length}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <h2 className="mb-4 text-xl font-semibold">Enrolled Students</h2>
      <Table aria-label="Students table">
        <TableHeader>
          <TableColumn>FIRST NAME</TableColumn>
          <TableColumn>LAST NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ENROLLED ON</TableColumn>
          <TableColumn className="flex items-center justify-center">
            ACTION
          </TableColumn>
        </TableHeader>
        <TableBody>
          {students.map((student: Student) => (
            <TableRow key={student.id}>
              <TableCell>{student.user.first_name}</TableCell>
              <TableCell>{student.user.last_name}</TableCell>
              <TableCell>{student.user.email}</TableCell>
              <TableCell>
                {new Date(student.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="flex justify-center">
                <Tooltip color="danger" content="Remove student">
                  <span
                    onClick={() => handleRemoveStudent(student)}
                    className="cursor-pointer text-lg text-danger active:opacity-50"
                  >
                    <Trash2 size={20} />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedStudent && (
        <RemoveStudentModal
          student={selectedStudent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {
            mutate();
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default BatchStudentsPage;
