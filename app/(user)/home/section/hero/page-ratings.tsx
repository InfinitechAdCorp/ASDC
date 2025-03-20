import React from 'react';
import { Star } from 'lucide-react';
import { Image } from "@heroui/react";

interface ReviewSource {
  name: string;
  percentage: number;
  reviewCount: number;
  icon: string;
}

interface ReviewRatingsProps {
  sources: ReviewSource[];
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= Math.round(rating / 20)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const ReviewRatings: React.FC<ReviewRatingsProps> = ({ sources }) => {
  return (
    <div className="flex flex-row space-x-8">
      {sources.map((source) => (
        <div key={source.name} className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Image height={25} width={25} src={source.icon} />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <StarRating rating={source.percentage} />
            </div>
            <p className="font-lighttext-sm mt-1 text-white">
              {source.percentage}% ({source.reviewCount} reviews)
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ReviewRatingsExample() {
  const reviewSources: ReviewSource[] = [
    {
      name: 'Facebook',
      percentage: 78,
      reviewCount: 652,
      icon: '/img/social/facebook.png',
    },
    {
      name: 'Google',
      percentage: 88,
      reviewCount: 149,
      icon: '/img/social/google.png',
    },
  ];

  return <ReviewRatings sources={reviewSources} />;
}
