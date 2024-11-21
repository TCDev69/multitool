import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';

export default function TextStatistics() {
  const [inputText, setInputText] = useState('');
  const [statistics, setStatistics] = useState({
    letters: 0,
    words: 0,
    paragraphs: 0,
    sentences: 0,
  });

  const countStatistics = (text: string) => {
    const letterCount = text.replace(/\s/g, '').length;
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const paragraphCount = text.split(/\n+/).filter(Boolean).length;
    const sentenceCount = text.split(/[.!?]\s/).filter(Boolean).length;

    setStatistics({
      letters: letterCount,
      words: wordCount,
      paragraphs: paragraphCount,
      sentences: sentenceCount,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    countStatistics(text);
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
          title="Text Statistics"
          description="Count letters, words, paragraphs, and sentences in your text"
          gradient="from-indigo-400 to-blue-500"
        />

        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter Text
              </label>
              <textarea
                value={inputText}
                onChange={handleTextChange}
                className="w-full h-96 bg-gray-900 rounded-lg p-4 text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                placeholder="Enter your text here..."
              />
            </div>

            {/* Grid for statistics */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <span className="text-sm text-gray-300">Letters</span>
                <h3 className="text-xl text-white">{statistics.letters}</h3>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <span className="text-sm text-gray-300">Words</span>
                <h3 className="text-xl text-white">{statistics.words}</h3>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <span className="text-sm text-gray-300">Paragraphs</span>
                <h3 className="text-xl text-white">{statistics.paragraphs}</h3>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <span className="text-sm text-gray-300">Sentences</span>
                <h3 className="text-xl text-white">{statistics.sentences}</h3>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
