export type DestinationCategory =
  | 'Mountains'
  | 'Beaches'
  | 'Heritage'
  | 'Nature'
  | 'Adventure'
  | 'City Escapes';

export interface Attraction {
  name: string;
  description: string;
  type: string;
  estimatedTime: string;
  entryFee: string;
}

export interface SampleDayItinerary {
  dayNumber: number;
  title: string;
  activities: string[];
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  country: string;
  category: DestinationCategory;
  tags: string[];
  imageUrl: string;
  galleryImages: string[];
  shortDescription: string;
  fullDescription: string;
  budgetEstimate: {
    min: number;
    max: number;
    currency: string;
    durationDays: number;
  };
  estimatedDailyCost: number;
  bestTimeToVisit: string;
  climateType: string;
  latitude: number;
  longitude: number;
  popularityScore: number;
  suggestedDuration: string;
  highlights: string[];
  practicalTips: string[];
  topAttractions: Attraction[];
  sampleItinerary: SampleDayItinerary[];
}

export type ActivityCategory =
  | 'Sightseeing'
  | 'Food & Drink'
  | 'Adventure'
  | 'Transport'
  | 'Stay'
  | 'Relaxation';

export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  location: string;
  notes?: string;
  estimatedCost: number;
  category: ActivityCategory;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  themeTitle?: string;
  notes?: string;
  activities: ItineraryActivity[];
}

export type TripStatus = 'Draft' | 'Upcoming' | 'Completed';
export type TravelStyle = 'Budget Backpacker' | 'Balanced Explorer' | 'Student Group' | 'Scenic & Relaxed';

export interface Trip {
  id: string;
  userId: string;
  destinationId: string;
  destinationName: string;
  destinationImage: string;
  title: string;
  startDate: string;
  endDate: string;
  travelerCount: number;
  travelStyle: TravelStyle;
  preferencesNotes?: string;
  status: TripStatus;
  estimatedTotalBudget: number;
  days: ItineraryDay[];
  createdAt: string;
  updatedAt: string;
}

export interface GuideSection {
  heading: string;
  content: string;
  keyTips?: string[];
}

export interface TravelGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTimeMinutes: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  coverImage: string;
  summary: string;
  sections: GuideSection[];
  checklist?: string[];
}

export interface GroupTrip {
  id: string;
  title: string;
  destination: string;
  country: string;
  theme: string;
  vibe: string[];
  heroImage: string;
  datesDescription: string;
  durationDays: number;
  estimatedBudgetPerPerson: number;
  maxGroupSize: number;
  currentInterestedCount: number;
  targetAudience: string;
  description: string;
  itineraryHighlights: string[];
  safetyNotes: string[];
  hostOrganizer: string;
}

export interface GroupTripInterest {
  id: string;
  tripId: string;
  tripTitle: string;
  userName: string;
  userEmail: string;
  collegeOrCity: string;
  travelerCount: number;
  notes?: string;
  submittedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  college: string;
  bio: string;
  phone?: string;
  cityOrCountry?: string;
  preferredDestinations?: string[];
  travelStyle: TravelStyle;
  createdAt: string;
  updatedAt?: string;
}

export interface LiveWeatherData {
  temperature: number;
  apparentTemperature?: number;
  condition: string;
  weatherCode: number;
  windSpeed: number;
  humidity?: number;
  isLive: boolean;
  locationName: string;
  fetchedAt: string;
}

export interface BookingProviderLink {
  provider: 'Booking.com' | 'Skyscanner' | 'MakeMyTrip' | 'Agoda' | 'Airbnb' | 'Google Flights';
  serviceType: 'Hotels' | 'Flights' | 'Buses & Trains' | 'Experiences';
  url: string;
  recommendedFor: string;
}

export interface RoomType {
  id: string;
  name: string;
  pricePerNight: number;
  maxGuests: number;
  description: string;
}

export interface Accommodation {
  id: string;
  destinationId: string;
  name: string;
  type: 'Hostel' | 'Boutique Hotel' | 'Resort' | 'Heritage Stay' | 'Camp & Cabin';
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  imageUrl: string;
  galleryImages: string[];
  description: string;
  amenities: string[];
  roomTypes: RoomType[];
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface BookingGuestDetails {
  fullName: string;
  email: string;
  phone?: string;
  specialRequests?: string;
}

export interface BookingPriceBreakdown {
  nightlyRate: number;
  nights: number;
  rooms: number;
  baseAmount: number;
  taxesAndFees: number; // e.g. 12% sample GST/tourism fee
  discountAmount?: number;
  totalAmount: number;
}

export interface Booking {
  id: string;
  bookingReference: string; // e.g. WF-DEMO-2026-7841
  userId: string;
  destinationId: string;
  destinationName: string;
  destinationLocation: string;
  destinationImage: string;
  accommodationId?: string;
  accommodationName: string;
  accommodationImage: string;
  roomType?: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  guests: {
    adults: number;
    children: number;
  };
  rooms: number;
  guestDetails: BookingGuestDetails;
  priceBreakdown: BookingPriceBreakdown;
  currency: string;
  status: BookingStatus;
  bookingType: 'demo';
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

