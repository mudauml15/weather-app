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
    <Card className="bg-gradient-to-br from-purple-500/90 to-black-700 p-10 rounded-3xl border-none  inset-shadow-red-500">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-start gap-2  mb-4  ">
            <span className="text-xl text-white ">{location.city}</span>
            <MapPin className=" flexh-40 w-5 fill-white stroke-none " />
          </div>
          <div className="text-sm text-white mt-40">{location.date}</div>
        </div>
        <div className="flex items-center gap-4 text-white ">
          <div className="text-6xl font-light">
            {location.temp}°{unit}
          </div>
          <div className="text-6xl">{location.icon}</div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4">
        <div>
          <div className="text-sm text-zinc-200">HUMIDITY</div>
          <div className="text-xl text-white ">95%</div>
        </div>
        <div>
          <div className="text-sm text-zinc-200">VISIBILITY</div>
          <div className="text-xl text-white ">8km</div>
        </div>
        <div>
          <div className="text-sm text-zinc-200">AIR PRESSURE</div>
          <div className="text-xl text-white ">1005hPa</div>
        </div>
        <div>
          <div className="text-sm text-zinc-200">WIND</div>
          <div className="text-xl text-white ">2mph</div>
        </div>
      </div>
    </Card>
  );
}
