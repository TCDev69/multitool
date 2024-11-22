import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Trash2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

export default function QRCodeGenerator() {
  const [inputText, setInputText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const maxLength = 1852;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= maxLength) {
      setInputText(value);
      setQrValue(value);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const removeImage = () => {
    setImage(null); // Rimuove l'immagine
  };

  const downloadQRCode = () => {
    const qrCodeElement = document.getElementById("qr-code-svg") as HTMLElement;

    html2canvas(qrCodeElement, {
      useCORS: true,
      backgroundColor: null
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qrcode.jpg";
      link.click();
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
          title="QR Code Generator"
          description="Generate QR codes from any text"
          gradient="from-teal-400 to-indigo-500"
        />

        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter Text
              </label>
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                className="w-full h-12 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="Enter text to generate QR code"
                maxLength={maxLength}
              />
              <div className="text-sm text-gray-400 mt-2">
                {inputText.length}/{maxLength} characters
              </div>
            </div>

            {/* Pulsante per caricare l'immagine */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload Image (optional)
              </label>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="image-upload"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white rounded cursor-pointer hover:bg-teal-600 transition-colors mb-4"
                >
                  <span>Choose File</span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {image && (
                  <button
                    onClick={removeImage}
                    className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {qrValue && (
              <div className="flex justify-center mt-6">
                <div id="qr-code-svg" className="relative">
                  <QRCode value={qrValue} size={256} />
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="QR Code logo"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16"
                    />
                  )}
                </div>
              </div>
            )}

            {qrValue && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={downloadQRCode}
                  className="flex items-center px-6 py-3 bg-teal-500 text-white rounded hover:bg-teal-600 focus:ring-2 focus:ring-teal-500"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
