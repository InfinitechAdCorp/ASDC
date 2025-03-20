'use client';

import { Link } from "@heroui/react";
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Link
      onClick={handleGoBack}
      className="fixed left-6 top-4 flex cursor-pointer items-center gap-1"
    >
      <ChevronLeft size={18} className="text-primary" />
      <small className="font-semibold text-black">Back</small>
    </Link>
  );
}
