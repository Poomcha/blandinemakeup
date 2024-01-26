import "./globals.css";
import Menu from "@/components/menu/menu";
import InstagramProvider from "@/context/instagram";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Patrick_Hand_SC, Sono } from "next/font/google";

export const patrick_hand_sc = Patrick_Hand_SC({
  weight: "400",
  subsets: ["latin"],
});

const sono = Sono({ subsets: ["latin"] });


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="fr">
        <InstagramProvider>
          <body className={sono.className}>
            <header>
              <Menu />
            </header>
            <main>{children}</main>
            <Analytics />
            <SpeedInsights />
          </body>
        </InstagramProvider>
      </html>
    </>
  );
}
