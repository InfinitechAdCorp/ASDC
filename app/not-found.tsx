'use client';

import React from 'react';
import { Button, Card, CardBody, Image } from "@heroui/react";
import { Home, Compass } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="fixed left-4 top-8 flex items-center space-x-2">
        <Image
          width={40} // Scaled for better fit on smaller screens
          alt="NextUI Hero Image"
          src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop.jpg"
        />
        <p className="text-lg sm:text-2xl font-bold text-logo-blue">
          Anilao Scuba Dive Center
        </p>
      </div>
      <Card className="w-full max-w-[90%] sm:max-w-[70%] lg:max-w-[50%] backdrop-blur-md">
        <CardBody className="flex flex-col items-center p-6 sm:p-8 text-center">
          <h1 className="fixed justify-center text-7xl sm:text-9xl font-extrabold text-logo-blue">
            404
          </h1>
          <div className="relative mb-6 h-24 w-24 sm:h-32 sm:w-32">
            {/* Placeholder for animations or additional icons */}
          </div>
          <h1 className="mb-2 text-2xl sm:text-4xl font-bold text-logo-blue">
            Page Not Found
          </h1>
          <p className="mb-4 text-base sm:text-xl text-gray-600">
            Looks like you&apos;ve drifted into uncharted waters!
          </p>
          <p className="mb-6 text-sm sm:text-base text-gray-600">
            Don&apos;t worry, even the best divers sometimes lose their way.
            Let&apos;s get you back to familiar territory.
          </p>
          <div className="flex w-full flex-col sm:flex-row gap-4">
            <Button
              color="primary"
              variant="shadow"
              startContent={<Home className="h-5 w-5" />}
              className="flex-1 bg-logo-blue shadow-none min-h-10"
              onPress={() => router.push('/')}
            >
              Return to Surface
            </Button>
            <Button
              color="secondary"
              variant="bordered"
              startContent={<Compass className="h-5 w-5" />}
              className="flex-1 min-h-10"
              size="md"
              onPress={() => router.back()}
            >
              Previous Dive Site
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}