'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
} from "@heroui/react";
import useSWR from 'swr';

import BlueLoading from '@/components/admin/blue-loading';

function calculateDaysBetween(startDate: Date, endDate: Date) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const differenceInTime = end.getTime() - start.getTime();

  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return Math.ceil(differenceInDays);
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/dashboard', fetcher);

  if (error)
    return (
      <div>
        <BlueLoading />
      </div>
    );
  if (isLoading)
    return (
      <div>
        <BlueLoading />
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab as any}>
        <Tab key="overview" title="Overview">
          <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardBody>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{data.userCount}</p>
                <p className="text-xs text-green-500">+20.1% from last month</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-sm font-medium text-gray-500">
                  Active Bookings
                </p>
                <p className="text-2xl font-bold">{data.bookingCount}</p>
                <p className="text-xs text-green-500">+15% from last week</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-sm font-medium text-gray-500">
                  Available Rooms
                </p>
                <p className="text-2xl font-bold">{data.roomCount}</p>
                <p className="text-xs text-red-500">-5% from yesterday</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-sm font-medium text-gray-500">
                  Total Products
                </p>
                <p className="text-2xl font-bold">{data.productCount}</p>
                <p className="text-xs text-green-500">+2.5% from last month</p>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Recent Bookings</h2>
            </CardHeader>
            <CardBody>
              <Table aria-label="Recent bookings table">
                <TableHeader>
                  <TableColumn>USER</TableColumn>
                  <TableColumn>ROOM</TableColumn>
                  <TableColumn>CREATED AT</TableColumn>
                  <TableColumn>Duration</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                  {data.recentBooking.map((booking: any) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.fullname}</TableCell>
                      <TableCell>{booking.room_id}</TableCell>
                      <TableCell>
                        {new Date(booking.created_at).toLocaleString('en-US', {
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
                        {new Date(booking.start_date).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          },
                        )}
                        &nbsp;to&nbsp;
                        {new Date(booking.end_date).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          },
                        )}
                        &nbsp;-&nbsp;
                        {calculateDaysBetween(
                          booking.start_date,
                          booking.end_date,
                        )}
                        &nbsp;
                        {calculateDaysBetween(
                          booking.start_date,
                          booking.end_date,
                        ) === 1
                          ? 'day'
                          : 'days'}
                      </TableCell>
                      <TableCell>{booking.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="users" title="Users">
          <Card>
            <CardBody>
              <h2 className="mb-4 text-xl font-bold">User Management</h2>
              <p>User management interface will be implemented here.</p>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="rooms" title="Rooms">
          <Card>
            <CardBody>
              <h2 className="mb-4 text-xl font-bold">Room Management</h2>
              <p>Room management interface will be implemented here.</p>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="bookings" title="Bookings">
          <Card>
            <CardBody>
              <h2 className="mb-4 text-xl font-bold">Booking Management</h2>
              <p>Booking management interface will be implemented here.</p>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="products" title="Products">
          <Card>
            <CardBody>
              <h2 className="mb-4 text-xl font-bold">Product Management</h2>
              <p>Product management interface will be implemented here.</p>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
