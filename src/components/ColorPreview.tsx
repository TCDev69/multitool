import React, { useEffect, useRef } from 'react';

interface ColorPreviewProps {
  text: string;
}
 
const MINECRAFT_COLORS: Record<string, string> = {
  '0': '#000000',
  '1': '#0000AA',
  '2': '#00AA00',
  '3': '#00AAAA',
  '4': '#AA0000',
  '5': '#AA00AA',
  '6': '#FFAA00',
  '7': '#AAAAAA',
  '8': '#555555',
  '9': '#5555FF',
  a: '#55FF55',
  b: '#55FFFF',
  c: '#FF5555',
  d: '#FF55FF',
  e: '#FFFF55',
  f: '#FFFFFF',
};

const OBFUSCATED_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function ColorPreview({ text }: ColorPreviewProps) {
  const obfuscatedElements = useRef<NodeListOf<Element> | null>(null);
  const intervalRef = useRef<number>();

  useEffect(() => {
    // Get all obfuscated elements after render
    obfuscatedElements.current = document.querySelectorAll(
      '.minecraft-obfuscated'
    );

    // Clear previous interval if it exists
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    // Set up new interval for obfuscated text
    if (obfuscatedElements.current.length > 0) {
      intervalRef.current = window.setInterval(() => {
        obfuscatedElements.current?.forEach((element) => {
          const length = element.textContent?.length || 1;
          let newText = '';
          for (let i = 0; i < length; i++) {
            newText +=
              OBFUSCATED_CHARS[
                Math.floor(Math.random() * OBFUSCATED_CHARS.length)
              ];
          }
          element.textContent = newText;
        });
      }, 50);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [text]);

  const convertToPreview = (input: string): string => {
    const lines = input.split('\n');
    const processedLines = lines.map((line) => {
      let result = line
        .replace(
          /&?#([0-9a-fA-F]{6})/gi,
          (_, color) => `<span style="color: #${color}">`
        )
        .replace(/[§&]([0-9a-fA-F])/gi, (_, color) => {
          const colorCode = MINECRAFT_COLORS[color.toLowerCase()];
          return `<span style="color: ${colorCode};">`;
        })
        .replace(/[§&]r/gi, '</span>')
        .replace(/[§&]l/gi, '<span style="font-weight: bolder">')
        .replace(/[§&]n/gi, '<span style="text-decoration: underline">')
        .replace(/[§&]m/gi, '<span style="text-decoration: line-through">')
        .replace(/[§&]o/gi, '<span style="font-style: italic">')
        .replace(/[§&]k/gi, '<span class="minecraft-obfuscated">');

      const openSpans = (result.match(/<span/g) || []).length;
      const closeSpans = (result.match(/<\/span>/g) || []).length;
      result += '</span>'.repeat(Math.max(0, openSpans - closeSpans));

      return result;
    });

    return processedLines.join('<br>');
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 min-h-[80px] relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
      <div
        className="font-minecraft relative whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={{ __html: convertToPreview(text) }}
      />
    </div>
  );
}
