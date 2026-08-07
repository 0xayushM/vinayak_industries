'use client';

import { useState } from 'react';
import { X, Download, FileText } from 'lucide-react';

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
      // Debug environment variables
      console.log('Environment variables:', {
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
          form_name: 'download_dialog',
          data: formData
        }),
      });

      console.log('BrewMyAgent response status:', brewMyAgentResponse.status);
      
      if (!brewMyAgentResponse.ok) {
        const errorData = await brewMyAgentResponse.text();
        console.error('BrewMyAgent error response:', errorData);
        throw new Error(`Failed to submit to BrewMyAgent: ${brewMyAgentResponse.status}`);
      }

      const responseData = await brewMyAgentResponse.json();
      console.log('BrewMyAgent success response:', responseData);

      // Also send to existing API for backward compatibility
      try {
        const response = await fetch('/api/subscribe', {
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
