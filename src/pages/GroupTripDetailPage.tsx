import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { GROUP_TRIPS } from '../data/groupTrips';
import { GroupInterestModal } from '../components/group/GroupInterestModal';
import {
  Calendar,
  Users2,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Heart,
} from 'lucide-react';

export const GroupTripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const trip = GROUP_TRIPS.find((t) => t.id === id);
  const [modalOpen, setModalOpen] = useState(false);
  const [registered, setRegistered] = useState(false);

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-editorial text-stone-900">
          Group Trip Not Found
        </h2>
        <p className="text-sm text-stone-600">
          The requested group trip batch could not be found.
        </p>
        <Link
          to="/group-trips"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#16382B] text-white rounded-xl text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Group Trips Hub</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <Link
          to="/group-trips"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#16382B]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Group Trips Hub</span>
        </Link>

        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E5A43B] text-[#0F261D]">
          Prototype Batch
        </span>
      </div>

      {/* Hero Header */}
      <section className="relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden bg-stone-900 shadow-lg">
        <img
          src={trip.heroImage}
          alt={trip.title}
          className="w-full h-full object-cover filter brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#16382B] text-stone-100 text-xs font-bold">
              {trip.theme}
            </span>
            <span className="text-xs text-stone-300 flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#E0704D]" />
              {trip.datesDescription}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-editorial drop-shadow-md">
            {trip.title}
          </h1>

          <p className="text-xs sm:text-sm text-stone-200 max-w-2xl">
            {trip.description}
          </p>
        </div>
      </section>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Itinerary, Vibes, Safety */}
        <div className="lg:col-span-8 space-y-8">
          {/* Vibe Tags */}
          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E6E2D8] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#E0704D]">
              Batch Atmosphere &amp; Vibe
            </h3>
            <div className="flex flex-wrap gap-2">
              {trip.vibe.map((v) => (
                <span
                  key={v}
                  className="px-3 py-1 rounded-full bg-white text-[#16382B] text-xs font-bold border border-stone-200 shadow-2xs"
                >
                  ✨ {v}
                </span>
              ))}
            </div>
            <p className="text-xs text-stone-500 pt-1">
              Target Audience: <strong className="text-stone-800">{trip.targetAudience}</strong>
            </p>
          </div>

          {/* Highlights Itinerary Breakdown */}
          <div className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-xl font-bold font-editorial text-stone-900">
              Expedition Highlights
            </h3>
            <div className="space-y-3">
              {trip.itineraryHighlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 text-xs font-medium text-stone-800 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-[#16382B] text-white flex items-center justify-center shrink-0 font-bold text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & Conduct Policies */}
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
              <h3 className="text-base font-bold font-editorial text-amber-950">
                Safety &amp; Community Rules
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-amber-900">
              {trip.safetyNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-amber-700">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar (4 cols): Organizer, Registration CTA */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E6E2D8] space-y-5 shadow-xs sticky top-24">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">
                Estimated Pool / Person
              </span>
              <span className="text-3xl font-extrabold text-[#16382B] font-editorial block">
                ₹{trip.estimatedBudgetPerPerson.toLocaleString()}
              </span>
              <span className="text-xs text-stone-500">
                For {trip.durationDays} Days (All accommodation &amp; transport split)
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Batch Capacity:</span>
                <strong className="text-stone-800">{trip.maxGroupSize} spots</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Current Interest:</span>
                <strong className="text-emerald-700">{trip.currentInterestedCount} registered</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Host Organizer:</span>
                <strong className="text-stone-800">{trip.hostOrganizer}</strong>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-3 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {registered ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#E5A43B]" />
                  <span>Interest Submitted!</span>
                </>
              ) : (
                <>
                  <span>Join Batch Interest</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-stone-400 text-center leading-relaxed">
              * Non-binding expression of interest. Free demo registration with no advance payments.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <GroupInterestModal
        trip={trip}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => setRegistered(true)}
      />
    </div>
  );
};
