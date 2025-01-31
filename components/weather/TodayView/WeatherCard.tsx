"use client";

import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WeatherCardProps {
  location: {
    city: string;
    temp: string;
    icon: string;
    date: string;
  };
  unit: string;
}

export function WeatherCard({ location, unit }: WeatherCardProps) {
  return (
    <Card className="bg-gradient-to-br from-purple-500 to-purple-700 p-8 rounded-xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5" />
            <span className="text-xl">{location.city}</span>
          </div>
          <div className="text-sm">{location.date}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-6xl font-light">{location.temp}°{unit}</div>
          <div className="text-6xl">{location.icon}</div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4">
        <div>
          <div className="text-sm text-zinc-200">HUMIDITY</div>
          <div className="text-xl">95%</div>
        </div>
        <div>
          <div className="text-sm text-zinc-200">VISIBILITY</div>
          <div className="text-xl">8km</div>
        </div>
        <div>
          <div className="text-sm text-zinc-200">AIR PRESSURE</div>
          <div className="text-xl">1005hPa</div>
        </div>
        <div>
          <div className="text-sm text-zinc-200">WIND</div>
          <div className="text-xl">2mph</div>
        </div>
      </div>
    </Card>
  );
}