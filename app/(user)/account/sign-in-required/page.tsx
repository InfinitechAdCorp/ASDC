'use client';

import React from 'react';
import { Card, CardBody, Button, Image } from "@heroui/react";
import { LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SignInRequired: React.FC = () => {
  const router = useRouter();

  // const handleSignIn = () => {
  //     router.push('/signin')
  // }

  return (
    <div className="flex h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md">
        {/* <CardHeader className="flex gap-3 justify-center">
                    <p className="text-2xl font-bold text-primary">Hello!</p>
                </CardHeader> */}
        <CardBody className="p-8 text-center">
          <div className="flex justify-center">
            <Image
              alt="Friendly diving illustration"
              className="mb-4"
              src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop.jpg"
              height={200}
              width={300}
            />
          </div>
          <p className="mb-6 text-lg">
            We&apos;re excited to show you more, but first, we need to know who
            you are!
          </p>
          <p className="mb-6">
            Sign in to unlock amazing diving experiences and connect with our
            community.
          </p>
          <Button
            // color="primary"
            // variant="shadow"
            startContent={<LogIn className="h-5 w-5" />}
            className="w-full text-lg font-semibold text-white bg-logo-blue"
            size="lg"
            onClick={() => router.push(`/account/sign-in`)}
          >
            Let&apos;s Dive In!
          </Button>
        </CardBody>
      </Card >
    </div >
  );
};

export default SignInRequired;
