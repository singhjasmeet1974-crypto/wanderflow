import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { StorageService } from '../lib/storage';
import { Trip, ItineraryDay } from '../types';
import { DaySchedule } from '../components/trip/DaySchedule';
import { PrintableTrip } from '../components/common/PrintableTrip';
import { ExternalBookingModal } from '../components/trip/ExternalBookingModal';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Printer,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Info,
} from 'lucide-react';

export const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [printModalOpen, setPrintModalOpen] = useState<boolean>(false);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const found = StorageService.getTripById(id);
      if (found) {
        setTrip(found);
      }
    }
  }, [id]);

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-editorial text-stone-900">
          Trip Not Found
        </h2>
        <p className="text-sm text-stone-600">
          The requested trip itinerary does not exist or has been removed.
        </p>
        <Link
          to="/trips"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#16382B] text-white rounded-xl text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Trips</span>
        </Link>
      </div>
    );
  }

  // Update a single day in the itinerary
  const handleUpdateDay = (updatedDay: ItineraryDay) => {
    const newDays = trip.days.map((d) =>
      d.dayNumber === updatedDay.dayNumber ? updatedDay : d
    );
    const updatedTrip: Trip = { ...trip, days: newDays };
    setTrip(updatedTrip);
    StorageService.saveTrip(updatedTrip);

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  // Add another day to the itinerary
  const handleAddDay = () => {
    const nextDayNum = trip.days.length + 1;
    const lastDay = trip.days[trip.days.length - 1];
    let nextDateStr = new Date().toISOString().split('T')[0];

    if (lastDay && lastDay.date) {
      const nextDate = new Date(new Date(lastDay.date).getTime() + 24 * 60 * 60 * 1000);
      nextDateStr = nextDate.toISOString().split('T')[0];
    }

    const newDay: ItineraryDay = {
      dayNumber: nextDayNum,
      date: nextDateStr,
      themeTitle: `Day ${nextDayNum} Explorations`,
      activities: [],
    };

    const updatedTrip: Trip = {
      ...trip,
      endDate: nextDateStr,
      days: [...trip.days, newDay],
    };

    setTrip(updatedTrip);
    StorageService.saveTrip(updatedTrip);
    setActiveDayNumber(nextDayNum);
  };

  // Calculate live budget from activities
  const totalCalculatedCost = trip.days.reduce(
    (total, day) =>
      total + day.activities.reduce((dTotal, a) => dTotal + (a.estimatedCost || 0), 0),
    0
  );

  const totalActivitiesCount = trip.days.reduce(
    (acc, day) => acc + day.activities.length,
    0
  );

  const activeDay = trip.days.find((d) => d.dayNumber === activeDayNumber) || trip.days[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Save Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#16382B] text-white text-xs font-semibold shadow-xl flex items-center gap-2 border border-white/20 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-[#E5A43B]" />
          <span>Itinerary changes saved!</span>
        </div>
      )}

      {/* Printable Modal */}
      {printModalOpen && (
        <PrintableTrip trip={trip} onClose={() => setPrintModalOpen(false)} />
      )}

      {/* External Booking Modal */}
      <ExternalBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        destinationName={trip.destinationName}
      />

      {/* Back button & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <Link
          to="/trips"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#16382B]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Trips</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setBookingModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:border-[#16382B] text-xs font-bold text-stone-700 hover:text-[#16382B] transition cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#E5A43B]" />
            <span>Booking Links</span>
          </button>

          <button
            onClick={() => setPrintModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#E5A43B]" />
            <span>Print Itinerary PDF</span>
          </button>
        </div>
      </div>

      {/* Trip Overview Banner */}
      <section className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                {trip.status}
              </span>
              <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E0704D]" />
                {trip.destinationName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-editorial">
              {trip.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#16382B]" />
                {trip.startDate} to {trip.endDate} ({trip.days.length} Days)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#16382B]" />
                {trip.travelerCount} Travelers ({trip.travelStyle})
              </span>
            </div>

            {trip.preferencesNotes && (
              <p className="text-xs text-stone-500 italic pt-1">
                "{trip.preferencesNotes}"
              </p>
            )}
          </div>

          {/* Budget Widget */}
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E6E2D8] text-right space-y-1 min-w-[200px]">
            <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider block">
              Calculated Total Spend
            </span>
            <span className="text-2xl font-extrabold text-[#16382B] font-editorial block">
              ₹{totalCalculatedCost.toLocaleString()}
            </span>
            <span className="text-[11px] text-stone-400 block">
              From {totalActivitiesCount} scheduled activities
            </span>
          </div>
        </div>

        {/* Day Navigation Tabs */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2">
          {trip.days.map((day) => {
            const isCurrent = day.dayNumber === activeDayNumber;
            const dayCost = day.activities.reduce((s, a) => s + (a.estimatedCost || 0), 0);
            return (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayNumber(day.dayNumber)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#16382B] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>Day {day.dayNumber}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isCurrent ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {day.activities.length} acts
                </span>
              </button>
            );
          })}

          <button
            onClick={handleAddDay}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-dashed border-stone-300 hover:border-[#16382B] text-stone-600 hover:text-[#16382B] text-xs font-semibold transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Day {trip.days.length + 1}</span>
          </button>
        </div>
      </section>

      {/* Active Day Schedule Component */}
      {activeDay && (
        <DaySchedule day={activeDay} onUpdateDay={handleUpdateDay} />
      )}
    </div>
  );
};
