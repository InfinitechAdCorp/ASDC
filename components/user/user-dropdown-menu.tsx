'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
} from "@heroui/react";
import { Calendar, ChevronDown, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return { isHovered, handleMouseEnter, handleMouseLeave };
};

export default function UserDropdownMenu() {
  const first_name = localStorage.getItem('first_name');
  const last_name = localStorage.getItem('last_name');
  const user_id = localStorage.getItem('id');
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isHovered) {
      setIsOpen(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovered]);

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <Dropdown placement="bottom-end" isOpen={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <Link
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          size="md"
          className="flex cursor-pointer justify-end p-0 mr-4 text-black hover:text-logo-blue"
        >
          {first_name} {last_name} <ChevronDown size={16} />
        </Link>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown menu"
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      >
        <DropdownItem
          key="profile"
          onClick={() => router.push('/account/profile')}
          endContent={<User size={20} />}
        >
          Profile
        </DropdownItem>
        <DropdownItem
          key="reservation"
          onClick={() => router.push(`/home/my-reservation`)}
          endContent={<Calendar size={20} />}
        >
          Reservation
        </DropdownItem>
        <DropdownItem
          key="certificate"
          onClick={() => router.push('/home/certificate')}
          endContent={
            <svg fill="none" viewBox="0 0 15 15" height="18" width="18">
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                d="M9.5 14.5H9a.5.5 0 00.8.4l-.3-.4zm2-1.5l.3-.4a.5.5 0 00-.6 0l.3.4zm2 1.5l-.3.4a.5.5 0 00.8-.4h-.5zm-2-3.5A2.5 2.5 0 019 8.5H8a3.5 3.5 0 003.5 3.5v-1zM14 8.5a2.5 2.5 0 01-2.5 2.5v1A3.5 3.5 0 0015 8.5h-1zM11.5 6A2.5 2.5 0 0114 8.5h1A3.5 3.5 0 0011.5 5v1zm0-1A3.5 3.5 0 008 8.5h1A2.5 2.5 0 0111.5 6V5zM9 10.5v4h1v-4H9zm.8 4.4l2-1.5-.6-.8-2 1.5.6.8zm1.4-1.5l2 1.5.6-.8-2-1.5-.6.8zm2.8 1.1v-4h-1v4h1zM15 5V1.5h-1V5h1zm-1.5-5h-12v1h12V0zM0 1.5v12h1v-12H0zM1.5 15H8v-1H1.5v1zM0 13.5A1.5 1.5 0 001.5 15v-1a.5.5 0 01-.5-.5H0zM1.5 0A1.5 1.5 0 000 1.5h1a.5.5 0 01.5-.5V0zM15 1.5A1.5 1.5 0 0013.5 0v1a.5.5 0 01.5.5h1zM3 5h5V4H3v1zm0 3h3V7H3v1z"
              />
            </svg>
          }
        >
          Certification
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          endContent={<LogOut size={20} />}
          onPress={handleLogout}
        >
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
