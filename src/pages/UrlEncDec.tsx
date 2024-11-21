import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { Tab } from "@headlessui/react";

export default function Url() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const convert = () => {
    try {
      if (mode === "encode") {
        return encodeURIComponent(input);
      } else {
        return decodeURIComponent(input);
      }
    } catch (e) {
      return "Invalid input";
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
          title="URL Encoder & Decoder"
          description="Encode and decode URLs"
          gradient="from-red-400 to-pink-500"
        />

        <Card>
          {/* Tabs for Encode/Decode */}
          <Tab.Group selectedIndex={mode === "encode" ? 0 : 1} onChange={(index) => setMode(index === 0 ? "encode" : "decode")}>
            <Tab.List className="flex space-x-4 mb-4">
              <Tab
                className={({ selected }) =>
                  `px-4 py-2 rounded text-sm font-medium transition-colors ${
                    selected
                      ? "bg-gradient-to-r from-red-400 to-pink-500 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                Encode
              </Tab>
              <Tab
                className={({ selected }) =>
                  `px-4 py-2 rounded text-sm font-medium transition-colors ${
                    selected
                      ? "bg-gradient-to-r from-red-400 to-pink-500 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                Decode
              </Tab>
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel>
                {/* Encoder */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Input
                    </label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
                      placeholder="Enter URL to encode..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Output
                    </label>
                    <textarea
                      value={convert()}
                      readOnly
                      className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono"
                    />
                  </div>
                </div>
              </Tab.Panel>

              <Tab.Panel>
                {/* Decoder */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Input
                    </label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
                      placeholder="Enter URL to decode..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Output
                    </label>
                    <textarea
                      value={convert()}
                      readOnly
                      className="w-full h-32 bg-gray-900 rounded p-3 text-white font-mono"
                    />
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Card>
      </div>
    </div>
  );
}
