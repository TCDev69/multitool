import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Save } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';
import { v4 as uuidv4 } from 'uuid';

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([uuidv4()]);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState<string | null>(null);

  const generateUuids = () => {
    const newUuids = Array.from({ length: quantity }, () => uuidv4());
    setUuids(newUuids);
  };

  const copyToClipboard = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
    setCopied(uuid);
    setTimeout(() => setCopied(null), 2000);
  };

  const saveToFile = () => {
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'uuids.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      generateUuids();
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
          title="UUID Generator"
          description="Generate random UUIDs (v4)"
          gradient="from-blue-400 to-cyan-500"
        />

        <Card>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of UUIDs
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  onKeyDown={handleKeyPress}
                  className="w-full bg-gray-900 rounded p-3 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={generateUuids}
                className="mt-6 bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                onClick={saveToFile}
                className="mt-6 bg-green-500 text-white px-4 py-3 rounded hover:bg-green-600 transition-colors"
              >
                <Save className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  onClick={() => copyToClipboard(uuid)}
                  className="flex items-center justify-between bg-gray-900 p-3 rounded cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  <code className="font-mono">{uuid}</code>
                  <span className="text-sm text-gray-400">
                    {copied === uuid ? 'Copied!' : 'Click to copy'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
