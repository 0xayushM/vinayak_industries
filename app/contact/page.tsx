'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    country: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Debug environment variables
      console.log('Contact form environment variables:', {
        endpoint: process.env.NEXT_PUBLIC_BREW_MY_AGENT_ENDPOINT,
        apiKey: process.env.NEXT_PUBLIC_BREW_MY_AGENT_API_KEY
      });

      // Send to BrewMyAgent via secure API route
      const brewMyAgentResponse = await fetch('/api/brewmy-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_name: 'contact_form',
          data: formData
        }),
      });

      console.log('Contact form BrewMyAgent response status:', brewMyAgentResponse.status);
      
      if (!brewMyAgentResponse.ok) {
        const errorData = await brewMyAgentResponse.text();
        console.error('Contact form BrewMyAgent error response:', errorData);
        throw new Error(`Failed to submit to BrewMyAgent: ${brewMyAgentResponse.status}`);
      }

      const responseData = await brewMyAgentResponse.json();
      console.log('Contact form BrewMyAgent success response:', responseData);

      // Also send to existing API for backward compatibility
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } catch (error) {
        console.error('Error sending to existing API:', error);
        // Continue even if existing API fails
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
      });
      
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        country: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error submitting your message. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="h-[60vh] min-h-[400px] relative overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg-image.png"
            alt="Manufacturing Facility"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent" />
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg className="w-full h-16" viewBox="0 0 1440 64" preserveAspectRatio="none">
            <path d="M0 64L1440 64L1440 32L0 64Z" fill="#ffffff" />
          </svg>
        </div>

        <motion.div
          className="max-w-7xl mx-auto relative z-10 w-full px-6"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-amber-500 mb-4 leading-tight font-[family-name:var(--font-carbon)]"
            variants={fadeInUp}
          >
            CONTACT US
          </motion.h1>
          <motion.p
            className="text-sm md:text-2xl text-white max-w-3xl leading-relaxed font-[family-name:var(--font-korto)]"
            variants={fadeInUp}
          >
            One Stop Solution - Plastic Injection Moulded Components, Assemblies & Final Product
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form & Info */}
      <section className="p-3 md:p-6 bg-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">


            {/* Contact Information Card */}
            <div className="relative rounded-[40px] md:rounded-[50px] overflow-hidden bg-gray-900">
              <div className="absolute bottom-0 right-0 w-full h-[60%] z-0">
                <Image src="/images/bg-image.png" alt="Manufacturing Facility" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900" />
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col">
                <h2 className="text-3xl font-bold text-amber-50 p-6 font-[family-name:var(--font-carbon)] mb-8">CONTACT INFORMATION</h2>

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
                       <a href="tel:+919311378904" className="text-gray-100 hover:text-amber-500 transition-colors"> +91 9999394814</a>
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
                      <a href="mailto:sales@vinayaktechnoplast.com" className="text-gray-100 hover:text-amber-500 text-sm md:text-base transition-colors">sales@vinayaktechnoplast.com</a>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            {/* Contact Form Card */}
            <div className="bg-white rounded-[40px] md:rounded-[50px] p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-carbon)] mb-2">REQUEST A QUICK QUOTE</h2>
              <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you shortly.</p>
              
              {submitStatus && (
                <div className={`p-4 rounded-xl mb-4 ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input 
                      type="text" 
                      id="company" 
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900" 
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <input 
                    type="text" 
                    id="country" 
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none text-gray-900" 
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-full font-medium text-lg transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div>
          <div className="w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.0234567890123!2d77.0833!3d28.6833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d047309ffffff%3A0x1234567890abcdef!2sF-6%2C%20Delhi%20State%20Industrial%20Development%20Corporation%2C%20Nangloi%2C%20Delhi%2C%20110041!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vinayak Technoplast Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 lg:p-12 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white font-[family-name:var(--font-carbon)]">Ready to Start Your Project?</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your plastic injection molding needs and get a customized solution.
            </p>
            <a href="tel:+919311378904" className="inline-block bg-white text-amber-500 px-8 py-3.5 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors">
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
