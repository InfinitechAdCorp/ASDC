'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function AccountVerified({
  params,
}: {
  params: { email: string };
}) {
  const { email } = params;
  const router = useRouter();

  useEffect(() => {
    const updateUserStatus = async () => {
      try {
        const response = await fetch(`/api/auth/sign-up?email=${email}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to update user status');
        }

        console.log('User status updated successfully');
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    };

    updateUserStatus();
  }, [email]);

  const handleGoHome = () => {
    router.push('/home');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center px-4 pb-6 pt-8">
          <div className="mb-4 rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-center text-2xl font-bold">
            Account Successfully Verified!
          </h1>
        </CardHeader>
        <CardBody className="flex flex-col items-center px-4 pb-8">
          <div className="relative mb-6 aspect-square w-full max-w-xs">
            <Image
              src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop.jpg"
              alt="Account Verified"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <p className="mb-6 text-center text-gray-600">
            Great news! Your account has been successfully verified. You now
            have full access to all our features.
          </p>
          <Button
            onClick={handleGoHome}
            color="primary"
            size="lg"
            className="font-semibold"
          >
            Go to Home
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
