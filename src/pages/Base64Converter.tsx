import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';
 
export default function Base64Converter() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const convert = () => {
    try {
      if (mode === 'encode') {
        return btoa(input);
      } else {
        return atob(input);
      }
    } catch (e) {
      return 'Invalid input';
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000); // Reset the copied state after 2 seconds
    });
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
          title="Base64 Converter"
          description="Encode and decode Base64 strings easily"
          gradient="from-purple-400 to-pink-500"
        />

        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter base64 to decode...'}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Output
                </label>
                {copiedText === convert() && (
                  <span className="text-sm text-green-500">
                    Copied!
                  </span>
                )}
              </div>
              <div className="relative">
                <textarea
                  value={convert()}
                  readOnly
                  onClick={() => handleCopy(convert())}
                  className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono cursor-pointer"
                  placeholder="Output will appear here..."
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
