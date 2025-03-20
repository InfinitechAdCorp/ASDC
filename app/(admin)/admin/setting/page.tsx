'use client';

import React from 'react';
import { Button, Card, CardBody, Image } from "@heroui/react";
import { Home, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UnderConstruction() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 ">
            <Card className="w-full max-w-[90%] sm:max-w-[70%] lg:max-w-[50%] bg-background/60 dark:bg-default-100/50 backdrop-blur-md">
                <CardBody className="flex flex-col items-center p-6 sm:p-8 text-center">
                    <h1 className="mb-6 text-4xl sm:text-6xl font-extrabold text-blue-600">
                        Under Construction
                    </h1>
                    <div className="relative mb-6 h-24 w-24 sm:h-32 sm:w-32">
                        <Image
                            src="/img/fish-coding.webp"
                            alt="Construction Icon"
                            width={128}
                            height={128}
                        />
                    </div>
                    <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-blue-600">
                        We're Gearing Up!
                    </h2>
                    <p className="mb-4 text-base sm:text-xl text-foreground-600">
                        Our website is currently undergoing maintenance and upgrades.
                    </p>
                    <p className="mb-6 text-sm sm:text-base text-foreground-600">
                        We're working hard to bring you an improved diving experience.
                        Dive back in soon for exciting updates!
                    </p>
                    {/* <div className="flex w-full flex-col sm:flex-row gap-4">
                        <Button
                            color="primary"
                            variant="shadow"
                            startContent={<Home className="h-5 w-5" />}
                            className="flex-1 bg-blue-600 shadow-none min-h-10"
                            onPress={() => router.push('/')}
                        >
                            Home
                        </Button>
                        <Button
                            color="primary"
                            variant="bordered"
                            startContent={<Mail className="h-5 w-5" />}
                            className="flex-1 min-h-10"
                            onPress={() => router.push('/contact')}
                        >
                            Contact Us
                        </Button>
                    </div> */}
                </CardBody>
            </Card>
        </div>
    );
}

