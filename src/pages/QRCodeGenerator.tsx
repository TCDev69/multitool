import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';
import QRCode from 'react-qr-code'; // Per generare il QR Code
import html2canvas from 'html2canvas'; // Per catturare l'elemento e salvarlo come immagine

export default function QRCodeGenerator() {
  const [inputText, setInputText] = useState('');
  const [qrValue, setQrValue] = useState('');
  const maxLength = 1852; // Limite massimo di caratteri

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Limita il numero di caratteri a maxLength
    if (value.length <= maxLength) {
      setInputText(value);
      setQrValue(value); // Aggiorna il QR Code mentre l'utente scrive
    }
  };

  const downloadQRCode = () => {
    const qrCodeElement = document.getElementById('qr-code-svg') as HTMLElement;

    html2canvas(qrCodeElement, {
      useCORS: true, // Per gestire immagini di domini esterni
      backgroundColor: null, // Imposta il background trasparente
    }).then((canvas) => {
      // Converti il canvas in formato jpg
      const dataUrl = canvas.toDataURL('image/jpeg', 1.0); // Qualità dell'immagine 1.0 (massima)
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qrcode.jpg'; // Nome del file da scaricare
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
            {/* Input Text Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Enter Text</label>
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                className="w-full h-12 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="Enter text to generate QR code"
                maxLength={maxLength} // Limita i caratteri nel campo di testo
              />
              <div className="text-sm text-gray-400 mt-2">
                {inputText.length}/{maxLength} characters
              </div>
            </div>

            {/* QR Code Preview */}
            {qrValue && (
              <div className="flex justify-center mt-6">
                <div id="qr-code-svg">
                  <QRCode value={qrValue} size={256} />
                </div>
              </div>
            )}

            {/* Download QR Code Button */}
            {qrValue && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={downloadQRCode}
                  className="px-6 py-3 bg-teal-500 text-white rounded hover:bg-teal-600 focus:ring-2 focus:ring-teal-500"
                >
                  Download QR Code as JPG
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}