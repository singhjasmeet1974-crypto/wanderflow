import React from 'react';
import { GROUP_TRIPS } from '../data/groupTrips';
import { GroupTripCard } from '../components/group/GroupTripCard';
import {
  Users2,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const GroupTripsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#16382B] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#E5A43B]" />
          <span>Gen-Z Social Travel Prototype</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-editorial">
              Group Trips Hub
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mt-1">
              Curated student expeditions, fixed departure batches, and shared budget adventures for youth travelers and campus groups.
            </p>
          </div>
        </div>
      </div>

      {/* Transparent Prototype Notice Banner */}
      <section className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200/90 text-amber-950 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900">
            College Project Prototype Notice &amp; Safety Framework
          </h2>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90">
          This feature represents the proposed Gen-Z social travel concept from the Wanderflow project synopsis. In this college prototype stage, batches and interest registrations are simulated and saved to local evaluation storage.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-amber-950 font-medium">
          <div className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-amber-200/60">
            <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>Privacy Guard: No personal phone numbers or contacts exposed publicly.</span>
          </div>
          <div className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-amber-200/60">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>Future Roadmap: Biometric ID verification &amp; university email validation.</span>
          </div>
          <div className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-amber-200/60">
            <Users2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>Safety: No automated stranger pairing until moderation workflows deploy.</span>
          </div>
        </div>
      </section>

      {/* Group Trips Cards Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <h2 className="text-xl font-bold font-editorial text-stone-900">
            Curated Student Batches ({GROUP_TRIPS.length})
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            Next departure: May 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GROUP_TRIPS.map((trip) => (
            <GroupTripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>
    </div>
  );
};
