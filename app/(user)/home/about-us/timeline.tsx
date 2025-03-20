'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 1995,
    title: 'Founding',
    description:
      'Anilao Scuba Dive Center was established with a mission to provide world-class diving experiences.',
  },
  {
    year: 2000,
    title: 'PADI 5 Star Certification',
    description:
      'Achieved PADI 5 Star Dive Center status, recognizing our commitment to quality and safety.',
  },
  {
    year: 2010,
    title: 'Eco-Initiative Launch',
    description:
      'Launched our marine conservation program, focusing on coral reef restoration and education.',
  },
  {
    year: 2015,
    title: 'Facility Expansion',
    description:
      'Expanded our facilities to include state-of-the-art training pools and equipment.',
  },
  {
    year: 2020,
    title: 'Virtual Diving Program',
    description:
      'Introduced virtual diving courses, allowing students to start their journey from home.',
  },
];

const HorizontalTimeline: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 },
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) observer.disconnect();
    };
  }, []);

  return (
    <div className="justify-left container flex w-full overflow-x-auto py-16 lg:justify-center">
      <div className="relative inline-flex" ref={timelineRef}>
        {/* Horizontal line */}
        <motion.div
          className="absolute left-0 right-0 top-2 h-0.5 bg-blue-200"
          initial={{ width: '0%' }}
          animate={isInView ? { width: '100%' } : {}}
          transition={{ duration: 1 }}
        />

        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.year}
            className="relative mx-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="z-10 mb-2 h-4 w-4 rounded-full bg-logo-blue" />
            <span className="mb-2 font-bold text-logo-blue">{event.year}</span>
            <div className="w-48 text-center">
              <h4 className="mb-2 text-lg font-semibold">{event.title}</h4>
              <p className="text-sm text-gray-600">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalTimeline;
