import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { StorageService } from '../lib/storage';
import { useAuth } from '../context/AuthContext';
import { Trip, TravelStyle, ItineraryDay } from '../types';
import {
  Compass,
  Calendar,
  Users,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const TripPlannerPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const preselectedDestId = searchParams.get('dest') || 'manali';
  const preselectedDestination = DESTINATIONS.find((d) => d.id === preselectedDestId) || DESTINATIONS[0];

  const [destinationId, setDestinationId] = useState<string>(preselectedDestination.id);
  const [tripTitle, setTripTitle] = useState<string>(
    `${preselectedDestination.name} Exploration Trip`
  );
  
  // Default dates: next week
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const fiveDaysLater = new Date(nextWeek.getTime() + 4 * 24 * 60 * 60 * 1000);

  const [startDate, setStartDate] = useState<string>(
    nextWeek.toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    fiveDaysLater.toISOString().split('T')[0]
  );
  const [travelerCount, setTravelerCount] = useState<number>(3);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('Student Group');
  const [preferencesNotes, setPreferencesNotes] = useState<string>('');
  const [importSampleActivities, setImportSampleActivities] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync title when destination changes
  const handleDestinationChange = (id: string) => {
    setDestinationId(id);
    const dest = DESTINATIONS.find((d) => d.id === id);
    if (dest) {
      setTripTitle(`${dest.name} Squad Adventure`);
    }
  };

  const calculateDaysCount = (): number => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (new Date(endDate) < new Date(startDate)) {
      setErrorMsg('End date cannot be earlier than start date.');
      return;
    }

    const currentDest = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];
    const daysCount = calculateDaysCount();

    // Construct daily itinerary structure
    const days: ItineraryDay[] = [];
    const startObj = new Date(startDate);

    for (let i = 0; i < daysCount; i++) {
      const dayDate = new Date(startObj.getTime() + i * 24 * 60 * 60 * 1000);
      const dateStr = dayDate.toISOString().split('T')[0];

      // Sample activity population if user opted in
      const sampleDay = currentDest.sampleItinerary[i];
      const initialActivities = importSampleActivities && sampleDay
        ? sampleDay.activities.map((actTitle, aIdx) => ({
            id: `seed-act-${i}-${aIdx}-${Date.now()}`,
            time: aIdx === 0 ? '09:00 AM' : aIdx === 1 ? '01:30 PM' : '06:00 PM',
            title: actTitle,
            location: currentDest.name,
            notes: 'Imported from curated destination sample plan',
            estimatedCost: aIdx === 0 ? 0 : aIdx === 1 ? 500 : 800,
            category: (aIdx === 0 ? 'Sightseeing' : aIdx === 1 ? 'Food & Drink' : 'Relaxation') as any,
          }))
        : [];

      days.push({
        dayNumber: i + 1,
        date: dateStr,
        themeTitle: sampleDay ? sampleDay.title : `Day ${i + 1} Explorations`,
        activities: initialActivities,
      });
    }

    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      userId: user?.id || 'demo-user-gndec-01',
      destinationId: currentDest.id,
      destinationName: `${currentDest.name}, ${currentDest.region}`,
      destinationImage: currentDest.imageUrl,
      title: tripTitle.trim() || `${currentDest.name} Trip`,
      startDate,
      endDate,
      travelerCount: travelerCount > 0 ? travelerCount : 1,
      travelStyle,
      preferencesNotes: preferencesNotes.trim(),
      status: 'Upcoming',
      estimatedTotalBudget: currentDest.estimatedDailyCost * daysCount * travelerCount,
      days,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    StorageService.saveTrip(newTrip);
    navigate(`/trips/${newTrip.id}`);
  };

  const selectedDest = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Link
          to="/trips"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-[#16382B]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Trips</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-editorial">
          Create New Itinerary
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Build a day-by-day plan with activities, cost estimates, and logistics notes.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Trip Creation Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-8 shadow-xs">
        {/* Destination Picker */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
            1. Select Destination *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <select
                value={destinationId}
                onChange={(e) => handleDestinationChange(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-stone-300 text-sm font-semibold bg-stone-50 focus:bg-white focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.region}, {d.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Destination Preview Chip */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <img
                src={selectedDest.imageUrl}
                alt={selectedDest.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="text-xs min-w-0">
                <span className="font-bold text-stone-900 truncate block">
                  {selectedDest.name}
                </span>
                <span className="text-stone-500">
                  Daily avg: ₹{selectedDest.estimatedDailyCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
            2. Trip Title *
          </label>
          <input
            type="text"
            required
            value={tripTitle}
            onChange={(e) => setTripTitle(e.target.value)}
            placeholder="e.g. Manali Himalayan Trek with Friends"
            className="w-full px-3.5 py-3 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
          />
        </div>

        {/* Dates & Travelers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
              Start Date *
            </label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
              End Date *
            </label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
              Travelers Count
            </label>
            <input
              type="number"
              min="1"
              max="20"
              required
              value={travelerCount}
              onChange={(e) => setTravelerCount(Number(e.target.value) || 1)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
            />
          </div>
        </div>

        {/* Duration Note */}
        <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E6E2D8] text-xs text-stone-600 flex items-center justify-between">
          <span>
            Calculated Duration: <strong className="text-stone-900">{calculateDaysCount()} Days</strong>
          </span>
          <span>
            {travelerCount} {travelerCount === 1 ? 'Traveler' : 'Travelers'}
          </span>
        </div>

        {/* Travel Style */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
            3. Travel Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(
              [
                'Student Group',
                'Budget Backpacker',
                'Balanced Explorer',
                'Scenic & Relaxed',
              ] as TravelStyle[]
            ).map((style) => (
              <button
                type="button"
                key={style}
                onClick={() => setTravelStyle(style)}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition cursor-pointer ${
                  travelStyle === style
                    ? 'bg-[#16382B] text-white border-[#16382B] shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Notes / Preferences */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
            Trip Goals &amp; Specific Preferences
          </label>
          <textarea
            rows={2}
            value={preferencesNotes}
            onChange={(e) => setPreferencesNotes(e.target.value)}
            placeholder="e.g. Try river rafting, visit cafes, prioritize early mornings..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
          ></textarea>
        </div>

        {/* Template Pre-populate Toggle */}
        <label className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 cursor-pointer">
          <input
            type="checkbox"
            checked={importSampleActivities}
            onChange={(e) => setImportSampleActivities(e.target.checked)}
            className="w-4 h-4 accent-[#16382B] rounded"
          />
          <div className="text-xs text-amber-950">
            <span className="font-bold block">
              Auto-populate days with curated destination activities
            </span>
            <span className="text-amber-800">
              Preloads recommended highlights for {selectedDest.name} which you can easily rearrange, edit, or delete.
            </span>
          </div>
        </label>

        {/* Submit Button */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs sm:text-sm font-bold shadow-md transition cursor-pointer"
          >
            <span>Proceed to Daily Planner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
