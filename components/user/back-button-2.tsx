'use client';

import { Link } from "@heroui/react";
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton2() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <Link
            onClick={handleGoBack}
            className="flex cursor-pointer items-center gap-1 py-4"
        >
            <ChevronLeft size={18} className="text-primary" />
            <small className="font-semibold text-black">Back</small>
        </Link>
    );
}
