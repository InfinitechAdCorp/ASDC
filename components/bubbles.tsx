'use client';

import React, { useEffect, useState } from 'react';

// Define the type for the bubble image
interface BubbleImage {
  id: number;
  style: {
    animationDelay: string;
    transform: string;
  };
}

const Bubbles = () => {
  const [bubbleImages, setBubbleImages] = useState<BubbleImage[]>([]); // Use the defined type for state

  // Function to generate a random delay and a random translate value
  const getRandomStyle = () => {
    const delay = Math.random() * 4 + 1; // Random delay between 1s and 5s
    const translateX = Math.random() * 200 - 100; // Random translateX value between -100 and 100

    return {
      animationDelay: `${delay}s`,
      transform: `translateX(${translateX}px)`,
    };
  };

  useEffect(() => {
    // Create an array for bubble images with random styles
    const bubbles: BubbleImage[] = Array.from({ length: 10 }, (_, index) => ({
      id: index,
      style: getRandomStyle(),
    }));

    setBubbleImages(bubbles);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <div className="absolute bottom-0 flex w-full items-center justify-around">
        {bubbleImages.map((bubble) => (
          <img
            key={bubble.id}
            src="./img/bubble.png"
            alt={`Bubble ${bubble.id + 1}`}
            className="animate-bubble h-auto w-10 opacity-0"
            style={{
              animationDelay: bubble.style.animationDelay,
              transform: bubble.style.transform,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes bubble {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-70vh);
          }
        }

        .animate-bubble {
          animation: bubble 5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Bubbles;
