import React, { useState } from 'react';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function DNSChecker() {
  const [domain, setDomain] = useState('');
  const [dnsResult, setDnsResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDNS = async () => {
    if (!domain) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://dns.google/resolve?name=${domain}`);
      const data = await response.json();
      setDnsResult(data);
    } catch (err) {
      setError('Failed to fetch DNS records');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchDNS();
    }
  };

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
          title="DNS Checker"
          description="Check the DNS records of a domain"
          gradient="from-teal-400 to-blue-500"
        />

        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Domain
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="Enter domain name"
              />
            </div>
            <div>
              <button
                onClick={fetchDNS}
                className="w-full bg-teal-500 text-white py-2 rounded focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                Check DNS
              </button>
            </div>
            {loading && <div className="mt-4 text-white">Loading...</div>}
            {error && <div className="mt-4 text-red-500">{error}</div>}
            {dnsResult && (
              <div className="mt-4">
                <pre className="bg-gray-900 p-4 rounded text-white font-mono">
                  {JSON.stringify(dnsResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
