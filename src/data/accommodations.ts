import { Accommodation } from '../types';
export type { Accommodation };


export const SAMPLE_ACCOMMODATIONS: Accommodation[] = [
  // Manali
  {
    id: 'acc-manali-zostel',
    destinationId: 'manali',
    name: 'Zostel Old Manali Riverside',
    type: 'Hostel',
    location: 'Old Manali Village, Himachal Pradesh',
    rating: 4.8,
    reviewCount: 342,
    pricePerNight: 1299,
    currency: 'INR',
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Iconic backpacker haven perched near the Manu Temple road with panoramic snow peak vistas, riverside hammock garden, and lively cafe jam nights.',
    amenities: ['High-speed Wi-Fi', 'Rooftop Mountain Cafe', 'Common Game Lounge', 'Bonfire Pit', 'Luggage Storage', 'Locker & Power Points'],
    roomTypes: [
      {
        id: 'dorm-6',
        name: '6-Bed Mixed Backpacker Dorm',
        pricePerNight: 1299,
        maxGuests: 1,
        description: 'Single bunk bed with personal reading lamp, privacy curtains, and locker.',
      },
      {
        id: 'deluxe-pvt',
        name: 'Private Himalayan Balcony Suite',
        pricePerNight: 3499,
        maxGuests: 2,
        description: 'Cozy pine-wood master bedroom with private balcony overlooking the Beas stream.',
      },
    ],
  },
  {
    id: 'acc-manali-solang-lodge',
    destinationId: 'manali',
    name: 'Solang Valley Alpine Resort',
    type: 'Resort',
    location: 'Solang Valley Highway, Manali',
    rating: 4.6,
    reviewCount: 198,
    pricePerNight: 4800,
    currency: 'INR',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Surrounded by pine-blanketed hills, offering heated rooms, adventure gear rentals, and authentic Himachali culinary experiences.',
    amenities: ['Heated Rooms', 'Multi-cuisine Restaurant', 'Adventure Desk', 'Free Parking', 'Airport Shuttle Pickup'],
    roomTypes: [
      {
        id: 'pine-deluxe',
        name: 'Pine Forest Deluxe Room',
        pricePerNight: 4800,
        maxGuests: 2,
        description: 'Spacious alpine room with king-size bed and large picture windows.',
      },
      {
        id: 'family-chalet',
        name: '2-Bedroom Mountain Chalet',
        pricePerNight: 8500,
        maxGuests: 4,
        description: 'Two interconnected cedar suites suitable for student groups and families.',
      },
    ],
  },

  // Amritsar
  {
    id: 'acc-amritsar-heritage',
    destinationId: 'amritsar',
    name: 'Golden Heritage Boutique Haveli',
    type: 'Heritage Stay',
    location: 'Heritage Street, 500m from Golden Temple, Amritsar',
    rating: 4.9,
    reviewCount: 412,
    pricePerNight: 2750,
    currency: 'INR',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Authentic 19th-century Punjabi townhouse restored with phulkari tapestries, brass accents, rooftop langar viewing deck, and warm hospitality.',
    amenities: ['Free Golden Temple Shuttle', 'Complimentary Amritsari Kulcha Breakfast', 'Rooftop Terrace', 'Air Conditioning', 'Tour Guide Concierge'],
    roomTypes: [
      {
        id: 'haveli-royal',
        name: 'Maharaja Heritage Room',
        pricePerNight: 2750,
        maxGuests: 2,
        description: 'Ornate woodwork, high ceilings, brass fittings, and plush double bed.',
      },
      {
        id: 'haveli-courtyard',
        name: 'Courtyard View Twin Room',
        pricePerNight: 2100,
        maxGuests: 2,
        description: 'Charming room facing the central fountain courtyard.',
      },
    ],
  },

  // Goa
  {
    id: 'acc-goa-cabana',
    destinationId: 'goa',
    name: 'Anjuna Wave Eco-Cabanas & Hostel',
    type: 'Boutique Hotel',
    location: 'Anjuna Beach Cliffside, North Goa',
    rating: 4.7,
    reviewCount: 520,
    pricePerNight: 2400,
    currency: 'INR',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Steps away from curling Arabian Sea breaks and Wednesday flea markets. Features a pool bar, coconut grove yoga shala, and sunset acoustic sessions.',
    amenities: ['Swimming Pool', 'Beach Access (2 min walk)', 'Cocktail Bar & Cafe', 'Surfboard Rentals', 'Scooter Parking'],
    roomTypes: [
      {
        id: 'beach-cabana',
        name: 'Bohemian Sunset Cabana',
        pricePerNight: 2400,
        maxGuests: 2,
        description: 'Eco-thatched cottage with open-air tropical rain shower and hammock patio.',
      },
      {
        id: 'squad-dorm',
        name: 'Air-Conditioned 4-Bed Group Dorm',
        pricePerNight: 1100,
        maxGuests: 1,
        description: 'Comfortable air-conditioned bunk bed ideal for student travel groups.',
      },
    ],
  },

  // Rishikesh
  {
    id: 'acc-rishikesh-retreat',
    destinationId: 'rishikesh',
    name: 'Ganga View Eco-Camp & Yoga Shala',
    type: 'Camp & Cabin',
    location: 'Tapovan Riverside, Rishikesh, Uttarakhand',
    rating: 4.8,
    reviewCount: 310,
    pricePerNight: 1850,
    currency: 'INR',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Immerse yourself in mountain tranquility beside the turquoise Ganges with daily sunrise yoga sessions, Ayurvedic meals, and river rafting packages.',
    amenities: ['Riverfront Yoga Shala', 'Rafting Expedition Desk', 'Pure Veg Organic Cafe', 'Evening Bonfire', 'Wi-Fi in Common Areas'],
    roomTypes: [
      {
        id: 'safari-tent',
        name: 'Luxury River Safari Tent',
        pricePerNight: 1850,
        maxGuests: 2,
        description: 'Spacious Swiss cottage tent with attached modern washroom and porch chairs.',
      },
      {
        id: 'tapovan-cottage',
        name: 'Tapovan Stone Cottage',
        pricePerNight: 2900,
        maxGuests: 3,
        description: 'Naturally cooled riverstone cottage with handcrafted pine furniture.',
      },
    ],
  },

  // Jaipur
  {
    id: 'acc-jaipur-haveli',
    destinationId: 'jaipur',
    name: 'Pink City Royal Haveli & Courtyard',
    type: 'Heritage Stay',
    location: 'Old City Amer Road, Jaipur, Rajasthan',
    rating: 4.7,
    reviewCount: 280,
    pricePerNight: 3200,
    currency: 'INR',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Traditional Rajasthani architecture with frescoed jharokhas, marble floorings, and a rooftop tandoor restaurant offering views of Nahargarh Fort.',
    amenities: ['Fort View Rooftop Restaurant', 'Swimming Pool', 'Cultural Puppet Shows', 'Wi-Fi', 'Heritage Walk Assistance'],
    roomTypes: [
      {
        id: 'heritage-deluxe',
        name: 'Jharokha Deluxe Suite',
        pricePerNight: 3200,
        maxGuests: 2,
        description: 'Featuring carved stone balconies and four-poster brass royal bed.',
      },
    ],
  },

  // Udaipur
  {
    id: 'acc-udaipur-lakeview',
    destinationId: 'udaipur',
    name: 'Pichola Waterside Boutique Villa',
    type: 'Boutique Hotel',
    location: 'Lal Ghat, Lake Pichola, Udaipur',
    rating: 4.9,
    reviewCount: 388,
    pricePerNight: 4100,
    currency: 'INR',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Uninterrupted views of the Lake Palace and City Palace with lantern-lit dinners and lake breezes.',
    amenities: ['Lake View Rooftop Cafe', 'Boat Cruise Bookings', 'Air Conditioned', 'Free Wi-Fi'],
    roomTypes: [
      {
        id: 'lake-view-room',
        name: 'Lake Pichola Vista Suite',
        pricePerNight: 4100,
        maxGuests: 2,
        description: 'Spectacular front-facing lake panoramas with arched cushioned alcove.',
      },
    ],
  },

  // Kerala
  {
    id: 'acc-kerala-backwaters',
    destinationId: 'kerala',
    name: 'Alleppey Palm Grove Houseboat & Stay',
    type: 'Resort',
    location: 'Punnamada Jetty, Alleppey, Kerala',
    rating: 4.8,
    reviewCount: 460,
    pricePerNight: 3600,
    currency: 'INR',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Tranquil coconut lagoon retreat offering traditional kettuvallam canal cruises, spicy fish curry meals, and Ayurvedic spa massages.',
    amenities: ['Canal Houseboat Cruise', 'Ayurvedic Spa', 'Coconut Grove Hammocks', 'Traditional Kerala Dining'],
    roomTypes: [
      {
        id: 'waterfront-cottage',
        name: 'Backwater Breeze Cottage',
        pricePerNight: 3600,
        maxGuests: 2,
        description: 'Serene wooden cottage directly bordering the tranquil waters.',
      },
    ],
  },

  // Dharamshala
  {
    id: 'acc-dharamshala-pine',
    destinationId: 'dharamshala',
    name: 'McLeod Ganj Monastic View Lodge',
    type: 'Hostel',
    location: 'Bhagsunag Road, McLeod Ganj, Dharamshala',
    rating: 4.7,
    reviewCount: 295,
    pricePerNight: 1450,
    currency: 'INR',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Peaceful hilltop lodge near Bhagsu waterfall and Dalai Lama temple with Tibetan tea cafe and mountain reading library.',
    amenities: ['Tibetan Herbal Tea Bar', 'Rooftop Reading Terrace', 'Triund Trek Booking', 'Solar Water Heating'],
    roomTypes: [
      {
        id: 'triund-dorm',
        name: 'Triund Trail 4-Bed Dorm',
        pricePerNight: 1450,
        maxGuests: 1,
        description: 'Cozy dorm with mountain view windows and reading light.',
      },
    ],
  },
];

