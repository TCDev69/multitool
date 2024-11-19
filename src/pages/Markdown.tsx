import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState<string>('');

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
          title="Markdown Editor"
          description="Write and preview your Markdown content"
          gradient="from-pink-400 to-blue-500"
        />

        <Card>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Markdown Input</label>
              <textarea
                value={markdownText}
                onChange={(e) => setMarkdownText(e.target.value)}
                className="w-full h-48 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-pink-500 focus:outline-none"
                placeholder="Write your Markdown here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Preview</label>
              <div className="w-full h-auto bg-gray-900 rounded p-3 text-white">
                <ReactMarkdown
                  children={markdownText}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl font-semibold text-white" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-white" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-white" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-lg font-semibold text-white" {...props} />,
                    h5: ({node, ...props}) => <h5 className="text-base font-semibold text-white" {...props} />,
                    h6: ({node, ...props}) => <h6 className="text-sm font-semibold text-white" {...props} />,
                    p: ({node, ...props}) => <p className="text-white mb-4" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 text-white mb-4" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 text-white mb-4" {...props} />,
                    li: ({node, ...props}) => <li className="text-white" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                    a: ({node, ...props}) => <a className="text-pink-400 hover:text-pink-300" {...props} />,
                  }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
