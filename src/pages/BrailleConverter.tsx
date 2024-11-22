import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowDownUp } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

export default function BrailleConverter() {
  const [input, setInput] = useState("");
  const [braille, setBraille] = useState("");
  const [isBrailleToText, setIsBrailleToText] = useState(true); // Nuovo stato per gestire la modalità di conversione

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
    " ": " "
  };

  const brailleToText = (brailleText: string) => {
    const reverseBrailleAlphabet = Object.entries(brailleAlphabet).reduce(
      (acc, [key, value]) => {
        acc[value] = key;
        return acc;
      },
      {} as { [key: string]: string }
    );

    return brailleText
      .split("")
      .map((char) => reverseBrailleAlphabet[char] || "")
      .join("");
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
    if (isBrailleToText) {
      setBraille(convertToBraille(text));
    } else {
      setBraille(brailleToText(text));
    }
  };

  const toggleConversionMode = () => {
    setIsBrailleToText(!isBrailleToText);
    setBraille(""); // Resetta il Braille ogni volta che si cambia modalità
    setInput(""); // Resetta l'input
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
          description={
            isBrailleToText
              ? "Convert text to Braille"
              : "Convert Braille to text"
          }
          gradient="from-purple-400 to-pink-500"
        />

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {isBrailleToText ? "Text to Braille" : "Braille to Text"}
            </h2>
            <button
              onClick={toggleConversionMode}
              className="flex items-center gap-2 px-4 py-2 bg-teal-500 rounded hover:bg-teal-600 transition-colors"
            >
              <ArrowDownUp className="h-4 w-4" />
              Switch Mode
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {isBrailleToText ? "Input Text" : "Input Braille"}
              </label>
              <textarea
                value={input}
                onChange={handleInputChange}
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder={
                  isBrailleToText
                    ? "Enter text to convert to Braille..."
                    : "Enter Braille to convert to text..."
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {isBrailleToText ? "Braille Output" : "Text Output"}
              </label>

              <textarea
                value={braille}
                readOnly
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono cursor-pointer"
                placeholder="Output will appear here..."
              />
            </div>
          </div>
        </Card>

        <div className="my-6" />

        <Card>
          <div className="p-2 rounded">
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              Braille Alphabet Reference
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
              {Object.entries(brailleAlphabet)
                .filter(([char]) => char !== " ")
                .map(([char, code]) => (
                  <div
                    key={char}
                    className="flex justify-between bg-gray-900 p-2 rounded"
                  >
                    <span className="font-bold">{char}</span>
                    <span className="font-mono">{code}</span>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
