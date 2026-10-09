import React from 'react';
import { Link } from 'react-router-dom';
import { Trip } from '../../types';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  Printer,
  Trash2,
  Sparkles,
} from 'lucide-react';

interface TripCardProps {
  trip: Trip;
  onDelete: (id: string) => void;
  onPrintRequest?: (trip: Trip) => void;
}

export const TripCard: React.FC<TripCardProps> = ({
  trip,
  onDelete,
  onPrintRequest,
}) => {
  const totalActivities = trip.days.reduce(
    (acc, day) => acc + day.activities.length,
    0
  );

  const getStatusBadgeClass = (status: Trip['status']) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Completed':
        return 'bg-stone-100 text-stone-700 border-stone-200';
      case 'Draft':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const formatDateRange = (start: string, end: string) => {
    try {
      const s = new Date(start).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      const e = new Date(end).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      return `${s} – ${e}`;
    } catch {
      return `${start} to ${end}`;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6E2D8] overflow-hidden hover:border-[#16382B]/30 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Card Header with Destination Photo */}
        <div className="relative h-44 overflow-hidden bg-stone-100">
          <img
            src={trip.destinationImage}
            alt={trip.destinationName}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getStatusBadgeClass(
                trip.status
              )} backdrop-blur-xs`}
            >
              {trip.status}
            </span>
          </div>

          {/* Delete Action */}
          <button
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete "${trip.title}"? This cannot be undone.`
                )
              ) {
                onDelete(trip.id);
              }
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-rose-50 text-stone-600 hover:text-rose-600 transition shadow-xs cursor-pointer"
            title="Delete trip"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Destination Name Tag */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5 text-xs text-stone-200 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#E0704D]" />
              <span>{trip.destinationName}</span>
            </div>
            <h3 className="text-lg font-bold truncate font-editorial text-white drop-shadow-xs">
              {trip.title}
            </h3>
          </div>
        </div>

        {/* Trip Meta Body */}
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100">
              <Calendar className="w-4 h-4 text-[#16382B]" />
              <span className="truncate">{formatDateRange(trip.startDate, trip.endDate)}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100">
              <Users className="w-4 h-4 text-[#16382B]" />
              <span>
                {trip.travelerCount} {trip.travelerCount === 1 ? 'Traveler' : 'Travelers'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-stone-500 font-medium">
              Itinerary: <strong className="text-stone-900">{trip.days.length} Days</strong> ({totalActivities} activities)
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#FAF9F6] text-[#16382B] font-semibold border border-[#E6E2D8]">
              {trip.travelStyle}
            </span>
          </div>

          {trip.preferencesNotes && (
            <p className="text-xs text-stone-500 line-clamp-2 italic bg-stone-50/70 p-2 rounded-lg border border-stone-100">
              "{trip.preferencesNotes}"
            </p>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between gap-2">
        {onPrintRequest && (
          <button
            onClick={() => onPrintRequest(trip)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 hover:text-[#16382B] hover:bg-stone-200 transition cursor-pointer"
            title="Generate printable itinerary summary"
          >
            <Printer className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Print</span>
          </button>
        )}

        <Link
          to={`/trips/${trip.id}`}
          className="ml-auto inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#16382B] text-white hover:bg-[#235441] text-xs font-semibold shadow-xs transition"
        >
          <span>Manage Itinerary</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
