import { Providers } from '@/store/provider';
import { Inter } from 'next/font/google';
import './globals.css';
import AudioManager from '@/components/AudioManager/AudioManager';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sukify',
  description: 'Youtube music downloader and player'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Providers>
            {children}
            <AudioManager />
          </Providers>
      </body>
    </html>
  );
};
