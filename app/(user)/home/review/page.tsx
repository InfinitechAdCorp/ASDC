'use client';

import React from 'react';

import TestimonialsSlider from './testimonials';
import SubmitReviewsModal from './submit-reviews-modal';

const secondSectionText = `Join us for unforgettable adventures and explore the beauty beneath the waves!`;

const SecondSection = () => {
  return (
    <div className="flex h-[75vh] flex-col items-center justify-center bg-[#033956]">
      <h2 className="mb-4 text-3xl font-bold text-white sm:text-5xl">
        Dive Deeper
      </h2>
      <p className="mb-4 text-center text-lg text-white sm:text-xl">
        {secondSectionText}
      </p>
      <TestimonialsSlider />
      <SubmitReviewsModal />
    </div>
  );
};

export default SecondSection;
