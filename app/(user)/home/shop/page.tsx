'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { Input } from "@heroui/react";
import useSWR from 'swr';
import { Heart } from 'lucide-react';

import UserBlueSpinner from '@/components/user/user-blue-loading';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductList() {
  const { data: products, error } = useSWR('/api/product', fetcher);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlist') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const fetchWishlist = () => {
      try {
        const storedWishlist = localStorage.getItem('wishlist');

        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        } else {
          setWishlist([]);
        }
      } catch {
        setWishlist([]);
      }
    };

    fetchWishlist();

    const intervalId = setInterval(fetchWishlist, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  if (error) return <div>Failed to load products</div>;
  if (!products)
    return (
      <div>
        <UserBlueSpinner />
      </div>
    );

  const filterProducts = (search: string, category: string) => {
    return products.filter(
      (product: any) =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === 'All' || product.category === category),
    );
  };

  const filteredProducts = filterProducts(searchTerm, selectedCategory);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <div className="container mx-auto min-h-screen max-w-[90%] p-4 pb-24 pt-20 md:pt-32">
      <div className="flex flex-col justify-between gap-x-4 gap-y-4 pb-4 sm:flex-row">
        <Input
          placeholder="Search"
          value={searchTerm}
          onValueChange={handleSearch}
          className="w-full"
        />
        <Dropdown className="w-auto">
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="w-full justify-between md:w-[25%]"
            >
              {selectedCategory || 'Select Category'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Category selection"
            onAction={(key) => handleCategorySelect(key as string)}
          >
            <DropdownItem key="All">All</DropdownItem>
            <DropdownItem key="Beginner">Beginner</DropdownItem>
            <DropdownItem key="Youth">Youth</DropdownItem>
            <DropdownItem key="Continued Educational">
              Continued Educational
            </DropdownItem>
            <DropdownItem key="Professional">Professional</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product: any) => (
          <Link
            key={product.id}
            href={`/home/shop/${product.id}?${toSlug(product.name)}-${toSlug(product.description)}`}
          >
            <Card
              className="w-full transform transition-transform duration-300 hover:scale-105"
              isPressable
            >
              <CardBody className="p-0">
                <Image
                  //isZoomed
                  src={product.image}
                  alt={product.name}
                  height={200}
                  width={500}
                  radius="none"
                />
                <div className="absolute right-6 top-6 z-10 flex items-center gap-x-4 active:opacity-50">
                  <Tooltip showArrow={true} content="Add to favorite">
                    <div
                      className="relative cursor-pointer text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                    >
                      {isInWishlist(product.id) ? (
                        <Heart fill="white" size={20} />
                      ) : (
                        <Heart size={20} className="relative" />
                      )}
                    </div>
                  </Tooltip>
                </div>
              </CardBody>
              <CardFooter className="flex flex-col items-start">
                <h4 className="text-large font-bold">{product.name}</h4>
                <p className="text-default-500">{product.category}</p>
                <p className="font-bold text-default-700">
                  ₱
                  {Intl.NumberFormat('en-PH', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(product.price)}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
