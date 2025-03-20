'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Button,
  Textarea,
  CardHeader,
  CardFooter,
} from "@heroui/react";
import { CircleAlert, CircleCheck } from 'lucide-react';

import ImageSlider from './image-slider';

const diveLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const BookYourDivePage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user_id, setUserId] = useState('');

  useEffect(() => {
    const first_name = localStorage.getItem('first_name') || '';
    const last_name = localStorage.getItem('last_name') || '';
    const emailLocal = localStorage.getItem('email') || '';
    const userId = localStorage.getItem('id') || '';

    setName(`${first_name} ${last_name}`.trim());
    setEmail(emailLocal);
    setUserId(userId);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [participant, setParticipant] = useState('1');
  const [level, setLevel] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (
      !name.trim() ||
      !email.trim() ||
      !date.trim() ||
      !time.trim() ||
      !participant.trim() ||
      !level.trim() ||
      !message.trim()
    ) {
      setError('All fields are required.');

      return;
    }

    try {
      const formData = {
        user_id: Number(user_id),
        name,
        email,
        date,
        time,
        participant: Number(participant),
        level,
        message,
      };

      const response = await fetch('/api/bookings/dive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Your dive adventure is officially booked! 🌊🤿');
        setName('');
        setEmail('');
        setDate('');
        setTime('');
        setParticipant('1');
        setLevel('');
        setMessage('');
      } else {
        setError('Error submitting the form.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-20 sm:px-6 lg:px-8 lg:pt-32">
      <div className="container mx-auto">
        <h1 className="mb-8 text-center text-4xl font-bold text-logo-blue">
          Book Your Dive
        </h1>
        <div className="flex flex-col items-stretch gap-8 lg:flex-row">
          <div className="flex lg:w-1/2">
            <Card className="flex-grow">
              <CardBody className="p-0">
                <ImageSlider />
              </CardBody>
            </Card>
          </div>
          <div className="flex lg:w-1/2">
            <Card className="flex-grow">
              <CardHeader>
                <h2 className="text-2xl font-bold text-primary">Form</h2>
              </CardHeader>
              <CardBody>
                {error && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800">
                    <CircleAlert /> <p>{error}</p>
                  </div>
                )}
                {success && (
                  <div
                    className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
                    role="alert"
                  >
                    <CircleCheck /> <p>{success}</p>
                  </div>
                )}
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="underlined"
                    isRequired
                  />
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="underlined"
                    isRequired
                  />
                  <div className="flex gap-4">
                    <Input
                      label="Date"
                      placeholder="Select date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      variant="underlined"
                      min={today}
                      isRequired
                    />
                    <Input
                      label="Time"
                      placeholder="Select time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      variant="underlined"
                      isRequired
                    />
                  </div>
                  <Input
                    label="Number of participants"
                    placeholder="Enter number of participants"
                    type="number"
                    min="1"
                    value={participant}
                    onChange={(e) => setParticipant(e.target.value)}
                    variant="underlined"
                    isRequired
                  />
                  <Select
                    label="Dive Level"
                    placeholder="Select your dive level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    variant="underlined"
                    isRequired
                  >
                    {diveLevels.map((level) => (
                      <SelectItem key={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Textarea
                    label="Additional Message"
                    placeholder="Any special requests or information"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    variant="underlined"
                    isRequired
                  />
                </div>
              </CardBody>
              <CardFooter>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  size="lg"
                  className="w-full"
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookYourDivePage;
