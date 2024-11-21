import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';

export default function FibonacciCalculator() {
  const [number, setNumber] = useState<number | ''>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateFibonacci = (n: number): number => {
    if (n <= 1) return n;
    let a = 0, b = 1, temp;
    for (let i = 2; i <= n; i++) {
      temp = a + b;
      a = b;
      b = temp;
    }
    return b;
  };

  const handleCalculation = () => {
    if (typeof number === 'number' && number >= 0) {
      setResult(calculateFibonacci(number));
    } else {
      setResult(null);
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
          title="Fibonacci Calculator"
          description="Calculate the nth Fibonacci number"
          gradient="from-red-400 to-yellow-500"
        />

        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter a Number
              </label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value === '' ? '' : parseInt(e.target.value))}
                className="w-full bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Enter a non-negative integer"
              />
            </div>

            <button
              onClick={handleCalculation}
              className="bg-gradient-to-r from-red-400 to-yellow-500 px-4 py-2 rounded text-white font-medium hover:opacity-90 transition"
            >
              Calculate Fibonacci
            </button>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Result
              </label>
              <div className="w-full bg-gray-900 rounded p-3 text-white font-mono">
                {result !== null ? result : 'Result will appear here...'}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
