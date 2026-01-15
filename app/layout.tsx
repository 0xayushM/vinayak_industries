import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";

const korto = localFont({
  src: "../public/fonts/Korto.ttf",
  variable: "--font-korto",
  display: "swap",
});

const osiris = localFont({
  src: "../public/fonts/Osiris.otf",
  variable: "--font-carbon",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinayak Technoplast - Leading Plastic Injection Molding Manufacturer",
  description: "Tier-1 injection molding facility catering to Automotive, Pharma, Kitchenware, and Electrical giants. ISO 9001:2015 certified manufacturer in New Delhi, India.",
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.vinayaktechnoplast.com",
    siteName: "Vinayak Technoplast",
    title: "Vinayak Technoplast - Leading Plastic Injection Molding Manufacturer",
    description: "Tier-1 injection molding facility catering to Automotive, Pharma, Kitchenware, and Electrical giants. ISO 9001:2015 certified manufacturer in New Delhi, India.",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Vinayak Technoplast Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinayak Technoplast - Leading Plastic Injection Molding Manufacturer",
    description: "Tier-1 injection molding facility catering to Automotive, Pharma, Kitchenware, and Electrical giants. ISO 9001:2015 certified manufacturer in New Delhi, India.",
    images: ["/logo/logo.png"],
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
        className={`${korto.variable} ${osiris.variable} antialiased`}
        style={{ fontFamily: 'var(--font-korto)' }}
      >
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
