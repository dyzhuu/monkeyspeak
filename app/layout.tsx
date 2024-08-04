import type { Metadata } from 'next';
import '@/app/globals.css';
import { AudioStreamProvider } from '@/lib/contexts/audio-stream-context';
import { PermissionPopup } from './components/permission-popup';

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
      <AudioStreamProvider>
        <body className="min-h-screen w-full flex flex-col items-justify bg-[#0B0E13]">
          {children}
          <PermissionPopup />
        </body>
      </AudioStreamProvider>
    </html>
  );
}
