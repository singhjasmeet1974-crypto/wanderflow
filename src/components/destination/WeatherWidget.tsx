import React, { useEffect, useState } from 'react';
import { LiveWeatherData } from '../../types';
import { fetchLiveWeather } from '../../lib/weather';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplets,
  RefreshCw,
  Sparkles,
  Info,
} from 'lucide-react';

interface WeatherWidgetProps {
  latitude: number;
  longitude: number;
  locationName: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  latitude,
  longitude,
  locationName,
}) => {
  const [weather, setWeather] = useState<LiveWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLiveWeather(latitude, longitude, locationName);
      setWeather(data);
    } catch {
      setError('Live weather is temporarily unavailable for this location.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, [latitude, longitude, locationName]);

  const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return <Sun className="w-8 h-8 text-[#E5A43B]" />;
    if (code === 2 || code === 3) return <Cloud className="w-8 h-8 text-sky-400" />;
    if (code >= 51 && code <= 65) return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (code >= 71 && code <= 77) return <CloudSnow className="w-8 h-8 text-indigo-300" />;
    if (code >= 95) return <CloudLightning className="w-8 h-8 text-amber-500" />;
    return <Sun className="w-8 h-8 text-[#E5A43B]" />;
  };

  if (loading) {
    return (
      <div className="p-5 rounded-2xl bg-white border border-[#E6E2D8] flex items-center justify-center gap-3 text-stone-500 text-sm">
        <RefreshCw className="w-4 h-4 animate-spin text-[#16382B]" />
        <span>Fetching live meteorological forecast from Open-Meteo...</span>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-600 text-xs flex items-center gap-2">
        <Info className="w-4 h-4 text-stone-400" />
        <span>{error || 'Weather forecast unavailable.'}</span>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#FAF9F6] border border-[#E6E2D8] shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
            Current Weather
          </span>
          {weather.isLive ? (
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Open-Meteo API
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
              <Info className="w-3 h-3 text-amber-600" />
              Demo Climate Estimate
            </span>
          )}
        </div>

        <button
          onClick={loadWeather}
          title="Refresh current meteorological reading"
          className="text-stone-400 hover:text-stone-700 p-1 rounded-md transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {getWeatherIcon(weather.weatherCode)}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-stone-900">
                {weather.temperature}°C
              </span>
              {weather.apparentTemperature !== undefined && (
                <span className="text-xs text-stone-500">
                  (Feels like {weather.apparentTemperature}°C)
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-stone-700">{weather.condition}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-right text-xs text-stone-500 border-l border-stone-200 pl-4">
          <div className="flex items-center gap-1.5 justify-end">
            <Wind className="w-3.5 h-3.5 text-stone-400" />
            <span>{weather.windSpeed} km/h wind</span>
          </div>
          {weather.humidity !== undefined && (
            <div className="flex items-center gap-1.5 justify-end">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              <span>{weather.humidity}% humidity</span>
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 pt-2 text-[10px] text-stone-400 border-t border-stone-100 flex items-center justify-between">
        <span>Station coordinates: {latitude.toFixed(2)}°N, {longitude.toFixed(2)}°E</span>
        <span>Checked: {new Date(weather.fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </p>
    </div>
  );
};
