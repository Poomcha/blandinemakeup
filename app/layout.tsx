import './globals.css';
import PageProvider from '../context/pages';
import Menu from '@/components/menu/menu';
import { Metadata } from 'next';
import InstagramProvider from '@/context/instagram';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="fr">
        <InstagramProvider>
          <PageProvider>
            <body>
              <header>
                <Menu />
              </header>
              <main>{children}</main>
            </body>
          </PageProvider>
        </InstagramProvider>
      </html>
    </>
  );
}
