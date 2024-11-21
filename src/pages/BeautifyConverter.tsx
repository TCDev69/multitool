import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { js as beautifyJs } from "js-beautify";
import { Tab } from "@headlessui/react";

const tabs = ["HTML", "CSS", "JavaScript", "JSON", "XML"];

const beautifyHtml = (html: string) => {
  return html
    .replace(/>\s+</g, ">\n<")
    .replace(/<([^/][^>]+)>/g, "\n<$1>\n")
    .trim();
};

const beautifyCss = (css: string) => {
  return css
    .replace(/;\s*/g, ";\n")
    .replace(/}\s*/g, "}\n")
    .replace(/\s*{\s*/g, " { ")
    .trim();
};

const beautifyJsCode = (js: string) => {
  return beautifyJs(js, { indent_size: 2, space_in_empty_paren: true });
};

const beautifyXml = (xml: string) => {
  return xml
    .replace(/>\s*</g, ">\n<")
    .replace(/<([^/][^>]+)>/g, "\n<$1>\n")
    .trim();
};

const beautifyJson = (json: string) => {
  try {
    const parsedJson = JSON.parse(json);
    return JSON.stringify(parsedJson, null, 2); // Indentazione di 2 spazi
  } catch (error) {
    return "Invalid JSON input";
  }
};

