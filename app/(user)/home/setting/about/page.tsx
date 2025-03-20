'use client';

import React from 'react';
import { Card, CardBody, Image, Button, Link } from "@heroui/react";
import { ChevronLeft, Instagram, Facebook, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutUsMobile() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4">
            <Button
                variant="light"
                color="primary"
                startContent={<ChevronLeft className="h-5 w-5" />}
                onPress={() => router.back()}
                className="mb-4"
            >
                Back
            </Button>

            <Card className="bg-background/60 dark:bg-default-100/50 backdrop-blur-md">
                <CardBody className="flex flex-col items-center text-center">
                    <Image
                        src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop.jpg"
                        alt="Anilao Scuba Dive Center Logo"
                        width={100}
                        height={100}
                        className="rounded-full mb-4"
                    />
                    <h1 className="text-2xl font-bold text-blue-600 mb-2">Anilao Scuba Dive Center</h1>
                    <p className="text-foreground-600 mb-4">Your Gateway to Underwater Wonders</p>

                    <div className="space-y-4 text-left w-full">
                        <section>
                            <h2 className="text-xl font-semibold text-blue-600 mb-2">Our Story</h2>
                            <p className="text-sm text-foreground-600">
                                Founded in 2010, Anilao Scuba Dive Center has been a beacon for diving enthusiasts in the Philippines.
                                Our passion for the underwater world and commitment to safety have made us a trusted name in the diving community.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-blue-600 mb-2">What We Offer</h2>
                            <ul className="list-disc list-inside text-sm text-foreground-600">
                                <li>PADI-certified diving courses</li>
                                <li>Guided dive tours to Anilao's best sites</li>
                                <li>State-of-the-art diving equipment rental</li>
                                <li>Marine conservation programs</li>
                                <li>Underwater photography workshops</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-blue-600 mb-2">Our Team</h2>
                            <p className="text-sm text-foreground-600">
                                Our experienced instructors and dive masters are not just professionals; they're passionate
                                about sharing the beauty of the underwater world. With years of experience and a deep love
                                for the ocean, our team ensures your safety and enjoyment on every dive.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-blue-600 mb-2">Location</h2>
                            <p className="text-sm text-foreground-600">
                                Nestled in the heart of Anilao, Batangas, our dive center offers easy access to some of
                                the Philippines' most diverse marine ecosystems. From vibrant coral reefs to exciting
                                wreck dives, we're your gateway to unforgettable underwater adventures.
                            </p>
                        </section>
                    </div>

                    <div className="flex justify-center space-x-4 mt-6">
                        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <Button isIconOnly color="primary" variant="flat" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <Button isIconOnly color="primary" variant="flat" aria-label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="mailto:info@anilaoscuba.com">
                            <Button isIconOnly color="primary" variant="flat" aria-label="Email">
                                <Mail className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </CardBody>
            </Card>

            <footer className="mt-6 text-center text-sm text-gray-600">
                <p>© 2023 Anilao Scuba Dive Center. All rights reserved.</p>
                <p className="mt-2">
                    Questions? Call us at: <a href="tel:+639123456789" className="text-blue-600 hover:underline">+63 912 345 6789</a>
                </p>
            </footer>
        </div>
    );
}

