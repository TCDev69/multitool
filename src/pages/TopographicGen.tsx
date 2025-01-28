import React, { useEffect, useRef, useState } from 'react';
import { Noise } from 'noisejs';

const TopographicGen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wavyFactor, setWavyFactor] = useState(10); // Intensità ondulazione
  const [smoothness, setSmoothness] = useState(50); // Scala della "morbidezza"
  const [lineSpacing, setLineSpacing] = useState(20); // Spaziatura tra le linee
  const [zones, setZones] = useState(1); // Numero di zone concentriche
  const [randomSeed, setRandomSeed] = useState(Math.random()); // Seed per posizioni casuali

  const drawWavyLines = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#ff6f61';
    ctx.lineWidth = 2;

    const noise = new Noise(randomSeed);
    const noiseScale = smoothness / 1000; // Scala per "smoothness"

    for (let z = 0; z < zones; z++) {
      const centerX = Math.random() * width;
      const centerY = Math.random() * height;
      const step = lineSpacing;

      for (let radius = step; radius < Math.min(width, height) / 2; radius += step) {
        ctx.beginPath();

        const points = 360; // Numero di punti sulla circonferenza
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2; // Angolo in radianti
          const offset = noise.perlin2(
            Math.cos(angle) * radius * noiseScale,
            Math.sin(angle) * radius * noiseScale
          ); // Spostamento dato dal rumore

          const randomOffset = offset * wavyFactor; // Scala lo spostamento con wavyFactor
          const x = centerX + (radius + randomOffset) * Math.cos(angle);
          const y = centerY + (radius + randomOffset) * Math.sin(angle);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    drawWavyLines();
  }, [wavyFactor, smoothness, lineSpacing, zones, randomSeed]);

  return (
    <div>
      <div style={{ marginBottom: '10px', color: 'white' }}>
        <label>
          Wavy Intensity: {wavyFactor}
          <input
            type="range"
            min="0"
            max="30"
            value={wavyFactor}
            onChange={(e) => setWavyFactor(Number(e.target.value))}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px', color: 'white' }}>
        <label>
          Smoothness: {smoothness}
          <input
            type="range"
            min="10"
            max="100"
            value={smoothness}
            onChange={(e) => setSmoothness(Number(e.target.value))}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px', color: 'white' }}>
        <label>
          Line Spacing: {lineSpacing}
          <input
            type="range"
            min="5"
            max="50"
            value={lineSpacing}
            onChange={(e) => setLineSpacing(Number(e.target.value))}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px', color: 'white' }}>
        <label>
          Zones: {zones}
          <button onClick={() => setZones(Math.max(1, zones - 1))}>-</button>
          <button onClick={() => setZones(Math.min(3, zones + 1))}>+</button>
        </label>
      </div>
      <div style={{ marginBottom: '10px', color: 'white' }}>
        <button onClick={() => setRandomSeed(Math.random())}>Change Positions</button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid #ccc', backgroundColor: '#1e1e1e' }}
      />
    </div>
  );
};

export default TopographicGen;