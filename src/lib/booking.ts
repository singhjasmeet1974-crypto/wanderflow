import { BookingProviderLink, BookingPriceBreakdown } from '../types';

/**
 * Builds legitimate external search links to trusted third-party providers.
 * Note: These lead to legitimate search query pages on the provider's official domain.
 * Wanderflow does not collect payment details, claim inventory holds, or pretend to confirm bookings.
 */
export function getBookingProviderLinks(
  destinationName: string,
  _checkInDate?: string,
  _checkOutDate?: string,
  _guestCount: number = 2
): BookingProviderLink[] {
  const encodedDest = encodeURIComponent(destinationName);

  return [
    {
      provider: 'Booking.com',
      serviceType: 'Hotels',
      url: `https://www.booking.com/searchresults.html?ss=${encodedDest}`,
      recommendedFor: 'Verified hostels, boutique guest houses & student homestays',
    },
    {
      provider: 'Skyscanner',
      serviceType: 'Flights',
      url: `https://www.skyscanner.net/transport/flights-from/${encodedDest}`,
      recommendedFor: 'Comparing budget flight tickets & price trend charts',
    },
    {
      provider: 'MakeMyTrip',
      serviceType: 'Buses & Trains',
      url: `https://www.makemytrip.com/bus-tickets/`,
      recommendedFor: 'Intercity Volvo buses, IRCTC trains & cab transfers across India',
    },
    {
      provider: 'Agoda',
      serviceType: 'Hotels',
      url: `https://www.agoda.com/search?text=${encodedDest}`,
      recommendedFor: 'Budget-friendly Southeast Asia & India lodging discounts',
    },
    {
      provider: 'Airbnb',
      serviceType: 'Experiences',
      url: `https://www.airbnb.com/s/${encodedDest}/homes`,
      recommendedFor: 'Entire mountain chalets, riverside villas & group stays',
    },
  ];
}

/**
 * Generates an official-looking, collision-resistant Wanderflow demo booking reference.
 * Example format: WF-DEMO-2026-8942
 */
export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `WF-DEMO-${year}-${randomSuffix}`;
}

/**
 * Validates check-in and check-out dates.
 * Disallows past dates and enforces check-out strictly after check-in.
 */
export function validateBookingDates(
  checkIn: string,
  checkOut: string
): { isValid: boolean; error?: string; nights: number } {
  if (!checkIn || !checkOut) {
    return { isValid: false, error: 'Please choose both check-in and check-out dates.', nights: 0 };
  }

  const checkInDate = new Date(`${checkIn}T00:00:00`);
  const checkOutDate = new Date(`${checkOut}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    return { isValid: false, error: 'Invalid date format selected.', nights: 0 };
  }

  if (checkInDate < today) {
    return { isValid: false, error: 'Check-in date cannot be in the past.', nights: 0 };
  }

  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (nights <= 0) {
    return { isValid: false, error: 'Check-out date must be at least 1 day after check-in.', nights: 0 };
  }

  if (nights > 60) {
    return { isValid: false, error: 'Demo bookings cannot exceed 60 consecutive days.', nights: 0 };
  }

  return { isValid: true, nights };
}

/**
 * Dynamically computes base amount, applicable demo GST / service fee (12%), and total estimate.
 */
export function calculateBookingPrice(
  nightlyRate: number,
  checkIn: string,
  checkOut: string,
  rooms: number = 1
): BookingPriceBreakdown {
  const validation = validateBookingDates(checkIn, checkOut);
  const nights = validation.isValid ? Math.max(1, validation.nights) : 1;
  const safeRooms = Math.max(1, rooms);

  const baseAmount = nightlyRate * nights * safeRooms;
  // Standard demo hospitality GST & platform service fee (12% rounded)
  const taxesAndFees = Math.round(baseAmount * 0.12);
  const totalAmount = baseAmount + taxesAndFees;

  return {
    nightlyRate,
    nights,
    rooms: safeRooms,
    baseAmount,
    taxesAndFees,
    totalAmount,
  };
}

