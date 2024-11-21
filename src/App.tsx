import { Route, Routes, Link } from "react-router-dom";
import {
  Palette, Terminal, Hash, Braces, Code2, Wand2, FileJson, FileText, FileDigit, Ruler, ScanLine, Clock, LineChart, Globe, AlarmClock, FileType, Timer, Radio, Table, Key, Github, Barcode, Heart, Accessibility, AArrowDown, Code
} from "lucide-react";
import { motion } from "framer-motion";
import MinecraftFormatter from "./pages/MinecraftFormatter";
import Base64Converter from "./pages/Base64Converter";
import HashGenerator from "./pages/HashGenerator";
import JsonFormatter from "./pages/JsonFormatter";
import UrlEncoder from "./pages/UrlEncoder";
import TextTools from "./pages/TextTools";
import YamlValidator from "./pages/YamlValidator";
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
import BMICalculator from "./pages/BMICalculator";
import BrailleConverter from "./pages/BrailleConverter";
import Minifier from "./pages/MinifierConverter";
import Beautifier from "./pages/BeautifyConverter";

const tools = [
  {
    name: "Minecraft Formatter",
    description: "Format text with Minecraft color codes and hex colors",
    icon: Palette,
    path: "/minecraft-formatter",
    gradient: "from-green-400 to-blue-500",
  },
  {
    name: "Base64 Converter",
    description: "Encode and decode Base64 strings",
    icon: Terminal,
    path: "/base64",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    name: "Hash Generator",
    description: "Generate various hash formats",
    icon: Hash,
    path: "/hash",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    icon: Braces,
    path: "/json",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    name: "URL Encoder",
    description: "Encode and decode URLs",
    icon: Code2,
    path: "/url",
    gradient: "from-red-400 to-pink-500",
  },
  {
    name: "Text Tools",
    description: "Various text manipulation tools",
    icon: Wand2,
    path: "/text",
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    name: "YAML Validator",
    description: "Convert between YAML and JSON formats",
    icon: FileJson,
    path: "/yaml",
    gradient: "from-emerald-400 to-green-500",
  },
  {
    name: "Number Converter",
    description: "Convert numbers in different formats",
    icon: FileDigit,
    path: "/number",
    gradient: "from-indigo-400 to-purple-500",
  },
  {
    name: "Unit Converter",
    description: "Convert length, weight and temperature",
    icon: Ruler,
    path: "/unit",
    gradient: "from-orange-400 to-red-500",
  },
  {
    name: "Markdown Editor",
    description: "Write and preview your Markdown content",
    icon: FileText,
    path: "/markdown",
    gradient: "from-pink-400 to-blue-500",
  },
  {
    name: "Password Generator",
    description: "Generate and check password strength",
    icon: Key,
    path: "/password",
    gradient: "from-green-400 to-blue-500",
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes from any text",
    icon: ScanLine,
    path: "/qrcode",
    gradient: "from-teal-400 to-indigo-500",
  },
  {
    name: "Timer",
    description: "Set countdown timers",
    icon: Clock,
    path: "/timer",
    gradient: "from-teal-400 to-blue-500",
  },
  {
    name: "Graph Generator",
    description: "Create beautiful charts and graphs",
    icon: LineChart,
    path: "/graph",
    gradient: "from-blue-400 to-purple-500",
  },
  {
    name: "IP Geolocation",
    description: "Get location info from IP addresses",
    icon: Globe,
    path: "/ip",
    gradient: "from-green-400 to-teal-500",
  },
  {
    name: "Countdown Timer",
    description: "Set a target date and view the countdown",
    icon: AlarmClock,
    path: "/countdown",
    gradient: "from-yellow-400 to-red-500",
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text",
    icon: FileType,
    path: "/lorem",
    gradient: "from-indigo-400 to-blue-500",
  },
  {
    name: "Stopwatch",
    description: "Precise timing with lap support",
    icon: Timer,
    path: "/stopwatch",
    gradient: "from-red-400 to-orange-500",
  },
  {
    name: "Morse Code Translator",
    description: "Convert text to/from Morse code",
    icon: Radio,
    path: "/morse",
    gradient: "from-teal-400 to-green-500",
  },
  {
    name: "CSV to JSON Converter",
    description: "Convert CSV data to JSON format",
    icon: Table,
    path: "/csv",
    gradient: "from-pink-400 to-purple-500",
  },
  {
    name: "UUID Generator",
    description: "Generate random UUIDs",
    icon: Key,
    path: "/uuid",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    name: ".gitignore Generator",
    description: "Generate random UUIDs",
    icon: Github,
    path: "/git",
    gradient: "from-pink-400 to-blue-500",
  },
  {
    name: "Barcode Generator",
    description: "Generate barcodes easily from your text",
    icon: Barcode,
    path: "/barcode",
    gradient: "from-green-400 to-teal-500",
  },
  {
    name: "BMI Calculator",
    description: "Calculate your BMI and find out your health category",
    icon: Heart,
    path: "/bmi",
    gradient: "from-blue-400 to-green-500",
  },
  {
    name: "Braille Converter",
    description: "Convert text to Braille",
    icon: Accessibility,
    path: "/braille",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    name: 'Minifier',
    description: 'Minify HTML, CSS, JavaScript, JSON, or XML',
    icon: AArrowDown,
    path: '/minifier',
    gradient: 'from-teal-400 to-green-500',
  },
  {
    name: 'Beautifier',
    description: 'Convert minified HTML, CSS, JavaScript, JSON ir XML into readable format',
    icon: Code,
    path: '/beautifier',
    gradient: 'from-green-400 to-blue-500',
  },    
];

function HomePage() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/minecraft-formatter" element={<MinecraftFormatter />} />
      <Route path="/base64" element={<Base64Converter />} />
      <Route path="/hash" element={<HashGenerator />} />
      <Route path="/json" element={<JsonFormatter />} />
      <Route path="/url" element={<UrlEncoder />} />
      <Route path="/text" element={<TextTools />} />
      <Route path="/yaml" element={<YamlValidator />} />
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
      <Route path="/bmi" element={<BMICalculator />} />
      <Route path="/braille" element={<BrailleConverter />} />
      <Route path="/minifier" element={<Minifier />} />
      <Route path="/beautifier" element={<Beautifier />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
