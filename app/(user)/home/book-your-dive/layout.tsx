import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Dive in Anilao, Batangas | Anilao Scuba Dive Center Shop',
  description: 'Discover unforgettable scuba diving adventures in Anilao, Batangas! Book your dive or enroll in world-class courses with expert instructors at Anilao Scuba Dive Center. Explore vibrant marine life and stunning underwater landscapes today.',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
