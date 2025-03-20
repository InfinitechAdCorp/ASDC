import React, { useState } from 'react';
import { Card, CardBody, Input } from "@heroui/react";

interface ReservationCardProps {
  onDatesChange: (startDate: string, endDate: string) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ onDatesChange }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const today = new Date().toISOString().split('T')[0];

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    onDatesChange(date, endDate);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    onDatesChange(startDate, date);
  };

  return (
    <Card className="w-full">
      <CardBody className="flex flex-col gap-x-4 gap-y-4 sm:flex-row">
        <Input
          type="date"
          label="Start Date"
          placeholder="Select start date"
          className="flex-grow"
          min={today}
          value={startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
        />
        <Input
          type="date"
          label="End Date"
          placeholder="Select end date"
          className="flex-grow"
          min={startDate || today}
          value={endDate}
          onChange={(e) => handleEndDateChange(e.target.value)}
        />
      </CardBody>
    </Card>
  );
};

export default ReservationCard;
