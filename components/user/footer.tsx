'use client';

import React from 'react';
import Link from 'next/link';
import { Avatar, Divider } from '@heroui/react';
import { Phone, Mail, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <Divider />
      <div className="mx-auto w-full max-w-screen-2xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center pb-1">
              <Avatar src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop_no_text.jpg" />
              <span className="ml-2 self-center whitespace-nowrap text-2xl font-semibold text-logo-blue dark:text-white">
                Anilao Scuba Dive Center
              </span>
            </Link>
            <span className="text-gray-500">
              ASDC is the ideal place for divers and people who wish to
              experience the underwater world.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Resources
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <Link href="/home" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/home/shop" className="hover:underline">
                    Courses
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/home/accommodation" className="hover:underline">
                    Accomodation
                  </Link>
                </li>
                {/* <li className="mb-4">
                                    <Link href="/home/review" className="hover:underline">
                                        Testimonial
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/home/contact-us" className="hover:underline">
                                        Contact us
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/home/faq" className="hover:underline">
                                        Frequently Asked Questions
                                    </Link>
                                </li> */}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Follow us
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a
                    href="https://www.facebook.com/AnilaoScubaDiveCenter"
                    className="hover:underline"
                  >
                    Facebook
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.tiktok.com/@ginafaith05"
                    className="hover:underline"
                  >
                    TikTok
                  </a>
                </li>
                {/* <li className="mb-4">
                  <a
                    href="https://github.com/tnmtthw/"
                    className="hover:underline"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a href="https://discord.com/" className="hover:underline">
                    Discord
                  </a>
                </li> */}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Contact
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <div className="flex items-center">
                    <Phone className="mr-2 text-lg" size={16} />
                    <p className="text-sm">+63 905 435 2513</p>
                  </div>
                </li>
                <li className="mb-4">
                  <div className="flex items-center">
                    <Mail className="mr-2 text-lg" size={16} />
                    <a
                      href="mailto:fgbaoin@yahoo.com"
                      className="text-sm font-semibold text-blue-500 hover:underline"
                    >
                      fgbaoin@yahoo.com
                    </a>
                  </div>
                </li>

                <li className="mb-4">
                  <div className="flex items-center">
                    <Globe className="mr-2 text-lg" size={16} />
                    <a
                      href="https://asdc-coral.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      https://asdc-coral.vercel.app/
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2024 Infinitech Advertisiong Corporation™. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
