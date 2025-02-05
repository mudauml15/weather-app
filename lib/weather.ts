const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  city: string;
  temp: number;
  humidity: number;
  visibility: number;
  pressure: number;
  wind: number;
  icon: string;
  date: string;
}

export interface ForecastData {
  time: string;
  temp: number;
  icon: string;
}

const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);
const kelvinToFahrenheit = (kelvin: number) =>
  Math.round(((kelvin - 273.15) * 9) / 5 + 32);

const getWeatherIcon = (code: string) => {
  const iconMap: { [key: string]: string } = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "🌤️",
    "02n": "🌤️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌧️",
    "10n": "🌧️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };
  return iconMap[code] || "☁️";
};

export const getWeatherByCity = async (
  city: string,
  unit: string = "C"
): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
  const temp =
    unit === "C"
      ? kelvinToCelsius(data.main.temp)
      : kelvinToFahrenheit(data.main.temp);

  return {
    city: data.name,
    temp,
    humidity: data.main.humidity,
    visibility: Math.round(data.visibility / 1000),
    pressure: data.main.pressure,
    wind: Math.round(data.wind.speed * 2.237),
    icon: getWeatherIcon(data.weather[0].icon),
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      weekday: "short",
    }),
  };
};

export const getForecast = async (
  city: string,
  unit: string = "C"
): Promise<ForecastData[]> => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }

  const data = await response.json();

  return data.list.slice(0, 7).map((item: any) => ({
    time: new Date(item.dt * 1000)
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase(),
    temp:
      unit === "C"
        ? kelvinToCelsius(item.main.temp)
        : kelvinToFahrenheit(item.main.temp),
    icon: getWeatherIcon(item.weather[0].icon),
  }));
};

export const getDailyForecast = async (city: string, unit: string = "C") => {
  const response = await fetch(
    `${BASE_URL}/forecast/daily?q=${city}&cnt=16&appid=${API_KEY}`
  );

  if (!response.ok) {
    const regularForecast = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`
    );

    if (!regularForecast.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const data = await regularForecast.json();

    const dailyData = data.list.reduce((acc: any[], item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      const existing = acc.find((d: any) => d.date === date);

      if (!existing) {
        acc.push({
          date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          high: item.main.temp_max,
          low: item.main.temp_min,
          icon: item.weather[0].icon,
        });
      } else {
        existing.high = Math.max(existing.high, item.main.temp_max);
        existing.low = Math.min(existing.low, item.main.temp_min);
      }

      return acc;
    }, []);

    return dailyData.slice(0, 6).map((day: any) => ({
      ...day,
      high:
        unit === "C" ? kelvinToCelsius(day.high) : kelvinToFahrenheit(day.high),
      low:
        unit === "C" ? kelvinToCelsius(day.low) : kelvinToFahrenheit(day.low),
      icon: getWeatherIcon(day.icon),
    }));
  }

  const data = await response.json();
  return data.list.map((item: any) => ({
    date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    high:
      unit === "C"
        ? kelvinToCelsius(item.temp.max)
        : kelvinToFahrenheit(item.temp.max),
    low:
      unit === "C"
        ? kelvinToCelsius(item.temp.min)
        : kelvinToFahrenheit(item.temp.min),
    icon: getWeatherIcon(item.weather[0].icon),
  }));
};
