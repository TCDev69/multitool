import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftRight, ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';

export default function UnitConverter() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [unitType, setUnitType] = useState<'length' | 'weight' | 'temperature' | 'volume'>('length');
  const [fromUnit, setFromUnit] = useState<string>('centimeter');
  const [toUnit, setToUnit] = useState<string>('meter');

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const convert = () => {
    let value = parseFloat(inputValue);
    if (isNaN(value)) {
      setOutputValue('');
      return;
    }
  
    let result: number = 0;
  
    // Length conversions
    if (unitType === 'length') {
      const conversions = {
        millimeter: 1,
        centimeter: 10,
        meter: 1000,
        kilometer: 1000000,
        inch: 25.4,
        foot: 304.8,
        yard: 914.4,
        mile: 1609344,
      };
      result = (value * conversions[fromUnit]) / conversions[toUnit];
    }
  
    // Weight conversions
    if (unitType === 'weight') {
      const conversions = {
        milligram: 1,
        gram: 1000,
        kilogram: 1000000,
        ton: 1000000000,
        ounce: 28349.5,
        pound: 453592,
      };
  
      // Convert everything to milligrams (mg)
      const fromBaseUnit = conversions[fromUnit] || 1;
      const toBaseUnit = conversions[toUnit] || 1;
  
      result = (value * fromBaseUnit) / toBaseUnit;
    }
  
    // Temperature conversions
    // Temperature conversions
// Temperature conversions
if (unitType === 'temperature') {
    let baseValue = value;
  
    // Convert to Celsius first
    if (fromUnit === 'fahrenheit') {
      baseValue = (value - 32) * 5 / 9; // Convert to Celsius first
    } else if (fromUnit === 'kelvin') {
      baseValue = value - 273.15; // Convert to Celsius first
    }
  
    // Now convert from Celsius to target unit
    if (toUnit === 'fahrenheit') {
      result = (baseValue * 9) / 5 + 32; // Convert from Celsius to Fahrenheit
    } else if (toUnit === 'kelvin') {
      result = baseValue + 273.15; // Convert from Celsius to Kelvin
    } else {
      result = baseValue; // If it's Celsius to Celsius, just return the baseValue
    }
  }
  
  
  
    // Volume conversions
    if (unitType === 'volume') {
      const conversions = {
        milliliter: 1,
        liter: 1000,
        cubic_meter: 1000000,
        gallon: 3785.41,
        quart: 946.352,
        pint: 473.176,
        cup: 240,
        ounce: 29.5735,
        tablespoon: 14.7868,
        teaspoon: 4.92892,
      };
  
      // Convert everything to milliliters (ml)
      const fromBaseUnit = conversions[fromUnit] || 1;
      const toBaseUnit = conversions[toUnit] || 1;
  
      result = (value * fromBaseUnit) / toBaseUnit;
    }
  
    setOutputValue(result % 1 === 0 ? result.toString() : result.toFixed(4).replace(/\.?0+$/, ''));
  };
  
  React.useEffect(() => {
    convert();
  }, [inputValue, fromUnit, toUnit, unitType]);

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
          title="Unit Converter"
          description="Convert units of length, weight, temperature, and volume"
          gradient="from-orange-400 to-red-500"
        />

        <Card>
          <div className="space-y-4">
            {/* Unit Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Choose Unit Type
              </label>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setUnitType('length')}
                    className={`px-4 py-2 rounded ${
                      unitType === 'length' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Length
                  </button>
                  <button
                    onClick={() => setUnitType('weight')}
                    className={`px-4 py-2 rounded ${
                      unitType === 'weight' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Weight
                  </button>
                  <button
                    onClick={() => setUnitType('temperature')}
                    className={`px-4 py-2 rounded ${
                      unitType === 'temperature' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Temperature
                  </button>
                  <button
                    onClick={() => setUnitType('volume')}
                    className={`px-4 py-2 rounded ${
                      unitType === 'volume' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Volume
                  </button>
                </div>
                <button
                  onClick={swapUnits}
                  className="text-white bg-gray-700 hover:bg-orange-500 p-2 rounded"
                >
                  <ArrowLeftRight className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Input Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Input Value</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-12 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Enter value to convert"
              />
            </div>

            {/* Unit Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* From Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">From Unit</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full bg-gray-900 text-white font-mono p-3 rounded focus:ring-2 focus:ring-orange-500"
                >
                  {/* From Unit - Metric and Imperial */}
                  <optgroup label="Metrico">
                    {unitType === 'length' && (
                      <>
                        <option value="millimeter">Millimeter</option>
                        <option value="centimeter">Centimeter</option>
                        <option value="meter">Meter</option>
                        <option value="kilometer">Kilometer</option>
                      </>
                    )}
                    {unitType === 'weight' && (
                      <>
                        <option value="milligram">Milligram</option>
                        <option value="gram">Gram</option>
                        <option value="kilogram">Kilogram</option>
                      </>
                    )}
                    {unitType === 'temperature' && (
                      <>
                        <option value="celsius">Celsius</option>
                        <option value="fahrenheit">Fahrenheit</option>
                        <option value="kelvin">Kelvin</option>
                      </>
                    )}
                    {unitType === 'volume' && (
                      <>
                        <option value="milliliter">Milliliter</option>
                        <option value="liter">Liter</option>
                        <option value="cubic_meter">Cubic Meter</option>
                      </>
                    )}
                  </optgroup>

                  <optgroup label="Imperiale">
                    {unitType === 'length' && (
                      <>
                        <option value="inch">Inch</option>
                        <option value="foot">Foot</option>
                        <option value="yard">Yard</option>
                        <option value="mile">Mile</option>
                      </>
                    )}
                    {unitType === 'weight' && (
                      <>
                        <option value="ounce">Ounce</option>
                        <option value="pound">Pound</option>
                      </>
                    )}
                    {unitType === 'temperature' && (
                      <>
                        <option value="fahrenheit">Fahrenheit</option>
                      </>
                    )}
                    {unitType === 'volume' && (
                      <>
                        <option value="cubic_inch">Cubic Inch</option>
                        <option value="gallon">Gallon</option>
                      </>
                    )}
                  </optgroup>
                </select>
              </div>

              {/* To Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">To Unit</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full bg-gray-900 text-white font-mono p-3 rounded focus:ring-2 focus:ring-orange-500"
                >
                  {/* To Unit - Metric and Imperial */}
                  <optgroup label="Metrico">
                    {unitType === 'length' && (
                      <>
                        <option value="millimeter">Millimeter</option>
                        <option value="centimeter">Centimeter</option>
                        <option value="meter">Meter</option>
                        <option value="kilometer">Kilometer</option>
                      </>
                    )}
                    {unitType === 'weight' && (
                      <>
                        <option value="milligram">Milligram</option>
                        <option value="gram">Gram</option>
                        <option value="kilogram">Kilogram</option>
                      </>
                    )}
                    {unitType === 'temperature' && (
                      <>
                        <option value="celsius">Celsius</option>
                        <option value="fahrenheit">Fahrenheit</option>
                        <option value="kelvin">Kelvin</option>
                      </>
                    )}
                    {unitType === 'volume' && (
                      <>
                        <option value="milliliter">Milliliter</option>
                        <option value="liter">Liter</option>
                        <option value="cubic_meter">Cubic Meter</option>
                      </>
                    )}
                  </optgroup>

                  <optgroup label="Imperiale">
                    {unitType === 'length' && (
                      <>
                        <option value="inch">Inch</option>
                        <option value="foot">Foot</option>
                        <option value="yard">Yard</option>
                        <option value="mile">Mile</option>
                      </>
                    )}
                    {unitType === 'weight' && (
                      <>
                        <option value="ounce">Ounce</option>
                        <option value="pound">Pound</option>
                      </>
                    )}
                    {unitType === 'temperature' && (
                      <>
                        <option value="fahrenheit">Fahrenheit</option>
                      </>
                    )}
                    {unitType === 'volume' && (
                      <>
                        <option value="cubic_inch">Cubic Inch</option>
                        <option value="gallon">Gallon</option>
                      </>
                    )}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Output Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Output Value</label>
              <input
                type="text"
                value={outputValue}
                readOnly
                className="w-full h-12 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
