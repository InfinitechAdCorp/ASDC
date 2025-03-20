'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import {
  Input,
  Tooltip,
  Pagination,
  Image,
  Chip,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  useDisclosure
} from "@heroui/react";
import { Archive, Search, UserPen } from 'lucide-react';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';

import UpdateUserModal from './update-user-modal';
import ArchiveUserModal from './archive-user-modal';

import CustomToastContainer from '@/components/admin/custom_toast_container';
import BlueLoading from '@/components/admin/blue-loading';



interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  is_archived: boolean;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserTable: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const {
    data: users = [],
    error,
    mutate,
  } = useSWR<User[]>(`/api/user/index`, fetcher);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const pages = Math.ceil(filteredUsers.length / rowsPerPage);

  const handleUpdateUser = (user: User) => {
    setSelectedUser(user);
    onEditOpen();
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
          placeholder="Search by first or last name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 text-default-600"
          startContent={<Search size={20} />}
        />
      </div>
      <div className="mb-4">
        <small className="text-gray-500 dark:text-gray-300">
          Total {filteredUsers.length} users
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
          <TableColumn>FULL NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>UPDATED AT</TableColumn>
          <TableColumn className="text-center">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {paginatedUsers.map((data) => (
            <TableRow key={data.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Gallery withDownloadButton>
                    <Item original={data.avatar} height="500" width="500">
                      {({ ref, open }) => (
                        <Image
                          ref={ref}
                          onClick={open}
                          src={data.avatar}
                          alt="Product Image"
                          width={35}
                          height={35}
                          className="cursor-pointer object-cover"
                        />
                      )}
                    </Item>
                  </Gallery>
                  <div>
                    <p className="font-semibold">
                      {data.first_name} {data.last_name}
                    </p>
                    <small className="text-gray-600">User # : {data.id}</small>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={data.is_verified ? 'success' : 'warning'}
                      className="ml-2 h-6 w-32 max-w-full text-center"
                    >
                      {data.is_verified ? 'Verified' : 'Unverified'}
                    </Chip>
                  </div>
                </div>
              </TableCell>
              <TableCell>{data.email}</TableCell>
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
                  <Tooltip content="Edit user">
                    <span
                      onClick={() => handleUpdateUser(data)}
                      className="cursor-pointer text-lg text-default-400 active:opacity-50"
                    >
                      <UserPen size={20} />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Archive user">
                    <span
                      onClick={() => {
                        setSelectedUser(data);
                        onOpen();
                      }}
                      className="cursor-pointer text-lg text-danger active:opacity-50"
                    >
                      <Archive size={20} />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          isOpen={isEditOpen}
          onClose={onEditOpenChange}
          onSave={() => {
            mutate();
          }}
        />
      )}
      {selectedUser && (
        <ArchiveUserModal
          user={selectedUser}
          isOpen={isOpen}
          onClose={onOpenChange}
          onSave={() => {
            mutate();
          }}
        />
      )}
    </div>
  );
};

export default UserTable;
