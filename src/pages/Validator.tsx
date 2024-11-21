import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { load as yamlLoad } from "js-yaml";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

export default function Validator() {
  const [yamlInput, setYamlInput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [yamlError, setYamlError] = useState<string | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [yamlOutput, setYamlOutput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");

  const handleYamlChange = useCallback((value: string) => {
    setYamlInput(value);
    try {
      if (!value.trim()) {
        setYamlOutput("");
        setYamlError(null);
        return;
      }
      yamlLoad(value);
      setYamlOutput("✔️ The YAML is valid!");
      setYamlError(null);
    } catch (e) {
      const message = formatYamlError(e as Error);
      setYamlError(message);
      setYamlOutput("");
    }
  }, []);

  const handleJsonChange = useCallback((value: string) => {
    setJsonInput(value);
    try {
      if (!value.trim()) {
        setJsonOutput("");
        setJsonError(null);
        return;
      }
      JSON.parse(value);
      setJsonOutput("✔️ The JSON is valid!");
      setJsonError(null);
    } catch (e) {
      setJsonError(`❌ Error: ${e.message}`);
      setJsonOutput("");
    }
  }, []);

  const formatYamlError = (error: Error): string => {
    const match = /at line (\d+), column (\d+)/.exec(error.message);
    if (match) {
      const lineNumber = parseInt(match[1], 10);
      const columnNumber = parseInt(match[2], 10);
      return `❌ Error: ${error.message}\n\nLine: ${lineNumber}, Column: ${columnNumber}`;
    }
    return `❌ Error: ${error.message}`;
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
          title="Validator"
          description="Validate your YAML and JSON structure and detect issues."
          gradient="from-purple-400 to-pink-500"
        />

        <div className="space-y-8">
          {/* YAML Validator */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">YAML Validator</h2>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input YAML
              </label>
              <div className="relative flex">
                <div className="bg-gray-800 text-gray-500 font-mono text-sm py-3 px-2 text-right select-none">
                  {Array.from(
                    { length: yamlInput.split("\n").length || 1 },
                    (_, i) => (
                      <div key={i}>{i + 1}</div>
                    )
                  )}
                </div>
                <textarea
                  value={yamlInput}
                  onChange={(e) => handleYamlChange(e.target.value)}
                  className="w-full h-[200px] bg-gray-900 rounded-l-none rounded p-3 text-white font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                  placeholder="Paste your YAML here..."
                  spellCheck={false}
                  style={{
                    whiteSpace: "pre",
                    lineHeight: "1.5",
                  }}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Validation Result
              </label>
              <div className="bg-gray-900 rounded p-4 text-white font-mono">
                {yamlError ? (
                  <pre className="text-red-400 text-sm whitespace-pre-wrap">
                    {yamlError}
                  </pre>
                ) : (
                  <pre className="text-green-400 text-sm whitespace-pre-wrap">
                    {yamlOutput}
                  </pre>
                )}
              </div>
            </div>
          </Card>

          {/* JSON Validator */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">JSON Validator</h2>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input JSON
              </label>
              <div className="relative flex">
                <div className="bg-gray-800 text-gray-500 font-mono text-sm py-3 px-2 text-right select-none">
                  {Array.from(
                    { length: jsonInput.split("\n").length || 1 },
                    (_, i) => (
                      <div key={i}>{i + 1}</div>
                    )
                  )}
                </div>
                <textarea
                  value={jsonInput}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  className="w-full h-[200px] bg-gray-900 rounded-l-none rounded p-3 text-white font-mono focus:ring-2 focus:ring-pink-500 focus:outline-none resize-none"
                  placeholder="Paste your JSON here..."
                  spellCheck={false}
                  style={{
                    whiteSpace: "pre",
                    lineHeight: "1.5",
                  }}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Validation Result
              </label>
              <div className="bg-gray-900 rounded p-4 text-white font-mono">
                {jsonError ? (
                  <pre className="text-red-400 text-sm whitespace-pre-wrap">
                    {jsonError}
                  </pre>
                ) : (
                  <pre className="text-green-400 text-sm whitespace-pre-wrap">
                    {jsonOutput}
                  </pre>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
