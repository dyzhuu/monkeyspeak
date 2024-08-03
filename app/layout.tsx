import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Monkey Speak',
    default: 'Monkey Speak'
  },
  description: 'Monkey Type but through speaking'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full flex flex-col justify-center bg-[#0B0E13]">
        {children}
      </body>
    </html>
  );
}
