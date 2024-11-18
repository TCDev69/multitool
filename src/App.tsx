import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Palette, Terminal, Hash, Braces, Code2, Wand2, FileJson, FileText, FileDigit, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';
import MinecraftFormatter from './pages/MinecraftFormatter';
import Base64Converter from './pages/Base64Converter';
import HashGenerator from './pages/HashGenerator';
import JsonFormatter from './pages/JsonFormatter';
import UrlEncoder from './pages/UrlEncoder';
import TextTools from './pages/TextTools';
import YamlValidator from './pages/YamlValidator';
import NumberConverter from './pages/NumberCoverter';
import UnitConversion from './pages/UnitConverter';
import UnitConverter from './pages/UnitConverter';
import MarkdownEditor from './pages/Markdown';
import PasswordGenerator from './pages/PasswordGenerator';
 
const tools = [
  {
    name: 'Minecraft Formatter',
    description: 'Format text with Minecraft color codes and hex colors',
    icon: Palette,
    path: '/minecraft-formatter',
    gradient: 'from-green-400 to-blue-500',
  },
  {
    name: 'Base64 Converter',
    description: 'Encode and decode Base64 strings',
    icon: Terminal,
    path: '/base64',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    name: 'Hash Generator',
    description: 'Generate various hash formats',
    icon: Hash,
    path: '/hash',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    icon: Braces,
    path: '/json',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    name: 'URL Encoder',
    description: 'Encode and decode URLs',
    icon: Code2,
    path: '/url',
    gradient: 'from-red-400 to-pink-500',
  },
  {
    name: 'Text Tools',
    description: 'Various text manipulation tools',
    icon: Wand2,
    path: '/text',
    gradient: 'from-teal-400 to-cyan-500',
  },
  {
    name: 'YAML Validator',
    description: 'Convert between YAML and JSON formats',
    icon: FileJson,
    path: '/yaml',
    gradient: 'from-emerald-400 to-green-500',
  },
  {
    name: 'Number Converter',
    description: 'Convert numbers in different formats',
    icon: FileDigit,
    path: '/number',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    name: 'Unit Converter',
    description: 'Convert length, weight and temperature',
    icon: Ruler,
    path: '/unit',
    gradient: 'from-orange-400 to-red-500',
  },
  {
    name: 'Markdown Editor',
    description: 'Write and preview your Markdown content',
    icon: FileText,
    path: '/markdown',
    gradient: 'from-pink-400 to-blue-500',
  },
  {
    name: 'Password Generator & Strength Checker',
    description: 'Generate and check the strength of your passwords',
    icon: FileText, //icona da lucid-react
    path: '/password',
    gradient: 'from-green-400 to-blue-500',
  }  
];

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Developer's Toolkit
          </h1>
          <p className="text-gray-400 text-lg">
            A collection of essential tools for developers
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
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}