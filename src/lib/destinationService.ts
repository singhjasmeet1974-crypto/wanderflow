import { Destination, DestinationCategory } from '../types';
import { DESTINATIONS } from '../data/destinations';

const DYNAMIC_DESTINATIONS_STORAGE_KEY = 'wanderflow_dynamic_destinations';

// Comprehensive catalogue of popular destinations to augment the initial set
export const ADDITIONAL_POPULAR_DESTINATIONS: Destination[] = [
  {
    id: 'shimla',
    name: 'Shimla',
    region: 'Himachal Pradesh',
    country: 'India',
    category: 'Mountains',
    tags: ['Mall Road', 'Colonial Heritage', 'Toy Train', 'Snow View', 'Weekend Getaway'],
    imageUrl: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'The Queen of Hills featuring historic British colonial architecture, pine ridge walks, and snow-capped peaks.',
    fullDescription: 'Shimla, the capital of Himachal Pradesh, combines nostalgic colonial charm with lush Himalayan cedar forests. From walking the iconic Ridge and Mall Road to taking the historic UNESCO Kalka-Shimla Toy Train and hiking to Jakhoo Temple, Shimla remains a timeless student and family favorite.',
    budgetEstimate: {
      min: 4500,
      max: 11000,
      currency: 'INR',
      durationDays: 3,
    },
    estimatedDailyCost: 1800,
    bestTimeToVisit: 'March to June & November to February (Snow)',
    climateType: 'Subtropical Highland',
    latitude: 31.1048,
    longitude: 77.1734,
    popularityScore: 94,
    suggestedDuration: '3 - 4 Days',
    highlights: [
      'Stroll along the pedestrian-only Mall Road and scenic Ridge',
      'Ride the UNESCO World Heritage Kalka-Shimla Toy Train',
      'Hike to Jakhoo Temple for panoramic Himalayan views and giant Hanuman statue',
      'Day trip to Kufri for horse riding and snow activities',
    ],
    practicalTips: [
      'Take regular HRTC or private buses from Chandigarh (3.5 hrs) or Delhi (8 hrs).',
      'Mall Road is entirely pedestrian; be prepared for pleasant uphill walking.',
      'Carry light woolens in summer and heavy thermal jackets in winter.',
    ],
    topAttractions: [
      {
        name: 'The Ridge & Christ Church',
        description: 'Vast open square with Gothic neo-style church offering splendid sunset valley views.',
        type: 'Heritage & Scenic',
        estimatedTime: '2 hrs',
        entryFee: 'Free',
      },
      {
        name: 'Jakhoo Hill & Temple',
        description: 'Highest peak in Shimla (2,455m) surrounded by dense alpine deodars.',
        type: 'Viewpoint & Temple',
        estimatedTime: '2 - 3 hrs',
        entryFee: 'Free (Ropeway ₹500 roundtrip)',
      },
      {
        name: 'Viceregal Lodge',
        description: 'Majestic Scottish baronial estate where pivotal historic Indian partition talks took place.',
        type: 'Colonial Architecture',
        estimatedTime: '2 hrs',
        entryFee: '₹50 Indians / ₹100 Foreigners',
      },
      {
        name: 'Kufri Nature Park',
        description: 'High-altitude adventure village 16 km from Shimla with skiing tracks in winter.',
        type: 'Adventure & Nature',
        estimatedTime: '4 hrs',
        entryFee: '₹50',
      },
    ],
    sampleItinerary: [
      {
        dayNumber: 1,
        title: 'Arrival & The Colonial Ridge Walk',
        activities: ['Arrive via Kalka-Shimla Toy Train', 'Check-in at hostel near Mall Road', 'Evening walk around Christ Church and Lakkar Bazaar'],
      },
      {
        dayNumber: 2,
        title: 'Jakhoo Peak & Viceregal Heritage',
        activities: ['Morning hike/ropeway to Jakhoo Hill', 'Cafe lunch on Mall Road', 'Afternoon guided tour of Viceregal Lodge'],
      },
      {
        dayNumber: 3,
        title: 'Kufri Adventure & Departure',
        activities: ['Day excursion to Kufri pine trails', 'Local apple cider tasting', 'Evening bus departure'],
      },
    ],
  },
  {
    id: 'kasol',
    name: 'Kasol & Parvati Valley',
    region: 'Himachal Pradesh',
    country: 'India',
    category: 'Adventure',
    tags: ['Trekking', 'Kheerganga', 'Riverside Cafes', 'Backpacker Hub', 'Parvati River'],
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Free-spirited backpacker paradise in Parvati Valley known for alpine treks, Israeli cuisine, and pine trails.',
    fullDescription: 'Set beside the roaring turquoise Parvati River, Kasol is the hub of Himalayan youth culture. Famed for its laid-back cafes serving falafel and shakshuka, wooden village homestays in Tosh and Chalal, and the legendary Kheerganga hot spring trek, Kasol is an essential pilgrimage for young adventurers.',
    budgetEstimate: {
      min: 4000,
      max: 9500,
      currency: 'INR',
      durationDays: 4,
    },
    estimatedDailyCost: 1500,
    bestTimeToVisit: 'March to June & October to November',
    climateType: 'Alpine Highland',
    latitude: 32.0100,
    longitude: 77.3150,
    popularityScore: 96,
    suggestedDuration: '4 - 5 Days',
    highlights: [
      'Trek through waterfalls to the natural hot springs of Kheerganga',
      'Wander through bohemian pine trails connecting Chalal and Kasol',
      'Savor authentic Israeli and Himachali dishes in riverside garden cafes',
      'Visit Tosh village for jaw-dropping views of snowy peaks',
    ],
    practicalTips: [
      'Take overnight buses to Bhuntar, then hop on local private or HRTC buses to Kasol (1.5 hrs).',
      'Carry sufficient cash as ATMs in Parvati Valley frequently run out of bills.',
      'Respect local village culture and avoid playing loud speakers on trails.',
    ],
    topAttractions: [
      {
        name: 'Chalal Riverside Trail',
        description: 'Charming 30-minute trail crossing a cable suspension bridge to peaceful apple orchards.',
        type: 'Nature Walk',
        estimatedTime: '2 hrs',
        entryFee: 'Free',
      },
      {
        name: 'Tosh Village',
        description: 'Traditional wooden Himachali village perched high up Parvati Valley with panoramic snowy views.',
        type: 'Village & Viewpoint',
        estimatedTime: '4 - 5 hrs',
        entryFee: 'Free',
      },
      {
        name: 'Kheerganga Trek',
        description: 'Exhilarating 12 km mountain trek leading to sacred natural sulfur hot springs under starlit skies.',
        type: 'Alpine Trek',
        estimatedTime: 'Full Day / Overnight',
        entryFee: 'Free (Tent stay ₹500-₹1200)',
      },
      {
        name: 'Manikaran Sahib',
        description: 'Revered Sikh and Hindu pilgrimage site with boiling hot springs and 24/7 community langar.',
        type: 'Spiritual Heritage',
        estimatedTime: '2 hrs',
        entryFee: 'Free',
      },
    ],
    sampleItinerary: [
      {
        dayNumber: 1,
        title: 'Arrival in Kasol & Chalal Village',
        activities: ['Arrive via Bhuntar', 'Riverfront cafe breakfast', 'Peaceful walk to Chalal village', 'Campfire dinner'],
      },
      {
        dayNumber: 2,
        title: 'Tosh Village Exploration',
        activities: ['Scenic cab to Barshaini and Tosh', 'Hike through wooden alleyways', 'Panoramic waterfall view cafe lunch'],
      },
      {
        dayNumber: 3,
        title: 'Kheerganga Hot Spring Trek',
        activities: ['Morning ascent from Barshaini', 'Trek through pine woods and waterfalls', 'Soak in natural hot springs under stars'],
      },
    ],
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    region: 'Uttar Pradesh',
    country: 'India',
    category: 'Heritage',
    tags: ['Ganges Ghats', 'Ganga Aarti', 'Spiritual', 'Street Food', 'Ancient City'],
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'One of the world’s oldest continuously inhabited cities, celebrated for mystic sunrise boat rides and transcendent Ganga Aarti.',
    fullDescription: 'Varanasi (Kashi) is India’s cultural and spiritual heartbeat on the holy River Ganga. With labyrinthine ancient alleyways, vibrant ghats humming with life from dawn to dusk, classical music traditions, and irresistible street food from kachoris to blue lassi, it offers a transformative sensory journey.',
    budgetEstimate: {
      min: 3500,
      max: 8500,
      currency: 'INR',
      durationDays: 3,
    },
    estimatedDailyCost: 1400,
    bestTimeToVisit: 'October to March',
    climateType: 'Humid Subtropical',
    latitude: 25.3176,
    longitude: 82.9739,
    popularityScore: 95,
    suggestedDuration: '3 Days',
    highlights: [
      'Witness the hypnotic evening Ganga Aarti ceremony at Dashashwamedh Ghat',
      'Drift silently on a sunrise wooden rowing boat along the sacred Ganges',
      'Explore the ancient narrow gallis filled with silk weavers and music schools',
      'Taste legendary Banarasi chaat, malaiyo, and rich lassi',
    ],
    practicalTips: [
      'Stay near Assi Ghat or Dashashwamedh Ghat for easy pedestrian walking to all major sights.',
      'Book sunrise boat rides directly at the ghats in the early morning for the best negotiated rates.',
      'Keep shoes in carry bags when visiting congested temple complexes.',
    ],
    topAttractions: [
      {
        name: 'Dashashwamedh Ghat',
        description: 'The liveliest and oldest ghat, world-famous for its synchronized evening brass-lamp aarti.',
        type: 'Cultural Heritage',
        estimatedTime: '2 hrs',
        entryFee: 'Free',
      },
      {
        name: 'Assi Ghat',
        description: 'Southernmost ghat beloved by students, yogis, and travelers for sunrise meditation and concerts.',
        type: 'Lifestyle & Yoga',
        estimatedTime: '2 hrs',
        entryFee: 'Free',
      },
      {
        name: 'Kashi Vishwanath Temple',
        description: 'Revered golden temple dedicated to Lord Shiva with newly constructed grand river corridor.',
        type: 'Spiritual Monument',
        estimatedTime: '2 hrs',
        entryFee: 'Free',
      },
      {
        name: 'Sarnath',
        description: 'Historic Buddhist holy site 10 km away where Lord Buddha gave his first sermon.',
        type: 'Buddhist Heritage',
        estimatedTime: '3 hrs',
        entryFee: '₹25 Indians / ₹300 Foreigners',
      },
    ],
    sampleItinerary: [
      {
        dayNumber: 1,
        title: 'Sacred Ghats & Evening Grand Aarti',
        activities: ['Arrive and settle in an Assi Ghat heritage hostel', 'Explore ancient silk lanes', 'Evening boat seat for Dashashwamedh Ganga Aarti'],
      },
      {
        dayNumber: 2,
        title: 'Dawn Rowing Boat & Kashi Vishwanath',
        activities: ['5:30 AM sunrise boat tour past 84 ghats', 'Piping hot Kachori Sabzi breakfast', 'Corridor walk to Kashi Vishwanath Temple', 'Evening classical music session'],
      },
      {
        dayNumber: 3,
        title: 'Sarnath Excursion & Banarasi Food Walk',
        activities: ['Morning tuk-tuk ride to Sarnath Dhamek Stupa', 'Afternoon street food tasting (Tamatar Chaat & Lassi)', 'Souvenir brass craft shopping'],
      },
    ],
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    region: 'West Bengal',
    country: 'India',
    category: 'Mountains',
    tags: ['Tea Gardens', 'Kanchenjunga', 'Toy Train', 'Tiger Hill', 'Colonial Cafes'],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Misty Himalayan hill station framed by emerald tea estates and golden sunrises over Mount Kanchenjunga.',
    fullDescription: 'Perched in the foothills of the Eastern Himalayas, Darjeeling offers majestic vistas of Mount Kanchenjunga (world’s 3rd highest peak). Known for aromatic single-estate Muscatel teas, heritage steam trains, Tibetan monasteries, and Tibetan momo stalls at Chowrasta, it is a serene mountain escape.',
    budgetEstimate: {
      min: 5000,
      max: 12000,
      currency: 'INR',
      durationDays: 4,
    },
    estimatedDailyCost: 1900,
    bestTimeToVisit: 'March to May & October to December',
    climateType: 'Subtropical Highland',
    latitude: 27.0410,
    longitude: 88.2663,
    popularityScore: 92,
    suggestedDuration: '3 - 4 Days',
    highlights: [
      'Catch the golden dawn breaking over Mount Kanchenjunga from Tiger Hill',
      'Ride the historic Darjeeling Himalayan Railway heritage steam train',
      'Tour world-renowned organic tea estates and sample fresh flushes',
      'Relax at Chowrasta Mall with steamed Tibetan dumplings and bakery treats',
    ],
    practicalTips: [
      'Reach via shared sumos from New Jalpaiguri (NJP) railway station or Bagdogra Airport (3 hrs).',
      'Book Tiger Hill morning taxi permits one evening prior.',
      'Always dress in layers as mist rolls in rapidly during afternoons.',
    ],
    topAttractions: [
      {
        name: 'Tiger Hill',
        description: 'Legendary panoramic summit providing sweeping views of Kanchenjunga and Everest at sunrise.',
        type: 'Viewpoint',
        estimatedTime: '2 hrs (Early morning)',
        entryFee: '₹50 observatory fee',
      },
      {
        name: 'Batasia Loop & War Memorial',
        description: 'Spiral toy train railway engineering marvel adorned with flowers and mountain vistas.',
        type: 'Heritage Railway',
        estimatedTime: '1.5 hrs',
        entryFee: '₹20',
      },
      {
        name: 'Happy Valley Tea Estate',
        description: 'Sprawling 100-year-old organic tea estate offering guided leaf plucking and tea tasting.',
        type: 'Tea Plantation',
        estimatedTime: '2 hrs',
        entryFee: '₹100 for guided tour',
      },
      {
        name: 'Himalayan Mountaineering Institute & Zoo',
        description: 'World-renowned climbing institute museum alongside red panda conservation enclosures.',
        type: 'Museum & Wildlife',
        estimatedTime: '3 hrs',
        entryFee: '₹110',
      },
    ],
    sampleItinerary: [
      {
        dayNumber: 1,
        title: 'Chowrasta Mall & Colonial Bakeries',
        activities: ['Shared cab transfer from Siliguri/NJP', 'Stroll along Chowrasta and Observatory Hill', 'Evening tea at Glenary’s Bakery'],
      },
      {
        dayNumber: 2,
        title: 'Tiger Hill Sunrise & Himalayan Railway',
        activities: ['4:00 AM trip to Tiger Hill for Kanchenjunga sunrise', 'Batasia Loop visit on way back', 'Joy ride on steam Toy Train to Ghoom'],
      },
      {
        dayNumber: 3,
        title: 'Tea Estate Walk & Himalayan Zoo',
        activities: ['Tour Happy Valley tea plantations', 'Visit Padmaja Naidu Himalayan Zoo and HMI', 'Tibetan momo and thukpa dinner'],
      },
    ],
  },
  {
    id: 'ooty',
    name: 'Ooty (Udhagamandalam)',
    region: 'Tamil Nadu',
    country: 'India',
    category: 'Mountains',
    tags: ['Nilgiris', 'Nilgiri Mountain Railway', 'Tea Gardens', 'Botanical Garden', 'Pykara Lake'],
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'The crown jewel of the Nilgiri Blue Mountains, famous for eucalyptus estates, rolling meadows, and toy trains.',
    fullDescription: 'Nestled deep in the Nilgiri Hills of Southern India, Ooty is celebrated for its cool climate, lush tea rolling slopes, colonial stone bungalows, and homemade chocolate shops. With boating on pristine lakes, trekking to Doddabetta Peak, and the UNESCO Nilgiri Mountain Railway, it is a beloved haven for backpackers and nature enthusiasts.',
    budgetEstimate: {
      min: 4500,
      max: 11000,
      currency: 'INR',
      durationDays: 3,
    },
    estimatedDailyCost: 1700,
    bestTimeToVisit: 'October to June',
    climateType: 'Subtropical Highland',
    latitude: 11.4102,
    longitude: 76.6950,
    popularityScore: 91,
    suggestedDuration: '3 - 4 Days',
    highlights: [
      'Ride the UNESCO Nilgiri Mountain Railway toy train through mountain tunnels',
      'Marvel at panoramic 360-degree viewpoints from Doddabetta Peak',
      'Speedboat and picnic by Pykara Lake and Pykara Waterfalls',
      'Taste handcrafted homemade fudge, truffles, and aromatic eucalyptus oils',
    ],
    practicalTips: [
      'Accessible easily from Coimbatore Airport (3 hrs) or Bangalore by overnight bus.',
      'Book Nilgiri toy train tickets weeks in advance on IRCTC as seats sell out instantly.',
      'Combine your trip with nearby Coonoor for quieter tea plantation trails.',
    ],
    topAttractions: [
      {
        name: 'Government Botanical Garden',
        description: 'Vast 55-acre terraced garden featuring thousands of exotic flora and a fossilized tree trunk.',
        type: 'Nature & Parks',
        estimatedTime: '2 hrs',
        entryFee: '₹40',
      },
      {
        name: 'Doddabetta Peak',
        description: 'Highest mountain peak in the Nilgiri Hills (2,637m) with telescope house.',
        type: 'Viewpoint',
        estimatedTime: '2 hrs',
        entryFee: '₹10',
      },
      {
        name: 'Pykara Lake & Waterfalls',
        description: 'Scenic tranquil lake framed by pine trees offering motorboat cruises.',
        type: 'Lake & Boating',
        estimatedTime: '3 hrs',
        entryFee: '₹10 (Boating ₹300-₹800)',
      },
      {
        name: 'Ooty Boat House & Lake',
        description: 'Historic artificial lake built by John Sullivan surrounded by eucalyptus groves.',
        type: 'Recreation',
        estimatedTime: '2 hrs',
        entryFee: '₹15 (Boating extra)',
      },
    ],
    sampleItinerary: [
      {
        dayNumber: 1,
        title: 'Toy Train Arrival & Lake Boating',
        activities: ['Scenic arrival via Nilgiri Mountain Railway', 'Check-in and homemade chocolate tasting', 'Pedal boating on Ooty Lake at golden hour'],
      },
      {
        dayNumber: 2,
        title: 'Doddabetta & Tea Factory Tour',
        activities: ['Morning excursion to Doddabetta Peak', 'Tour of Dodabetta Tea Museum & Factory', 'Walk through Government Rose Garden'],
      },
      {
        dayNumber: 3,
        title: 'Pykara Pine Forests & Waterfalls',
        activities: ['Drive through Wenlock Downs 9th Mile shooting point', 'Speedboat ride on Pykara Lake', 'Departure toward Coimbatore/Bangalore'],
      },
    ],
  },
  {
    id: 'pondicherry',
    name: 'Pondicherry (Puducherry)',
    region: 'Tamil Nadu & Puducherry',
    country: 'India',
    category: 'Beaches',
    tags: ['French Quarter', 'Promenade Beach', 'Auroville', 'Boutique Cafes', 'Bicycle Tours'],
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Quaint French colonial coastal retreat with mustard-yellow villas, peaceful seaside promenade, and experimental community Auroville.',
    fullDescription: 'Pondicherry exudes an unmistakable Franco-Tamil harmony. Stroll through the cobblestone White Town with bougainvillea draped over French balconies, cycle along the rocky Promenade Beach, savor croissants at chic bakeries, and discover spiritual tranquility at Sri Aurobindo Ashram and the golden Matrimandir in Auroville.',
    budgetEstimate: {
      min: 4000,
      max: 9500,
      currency: 'INR',
      durationDays: 3,
    },
    estimatedDailyCost: 1600,
    bestTimeToVisit: 'October to March',
    climateType: 'Tropical Coastal',
    latitude: 11.9416,
    longitude: 79.8083,
    popularityScore: 93,
    suggestedDuration: '3 - 4 Days',
    highlights: [
      'Rent a pastel bicycle to explore the charming French Quarter (White Town)',
      'Watch the sunrise while jogging on the car-free Promenade Beach',
      'Experience the universal township and golden dome Matrimandir in Auroville',
      'Enjoy French baguettes, crepes, and authentic wood-fired sourdough pizzas',
    ],
    practicalTips: [
      'Take the East Coast Road (ECR) bus or self-drive cab from Chennai (2.5 hrs).',
      'Rent a scooter or bicycle immediately for effortless navigation.',
      'Book Auroville inner chamber Matrimandir passes online several days in advance.',
    ],
    topAttractions: [
      {
        name: 'Promenade Beach (Rock Beach)',
        description: 'Iconic 1.5 km seaside stretch lined with heritage statues, war memorials, and lively cafes.',
        type: 'Beach & Promenade',
        estimatedTime: '2 hrs',
        entryFee: 'Free',
      },
      {
        name: 'Auroville & Matrimandir',
        description: 'Experimental international township dedicated to human unity with landmark golden meditation sphere.',
        type: 'Community & Spirituality',
        estimatedTime: '4 - 5 hrs',
        entryFee: 'Free (Registration required)',
      },
      {
        name: 'White Town (French Colony)',
        description: 'Vibrant grid of preserved colonial streets filled with indie bookstores and art galleries.',
        type: 'Heritage & Lifestyle',
        estimatedTime: '3 hrs',
        entryFee: 'Free',
      },
      {
        name: 'Paradise Beach',
        description: 'Secluded golden sand beach reachable via a picturesque backwater ferry ride from Chunnambar.',
        type: 'Sandy Beach & Watersports',
        estimatedTime: '3 hrs',
        entryFee: '₹30 (Ferry ₹300)',
      },
    ],
    sampleItinerary: [
      {
        dayNumber: 1,
        title: 'White Town Strolls & Promenade Sunset',
        activities: ['Arrive via scenic ECR', 'Check-in at French quarter heritage hostel', 'Bicycle ride through French colony streets', 'Sunset pizza dinner by the beach'],
      },
      {
        dayNumber: 2,
        title: 'Auroville Day & Matrimandir Meditation',
        activities: ['Morning scooter drive to Auroville', 'Matrimandir viewing point walk', 'Organic cafe lunch at Solar Kitchen', 'Evening walk by Sri Aurobindo Ashram'],
      },
      {
        dayNumber: 3,
        title: 'Paradise Beach Ferry & Departure',
        activities: ['Morning ferry to Paradise Beach for swimming', 'French pastry breakfast at Baker Street', 'Afternoon departure toward Chennai'],
      },
    ],
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    region: 'Kanto',
    country: 'Japan',
    category: 'City Escapes',
    tags: ['Neon Shinjuku', 'Shibuya Crossing', 'Anime & Tech', 'Ramen Culture', 'Historic Shrines'],
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'The electrifying metropolis where futuristic neon skyscrapers harmonize with centuries-old Shinto shrines and anime culture.',
    fullDescription: 'Tokyo is an awe-inspiring world capital of design, innovation, and culinary perfection. Walk the world’s busiest crossing in Shibuya, immerse yourself in gaming in Akihabara, uncover ancient serenity at Senso-ji Temple in Asakusa, and savor piping hot ramen from legendary alleyway counters.',
    budgetEstimate: {
      min: 45000,
      max: 95000,
      currency: 'INR',
      durationDays: 5,
    },
    estimatedDailyCost: 9000,
    bestTimeToVisit: 'March to May (Cherry Blossoms) & September to November',
    climateType: 'Humid Subtropical',
    latitude: 35.6762,
    longitude: 139.6503,
    popularityScore: 99,
    suggestedDuration: '5 - 7 Days',
    highlights: [
      'Navigate the tidal wave of people at the world-famous Shibuya Scramble Crossing',
      'Wander through Akihabara electric town and multi-story manga arcades',
      'Step back in time at Senso-ji, Tokyo’s oldest and most sacred Buddhist temple',
      'Feast on conveyor-belt sushi, matcha treats, and rich tonkotsu ramen',
    ],
    practicalTips: [
      'Purchase a Suica or Pasmo digital IC transit card on your phone for all trains and convenience stores.',
      '7-Eleven, Lawson, and FamilyMart offer incredibly high-quality meals on a budget (₹300-₹500).',
      'Always observe train etiquette: keep phones silent and avoid speaking loudly.',
    ],
    topAttractions: [
      {
        name: 'Shibuya Crossing & Hachiko',
        description: 'The pulse of modern Tokyo, surrounded by giant video billboards and neon towers.',
        type: 'Urban Landmark',
        estimatedTime: '2 hrs',
        entryFee: 'Free (Shibuya Sky observation deck ~¥2200)',
      },
      {
        name: 'Senso-ji Temple',
        description: 'Venerable 7th-century Buddhist temple in historic Asakusa with iconic giant red lantern.',
        type: 'Heritage & Temple',
        estimatedTime: '2 hrs',
        entryFee: 'Free',
      },
      {
        name: 'Shinjuku Gyoen National Garden',
        description: 'Massive 144-acre oasis blending traditional Japanese, English, and French landscaped gardens.',
        type: 'Nature & Park',
        estimatedTime: '2 - 3 hrs',
        entryFee: '¥500',
      },
      {
        name: 'Akihabara Electric Town',
        description: 'World epicentre of anime, manga, gaming collectibles, and themed cafes.',
        type: 'Pop Culture & Tech',
        estimatedTime: '3 - 4 hrs',
        entryFee: 'Free',
      },
    ],
    sampleItinerary: [
      {
        dayNumber: 1,
        title: 'Modern Tokyo Icons: Shibuya & Harajuku',
        activities: ['Arrive via Narita/Haneda express train', 'Cross Shibuya Scramble', 'Hike through Meiji Jingu shrine forest', 'Harajuku vintage shopping'],
      },
      {
        dayNumber: 2,
        title: 'Tradition & Tech: Asakusa & Akihabara',
        activities: ['Morning visit to Senso-ji temple', 'Nakamise street snack crawl', 'Afternoon retro gaming in Akihabara', 'Ramen dinner in Shinjuku Golden Gai'],
      },
      {
        dayNumber: 3,
        title: 'Skyline Views & TeamLab Digital Art',
        activities: ['TeamLab Planets immersive sensory museum', 'Tsukiji Outer Market fresh seafood lunch', 'Sunset views from Tokyo Metropolitan Government Building'],
      },
    ],
  },
  {
    id: 'dubai',
    name: 'Dubai',
    region: 'Emirate of Dubai',
    country: 'United Arab Emirates',
    category: 'City Escapes',
    tags: ['Burj Khalifa', 'Desert Safari', 'Luxury & Modern', 'Beaches', 'Gold Souk'],
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Ultramodern desert powerhouse boasting the world’s tallest tower, sprawling malls, desert dune adventures, and palm-fringed coastlines.',
    fullDescription: 'From humble fishing roots on Dubai Creek to a dazzling city of global superlatives, Dubai offers an unforgettable futuristic escape. Stand atop the Burj Khalifa, slide down desert sand dunes on sunset 4x4 safaris, haggle for spices in Old Deira souks, and unwind by turquoise beaches at JBR.',
    budgetEstimate: {
      min: 35000,
      max: 75000,
      currency: 'INR',
      durationDays: 4,
    },
    estimatedDailyCost: 8000,
    bestTimeToVisit: 'November to March',
    climateType: 'Desert Arid',
    latitude: 25.2048,
    longitude: 55.2708,
    popularityScore: 97,
    suggestedDuration: '4 - 5 Days',
    highlights: [
      'Gaze from the observation deck of Burj Khalifa, the tallest building on Earth',
      'Experience high-adrenaline dune bashing and Arabian dinner in the desert',
      'Ride historic wooden Abra boats across Dubai Creek for just 1 AED',
      'Watch the choreographed spectacle of the Dubai Fountain',
    ],
    practicalTips: [
      'Use the super-clean, air-conditioned Dubai Metro with a Silver Nol card.',
      'Summer months (June–August) exceed 42°C; visit during cooler winter months.',
      'Dress respectfully in public malls and religious areas.',
    ],
    topAttractions: [
      {
        name: 'Burj Khalifa',
        description: 'World’s tallest architectural marvel soaring 828 meters into the Arabian sky.',
        type: 'Modern Monument',
        estimatedTime: '2 hrs',
        entryFee: '~179 AED (~₹4000)',
      },
      {
        name: 'Desert Safari Camp',
        description: 'Red dune bashing adventure, sandboarding, camel rides, and starlit barbecue show.',
        type: 'Desert Adventure',
        estimatedTime: '6 hrs (Afternoon - Night)',
        entryFee: '~150 AED (~₹3400)',
      },
      {
        name: 'Old Dubai & Gold/Spice Souks',
        description: 'Historic Deira spice sacks, glittering gold showcases, and aromatic oud perfumes.',
        type: 'Heritage & Shopping',
        estimatedTime: '3 hrs',
        entryFee: 'Free (Abra ride 1 AED)',
      },
      {
        name: 'Dubai Marina & JBR Beach',
        description: 'Lively waterfront promenade lined with superyachts, alfresco cafes, and white sand beaches.',
        type: 'Beach & Lifestyle',
        estimatedTime: '3 hrs',
        entryFee: 'Free',
      },
    ],
    sampleItinerary: [
      {
        dayNumber: 1,
        title: 'Downtown Glitz & Burj Khalifa',
        activities: ['Check-in and metro to Downtown Dubai', 'Explore Dubai Mall & Aquarium', 'Sunset at Burj Khalifa 124th floor', 'Dubai Fountain light show'],
      },
      {
        dayNumber: 2,
        title: 'Desert Dunes & Arabian Night',
        activities: ['Relaxed morning at JBR Beach', '2:30 PM 4x4 desert safari pickup', 'Dune bashing, sandboarding & camel ride', 'Traditional BBQ dinner under stars'],
      },
      {
        dayNumber: 3,
        title: 'Old Dubai Heritage & Creek Abra Ride',
        activities: ['Al Fahidi historical neighbourhood walk', 'Cross Dubai Creek on wooden abra', 'Explore Spice & Gold Souks in Deira', 'Evening Marina yacht cruise'],
      },
    ],
  },
  {
    id: 'london',
    name: 'London',
    region: 'Greater London',
    country: 'United Kingdom',
    category: 'City Escapes',
    tags: ['Big Ben', 'Museums', 'Thames River', 'Historic Pubs', 'Royal Parks'],
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'World cultural capital boasting iconic royal palaces, world-class free national museums, and buzzing Thames riverside districts.',
    fullDescription: 'Steeped in history and pulsating with cosmopolitan energy, London is a treasure trove for curious travelers. Hear the chimes of Big Ben, gaze at the Crown Jewels in the Tower of London, wander world-renowned free museums like the British Museum, and soak in vibrant food stalls at Borough Market.',
    budgetEstimate: {
      min: 55000,
      max: 120000,
      currency: 'INR',
      durationDays: 5,
    },
    estimatedDailyCost: 11000,
    bestTimeToVisit: 'May to September',
    climateType: 'Temperate Oceanic',
    latitude: 51.5074,
    longitude: -0.1278,
    popularityScore: 98,
    suggestedDuration: '5 - 7 Days',
    highlights: [
      'Walk across Westminster Bridge past the iconic Big Ben and Parliament',
      'Explore world treasures for free at the British Museum and Natural History Museum',
      'Sample artisanal street eats and British cheeses at Borough Market',
      'Stroll the South Bank along the River Thames to Tower Bridge',
    ],
    practicalTips: [
      'London’s top national museums (British Museum, V&A, National Gallery) have 100% free admission.',
      'Tap in and out with contactless debit cards or Apple/Google Pay on the Tube (no Oyster card needed).',
      'Carry a lightweight umbrella or rain mac year-round.',
    ],
    topAttractions: [
      {
        name: 'Big Ben & Houses of Parliament',
        description: 'Legendary clock tower and neo-Gothic legislative halls rising beside the River Thames.',
        type: 'Historic Landmark',
        estimatedTime: '1.5 hrs',
        entryFee: 'Free outside view',
      },
      {
        name: 'The British Museum',
        description: 'World-renowned museum housing millions of historic relics including the Rosetta Stone.',
        type: 'Museum & Heritage',
        estimatedTime: '3 - 4 hrs',
        entryFee: 'Free (Booking recommended)',
      },
      {
        name: 'Tower Bridge & Tower of London',
        description: 'Famous Victorian suspension bridge and medieval fortress guarding the royal Crown Jewels.',
        type: 'Historic Fortress',
        estimatedTime: '3 hrs',
        entryFee: 'Bridge Free / Tower of London ~£34 (~₹3700)',
      },
      {
        name: 'Borough Market',
        description: 'Bustling 1,000-year-old gourmet food market packed with British and international treats.',
        type: 'Food Market',
        estimatedTime: '2 hrs',
        entryFee: 'Free',
      },
    ],
    sampleItinerary: [
      {
        dayNumber: 1,
        title: 'Westminster Icons & South Bank',
        activities: ['Arrival and Tube to hotel', 'Walk past Big Ben & Westminster Abbey', 'Cross bridge to London Eye and South Bank street artists', 'Pub dinner near Waterloo'],
      },
      {
        dayNumber: 2,
        title: 'World Museums & Covent Garden',
        activities: ['Morning tour of the British Museum', 'Covent Garden street performers and lunch', 'Afternoon walk through Soho and Chinatown'],
      },
      {
        dayNumber: 3,
        title: 'Tower Bridge & Borough Market Feast',
        activities: ['Borough Market gourmet breakfast', 'Walk across glass walkways of Tower Bridge', 'Thames clipper boat ride toward Greenwich'],
      },
    ],
  },
];

