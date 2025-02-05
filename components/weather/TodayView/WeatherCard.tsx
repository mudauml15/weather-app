"use client";

import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { WeatherData } from "@/lib/weather";

interface WeatherCardProps {
  location: WeatherData;
  unit: string;
}

export function WeatherCard({ location, unit }: WeatherCardProps) {
  return (
    // <Card className="h-96 bg-gradient-to-r from-[#AD36CB] to-[#333333] border-4 border-none  p-5 text-center rounded-3xl relative">
    <Card className="h-96 w-full md:w-5/5 lg:w-2/2 xl:w-3/3 bg-gradient-to-r from-[#AD36CB] to-[#333333] border-4 border-none p-5 text-center rounded-3xl relative">
      <div className="w-full flex flex-col ">
        <div className="flex items-center gap-2 mb-8 mt-8">
          <span className="text-3xl">{location.city}</span>
          <MapPin className="h-5 w-5" />
        </div>

        <div className="w-full flex items-center justify-center gap-5 mt-5 relative">
          <div className="text-[5rem] font-light">
            {location.temp}°{unit}
          </div>
          <div className="text-6xl">{location.icon}</div>
          <div className="text-sm absolute left-2 bottom-0">
            {location.date}
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 gap-4 absolute bottom-6">
        <div>
          <div className="text-sm text-zinc-200 ">HUMIDITY</div>
          <div className="text-xl">{location.humidity}%</div>
        </div>
        <div>
          <div className="text-sm text-zinc-200">VISIBILITY</div>
          <div className="text-xl">{location.visibility}km</div>
        </div>
        <div>
          <div className="text-sm text-zinc-200">AIR PRESSURE</div>
          <div className="text-xl">{location.pressure}hPa</div>
        </div>
        <div>
          <div className="text-sm text-zinc-200">WIND</div>
          <div className="text-xl">{location.wind}mph</div>
        </div>
      </div>
    </Card>
  );
}
