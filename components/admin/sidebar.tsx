'use client';

import {
  Calendar,
  Home,
  User,
  LayoutDashboard,
  Settings,
  ChevronDown,
  Activity,
  BookText,
  StickyNote,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useCountData } from './sidebar-data';

const CountBadge = ({ count }: { count: number }) => (
  <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-logo-blue text-[10px] font-bold text-white dark:border-gray-900">
    {count}
  </span>
);

const CountBadgeMain = ({ label, count }: { label: string; count: number }) => (
  <div className="flex w-48 items-center justify-between">
    {label} <CountBadge count={count} />
  </div>
);

const CountBadgeSub = ({ label, count }: { label: string; count: number }) => (
  <div className="flex w-56 items-center justify-between">
    {label} <CountBadge count={count} />
  </div>
);

export function Sidebar() {
  const pathname = usePathname();
  const { data } = useCountData();
  const [isContentDropdownOpen, setIsContentDropdownOpen] = useState(false);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isBookingDropdownOpen, setIsBookingDropdownOpen] = useState(false);

  const toggleDropdown = (dropdown: string) => {
    switch (dropdown) {
      case 'content':
        setIsContentDropdownOpen(!isContentDropdownOpen);
        break;
      case 'class':
        setIsClassDropdownOpen(!isClassDropdownOpen);
        break;
      case 'booking':
        setIsBookingDropdownOpen(!isBookingDropdownOpen);
        break;
      default:
    }
  };
  useEffect(() => {
    console.log('📊 Sidebar Data Updated:', data);
  }, [data]); // Logs data whenever it updates

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
    dropdown: string,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleDropdown(dropdown);
    }
  };

  return (
    <div className="flex h-screen min-w-80 flex-col border-r border-gray-300 bg-white text-gray-800 dark:border-[#27272A] dark:bg-[#18181B] dark:text-gray-200">
      <div className="flex h-16 items-center justify-center">
        <>
          <img
            src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop_no_text-removebg-preview-aO0w9LhqJ1WfU4AbHK3ZuZwTEXGenu.png"
            className="mr-2 h-8 w-8"
          />
          <h2 className="cursor-context-copy cursor-default font-bold">
            Anilao Scuba Dive Center
          </h2>
        </>
      </div>
      <div className="flex-grow">
        {[
          {
            title: 'Dashboard',
            url: '/admin',
            icon: Activity,
          },
          {
            title: <CountBadgeMain label="User" count={data?.userCount || 0} />,
            url: '/admin/user',
            icon: User,
          },
          {
            title: (
              <CountBadgeMain
                label="Certificate"
                count={data?.certificateCount || 0}
              />
            ),
            url: '/admin/certificate',
            icon: StickyNote,
          },
          {
            title: 'Content',
            url: '#',
            icon: LayoutDashboard,
            subItems: [
              { title: 'Banner', url: '/admin/content/announcement-banner' },
              {
                title: (
                  <CountBadgeSub
                    label="Testimonial"
                    count={data?.testimonialCount || 0}
                  />
                ),
                url: '/admin/content/testimonial',
              },
              {
                title: (
                  <CountBadgeSub label="FAQ" count={data?.faqCount || 0} />
                ),
                url: '/admin/content/faq',
              },
            ],
          },
          {
            title: 'Class',
            url: '#',
            icon: BookText,
            subItems: [
              {
                title: (
                  <CountBadgeSub
                    label="Course"
                    count={data?.productCount || 0}
                  />
                ),
                url: '/admin/class/course',
              },
              {
                title: (
                  <CountBadgeSub
                    label="Schedule"
                    count={data?.batchCount || 0}
                  />
                ),
                url: '/admin/class/schedule',
              },
            ],
          },
          {
            title: (
              <CountBadgeMain
                label="Room"
                count={data?.roomBookingCount || 0}
              />
            ),
            url: '/admin/room',
            icon: Home,
          },
          {
            title: 'Booking',
            url: '#',
            icon: Calendar,
            subItems: [
              {
                title: (
                  <CountBadgeSub
                    label="Room Reservation"
                    count={data?.roomCount || 0}
                  />
                ),
                url: '/admin/booking/calendar',
              },
              {
                title: (
                  <CountBadgeSub
                    label="Dive Reservation"
                    count={data?.diveCount || 0}
                  />
                ),
                url: '/admin/booking/dive',
              },
            ],
          },
          {
            title: 'Settings',
            url: '/admin/setting',
            icon: Settings,
          },
        ].map((item, index) => (
          <div key={index}>
            {item.subItems ? (
              <div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    toggleDropdown(item.title.toString().toLowerCase())
                  }
                  onKeyDown={(e) =>
                    handleKeyPress(e, item.title.toString().toLowerCase())
                  }
                  className="mb-2 ml-4 mr-4 flex cursor-pointer items-center rounded-lg p-4 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <div className="flex w-full items-center">
                    <item.icon
                      className={`h-6 w-6 ${
                        pathname === item.url
                          ? 'text-logo-blue dark:text-logo-blue'
                          : 'text-gray-800 dark:text-gray-200'
                      }`}
                    />
                    {/* <span className="ml-4">{item.title}</span> */}
                    <span className="ml-4">{item.title}</span>
                    <ChevronDown
                      className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                        (item.title === 'Content' && isContentDropdownOpen) ||
                        (item.title === 'Class' && isClassDropdownOpen) ||
                        (item.title === 'Booking' && isBookingDropdownOpen)
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </div>
                </div>
                {(isContentDropdownOpen && item.title === 'Content') ||
                (isClassDropdownOpen && item.title === 'Class') ||
                (isBookingDropdownOpen && item.title === 'Booking') ? (
                  <div className="ml-8 mr-8 overflow-hidden transition-all duration-300">
                    {item.subItems?.map((subItem) => (
                      <Link
                        key={`${subItem.url}-${index}`}
                        href={subItem.url}
                        passHref
                      >
                        <div
                          className={`rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                            pathname === subItem.url
                              ? 'text-logo-blue dark:text-logo-blue'
                              : ''
                          }`}
                        >
                          {subItem.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <Link href={item.url} passHref>
                <div className="mb-2 ml-4 mr-4 flex items-center rounded-lg p-4 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <item.icon
                    className={`h-6 w-6 ${
                      pathname === item.url
                        ? 'text-logo-blue dark:text-logo-blue'
                        : 'text-gray-800 dark:text-gray-200'
                    }`}
                  />
                  <span className="ml-4">{item.title}</span>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