export function getAccommodationsForDestination(destinationId: string): Accommodation[] {
  const filtered = SAMPLE_ACCOMMODATIONS.filter((acc) => acc.destinationId === destinationId);
  if (filtered.length > 0) return filtered;

  // Fallback demo accommodation if a destination doesn't have custom stays
  return [
    {
      id: `acc-${destinationId}-default`,
      destinationId,
      name: `${destinationId.charAt(0).toUpperCase() + destinationId.slice(1)} Explorer Lodge`,
      type: 'Boutique Hotel',
      location: `Central ${destinationId.charAt(0).toUpperCase() + destinationId.slice(1)}`,
      rating: 4.7,
      reviewCount: 154,
      pricePerNight: 2400,
      currency: 'INR',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      ],
      description: 'Comfortable central base for student explorers with reliable amenities, local travel assistance, and comfortable modern rooms.',
      amenities: ['High-speed Wi-Fi', 'Air Conditioning', 'Travel Concierge', 'Complimentary Breakfast'],
      roomTypes: [
        {
          id: 'standard-explorer',
          name: 'Standard Explorer Double',
          pricePerNight: 2400,
          maxGuests: 2,
          description: 'Comfortable room with queen-size bed, workstation, and ensuite bath.',
        },
      ],
    },
  ];
}

export function getAccommodationById(id: string): Accommodation | undefined {
  return SAMPLE_ACCOMMODATIONS.find((acc) => acc.id === id);
}
