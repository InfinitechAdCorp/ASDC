'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { ThemeSwitch } from './theme-switch';

export function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/auth/admin/logout');
    // const data = await response.json();

    if (response.ok) {
      router.push('/');
    } else {
      // console.error(data.message || 'Failed to log out');
    }
  };

  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-300 bg-white px-4 dark:border-[#27272A] dark:bg-[#18181B]">
      <div className="ml-auto flex items-center space-x-2">
        <ThemeSwitch />
        <Dropdown>
          <DropdownTrigger>
            <img
              className="h-8 w-8 cursor-pointer rounded-full"
              src="img/admin.jpg"
              alt="user profile"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              endContent={<LogOut size={20} />}
              onPress={handleLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
