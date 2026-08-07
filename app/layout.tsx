import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/seo";

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

const DEFAULT_TITLE =
  "Vinayak Technoplast — Plastic Injection Moulding Manufacturer in India";
const DEFAULT_DESCRIPTION =
  "Tier-1 plastic injection moulding manufacturer in New Delhi. In-house tool room, 650-tonne press capacity and ISO 9001:2015 certified production for automotive, EV, electrical, medical and appliance OEMs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Vinayak Technoplast",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Manufacturing",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Vinayak Technoplast injection moulding facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema(),
              localBusinessSchema(),
              websiteSchema(),
            ]),
          }}
        />
      </head>
      <body
        className={`${korto.variable} ${osiris.variable} antialiased`}
        style={{ fontFamily: 'var(--font-korto)' }}
      >
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`
            function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
            o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
            o.onload=function(){window.trackingFunctions.onLoad({appId:"69c2849cd2c4040015ed6ff6"})},
            document.head.appendChild(o)}initApollo();
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xypkl0pwhk");
          `}
        </Script>
        <Script id="reb2b-tracker" strategy="afterInteractive">
          {`
            !function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("R6G5YH871V65");
          `}
        </Script>
        <VisitorTracker />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
