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

import { useRoomReservation } from './data';
import LoadingSkeleton from './loading-skeleton';

const RoomReservationTable: React.FC = () => {
  const user_id = Number(localStorage.getItem('id')) || 0;

  const { data, isLoading, isError } = useRoomReservation(user_id);

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    return `${duration} day(s)`;
  };

  if (isLoading) return <LoadingSkeleton />;

  if (isError) return <LoadingSkeleton />;

  const renderTable = (data: any[]) => (
    <Table
      aria-label="Reservations table"
      className="hidden w-full pt-1 md:table"
    >
      <TableHeader>
        <TableColumn className="text-center">ID</TableColumn>
        <TableColumn className="text-center">STATUS</TableColumn>
        <TableColumn className="text-center">ROOM</TableColumn>
        <TableColumn className="text-center">FULLNAME</TableColumn>
        <TableColumn className="text-center">GUEST</TableColumn>
        <TableColumn className="text-center">DURATION</TableColumn>
      </TableHeader>
      <TableBody emptyContent={'No rows to display.'}>
        {data.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="text-center">{item.id}</TableCell>
            <TableCell className="text-center">
              <Chip
                size="sm"
                color={
                  item.status.toLowerCase() === 'approved'
                    ? 'success'
                    : 'warning'
                }
                variant="flat"
              >
                {item.status}
              </Chip>
            </TableCell>
            <TableCell className="text-center">{item.room_id}</TableCell>
            <TableCell className="text-center">{item.fullname}</TableCell>
            <TableCell className="text-center">{item.guest}</TableCell>
            <TableCell className="text-center">
              {new Date(item.start_date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              &nbsp;-&nbsp;
              {new Date(item.end_date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              &nbsp;
              {calculateDuration(item.start_date, item.end_date)}
            </TableCell>
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
                color={
                  item.status.toLowerCase() === 'approved'
                    ? 'success'
                    : 'warning'
                }
                variant="flat"
              >
                {item.status}
              </Chip>
            </p>
            <p>
              <strong>Room:</strong> {item.room_id}
            </p>
            <p>
              <strong>Fullname:</strong> {item.fullname}
            </p>
            <p>
              <strong>Guest:</strong> {item.guest}
            </p>
            <p>
              <strong>Duration:</strong>{' '}
              {calculateDuration(item.start_date, item.end_date)}
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

export default RoomReservationTable;
