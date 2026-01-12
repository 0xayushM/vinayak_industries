import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Image
              src="/logo/logo1.png"
              alt="Vinayak Technoplast Logo"
              width={240}
              height={75}
              className="object-contain mb-6 brightness-0 invert"
            />
          </div>

          {/* Manufacturing Capabilities */}
          <div>
            <h3 className="text-lg font-bold mb-6">Manufacturing Capabilities</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/capabilities" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Product Design & Development
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Manufacturing Shop Floor
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Manufacturing and R&D
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  Lab & Testing Facilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Get in touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400 text-sm leading-relaxed">
                  F-6, DSIDC Industrial Complex, Rohtak Road<br />
                  Near Udyog Nagar Metro Station<br />
                  Nangloi, New Delhi-110041, India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="text-gray-400 text-sm">
                  <a href="tel:+919311378904" className="hover:text-amber-500 transition-colors">+91 9311378904</a>
                  <span>, </span>
                  <a href="tel:+919999394814" className="hover:text-amber-500 transition-colors">9999394814</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:sales@vinayaktechnoplast.com" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  sales@vinayaktechnoplast.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <p className="text-gray-400 text-sm text-center">
            Vinayak Technoplast © 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
