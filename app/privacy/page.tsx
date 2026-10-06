import type { Metadata } from 'next';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieSettingsButton from '@/components/CookieSettingsButton';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vinayak Technoplast',
  description: 'How Vinayak Technoplast collects, uses and protects information shared through vinayaktechnoplast.com.',
};

const sections: { h: string; p: string[] }[] = [
  {
    h: 'Information we collect',
    p: [
      'Information you give us: when you send an inquiry, request a quote or download our company profile, we collect the details you enter, such as your name, company, contact details and message.',
      'Information collected automatically: when you visit our website, we collect general usage information such as the pages you view, the type of device and browser you use, and your approximate location. This helps us understand how our website is used.',
    ],
  },
  {
    h: 'How we use your information',
    p: [
      'We use your information to respond to your inquiries, share the information you request, provide quotations, and maintain our business relationship with you.',
      'We also use it to understand how visitors use our website, improve our content and services, and, where you have agreed, tell you about products and services that may interest you.',
    ],
  },
  {
    h: 'Cookies',
    p: [
      'Our website uses cookies and similar technologies. Essential cookies are needed for the website to work and are always on. Optional cookies help us understand website usage and show relevant information about our products. These are used only if you accept them.',
      'You can accept or decline optional cookies when you first visit, and change your choice at any time using "Cookie settings" below or in the website footer.',
    ],
  },
  {
    h: 'Sharing your information',
    p: [
      'We do not sell your personal information. We may share it with trusted service providers who help us run our website and business, only for those purposes and subject to appropriate safeguards. We may also disclose information where required by law.',
    ],
  },
  {
    h: 'Data security and retention',
    p: [
      'We take reasonable measures to protect your information from unauthorised access, loss or misuse. We keep it only for as long as it is needed for the purposes described in this policy or as required by law.',
    ],
  },
  {
    h: 'Your rights',
    p: [
      'You may ask to access, correct or delete your personal information, or withdraw your consent at any time. To make a request, contact us using the details below.',
    ],
  },
  {
    h: 'Changes to this policy',
    p: [
      'We may update this policy from time to time. Any changes will be posted on this page with a revised date.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-full bg-white">
      <Navigation />

      {/* Dark hero: the navbar is transparent with white text until you scroll past 60vh */}
      <section className="h-[60vh] min-h-[400px] relative overflow-hidden flex items-center z-0">
        <div className="absolute inset-0 z-0">
          <Image src="/images/bg-image.png" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 w-full px-(--spacing-gutter)">
          <h1 className="text-hero font-bold text-amber-500 mb-4 leading-tight font-[family-name:var(--font-carbon)]">
            PRIVACY POLICY
          </h1>
          <p className="text-subtitle text-white max-w-3xl leading-relaxed font-[family-name:var(--font-korto)]">
            How we collect, use and protect the information you share with us.
          </p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-5 py-16">
        <p className="text-gray-500">Last updated: October 2026</p>
        <p className="mt-6 text-gray-700 leading-relaxed">
          Vinayak Technoplast (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains how we
          handle personal information collected through vinayaktechnoplast.com.
        </p>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-2xl font-semibold text-gray-900">{s.h}</h2>
              <div className="mt-3 space-y-3 text-gray-700 leading-relaxed">
                {s.p.map((t) => (
                  <p key={t.slice(0, 40)}>{t}</p>
                ))}
              </div>
              {s.h === 'Cookies' && (
                <CookieSettingsButton className="mt-4 px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-800 hover:border-amber-500 hover:text-amber-600 transition-colors" />
              )}
            </section>
          ))}

          <section>
            <h2 className="text-2xl font-semibold text-gray-900">Contact us</h2>
            <div className="mt-3 text-gray-700 leading-relaxed space-y-1">
              <p>Vinayak Technoplast</p>
              <p>F-6, DSIDC Industrial Complex, Rohtak Road, Nangloi, New Delhi 110041, India</p>
              <p>
                Email:{' '}
                <a href="mailto:sales@vinayaktechnoplast.com" className="text-amber-600 hover:underline">
                  sales@vinayaktechnoplast.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
