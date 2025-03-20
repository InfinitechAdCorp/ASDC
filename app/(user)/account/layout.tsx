// app\(user)\profile\layout.tsx

import { fontSans } from '@/config/fonts';
import '@/styles/globals.css';
import BackButton from '@/components/user/back-button';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} max-h-screen font-sans antialiased`}
      >
        <BackButton />
        {children}
      </body>
    </html>
  );
}
