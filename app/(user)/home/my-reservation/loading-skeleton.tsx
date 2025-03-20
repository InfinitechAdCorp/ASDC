'use client';

import React from 'react';
import { Card, CardBody, Skeleton } from "@heroui/react";

const TableSkeleton = () => {
  return (
    <div className="flex w-full flex-col border-gray-200 py-1">
      <Skeleton className="mb-2 h-10 w-full rounded-lg" />
      {[...Array(5)].map((_, index) => (
        <div key="index" className="flex w-full gap-4 border-gray-200 py-2">
          <Skeleton className="h-4 w-1/4 rounded-lg" />
          <Skeleton className="h-4 w-1/4 rounded-lg" />
          <Skeleton className="h-4 w-1/4 rounded-lg" />
          <Skeleton className="h-4 w-1/4 rounded-lg" />
        </div>
      ))}
    </div>
  );
};

const CardSkeleton = () => {
  return (
    <Card className="w-full p-4">
      <CardBody className="gap-4">
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
      </CardBody>
    </Card>
  );
};

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="pt-1">
      <Card className="hidden sm:block">
        <CardBody>
          <TableSkeleton />
        </CardBody>
      </Card>
      <div className="sm:hidden">
        <CardSkeleton />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
