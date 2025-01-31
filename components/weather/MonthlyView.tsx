"use client";

import { Card } from "@/components/ui/card";

export function MonthlyView() {
  const monthlyForecast = Array.from({ length: 30 }, (_, i) => ({
    date: `Aug ${i + 1}`,
    high: Math.floor(Math.random() * 10 + 25),
    low: Math.floor(Math.random() * 10 + 15),
    icon: ["☀️", "🌤️", "☁️", "🌧️"][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className="grid grid-cols-6 gap-4">
      {monthlyForecast.map((day, i) => (
        <Card key={i} className="bg-purple-500 p-4 text-center rounded-xl">
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
  );
}