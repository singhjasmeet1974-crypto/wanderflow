import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService, DEFAULT_DEMO_USER } from '../storage';
import { Trip } from '../../types';

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

describe('StorageService Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default demo user if unauthenticated', () => {
    const user = StorageService.getUserProfile();
    expect(user).toBeDefined();
    expect(user?.fullName).toBe(DEFAULT_DEMO_USER.fullName);
    expect(user?.college).toContain('Wanderflow');
  });

  it('saves and updates custom user profile', () => {
    const updated = {
      ...DEFAULT_DEMO_USER,
      fullName: 'Simranjeet Kaur',
      bio: 'Exploring Punjab & Himachal trails',
    };
    StorageService.setUserProfile(updated);
    const retrieved = StorageService.getUserProfile();
    expect(retrieved?.fullName).toBe('Simranjeet Kaur');
  });

  it('initializes with seed sample trip for demo presentation', () => {
    const trips = StorageService.getTrips();
    expect(trips.length).toBeGreaterThanOrEqual(1);
    expect(trips[0].destinationName).toContain('Manali');
    expect(trips[0].days.length).toBeGreaterThanOrEqual(3);
  });

  it('supports creating, updating, and deleting trips', () => {
    const newTrip: Trip = {
      id: 'test-trip-99',
      userId: 'test-user',
      destinationId: 'amritsar',
      destinationName: 'Amritsar, Punjab',
      destinationImage: 'https://example.com/amritsar.jpg',
      title: 'Golden Temple Weekend',
      startDate: '2026-06-01',
      endDate: '2026-06-03',
      travelerCount: 2,
      travelStyle: 'Student Group',
      status: 'Upcoming',
      estimatedTotalBudget: 4000,
      days: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    StorageService.saveTrip(newTrip);
    const retrieved = StorageService.getTripById('test-trip-99');
    expect(retrieved?.title).toBe('Golden Temple Weekend');

    // Delete
    StorageService.deleteTrip('test-trip-99');
    expect(StorageService.getTripById('test-trip-99')).toBeNull();
  });

  it('manages saved destination bookmarks', () => {
    const saved = StorageService.toggleSaveDestination('goa');
    expect(saved).toBe(true);
    expect(StorageService.isDestinationSaved('goa')).toBe(true);

    const unSaved = StorageService.toggleSaveDestination('goa');
    expect(unSaved).toBe(false);
    expect(StorageService.isDestinationSaved('goa')).toBe(false);
  });
});
