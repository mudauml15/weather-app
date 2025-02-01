"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { WeatherCard } from "./WeatherCard";
import { TimelineCard } from "./TimelineCard";
import {
  getWeatherByCity,
  getForecast,
  type WeatherData,
  type ForecastData,
} from "@/lib/weather";
interface TodayViewProps {
  unit: string;
}

export function TodayView({ unit }: TodayViewProps) {
  const [mainCarouselRef, mainCarouselApi] = useEmblaCarousel();
  const [timelineCarouselRef] = useEmblaCarousel({ dragFree: true, containScroll: "trimSnaps" });
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [timelineData, setTimelineData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cities = ["London", "New York", "Tokyo"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch weather for all cities
        const weatherPromises = cities.map(city => getWeatherByCity(city, unit));
        const weatherResults = await Promise.all(weatherPromises);
        setWeatherData(weatherResults);

        // Fetch timeline for the first city
        const timelineResult = await getForecast(cities[0], unit);
        setTimelineData(timelineResult);
      } catch (err) {
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [unit]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-xl">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 grid grid-cols-[auto_1fr_auto] gap-4 p-4">
        <button 
          onClick={() => mainCarouselApi?.scrollPrev()}
          className="flex items-center justify-center rounded-xl bg-emerald-500 px-4 hover:bg-emerald-600 transition-colors"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <div className="overflow-hidden" ref={mainCarouselRef}>
          <div className="flex h-full">
            {weatherData.map((data, i) => (
              <div className="flex-[0_0_100%]" key={i}>
                <WeatherCard location={data} unit={unit} />
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => mainCarouselApi?.scrollNext()}
          className="flex items-center justify-center rounded-xl bg-emerald-500 px-4 hover:bg-emerald-600 transition-colors"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      <div className="p-4 bg-zinc-800/30">
        <div className="overflow-hidden" ref={timelineCarouselRef}>
          <div className="flex gap-4">
            {timelineData.map((slot, i) => (
              <TimelineCard key={i} {...slot} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}