// Helper to sanitize search string
function cleanQuery(q: string): string {
  return q.toLowerCase().trim().replace(/[^\w\s]/gi, '');
}

// Generate realistic travel imagery based on location name and keywords
function getGeneratedImageUrl(locationName: string, category: DestinationCategory): string {
  const imagesByCategory: Record<DestinationCategory, string[]> = {
    Mountains: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    ],
    Beaches: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520454974749-623a32cd053c?auto=format&fit=crop&w=1200&q=80',
    ],
    Heritage: [
      'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    ],
    Nature: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
    ],
    Adventure: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533692328991-08159ff19fca?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1200&q=80',
    ],
    'City Escapes': [
      'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
    ],
  };

  const pool = imagesByCategory[category] || imagesByCategory['City Escapes'];
  const hash = Math.abs(
    locationName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  );
  return pool[hash % pool.length];
}

// Infer category from name or keywords
function inferCategory(query: string): DestinationCategory {
  const q = query.toLowerCase();
  if (
    q.includes('beach') ||
    q.includes('island') ||
    q.includes('coast') ||
    q.includes('sea') ||
    q.includes('ocean') ||
    q.includes('cove') ||
    q.includes('santorini') ||
    q.includes('maldives') ||
    q.includes('phuket') ||
    q.includes('bali') ||
    q.includes('ibiza') ||
    q.includes('gokarna') ||
    q.includes('varkala') ||
    q.includes('andaman')
  ) {
    return 'Beaches';
  }
  if (q.includes('mountain') || q.includes('hill') || q.includes('peak') || q.includes('valley') || q.includes('snow') || q.includes('pass') || q.includes('alps') || q.includes('trek')) {
    return 'Mountains';
  }
  if (q.includes('temple') || q.includes('fort') || q.includes('palace') || q.includes('ruin') || q.includes('heritage') || q.includes('historic') || q.includes('ancient')) {
    return 'Heritage';
  }
  if (q.includes('forest') || q.includes('lake') || q.includes('river') || q.includes('waterfall') || q.includes('national park') || q.includes('safari') || q.includes('nature')) {
    return 'Nature';
  }
  if (q.includes('rafting') || q.includes('camp') || q.includes('bungee') || q.includes('scuba') || q.includes('skydiving') || q.includes('adventure')) {
    return 'Adventure';
  }
  return 'City Escapes';
}

