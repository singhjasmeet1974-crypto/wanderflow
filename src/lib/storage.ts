import { Trip, UserProfile, GroupTripInterest, Booking } from '../types';
import { DESTINATIONS } from '../data/destinations';

const STORAGE_KEYS = {
  USER_PROFILE: 'wanderflow_user_profile',
  AUTH_TOKEN: 'wanderflow_auth_token',
  TRIPS: 'wanderflow_user_trips',
  SAVED_DESTINATIONS: 'wanderflow_saved_destinations',
  GROUP_INTERESTS: 'wanderflow_group_interests',
  BOOKINGS: 'wanderflow_user_bookings',
  IS_DEMO: 'wanderflow_is_demo_mode',
};

export const DEFAULT_DEMO_USER: UserProfile = {
  id: 'demo-user-01',
  email: 'aarav.sharma@wanderflow.app',
  fullName: 'Aarav Sharma',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  college: 'Wanderflow Explorers Club (GNDEC Ludhiana)',
  bio: 'Passionate backpacker, mountain lover, and lead explorer at Wanderflow.',
  phone: '+91 98765 43210',
  cityOrCountry: 'Ludhiana, Punjab, India',
  preferredDestinations: ['manali', 'amritsar', 'rishikesh', 'goa'],
  travelStyle: 'Student Group',
  createdAt: '2026-02-15T10:00:00Z',
  updatedAt: '2026-03-01T14:30:00Z',
};

// Seed sample demo bookings for testing
export const SEED_SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 'booking-demo-01',
    bookingReference: 'WF-DEMO-2026-9182',
    userId: 'demo-user-01',
    destinationId: 'manali',
    destinationName: 'Manali',
    destinationLocation: 'Himachal Pradesh, India',
    destinationImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
    accommodationId: 'acc-manali-zostel',
    accommodationName: 'Zostel Old Manali Riverside',
    accommodationImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    roomType: 'Private Himalayan Balcony Suite',
    checkIn: '2026-05-18',
    checkOut: '2026-05-22',
    nights: 4,
    guests: {
      adults: 2,
      children: 0,
    },
    rooms: 1,
    guestDetails: {
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@wanderflow.app',
      phone: '+91 98765 43210',
      specialRequests: 'Upper floor room with valley view; arriving late via Volvo bus from Chandigarh.',
    },
    priceBreakdown: {
      nightlyRate: 3499,
      nights: 4,
      rooms: 1,
      baseAmount: 13996,
      taxesAndFees: 1680,
      totalAmount: 15676,
    },
    currency: 'INR',
    status: 'Confirmed',
    bookingType: 'demo',
    createdAt: '2026-03-05T11:20:00Z',
    updatedAt: '2026-03-05T11:20:00Z',
  },
  {
    id: 'booking-demo-02',
    bookingReference: 'WF-DEMO-2026-4419',
    userId: 'demo-user-01',
    destinationId: 'amritsar',
    destinationName: 'Amritsar',
    destinationLocation: 'Punjab, India',
    destinationImage: 'https://images.unsplash.com/photo-1588096344356-9a2c85f7a079?auto=format&fit=crop&w=1000&q=80',
    accommodationId: 'acc-amritsar-heritage',
    accommodationName: 'Golden Heritage Boutique Haveli',
    accommodationImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    roomType: 'Maharaja Heritage Room',
    checkIn: '2026-03-10',
    checkOut: '2026-03-12',
    nights: 2,
    guests: {
      adults: 2,
      children: 0,
    },
    rooms: 1,
    guestDetails: {
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@wanderflow.app',
      phone: '+91 98765 43210',
      specialRequests: 'Walking distance to Sri Harmandir Sahib morning Palki Sahib ceremony.',
    },
    priceBreakdown: {
      nightlyRate: 2750,
      nights: 2,
      rooms: 1,
      baseAmount: 5500,
      taxesAndFees: 660,
      totalAmount: 6160,
    },
    currency: 'INR',
    status: 'Completed',
    bookingType: 'demo',
    createdAt: '2026-02-28T09:15:00Z',
    updatedAt: '2026-03-12T12:00:00Z',
  },
  {
    id: 'booking-demo-03',
    bookingReference: 'WF-DEMO-2026-1204',
    userId: 'demo-user-01',
    destinationId: 'rishikesh',
    destinationName: 'Rishikesh',
    destinationLocation: 'Uttarakhand, India',
    destinationImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    accommodationId: 'acc-rishikesh-retreat',
    accommodationName: 'Ganga View Eco-Camp & Yoga Shala',
    accommodationImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    roomType: 'Luxury River Safari Tent',
    checkIn: '2026-04-05',
    checkOut: '2026-04-08',
    nights: 3,
    guests: {
      adults: 3,
      children: 0,
    },
    rooms: 2,
    guestDetails: {
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@wanderflow.app',
      phone: '+91 98765 43210',
      specialRequests: 'River rafting package inquiry.',
    },
    priceBreakdown: {
      nightlyRate: 1850,
      nights: 3,
      rooms: 2,
      baseAmount: 11100,
      taxesAndFees: 1332,
      totalAmount: 12432,
    },
    currency: 'INR',
    status: 'Cancelled',
    bookingType: 'demo',
    cancellationReason: 'College mid-term examination dates were rescheduled to early April.',
    cancelledAt: '2026-03-15T16:45:00Z',
    createdAt: '2026-03-02T14:10:00Z',
    updatedAt: '2026-03-15T16:45:00Z',
  },
];


