import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');

  const formatJson = (json: string) => {
    try {
      if (!json) return '';
      const parsed = JSON.parse(json);
      return JSON.stringify(parsed, null, 2); 
    } catch (e) {
      setError('Invalid JSON format');
      return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
    setError('');
    setFormattedJson(formatJson(newInput)); 
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
          title="JSON Formatter"
          description="Format and validate JSON data"
          gradient="from-blue-400 to-indigo-500"
        />

        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input JSON
              </label>
              <textarea
                value={input}
                onChange={handleChange} 
                className="w-full h-[500px] bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Paste your JSON here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Formatted Output
              </label>
              <textarea
                value={formattedJson}
                readOnly
                className={`w-full h-[500px] bg-gray-900 rounded p-3 font-mono ${
                  error ? 'text-red-400' : 'text-white'
                }`}
              />
              {error && (
                <p className="mt-2 text-red-400 text-sm">{error}</p> 
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