export default function Beautifier() {
  const [inputHtml, setInputHtml] = useState("");
  const [inputCss, setInputCss] = useState("");
  const [inputJs, setInputJs] = useState("");
  const [inputXml, setInputXml] = useState("");
  const [inputJson, setInputJson] = useState("");
  const [beautifiedHtml, setBeautifiedHtml] = useState("");
  const [beautifiedCss, setBeautifiedCss] = useState("");
  const [beautifiedJs, setBeautifiedJs] = useState("");
  const [beautifiedXml, setBeautifiedXml] = useState("");
  const [beautifiedJson, setBeautifiedJson] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleHtmlBeautification = () => {
    setBeautifiedHtml(beautifyHtml(inputHtml));
  };

  const handleCssBeautification = () => {
    setBeautifiedCss(beautifyCss(inputCss));
  };

  const handleJsBeautification = () => {
    setBeautifiedJs(beautifyJsCode(inputJs));
  };

  const handleXmlBeautification = () => {
    setBeautifiedXml(beautifyXml(inputXml));
  };

  const handleJsonBeautification = () => {
    setBeautifiedJson(beautifyJson(inputJson));
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
          title="Beautifier"
          description="Beautify your HTML, CSS, JavaScript, JSON, or XML code"
          gradient="from-teal-400 to-green-500"
        />

        <div className="space-y-8">
          {/* Tabs */}
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex space-x-4 mb-6">
              {tabs.map((tab, index) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selected
                        ? "bg-gradient-to-r from-teal-400 to-green-500 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels className="mt-6">
              {/* HTML Section */}
              <Tab.Panel>
                <Card>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Input HTML
                    </label>
                    <textarea
                      value={inputHtml}
                      onChange={(e) => setInputHtml(e.target.value)}
                      className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="Enter your HTML code here..."
                    />
                    <button
                      onClick={handleHtmlBeautification}
                      className="bg-gradient-to-r from-teal-400 to-green-500 px-4 py-2 rounded text-white font-medium hover:opacity-90 transition"
                    >
                      Beautify HTML
                    </button>

                    <div className="flex items-center justify-between mt-4">
                      <label className="block text-sm font-medium text-gray-300 -mb-2">
                        Output HTML
                      </label>
                      {copiedText === beautifiedHtml && (
                        <span className="text-sm text-green-500">Copied!</span>
                      )}
                    </div>

                    <pre
                      className="w-full bg-gray-900 rounded p-3 text-white font-mono overflow-x-auto cursor-pointer"
                      onClick={() => handleCopy(beautifiedHtml)}
                    >
                      {beautifiedHtml || (
                        <span className="text-gray-400">
                          Your beautified HTML will appear here...
                        </span>
                      )}
                    </pre>
                  </div>
                </Card>
              </Tab.Panel>

              {/* CSS Section */}
              <Tab.Panel>
                <Card>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Input CSS
                    </label>
                    <textarea
                      value={inputCss}
                      onChange={(e) => setInputCss(e.target.value)}
                      className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="Enter your CSS code here..."
                    />
                    <button
                      onClick={handleCssBeautification}
                      className="bg-gradient-to-r from-teal-400 to-green-500 px-4 py-2 rounded text-white font-medium hover:opacity-90 transition"
                    >
                      Beautify CSS
                    </button>

                    <div className="flex items-center justify-between mt-4">
                      <label className="block text-sm font-medium text-gray-300 -mb-2">
                        Output CSS
                      </label>
                      {copiedText === beautifiedCss && (
                        <span className="text-sm text-green-500">Copied!</span>
                      )}
                    </div>

                    <pre
                      className="w-full bg-gray-900 rounded p-3 text-white font-mono overflow-x-auto cursor-pointer"
                      onClick={() => handleCopy(beautifiedCss)}
                    >
                      {beautifiedCss || (
                        <span className="text-gray-400">
                          Your beautified CSS will appear here...
                        </span>
                      )}
                    </pre>
                  </div>
                </Card>
              </Tab.Panel>

              {/* JavaScript Section */}
              <Tab.Panel>
                <Card>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Input JavaScript
                    </label>
                    <textarea
                      value={inputJs}
                      onChange={(e) => setInputJs(e.target.value)}
                      className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="Enter your JavaScript code here..."
                    />
                    <button
                      onClick={handleJsBeautification}
                      className="bg-gradient-to-r from-teal-400 to-green-500 px-4 py-2 rounded text-white font-medium hover:opacity-90 transition"
                    >
                      Beautify JavaScript
                    </button>

                    <div className="flex items-center justify-between mt-4">
                      <label className="block text-sm font-medium text-gray-300 -mb-2">
                        Output JavaScript
                      </label>
                      {copiedText === beautifiedJs && (
                        <span className="text-sm text-green-500">Copied!</span>
                      )}
                    </div>

                    <pre
                      className="w-full bg-gray-900 rounded p-3 text-white font-mono overflow-x-auto cursor-pointer"
                      onClick={() => handleCopy(beautifiedJs)}
                    >
                      {beautifiedJs || (
                        <span className="text-gray-400">
                          Your beautified JavaScript will appear here...
                        </span>
                      )}
                    </pre>
                  </div>
                </Card>
              </Tab.Panel>

              {/* Json Section */}
              <Tab.Panel>
                <Card>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Input JSON
                    </label>
                    <textarea
                      value={inputJson}
                      onChange={(e) => setInputJson(e.target.value)}
                      className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="Enter your JSON code here..."
                    />
                    <button
                      onClick={handleJsonBeautification}
                      className="bg-gradient-to-r from-teal-400 to-green-500 px-4 py-2 rounded text-white font-medium hover:opacity-90 transition"
                    >
                      Beautify JSON
                    </button>

                    <div className="flex items-center justify-between mt-4">
                      <label className="block text-sm font-medium text-gray-300 -mb-2">
                        Output JSON
                      </label>
                      {copiedText === beautifiedJson && (
                        <span className="text-sm text-green-500">Copied!</span>
                      )}
                    </div>

                    <pre
                      className="w-full bg-gray-900 rounded p-3 text-white font-mono overflow-x-auto cursor-pointer"
                      onClick={() => handleCopy(beautifiedJson)}
                    >
                      {beautifiedJson || (
                        <span className="text-gray-400">
                          Your beautified JSON will appear here...
                        </span>
                      )}
                    </pre>
                  </div>
                </Card>
              </Tab.Panel>

              {/* XML Section */}
              <Tab.Panel>
                <Card>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Input XML
                    </label>
                    <textarea
                      value={inputXml}
                      onChange={(e) => setInputXml(e.target.value)}
                      className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="Enter your XML code here..."
                    />
                    <button
                      onClick={handleXmlBeautification}
                      className="bg-gradient-to-r from-teal-400 to-green-500 px-4 py-2 rounded text-white font-medium hover:opacity-90 transition"
                    >
                      Beautify XML
                    </button>

                    <div className="flex items-center justify-between mt-4">
                      <label className="block text-sm font-medium text-gray-300 -mb-2">
                        Output XML
                      </label>
                      {copiedText === beautifiedXml && (
                        <span className="text-sm text-green-500">Copied!</span>
                      )}
                    </div>

                    <pre
                      className="w-full bg-gray-900 rounded p-3 text-white font-mono overflow-x-auto cursor-pointer"
                      onClick={() => handleCopy(beautifiedXml)}
                    >
                      {beautifiedXml || (
                        <span className="text-gray-400">
                          Your beautified XML will appear here...
                        </span>
                      )}
                    </pre>
                  </div>
                </Card>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
