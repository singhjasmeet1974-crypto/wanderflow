import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GroupTrip } from '../../types';
import { GroupInterestModal } from './GroupInterestModal';
import {
  Users2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

interface GroupTripCardProps {
  trip: GroupTrip;
}

export const GroupTripCard: React.FC<GroupTripCardProps> = ({ trip }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);

  const fillPercentage = Math.min(
    100,
    Math.round((trip.currentInterestedCount / trip.maxGroupSize) * 100)
  );

  return (
    <>
      <article className="bg-white rounded-2xl border border-[#E6E2D8] overflow-hidden hover:border-[#16382B]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
        <div>
          {/* Card Image */}
          <div className="relative h-48 overflow-hidden bg-stone-100">
            <img
              src={trip.heroImage}
              alt={trip.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>

            {/* Prototype Badge */}
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E5A43B] text-[#0F261D] shadow-xs">
                Concept Prototype
              </span>
            </div>

            {/* Theme Tag */}
            <div className="absolute top-3 right-3">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/60 text-stone-200 backdrop-blur-xs">
                {trip.theme}
              </span>
            </div>

            {/* Title & Dates */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <div className="flex items-center gap-1.5 text-xs text-stone-200">
                <Calendar className="w-3.5 h-3.5 text-[#E0704D]" />
                <span>{trip.datesDescription}</span>
              </div>
              <h3 className="text-lg font-bold font-editorial truncate text-white">
                {trip.title}
              </h3>
            </div>
          </div>

          {/* Vibe Chips & Description */}
          <div className="p-5 space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {trip.vibe.map((v) => (
                <span
                  key={v}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-[#FAF9F6] text-[#16382B] border border-[#E6E2D8] font-medium"
                >
                  ⚡ {v}
                </span>
              ))}
            </div>

            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
              {trip.description}
            </p>

            {/* Group Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium flex items-center gap-1">
                  <Users2 className="w-3.5 h-3.5 text-[#16382B]" />
                  Spots Interested:
                </span>
                <span className="font-bold text-stone-900">
                  {trip.currentInterestedCount} / {trip.maxGroupSize} Travelers
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#16382B] to-[#E0704D] rounded-full transition-all duration-500"
                  style={{ width: `${fillPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="p-4 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">
              Est. Pool / Person
            </span>
            <span className="text-base font-bold text-[#16382B]">
              ₹{trip.estimatedBudgetPerPerson.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/group-trips/${trip.id}`}
              className="p-2 text-stone-600 hover:text-[#16382B] transition text-xs font-semibold"
              title="View full group trip breakdown"
            >
              Details
            </Link>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              {hasRegistered ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-[#E5A43B]" />
                  <span>Interested</span>
                </>
              ) : (
                <>
                  <span>Join Interest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </article>

      {/* Modal */}
      <GroupInterestModal
        trip={trip}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => setHasRegistered(true)}
      />
    </>
  );
};
