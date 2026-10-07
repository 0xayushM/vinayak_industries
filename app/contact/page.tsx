'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteBuilder from "@/components/QuoteBuilder";
import Image from "next/image";
import { motion } from "framer-motion";

const NEXT_STEPS = [
  {
    title: "You send the brief",
    text: "Two quick steps. You do not need a drawing or exact numbers to start.",
  },
  {
    title: "We reply within one working day",
    text: "Our sales team calls or emails to confirm the details, and asks for your drawing if you have one.",
  },
  {
    title: "You get your quote",
    text: "Pricing and lead time for your part, mould or samples, with the next steps to get started.",
  },
];

const FACTS = [
  { value: "ISO 9001:2015", label: "Certified manufacturer" },
  { value: "30+", label: "Moulding machines, 60 to 850 T" },
  { value: "In-house", label: "Tool room" },
  { value: "35,000 sq. ft.", label: "Facility in Delhi NCR" },
];

const DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("F-6, DSIDC Industrial Complex, Rohtak Road, Nangloi, New Delhi 110041")}`;

export default function ContactPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5 }
  };

  // Bottom padding on phones keeps the footer clear of the fixed quote bar
  return (
    <div className="min-h-screen bg-gray-900 max-md:pb-[4.75rem]">
      {/* The form sits at the top of the page, so the bar goes solid as soon as the visitor scrolls */}
      <Navigation solidAfter={24} />

      {/* Guided quote form */}
      <QuoteBuilder />

      {/* What happens next */}
      <section className="p-3 md:p-6 bg-gray-100">
        <div className="max-w-8xl mx-auto space-y-6">
          <div className="bg-white rounded-[40px] md:rounded-[50px] p-8 lg:p-12">
            <h2 className="text-title font-bold text-gray-900 font-[family-name:var(--font-carbon)]">WHAT HAPPENS NEXT</h2>
            <ol className="mt-8 grid gap-8 md:grid-cols-3">
              {NEXT_STEPS.map((s, i) => (
                <motion.li key={s.title} {...fadeInUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <span className="text-heading font-bold text-amber-500 font-[family-name:var(--font-carbon)]">0{i + 1}</span>
                  <h3 className="mt-2 text-subtitle font-bold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-copy text-gray-600">{s.text}</p>
                </motion.li>
              ))}
            </ol>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-gray-200 pt-8 lg:grid-cols-4">
              {FACTS.map((f) => (
                <div key={f.label} className="flex flex-col-reverse">
                  <dt className="text-sm text-gray-600">{f.label}</dt>
                  <dd className="text-subtitle font-bold text-gray-900">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Contact Information Card */}
            <div className="relative rounded-[40px] md:rounded-[50px] overflow-hidden bg-gray-900">
              <div className="absolute bottom-0 right-0 w-full h-[60%] z-0">
                <Image src="/images/bg-image.png" alt="Manufacturing Facility" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900" />
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col">
                <h2 className="text-title font-bold text-amber-50 p-6 font-[family-name:var(--font-carbon)] mb-8">VISIT OR CALL US</h2>

                <div className="space-y-6 px-2 md:px-6 flex-grow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Address</h3>
                      <p className="text-gray-100 leading-relaxed text-sm">
                        F-6, DSIDC Industrial Complex, Rohtak Road<br />
                        Near Udyog Nagar Metro Station<br />
                        Nangloi, New Delhi-110041, India
                      </p>
                      <a href={DIRECTIONS_HREF} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors">
                        Get directions
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Phone</h3>
                      <a href="tel:+919311378904" className="text-gray-100 hover:text-amber-500 transition-colors">+91 9311378904</a>,  
                       <a href="tel:+919999394814" className="text-gray-100 hover:text-amber-500 transition-colors"> +91 9999394814</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Email</h3>
                      <a href="mailto:sales@vinayaktechnoplast.com" className="text-gray-100 hover:text-amber-500 text-copy transition-colors">sales@vinayaktechnoplast.com</a>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            {/* Map */}
            <div className="relative min-h-[320px] md:min-h-[420px] rounded-[40px] md:rounded-[50px] overflow-hidden bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.0234567890123!2d77.0833!3d28.6833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d047309ffffff%3A0x1234567890abcdef!2sF-6%2C%20Delhi%20State%20Industrial%20Development%20Corporation%2C%20Nangloi%2C%20Delhi%2C%20110041!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vinayak Technoplast Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-(--spacing-section) px-(--spacing-gutter) bg-gradient-to-br from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-heading font-bold mb-6 text-white font-[family-name:var(--font-carbon)]">Ready to Start Your Project?</h2>
          <p className="text-lead text-amber-100 mb-8 max-w-2xl mx-auto">
            Tell us what you need in two quick steps, or call and talk to our sales team directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote" className="inline-block bg-white text-amber-500 px-5 py-2.5 lg:px-7 lg:py-3 2xl:px-8 2xl:py-3.5 rounded-full font-medium text-lead hover:bg-gray-100 transition-colors">
              Start My Inquiry
            </a>
            <a href="tel:+919311378904" className="inline-block bg-amber-700 text-white px-5 py-2.5 lg:px-7 lg:py-3 2xl:px-8 2xl:py-3.5 rounded-full font-medium text-lead hover:bg-amber-800 transition-colors border-2 border-white">
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
