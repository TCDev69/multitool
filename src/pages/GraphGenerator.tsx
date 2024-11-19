import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Moon, Sun } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import html2canvas from "html2canvas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = "line" | "bar" | "pie";

export default function GraphGenerator() {
  const [chartType, setChartType] = useState<ChartType>("line");
  const [labels, setLabels] = useState<string>("Jan,Feb,Mar,Apr,May,Jun");
  const [data, setData] = useState<string>("65,59,80,81,56,55");
  const [title, setTitle] = useState<string>("Sample Chart");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const chartData = {
    labels: labels.split(","),
    datasets: [
      {
        label: "Data",
        data: data.split(",").map(Number),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    layout: {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <Line id="chart-canvas" options={options} data={chartData} />;
      case "bar":
        return <Bar id="chart-canvas" options={options} data={chartData} />;
      case "pie":
        return <Pie id="chart-canvas" options={options} data={chartData} />;
      default:
        return null;
    }
  };

  const downloadChart = async () => {
    const chartContainer = document.querySelector(".chart-container");
    if (chartContainer) {
      const canvas = await html2canvas(chartContainer);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "chart.png";
      link.click();
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
          title="Graph Generator"
          description="Create beautiful charts and graphs"
          gradient={"from-blue-400 to-purple-500"}
        />

        <Card>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Chart Type
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setChartType("line")}
                    className={`px-4 py-2 rounded ${
                      chartType === "line"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    Line
                  </button>
                  <button
                    onClick={() => setChartType("bar")}
                    className={`px-4 py-2 rounded ${
                      chartType === "bar"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    Bar
                  </button>
                  <button
                    onClick={() => setChartType("pie")}
                    className={`px-4 py-2 rounded ${
                      chartType === "pie"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    Pie
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={downloadChart}
                  className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Chart
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="flex items-center p-3 bg-gray-700 text-white rounded hover:bg-gray-900 transition"
                >
                  {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Chart Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-900 rounded p-3 text-white focus:ring-2 focus:ring-purple-500"
                placeholder="Enter chart title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Labels (comma-separated)
              </label>
              <input
                type="text"
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                className="w-full bg-gray-900 rounded p-3 text-white focus:ring-2 focus:ring-purple-500"
                placeholder="Label1,Label2,Label3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Data Values (comma-separated)
              </label>
              <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full bg-gray-900 rounded p-3 text-white focus:ring-2 focus:ring-purple-500"
                placeholder="10,20,30"
              />
            </div>

            <div
              className={`chart-container p-4 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              {renderChart()}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