// Seed sample trip for demo
const SEED_SAMPLE_TRIP: Trip = {
  id: 'trip-manali-demo-101',
  userId: 'demo-user-01',
  destinationId: 'manali',
  destinationName: 'Manali, Himachal Pradesh',
  destinationImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
  title: 'Himalayan Mountain Escape with College Squad',
  startDate: '2026-05-18',
  endDate: '2026-05-22',
  travelerCount: 4,
  travelStyle: 'Student Group',
  preferencesNotes: 'Focus on Old Manali cafes, Atal tunnel drive, river rafting in Beas, and a sunrise hike to Jogini Falls.',
  status: 'Upcoming',
  estimatedTotalBudget: 28000,
  days: [
    {
      dayNumber: 1,
      date: '2026-05-18',
      themeTitle: 'Arrival & Old Manali Vibe Check',
      notes: 'Check-in at Zostel Old Manali, pick up rental scooters, unpack and explore.',
      activities: [
        {
          id: 'act-1-1',
          time: '08:30 AM',
          title: 'Volvo Bus Arrival at Manali Private Bus Stand',
          location: 'Mall Road Bus Stop, Manali',
          notes: 'Shared auto to Old Manali bridge (₹150 for 4 pax).',
          estimatedCost: 200,
          category: 'Transport',
        },
        {
          id: 'act-1-2',
          time: '11:00 AM',
          title: 'Visit Historic Hadimba Devi Temple',
          location: 'Dhungri Forest, Hadimba Temple',
          notes: 'Admire 500-year-old carved deodar wood architecture.',
          estimatedCost: 100,
          category: 'Sightseeing',
        },
        {
          id: 'act-1-3',
          time: '02:00 PM',
          title: 'Wood-fired Pizza & Acoustic Jam at Cafe 1947',
          location: 'Old Manali Riverside',
          notes: 'Try their signature trout pasta and thin-crust pizza beside the river.',
          estimatedCost: 1400,
          category: 'Food & Drink',
        },
        {
          id: 'act-1-4',
          time: '05:30 PM',
          title: 'Sunset Walk through Apple Orchards',
          location: 'Upper Clubhouse Road',
          notes: 'Catch evening golden light filtering through cedar branches.',
          estimatedCost: 0,
          category: 'Relaxation',
        },
      ],
    },
    {
      dayNumber: 2,
      date: '2026-05-19',
      themeTitle: 'Jogini Falls Hike & Thermal Springs',
      notes: 'Wear sturdy sneakers and carry water for the 3 km forest trail.',
      activities: [
        {
          id: 'act-2-1',
          time: '09:00 AM',
          title: 'Scenic Trail to Jogini Waterfalls',
          location: 'Vashisht Village Trailhead',
          notes: 'Breathtaking 3-tier cascade overlooking Beas valley.',
          estimatedCost: 0,
          category: 'Adventure',
        },
        {
          id: 'act-2-2',
          time: '01:30 PM',
          title: 'Vashisht Natural Hot Springs & Lunch',
          location: 'Vashisht Temple Courtyard',
          notes: 'Rejuvenate sore muscles in the mineral-rich thermal waters.',
          estimatedCost: 600,
          category: 'Relaxation',
        },
        {
          id: 'act-2-3',
          time: '07:00 PM',
          title: 'Bonfire & Group Card Games',
          location: 'Hostel Common Rooftop',
          notes: 'Planning tomorrow’s high altitude drive through Atal Tunnel.',
          estimatedCost: 300,
          category: 'Relaxation',
        },
      ],
    },
    {
      dayNumber: 3,
      date: '2026-05-20',
      themeTitle: 'Atal Tunnel Drive to Sissu & Solang Valley',
      notes: 'Carry warm jackets; winds in Lahaul Valley are chilly even in May.',
      activities: [
        {
          id: 'act-3-1',
          time: '08:00 AM',
          title: 'Drive through Atal Tunnel (9.02 km)',
          location: 'Rohtang Pass Highway',
          notes: 'Cross beneath the Pir Panjal range into mystical Lahaul Valley.',
          estimatedCost: 2000,
          category: 'Transport',
        },
        {
          id: 'act-3-2',
          time: '11:00 AM',
          title: 'Sissu Waterfall & Poplar Groves',
          location: 'Sissu, Lahaul Valley',
          notes: 'Stunning glacial waterfall crashing down sheer grey cliffs.',
          estimatedCost: 200,
          category: 'Sightseeing',
        },
        {
          id: 'act-3-3',
          time: '03:30 PM',
          title: 'Solang Valley Paragliding Session',
          location: 'Solang Valley Adventure Grounds',
          notes: 'Tandem paragliding with certified pilot over mountain valleys.',
          estimatedCost: 3200,
          category: 'Adventure',
        },
      ],
    },
    {
      dayNumber: 4,
      date: '2026-05-21',
      themeTitle: 'Kullu River Rafting & Souvenirs',
      notes: 'Wrap up memories, buy handmade woolens and fresh apple cider.',
      activities: [
        {
          id: 'act-4-1',
          time: '10:00 AM',
          title: 'Beas River White Water Rafting',
          location: 'Babeli, Kullu River Point',
          notes: '14 km exhilarating river run with life jackets and rescue kayaks.',
          estimatedCost: 3600,
          category: 'Adventure',
        },
        {
          id: 'act-4-2',
          time: '04:00 PM',
          title: 'Mall Road Shopping & Local Trout Dinner',
          location: 'Manali Mall Road',
          notes: 'Pick up Kullu shawls, wooden crafts, and farewell dinner.',
          estimatedCost: 1800,
          category: 'Food & Drink',
        },
      ],
    },
  ],
  createdAt: '2026-03-01T14:30:00Z',
  updatedAt: '2026-03-01T14:30:00Z',
};

