'use client';

import React, { useState } from 'react';
import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/img/book-your-dive/1.png',
  '/img/book-your-dive/2.png',
  '/img/book-your-dive/3.jpg',
];

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <>
      <div className="relative aspect-video">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="max-h-[60vh] min-h-[60vh] w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <Button
          isIconOnly
          className="absolute left-2 top-1/2 -translate-y-1/2 transform bg-black/50 text-white"
          onClick={prevSlide}
        >
          <ChevronLeft />
        </Button>
        <Button
          isIconOnly
          className="absolute right-2 top-1/2 -translate-y-1/2 transform bg-black/50 text-white"
          onClick={nextSlide}
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="mb-4 mt-4 flex justify-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-16 w-16 overflow-hidden rounded-md border-2 ${
              index === currentIndex ? 'border-primary' : 'border-transparent'
            }`}
          >
            <img
              src={images[index]}
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default ImageSlider;