// Infer approximate coordinates for popular countries/continents if unknown
function inferCoordinates(name: string): { latitude: number; longitude: number; country: string; region: string } {
  const n = name.toLowerCase();

  // Known Indian places
  if (n.includes('shimla')) return { latitude: 31.1048, longitude: 77.1734, country: 'India', region: 'Himachal Pradesh' };
  if (n.includes('kasol')) return { latitude: 32.0100, longitude: 77.3150, country: 'India', region: 'Himachal Pradesh' };
  if (n.includes('darjeeling')) return { latitude: 27.0410, longitude: 88.2663, country: 'India', region: 'West Bengal' };
  if (n.includes('ooty')) return { latitude: 11.4102, longitude: 76.6950, country: 'India', region: 'Tamil Nadu' };
  if (n.includes('varanasi')) return { latitude: 25.3176, longitude: 82.9739, country: 'India', region: 'Uttar Pradesh' };
  if (n.includes('pondicherry') || n.includes('puducherry')) return { latitude: 11.9416, longitude: 79.8083, country: 'India', region: 'Puducherry' };
  if (n.includes('agra')) return { latitude: 27.1767, longitude: 78.0081, country: 'India', region: 'Uttar Pradesh' };
  if (n.includes('hampi')) return { latitude: 15.3350, longitude: 76.4600, country: 'India', region: 'Karnataka' };
  if (n.includes('munnar')) return { latitude: 10.0889, longitude: 77.0595, country: 'India', region: 'Kerala' };
  if (n.includes('nainital')) return { latitude: 29.3919, longitude: 79.4542, country: 'India', region: 'Uttarakhand' };
  if (n.includes('mussoorie')) return { latitude: 30.4598, longitude: 78.0644, country: 'India', region: 'Uttarakhand' };
  if (n.includes('srinagar') || n.includes('kashmir')) return { latitude: 34.0837, longitude: 74.7973, country: 'India', region: 'Jammu & Kashmir' };
  if (n.includes('delhi')) return { latitude: 28.6139, longitude: 77.2090, country: 'India', region: 'National Capital Region' };
  if (n.includes('mumbai')) return { latitude: 19.0760, longitude: 72.8777, country: 'India', region: 'Maharashtra' };
  if (n.includes('kolkata')) return { latitude: 22.5726, longitude: 88.3639, country: 'India', region: 'West Bengal' };
  if (n.includes('andaman')) return { latitude: 11.6234, longitude: 92.7265, country: 'India', region: 'Andaman & Nicobar' };
  if (n.includes('coorg')) return { latitude: 12.3375, longitude: 75.8069, country: 'India', region: 'Karnataka' };
  if (n.includes('spiti')) return { latitude: 32.2461, longitude: 78.0349, country: 'India', region: 'Himachal Pradesh' };

  // Known Global cities
  if (n.includes('tokyo')) return { latitude: 35.6762, longitude: 139.6503, country: 'Japan', region: 'Kanto' };
  if (n.includes('paris')) return { latitude: 48.8566, longitude: 2.3522, country: 'France', region: 'Île-de-France' };
  if (n.includes('london')) return { latitude: 51.5074, longitude: -0.1278, country: 'United Kingdom', region: 'Greater London' };
  if (n.includes('dubai')) return { latitude: 25.2048, longitude: 55.2708, country: 'United Arab Emirates', region: 'Emirate of Dubai' };
  if (n.includes('rome')) return { latitude: 41.9028, longitude: 12.4964, country: 'Italy', region: 'Lazio' };
  if (n.includes('singapore')) return { latitude: 1.3521, longitude: 103.8198, country: 'Singapore', region: 'Southeast Asia' };
  if (n.includes('bangkok')) return { latitude: 13.7563, longitude: 100.5018, country: 'Thailand', region: 'Central Thailand' };
  if (n.includes('new york') || n.includes('nyc')) return { latitude: 40.7128, longitude: -74.0060, country: 'United States', region: 'New York' };
  if (n.includes('switzerland') || n.includes('interlaken') || n.includes('zurich')) return { latitude: 46.6863, longitude: 7.8632, country: 'Switzerland', region: 'Bernese Oberland' };
  if (n.includes('maldives')) return { latitude: 3.2028, longitude: 73.2207, country: 'Maldives', region: 'Indian Ocean' };

  // Generic fallback based on name characters hash
  const hash = Math.abs(name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0));
  const fallbackLat = 20.0 + (hash % 25);
  const fallbackLng = 75.0 + (hash % 20);

  return {
    latitude: Number(fallbackLat.toFixed(4)),
    longitude: Number(fallbackLng.toFixed(4)),
    country: 'Global Explorer',
    region: 'Scenic Getaway',
  };
}

