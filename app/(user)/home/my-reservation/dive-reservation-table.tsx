import React from 'react';
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@heroui/react";

import { useDiveReservation } from './data';
import LoadingSkeleton from './loading-skeleton';

const DiveReservationTable: React.FC = () => {
  const user_id = Number(localStorage.getItem('id')) || 0;
  const { data, isLoading, isError } = useDiveReservation(user_id);

  if (isLoading) return <LoadingSkeleton />;

  if (isError) return <LoadingSkeleton />;

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute.toString().padStart(2, '0');
    const period = isPM ? 'PM' : 'AM';

    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const renderTable = (data: any[]) => (
    <Table
      aria-label="Reservations table"
      className="hidden w-full pt-1 md:table"
    >
      <TableHeader>
        <TableColumn className="text-center">ID</TableColumn>
        <TableColumn className="text-center">STATUS</TableColumn>
        <TableColumn className="text-center">INFO</TableColumn>
        <TableColumn className="text-center">PARTICIPANT</TableColumn>
        <TableColumn className="text-center">LEVEL</TableColumn>
        <TableColumn className="text-center">DATE</TableColumn>
        <TableColumn className="text-center">NOTE</TableColumn>
      </TableHeader>
      <TableBody emptyContent="No rows to display.">
        {data.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="text-center">{item.id}</TableCell>
            <TableCell className="text-center">
              <Chip
                size="sm"
                color={item.status === 'Approved' ? 'success' : 'warning'}
                variant="flat"
              >
                {item.status}
              </Chip>
            </TableCell>
            <TableCell className="text-center">
              {item.name}
              <br />
              <small>{item.email}</small>
            </TableCell>
            <TableCell className="text-center">{item.participant}</TableCell>
            <TableCell className="text-center">{item.level}</TableCell>
            <TableCell className="text-center">
              {formatDate(item.date)} - {formatTime(item.time)}
            </TableCell>
            <TableCell className="text-center">{item.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderCards = (data: any[]) => (
    <div className="flex flex-col space-y-4 md:hidden">
      {data.map((item: any, index: number) => (
        <Card key={index} className="p-4">
          <CardBody>
            <p>
              <strong>ID:</strong> {item.id}
            </p>
            <p>
              <strong>Status:</strong>
              <Chip
                size="sm"
                color={item.status === 'Approved' ? 'success' : 'warning'}
                variant="flat"
              >
                {item.status}
              </Chip>
            </p>
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Participant:</strong> {item.participant}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(item.date)}
            </p>
            <p>
              <strong>Time:</strong> {formatTime(item.time)}
            </p>
            <p>
              <strong>Note:</strong> {item.message}
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );

  return (
    <div>
      {data && data.length > 0 ? (
        <>
          {renderTable(data)}
          {renderCards(data)}
        </>
      ) : (
        <p className="py-4 text-center">No reservations found.</p>
      )}
    </div>
  );
};

export default DiveReservationTable;
