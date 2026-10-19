import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../lib/storage';
import { DestinationService } from '../lib/destinationService';
import { TripCard } from '../components/trip/TripCard';
import { DestinationCard } from '../components/destination/DestinationCard';
import { PrintableTrip } from '../components/common/PrintableTrip';
import { Trip, Booking } from '../types';
import {
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  Heart,
  Users2,
  Sparkles,
  MapPin,
  Clock,
  RotateCcw,
  ArrowRight,
  CalendarCheck,
} from 'lucide-react';


export const DashboardPage: React.FC = () => {
  const { user, isDemoMode, resetDemoData } = useAuth();
  const navigate = useNavigate();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [printableTrip, setPrintableTrip] = useState<Trip | null>(null);

  useEffect(() => {
    setTrips(StorageService.getTrips());
    setSavedDestinationIds(StorageService.getSavedDestinations());
    setBookings(StorageService.getBookings());
  }, []);

  const handleDeleteTrip = (id: string) => {
    StorageService.deleteTrip(id);
    setTrips(StorageService.getTrips());
  };

  const savedDestinations = DestinationService.getAllDestinations().filter((d) =>
    savedDestinationIds.includes(d.id)
  );

  const upcomingTrips = trips.filter((t) => t.status === 'Upcoming');
  const draftTrips = trips.filter((t) => t.status === 'Draft' || t.status === 'Completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Printable Trip Modal */}
      {printableTrip && (
        <PrintableTrip trip={printableTrip} onClose={() => setPrintableTrip(null)} />
      )}

      {/* User Welcome Banner */}
      <section className="bg-gradient-to-br from-[#16382B] to-[#0F261D] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
              alt={user?.fullName || 'Traveler'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#E5A43B] shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-4xl font-extrabold font-editorial text-white">
                  Welcome back, {user?.fullName || 'Explorer'}!
                </h1>
                {isDemoMode && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E5A43B] text-[#0F261D] font-extrabold">
                    Demo Traveler
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                {user?.college || 'Wanderflow Explorer'} • Travel Style: <strong className="text-white">{user?.travelStyle || 'Student Group'}</strong>
              </p>
              <p className="text-xs text-stone-400 italic">
                "{user?.bio || 'Planning memorable student adventures with Wanderflow.'}"
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/bookings"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 shadow-md transition"
            >
              <CalendarCheck className="w-4 h-4 text-[#E5A43B]" />
              <span>My Bookings</span>
            </Link>

            <Link
              to="/trips/new"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white font-bold text-xs sm:text-sm shadow-md transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Trip</span>
            </Link>

            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition"
            >
              <span>Explore Places</span>
            </Link>
          </div>
        </div>

        {/* Quick Stat Counter Cards */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
              Total Itineraries
            </span>
            <span className="text-2xl font-bold font-editorial text-[#E5A43B]">
              {trips.length}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
              Upcoming Trips
            </span>
            <span className="text-2xl font-bold font-editorial text-emerald-400">
              {upcomingTrips.length}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
              Saved Destinations
            </span>
            <span className="text-2xl font-bold font-editorial text-[#E0704D]">
              {savedDestinations.length}
            </span>
          </div>

          <Link
            to="/bookings"
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition block group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                Demo Bookings
              </span>
              <CalendarCheck className="w-3.5 h-3.5 text-[#E5A43B] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-2xl font-bold font-editorial text-[#E5A43B] block">
              {bookings.length}
            </span>
          </Link>
        </div>
      </section>

      {/* Trips Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E0704D]">
              My Itineraries
            </span>
            <h2 className="text-2xl font-bold font-editorial text-stone-900 mt-0.5">
              Your Travel Plans ({trips.length})
            </h2>
          </div>

          <Link
            to="/trips/new"
            className="text-xs font-bold text-[#16382B] hover:text-[#E0704D] flex items-center gap-1"
          >
            <span>Plan another trip</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onDelete={handleDeleteTrip}
                onPrintRequest={(t) => setPrintableTrip(t)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-white border border-[#E6E2D8] text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <CalendarDays className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-editorial text-stone-900">
                No trips planned yet
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Ready to explore? Choose a destination like Manali, Amritsar, or Goa and build your first day-by-day itinerary!
              </p>
            </div>
            <Link
              to="/trips/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16382B] text-white text-xs font-bold hover:bg-[#235441]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Your First Trip</span>
            </Link>
          </div>
        )}
      </section>

      {/* Bookmarked / Saved Destinations */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E0704D]">
              Bookmarks
            </span>
            <h2 className="text-2xl font-bold font-editorial text-stone-900 mt-0.5">
              Saved Destinations ({savedDestinations.length})
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-[#16382B] hover:text-[#E0704D]"
          >
            Browse All Places
          </Link>
        </div>

        {savedDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSaveToggle={() =>
                  setSavedDestinationIds(StorageService.getSavedDestinations())
                }
              />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-dashed border-stone-300 text-center space-y-2">
            <Heart className="w-6 h-6 text-stone-300 mx-auto" />
            <p className="text-xs text-stone-500">
              You haven't bookmarked any destinations yet. Tap the heart icon on any destination card to save it here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
