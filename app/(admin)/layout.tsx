import { Metadata, Viewport } from 'next';
import clsx from 'clsx';


import { Providers } from './providers';

import { fontSans } from '@/config/fonts';
import { Sidebar } from '@/components/admin/sidebar';
import { Navbar } from '@/components/admin/navbar';


import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'ASDC - ADMIN',
  description: 'Anilao Scuba Dive Center',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="flex">
            <Sidebar />
            <div className="flex flex-grow flex-col">
              <Navbar />
              <main className="flex-grow p-4">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
