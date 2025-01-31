"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { WeatherCard } from "./WeatherCard";
import { TimelineCard } from "./TimelineCard";

interface TodayViewProps {
  unit: string;
}

export function TodayView({ unit }: TodayViewProps) {
  const [mainCarouselRef, mainCarouselApi] = useEmblaCarousel();
  const [timelineCarouselRef] = useEmblaCarousel({ dragFree: true, containScroll: "trimSnaps" });

  const locations = [
    { city: "Burdwan", temp: "27", icon: "☁️", date: "Aug 23, Tue" },
    { city: "Kolkata", temp: "29", icon: "🌤️", date: "Aug 23, Tue" },
    { city: "Mumbai", temp: "31", icon: "☀️", date: "Aug 23, Tue" },
  ];

  const timeSlots = [
    { time: "19:00 pm", temp: "29°", icon: "🌧️" },
    { time: "21:00 pm", temp: "27°", icon: "☁️" },
    { time: "23:00pm", temp: "27°", icon: "⛈️" },
    { time: "1:00am", temp: "26°", icon: "🌧️" },
    { time: "3:00am", temp: "25°", icon: "⛈️" },
    { time: "5:00am", temp: "31°", icon: "🌧️" },
    { time: "7:00am", temp: "27°", icon: "☁️" },
  ];

  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto] gap-4">
        <button 
          onClick={() => mainCarouselApi?.scrollPrev()}
          className="flex h-full items-center justify-center rounded-xl bg-emerald-500 px-4 hover:bg-emerald-600 transition-colors"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <div className="overflow-hidden" ref={mainCarouselRef}>
          <div className="flex">
            {locations.map((location, i) => (
              <div className="flex-[0_0_100%]" key={i}>
                <WeatherCard location={location} unit={unit} />
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => mainCarouselApi?.scrollNext()}
          className="flex h-full items-center justify-center rounded-xl bg-emerald-500 px-4 hover:bg-emerald-600 transition-colors"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      <div className="overflow-hidden mt-8" ref={timelineCarouselRef}>
        <div className="flex gap-4">
          {timeSlots.map((slot, i) => (
            <TimelineCard key={i} {...slot} />
          ))}
        </div>
      </div>
    </>
  );
}