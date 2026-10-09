import { describe, it, expect, beforeEach } from 'vitest';
import { DestinationService, ADDITIONAL_POPULAR_DESTINATIONS } from '../destinationService';
import { DESTINATIONS } from '../../data/destinations';

// Mock localStorage for test isolation
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('DestinationService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('retrieves all destinations including base and additional popular catalogues', () => {
    const all = DestinationService.getAllDestinations();
    expect(all.length).toBeGreaterThanOrEqual(DESTINATIONS.length + ADDITIONAL_POPULAR_DESTINATIONS.length);
    expect(all.some((d) => d.id === 'manali')).toBe(true);
    expect(all.some((d) => d.id === 'shimla')).toBe(true);
    expect(all.some((d) => d.id === 'tokyo')).toBe(true);
  });

  it('finds existing destinations by exact ID or slug', () => {
    const manali = DestinationService.getDestinationById('manali');
    expect(manali).toBeDefined();
    expect(manali?.name).toBe('Manali');

    const shimla = DestinationService.getDestinationById('shimla');
    expect(shimla).toBeDefined();
    expect(shimla?.name).toBe('Shimla');
    expect(shimla?.region).toBe('Himachal Pradesh');
  });

  it('performs case-insensitive and tag-based search on known catalogue', () => {
    const resGoa = DestinationService.searchDestinations('goa');
    expect(resGoa.results.length).toBeGreaterThanOrEqual(1);
    expect(resGoa.results[0].name.toLowerCase()).toContain('goa');

    const resToyTrain = DestinationService.searchDestinations('toy train');
    expect(resToyTrain.results.length).toBeGreaterThanOrEqual(1);
  });

  it('tolerates small typos with fuzzy matching', () => {
    const resTypo = DestinationService.searchDestinations('manli');
    expect(resTypo.results.length).toBeGreaterThanOrEqual(1);
    expect(resTypo.results[0].name).toBe('Manali');
  });

  it('dynamically generates and returns complete destination when searching unlisted places', () => {
    const res = DestinationService.searchDestinations('Kyoto');
    expect(res.results.length).toBeGreaterThan(0);
    expect(res.hasDynamicDiscovery).toBe(true);
    expect(res.generatedDestination).toBeDefined();

    const generated = res.generatedDestination!;
    expect(generated.name).toBe('Kyoto');
    expect(generated.id).toContain('discovered-kyoto');
    expect(generated.imageUrl).toBeTruthy();
    expect(generated.budgetEstimate.min).toBeGreaterThan(0);
    expect(generated.latitude).toBeDefined();
    expect(generated.longitude).toBeDefined();
    expect(generated.topAttractions.length).toBeGreaterThanOrEqual(2);
    expect(generated.sampleItinerary.length).toBeGreaterThanOrEqual(2);
  });

  it('dynamically synthesizes on-demand when looking up unlisted destination ID directly', () => {
    const custom = DestinationService.getDestinationById('santorini');
    expect(custom).toBeDefined();
    expect(custom?.name).toBe('Santorini');
    expect(custom?.category).toBe('Beaches');
  });

  it('provides quick autocompletion suggestions', () => {
    const suggestions = DestinationService.getSuggestions('sh');
    expect(suggestions.length).toBeGreaterThanOrEqual(1);
    expect(suggestions.some((s) => s.name.toLowerCase().includes('sh'))).toBe(true);
  });
});
