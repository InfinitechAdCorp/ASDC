'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link, Card, CardBody, CardFooter } from "@heroui/react";
import { ShoppingCart, Heart, X } from 'lucide-react';
import { motion } from 'framer-motion';

import Wishlist from './wishlist';

const RightSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('wishlist');
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <Link
        className="cursor-pointer text-black hover:text-logo-blue"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <ShoppingCart size={24} />}
      </Link>
      <div
        ref={sidebarRef}
        className={`fixed right-0 top-0 h-full w-96 transform bg-background transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } z-40 shadow-lg`}
      >
        <Card className="h-full" radius="none">
          <CardBody className="flex flex-col p-0">
            <div className="relative flex border-b border-gray-200">
              <button
                className={`flex-1 px-6 py-4 text-center focus:outline-none ${activeTab === 'wishlist'
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-primary'
                  }`}
                onClick={() => setActiveTab('wishlist')}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Heart size={18} />
                  <span>Wishlist</span>
                </div>
              </button>
              <button
                className={`flex-1 px-6 py-4 text-center focus:outline-none ${activeTab === 'cart'
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-primary'
                  }`}
                onClick={() => setActiveTab('cart')}
              >
                <div className="flex items-center justify-center space-x-2">
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                </div>
              </button>
              <motion.div
                className="absolute bottom-0 h-0.5 bg-primary"
                initial={false}
                animate={{
                  left: activeTab === 'wishlist' ? '0%' : '50%',
                  width: '50%',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'wishlist' && (
                <div className="p-4">
                  <Wishlist />
                </div>
              )}
              {activeTab === 'cart' && (
                <div className="p-4">
                  <h3 className="mb-4 text-lg font-semibold">Your Cart</h3>
                  <p>Your cart is empty.</p>
                </div>
              )}
            </div>
          </CardBody>
          <CardFooter className="p-0 min-h-14">
            <button
              onClick={toggleSidebar}
              className="h-14 w-full bg-danger text-white"
            >
              Close
            </button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default RightSidebar;
