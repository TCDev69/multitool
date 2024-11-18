import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [length, setLength] = useState(12);

  const generatePassword = () => {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(generatedPassword);
    checkStrength(generatedPassword);
  };

  const checkStrength = (password: string) => {
    const regexWeak = /^(?=.*[a-zA-Z0-9]).{6,12}$/; // Weak: 6-12 characters, alphanumeric only
    const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,16}$/; // Medium: mixed case, numbers, special characters, 8-16 chars
    const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{16,}$/; // Strong: mixed case, numbers, special characters, 16+ chars
  
    if (regexStrong.test(password)) {
      setStrength('Strong');
    } else if (regexMedium.test(password)) {
      setStrength('Medium');
    } else if (regexWeak.test(password)) {
      setStrength('Weak');
    } else {
      setStrength('Invalid');
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
          title="Password Generator & Strength Checker"
          description="Generate and check the strength of your passwords"
          gradient="from-green-400 to-blue-500"
        />

        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password Length</label>
              <input
                type="number"
                min="6"
                max="20"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-12 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <button
                onClick={generatePassword}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
              >
                Generate Password
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Generated Password</label>
              <input
                type="text"
                value={password}
                readOnly
                className="w-full h-12 bg-gray-900 rounded p-3 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password Strength</label>
              <input
                type="text"
                value={strength}
                readOnly
                className="w-full h-12 bg-gray-900 rounded p-3 text-white font-mono"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

