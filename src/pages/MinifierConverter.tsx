import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';
import * as Terser from 'terser'; 

const minifyCss = (css: string) => {
  return css
    .replace(/\s+/g, ' ') 
    .replace(/\s*([{:;}])\s*/g, '$1') 
    .replace(/;}/g, '}') 
    .trim();
};

const minifyHtml = (html: string) => {
  return html
    .replace(/\s+/g, ' ') 
    .replace(/<!--.*?-->/g, '') 
    .replace(/\s*(<[^>]+>)\s*/g, '$1') 
    .trim();
};

const minifyJs = async (js: string) => {
    try {
      const result = await Terser.minify(js);
      if (result.error) {
        console.error(result.error); 
        return '';
      }
      console.log(result); 
      return result.code || '';
    } catch (error) {
      console.error("Errore nella minificazione JavaScript:", error);
      return '';
    }
  };

export default function Minifier() {
  const [inputHtml, setInputHtml] = useState('');
  const [inputCss, setInputCss] = useState('');
  const [inputJs, setInputJs] = useState('');
  const [minifiedHtml, setMinifiedHtml] = useState('');
  const [minifiedCss, setMinifiedCss] = useState('');
  const [minifiedJs, setMinifiedJs] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleHtmlMinification = () => {
    setMinifiedHtml(minifyHtml(inputHtml));
  };

  const handleCssMinification = () => {
    setMinifiedCss(minifyCss(inputCss));
  };

  const handleJsMinification = async () => {
    if (!inputJs.trim()) {
      alert("Inserisci del codice JavaScript per minificarlo!");
      return;
    }
    console.log("Minificazione JavaScript in corso...");
    const minified = await minifyJs(inputJs); 
    setMinifiedJs(minified);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
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
          title="Minifier"
          description="Minify your HTML, CSS, or JavaScript code"
          gradient="from-teal-400 to-green-500"
        />

        <div className="space-y-8">
          <Card>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Input HTML
                </label>
                <textarea
                  value={inputHtml}
                  onChange={(e) => setInputHtml(e.target.value)}
                  className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  placeholder="Enter your HTML code here..."
                />
              </div>

              <button
                onClick={handleHtmlMinification}
                className="bg-gradient-to-r from-teal-400 to-green-500 px-4 py-2 rounded text-white font-medium hover:opacity-90 transition"
              >
                Minify HTML
              </button>

              <div className="flex items-center justify-between mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Output HTML
                </label>
                {copiedText === minifiedHtml && (
                  <span className="text-sm text-green-500">Copied!</span>
                )}
              </div>

              <pre
                className="w-full bg-gray-900 rounded p-3 text-white font-mono overflow-x-auto cursor-pointer"
                onClick={() => handleCopy(minifiedHtml)}
              >
                {minifiedHtml || <span className="text-gray-400">Your minified HTML will appear here...</span>}
              </pre>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Input CSS
                </label>
                <textarea
                  value={inputCss}
                  onChange={(e) => setInputCss(e.target.value)}
                  className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  placeholder="Enter your CSS code here..."
                />
              </div>

              <button
                onClick={handleCssMinification}
                className="bg-gradient-to-r from-teal-400 to-green-500 px-4 py-2 rounded text-white font-medium hover:opacity-90 transition"
              >
                Minify CSS
              </button>

              <div className="flex items-center justify-between mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Output CSS
                </label>
                {copiedText === minifiedCss && (
                  <span className="text-sm text-green-500">Copied!</span>
                )}
              </div>

              <pre
                className="w-full bg-gray-900 rounded p-3 text-white font-mono overflow-x-auto cursor-pointer"
                onClick={() => handleCopy(minifiedCss)}
              >
                {minifiedCss || <span className="text-gray-400">Your minified CSS will appear here...</span>}
              </pre>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Input JavaScript
                </label>
                <textarea
                  value={inputJs}
                  onChange={(e) => setInputJs(e.target.value)}
                  className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  placeholder="Enter your JavaScript code here..."
                />
              </div>

              <button
                onClick={handleJsMinification}
                className="bg-gradient-to-r from-teal-400 to-green-500 px-4 py-2 rounded text-white font-medium hover:opacity-90 transition"
              >
                Minify JavaScript
              </button>

              <div className="flex items-center justify-between mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Output JavaScript
                </label>
                {copiedText === minifiedJs && (
                  <span className="text-sm text-green-500">Copied!</span>
                )}
              </div>

              <pre
                className="w-full bg-gray-900 rounded p-3 text-white font-mono overflow-x-auto cursor-pointer"
                onClick={() => handleCopy(minifiedJs)}
              >
                {minifiedJs || <span className="text-gray-400">Your minified JavaScript will appear here...</span>}
              </pre>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
