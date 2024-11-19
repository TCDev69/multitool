import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

export default function NumberConverter() {
  const [input, setInput] = useState("");
  const [base, setBase] = useState<"binary" | "octal" | "decimal" | "hex">(
    "decimal"
  );

  const convertNumber = (number: string, base: string) => {
    try {
      const decimalValue = parseInt(
        number,
        base === "binary" ? 2 : base === "octal" ? 8 : base === "hex" ? 16 : 10
      );
      return {
        binary: decimalValue.toString(2),
        octal: decimalValue.toString(8),
        decimal: decimalValue.toString(10),
        hex: decimalValue.toString(16).toUpperCase(),
      };
    } catch (e) {
      return null;
    }
  };

  const result = convertNumber(input, base);

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
          title="Number Converter"
          description="Convert numbers between binary, octal, decimal, and hexadecimal"
          gradient="from-indigo-400 to-purple-500"
        />

        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input Number
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter a number..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input Base
              </label>
              <select
                value={base}
                onChange={(e) =>
                  setBase(
                    e.target.value as "binary" | "octal" | "decimal" | "hex"
                  )
                }
                className="w-full bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="binary">Binary</option>
                <option value="octal">Octal</option>
                <option value="decimal">Decimal</option>
                <option value="hex">Hexadecimal</option>
              </select>
            </div>

            {result ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(result).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={value}
                      className="w-full bg-gray-900 rounded p-3 text-white font-mono text-sm cursor-pointer"
                      onClick={() => navigator.clipboard.writeText(value)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-400">
                Invalid input for the selected base.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