export class DestinationService {
  /**
   * Retrieves all available destinations (pre-seeded + additional catalogue + dynamic cache)
   */
  static getAllDestinations(): Destination[] {
    const combined = [...DESTINATIONS];

    // Add additional catalogue items avoiding duplicate IDs
    for (const add of ADDITIONAL_POPULAR_DESTINATIONS) {
      if (!combined.some((d) => d.id === add.id)) {
        combined.push(add);
      }
    }

    // Add any dynamically generated destinations from localStorage
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem(DYNAMIC_DESTINATIONS_STORAGE_KEY);
        if (stored) {
          const dynamicList: Destination[] = JSON.parse(stored);
          for (const item of dynamicList) {
            if (!combined.some((d) => d.id === item.id)) {
              combined.push(item);
            }
          }
        }
      } catch {
        // Ignore localStorage errors
      }
    }

    return combined;
  }

  /**
   * Find a destination by ID. If not found in known lists, dynamically generates it!
   */
  static getDestinationById(id: string): Destination | null {
    if (!id) return null;
    const all = this.getAllDestinations();
    const found = all.find((d) => d.id.toLowerCase() === id.toLowerCase());
    if (found) return found;

    // If ID looks like a destination name or slug, generate on the fly
    return this.synthesizeDestination(id);
  }

  /**
   * Dynamically generates a complete Destination object for ANY searched location
   */
  static synthesizeDestination(nameQuery: string): Destination {
    const trimmed = nameQuery.trim();
    // Capitalize words
    const displayName = trimmed
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = inferCategory(trimmed);
    const geo = inferCoordinates(trimmed);
    const mainImg = getGeneratedImageUrl(displayName, category);

    const isDomestic = geo.country.toLowerCase() === 'india';
    const minBudget = isDomestic ? 5000 : 35000;
    const maxBudget = isDomestic ? 13000 : 85000;
    const dailyCost = isDomestic ? 1800 : 7500;

    const synthesized: Destination = {
      id: `discovered-${slug}`,
      name: displayName,
      region: geo.region,
      country: geo.country,
      category,
      tags: [category, 'Dynamic Discovery', 'Exploration', 'Trending', 'Travel Guide'],
      imageUrl: mainImg,
      galleryImages: [
        mainImg,
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
      ],
      shortDescription: `Curated traveler guide for ${displayName}, featuring iconic local sights, cultural walks, and budget planning.`,
      fullDescription: `Discover the wonders of ${displayName} (${geo.region}, ${geo.country}). From lively neighborhood cafes and traditional bazaars to stunning viewpoints and historic monuments, ${displayName} provides a rich, memorable escape for student groups, solo travelers, and adventurers.`,
      budgetEstimate: {
        min: minBudget,
        max: maxBudget,
        currency: 'INR',
        durationDays: 4,
      },
      estimatedDailyCost: dailyCost,
      bestTimeToVisit: 'September to April (Ideal weather & comfortable sightseeing)',
      climateType: 'Moderate Continental / Highland',
      latitude: geo.latitude,
      longitude: geo.longitude,
      popularityScore: 90,
      suggestedDuration: '3 - 5 Days',
      highlights: [
        `Explore the historic heart and scenic viewpoints of ${displayName}`,
        `Taste authentic local culinary specialties and visit artisan markets`,
        `Enjoy memorable day excursions, walking tours, and cultural photography`,
        `Relax at highly rated traveler hostels and boutique stays`,
      ],
      practicalTips: [
        'Check transit connections in advance to secure the best fares.',
        'Carry local cash for public transport, entrance kiosks, and street dining.',
        'Download offline maps on your phone for smooth navigation without data.',
      ],
      topAttractions: [
        {
          name: `${displayName} City Center & Promenade`,
          description: `Vibrant pedestrian promenade and cultural core of ${displayName}.`,
          type: 'City Walk & Lifestyle',
          estimatedTime: '2 - 3 hrs',
          entryFee: 'Free',
        },
        {
          name: `${displayName} Historic Landmark`,
          description: `Signature architectural and cultural treasure showcasing the heritage of ${geo.region}.`,
          type: 'Heritage & Culture',
          estimatedTime: '2 hrs',
          entryFee: 'Nominal entrance fee',
        },
        {
          name: `${displayName} Panorama Viewpoint`,
          description: `Elevated vantage point offering breathtaking sunset and horizon vistas.`,
          type: 'Scenic Viewpoint',
          estimatedTime: '1.5 hrs',
          entryFee: 'Free',
        },
        {
          name: `${displayName} Local Crafts & Food Market`,
          description: `Bustling open-air market filled with regional street eats, textiles, and souvenirs.`,
          type: 'Shopping & Dining',
          estimatedTime: '2 hrs',
          entryFee: 'Free',
        },
      ],
      sampleItinerary: [
        {
          dayNumber: 1,
          title: `Arrival & Getting Oriented in ${displayName}`,
          activities: [
            `Arrive and check in at central backpacker stay`,
            `Walking tour through ${displayName} old town and cafes`,
            `Sunset dinner at a recommended local eatery`,
          ],
        },
        {
          dayNumber: 2,
          title: 'Signature Heritage & Viewpoints',
          activities: [
            `Morning visit to ${displayName} Historic Landmark`,
            `Panoramic viewpoint hike / cable car ride`,
            `Evening street food crawl and souvenir shopping`,
          ],
        },
        {
          dayNumber: 3,
          title: 'Nature Excursions & Departure',
          activities: [
            `Excursion to surrounding nature trails or riverfront`,
            `Final brunch at a celebrated local bakery`,
            `Departure for next adventure`,
          ],
        },
      ],
    };

    // Cache to localStorage so it persists across views and trip creation
    this.cacheDynamicDestination(synthesized);

    return synthesized;
  }

  /**
   * Persists a dynamic destination to localStorage
   */
  static cacheDynamicDestination(destination: Destination): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const stored = localStorage.getItem(DYNAMIC_DESTINATIONS_STORAGE_KEY);
      let list: Destination[] = stored ? JSON.parse(stored) : [];
      if (!list.some((d) => d.id === destination.id)) {
        list.unshift(destination);
        // Cap cache to 20 destinations
        if (list.length > 20) list = list.slice(0, 20);
        localStorage.setItem(DYNAMIC_DESTINATIONS_STORAGE_KEY, JSON.stringify(list));
      }
    } catch (e) {
      console.warn('Unable to cache dynamic destination:', e);
    }
  }

  /**
   * Searches destinations with fuzzy matching and dynamic discovery fallback
   */
  static searchDestinations(
    query: string,
    options?: {
      category?: DestinationCategory | 'All';
      maxBudget?: number;
      sortBy?: 'popularity' | 'budget-asc' | 'budget-desc' | 'name';
    }
  ): {
    results: Destination[];
    hasDynamicDiscovery: boolean;
    generatedDestination?: Destination;
    isFallbackSuggestion: boolean;
  } {
    const rawQuery = (query || '').trim();
    const cleanQ = cleanQuery(rawQuery);
    const category = options?.category || 'All';
    const maxBudget = options?.maxBudget !== undefined ? options?.maxBudget : 160000;
    const sortBy = options?.sortBy || 'popularity';

    const all = this.getAllDestinations();

    // 1. If no query, return standard filtered & sorted catalogue
    if (!cleanQ) {
      let filtered = all.filter((dest) => {
        if (category !== 'All' && dest.category !== category) return false;
        if (dest.budgetEstimate.min > maxBudget) return false;
        return true;
      });
      this.sortDestinations(filtered, sortBy);
      return {
        results: filtered,
        hasDynamicDiscovery: false,
        isFallbackSuggestion: false,
      };
    }

    // 2. Perform score-based match on all known destinations
    const scoredMatches: { dest: Destination; score: number }[] = [];

    for (const dest of all) {
      const name = dest.name.toLowerCase();
      const region = dest.region.toLowerCase();
      const country = dest.country.toLowerCase();
      const tags = dest.tags.map((t) => t.toLowerCase());
      const cat = dest.category.toLowerCase();
      const shortDesc = dest.shortDescription.toLowerCase();

      let score = 0;

      // Exact match
      if (name === cleanQ || dest.id === cleanQ) {
        score += 100;
      } else if (name.startsWith(cleanQ)) {
        score += 80;
      } else if (name.includes(cleanQ)) {
        score += 60;
      } else if (cleanQ.includes(name)) {
        score += 55;
      }

      // Region & Country match
      if (region.includes(cleanQ)) score += 40;
      if (country.includes(cleanQ)) score += 40;

      // Tag & Category match
      if (cat.includes(cleanQ)) score += 30;
      for (const tag of tags) {
        if (tag.includes(cleanQ)) score += 25;
      }

      // Short description keyword match
      if (shortDesc.includes(cleanQ)) score += 15;

      // Fuzzy / typo tolerance (Levenshtein-style check for common typos like 'manli', 'goaa')
      if (score === 0 && cleanQ.length >= 3) {
        if (this.isFuzzyMatch(name, cleanQ)) {
          score += 35;
        }
      }

      if (score > 0) {
        // Check category and budget filters
        const categoryPass = category === 'All' || dest.category === category;
        const budgetPass = dest.budgetEstimate.min <= maxBudget;
        if (categoryPass && budgetPass) {
          scoredMatches.push({ dest, score });
        }
      }
    }

    // Sort by score descending, then by chosen sort
    scoredMatches.sort((a, b) => b.score - a.score);
    let matchedDestinations = scoredMatches.map((m) => m.dest);

    // 3. If exact or fuzzy matches were found, return them
    if (matchedDestinations.length > 0) {
      this.sortDestinations(matchedDestinations, sortBy);
      return {
        results: matchedDestinations,
        hasDynamicDiscovery: false,
        isFallbackSuggestion: false,
      };
    }

    // 4. NO MATCH IN CATALOGUE -> DYNAMIC DISCOVERY ENGINE!
    // Synthesize a custom destination for the user's specific query
    const generated = this.synthesizeDestination(rawQuery);

    // Also pick 3 relevant suggestions from the catalogue so the page is rich
    const suggestions = all
      .filter((d) => d.id !== generated.id)
      .slice(0, 3);

    return {
      results: [generated, ...suggestions],
      hasDynamicDiscovery: true,
      generatedDestination: generated,
      isFallbackSuggestion: true,
    };
  }

  /**
   * Sort destination array in place
   */
  private static sortDestinations(
    destinations: Destination[],
    sortBy: 'popularity' | 'budget-asc' | 'budget-desc' | 'name'
  ): void {
    destinations.sort((a, b) => {
      if (sortBy === 'popularity') return b.popularityScore - a.popularityScore;
      if (sortBy === 'budget-asc') return a.budgetEstimate.min - b.budgetEstimate.min;
      if (sortBy === 'budget-desc') return b.budgetEstimate.min - a.budgetEstimate.min;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }

  /**
   * Simple fuzzy string matching tolerance for typos
   */
  private static isFuzzyMatch(target: string, query: string): boolean {
    if (Math.abs(target.length - query.length) > 2) return false;
    let mismatches = 0;
    let i = 0;
    let j = 0;
    while (i < target.length && j < query.length) {
      if (target[i] === query[j]) {
        i++;
        j++;
      } else {
        mismatches++;
        if (mismatches > 2) return false;
        if (target.length > query.length) i++;
        else if (query.length > target.length) j++;
        else {
          i++;
          j++;
        }
      }
    }
    return mismatches <= 2;
  }

  /**
   * Quick suggestions for search bar autocompletion
   */
  static getSuggestions(query: string, limit: number = 5): Destination[] {
    const cleanQ = cleanQuery(query);
    if (!cleanQ) return [];

    const all = this.getAllDestinations();
    const matches: Destination[] = [];

    for (const d of all) {
      if (
        d.name.toLowerCase().includes(cleanQ) ||
        d.region.toLowerCase().includes(cleanQ) ||
        d.country.toLowerCase().includes(cleanQ) ||
        d.tags.some((t) => t.toLowerCase().includes(cleanQ))
      ) {
        matches.push(d);
        if (matches.length >= limit) break;
      }
    }

    return matches;
  }
}
