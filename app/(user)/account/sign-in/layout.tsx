// app\(user)\account\sign-in\layout.tsx

import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Sign Up | Anilao Scuba Dive Center Shop',
  description:
    'Create an account with Anilao Scuba Dive Center Shop to book courses, explore dive adventures, and connect with expert instructors.',
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
