import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';

const smallCapsMap: { [key: string]: string } = {
  'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ',
  'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ',
  'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ',
  's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
  'y': 'ʏ', 'z': 'ᴢ'
};

export default function TextTools() {
  const [input, setInput] = useState('');
  const [selectedTool, setSelectedTool] = useState('smallcaps');

  const transformText = () => {
    switch (selectedTool) {
      case 'smallcaps':
        return input.toLowerCase().split('').map(char => 
          smallCapsMap[char] || char).join('');
      case 'reverse':
        return input.split('').reverse().join('');
      case 'uppercase':
        return input.toUpperCase();
      case 'lowercase':
        return input.toLowerCase();
      default:
        return input;
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
          title="Text Tools"
          description="Various text transformation tools"
          gradient="from-teal-400 to-cyan-500"
        />

        <Card>
          <div className="flex gap-2 mb-4 flex-wrap">
            {[
              { id: 'smallcaps', name: 'Small Caps' },
              { id: 'reverse', name: 'Reverse' },
              { id: 'uppercase', name: 'UPPERCASE' },
              { id: 'lowercase', name: 'lowercase' }
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`px-4 py-2 rounded ${
                  selectedTool === tool.id
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {tool.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input Text
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="Enter text to transform..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Transformed Text
              </label>
              <textarea
                value={transformText()}
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