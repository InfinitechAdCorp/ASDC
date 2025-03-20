'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';


import SecondSection from './review/page';
import ContactUs from './contact-us/page';
import FAQPage from './faq/page';
import AboutUs from './about-us/page';
import WhyChooseUs from './why-us/page';

import HeroSection from '@/app/(user)/home/section/hero/hero-section';


const Home = () => {
  return (
    // <div className="relative bg-gradient-to-b from-white to-sky-100">
    <div className="relative bg-gradient-to-b from-white to-sky-100">
      <Toaster position="top-center" />
      {/* Hero Section */}
      <HeroSection />

      {/* 2 */}
      <WhyChooseUs />

      {/* 3 */}
      <AboutUs />

      {/* 4 */}
      <SecondSection />

      {/* 5 */}
      <FAQPage />

      {/* 6 */}
      <ContactUs />
    </div>
  );
};

export default Home;
