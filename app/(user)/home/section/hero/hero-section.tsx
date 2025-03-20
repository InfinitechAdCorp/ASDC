'use client';

import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

import ReviewRatingsExample from './page-ratings';

import { isUserLoggedIn } from '@/app/utils/auth';
import ScrollDownIndicator from '@/components/user/scroll-down-indicator';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [
      (slider) => {
        setLoaded(true);
        let timeout: any;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 1000);
        }

        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ],
  );

  // const navigationToSignIn = () => {
  //     router.push('/account/sign-in');
  // };

  const navigateToSignUp = () => {
    router.push('/account/sign-up');
  };

  return (
    <div id="home" className="relative flex h-screen flex-wrap overflow-hidden">
      <div className="relative h-[30%] w-full flex-col justify-center overflow-hidden pl-4 pr-4 pt-20 md:pt-40 lg:flex lg:h-[100%] lg:w-[30%]">
        <div className="h-full] absolute right-2 top-0 z-10 hidden w-full bg-black opacity-10 md:block" />
        <video
          src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/home/video/IMG_9294.MP4"
          autoPlay
          loop
          muted
          className="pointer-events-none absolute left-0 top-0 h-full w-full object-cover lg:pr-2"
        />
      </div>
      <div className="relative h-[70%] w-full border-t-8 lg:h-[100%] lg:w-[70%]">
        <div className="absolute bottom-8 left-[20%] z-40 hidden md:block">
          <ScrollDownIndicator />
        </div>
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-25" />
        <div className="absolute left-5 right-[5%] top-[10%] z-10 lg:top-[40%]">
          <div className="hidden md:block">
            <ReviewRatingsExample />
          </div>
          <h1 className="z-10 text-5xl font-black text-white md:text-9xl">
            WELCOME
          </h1>
          <p className="z-10 text-xl font-light text-white md:text-5xl">
            ASDC is the ideal place for divers and people who wish to experience
            the underwater world.
          </p>
          <div className="z-10 flex items-center justify-end gap-2 p-4">
            {isLoggedIn ? null : (
              <>
                <Button
                  onClick={navigateToSignUp}
                  size="md"
                  variant="solid"
                  className="bg-logo-blue text-white"
                >
                  Create an account
                </Button>
                {/* <Button
                                    onClick={navigationToSignIn}
                                    size="md" color="primary">
                                    Sign in
                                </Button> */}
              </>
            )}
          </div>
        </div>

        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide number-slide1">
            <div className="bg-black lg:h-screen">
              <img
                src="/img/hero-section/1.jpg"
                className="h-[70vh] w-full object-cover object-center lg:h-full"
                alt="nemo fish"
              />
            </div>
          </div>
          <div className="keen-slider__slide number-slide2">
            <div className="bg-black lg:h-screen">
              <img
                src="/img/hero-section/2.jpg"
                className="h-[70vh] w-full object-cover object-center lg:h-full"
                alt="octupos"
              />
            </div>
          </div>
          <div className="keen-slider__slide number-slide3">
            <div className="bg-black lg:h-screen">
              <img
                src="/img/hero-section/3.jpg"
                className="h-[70vh] w-full object-cover object-center lg:h-full"
                alt="shark"
              />
            </div>
          </div>
        </div>
        {loaded && instanceRef.current && (
          <div className="dots absolute bottom-8 flex w-full justify-center lg:flex">
            {Array.from({
              length: instanceRef.current.track.details.slides.length,
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`dot mx-1 h-3 w-3 rounded-full ${currentSlide === idx ? 'bg-blue-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
