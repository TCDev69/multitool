import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current!);
      setIsRunning(false);
    }
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current!);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
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
          title="Stopwatch"
          description="Start and stop the stopwatch to measure time"
          gradient="from-red-400 to-orange-500"
        />

        <Card>
          <div className="space-y-6 text-center">
            <div className="text-4xl font-mono">{formatTime(time)}</div>

            <div className="flex justify-center gap-4">
              <button
                onClick={startStopwatch}
                className={`px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors ${
                  isRunning ? "bg-red-500 hover:bg-red-600" : ""
                }`}
              >
                {isRunning ? "Stop" : "Start"}
              </button>

              <button
                onClick={resetStopwatch}
                className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
