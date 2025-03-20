'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardBody, Image, Link } from "@heroui/react";
import useSWR from 'swr';

import BlueLoading from '../admin/blue-loading';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Cart() {
  const [cart, setCart] = useState<string[]>([]);
  const { data: products, error } = useSWR('/api/product', fetcher);

  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

      setCart(storedCart);
    };

    loadCart();

    const interval = setInterval(() => {
      loadCart();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  const cartProducts = products.filter((product: any) =>
    cart.includes(product.id),
  );

  // const handleRemoveFromCart = (productId: string, e: React.MouseEvent) => {
  //     e.preventDefault();
  //     setCart(cart.filter((id) => id !== productId));
  // };

  return (
    <div className="container mx-auto min-h-screen">
      <h1 className="mb-4 text-lg font-semibold">Your Cart</h1>
      {cartProducts.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cartProducts.map((product: any) => (
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
                      <div className="absolute bottom-2">
                        {/* <Button
                                                    radius="none"
                                                    color="error"
                                                    onClick={(e) => handleRemoveFromCart(product.id, e)}
                                                >
                                                    Remove from cart <Trash2 />
                                                </Button> */}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
