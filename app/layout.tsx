import "./globals.css";
import Menu from "@/components/menu/menu";
import InstagramProvider from "@/context/instagram";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { sono } from "./font";
import MenuStateProvider from "@/context/menu_state";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="fr">
        <InstagramProvider>
          <MenuStateProvider>
            <body className={sono.className}>
              <header>
                <Menu />
              </header>
              <main>{children}</main>
              <Analytics />
              <SpeedInsights />
            </body>
          </MenuStateProvider>
        </InstagramProvider>
      </html>
    </>
  );
}
