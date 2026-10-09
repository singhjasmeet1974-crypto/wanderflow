import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DestinationService } from '../lib/destinationService';
import { StorageService } from '../lib/storage';
import { WeatherWidget } from '../components/destination/WeatherWidget';
import { DestinationMap } from '../components/destination/DestinationMap';
import { ExternalBookingModal } from '../components/trip/ExternalBookingModal';
import {
  MapPin,
  Calendar,
  Clock,
  Heart,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Compass,
  ArrowLeft,
  DollarSign,
  Sun,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const destination = useMemo(() => {
    return id ? DestinationService.getDestinationById(id) : null;
  }, [id]);

  const [isSaved, setIsSaved] = useState<boolean>(() =>
    destination ? StorageService.isDestinationSaved(destination.id) : false
  );
  const [saveToast, setSaveToast] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (destination) {
      setIsSaved(StorageService.isDestinationSaved(destination.id));
    }
  }, [destination]);

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-editorial text-stone-900">
          Destination Not Found
        </h2>
        <p className="text-sm text-stone-600">
          The requested destination could not be located in our curated catalogue.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#16382B] text-white rounded-xl text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>
      </div>
    );
  }

  const handleToggleSave = () => {
    const updated = StorageService.toggleSaveDestination(destination.id);
    setIsSaved(updated);
    setSaveToast(updated ? `Saved ${destination.name} to bookmarks!` : `Removed ${destination.name} from bookmarks.`);
    setTimeout(() => setSaveToast(null), 2500);
  };

  return (
    <div className="pb-20 space-y-10">
      {/* Save Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#16382B] text-white text-xs font-semibold shadow-xl flex items-center gap-2 border border-white/20 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-[#E5A43B]" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Hero Header */}
      <section className="relative h-[420px] sm:h-[480px] w-full overflow-hidden bg-stone-900">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover filter brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F261D] via-black/40 to-transparent"></div>

        {/* Back Link */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-stone-200 text-xs font-semibold transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Hero Content Over Image */}
        <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 right-4 sm:right-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#E5A43B] text-[#0F261D] text-xs font-extrabold uppercase tracking-wide">
                {destination.category}
              </span>
              <span className="text-xs text-stone-300 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E0704D]" />
                {destination.region}, {destination.country}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold font-editorial text-white tracking-tight drop-shadow-md">
              {destination.name}
            </h1>

            <p className="text-xs sm:text-sm text-stone-200 max-w-2xl line-clamp-2">
              {destination.shortDescription}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleToggleSave}
              className={`p-3 rounded-xl border backdrop-blur-md transition flex items-center gap-2 text-xs font-bold cursor-pointer ${
                isSaved
                  ? 'bg-rose-600/90 border-rose-500 text-white'
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Place'}</span>
            </button>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-4 py-3 rounded-xl bg-white/20 border border-white/30 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-[#E5A43B]" />
              <span>Booking Options</span>
            </button>

            <Link
              to={`/trips/new?dest=${destination.id}`}
              className="px-5 py-3 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white text-xs font-bold shadow-lg transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Plan Trip Here</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Description, Highlights, Attractions, Sample Itinerary */}
        <div className="lg:col-span-8 space-y-10">
          {/* Overview */}
          <section className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-2xl font-bold font-editorial text-stone-900">
              About {destination.name}
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed font-sans-ui">
              {destination.fullDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {destination.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section className="bg-[#FAF9F6] rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold font-editorial text-stone-900">
              Key Experiences &amp; Travel Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-stone-200 text-xs text-stone-800 flex items-start gap-2.5 font-medium leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#16382B] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Top Attractions Cards */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-editorial text-stone-900">
                Top Sights &amp; Landmarks
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                {destination.topAttractions.length} Curated Attractions
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {destination.topAttractions.map((attraction, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-[#E6E2D8] space-y-2 hover:border-[#16382B]/30 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-[#16382B]">
                      {attraction.type}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      Est: {attraction.estimatedTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 font-editorial">
                    {attraction.name}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {attraction.description}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span>Entry / Permit:</span>
                    <span className="font-bold text-stone-800">{attraction.entryFee}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sample Daily Itinerary */}
          <section className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E0704D]">
                  Blueprint
                </span>
                <h2 className="text-2xl font-bold font-editorial text-stone-900 mt-0.5">
                  Suggested {destination.suggestedDuration} Itinerary
                </h2>
              </div>
              <Link
                to={`/trips/new?dest=${destination.id}`}
                className="text-xs font-bold text-[#16382B] hover:text-[#E0704D] flex items-center gap-1"
              >
                <span>Use as Trip Template</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {destination.sampleItinerary.map((day) => (
                <div
                  key={day.dayNumber}
                  className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#16382B] text-white text-xs font-bold font-editorial">
                      Day {day.dayNumber}
                    </span>
                    <h3 className="text-sm font-bold text-stone-900 font-editorial">
                      {day.title}
                    </h3>
                  </div>

                  <ul className="space-y-1.5 pl-2 text-xs text-stone-600">
                    {day.activities.map((act, actIdx) => (
                      <li key={actIdx} className="flex items-start gap-2">
                        <span className="text-[#E0704D] font-bold">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Practical Backpacker Tips */}
          <section className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200/80 space-y-3">
            <h2 className="text-lg font-bold font-editorial text-amber-950 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700" />
              Practical Travel &amp; Student Tips
            </h2>
            <ul className="space-y-2 text-xs text-amber-900">
              {destination.practicalTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Sidebar (4 cols): Weather, Budget, Climate, Map */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Live Weather Widget */}
          <WeatherWidget
            latitude={destination.latitude}
            longitude={destination.longitude}
            locationName={destination.name}
          />

          {/* Budget Overview Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#E6E2D8] space-y-4 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              Budget Estimate
            </span>
            <div className="space-y-1">
              <span className="text-3xl font-extrabold text-[#16382B] font-editorial block">
                ₹{destination.budgetEstimate.min.toLocaleString()} - ₹{destination.budgetEstimate.max.toLocaleString()}
              </span>
              <span className="text-xs text-stone-500">
                Estimated range for {destination.budgetEstimate.durationDays} days per student traveler.
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-600">Daily average spend:</span>
              <strong className="text-stone-900">₹{destination.estimatedDailyCost.toLocaleString()} / day</strong>
            </div>

            <div className="text-[11px] text-stone-400 italic">
              * Indicative student estimate covering budget dorm stays, public/scooter transit, and local food.
            </div>
          </div>

          {/* Best Time & Climate */}
          <div className="p-6 rounded-3xl bg-white border border-[#E6E2D8] space-y-3 shadow-xs">
            <h4 className="text-xs uppercase font-bold tracking-wider text-stone-500">
              Season &amp; Climate
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-[#16382B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">Best Time to Visit:</span>
                  <span className="text-stone-600">{destination.bestTimeToVisit}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2 border-t border-stone-100">
                <Sun className="w-4 h-4 text-[#E5A43B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">Climate Classification:</span>
                  <span className="text-stone-600">{destination.climateType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Geographic Map */}
          <DestinationMap
            destinationName={destination.name}
            latitude={destination.latitude}
            longitude={destination.longitude}
            attractions={destination.topAttractions}
          />
        </aside>
      </div>

      {/* External Booking Modal */}
      <ExternalBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        destinationName={destination.name}
      />
    </div>
  );
};
