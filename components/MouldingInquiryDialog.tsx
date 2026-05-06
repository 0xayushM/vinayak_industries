'use client';

import { useState } from 'react';
import { X, Send, CheckCircle2, Wrench } from 'lucide-react';

interface MouldingInquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export default function MouldingInquiryDialog({
  isOpen,
  onClose,
  title = 'Discuss Your Mould Project',
  subtitle = 'Share your requirements and our engineering team will get back to you within 24 hours.',
}: MouldingInquiryDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectDetails: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', company: '', projectDetails: '' });
      setIsSubmitted(false);
      setSubmitStatus(null);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/brewmy-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_name: 'moulding_inquiry',
          data: formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      setSubmitStatus({
        type: 'success',
        message: "Thanks! We've received your inquiry and will reach out shortly.",
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Moulding inquiry error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 font-[family-name:var(--font-carbon)]">
                {title}
              </h2>
              <p className="text-gray-600 text-sm">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {submitStatus && submitStatus.type === 'error' && (
                <div className="p-3 rounded-xl bg-red-50 text-red-800 border border-red-200 text-sm">
                  {submitStatus.message}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details
                </label>
                <textarea
                  id="projectDetails"
                  rows={4}
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder="Tell us about your part, expected volumes, materials, target lead time, etc."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Inquiry
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-carbon)]">
              Inquiry Received
            </h2>
            <p className="text-gray-600">{submitStatus?.message}</p>
            <button
              onClick={resetAndClose}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
