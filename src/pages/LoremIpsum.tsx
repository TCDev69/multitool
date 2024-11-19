import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
  'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui',
  'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

type GenerateType = 'words' | 'sentences' | 'paragraphs';

export default function LoremIpsum() {
  const [type, setType] = useState<GenerateType>('paragraphs');
  const [amount, setAmount] = useState(3);
  const [copied, setCopied] = useState(false);

  const generateWord = () => {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  };

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 10) + 5;
    const words = Array.from({ length }, generateWord);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = () => {
    const length = Math.floor(Math.random() * 3) + 3;
    return Array.from({ length }, generateSentence).join(' ');
  };

  const generateText = () => {
    switch (type) {
      case 'words':
        return Array.from({ length: amount }, generateWord).join(' ');
      case 'sentences':
        return Array.from({ length: amount }, generateSentence).join(' ');
      case 'paragraphs':
        return Array.from({ length: amount }, generateParagraph).join('\n\n');
      default:
        return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          title="Lorem Ipsum Generator"
          description="Generate placeholder text for your designs"
          gradient="from-indigo-400 to-blue-500"
        />

        <Card>
          <div className="space-y-6">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Generate
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as GenerateType)}
                  className="w-full bg-gray-900 rounded p-3 text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="words">Words</option>
                  <option value="sentences">Sentences</option>
                  <option value="paragraphs">Paragraphs</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-gray-900 rounded p-3 text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="relative">
              <textarea
                value={generateText()}
                readOnly
                className="w-full h-64 bg-gray-900 rounded p-3 text-white font-serif leading-relaxed focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1 bg-indigo-500 rounded hover:bg-indigo-600 transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}