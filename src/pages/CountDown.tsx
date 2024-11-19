import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';

export default function CountdownPage() {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (targetDate) {
      timer = setInterval(() => {
        const currentDate = new Date();
        const target = new Date(targetDate);
        const difference = target.getTime() - currentDate.getTime();

        if (difference <= 0) {
          clearInterval(timer);
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          const days = Math.floor(difference / (1000 * 3600 * 24));
          const hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));
          const minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setCountdown({ days, hours, minutes, seconds });
        }
      }, 1000);
    } else {
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }

    return () => clearInterval(timer);

  }, [targetDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetDate(e.target.value);
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
          title="Countdown Timer"
          description="Set a future date and time to see the countdown."
          gradient="from-yellow-400 to-red-500"
        />

        <Card>
          <div className="space-y-4 mb">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter Target Date and Time
              </label>
              <input
                type="datetime-local"
                value={targetDate}
                onChange={handleDateChange}
                className="mb-6 w-full h-12 bg-gray-900 rounded p-3 text-white font-mono focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>

            <div className="mt-6 text-center">
              <div className="text-2xl font-bold text-gray-300">
                {targetDate
                  ? `Countdown to: ${new Date(targetDate).toLocaleString()}`
                  : 'Enter a Date to Start the Countdown'}
              </div>
              <div className="mt-4 text-6xl font-extrabold text-orange-400">
                {countdown.days}d : {countdown.hours}h : {countdown.minutes}m : {countdown.seconds}s
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
