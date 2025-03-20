import { Facebook, Mail, Phone } from 'lucide-react'; // Ensure you have the correct icons
const TikTokIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
    {...props}
  >
    <path d="M16 8.39V14a5 5 0 1 1-4.12-4.92A4.994 4.994 0 0 1 12 9c0 .17-.01.33-.04.49a3 3 0 1 0 2.6 2.6c.16-.03.32-.04.49-.04a4.994 4.994 0 0 0 2.92-1.12A7.992 7.992 0 0 1 16 8.39ZM20 7a5.991 5.991 0 0 1-4-1.528V15a7 7 0 1 1-7-7c.34 0 .678.026 1.012.076A5.992 5.992 0 0 0 4 15a6 6 0 1 0 12 0V4h2a4 4 0 0 0 2 3.464V7Z" />
  </svg>
);

export default function FloatingSocialMenu() {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/AnilaoScubaDiveCenter',
    },
    {
      name: 'TikTok',
      icon: TikTokIcon, // Use the custom TikTok icon
      url: 'https://www.tiktok.com', // Replace with actual TikTok profile link
    },
    {
      name: 'Phone',
      icon: Phone,
      url: 'tel:+1234567890', // Replace with actual phone number
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:fgbaoin@yahoo.com', // Replace with actual email
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 z-10 -translate-y-1/2">
      <ul className="flex flex-col space-y-2 rounded-l-lg bg-white p-2 shadow-lg dark:bg-gray-800">
        {socialLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label={`Visit our ${link.name} page`}
            >
              <link.icon className="h-6 w-6" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