export const StorageService = {
  // User Profile
  getUserProfile(): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (data) return JSON.parse(data);
      // Auto-init with demo user if not set
      this.setUserProfile(DEFAULT_DEMO_USER);
      return DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  },

  setUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, `token-${profile.id}`);
    } catch (e) {
      console.error('Error saving user profile:', e);
    }
  },

  clearAuth(): void {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  // Trips CRUD
  getTrips(): Trip[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRIPS);
      if (data) {
        return JSON.parse(data);
      }
      // Initialize with seed trip for demo
      const initialTrips = [SEED_SAMPLE_TRIP];
      localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(initialTrips));
      return initialTrips;
    } catch {
      return [SEED_SAMPLE_TRIP];
    }
  },

  getTripById(id: string): Trip | null {
    const trips = this.getTrips();
    return trips.find((t) => t.id === id) || null;
  },

  saveTrip(trip: Trip): Trip {
    const trips = this.getTrips();
    const existingIndex = trips.findIndex((t) => t.id === trip.id);
    const updatedTrip = { ...trip, updatedAt: new Date().toISOString() };

    let updatedTrips: Trip[];
    if (existingIndex >= 0) {
      updatedTrips = [...trips];
      updatedTrips[existingIndex] = updatedTrip;
    } else {
      updatedTrips = [updatedTrip, ...trips];
    }

    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(updatedTrips));
    return updatedTrip;
  },

  deleteTrip(id: string): boolean {
    const trips = this.getTrips();
    const filtered = trips.filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(filtered));
    return true;
  },

  // Saved Destinations
  getSavedDestinations(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_DESTINATIONS);
      if (data) return JSON.parse(data);
      // Default initial saved destinations for demo user
      const initialSaved = ['manali', 'amritsar', 'rishikesh'];
      localStorage.setItem(STORAGE_KEYS.SAVED_DESTINATIONS, JSON.stringify(initialSaved));
      return initialSaved;
    } catch {
      return ['manali', 'amritsar'];
    }
  },

  isDestinationSaved(destinationId: string): boolean {
    const saved = this.getSavedDestinations();
    return saved.includes(destinationId);
  },

  toggleSaveDestination(destinationId: string): boolean {
    const saved = this.getSavedDestinations();
    let updated: string[];
    let isNowSaved = false;

    if (saved.includes(destinationId)) {
      updated = saved.filter((id) => id !== destinationId);
      isNowSaved = false;
    } else {
      updated = [...saved, destinationId];
      isNowSaved = true;
    }

    localStorage.setItem(STORAGE_KEYS.SAVED_DESTINATIONS, JSON.stringify(updated));
    return isNowSaved;
  },

  // Group Trip Interests
  getGroupInterests(): GroupTripInterest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GROUP_INTERESTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  registerGroupInterest(interest: Omit<GroupTripInterest, 'id' | 'submittedAt'>): GroupTripInterest {
    const interests = this.getGroupInterests();
    const newEntry: GroupTripInterest = {
      ...interest,
      id: `interest-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    const updated = [newEntry, ...interests];
    localStorage.setItem(STORAGE_KEYS.GROUP_INTERESTS, JSON.stringify(updated));
    return newEntry;
  },

  // Demo Bookings Persistence
  getBookings(userId?: string): Booking[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      let bookings: Booking[];
      if (data) {
        bookings = JSON.parse(data);
      } else {
        bookings = SEED_SAMPLE_BOOKINGS;
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
      }

      if (userId) {
        return bookings.filter((b) => b.userId === userId);
      }
      return bookings;
    } catch {
      return SEED_SAMPLE_BOOKINGS;
    }
  },

  getBookingById(id: string): Booking | null {
    const bookings = this.getBookings();
    return bookings.find((b) => b.id === id || b.bookingReference === id) || null;
  },

  saveBooking(booking: Booking): Booking {
    const bookings = this.getBookings();
    const existingIndex = bookings.findIndex((b) => b.id === booking.id);
    const updatedBooking: Booking = {
      ...booking,
      updatedAt: new Date().toISOString(),
    };

    let updatedBookings: Booking[];
    if (existingIndex >= 0) {
      updatedBookings = [...bookings];
      updatedBookings[existingIndex] = updatedBooking;
    } else {
      updatedBookings = [updatedBooking, ...bookings];
    }

    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));
    return updatedBooking;
  },

  cancelBooking(id: string, reason?: string): Booking | null {
    const bookings = this.getBookings();
    const existing = bookings.find((b) => b.id === id || b.bookingReference === id);
    if (!existing) return null;

    const cancelledBooking: Booking = {
      ...existing,
      status: 'Cancelled',
      cancellationReason: reason || 'Cancelled by traveler via dashboard.',
      cancelledAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = bookings.map((b) => (b.id === existing.id ? cancelledBooking : b));
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return cancelledBooking;
  },

  deleteBooking(id: string): boolean {
    const bookings = this.getBookings();
    const filtered = bookings.filter((b) => b.id !== id && b.bookingReference !== id);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(filtered));
    return true;
  },

  // Reset Data for fresh Demo presentation
  resetAllDemoData(): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_DEMO_USER));
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, `token-${DEFAULT_DEMO_USER.id}`);
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify([SEED_SAMPLE_TRIP]));
    localStorage.setItem(STORAGE_KEYS.SAVED_DESTINATIONS, JSON.stringify(['manali', 'amritsar', 'rishikesh']));
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(SEED_SAMPLE_BOOKINGS));
    localStorage.removeItem(STORAGE_KEYS.GROUP_INTERESTS);
  },
};

