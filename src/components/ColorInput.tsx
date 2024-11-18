import React from 'react';
import { Info } from 'lucide-react';

interface ColorInputProps {
  text: string;
  setText: (text: string) => void;
}

export function ColorInput({ text, setText }: ColorInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Info size={16} />
        <span>Note: Both & and § symbols are supported for color codes</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Type your text here..."
        spellCheck={false}
      />
      <div className="flex flex-wrap gap-2 text-sm">
        <code className="px-2 py-1 bg-gray-900 rounded">&c Red text</code>
        <code className="px-2 py-1 bg-gray-900 rounded">
          #ff0000 Custom red
        </code>
        <code className="px-2 py-1 bg-gray-900 rounded">
          &#ffff55 Custom yellow
        </code>
      </div>
    </div>
  );
}
