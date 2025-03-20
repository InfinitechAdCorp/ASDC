'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  AnchorIcon,
  AwardIcon,
  HeartHandshakeIcon,
  MapIcon,
  ShieldCheckIcon,
  UsersIcon,
} from 'lucide-react';

const reasons = [
  {
    icon: AwardIcon,
    title: 'Expert Instructors',
    description:
      'Our team of PADI-certified instructors brings years of experience and passion to every dive.',
  },
  {
    icon: MapIcon,
    title: 'Prime Location',
    description:
      'Situated in the heart of Anilao, we offer easy access to the best dive sites in the Philippines.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Safety First',
    description:
      'We prioritize your safety with top-notch equipment and strict adherence to diving protocols.',
  },
  {
    icon: UsersIcon,
    title: 'Small Groups',
    description:
      'We keep our dive groups small to ensure personalized attention and a better learning experience.',
  },
  {
    icon: HeartHandshakeIcon,
    title: 'Eco-Friendly Practices',
    description:
      "We're committed to preserving the marine ecosystem through responsible diving practices.",
  },
  {
    icon: AnchorIcon,
    title: 'Modern Facilities',
    description:
      'Our dive center is equipped with the latest gear and comfortable amenities for your convenience.',
  },
];

const WhyChooseUs: React.FC = () => {
  const router = useRouter();
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      router.push('/home/book-your-dive');
    } else {
      router.push('/account/sign-in-required');
    }
  };

  return (
    <section ref={sectionRef} className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold text-logo-blue">
          Why Choose Anilao Scuba Dive Center?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <CardHeader className="flex gap-3 p-5">
                  <reason.icon className="h-10 w-10 rounded-full bg-blue-100 p-2 dark:bg-blue-900" />
                  <h3 className="text-xl font-semibold text-logo-blue">
                    {reason.title}
                  </h3>
                </CardHeader>
                <Divider />
                <CardBody className="p-5">
                  <p className="text-gray-600">{reason.description}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="pt-24 text-center"
        >
          <h3 className="mb-2 text-2xl font-semibold text-logo-blue">
            Ready to Dive In?
          </h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Join us for an underwater adventure you&apos;ll never forget. Book
            your dive today and experience the magic of Anilao&apos;s marine
            life.
          </p>
          <Button
            onClick={handleClick}
            size="lg"
            variant="solid"
            className="font-semibold bg-logo-blue text-white"
          >
            Book Your Dive
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
