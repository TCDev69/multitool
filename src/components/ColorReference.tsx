import React from 'react';
import { Wand2 } from 'lucide-react';
import { ColorPreview } from './ColorPreview';

const FORMATTING_CODES = {
  '&0': 'Black',
  '&1': 'Dark Blue',
  '&2': 'Dark Green',
  '&3': 'Dark Aqua',
  '&4': 'Dark Red',
  '&5': 'Dark Purple',
  '&6': 'Gold',
  '&7': 'Gray',
  '&8': 'Dark Gray',
  '&9': 'Blue',
  '&a': 'Green',
  '&b': 'Aqua',
  '&c': 'Red',
  '&d': 'Light Purple',
  '&e': 'Yellow',
  '&f': 'White',
  '&k': 'Magic',
  '&l': 'Bold',
  '&m': 'Strikethrough',
  '&n': 'Underline',
  '&o': 'Italic',
  '&r': 'Reset',
};

const SECTION_SYMBOL_CODES = {
  '§0': '&0',
  '§1': '&1',
  '§2': '&2',
  '§3': '&3',
  '§4': '&4',
  '§5': '&5',
  '§6': '&6',
  '§7': '&7',
  '§8': '&8',
  '§9': '&9',
  '§a': '&a',
  '§b': '&b',
  '§c': '&c',
  '§d': '&d',
  '§e': '&e',
  '§f': '&f',
  '§k': '&k',
  '§l': '&l',
  '§m': '&m',
  '§n': '&n',
  '§o': '&o',
  '§r': '&r',
};

export function ColorReference() {
  return (
    <div className="mt-8 bg-gray-800/50 backdrop-blur rounded-lg p-6 shadow-xl">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Wand2 className="text-blue-400" />
        Quick Reference
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(FORMATTING_CODES).map(([code, name]) => {
          const sectionCode =
            Object.entries(SECTION_SYMBOL_CODES).find(
              ([_, ampCode]) => ampCode === code
            )?.[0] || '';
          return (
            <div
              key={code}
              className="bg-gray-900/80 p-2 rounded-lg flex items-center overflow-hidden hover:bg-gray-900 transition-colors"
            >
              <div className="flex-grow">
                <ColorPreview text={`${sectionCode}${name}`} />
              </div>
              <div className="flex flex-col items-end ml-4">
                <code className="text-gray-400 text-sm bg-black/20 px-2 py-1 rounded">
                  {code}
                </code>
                <code className="text-gray-500 text-xs bg-black/20 px-2 py-1 rounded">
                  {sectionCode}
                </code>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
