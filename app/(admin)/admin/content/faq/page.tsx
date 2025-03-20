'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import {
  Input,
  Tooltip,
  Pagination,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";
import { FilePenLine, Search, Trash2, Plus } from 'lucide-react';


import CreateFAQModal from './create-faq-modal';
import UpdateFAQModal from './update-faq-modal';
import DeleteFAQModal from './delete-faq-modal';

import BlueLoading from '@/components/admin/blue-loading';
import CustomToastContainer from '@/components/admin/custom_toast_container';


interface FAQ {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FAQTable: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // For add modal
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onOpenChange: onUpdateOpenChange,
  } = useDisclosure(); // For update modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure(); // For delete modal
  const {
    data: users = [],
    error,
    mutate,
  } = useSWR<FAQ[]>(`/api/faq`, fetcher);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<FAQ | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const pages = Math.ceil(filteredUsers.length / rowsPerPage);

  const handleUpdateUser = (user: FAQ) => {
    setSelectedUser(user);
    onUpdateOpen();
  };

  if (error)
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div>
      <CustomToastContainer />
      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Search by question or answer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 text-default-600"
          startContent={<Search size={20} />}
        />
        <Button size="md" onPress={onOpen} color="primary">
          <Plus size={16} /> New FAQ
        </Button>
      </div>
      <div className="mb-4">
        <small className="text-gray-500 dark:text-gray-300">
          Total {filteredUsers.length} FAQ
        </small>
      </div>
      <Table
        selectionMode="single"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: 'min-h-[222px]',
        }}
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>QUESTION</TableColumn>
          <TableColumn>ANSWER</TableColumn>
          <TableColumn className="text-center">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {paginatedUsers.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.question}</TableCell>
              <TableCell>{data.answer}</TableCell>
              <TableCell>
                <div className="flex justify-center space-x-2">
                  <Tooltip content="Edit FAQ">
                    <span
                      onClick={() => handleUpdateUser(data)}
                      className="cursor-pointer text-lg text-default-400 active:opacity-50"
                    >
                      <FilePenLine size={20} />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete FAQ">
                    <span
                      onClick={() => {
                        setSelectedUser(data);
                        onDeleteOpen();
                      }}
                      className="cursor-pointer text-lg text-danger active:opacity-50"
                    >
                      <Trash2 size={20} />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateFAQModal isOpen={isOpen} onClose={onOpenChange} mutate={mutate} />
      {selectedUser && (
        <UpdateFAQModal
          faq={selectedUser}
          isOpen={isUpdateOpen}
          onClose={onUpdateOpenChange}
          onSave={() => {
            mutate();
          }}
        />
      )}
      {selectedUser && (
        <DeleteFAQModal
          faq={selectedUser}
          isOpen={isDeleteOpen}
          onClose={onDeleteOpenChange}
          onSave={() => {
            mutate();
          }}
        />
      )}
    </div>
  );
};

export default FAQTable;
