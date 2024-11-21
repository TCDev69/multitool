import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import Colorful from "@uiw/react-color-colorful";
import { hsvaToHex } from "@uiw/color-convert";
import { Tabs } from "../components/Tabs";

export default function ColorTools() {
  const [cmyk, setCmyk] = useState({ c: 0, m: 0, y: 0, k: 0 });
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const [hex, setHex] = useState("#000000");
  const [rgbFromHex, setRgbFromHex] = useState({ r: 0, g: 0, b: 0 });
  const [rgbFromHexPicker, setrgbFromHexPicker] = useState({ r: 0, g: 0, b: 0 });

  const convertCmykToRgb = () => {
    const { c, m, y, k } = cmyk;
    const r = Math.round(255 * (1 - c / 100) * (1 - k / 100));
    const g = Math.round(255 * (1 - m / 100) * (1 - k / 100));
    const b = Math.round(255 * (1 - y / 100) * (1 - k / 100));
    setRgb({ r, g, b });
  };

  const convertHexToRgb = (hex: string) => {
    const hexWithoutHash = hex.replace("#", "");
    if (hexWithoutHash.length === 6) {
      const r = parseInt(hexWithoutHash.substring(0, 2), 16);
      const g = parseInt(hexWithoutHash.substring(2, 4), 16);
      const b = parseInt(hexWithoutHash.substring(4, 6), 16);
      setRgbFromHex({ r, g, b });
    } else {
      setRgbFromHex({ r: 0, g: 0, b: 0 });
    }
  };

  const convertHexToRgbPicker = () => {
    const hexWithoutHash = hsvaToHex(hsva).replace("#", "");
    if (hexWithoutHash.length === 6) {
      const r = parseInt(hexWithoutHash.substring(0, 2), 16);
      const g = parseInt(hexWithoutHash.substring(2, 4), 16);
      const b = parseInt(hexWithoutHash.substring(4, 6), 16);
      setrgbFromHexPicker({ r, g, b });
    } else {
      setrgbFromHexPicker({ r: 0, g: 0, b: 0 });
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
          title="Color Tools"
          description="Convert and pick colors easily"
          gradient="from-teal-400 to-cyan-500"
        />

        <div className="space-y-8">
        <Tabs tabs={["CMYK to RGB", "Color Picker", "Hex to RGB"]}>
          <Card>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CMYK
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {["c", "m", "y", "k"].map((color, idx) => (
                    <input
                      key={idx}
                      type="number"
                      min="0"
                      max="100"
                      value={cmyk[color]}
                      onChange={(e) =>
                        setCmyk({
                          ...cmyk,
                          [color]: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder={`${color.toUpperCase()} value`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={convertCmykToRgb}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded focus:outline-none"
                >
                  Convert to RGB
                </button>
              </div>

              {rgb.r !== 0 && rgb.g !== 0 && rgb.b !== 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    RGB
                  </label>
                  <textarea
                    value={`rgb(${`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`})`}
                    readOnly
                    className="w-full h-12 bg-gray-900 rounded p-3 text-white font-mono resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Choose a Color
              </label>
              <div className="rounded p-3 flex justify-center grid grid-cols-1 md:grid-cols-2 gap-4">
                <Colorful
                  color={hsva}
                  disableAlpha={true}
                  onChange={(color) => {
                    setHsva(color.hsva);
                    convertHexToRgbPicker(hsvaToHex(hsva));
                  }}
                  className="mr-4"
                />
                <div className="content-center">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hex Code
                  </label>
                  <textarea
                    value={hsvaToHex(hsva)}
                    readOnly
                    className="w-full h-12 bg-gray-900 rounded p-3 text-white font-mono resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    RGB Code
                  </label>
                  <textarea
                    value={`rgb(${rgbFromHexPicker.r}, ${rgbFromHexPicker.g}, ${rgbFromHexPicker.b})`}
                    readOnly
                    className="w-full h-12 bg-gray-900 rounded p-3 text-white font-mono resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hex Color
                </label>
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => {
                    const newHex = e.target.value;
                    setHex(newHex);
                    convertHexToRgb(newHex);
                  }}
                  className="w-full bg-gray-900 rounded p-3 text-white font-mono resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  placeholder="#RRGGBB"
                />
              </div>

              <div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    RGB
                  </label>
                  <div className="content-center">
                    <textarea
                      value={`rgb(${rgbFromHex.r}, ${rgbFromHex.g}, ${rgbFromHex.b})`}
                      readOnly
                      className="w-full h-12 bg-gray-900 rounded p-3 text-white resize-none font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color Preview
                </label>
                <div
                  className="w-full h-32 rounded"
                  style={{ backgroundColor: hex }}
                ></div>
              </div>
            </div>
          </Card>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
