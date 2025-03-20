'use client';

import React from 'react';
import { Card, CardHeader, CardBody, Image, Tooltip } from "@heroui/react";
import { Share } from 'lucide-react';

interface LeftCardProps {
  title: string;
  description: string;
  image: string;
}

const LeftCard: React.FC<LeftCardProps> = ({ title, description, image }) => {
  const handleShare = () => {
    const shareableLink = window.location.href;

    navigator.clipboard.writeText(shareableLink);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex w-full items-start justify-between">
          <div>
            <div className="text-xl font-bold dark:text-white">{title}</div>
            <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
              {description}
            </div>
          </div>
        </div>
        <Tooltip content="Share link">
          <span
            onClick={handleShare}
            className="absolute right-4 top-4 z-10 cursor-pointer text-lg text-primary active:opacity-50"
          >
            <Share size={20} />
          </span>
        </Tooltip>
      </CardHeader>
      <CardBody>
        <Image isZoomed src={image} alt="thumbnail" />
      </CardBody>
    </Card>
  );
};

export default LeftCard;
