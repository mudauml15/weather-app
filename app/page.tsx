"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Header } from "@/components/weather/Header";
import { SearchBar } from "@/components/weather/SearchBar";
import { TodayView } from "@/components/weather/TodayView";
import { TomorrowView } from "@/components/weather/TomorrowView";
import { MonthlyView } from "@/components/weather/MonthlyView";

export default function Home() {
  const [unit, setUnit] = useState("C");
  const [activeView, setActiveView] = useState("today");

  return (
    <main className="h-screen bg-[#1E1E1E] text-white flex flex-col">
      <div className="flex-1 flex flex-col">
        <Header
          activeView={activeView}
          setActiveView={setActiveView}
          unit={""}
          setUnit={function (unit: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className=" to-zinc-900 p-4">
          <div className="flex items-center gap-3 w-fit bg-gradient-to-r from-[#57a46a] to-[#343434] px-4 py-2 rounded-full ml-4">
            <span
              className={`text-sm font-medium ${
                unit === "C" ? "text-white" : "text-zinc-400"
              }`}
            >
              °C
            </span>
            <Switch
              checked={unit === "F"}
              onCheckedChange={(checked) => setUnit(checked ? "F" : "C")}
              className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-zinc-900"
            />
            <span
              className={`text-sm font-medium ${
                unit === "F" ? "text-white" : "text-zinc-400"
              }`}
            >
              °F
            </span>
          </div>
        </div>
        <SearchBar />
        <div className="flex-1">
          {activeView === "today" && <TodayView unit={unit} />}
          {activeView === "tomorrow" && <TomorrowView unit={unit} />}
          {activeView === "monthly" && <MonthlyView />}
        </div>
      </div>
    </main>
  );
}
