// app\(user)\layout.tsx

import type { Metadata } from 'next';

import clsx from 'clsx';

import { fontSans } from '@/config/fonts';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Anilao Scuba Dive Center',
  description:
    'ASDC is a place ideal for divers and people who wish to experience the underwater world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
