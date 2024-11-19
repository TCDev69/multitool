import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { load as yamlLoad } from "js-yaml";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

export default function YamlValidator() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState("");

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    try {
      if (!value.trim()) {
        setOutput("");
        setError(null);
        return;
      }

      yamlLoad(value);
      setOutput("✔️ The YAML is valid!");
      setError(null);
    } catch (e) {
      const message = formatYamlError(e as Error);
      setError(message);
      setOutput("");
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
          title="YAML Validator"
          description="Validate your YAML structure and detect issues."
          gradient="from-emerald-400 to-green-500"
        />

        <Card>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Input YAML
            </label>
            <div className="relative flex">
              <div className="bg-gray-800 text-gray-500 font-mono text-sm py-3 px-2 text-right select-none">
                {Array.from(
                  { length: input.split("\n").length || 1 },
                  (_, i) => (
                    <div key={i}>{i + 1}</div>
                  )
                )}
              </div>
              <textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full h-[400px] bg-gray-900 rounded-l-none rounded p-3 text-white font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
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
              {error ? (
                <pre className="text-red-400 text-sm whitespace-pre-wrap">
                  {error}
                </pre>
              ) : (
                <pre className="text-green-400 text-sm whitespace-pre-wrap">
                  {output}
                </pre>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
