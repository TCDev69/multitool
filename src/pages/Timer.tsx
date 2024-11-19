import React, { useState, useEffect } from "react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import { ArrowLeft, FolderClock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Timer() {
  const [timerValue, setTimerValue] = useState(0);
  const [timerStr, setTimerStr] = useState("00:00:00");
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [progress, setProgress] = useState(100);
  const [totalTime, setTotalTime] = useState(0);

  const presetTimers = [
    { label: "5 minutes", value: 5 * 60 },
    { label: "10 minutes", value: 10 * 60 },
    { label: "15 minutes", value: 15 * 60 },
    { label: "30 minutes", value: 30 * 60 },
    { label: "45 minutes", value: 45 * 60 },
    { label: "1 hour", value: 60 * 60 },
  ];

  const timerEndSound = new Audio("/sound/ring.mp3");

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTotalTime(timerValue);

    const id = setInterval(() => {
      setTimerValue((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setIsRunning(false);
          timerEndSound.play();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setTimerValue(0);
    setProgress(100);
    setTotalTime(0);
  };

  const handleCustomTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes, seconds] = e.target.value.split(":").map(Number);
    setTimerValue(hours * 3600 + minutes * 60 + seconds);
  };

  const handlePresetTimer = (timeInSeconds: number) => {
    setTimerValue(timeInSeconds);
    setProgress(100);
    setTotalTime(timeInSeconds);
    startTimer();
  };

  useEffect(() => {
    setTimerStr(formatTime(timerValue));

    if (totalTime > 0) {
      setProgress((prev) =>
        Math.max(0, 100 - (100 * (totalTime - timerValue)) / totalTime)
      );
    }

    if (timerValue === 0) {
      setProgress(0);
    }
  }, [timerValue, totalTime]);

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
          title="Timer"
          description="Set a custom timer or choose from predefined timers"
          gradient="from-teal-400 to-blue-500"
        />

        <Card>
          <div className="space-y-4">
            <div className="text-center">
              <div className="mt-8">
                <p className="text-5xl font-semibold">{timerStr}</p>
              </div>

              <div className="w-full bg-gray-800 h-2 rounded-full mt-12">
                <div
                  className="h-full bg-teal-600 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-4 space-x-4">
                <button
                  onClick={startTimer}
                  disabled={isRunning}
                  className="w-1/3 bg-teal-500 text-white p-3 rounded focus:ring-2 focus:ring-teal-500 disabled:bg-gray-500"
                >
                  {isRunning ? "Running..." : "Start Timer"}
                </button>
                <button
                  onClick={stopTimer}
                  disabled={!isRunning}
                  className="w-1/3 bg-red-500 text-white p-3 rounded focus:ring-2 focus:ring-red-500 disabled:bg-gray-500"
                >
                  Stop Timer
                </button>
                <button
                  onClick={resetTimer}
                  className="w-1/3 bg-gray-700 text-white p-3 rounded focus:ring-2 focus:ring-gray-500"
                >
                  Reset Timer
                </button>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 bg-gray-800/50 backdrop-blur rounded-lg p-6 shadow-xl">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Set Custom Timer (hh:mm:ss)
          </label>
          <input
            type="text"
            value={timerStr}
            onChange={handleCustomTimerChange}
            placeholder="00:00:00"
            className="w-full h-12 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>
        <div className="mt-8 bg-gray-800/50 backdrop-blur rounded-lg p-6 shadow-xl">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FolderClock className="text-blue-400" />
            Preset
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {presetTimers.map((preset) => (
              <div
                key={preset.label}
                onClick={() => handlePresetTimer(preset.value)}
                className="cursor-pointer bg-teal-600 text-white p-4 rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-200 text-center"
              >
                <p className="text-lg font-semibold">{preset.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
