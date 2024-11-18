import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';

export default function UrlEncoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const convert = () => {
    try {
      if (mode === 'encode') {
        return encodeURIComponent(input);
      } else {
        return decodeURIComponent(input);
      } 
    } catch (e) {
      return 'Invalid input';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tools
        </Link>

        <PageHeader
          title="URL Encoder"
          description="Encode and decode URLs"
          gradient="from-red-400 to-pink-500"
        />

        <Card>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded ${
                mode === 'encode'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded ${
                mode === 'decode'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              Decode
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter URL to decode...'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Output
              </label>
              <textarea
                value={convert()}
                readOnly
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}