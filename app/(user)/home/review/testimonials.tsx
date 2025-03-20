import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Card, CardBody, CardFooter, Avatar } from '@heroui/react';
import useSWR from 'swr';

import BlueLoading from '@/components/admin/blue-loading';

type Testimonial = {
  id: string;
  title: string;
  body: string;
  fullname: string;
  show: boolean;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const animation = { duration: 30000, easing: (t: number) => t };

export default function ScubaDivingTestimonials() {
  const { data, error } = useSWR<Testimonial[]>('/api/testimonial', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Initialize the Keen slider hook only once when the component renders
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'performance',
    drag: true,
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 3, spacing: 15 },
      },
    },
    slides: { perView: 1, spacing: 15 },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  if (!data || error)
    return (
      <div>
        <BlueLoading />
      </div>
    );

  return (
    <div className="container mx-auto w-full overflow-hidden p-4">
      <div ref={sliderRef} className="keen-slider">
        {data
          .filter((spot) => spot.show)
          .map((spot) => (
            <div key={spot.id} className="keen-slider__slide">
              <Card className="h-full">
                <CardBody className="relative overflow-hidden text-center">
                  <div className="relative z-10">
                    {/* <h3 className="mb-2 text-xl font-bold">{spot.fullname}</h3> */}
                    <p className="mb-2 text-sm">{spot.title}</p>
                    <p className="mb-4 text-sm">&quot;{spot.body}&quot;</p>
                  </div>
                </CardBody>
                <CardFooter className="justify-center border-t-1 border-blue-200 dark:border-blue-700">
                  <div className="flex items-center">
                    <Avatar src="/img/default-avatar.png" className="mr-4" />
                    <p className="font-semibold">{spot.fullname}</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
