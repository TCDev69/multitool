import { Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import {
  Palette, Terminal, Activity, Hash, Braces, Code2, Wand2, FileJson, Droplet, FileText, FileDigit, Ruler, ScanLine, Clock, LineChart, Globe, AlarmClock, FileType, Timer, Radio, Table, Key, Github, Barcode, Heart, Accessibility, AArrowDown, AArrowUp, PlusSquare, Workflow 
} from "lucide-react";
import { motion } from "framer-motion";

import { SearchBar } from "./components/SearchBar";
import { GDPRBanner } from "./components/GDPRBanner";
import { PrivacyPolicy } from "./components/PrivacyPolicy";

import MinecraftFormatter from "./pages/MinecraftFormatter";
import Base64Converter from "./pages/Base64Converter";
import HashGenerator from "./pages/HashGenerator";
import Formatter from "./pages/Formatter";
import Url from "./pages/UrlEncDec";
import TextTools from "./pages/TextTools";
import Validator from "./pages/Validator";
import NumberConverter from "./pages/NumberCoverter";
import UnitConverter from "./pages/UnitConverter";
import MarkdownEditor from "./pages/Markdown";
import PasswordGenerator from "./pages/PasswordGenerator";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import TimerPage from "./pages/Timer";
import GraphGenerator from "./pages/GraphGenerator";
import IpGeolocation from "./pages/IpGeolocation";
import LoremIpsum from "./pages/LoremIpsum";
import MorseCode from "./pages/MorseCode";
import UuidGenerator from "./pages/UuidGenerator";
import CsvJsonConverter from "./pages/CSVtoJson";
import Stopwatch from "./pages/Stopwatch";
import CountdownPage from "./pages/CountDown";
import GitignoreGenerator from "./pages/GitIgnoreGenerator";
import BarCodeGenerator from "./pages/BarcodeGenerator";
import BrailleConverter from "./pages/BrailleConverter";
import Minifier from "./pages/MinifierConverter";
import Beautifier from "./pages/BeautifyConverter";
import FibonacciCalculator from "./pages/FibonacciCalculator";
import TextStatistics from "./pages/TextStatistics";
import ColorTools from "./pages/ColorTools";
import HealthCalculator from "./pages/HealthCalculator";

const tools = [
  {
    name: "Minecraft Formatter",
    description: "Format text with Minecraft color codes and hex colors",
    icon: Palette,
    path: "/minecraft-formatter",
    gradient: "from-green-400 to-blue-500",
    tags: ["minecraft", "color", "format", "text"],
  },
  {
    name: "Base64 Converter",
    description: "Encode and decode Base64 strings",
    icon: Terminal,
    path: "/base64",
    gradient: "from-purple-400 to-pink-500",
    tags: ["base64", "encode", "decode", "converter"],
  },
  {
    name: "Hash Generator",
    description: "Generate various hash formats",
    icon: Hash,
    path: "/hash",
    gradient: "from-yellow-400 to-orange-500",
    tags: ["hash", "security", "encryption", "generator"],
  },
  {
    name: "Code Formatter",
    description: "Format and validate JSON data",
    icon: Braces,
    path: "/formatter",
    gradient: "from-blue-400 to-indigo-500",
    tags: ["json", "formatter", "validator", "data"],
  },
  {
    name: "URL Encoder",
    description: "Encode and decode URLs",
    icon: Code2,
    path: "/url",
    gradient: "from-red-400 to-pink-500",
    tags: ["url", "encode", "decode", "converter"],
  },
  {
    name: "Text Tools",
    description: "Various text manipulation tools",
    icon: Wand2,
    path: "/text",
    gradient: "from-teal-400 to-cyan-500",
    tags: ["text", "tools", "manipulation", "editor"],
  },
  {
    name: "Code Validator",
    description: "Convert between YAML and JSON formats",
    icon: FileJson,
    path: "/validator",
    gradient: "from-emerald-400 to-green-500",
    tags: ["yaml", "json", "validator", "converter"],
  },
  {
    name: "Number Converter",
    description: "Convert numbers in different formats",
    icon: FileDigit,
    path: "/number",
    gradient: "from-indigo-400 to-purple-500",
    tags: ["number", "converter", "math", "formats"],
  },
  {
    name: "Unit Converter",
    description: "Convert length, weight and temperature",
    icon: Ruler,
    path: "/unit",
    gradient: "from-orange-400 to-red-500",
    tags: ["unit", "converter", "measurement", "tools"],
  },
  {
    name: "Markdown Editor",
    description: "Write and preview your Markdown content",
    icon: FileText,
    path: "/markdown",
    gradient: "from-pink-400 to-blue-500",
    tags: ["markdown", "editor", "text", "preview"],
  },
  {
    name: "Password Generator",
    description: "Generate and check password strength",
    icon: Key,
    path: "/password",
    gradient: "from-green-400 to-blue-500",
    tags: ["password", "security", "generator", "strength"],
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes from any text",
    icon: ScanLine,
    path: "/qrcode",
    gradient: "from-teal-400 to-indigo-500",
    tags: ["qr", "code", "generator", "text"],
  },
  {
    name: "Timer",
    description: "Set countdown timers",
    icon: Clock,
    path: "/timer",
    gradient: "from-teal-400 to-blue-500",
    tags: ["timer", "countdown", "time", "tools"],
  },
  {
    name: "Graph Generator",
    description: "Create beautiful charts and graphs",
    icon: LineChart,
    path: "/graph",
    gradient: "from-blue-400 to-purple-500",
    tags: ["graph", "charts", "visualization", "tools"],
  },
  {
    name: "IP Geolocation",
    description: "Get location info from IP addresses",
    icon: Globe,
    path: "/ip",
    gradient: "from-green-400 to-teal-500",
    tags: ["ip", "geolocation", "location", "network"],
  },
  {
    name: "Countdown Timer",
    description: "Set a target date and view the countdown",
    icon: AlarmClock,
    path: "/countdown",
    gradient: "from-yellow-400 to-red-500",
    tags: ["countdown", "timer", "date", "time"],
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text",
    icon: FileType,
    path: "/lorem",
    gradient: "from-indigo-400 to-blue-500",
    tags: ["lorem", "ipsum", "placeholder", "text"],
  },
  {
    name: "Stopwatch",
    description: "Precise timing with lap support",
    icon: Timer,
    path: "/stopwatch",
    gradient: "from-red-400 to-orange-500",
    tags: ["stopwatch", "time", "tools", "laps"],
  },
  {
    name: "Morse Code Translator",
    description: "Convert text to/from Morse code",
    icon: Radio,
    path: "/morse",
    gradient: "from-teal-400 to-green-500",
    tags: ["morse", "code", "translator", "text"],
  },
  {
    name: "CSV to JSON Converter",
    description: "Convert CSV data to JSON format",
    icon: Table,
    path: "/csv",
    gradient: "from-pink-400 to-purple-500",
    tags: ["csv", "json", "converter", "data"],
  },
  {
    name: "UUID Generator",
    description: "Generate random UUIDs",
    icon: Key,
    path: "/uuid",
    gradient: "from-blue-400 to-cyan-500",
    tags: ["uuid", "generator", "unique", "tools"],
  },
  {
    name: ".gitignore Generator",
    description: "Generate random UUIDs",
    icon: Github,
    path: "/git",
    gradient: "from-pink-400 to-blue-500",
    tags: ["gitignore", "generator", "git", "tools"],
  },
  {
    name: "Barcode Generator",
    description: "Generate barcodes easily from your text",
    icon: Barcode,
    path: "/barcode",
    gradient: "from-green-400 to-teal-500",
    tags: ["barcode", "generator", "text", "tools"],
  },{
    name: 'Health',
    description: 'BMI and Calorie calculators to track health and fitness',
    icon: Heart,
    path: '/health',
    gradient: 'from-green-400 to-teal-500',
    tags: ['health', 'fitness', 'bmi', 'calories', 'calculator'],
  },  
  {
    name: "Braille Converter",
    description: "Convert text to Braille",
    icon: Accessibility,
    path: "/braille",
    gradient: "from-purple-400 to-pink-500",
    tags: ["braille", "text", "converter", "accessibility"],
  },
  {
    name: 'Minifier',
    description: 'Minify HTML, CSS, JavaScript, JSON, or XML',
    icon: AArrowDown,
    path: '/minifier',
    gradient: 'from-teal-400 to-green-500',
    tags: ["minifier", "html", "css", "javascript", "json", "xml"],
  },
  {
    name: 'Beautifier',
    description: 'Convert minified HTML, CSS, JavaScript, JSON or XML into readable format',
    icon: AArrowUp,
    path: '/beautifier',
    gradient: 'from-green-400 to-blue-500',
    tags: ["beautifier", "html", "css", "javascript", "json", "xml"],
  },
  {
    name: 'Fibonacci Calculator',
    description: 'Calculate the nth Fibonacci number',
    icon: PlusSquare,
    path: '/fibonacci',
    gradient: 'from-red-400 to-yellow-500',
    tags: ["fibonacci", "calculator", "math", "sequence"],
  },
  {
    name: 'Text Statistics',
    description: 'Count letters, words, paragraphs, and sentences in your text',
    icon: FileText,
    path: '/textstats',
    gradient: 'from-indigo-400 to-blue-500',
    tags: ["text", "statistics", "count", "words"],
  },
  {
    name: 'Color Tools',
    description: 'Convert and pick colors easily',
    icon: Droplet,
    path: '/color',
    gradient: 'from-teal-400 to-cyan-500',
    tags: ["color", "converter", "picker", "tool"]
  }, 
];

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTools = tools.filter((tool) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      tool.name.toLowerCase().includes(searchLower) ||
      tool.description.toLowerCase().includes(searchLower) ||
      tool.tags.some(tag => tag.includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center my-24">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 text-transparent bg-clip-text">
            TCDev's Toolkit
          </h1>
          <p className="text-gray-400 text-lg">
            A collection of essential tools
          </p>
        </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link key={tool.path} to={tool.path}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-gradient-to-br ${tool.gradient} p-[1px] rounded-xl h-full`}
              >
                <div className="bg-gray-900 h-full rounded-xl p-6 hover:bg-gray-800/90 transition-colors">
                  <tool.icon className="w-12 h-12 mb-4" />
                  <h2 className="text-xl font-bold mb-2">{tool.name}</h2>
                  <p className="text-gray-400">{tool.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <footer className="mt-12 text-center text-sm text-gray-400">
          <Link to="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </footer>

        <a
          href="https://github.com/TCDev69/multitool"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 bg-gray-900 p-3 rounded shadow-lg hover:bg-gray-800 transition-colors"
        >
          <Github className="w-6 h-6 text-white" />
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <GDPRBanner />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/minecraft-formatter" element={<MinecraftFormatter />} />
        <Route path="/base64" element={<Base64Converter />} />
        <Route path="/hash" element={<HashGenerator />} />
        <Route path="/formatter" element={<Formatter />} />
        <Route path="/url" element={<Url />} />
        <Route path="/text" element={<TextTools />} />
        <Route path="/validator" element={<Validator />} />
        <Route path="/number" element={<NumberConverter />} />
        <Route path="/unit" element={<UnitConverter />} />
        <Route path="/markdown" element={<MarkdownEditor />} />
        <Route path="/password" element={<PasswordGenerator />} />
        <Route path="/qrcode" element={<QRCodeGenerator />} />
        <Route path="/graph" element={<GraphGenerator />} />
        <Route path="/ip" element={<IpGeolocation />} />
        <Route path="/lorem" element={<LoremIpsum />} />
        <Route path="/morse" element={<MorseCode />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/uuid" element={<UuidGenerator />} />
        <Route path="/csv" element={<CsvJsonConverter />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/countdown" element={<CountdownPage />} />
        <Route path="/git" element={<GitignoreGenerator />} />
        <Route path="/barcode" element={<BarCodeGenerator />} />
        <Route path="/health" element={<HealthCalculator />} />
        <Route path="/braille" element={<BrailleConverter />} />
        <Route path="/minifier" element={<Minifier />} />
        <Route path="/beautifier" element={<Beautifier />} />
        <Route path="/fibonacci" element={<FibonacciCalculator />} />
        <Route path="/textstats" element={<TextStatistics />} /> 
        <Route path="/color" element={<ColorTools />} /> 
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}