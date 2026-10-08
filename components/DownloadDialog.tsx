'use client';

import { useEffect, useState } from 'react';
import { X, Download, FileText } from 'lucide-react';
import { guardedPost, primeFormGuard, submitLead, trackEvent } from '@/lib/tracking';
import Honeypot from '@/components/Honeypot';

interface DownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadDialog({ isOpen, onClose }: DownloadDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [canDownload, setCanDownload] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (isOpen) primeFormGuard();
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const ok = await submitLead({
        formName: 'download_dialog',
        sheetEndpoint: '/api/subscribe',
        sheetBody: formData,
        agentData: formData,
        honeypot,
      });
      if (!ok) throw new Error('Lead could not be saved');

      // Send the outreach email in the background; don't block the download on it
      guardedPost('/api/send-profile-email', { name: formData.name, email: formData.email }, honeypot).catch((error) => {
        console.error('Error sending outreach email:', error);
      });

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! You can now download the company presentation.'
      });
      setCanDownload(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    trackEvent('deck_download');
    const link = document.createElement('a');
    link.href = '/Vinayak_Profile.pdf';
    link.download = 'Vinayak_Technoplast_Company_Profile.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      onClose();
      setFormData({ name: '', email: '', phone: '' });
      setCanDownload(false);
      setSubmitStatus(null);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-subtitle font-bold text-gray-900 mb-2">Download Company Presentation</h2>
          <p className="text-gray-600">Get our complete capability deck and company presentation</p>
        </div>

        {!canDownload ? (
          <form onSubmit={handleSubmit} className="space-y-4" data-beacon-ignore>
            <Honeypot value={honeypot} onChange={setHoneypot} />
            {submitStatus && submitStatus.type === 'error' && (
              <div className="p-3 rounded-xl bg-red-50 text-red-800 border border-red-200 text-sm">
                {submitStatus.message}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2.5 lg:px-6 lg:py-3 rounded-full font-medium transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Subscribe & Download'}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="p-4 rounded-xl bg-green-50 text-green-800 border border-green-200">
              {submitStatus?.message}
            </div>
            <button
              onClick={handleDownload}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 lg:px-6 lg:py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
