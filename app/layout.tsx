import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";
import ConsentAndTags from "@/components/ConsentAndTags";

// Set NEXT_PUBLIC_GTM_ID (e.g. GTM-XXXXXXX) in Vercel to switch on Google Tag Manager.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
        {/* Google Consent Mode v2: everything denied until the visitor accepts (or restores an earlier "accept") */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            var granted = false;
            try { granted = localStorage.getItem('vt_consent') === 'granted'; } catch (e) {}
            var s = granted ? 'granted' : 'denied';
            gtag('consent', 'default', {
              ad_storage: s, ad_user_data: s, ad_personalization: s, analytics_storage: s,
              functionality_storage: 'granted', security_storage: 'granted', wait_for_update: 500
            });
          `}
        </Script>
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        <VisitorTracker />
        {children}
        <WhatsAppButton />
        <ConsentAndTags />
      </body>
    </html>
  );
}
