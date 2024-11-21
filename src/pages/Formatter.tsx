import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { js as beautifyJs } from "js-beautify";

export default function Formatter() {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [jsonError, setJsonError] = useState("");

  const [htmlInput, setHtmlInput] = useState("");
  const [formattedHtml, setFormattedHtml] = useState("");

  const [cssInput, setCssInput] = useState("");
  const [formattedCss, setFormattedCss] = useState("");

  const [jsInput, setJsInput] = useState("");
  const [formattedJs, setFormattedJs] = useState("");

  const formatJson = (json: string) => {
    try {
      if (!json) return "";
      const parsed = JSON.parse(json);
      return JSON.stringify(parsed, null, 2);
    } catch {
      setJsonError("Invalid JSON format");
      return "";
    }
  };

  const formatHtml = (html: string) => {
    return beautifyJs(html, { indent_size: 2, content_unformatted: ["pre"] });
  };

  const formatCss = (css: string) => {
    return beautifyJs.css(css, { indent_size: 2 });
  };

  const formatJs = (js: string) => {
    return beautifyJs(js, { indent_size: 2, space_in_empty_paren: true });
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setJsonInput(input);
    setJsonError("");
    setFormattedJson(formatJson(input));
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setHtmlInput(input);
    setFormattedHtml(formatHtml(input));
  };

  const handleCssChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setCssInput(input);
    setFormattedCss(formatCss(input));
  };

  const handleJsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setJsInput(input);
    setFormattedJs(formatJs(input));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tools
        </Link>

        <PageHeader
          title="Formatter"
          description="Format and beautify your JSON, HTML, CSS, and JavaScript code"
          gradient="from-blue-400 to-indigo-500"
        />

        <div className="space-y-8">

          {/* HTML Formatter */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">HTML Formatter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Input HTML
                </label>
                <textarea
                  value={htmlInput}
                  onChange={handleHtmlChange}
                  className="w-full h-[300px] bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Paste your HTML here..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Formatted HTML
                </label>
                <textarea
                  value={formattedHtml}
                  readOnly
                  className="w-full h-[300px] bg-gray-900 rounded p-3 text-white font-mono"
                />
              </div>
            </div>
          </Card>

          {/* CSS Formatter */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">CSS Formatter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Input CSS
                </label>
                <textarea
                  value={cssInput}
                  onChange={handleCssChange}
                  className="w-full h-[300px] bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Paste your CSS here..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Formatted CSS
                </label>
                <textarea
                  value={formattedCss}
                  readOnly
                  className="w-full h-[300px] bg-gray-900 rounded p-3 text-white font-mono"
                />
              </div>
            </div>
          </Card>

          {/* JavaScript Formatter */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">JavaScript Formatter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Input JavaScript
                </label>
                <textarea
                  value={jsInput}
                  onChange={handleJsChange}
                  className="w-full h-[300px] bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Paste your JavaScript here..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Formatted JavaScript
                </label>
                <textarea
                  value={formattedJs}
                  readOnly
                  className="w-full h-[300px] bg-gray-900 rounded p-3 text-white font-mono"
                />
              </div>
            </div>
          </Card>
          {/* JSON Formatter */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">JSON Formatter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Input JSON
                </label>
                <textarea
                  value={jsonInput}
                  onChange={handleJsonChange}
                  className="w-full h-[300px] bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Paste your JSON here..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Formatted JSON
                </label>
                <textarea
                  value={formattedJson}
                  readOnly
                  className={`w-full h-[300px] bg-gray-900 rounded p-3 font-mono ${
                    jsonError ? "text-red-400" : "text-white"
                  }`}
                />
                {jsonError && <p className="mt-2 text-red-400 text-sm">{jsonError}</p>}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
