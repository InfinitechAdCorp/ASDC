// app\(user)\home\setting\page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@heroui/react";
import {
  Calendar,
  ChevronRight,
  CircleAlert,
  LogOut,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { isUserLoggedIn } from '@/app/utils/auth';

const SettingPage = () => {
  const router = useRouter();
  const [user_id, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');

      setUserId(user_id);
      setIsLoggedIn(isUserLoggedIn());
    }
  }, []); //

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  const handleCertifcationClick = () => {
    router.push(`/home/certificate`);
  };


  const handleReservationClick = () => {
    router.push(`/home/my-reservation`);
  };

  return (
    <div className="flex h-lvh flex-col bg-gray-100 pt-20">
      {isLoggedIn ? null : (
        <>
          <div className="p-4 text-center text-xl font-semibold">Join now</div>
          <div className="flex w-full flex-col space-y-4 pl-4 pr-4">
            <Button
              color="primary"
              onClick={() => router.push('/account/sign-up')}
            >
              Create an account
            </Button>
            <Button
              variant="bordered"
              color="primary"
              onClick={() => router.push('/account/sign-in')}
            >
              Sign in
            </Button>
          </div>
        </>
      )}
      <small className="p-4">GENERAL</small>
      {isLoggedIn ? (
        <>
          <button
            onClick={() => router.push('/account/profile')}
            className="flex h-14 w-full items-center justify-between border border-gray-300 bg-white px-4 text-left"
          >
            <div className="flex items-center">
              <User className="ml-2 mr-2 text-gray-500" /> Profile
            </div>
            <ChevronRight className="mr-2 text-gray-500" />
          </button>
          <button
            onClick={handleCertifcationClick}
            className="flex h-14 w-full items-center justify-between border border-gray-300 bg-white px-4 text-left"
          >
            <div className="flex items-center">
              <svg fill="none" viewBox="0 0 15 15" height="20" width="24" className="ml-2 mr-2 text-gray-500" >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0.5"
                  d="M9.5 14.5H9a.5.5 0 00.8.4l-.3-.4zm2-1.5l.3-.4a.5.5 0 00-.6 0l.3.4zm2 1.5l-.3.4a.5.5 0 00.8-.4h-.5zm-2-3.5A2.5 2.5 0 019 8.5H8a3.5 3.5 0 003.5 3.5v-1zM14 8.5a2.5 2.5 0 01-2.5 2.5v1A3.5 3.5 0 0015 8.5h-1zM11.5 6A2.5 2.5 0 0114 8.5h1A3.5 3.5 0 0011.5 5v1zm0-1A3.5 3.5 0 008 8.5h1A2.5 2.5 0 0111.5 6V5zM9 10.5v4h1v-4H9zm.8 4.4l2-1.5-.6-.8-2 1.5.6.8zm1.4-1.5l2 1.5.6-.8-2-1.5-.6.8zm2.8 1.1v-4h-1v4h1zM15 5V1.5h-1V5h1zm-1.5-5h-12v1h12V0zM0 1.5v12h1v-12H0zM1.5 15H8v-1H1.5v1zM0 13.5A1.5 1.5 0 001.5 15v-1a.5.5 0 01-.5-.5H0zM1.5 0A1.5 1.5 0 000 1.5h1a.5.5 0 01.5-.5V0zM15 1.5A1.5 1.5 0 0013.5 0v1a.5.5 0 01.5.5h1zM3 5h5V4H3v1zm0 3h3V7H3v1z"
                />
              </svg> Certifcation
            </div>
            <ChevronRight className="mr-2 text-gray-500" />
          </button>
          <button
            onClick={handleReservationClick}
            className="flex h-14 w-full items-center justify-between border border-gray-300 bg-white px-4 text-left"
          >
            <div className="flex items-center">
              <Calendar className="ml-2 mr-2 text-gray-500" /> Reservation
            </div>
            <ChevronRight className="mr-2 text-gray-500" />
          </button>
        </>
      ) : null}

      <button className="flex h-14 w-full items-center justify-between border border-gray-300 bg-white px-4 text-left" onClick={() => router.push('/home/setting/about')}>
        <div className="flex items-center">
          <CircleAlert className="ml-2 mr-2 text-gray-500" /> About
        </div>
        <ChevronRight className="mr-2 text-gray-500" />
      </button>

      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="flex h-14 w-full items-center justify-between border border-gray-300 bg-white px-4 text-left"
        >
          <div className="flex items-center">
            <LogOut className="ml-2 mr-2 text-gray-500" /> Sign out
          </div>
          <ChevronRight className="mr-2 text-gray-500" />
        </button>
      ) : null}
    </div>
  );
};

export default SettingPage;
