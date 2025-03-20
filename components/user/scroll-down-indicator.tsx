'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';

interface ScrollDownIndicatorProps {
  className?: string;
}

const ScrollDownIndicator: React.FC<ScrollDownIndicatorProps> = ({
  className = '',
}) => {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      className={`flex flex-col items-center cursor-pointer${className}`}
      onClick={scrollToNextSection}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="mb-2 text-sm font-medium text-white">Scroll Down</span>
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <ChevronsDown className="h-6 w-6 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollDownIndicator;
