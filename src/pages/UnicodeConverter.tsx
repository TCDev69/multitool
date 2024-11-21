import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowDownUp, Upload } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

export default function UnicodeConverter() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [isUnicodeToText, setIsUnicodeToText] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (isUnicodeToText) {
      convertTextToUnicode(e.target.value);
    } else {
      convertUnicodeToText(e.target.value);
    }
  };
  const convertUnicodeToText = (unicode: string) => {
    try {
      setOutputText(
        unicode.replace(/\\u[\dA-Fa-f]{4}/g, (match) =>
          String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16))
        )
      );
    } catch (e) {
      console.error("Error converting Unicode to Text:", e);
    }
  };

  const convertTextToUnicode = (text: string) => {
    try {
      setOutputText(
        text
          .split("")
          .map(
            (char) =>
              `\\u${("0000" + char.charCodeAt(0).toString(16)).slice(-4)}`
          )
          .join("")
      );
    } catch (e) {
      console.error("Error converting Text to Unicode:", e);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  const toggleConversionMode = () => {
    setIsUnicodeToText(!isUnicodeToText);
    if (!isUnicodeToText) {
      convertTextToUnicode(inputText);
    } else {
      convertUnicodeToText(inputText);
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
          title="Unicode Converter"
          description="Encode and decode Base64 strings easily"
          gradient="from-teal-400 to-blue-500"
        />

        <Card>
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isUnicodeToText ? "Text to Unicode" : "Unicode to Text"}
              </h2>
              <button
                onClick={toggleConversionMode}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 rounded hover:bg-teal-600 transition-colors"
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
                value={inputText}
                onChange={handleInputChange}
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder={
                  isUnicodeToText
                    ? "Enter Text" : "Enter Unicode (e.g., \\u0041)"
                }
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Output
                </label>
                {copiedText === outputText && (
                  <span className="text-sm text-green-500">Copied!</span>
                )}
              </div>
              <div className="relative">
                <textarea
                  value={outputText}
                  readOnly
                  onClick={() => handleCopy(outputText)}
                  className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono cursor-pointer"
                  placeholder="Output will appear here..."
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
