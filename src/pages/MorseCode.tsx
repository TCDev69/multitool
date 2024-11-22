import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowDownUp } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

const MORSE_CODE: { [key: string]: string } = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  " ": "/",
};

const REVERSE_MORSE: { [key: string]: string } = Object.entries(
  MORSE_CODE
).reduce((acc, [char, morse]) => ({ ...acc, [morse]: char }), {});

export default function MorseCode() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const convertToMorse = (text: string): string => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => MORSE_CODE[char] || char)
      .join(" ");
  };

  const convertFromMorse = (morse: string): string => {
    return morse
      .split(" ")
      .map((code) => REVERSE_MORSE[code] || code)
      .join("");
  };

  const handleConvert = () => {
    if (mode === "encode") {
      return convertToMorse(input);
    } else {
      return convertFromMorse(input);
    }
  };

  const toggleMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput("");
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
          title="Morse Code Translator"
          description="Convert text to and from Morse code"
          gradient="from-teal-400 to-green-500"
        />

        <Card>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {mode === "encode" ? "Text to Morse" : "Morse to Text"}
              </h2>
              <button
                onClick={toggleMode}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 rounded hover:bg-teal-600 transition-colors"
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
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder={
                  mode === "encode"
                    ? "Enter text to convert to Morse code..."
                    : "Enter Morse code to convert to text..."
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Output
              </label>
              <textarea
                value={handleConvert()}
                readOnly
                className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono"
              />
            </div>

            
          </div>
        </Card>
        <div className="my-6" />
        <Card>
        <div className="p-2 rounded">
              <h3 className="text-sm font-medium text-gray-300 mb-2">
                Morse Code Reference
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                {Object.entries(MORSE_CODE)
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
