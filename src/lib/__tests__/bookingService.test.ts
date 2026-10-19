import { describe, it, expect, beforeEach } from 'vitest';
import {
  calculateBookingPrice,
  validateBookingDates,
  generateBookingReference,
} from '../booking';
import { StorageService, SEED_SAMPLE_BOOKINGS } from '../storage';
import { Booking } from '../../types';

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

describe('Booking Service & Storage Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('calculates price breakdown correctly with demo 12% taxes and fees', () => {
    // 3 nights in future (e.g. November 2026), 2 rooms, ₹2000 nightly rate
    // Base: 2000 * 3 * 2 = 12000
    // Tax: 12000 * 0.12 = 1440
    // Total: 13440
    const breakdown = calculateBookingPrice(2000, '2026-11-10', '2026-11-13', 2);
    expect(breakdown.nightlyRate).toBe(2000);
    expect(breakdown.nights).toBe(3);
    expect(breakdown.rooms).toBe(2);
    expect(breakdown.baseAmount).toBe(12000);
    expect(breakdown.taxesAndFees).toBe(1440);
    expect(breakdown.totalAmount).toBe(13440);
  });

  it('validates booking dates rejecting past dates and inverted ranges', () => {
    const valid = validateBookingDates('2026-11-01', '2026-11-05');
    expect(valid.isValid).toBe(true);
    expect(valid.nights).toBe(4);

    const inverted = validateBookingDates('2026-11-05', '2026-11-01');
    expect(inverted.isValid).toBe(false);
    expect(inverted.error).toContain('Check-out date must be at least 1 day after check-in');

    const sameDay = validateBookingDates('2026-11-05', '2026-11-05');
    expect(sameDay.isValid).toBe(false);

    const pastDate = validateBookingDates('2020-01-01', '2020-01-05');
    expect(pastDate.isValid).toBe(false);
    expect(pastDate.error).toContain('past');
  });

  it('generates consistent, well-formed demo booking references', () => {
    const ref = generateBookingReference();
    expect(ref).toMatch(/^WF-DEMO-\d{4}-\d{4}$/);
  });

  it('initializes with seed sample demo bookings (upcoming, completed, cancelled)', () => {
    const bookings = StorageService.getBookings();
    expect(bookings.length).toBeGreaterThanOrEqual(3);

    const upcoming = bookings.find((b) => b.status === 'Confirmed');
    const completed = bookings.find((b) => b.status === 'Completed');
    const cancelled = bookings.find((b) => b.status === 'Cancelled');

    expect(upcoming).toBeDefined();
    expect(completed).toBeDefined();
    expect(cancelled).toBeDefined();
  });

  it('saves new demo booking and retrieves it by ID and reference', () => {
    const newBooking: Booking = {
      id: 'booking-test-999',
      bookingReference: 'WF-DEMO-2026-9999',
      userId: 'demo-user-01',
      destinationId: 'goa',
      destinationName: 'Goa',
      destinationLocation: 'Goa, India',
      destinationImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
      accommodationName: 'Anjuna Wave Eco-Cabanas',
      accommodationImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
      roomType: 'Bohemian Sunset Cabana',
      checkIn: '2026-11-10',
      checkOut: '2026-11-14',
      nights: 4,
      guests: { adults: 2, children: 0 },
      rooms: 1,
      guestDetails: {
        fullName: 'Test Traveler',
        email: 'test@wanderflow.app',
      },
      priceBreakdown: {
        nightlyRate: 2400,
        nights: 4,
        rooms: 1,
        baseAmount: 9600,
        taxesAndFees: 1152,
        totalAmount: 10752,
      },
      currency: 'INR',
      status: 'Confirmed',
      bookingType: 'demo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    StorageService.saveBooking(newBooking);

    const retrievedById = StorageService.getBookingById('booking-test-999');
    expect(retrievedById).toBeDefined();
    expect(retrievedById?.bookingReference).toBe('WF-DEMO-2026-9999');

    const retrievedByRef = StorageService.getBookingById('WF-DEMO-2026-9999');
    expect(retrievedByRef?.id).toBe('booking-test-999');
  });

  it('cancels an eligible booking while preserving the record in history', () => {
    const cancelled = StorageService.cancelBooking('booking-demo-01', 'Change of plans');
    expect(cancelled).toBeDefined();
    expect(cancelled?.status).toBe('Cancelled');
    expect(cancelled?.cancellationReason).toBe('Change of plans');
    expect(cancelled?.cancelledAt).toBeDefined();

    const stored = StorageService.getBookingById('booking-demo-01');
    expect(stored?.status).toBe('Cancelled');
  });

  it('resets demo bookings back to initial seed dataset on resetAllDemoData', () => {
    StorageService.deleteBooking('booking-demo-01');
    StorageService.resetAllDemoData();
    const bookings = StorageService.getBookings();
    expect(bookings.length).toBe(SEED_SAMPLE_BOOKINGS.length);
  });
});
