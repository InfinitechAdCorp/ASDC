// app\(user)\profile\layout.tsx

import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Please Sign In - Unlock Diving Experiences',
  description:
    'Sign in to gain access to amazing diving experiences, connect with our community, and explore the world beneath the surface.',
  keywords: 'sign in, scuba diving, diving experiences, community, login',
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
