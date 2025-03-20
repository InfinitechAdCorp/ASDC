'use client';

import React from 'react';
import useSWR, { mutate } from 'swr';
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
} from "@heroui/react";
import { Calendar, ChevronRight, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

import AddScheduleModal from './add-schedule-modal';

import BlueLoading from '@/components/admin/blue-loading';



const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SchedulePage = () => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    '/api/batch/get-by-course',
    fetcher,
  );

  if (error) return <div>Error loading data. Please try again later.</div>;
  if (isLoading)
    return (
      <div>
        <BlueLoading />
      </div>
    );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-2xl font-bold">Course Schedules</h1>
        <AddScheduleModal mutate={mutate} />
      </div>
      <Accordion variant="bordered">
        {data?.map((course: any, courseIndex: number) => (
          <AccordionItem
            key={courseIndex}
            aria-label={`Accordion ${courseIndex + 1}`}
            title={
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{course.name}</span>
                <Chip color="primary" variant="flat">
                  {course.batch.length}{' '}
                  {course.batch.length === 1 ? 'batch' : 'batches'}
                </Chip>
              </div>
            }
          >
            {course.batch && course.batch.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {course.batch.map((batch: any, batchIndex: number) => (
                  <Card
                    isPressable
                    onPress={() =>
                      router.push(`/admin/class/schedule/${batch.id}`)
                    }
                    key={batchIndex}
                    className="w-full"
                  >
                    <CardHeader className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{batch.name}</h3>
                      <Button
                        isIconOnly
                        color="primary"
                        variant="light"
                        aria-label={`View details for ${batch.name}`}
                      >
                        <ChevronRight size={20} />
                      </Button>
                    </CardHeader>
                    <CardBody>
                      <div className="mb-2 flex items-center">
                        <Calendar className="mr-2 text-primary" size={18} />
                        <p className="text-sm">
                          {formatDate(batch.start_date)} -{' '}
                          {formatDate(batch.end_date)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 text-primary" size={18} />
                        <p className="text-sm">
                          {formatTime(batch.start_date)} -{' '}
                          {formatTime(batch.end_date)}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <div>No available schedule</div>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SchedulePage;
