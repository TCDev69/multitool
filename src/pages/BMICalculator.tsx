import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';

export default function BMICalculator() {
  const [height, setHeight] = useState<number | string>('');
  const [weight, setWeight] = useState<number | string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    if (height && weight && !isNaN(Number(height)) && !isNaN(Number(weight))) {
      const heightInMeters = Number(height) / 100;
      const calculatedBMI = Number(weight) / (heightInMeters * heightInMeters);
      setBmi(calculatedBMI);
      determineCategory(calculatedBMI);
    }
  };

  const determineCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  };

  const getProgressBarColor = () => {
    if (bmi === null) return 'bg-gray-300';
    if (bmi < 18.5) return 'bg-blue-500';
    if (bmi >= 18.5 && bmi < 24.9) return 'bg-green-500';
    if (bmi >= 25 && bmi < 29.9) return 'bg-yellow-500';
    return 'bg-red-500'; 
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
          title="BMI Calculator"
          description="Calculate your BMI and find out your health category"
          gradient="from-blue-400 to-green-500"
        />

        <Card>
          <div className="space-y-4 text-center">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Height (in cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your height in cm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Weight (in kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your weight in kg"
              />
            </div>

            <button
              onClick={calculateBMI}
              className="bg-blue-400 px-4 py-2 rounded text-white font-medium hover:opacity-90 transition"
            >
              Calculate BMI
            </button>

            {bmi !== null && (
              <div className="mt-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold inline-block py-1 px-2 uppercase">
                        BMI Progress
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold inline-block py-1 px-2 uppercase">
                        {bmi.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex mb-2 items-center justify-between">
                    <div className="w-full bg-gray-300 rounded-full">
                      <div
                        className={`h-2 rounded-full ${getProgressBarColor()}`}
                        style={{ width: `${(bmi > 40 ? 40 : bmi) * 2.5}%` }} 
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {bmi !== null && (
              <div>
                <p className="text-xl font-semibold text-white">Your BMI: {bmi.toFixed(2)}</p>
                <p className="text-lg text-gray-300">Category: {category}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
