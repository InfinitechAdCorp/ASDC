'use client';

import React from 'react';
import { Button, Card, CardBody, Image } from "@heroui/react";
import { Monitor, Smartphone, ArrowRight } from 'lucide-react';

export default function DesktopOnly() {

    return (
        <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white p-8 dark:bg-black">
            <Card className="w-full max-w-[90%] sm:max-w-[70%] lg:max-w-[50%] bg-background/60 dark:bg-default-100/50 backdrop-blur-md">
                <CardBody className="flex flex-col items-center p-6 sm:p-8 text-center">
                    <div className="flex items-center justify-center mb-6">
                        <Smartphone className="h-16 w-16 text-gray-400 mr-4" />
                        <ArrowRight className="h-8 w-8 text-blue-600 mx-2" />
                        <Monitor className="h-16 w-16 text-blue-600" />
                    </div>
                    <h1 className="mb-4 text-3xl sm:text-4xl font-bold text-blue-600">
                        Best Viewed on Desktop
                    </h1>
                    <p className="mb-6 text-lg sm:text-xl text-foreground-600">
                        For the best diving experience, please visit us on a larger screen.
                    </p>
                    <div className="space-y-4 w-full max-w-md">
                        <p className="text-sm sm:text-base text-foreground-600">
                            Our underwater world is vast and beautiful. To fully appreciate the details of our dive sites and services, we recommend using a desktop or laptop computer.
                        </p>
                        <div className="h-px bg-gray-300 w-full my-4"></div>
                        <p className="text-sm sm:text-base text-foreground-600">
                            {/* Don't worry, we're working on making our site mobile-friendly.*/} In the meantime, you can still contact us or check basic information below.
                        </p>
                    </div>
                    {/* <div className="flex flex-col sm:flex-row w-full gap-4 mt-8">
                        <Button
                            color="primary"
                            variant="shadow"
                            startContent={<Monitor className="h-5 w-5" />}
                            className="flex-1 bg-blue-600 shadow-none min-h-10"
                            onPress={() => router.push('/')}
                        >
                            Continue to Desktop Site
                        </Button>
                        <Button
                            color="secondary"
                            variant="bordered"
                            className="flex-1 min-h-10"
                            onPress={() => router.push('/contact')}
                        >
                            Contact Us
                        </Button>
                    </div> */}
                </CardBody>
            </Card>
            {/* <div className="mt-8 text-center text-sm text-gray-600">
                <p>© 2023 Anilao Scuba Dive Center. All rights reserved.</p>
                <p className="mt-2">
                    Questions? Call us at: <a href="tel:+639123456789" className="text-blue-600 hover:underline">+63 912 345 6789</a>
                </p>
            </div> */}
        </div>
    );
}

