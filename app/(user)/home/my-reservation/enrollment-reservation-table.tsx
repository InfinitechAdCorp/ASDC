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
} from "@heroui/react";

import { useEnrollmentReservation } from './data';
import LoadingSkeleton from './loading-skeleton';

const EnrollmentReservationTable: React.FC = () => {
  const user_id = Number(localStorage.getItem('id')) || 0;
  const { data, isLoading, isError } = useEnrollmentReservation(user_id);

  if (isLoading) return <LoadingSkeleton />;

  if (isError) return <LoadingSkeleton />;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  const renderTable = (data: any[]) => (
    <Table
      aria-label="Reservations table"
      className="hidden w-full pt-1 md:table"
    >
      <TableHeader>
        <TableColumn className="text-center">ID</TableColumn>
        <TableColumn className="text-left">CLASS</TableColumn>
        <TableColumn className="text-left">INFO</TableColumn>
        <TableColumn className="text-left">DURATION</TableColumn>
        <TableColumn className="text-left">PRICE</TableColumn>
      </TableHeader>
      <TableBody emptyContent="No rows to display.">
        {data.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="text-center">{item.batch.id}</TableCell>
            <TableCell className="text-left">{item.batch.name}</TableCell>
            <TableCell className="text-left">
              {item.batch.product.name}
            </TableCell>
            <TableCell className="text-left">
              {formatDate(item.batch.start_date)} -{' '}
              {formatDate(item.batch.end_date)}
            </TableCell>
            <TableCell className="text-left">
              ₱
              {Intl.NumberFormat('en-PH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.batch.product.price)}
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
              <strong>ID:</strong> {item.batch.id}
            </p>
            <p>
              <strong>Class:</strong> {item.batch.name}
            </p>
            <p>
              <strong>Info:</strong> {item.batch.product.name}
            </p>
            <p>
              <strong>Duration:</strong> {formatDate(item.batch.start_date)} -{' '}
              {formatDate(item.batch.end_date)}
            </p>
            <p>
              <strong>Price:</strong> ₱
              {Intl.NumberFormat('en-PH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.batch.product.price)}
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

export default EnrollmentReservationTable;
