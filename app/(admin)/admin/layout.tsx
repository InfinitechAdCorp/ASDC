'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const router = useRouter();

    useEffect(() => {
        if (window.innerWidth < 1024) {
            router.push('/mobile-not-supported');
        }
    }, [router]);

    return <section>{children}</section>
}