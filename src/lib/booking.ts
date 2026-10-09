import { BookingProviderLink } from '../types';

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
