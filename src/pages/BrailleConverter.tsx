import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

export default function BrailleConverter() {
  const [input, setInput] = useState("");
  const [braille, setBraille] = useState("");

  const brailleAlphabet: { [key: string]: string } = {
    a: "⠁",
    b: "⠃",
    c: "⠉",
    d: "⠙",
    e: "⠑",
    f: "⠋",
    g: "⠛",
    h: "⠓",
    i: "⠊",
    j: "⠚",
    k: "⠅",
    l: "⠇",
    m: "⠍",
    n: "⠝",
    o: "⠕",
    p: "⠏",
    q: "⠟",
    r: "⠗",
    s: "⠎",
    t: "⠞",
    u: "⠥",
    v: "⠧",
    w: "⠺",
    x: "⠭",
    y: "⠽",
    z: "⠵",
    " ": " ",
  };

  const convertToBraille = (text: string) => {
    return text
      .toLowerCase()
      .split("")
      .map((char) => brailleAlphabet[char] || "")
      .join("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInput(text);
    setBraille(convertToBraille(text));
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
          title="Braille Converter"
          description="Convert text to Braille"
          gradient="from-purple-400 to-pink-500"
        />

        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input Text
              </label>
              <textarea
                value={input}
                onChange={handleInputChange}
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter text to convert to Braille..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Braille Output
              </label>
              <pre className="w-full bg-gray-900 rounded p-3 text-white font-mono">
                {braille || "Your Braille will appear here..."}
              </pre>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
