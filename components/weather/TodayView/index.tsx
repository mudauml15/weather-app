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
  const [timelineCarouselRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [timelineData, setTimelineData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState("Pretoria,ZA");

  const cities = ["Pretoria,ZA", "Johannesburg,ZA", "Durban,ZA"];
  const cityDisplayNames = ["Pretoria", "Johannesburg", "Durban"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch weather for all cities
        const weatherPromises = cities.map((city) =>
          getWeatherByCity(city, unit)
        );
        const weatherResults = await Promise.all(weatherPromises);

        // Update the city names to display names
        const formattedResults = weatherResults.map((data, index) => ({
          ...data,
          city: cityDisplayNames[index],
        }));

        setWeatherData(formattedResults);

        // Fetch timeline for the selected city
        const timelineResult = await getForecast(selectedCity, unit);
        setTimelineData(timelineResult);
      } catch (err) {
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [unit, selectedCity]);

  const handleSlideChange = () => {
    const currentSlide = mainCarouselApi?.selectedScrollSnap() || 0;
    setSelectedCity(cities[currentSlide]);
  };

  useEffect(() => {
    if (mainCarouselApi) {
      mainCarouselApi.on("select", handleSlideChange);
      return () => {
        mainCarouselApi.off("select", handleSlideChange);
      };
    }
  }, [mainCarouselApi]);

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
    
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 md:gap-8 p-2 sm:p-4">
  
        <button
          onClick={() => mainCarouselApi?.scrollPrev()}
          className="hidden md:flex items-center justify-center rounded-xl bg-gradient-to-r from-[#077989] to-[#10C99C] 
          px-4 sm:px-12 transition-colors hover:opacity-90"
        >
          <ChevronLeft className="h-8 w-8 sm:h-12 sm:w-12 text-black" />
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
          className="hidden md:flex items-center justify-center rounded-xl bg-gradient-to-r from-[#077989] to-[#10C99C] 
          px-4 sm:px-12 transition-colors hover:opacity-90"
        >
          <ChevronRight className="h-8 w-8 sm:h-12 sm:w-12 text-black" />
        </button>

        <div className="flex justify-center gap-4 md:hidden">
          <button
            onClick={() => mainCarouselApi?.scrollPrev()}
            className="flex items-center justify-center rounded-xl bg-gradient-to-r from-[#077989] to-[#10C99C] 
            p-2 transition-colors hover:opacity-90"
          >
            <ChevronLeft className="h-6 w-6 text-black" />
          </button>
          <button
            onClick={() => mainCarouselApi?.scrollNext()}
            className="flex items-center justify-center rounded-xl bg-gradient-to-r from-[#077989] to-[#10C99C] 
            p-2 transition-colors hover:opacity-90"
          >
            <ChevronRight className="h-6 w-6 text-black" />
          </button>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 bg-[#1e1e1e] p-4">
        <div
          className="overflow-hidden gap-4 sm:gap-8"
          ref={timelineCarouselRef}
        >
          <div className="flex gap-2 sm:gap-4">
            {timelineData.map((slot, i) => (
              <TimelineCard key={i} {...slot} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
