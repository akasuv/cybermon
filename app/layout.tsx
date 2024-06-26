import type { Metadata } from "next";
import { DM_Serif_Display, Martian_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./configs/providers";
import Image from "next/image";

const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-martian-mono",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "Cybermon",
  description: "Explore Cyberland with your Cybermons!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${martianMono.variable} ${dmSerifDisplay.variable} font-mono bg-[#F3F3EF] overflow-hidden`}
      >
        <Providers>{children}</Providers>
        <div className="absolute top-full -translate-y-2/3 left-1/2 -translate-x-1/2 -z-10">
          <Image src="/island.png" alt="Cyberland" width={888} height={605} />
        </div>
      </body>
    </html>
  );
}
