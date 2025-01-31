"use client";

import { Card } from "@/components/ui/card";

interface TomorrowViewProps {
  unit: string;
}

export function TomorrowView({ unit }: TomorrowViewProps) {
  return (
    <Card className="bg-gradient-to-br from-purple-500 to-purple-700 p-8 rounded-xl">
      <div className="text-2xl font-bold mb-6">Tomorrow's Forecast</div>
      <div className="grid grid-cols-4 gap-8">
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i} className="bg-purple-600/50 p-6 rounded-xl">
            <div className="text-lg mb-2">{['Morning', 'Afternoon', 'Evening', 'Night'][i]}</div>
            <div className="text-4xl mb-2">{"☀️🌤️☁️🌙"[i]}</div>
            <div className="text-2xl">{Math.floor(Math.random() * 10 + 20)}°{unit}</div>
          </Card>
        ))}
      </div>
    </Card>
  );
}