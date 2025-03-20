// app\(user)\profile\layout.tsx

import { fontSans } from '@/config/fonts';
import '@/styles/globals.css';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
