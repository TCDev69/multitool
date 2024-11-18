import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';
import * as cryptoJS from 'crypto-js';
import { blake2b, blake2s } from 'blakejs';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': '',
    'SHA-1': '',
    'SHA-224': '',
    'MD5': '',
    'RIPEMD-160': '',
    'BLAKE2b': '',
    'BLAKE2s': '',
  });
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    const updateHashes = async () => {
      if (!input) {
        setHashes({
          'SHA-256': '',
          'SHA-384': '',
          'SHA-512': '',
          'SHA-1': '',
          'SHA-224': '',
          'MD5': '',
          'RIPEMD-160': '',
          'BLAKE2b': '',
          'BLAKE2s': '',
        });
        return;
      }

      const newHashes: Record<string, string> = {};

      // Web Crypto API for SHA-* algorithms
      for (const algorithm of [
        'SHA-256',
        'SHA-384',
        'SHA-512',
        'SHA-1',
      ]) {
        try {
          const encoder = new TextEncoder();
          const data = encoder.encode(input);
          const hashBuffer = await crypto.subtle.digest(algorithm, data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          newHashes[algorithm] = hashArray
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
        } catch (e) {
          newHashes[algorithm] = 'Error generating hash';
        }
      }

      // SHA-224 using crypto-js
      try {
        newHashes['SHA-224'] = cryptoJS.SHA224(input).toString(cryptoJS.enc.Hex);
      } catch (e) {
        newHashes['SHA-224'] = 'Error generating hash';
      }

      // External crypto-js for MD5, RIPEMD-160
      newHashes['MD5'] = cryptoJS.MD5(input).toString(cryptoJS.enc.Hex);
      newHashes['RIPEMD-160'] = cryptoJS.RIPEMD160(input).toString(cryptoJS.enc.Hex);

      // BLAKE2b and BLAKE2s with blakejs
      try {
        newHashes['BLAKE2b'] = blake2b(input).toString('hex');
      } catch (e) {
        newHashes['BLAKE2b'] = 'Error generating hash';
      }
      try {
        newHashes['BLAKE2s'] = blake2s(input).toString('hex');
      } catch (e) {
        newHashes['BLAKE2s'] = 'Error generating hash';
      }

      setHashes(newHashes);
    };

    updateHashes();
  }, [input]);

  const handleCopy = (hash: string) => {
    if (!hash) return;

    navigator.clipboard.writeText(hash).then(() => {
      setCopiedHash(hash);
      setTimeout(() => setCopiedHash(null), 2000); // Reset the copied state after 2 seconds
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
          title="Hash Generator"
          description="Generate various hash formats from your input"
          gradient="from-yellow-400 to-orange-500"
        />

        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input Text
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                placeholder="Enter text to hash..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(hashes).map(([algorithm, hash]) => (
                <div key={algorithm} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {algorithm}
                    </label>
                    {copiedHash === hash && (
                      <p className="text-emerald-400 text-xs">Copied!</p>
                    )}
                  </div>
                  <input
                    type="text"
                    readOnly
                    value={hash}
                    className="w-full bg-gray-900 rounded p-3 text-white font-mono text-sm cursor-pointer"
                    onClick={() => handleCopy(hash)}
                    title="Click to copy"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
