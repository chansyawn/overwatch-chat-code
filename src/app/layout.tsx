import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Provider } from "jotai";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Overwatch Chat Code Generator",
  description:
    "Create chat messages with colors and icons. Free online tool to create custom Overwatch chat messages with colors, icons and special formatting.",
  keywords: [
    "Overwatch",
    "Chat",
    "Code",
    "Generator",
    "Colors",
    "Icons",
    "Emoji",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
        <SpeedInsights sampleRate={0.01} />
        <Analytics />
      </body>
    </html>
  );
}
