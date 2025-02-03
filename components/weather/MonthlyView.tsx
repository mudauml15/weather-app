"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getDailyForecast } from "@/lib/weather";

export function MonthlyView() {
  const [monthlyForecast, setMonthlyForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDailyForecast("Pretoria,ZA");
        setMonthlyForecast(data);
      } catch (err) {
        setError("Failed to fetch forecast data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-xl">Loading forecast data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-full p-4 overflow-auto">
      <div className="grid grid-cols-3 gap-6 ">
        {monthlyForecast.map((day, i) => (
          <Card
            key={i}
            className="bg-gradient-to-r from-[#AD36CB] to-[#333333]  border-none p-4 text-center rounded-2xl"
          >
            <div className="text-sm mb-2">{day.date}</div>
            <div className="text-2xl mb-2">{day.icon}</div>
            <div className="text-sm">
              <span className="text-red-300">{day.high}°</span>
              {" / "}
              <span className="text-blue-300">{day.low}°</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
