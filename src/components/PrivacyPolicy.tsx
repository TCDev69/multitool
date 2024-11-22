import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { Card } from './Card';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tools
        </Link>

        <PageHeader
          title="Privacy Policy"
          description="How we handle and protect your data"
          gradient="from-blue-400 to-purple-500"
        />

        <Card>
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-blue-400">
              <Shield className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Data Protection</h2>
            </div>

            <div className="space-y-4 text-gray-300">
              <p>
                We are committed to protecting your privacy. This policy explains how we handle your data:
              </p>

              <h3 className="text-lg font-semibold mt-6">Data Collection and Processing</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our website.
                  This service collects anonymous data including:
                  <ul className="list-disc pl-5 mt-2">
                    <li>Pages visited and time spent</li>
                    <li>Device and browser information</li>
                    <li>Approximate geographic location (country/city level)</li>
                    <li>Referral sources</li>
                  </ul>
                  We have configured Google Analytics to anonymize IP addresses and disabled data sharing for advertising purposes.
                </li>
                <li>
                  <strong>Cloudflare:</strong> We use Cloudflare for security and performance optimization. Cloudflare processes:
                  <ul className="list-disc pl-5 mt-2">
                    <li>IP addresses (temporarily) for security checks</li>
                    <li>Basic device information for optimization</li>
                    <li>Security-related data to prevent abuse</li>
                  </ul>
                </li>
                <li>
                  <strong>Local Processing:</strong> All tools process data locally in your browser. 
                  No user-entered data is sent to our servers.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-6">Cookies and Storage</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for basic site functionality and security
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Used by Google Analytics to understand usage patterns
                </li>
                <li>
                  <strong>Cloudflare Cookies:</strong> Security and performance optimization
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Store your privacy choices
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-6">Third-party Services</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Google Analytics:</strong>{' '}
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Cloudflare:</strong>{' '}
                  <a 
                    href="https://www.cloudflare.com/privacypolicy/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-6">Your Rights</h3>
              <p>Under GDPR, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6">Data Retention</h3>
              <p>
                Google Analytics data is retained for 26 months. Cloudflare security logs are retained according to their policy for security purposes.
                You can request deletion of your data at any time.
              </p>

              <h3 className="text-lg font-semibold mt-6">Contact Information</h3>
              <p>
                For any privacy-related questions or to exercise your rights, please contact us at email@tcdev.xyz
              </p>

              <p className="text-sm text-gray-400 mt-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}