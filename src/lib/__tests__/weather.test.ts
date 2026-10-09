import { describe, it, expect } from 'vitest';
import { getWeatherDescription } from '../weather';

describe('Weather Interpretation Service', () => {
  it('correctly maps clear sky WMO codes', () => {
    expect(getWeatherDescription(0)).toBe('Clear Sky');
    expect(getWeatherDescription(1)).toBe('Mainly Clear');
  });

  it('correctly maps cloudy and overcast codes', () => {
    expect(getWeatherDescription(2)).toBe('Partly Cloudy');
    expect(getWeatherDescription(3)).toBe('Overcast');
  });

  it('correctly maps precipitation codes', () => {
    expect(getWeatherDescription(61)).toBe('Rain Showers');
    expect(getWeatherDescription(71)).toBe('Snow Fall');
    expect(getWeatherDescription(95)).toBe('Thunderstorm');
  });

  it('provides safe fallback for unknown weather codes', () => {
    expect(getWeatherDescription(999)).toBe('Fair Weather');
  });
});
