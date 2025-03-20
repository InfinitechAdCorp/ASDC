'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Home, BedDouble, ShoppingBag, Ellipsis } from 'lucide-react';
import { Avatar, Button } from '@heroui/react';
import useSWR from 'swr';

// import { SignIn } from './sign-in';
// import { SignUp } from './sign-up';

import UserDropdownMenu from './user-dropdown-menu';
import RightSidebar from './right-sidebar';

import { isUserLoggedIn } from '@/app/utils/auth';

const Navbar: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [content, setContent] = useState('');
  const [color, setColor] = useState('');
  const [visibility, setVisibility] = useState(true);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/content/banner-1', fetcher);

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  useEffect(() => {
    if (data) {
      setContent(data.content || '');
      setColor(data.color || '#ffffff');
      setVisibility(data.visibility ?? true);
    }
  }, [data]);

  return (
    <div>
      <nav className="absolute z-20 hidden w-full bg-white md:block">
        {/* START BANNER */}
        <div
          className={`p-2 text-center text-white ${visibility ? 'block' : 'hidden'}`}
          style={{ backgroundColor: color }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {/* END BANNER */}
        <div className="p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/home"
                className="flex hover:text-blue-500"
                onClick={() => setActiveButton('home')}
              >
                <Avatar src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop_no_text.jpg" />
                <div className="ml-2 mr-8 w-96 text-3xl font-bold text-[#047c9e] hover:text-cyan-900">
                  Anilao Scuba Dive Center
                </div>
              </Link>
              <div className="hidden items-center justify-center space-x-8 md:flex">
                <Link
                  href="/home/book-your-dive"
                  className={`font-bold text-black hover:text-[#047c9e] ${activeButton === 'book-your-dive' ? 'text-logo-blue' : ''}`}
                  onClick={() => setActiveButton('book-your-dive')}
                >
                  Book Your Dive
                </Link>
                <Link
                  href="/home/shop"
                  className={`font-bold text-black hover:text-[#047c9e] ${activeButton === 'shop' ? 'text-logo-blue' : ''}`}
                  onClick={() => setActiveButton('shop')}
                >
                  Courses
                </Link>
                <Link
                  href="/home/accommodation"
                  className={`font-bold text-black hover:text-[#047c9e] ${activeButton === 'accommodation' ? 'text-logo-blue' : ''}`}
                  onClick={() => setActiveButton('accommodation')}
                >
                  Accommodation
                </Link>
              </div>
            </div>

            {/* Right section for user dropdown and sidebar */}
            <div className="flex items-center justify-center">
              {isLoggedIn ? (
                <UserDropdownMenu />
              ) : (
                <Link
                  href="/account/sign-in"
                  className="flex w-28 justify-end bg-transparent pr-2 text-black hover:text-logo-blue"
                >
                  Sign in&nbsp;&nbsp;
                  <User />
                </Link>
              )}
              <RightSidebar />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <nav className="fixed top-0 z-20 block h-16 w-full border border-gray-200 bg-white sm:hidden">
        <div className="flex h-full items-center justify-center px-4">
          <Link href="/home" className="flex items-center">
            <Avatar src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop_no_text.jpg" />
            <div className="ml-2 text-3xl font-thin text-black">ASDC</div>
          </Link>
        </div>
      </nav>

      <nav className="fixed bottom-0 z-20 block h-16 w-full border border-gray-200 bg-white sm:hidden">
        <div className="grid h-full grid-cols-4">
          <Button
            href="/"
            as={Link}
            radius="none"
            isIconOnly
            variant="light"
            className={`h-full w-full text-default-600 ${activeButton === 'home' ? 'text-blue-500' : ''}`}
            onClick={() => setActiveButton('home')}
          >
            <Home />
          </Button>
          <Button
            href="/home/shop"
            as={Link}
            radius="none"
            isIconOnly
            variant="light"
            className={`h-full w-full text-default-600 ${activeButton === 'store' ? 'text-blue-500' : ''}`}
            onClick={() => setActiveButton('store')}
          >
            <ShoppingBag />
          </Button>
          <Button
            href="/home/accommodation"
            as={Link}
            radius="none"
            isIconOnly
            variant="light"
            className={`h-full w-full text-default-600 ${activeButton === 'accommodation' ? 'text-blue-500' : ''}`}
            onClick={() => setActiveButton('accommodation')}
          >
            <BedDouble />
          </Button>
          {/* <Button
                        href="/home/review"
                        as={Link}
                        radius="none"
                        isIconOnly
                        variant="light"
                        className={`w-full h-full text-default-600 ${activeButton === 'fish' ? 'text-blue-500' : ''}`}
                        onClick={() => setActiveButton('fish')}
                    >
                        <Fish />
                    </Button> */}
          <Button
            href="/home/setting"
            as={Link}
            radius="none"
            isIconOnly
            variant="light"
            className={`h-full w-full text-default-600 ${activeButton === 'setting' ? 'text-blue-500' : ''}`}
            onClick={() => setActiveButton('setting')}
          >
            <Ellipsis />
          </Button>
        </div>
      </nav>
      {/* <SignIn isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} onSignUp={() => {
                setIsSignInOpen(false);
                setIsSignUpOpen(true);
            }} />
            <SignUp isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} /> */}
    </div>
  );
};

export default Navbar;
