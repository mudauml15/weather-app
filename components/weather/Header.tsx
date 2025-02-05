"use client";

import { Switch } from "@/components/ui/switch";

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  unit: string;
  setUnit: (unit: string) => void;
}

export function Header({
  activeView,
  setActiveView,
  unit,
  setUnit,
}: HeaderProps) {
  return (
    <div className="w-full">
      <img src="/Group48.png" className="" alt="weather" />

      <div className="flex items-center justify-between mb-8 mt-[-2rem] bg-[#1E1E1E] mx-20">
        <div className="flex items-center flex-col w-60">
          <div className="text-5xl mt-6">WeatherMe </div>

          <div className="text-1xl font-bold text-white text-right w-60">
            21:00 pm
          </div>
        </div>
        <nav className="flex gap-8 text-2xl ">
          {["today", "tomorrow", "monthly"].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`pb-1 capitalize ${
                activeView === view
                  ? "border-b-2 border-white font-bold"
                  : "text-zinc-400 font-normal "
              }`}
            >
              {view === "monthly" ? "Monthly Forecast" : view}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2"></div>
      </div>
    </div>
  );
}
