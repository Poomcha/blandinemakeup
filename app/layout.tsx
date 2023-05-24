'use client';

import './globals.css';
import PageProvider from '../context/pages';
import Menu from '@/components/menu';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="fr">
        <PageProvider>
          <body>
            <header>
              <Menu />
            </header>
            {children}
          </body>
        </PageProvider>
      </html>
    </>
  );
}
