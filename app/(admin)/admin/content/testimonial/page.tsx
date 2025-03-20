'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import {
  Tooltip,
  Pagination,
  Button,
  Checkbox,
  Input,
  useDisclosure,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@heroui/react';
import { FilePenLine, Search, Trash2, Plus } from 'lucide-react';

import CreateFAQModal from './create-faq-modal';
import UpdateFAQModal from './update-faq-modal';
import DeleteFAQModal from './delete-faq-modal';

import BlueLoading from '@/components/admin/blue-loading';
import CustomToastContainer from '@/components/admin/custom_toast_container';

interface FAQ {
  id: number;
  title: string;
  body: string;
  show: boolean;
  fullname: string;
  created_at: string;
  updated_at: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TestimonialTable: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onOpenChange: onUpdateOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();
  const {
    data: users = [],
    error,
    mutate,
  } = useSWR<FAQ[]>(`/api/testimonial`, fetcher);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<FAQ | null>(null);

  const filteredUsers = users
    .filter((user) => user.show !== false) // ✅ Exclude users where `show` is false
    .filter(
      (user) =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.title.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const handleToggleShow = async (id: number, currentShowValue: boolean) => {
    try {
      // Make a PATCH request to toggle the 'show' value
      const response = await fetch(`/api/testimonial/visibility?id=${id}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to update testimonial');
      }

      // Toggle the local `show` value after the request
      mutate(); // Trigger a re-fetch of the data
    } catch (error) {
      console.error('Error toggling show:', error);
    }
  };

  if (error)
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  if (!users.length)
    return (
      <div>
        <BlueLoading />
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
        <Button size="md" onPress={onOpen} color="primary" className="hidden">
          <Plus size={16} /> New Testimonial
        </Button>
      </div>
      <div className="mb-4">
        <small className="text-gray-500 dark:text-gray-300">
          Total {filteredUsers.length} Testimonial
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
          <TableColumn>AUTHOR</TableColumn>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>BODY</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn className="text-center">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.fullname}</TableCell>
              <TableCell>{data.title}</TableCell>
              <TableCell>{data.body}</TableCell>
              <TableCell>
                {new Date(data.created_at).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </TableCell>
              <TableCell>
                {new Date(data.updated_at).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </TableCell>
              <TableCell>
                <div className="flex justify-center space-x-2">
                  <div className="w-20">
                    <Checkbox
                      defaultSelected={data.show}
                      onChange={() => handleToggleShow(data.id, data.show)}
                    >
                      {data.show ? 'Show' : 'Hide'}
                    </Checkbox>
                  </div>
                  <Tooltip content="Edit Testimonial">
                    <span
                      onClick={() => handleUpdateUser(data)}
                      className="cursor-pointer text-lg text-default-400 active:opacity-50"
                    >
                      <FilePenLine size={20} />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete Testimonial">
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

export default TestimonialTable;
