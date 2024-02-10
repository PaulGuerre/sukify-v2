import { Providers } from '@/store/provider';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import Player from '@/components/player/Player';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sukify',
  description: 'Youtube music downloader and player'
};

export default function RootLayout({ children, showHeader = true, showPlayer = true }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Providers>
            {showHeader && <Header />}
            {children}
            {showPlayer && <Player />}
          </Providers>
      </body>
    </html>
  );
};
