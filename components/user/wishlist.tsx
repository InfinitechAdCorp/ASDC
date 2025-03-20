'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Image, Link } from "@heroui/react";
import { Trash2 } from 'lucide-react';
import useSWR from 'swr';

import BlueLoading from '../admin/blue-loading';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  const { data: products, error } = useSWR('/api/product', fetcher);

  useEffect(() => {
    setIsClient(true);

    const fetchWishlist = () => {
      const storedWishlist = localStorage.getItem('wishlist');

      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      } else {
        setWishlist([]);
      }
    };

    fetchWishlist();

    const intervalId = setInterval(() => {
      fetchWishlist();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleAddToLocalStorage = (newWishlist: string[]) => {
    if (isClient) {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setWishlist(newWishlist);
    }
  };

  const handleRemoveFromWishlist = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();

    const updatedWishlist = wishlist.filter((id) => id !== productId);

    handleAddToLocalStorage(updatedWishlist);
  };

  if (error)
    return (
      <div className="p-4">
        <BlueLoading />
      </div>
    );
  if (!products)
    return (
      <div className="p-4">
        <BlueLoading />
      </div>
    );

  const wishlistProducts = products.filter((product: any) =>
    wishlist.includes(product.id),
  );

  return (
    <div className="container z-50 mx-auto">
      <h1 className="mb-4 text-lg font-semibold">Your Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <div>Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {wishlistProducts.map((product: any) => (
            <Link
              key={product.id}
              href={`/home/shop/${product.id}?${product.name}-${product.description}`}
            >
              <Card className="w-full">
                <CardBody className="p-0">
                  <div className="grid grid-cols-2">
                    <div className="p-2">
                      <Image
                        src={product.image}
                        alt={product.name}
                        height={200}
                        width={500}
                      />
                    </div>
                    <div className="p-2">
                      <h4 className="text-large font-bold">{product.name}</h4>
                      <p className="text-default-500">{product.category}</p>
                      <p className="font-bold text-default-700">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    className="absolute right-2 bottom-2 z-20 flex cursor-pointer items-center gap-x-4"
                    onClick={(e) => handleRemoveFromWishlist(product.id, e)}
                  >
                    <Trash2
                      size={20}
                      className="text-gray-600 hover:text-red-500"
                    />
                  </button>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
