import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function GDPRBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('gdpr-consent', 'accepted');
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('gdpr-consent', 'declined');
    window.gtag('consent', 'default', {
      'analytics_storage': 'denied'
    });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur border-t border-gray-800 p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-300">
          <p>
            We use cookies and similar technologies to improve your experience. This includes essential cookies, 
            Cloudflare security features, and Google Analytics to understand how you use our service. 
            By continuing, you agree to our use of these technologies. You can customize your preferences at any time.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
          >
            Accept All
          </button>
        </div>
        <button
          onClick={declineCookies}
          className="absolute top-2 right-2 text-gray-400 hover:text-white sm:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}