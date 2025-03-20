'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Button,
  CardFooter,
  Tooltip,
} from "@heroui/react";
import { CheckCircle2, Heart, Share2 } from 'lucide-react';

import EnrollModal from './enroll-modal';
import toast from 'react-hot-toast';

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
    rating: number;
  } | null;
}

export default function ProductDetailsPage({ product }: ProductProps) {
  const router = useRouter();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedWishlist = localStorage.getItem('wishlist');
        setWishlist(storedWishlist ? JSON.parse(storedWishlist) : []);
      } catch {
        setWishlist([]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const shareableLink = window.location.href;
      toast.success('Link copied to clipboard!');
      navigator.clipboard.writeText(shareableLink);
    }
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(id)
        ? prevWishlist.filter((itemId) => itemId !== id)
        : [...prevWishlist, id]
    );

    toast.success(
      wishlist.includes(id)
        ? 'Removed from wishlist!'
        : 'Added to wishlist!'
    );
  };

  const isInWishlist = (id: number) => wishlist.includes(id);

  return (
    <div className="container mx-auto min-h-screen max-w-[90%] p-4 pb-24 pt-20 md:pt-32">
      <Card className="h-[90%] w-full">
        <CardHeader className="flex gap-3 p-0">
          <img
            alt={product.name}
            src={product.image}
            className="max-h-[50vh] max-w-full object-cover w-full"
          />
          <div className="absolute right-6 top-6 z-20 flex items-center gap-x-4">
            <Tooltip showArrow={true} content="Share link">
              <div
                onClick={handleShare}
                className="relative cursor-pointer text-white hover:text-black"
              >
                <Share2 size={20} className="relative" />
              </div>
            </Tooltip>
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
        </CardHeader>
        <CardBody className="p-0">
          <div className="flex flex-col p-8">
            <div className="mb-8 flex justify-between">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-md text-default-500">
                ₱
                {Intl.NumberFormat('en-PH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product.price)}
              </p>
            </div>
            <h2 className="text-2xl font-semibold">About the course</h2>
            <p>{product.description}</p>
          </div>
          <Card className="ml-4 mr-4 bg-gray-100">
            <CardBody>
              <h3 className="mb-3 text-lg font-semibold">
                What You&apos;ll Learn
              </h3>
              <ul className="space-y-2">
                {[
                  'Be a confident and skilled diver',
                  'Assemble and use scuba gear',
                  'Manage your buoyancy',
                  'Respectfully approach marine life',
                  'Handle common problems',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2
                      className="flex-shrink-0 text-green-500"
                      size={16}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </CardBody>
        <CardFooter className="mt-4 flex justify-between">
          <Button
            color="default"
            variant="bordered"
            onClick={() => router.back()}
          >
            Back to List
          </Button>
          <EnrollModal />
        </CardFooter>
      </Card>
    </div>
  );
}
