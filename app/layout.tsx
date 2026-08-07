import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";

const SITE_URL = "https://www.vinayaktechnoplast.com";
const SITE_NAME = "Vinayak Technoplast";
const DEFAULT_OG_IMAGE = "/logo/logo.png";

const ORG = {
  legalName: "Vinayak Technoplast Pvt. Ltd.",
  email: "sales@vinayaktechnoplast.com",
  phones: ["+91-9311378904", "+91-9999394814"],
  street: "F-6, DSIDC Industrial Complex, Rohtak Road, Nangloi",
  locality: "New Delhi",
  region: "Delhi",
  postalCode: "110041",
  country: "IN",
  latitude: 28.6833,
  longitude: 77.0833,
  linkedin: "https://www.linkedin.com/company/vinayaktechnoplast",
};

const postalAddress = {
  "@type": "PostalAddress" as const,
  streetAddress: ORG.street,
  addressLocality: ORG.locality,
  addressRegion: ORG.region,
  postalCode: ORG.postalCode,
  addressCountry: ORG.country,
};

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: ORG.legalName,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo/logo.png` },
    description:
      "Tier-1 plastic injection moulding manufacturer in New Delhi, India. In-house tool room, 650-tonne press capacity and ISO 9001:2015 certified production for automotive, EV, electrical, medical and appliance OEMs.",
    email: ORG.email,
    telephone: ORG.phones[0],
    address: postalAddress,
    sameAs: [ORG.linkedin],
    contactPoint: ORG.phones.map((telephone) => ({
      "@type": "ContactPoint",
      telephone,
      contactType: "sales",
      email: ORG.email,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    })),
  };
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Manufacturer",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    image: `${SITE_URL}/images/infrastructure/Vinayak_Technoplast1.png`,
    url: SITE_URL,
    telephone: ORG.phones[0],
    email: ORG.email,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: ORG.latitude,
      longitude: ORG.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    hasCredential: "ISO 9001:2015",
    areaServed: { "@type": "Country", name: "India" },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  };
}

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
