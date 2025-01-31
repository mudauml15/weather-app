"use client";

import { Switch } from "@/components/ui/switch";

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  unit: string;
  setUnit: (unit: string) => void;
}

export function Header({ activeView, setActiveView, unit, setUnit }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold">WeatherMe</div>
        <div className="text-sm text-zinc-400">21:00 pm</div>
      </div>
      <nav className="flex gap-8">
        {["today", "tomorrow", "monthly"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`pb-1 capitalize ${
              activeView === view
                ? "border-b-2 border-white"
                : "text-zinc-400"
            }`}
          >
            {view === "monthly" ? "Monthly Forecast" : view}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <span>°C</span>
        <Switch
          checked={unit === "F"}
          onCheckedChange={(checked) => setUnit(checked ? "F" : "C")}
        />
        <span>°F</span>
      </div>
    </div>
  );
}