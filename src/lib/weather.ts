import { LiveWeatherData } from '../types';

// Map WMO weather interpretation codes to readable conditions
export function getWeatherDescription(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code === 1) return 'Mainly Clear';
  if (code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Foggy & Mist';
  if (code >= 51 && code <= 55) return 'Light Drizzle';
  if (code >= 61 && code <= 65) return 'Rain Showers';
  if (code >= 71 && code <= 77) return 'Snow Fall';
  if (code >= 80 && code <= 82) return 'Heavy Showers';
  if (code >= 95 && code <= 99) return 'Thunderstorm';
  return 'Fair Weather';
}

export async function fetchLiveWeather(
  latitude: number,
  longitude: number,
  locationName: string
): Promise<LiveWeatherData> {
  const cacheKey = `weather_${latitude.toFixed(2)}_${longitude.toFixed(2)}`;
  
  // Check session cache first (5-minute validity)
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      const isFresh = Date.now() - new Date(parsed.fetchedAt).getTime() < 5 * 60 * 1000;
      if (isFresh) return parsed;
    }
  } catch {
    // sessionStorage error fallback
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
    const response = await fetch(url, { signal: AbortSignal.timeout(6000) });

    if (!response.ok) {
      throw new Error(`Weather service returned ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;

    const weatherResult: LiveWeatherData = {
      temperature: Math.round(current.temperature_2m),
      apparentTemperature: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      weatherCode: current.weather_code,
      condition: getWeatherDescription(current.weather_code),
      isLive: true,
      locationName,
      fetchedAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(weatherResult));
    } catch {
      // ignore
    }

    return weatherResult;
  } catch (error) {
    console.warn(`[Wanderflow Weather] Live fetch failed for ${locationName}, falling back to climate estimates:`, error);
    
    // Transparent sample fallback
    return {
      temperature: 22,
      apparentTemperature: 21,
      humidity: 55,
      windSpeed: 10,
      weatherCode: 2,
      condition: 'Pleasant & Mild (Sample Data)',
      isLive: false,
      locationName,
      fetchedAt: new Date().toISOString(),
    };
  }
}
