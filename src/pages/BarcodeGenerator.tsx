import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Sun, Moon } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import JsBarcode from "jsbarcode";

export default function BarCodeGenerator() {
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (input.trim() !== "" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        JsBarcode(canvas, input, {
          format: "CODE128",
          lineColor: darkMode ? "#000000" : "#ffffff",
          background: darkMode ? "#ffffff" : "#333333",
          width: 2,
          height: 100,
          displayValue: true,
        });
      }
    }
  }, [input, darkMode]);

  const downloadBarcode = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const url = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = url;
      link.download = "barcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
          title="Bar Code Generator"
          description="Generate barcodes easily from your text"
          gradient="from-green-400 to-teal-500"
        />

        <Card>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 w-full">
              <div className="w-full items-center">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Input Text
                </label>
                <div className="relative flex items-center w-full">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-green-500 focus:outline-none mr-2"
                    placeholder="Enter text for barcode..."
                  />
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center p-3 bg-gray-700 text-white rounded hover:bg-gray-900 transition"
                    aria-label="Toggle Theme"
                  >
                    {darkMode ? (
                      <Moon className="h-6 w-6" />
                    ) : (
                      <Sun className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Barcode Preview
              </label>
              <div className="bg-gray-800 p-4 rounded flex items-center justify-center">
                {input ? (
                  <canvas ref={canvasRef}></canvas>
                ) : (
                  <span className="text-gray-400">
                    Your barcode will appear here...
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={downloadBarcode}
                className="bg-gradient-to-r from-green-400 to-teal-500 px-4 py-2 rounded text-white font-medium hover:opacity-90 transition flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Barcode
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
