import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

interface GeoData {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

export default function IpGeolocation() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<GeoData | null>(null);

  const isValidIp = (ip: string) => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  const fetchGeoData = async (queryIp: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://ipinfo.io/${queryIp}/json`);
      if (!response.ok) throw new Error("Failed to fetch IP data");
      const data = await response.json();
      setGeoData(data);
    } catch (err) {
      const errorMessage = (err as Error).message;
      if (errorMessage.includes("Failed to fetch")) {
        setError(
          "Unable to fetch IP data. Please disable your adblocker and try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      setGeoData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ip.trim()) return;

    if (!isValidIp(ip)) {
      setError("The IP address you entered is not valid.");
      return;
    }

    fetchGeoData(ip);
  };

  useEffect(() => {
    const fetchUserIp = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        setIp(data.ip);
        fetchGeoData(data.ip);
      } catch (err) {
        setError("Unable to fetch your IP address.");
      }
    };

    fetchUserIp();
  }, []);

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
          title="IP Geolocation"
          description="Get location information from IP addresses"
          gradient="from-green-400 to-teal-500"
        />

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                IP Address
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  placeholder="Enter IP address..."
                  className="flex-1 bg-gray-900 rounded p-3 text-white focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-colors disabled:bg-gray-600"
                >
                  {loading ? "Loading..." : <Search className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded">
                {error}
              </div>
            )}

            {geoData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    IP Address
                  </label>
                  <div className="bg-gray-900 p-3 rounded">{geoData.ip}</div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    City
                  </label>
                  <div className="bg-gray-900 p-3 rounded">{geoData.city}</div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Region
                  </label>
                  <div className="bg-gray-900 p-3 rounded">
                    {geoData.region}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Country
                  </label>
                  <div className="bg-gray-900 p-3 rounded">
                    {geoData.country}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Location
                  </label>
                  <div className="bg-gray-900 p-3 rounded">{geoData.loc}</div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Organization
                  </label>
                  <div className="bg-gray-900 p-3 rounded">{geoData.org}</div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Postal Code
                  </label>
                  <div className="bg-gray-900 p-3 rounded">
                    {geoData.postal}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Timezone
                  </label>
                  <div className="bg-gray-900 p-3 rounded">
                    {geoData.timezone}
                  </div>
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
