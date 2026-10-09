import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { TRAVEL_GUIDES } from '../data/travelGuides';
import { GROUP_TRIPS } from '../data/groupTrips';
import { DestinationCard } from '../components/destination/DestinationCard';
import { GroupTripCard } from '../components/group/GroupTripCard';
import { DestinationCategory } from '../types';
import {
  Compass,
  Search,
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Tent,
  Mountain,
  Palmtree,
  Building2,
  Flame,
  ArrowUpRight,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchDestination, setSearchDestination] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory | 'All'>('All');
  const [travelerCount, setTravelerCount] = useState<number>(2);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchDestination.trim()) params.set('q', searchDestination.trim());
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (travelerCount) params.set('pax', travelerCount.toString());
    navigate(`/explore?${params.toString()}`);
  };

  const categories = [
    { name: 'Mountains', icon: Mountain, count: 3, image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80' },
    { name: 'Heritage', icon: Building2, count: 3, image: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Beaches', icon: Palmtree, count: 2, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Adventure', icon: Flame, count: 2, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80' },
    { name: 'Nature', icon: Tent, count: 1, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80' },
    { name: 'City Escapes', icon: Sparkles, count: 2, image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=400&q=80' },
  ];

  const curatedCollections = [
    {
      title: 'Weekend Student Getaways',
      desc: 'Quick 2 to 3-day escapes under ₹5,000 from college campuses.',
      query: 'category=Heritage',
      bgClass: 'from-amber-900/80 to-stone-900',
      image: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Himalayan High Altitude',
      desc: 'Snow passes, mountain cafes, and pine-clad hiking trails.',
      query: 'category=Mountains',
      bgClass: 'from-emerald-950/80 to-stone-900',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Budget Backpacker Trails',
      desc: 'Affordable hostels, street food crawls, and free viewpoints.',
      query: 'maxBudget=12000',
      bgClass: 'from-teal-950/80 to-stone-900',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Sun, Surf & Coastal Nights',
      desc: 'Golden sands, fresh coconut groves, and scooter caravans.',
      query: 'category=Beaches',
      bgClass: 'from-rose-950/80 to-stone-900',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const featuredDestinations = DESTINATIONS.slice(0, 6);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8">
        {/* Background Image with Warm Forest Gradient Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl mx-3 sm:mx-6 lg:mx-8">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
            alt="Scenic travel mountains"
            className="w-full h-full object-cover object-center filter brightness-[0.82]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F261D] via-[#16382B]/60 to-[#0F261D]/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 pt-10 pb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#F3EFE6] text-xs font-semibold shadow-xs animate-in fade-in duration-500">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A43B]" />
            <span>Wanderflow • Curated Travel &amp; Itinerary Planner</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight font-editorial drop-shadow-md leading-[1.08]">
            Your next adventure <br />
            <span className="italic font-normal text-[#E5A43B]">starts here.</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed font-sans-ui">
            Discover curated destinations, organize day-by-day itineraries, track estimated expenses, check live weather, and plan unforgettable trips with friends.
          </p>

          {/* Functional Search Bar */}
          <form
            onSubmit={handleHeroSearch}
            className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-2xl border border-white/30 text-left grid grid-cols-1 sm:grid-cols-12 gap-2"
          >
            {/* Destination Input */}
            <div className="sm:col-span-5 px-3 py-1.5 rounded-xl hover:bg-stone-50 transition border border-transparent focus-within:border-[#16382B]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block">
                Destination
              </label>
              <div className="flex items-center gap-2 mt-0.5">
                <MapPin className="w-4 h-4 text-[#E0704D] shrink-0" />
                <input
                  type="text"
                  placeholder="Where to? (e.g. Manali, Amritsar, Goa)..."
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold text-stone-900 bg-transparent focus:outline-none placeholder:text-stone-400 placeholder:font-normal"
                />
              </div>
            </div>

            {/* Category Selector */}
            <div className="sm:col-span-4 px-3 py-1.5 rounded-xl hover:bg-stone-50 transition border border-transparent focus-within:border-[#16382B]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block">
                Category
              </label>
              <div className="flex items-center gap-2 mt-0.5">
                <Compass className="w-4 h-4 text-[#16382B] shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as DestinationCategory | 'All')
                  }
                  className="w-full text-xs sm:text-sm font-semibold text-stone-800 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Mountains">Mountains</option>
                  <option value="Heritage">Heritage</option>
                  <option value="Beaches">Beaches</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Nature">Nature</option>
                  <option value="City Escapes">City Escapes</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="sm:col-span-3 flex items-center">
              <button
                type="submit"
                className="w-full h-full py-3 sm:py-0 px-5 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#E5A43B]" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-stone-300">
            <span className="font-medium text-stone-400">Popular:</span>
            {['Manali', 'Amritsar', 'Goa', 'Rishikesh', 'Bali'].map((city) => (
              <button
                key={city}
                onClick={() => navigate(`/explore?q=${city}`)}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-stone-100 border border-white/15 transition cursor-pointer"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Categories Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E6E2D8] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E0704D]">
                Browse by Vibe
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-editorial mt-1">
                Explore Destination Categories
              </h2>
            </div>
            <Link
              to="/explore"
              className="text-xs font-bold text-[#16382B] hover:text-[#E0704D] flex items-center gap-1 transition"
            >
              <span>View All 12 Destinations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/explore?category=${cat.name}`}
                  className="group relative h-36 rounded-2xl overflow-hidden p-3 flex flex-col justify-between border border-stone-200 hover:border-[#16382B] hover:shadow-lg transition-all"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="relative z-10 w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Icon className="w-4 h-4 text-[#E5A43B]" />
                  </div>

                  <div className="relative z-10 text-white">
                    <h3 className="text-sm font-bold font-editorial group-hover:text-[#E5A43B] transition">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] text-stone-300">
                      {cat.count} {cat.count === 1 ? 'place' : 'places'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Destinations */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E6E2D8] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E0704D]">
                Handpicked Favorites
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-editorial mt-1">
                Popular Student &amp; Young Traveler Destinations
              </h2>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#16382B]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </section>

        {/* Curated Collections Banner Grid */}
        <section className="space-y-6">
          <div className="border-b border-[#E6E2D8] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E0704D]">
              Inspiration Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-editorial mt-1">
              Curated Trips for Every Travel Style
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {curatedCollections.map((col, idx) => (
              <Link
                key={idx}
                to={`/explore?${col.query}`}
                className="group relative h-64 rounded-2xl overflow-hidden p-5 flex flex-col justify-end text-white border border-stone-200 hover:shadow-xl transition-all"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.7]"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${col.bgClass}`}
                ></div>

                <div className="relative z-10 space-y-1">
                  <h3 className="text-lg font-bold font-editorial group-hover:text-[#E5A43B] transition">
                    {col.title}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                    {col.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E5A43B] pt-1">
                    <span>Discover Places</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How Wanderflow Works */}
        <section className="bg-white rounded-3xl border border-[#E6E2D8] p-8 sm:p-12 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E0704D]">
              Simple &amp; Powerful
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-editorial">
              How Wanderflow Simplifies Your Trip
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Stop toggling between 8 different browser tabs, spreadsheets, and messy group chats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Discover & Compare',
                desc: 'Explore curated student destinations with indicative budgets, best travel seasons, and practical tips.',
              },
              {
                step: '02',
                title: 'Build Day-by-Day Itineraries',
                desc: 'Organize daily activities with exact times, notes, venues, and estimated costs with reordering controls.',
              },
              {
                step: '03',
                title: 'Check Live Weather & Maps',
                desc: 'View real Open-Meteo meteorological readings and OpenStreetMap landmark coordinates before you pack.',
              },
              {
                step: '04',
                title: 'Print & Book Safely',
                desc: 'Export a printable PDF itinerary for offline reference and access contextual external booking links.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2 relative"
              >
                <span className="text-3xl font-extrabold text-[#16382B]/20 font-editorial block">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-stone-900 font-editorial">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gen-Z Group Travel Concept Preview */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E6E2D8] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E0704D] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Social Travel Concept
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-editorial mt-1">
                Group Trips with Like-Minded Explorers
              </h2>
            </div>
            <Link
              to="/group-trips"
              className="text-xs font-bold text-[#16382B] hover:text-[#E0704D] flex items-center gap-1"
            >
              <span>Explore Group Trips Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GROUP_TRIPS.slice(0, 2).map((gt) => (
              <GroupTripCard key={gt.id} trip={gt} />
            ))}
          </div>
        </section>

        {/* Travel Guides Preview */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E6E2D8] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E0704D]">
                Editorial Advice
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-editorial mt-1">
                Student Travel Guides &amp; Checklists
              </h2>
            </div>
            <Link
              to="/guides"
              className="text-xs font-bold text-[#16382B] hover:text-[#E0704D] flex items-center gap-1"
            >
              <span>View All Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRAVEL_GUIDES.slice(0, 3).map((guide) => (
              <Link
                key={guide.id}
                to={`/guides/${guide.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E6E2D8] hover:border-[#16382B] hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-stone-100">
                    <img
                      src={guide.coverImage}
                      alt={guide.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/90 text-stone-800 text-[10px] font-bold">
                      {guide.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-stone-400">
                      <span>{guide.readTimeMinutes} min read</span>
                      <span>•</span>
                      <span>By {guide.author.name}</span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 group-hover:text-[#16382B] transition font-editorial">
                      {guide.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#16382B]">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA Card */}
        <section className="bg-gradient-to-br from-[#16382B] to-[#0F261D] rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#E5A43B]/10 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#E0704D]/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E5A43B]">
              Ready for your next journey?
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-editorial">
              Start planning your personalized itinerary today.
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans-ui">
              Whether you’re heading to Manali’s snowy passes, experiencing the serenity of Amritsar’s Golden Temple, or unwinding on Goa’s sunny beaches, Wanderflow keeps every detail organized.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/trips/new"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white font-bold text-sm shadow-md transition"
              >
                Create a New Trip
              </Link>
              <Link
                to="/explore"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition"
              >
                Browse All Destinations
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
