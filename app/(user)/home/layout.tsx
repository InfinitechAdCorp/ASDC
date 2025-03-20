// app\(user)\home\layout.tsx

import FloatingSocialMenu from '@/components/user/floating-social-menu';
import Footer from '@/components/user/footer';
import Navbar from '@/components/user/navbar';
import { fontSans } from '@/config/fonts';
import '@/styles/globals.css';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <div className="hidden md:block">
          <FloatingSocialMenu />
          <Footer />
        </div>
      </body>
    </html>
  );
}
