import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowDownUp, Upload } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);

  const convert = () => {
    try {
      if (mode === "encode") {
        return btoa(input);
      } else {
        return atob(input);
      }
    } catch (e) {
      return "Invalid input";
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  const toggleMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFileBase64(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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
          title="Base64 Converter"
          description="Encode and decode Base64 strings easily"
          gradient="from-purple-400 to-pink-500"
        />

        <Card>
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {mode === "encode" ? "Text to Base64" : "Base64 to Text"}
              </h2>
              <button
                onClick={toggleMode}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 transition-colors"
              >
                <ArrowDownUp className="h-4 w-4" />
                Switch Mode
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder={
                  mode === "encode"
                    ? "Enter text to encode..."
                    : "Enter base64 to decode..."
                }
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Output
                </label>
                {copiedText === convert() && (
                  <span className="text-sm text-green-500">Copied!</span>
                )}
              </div>
              <div className="relative">
                <textarea
                  value={convert()}
                  readOnly
                  onClick={() => handleCopy(convert())}
                  className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono cursor-pointer"
                  placeholder="Output will appear here..."
                />
              </div>
            </div>
          </div>
        </Card>

        {/* File Upload for Base64 Conversion */}
        <div className="my-6" /> {/* Space between cards */}
        <Card>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">File to Base64</h2>
              <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 cursor-pointer">
                <Upload className="h-4 w-4" />
                Upload File
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {fileBase64 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Base64 Output
                  </label>
                  {copiedText === fileBase64 && (
                    <span className="text-sm text-green-500">Copied!</span>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    value={fileBase64}
                    readOnly
                    onClick={() => handleCopy(fileBase64)}
                    className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono cursor-pointer"
                    placeholder="Base64 output of the file will appear here..."
                  />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
