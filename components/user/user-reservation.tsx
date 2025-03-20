'use client';
// External libraries
import useSWR from 'swr';
import React from 'react';
import { Card, CardBody, CardHeader, Chip, Divider } from "@heroui/react";
import { Calendar } from 'lucide-react';

// Internal imports
import BlueLoading from '../admin/blue-loading';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Booking {
  id: string;
  status: string;
  created_at: string;
  start_date: string;
  end_date: string;
  guest: number;
}

export default function UserReservation() {
  const params = new URLSearchParams(window.location.search);
  const user_id = params.get('id');
  const { data, error } = useSWR<Booking[]>(
    `/api/bookings?id=${user_id}`,
    fetcher,
  );

  if (error)
    return (
      <div>
        <BlueLoading />
      </div>
    );
  if (!data)
    return (
      <div>
        <BlueLoading />
      </div>
    );

  return (
    <div className="mx-auto max-w-full p-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {data.map((booking) => (
          <Card key={booking.id} className="p-4">
            <CardHeader className="flex gap-3">
              <Calendar className="h-6 w-6" />
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <p className="text-md">Your Reservation</p>
                </div>
                <p className="text-small text-default-500">
                  Anilao Scuba Diving Resort
                </p>
              </div>
              <Chip
                variant="solid"
                size="sm"
                className={`absolute right-4 top-4 ${booking.status === 'Pending' ? 'bg-yellow-500 text-white' : booking.status === 'Approved' ? 'bg-green-500 text-white' : ''}`}
              >
                {booking.status}
              </Chip>
            </CardHeader>
            <CardBody className="p-0">
              <Divider className="mb-2" />
              <div className="space-y-2">
                <div>
                  <p>
                    <strong>Reservation ID:</strong> {booking.id} -{' '}
                    {new Date(booking.end_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p>
                    <strong>Room Type:</strong> &quot;Regular&quot;{' '}
                  </p>
                  <p>
                    <strong>Check-in:</strong>{' '}
                    {new Date(booking.start_date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p>
                    <strong>Check-out:</strong>{' '}
                    {new Date(booking.end_date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p>
                    <strong>Guests:</strong> {booking.guest}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
