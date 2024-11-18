import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ColorPreview } from '../components/ColorPreview';
import { ColorReference } from '../components/ColorReference';
import { CopyButton } from '../components/CopyButton';
import { ColorInput } from '../components/ColorInput';

export default function MinecraftFormatter() {
  const [text, setText] = useState('');
 
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

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
            Minecraft Color Formatter
          </h1>
          <p className="text-gray-400">
            Format your text with Minecraft color codes (§) and hex colors
            (#rrggbb or &#rrggbb)
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 shadow-xl border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Color Formatter</h2>
            <CopyButton text={text} />
          </div>

          <ColorInput text={text} setText={setText} />

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">
              Preview:
            </h3>
            <ColorPreview text={text} />
          </div>
        </div>

        <ColorReference />
      </div>
    </div>
  );
}