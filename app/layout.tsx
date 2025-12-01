import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const korto = localFont({
  src: "../public/fonts/Korto.ttf",
  variable: "--font-korto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinayak Industries - Leading Plastic Injection Molding Manufacturer",
  description: "Leading plastic injection molding manufacturer in Southern California with 50+ years of experience",
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
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
        className={`${korto.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
