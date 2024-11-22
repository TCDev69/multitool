import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowDownUp } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import * as Papa from "papaparse";

export default function CsvJsonConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"csvToJson" | "jsonToCsv">("csvToJson");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      if (mode === "csvToJson") {
        const parsed = Papa.parse(input, { header: true });
        if (parsed.errors.length > 0) {
          setError("Error parsing CSV");
        } else {
          setError(null);
          setOutput(JSON.stringify(parsed.data, null, 2));
        }
      } else {
        const jsonObj = JSON.parse(input);
        const csv = Papa.unparse(jsonObj);
        setError(null);
        setOutput(csv);
      }
    } catch (e) {
      setError("Invalid input");
      setOutput("");
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "csvToJson" ? "jsonToCsv" : "csvToJson"));
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
          title="CSV to JSON / JSON to CSV Converter"
          description="Convert CSV to JSON and JSON to CSV easily"
          gradient="from-pink-400 to-purple-500"
        />

        <Card>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {mode === "csvToJson" ? "CSV to JSON" : "JSON to CSV"}
              </h2>
              <button
                onClick={toggleMode}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 transition-colors"
              >
                <ArrowDownUp className="h-4 w-4" />
                Switch Mode
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder={
                  mode === "csvToJson"
                    ? "Paste CSV data here..."
                    : "Paste JSON data here..."
                }
              />
            </div>

            <div>
              <button
                onClick={handleConvert}
                className="w-full bg-purple-500 text-white px-4 py-3 rounded hover:bg-purple-600 transition-colors"
              >
                Convert
              </button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Output
              </label>
              <div onClick={handleCopy} className="relative">
                <textarea
                  value={output}
                  readOnly
                  className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono cursor-pointer"
                  placeholder="Converted data will appear here..."
                />
                {copied && (
                  <span className="absolute top-2 right-2 text-pink-500 text-sm">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
