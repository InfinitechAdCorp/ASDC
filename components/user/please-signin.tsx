'use client';

import React from 'react';
import { Card, CardBody, CardHeader, Button, Image } from "@heroui/react";
import { LogIn, Smile } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PleaseSigninMessage: React.FC = () => {
  const router = useRouter();

  const handleSignIn = () => {
    // Replace '/signin' with your actual sign-in page route
    router.push('/signin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-center gap-3">
          <Smile className="h-8 w-8 text-primary" />
          <p className="text-2xl font-bold text-primary">Hello, Friend!</p>
        </CardHeader>
        <CardBody className="text-center">
          <Image
            alt="Friendly diving illustration"
            className="mx-auto mb-4 rounded-lg"
            src="/placeholder.svg?height=200&width=300"
            height={200}
            width={300}
          />
          <p className="mb-6 text-lg">
            We&apos;re excited to show you more, but first, we need to know who
            you are!
          </p>
          <p className="mb-6">
            Sign in to unlock amazing diving experiences and connect with our
            community.
          </p>
          <Button
            color="primary"
            variant="shadow"
            startContent={<LogIn className="h-5 w-5" />}
            className="w-full text-lg font-semibold"
            size="lg"
            onPress={handleSignIn}
          >
            Let&apos;s Dive In!
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default PleaseSigninMessage;
