import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Scuba Diving Courses in Anilao, Batangas | Anilao Scuba Dive Center Shop',
  description:
    'Enroll now and experience top-rated scuba diving courses at Anilao Scuba Dive Center. Learn from expert instructors and explore the beautiful underwater world of Anilao.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
