import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowDownUp } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

export default function BinaryToText() {
  const [binary, setBinary] = useState("");
  const [text, setText] = useState("");
  const [isBinaryToText, setIsBinaryToText] = useState(false);

  const convertBinaryToText = (binaryInput: string) => {
    try {
      const textOutput = binaryInput
        .split(" ")
        .map((bin) => String.fromCharCode(parseInt(bin, 2)))
        .join("");
      setText(textOutput);
    } catch {
      setText("Invalid binary input");
    }
  };

  const convertTextToBinary = (textInput: string) => {
    const binaryOutput = textInput
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
    setBinary(binaryOutput);
  };

  const handleConvert = () => {
    if (isBinaryToText) {
      convertBinaryToText(binary);
    } else {
      convertTextToBinary(text);
    }
  };

  const toggleMode = () => {
    setIsBinaryToText(!isBinaryToText);
    setBinary("");
    setText("");
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
          title="Binary-Text Converter"
          description="Convert binary code into readable text and vice versa"
          gradient="from-gray-400 to-cyan-500"
        />

        <div className="space-y-8">
          <Card>
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {isBinaryToText ? "Binary to Text" : "Text to Binary"}
                </h2>
                <button
                  onClick={toggleMode}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-600 transition-colors"
                >
                  <ArrowDownUp className="h-4 w-4" />
                  Switch Mode
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <textarea
                value={isBinaryToText ? binary : text}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (isBinaryToText) {
                    setBinary(inputValue);
                    convertBinaryToText(inputValue);
                  } else {
                    setText(inputValue);
                    convertTextToBinary(inputValue);
                  }
                }}
                placeholder={
                  isBinaryToText
                    ? "Enter binary (e.g., 01001000 01100101 01101100 01101100 01101111)"
                    : "Enter text"
                }
                className="w-full h-32 p-3 bg-gray-900 text-white rounded resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <textarea
                value={isBinaryToText ? text : binary}
                readOnly
                placeholder={
                  isBinaryToText
                    ? "Converted text will appear here"
                    : "Converted binary will appear here"
                }
                className="w-full h-32 p-3 bg-gray-900 text-white rounded resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
              ></textarea>

              <div className="flex justify-center">
                <button
                  onClick={toggleMode}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-600 transition-colors"
                >
                  <ArrowDownUp className="h-4 w-4" />
                  Switch Mode
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
