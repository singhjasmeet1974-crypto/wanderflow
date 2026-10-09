import { TravelGuide } from '../types';

export const TRAVEL_GUIDES: TravelGuide[] = [
  {
    id: 'budget-travel-guide',
    slug: 'how-to-plan-a-budget-trip',
    title: 'How to Plan a Budget Trip without Sacrificing Adventure',
    subtitle: 'Practical tactics for college students and young explorers to maximize experiences while keeping expenses minimal.',
    category: 'Budgeting & Hacks',
    readTimeMinutes: 6,
    author: {
      name: 'Simran Kaur',
      role: 'Student Travel Lead, GNDEC IT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'March 2026',
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    summary: 'Mastering budget travel isn’t about denying yourself treats—it’s about eliminating unnecessary leaks like surge transit, tourist-trap dining, and expensive luggage fees so your funds go directly into memorable activities.',
    sections: [
      {
        heading: '1. The 50/30/20 College Travel Rule',
        content: 'When planning a student trip, divide your budget strategically: 50% for transit and base stay, 30% for activities, experiences, and food, and 20% reserved as an unspent contingency buffer. Having this cushion ensures unexpected delays or cab surges never spoil your trip.',
        keyTips: [
          'Choose overnight trains or Volvo buses to save a full night’s hotel expense.',
          'Travel in a group of 3 or 4 to split local cab and auto fares evenly.',
          'Carry a valid student ID card everywhere; monument entry fees drop by up to 80%.',
        ],
      },
      {
        heading: '2. Choosing Hostels & Student Homestays',
        content: 'Hostels are no longer dingy bunk rooms—modern youth hostels offer cozy pod beds, high-speed WiFi, community kitchens, and free walking tours. Cooking one meal yourself each day (like eggs and oatmeal) cuts food expenditure in half while keeping you energized.',
        keyTips: [
          'Book dorm beds with privacy curtains and personal reading lights/lockers.',
          'Read guest reviews filtered by cleanliness and social atmosphere.',
          'Talk to hostel receptionists for insider tips on free viewpoints and student discounts.',
        ],
      },
      {
        heading: '3. Eating Like a Local',
        content: 'Steer clear of restaurants situated directly opposite major monuments where prices are marked up triple. Walk two streets into local residential quarters where working locals eat. Not only is the food authentic, fresh, and piping hot, but it also supports local family-run eateries.',
      },
    ],
    checklist: [
      'Download offline Google Maps for your destination ahead of time',
      'Keep your college Student ID card handy for monument discounts',
      'Carry a reusable insulated water bottle to avoid single-use plastic costs',
      'Download local transit and UPI payment apps',
      'Pre-allocate emergency cash in a separate pocket',
    ],
  },
  {
    id: 'packing-checklist-guide',
    slug: 'essential-travel-packing-checklist',
    title: 'The Essential Minimalist Travel Packing Checklist',
    subtitle: 'Everything you need in a single 40L backpack without overpacking or forgetting essentials.',
    category: 'Packing & Gear',
    readTimeMinutes: 5,
    author: {
      name: 'Rohan Verma',
      role: 'Outdoor Gear Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'February 2026',
    coverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
    summary: 'Overpacking weighs down your journey. A lightweight backpack makes hopping onto buses, stairs, and cobblestone lanes effortless. Here is the ultimate tested student packing blueprint.',
    sections: [
      {
        heading: '1. The 5-4-3-2-1 Rule for Weeklong Trips',
        content: 'Limit yourself to: 5 pairs of socks & innerwear, 4 tops/t-shirts, 3 bottoms (jeans/trek pants/shorts), 2 pairs of footwear (one sturdy walking sneaker, one slip-on sandal), and 1 versatile outer jacket. Roll clothes instead of folding to minimize wrinkles and save 30% volume.',
        keyTips: [
          'Wear your bulkiest shoes and heaviest jacket during travel to lighten your bag.',
          'Choose quick-dry synthetic or merino blend fabrics over heavy cotton.',
        ],
      },
      {
        heading: '2. Tech & Power Management',
        content: 'Your smartphone is your boarding pass, camera, and map. A dead battery in a strange city creates needless anxiety. Always keep a compact power bank in your daypack with multi-port cables.',
        keyTips: [
          'Carry a 10,000mAh or 20,000mAh BIS-certified power bank.',
          'Pack a universal travel adapter with multiple USB-C outputs.',
          'Save digital copies of Aadhaar/Passport, tickets, and reservations offline.',
        ],
      },
    ],
    checklist: [
      'Sturdy 35L - 45L backpack with rain cover',
      'Quick-dry micro-fiber towel',
      'Small first-aid kit (Paracetamol, Band-Aids, ORS packets, Motion sickness tablets)',
      'Mini toiletries kit in leak-proof silicone bottles',
      'Padlock for hostel locker storage',
      'Waterproof phone pouch or zip-lock bags',
    ],
  },
  {
    id: 'solo-travel-guide',
    slug: 'first-time-solo-travel-tips',
    title: 'First-Time Solo Travel: Confidence, Safety & Liberation',
    subtitle: 'How to step out of your comfort zone, make new friends on the road, and stay secure.',
    category: 'Solo Travel',
    readTimeMinutes: 7,
    author: {
      name: 'Aarav Sharma',
      role: 'Solo Backpacker & Wanderflow Contributor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'March 2026',
    coverImage: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80',
    summary: 'Solo travel is the ultimate crash course in self-reliance and independence. It allows you to follow your own rhythm without compromise, meeting remarkable people you’d never encounter in a bubble of friends.',
    sections: [
      {
        heading: '1. Picking Your Maiden Solo Destination',
        content: 'Start with welcoming, traveler-dense towns with good bus or train connectivity and active hostel cultures. Places like Rishikesh, Dharamshala, Udaipur, or Manali in India are ideal starting points where navigation is straightforward and fellow travelers are everywhere.',
      },
      {
        heading: '2. Common Sense Safety Rules',
        content: 'Always share your live location or daily itinerary with a trusted friend or family member back home. Arrive at new destinations during daytime daylight hours whenever possible. Never feel pressured to be overly polite to pushy touts—a firm, polite "No thank you" and moving on is standard practice.',
        keyTips: [
          'Keep your phone charged above 30% before stepping out for the evening.',
          'Store your passport or primary ID and bulk cash in a hidden pouch or locked hostel locker.',
          'Trust your gut instinct: if a situation or ride feels off, excuse yourself immediately.',
        ],
      },
      {
        heading: '3. Beating the Solo Dining Anxiety',
        content: 'Eating alone at a cafe can feel intimidating the first time. Bring a paperback book, write in your travel journal, or choose a seat overlooking the street. You will quickly realize that nobody is judging you—in fact, solo travelers are admired for their confidence.',
      },
    ],
    checklist: [
      'Share live location link with family or close friend',
      'Keep emergency helpline numbers saved on phone speed dial',
      'Pre-book your first night’s stay so you have a guaranteed destination upon arrival',
      'Carry a small travel journal or e-reader for downtime',
    ],
  },
  {
    id: 'weekend-getaway-guide',
    slug: 'planning-a-weekend-getaway',
    title: 'Micro-Adventures: How to Plan a Flawless 48-Hour Weekend Getaway',
    subtitle: 'Max out your college weekends without feeling exhausted on Monday morning.',
    category: 'Weekend Escapes',
    readTimeMinutes: 4,
    author: {
      name: 'Priya Patel',
      role: 'Trip Curator',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'January 2026',
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    summary: 'You do not need two weeks off to experience the thrill of travel. A well-organized 48-hour escape resets your mental battery and breaks college monotony.',
    sections: [
      {
        heading: '1. The 300-Kilometer Rule',
        content: 'For a 2-day weekend, limit transit time to 4–6 hours maximum each way. Spending 14 hours on a bus for a 36-hour stay leaves you fatigued. Focus on nearby gems: for example, from Ludhiana or Chandigarh, Amritsar, Kasauli, or Rishikesh are perfect quick trips.',
      },
      {
        heading: '2. Focus on One Core Experience per Day',
        content: 'Do not attempt to cram 12 attractions into 48 hours. Pick one primary morning anchor (e.g. sunrise hike or Golden Temple visit) and one late afternoon anchor (sunset point or food walk). Leave the middle of the day open for spontaneous discoveries.',
      },
    ],
    checklist: [
      'Book Friday night or early Saturday morning transit in advance',
      'Pack only a single compact daypack to avoid luggage checks',
      'Review weather forecast on Wanderflow the night before',
      'Plan your Sunday return time so you arrive back before 9 PM',
    ],
  },
  {
    id: 'sustainable-travel-guide',
    slug: 'responsible-and-sustainable-travel',
    title: 'Responsible Travel: Leaving Himalayan Valleys & Coasts Better',
    subtitle: 'How to be an eco-conscious traveler without slowing down your adventure.',
    category: 'Eco Travel',
    readTimeMinutes: 5,
    author: {
      name: 'Karan Mehra',
      role: 'Conservation Advocate',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'March 2026',
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    summary: 'Travel should enrich the destinations we visit, not degrade them. As youth travelers, practicing mindful tourism protects fragile Himalayan trails and delicate marine reefs for generations to come.',
    sections: [
      {
        heading: '1. Zero-Waste on High Himalayan Trails',
        content: 'Remote mountain trails lack municipal waste processing facilities. Plastic snack wrappers discarded on Triund or Kheerganga remain for centuries. Always practice "Pack It In, Pack It Out"—carry your own trash bag down to major towns with recycling facilities.',
        keyTips: [
          'Refuse single-use plastic water bottles; refill at filtered spring stations or homestays.',
          'Never leave cigarette butts or wet wipes behind; both contain non-biodegradable synthetic fibers.',
        ],
      },
      {
        heading: '2. Direct Economic Support to Local Communities',
        content: 'Ensure your travel rupees directly sustain village families. Choose locally owned homestays over multinational chain resorts, hire certified village trekking guides, and buy handicrafts directly from indigenous artisans.',
      },
    ],
    checklist: [
      'Carry a reusable cloth bag for snacks and shopping',
      'Use reef-safe and natural biodegradable sunscreen',
      'Refillable water bottle with purification tablet or filter',
      'Respect local cultural customs and sacred shrine dress codes',
    ],
  },
  {
    id: 'friends-group-trip-guide',
    slug: 'how-to-organize-a-trip-with-friends',
    title: 'How to Organize a Trip with Friends without Ruining Friendships',
    subtitle: 'The battle-tested framework for group budget harmony, shared decisions, and zero drama.',
    category: 'Group Travel',
    readTimeMinutes: 6,
    author: {
      name: 'Gurpreet Singh',
      role: 'Wanderflow Lead Architect, GNDEC IT',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'March 2026',
    coverImage: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80',
    summary: 'Group travel with friends creates lifelong memories, but unaligned budgets or vague plans can cause friction. Here is how to keep group dynamics fun, democratic, and smooth from start to finish.',
    sections: [
      {
        heading: '1. Establish the Budget Ceiling First',
        content: 'Before debating destinations or hotels, determine everyone’s budget comfort zone privately. The lowest budget in the group must set the baseline ceiling for common expenses like stays and transport. Anyone wanting luxury extras can opt in individually without pressuring others.',
      },
      {
        heading: '2. Designate Clear Roles',
        content: 'Avoid the "Who has the train tickets?" chaos by assigning specific roles to your squad: 1) Transit Lead (books train/cab), 2) Stay Lead (manages homestay check-in), 3) Finance Lead (logs group expenses in Splitwise/Wanderflow), and 4) Itinerary Lead (maps activities).',
        keyTips: [
          'Rotate who settles daily food bills so no single person bears high card holds.',
          'Settle daily expenses each evening instead of calculating a complicated lump sum at the end.',
        ],
      },
      {
        heading: '3. Allow Solo Breathing Space',
        content: 'You do not have to be joined at the hip 24 hours a day. Schedule "open afternoons" where friends can split up—one friend might want to sleep in, another might want to photograph temples, and another wants to shop. Regroup for dinner with great stories!',
      },
    ],
    checklist: [
      'Agree on common budget ceiling before booking',
      'Assign roles: Logistics, Stays, Expenses, and Itinerary',
      'Use Wanderflow to share day-by-day activity outlines',
      'Plan dedicated open time for individual rest and hobbies',
    ],
  },
];
