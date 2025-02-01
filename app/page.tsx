"use client";

import { useState } from "react";
import { Header } from "@/components/weather/Header";
import { SearchBar } from "@/components/weather/SearchBar";
import { TodayView } from "@/components/weather/TodayView";
import { TomorrowView } from "@/components/weather/TomorrowView";
import { MonthlyView } from "@/components/weather/MonthlyView";

export default function Home() {
  const [unit, setUnit] = useState("C");
  const [activeView, setActiveView] = useState("today");

  return (
    <main className="h-screen bg-zinc-900 text-white flex flex-col">
      <div className="flex-1 flex flex-col">
        <Header
          activeView={activeView}
          setActiveView={setActiveView}
          unit={unit}
          setUnit={setUnit}
        />
        <SearchBar />
        
        {activeView === "today" && <TodayView unit={unit} />}
        {activeView === "tomorrow" && <TomorrowView unit={unit} />}
        {activeView === "monthly" && <MonthlyView />}
      </div>
    </main>
  );
}