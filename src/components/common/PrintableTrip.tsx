import React from 'react';
import { Trip } from '../../types';
import { Compass, Printer, X, Calendar, Users, MapPin, CheckCircle2 } from 'lucide-react';

interface PrintableTripProps {
  trip: Trip;
  onClose: () => void;
}

export const PrintableTrip: React.FC<PrintableTripProps> = ({ trip, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const totalCalculatedCost = trip.days.reduce(
    (total, day) =>
      total + day.activities.reduce((dTotal, a) => dTotal + (a.estimatedCost || 0), 0),
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8 print:m-0 print:p-0 print:border-none print:shadow-none">
        {/* Print Controls (Hidden on Print) */}
        <div className="no-print flex items-center justify-between pb-6 mb-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#16382B] text-white">
              <Printer className="w-4 h-4 text-[#E5A43B]" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Print / Save Itinerary as PDF
              </h3>
              <p className="text-xs text-stone-500">
                Ready for offline backpacker reference or travel sharing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16382B] text-white text-xs font-semibold hover:bg-[#235441] shadow-xs transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              aria-label="Close printable preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Area */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-[#16382B] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#16382B] uppercase tracking-wider mb-1">
                <Compass className="w-4 h-4 text-[#E5A43B]" />
                <span>Wanderflow Travel Itinerary</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-editorial">
                {trip.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-stone-600 mt-2">
                <span className="flex items-center gap-1 font-semibold text-[#16382B]">
                  <MapPin className="w-3.5 h-3.5 text-[#E0704D]" />
                  {trip.destinationName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  {trip.startDate} to {trip.endDate} ({trip.days.length} Days)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-stone-500" />
                  {trip.travelerCount} Travelers ({trip.travelStyle})
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider block">
                Estimated Trip Budget
              </span>
              <span className="text-xl font-extrabold text-[#16382B]">
                ₹{totalCalculatedCost.toLocaleString()}
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                (Est. from activities)
              </span>
            </div>
          </div>

          {trip.preferencesNotes && (
            <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-700 italic border border-stone-200">
              <strong>Trip Notes:</strong> {trip.preferencesNotes}
            </div>
          )}

          {/* Days & Activities breakdown */}
          <div className="space-y-6">
            {trip.days.map((day) => (
              <div key={day.dayNumber} className="border-b border-stone-200 pb-4">
                <div className="flex items-center justify-between bg-stone-100/80 px-3 py-2 rounded-lg mb-3">
                  <h3 className="text-sm font-bold text-[#16382B] font-editorial">
                    Day {day.dayNumber} — {day.date}
                    {day.themeTitle && (
                      <span className="text-xs font-normal text-stone-600 ml-2">
                        ({day.themeTitle})
                      </span>
                    )}
                  </h3>
                  <span className="text-xs font-semibold text-stone-700">
                    Day Total: ₹
                    {day.activities
                      .reduce((sum, a) => sum + (a.estimatedCost || 0), 0)
                      .toLocaleString()}
                  </span>
                </div>

                {day.activities.length === 0 ? (
                  <p className="text-xs text-stone-400 italic pl-3">
                    No planned activities for this day yet.
                  </p>
                ) : (
                  <div className="space-y-2 pl-2">
                    {day.activities.map((act) => (
                      <div
                        key={act.id}
                        className="flex items-start justify-between text-xs py-1.5 border-b border-stone-100 last:border-0"
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-semibold text-stone-800 w-16 shrink-0">
                            {act.time}
                          </span>
                          <div>
                            <span className="font-bold text-stone-900">{act.title}</span>
                            <span className="text-stone-500 block">
                              📍 {act.location} {act.notes ? `• ${act.notes}` : ''}
                            </span>
                          </div>
                        </div>

                        <span className="font-semibold text-stone-700 shrink-0 ml-4">
                          {act.estimatedCost > 0
                            ? `₹${act.estimatedCost.toLocaleString()}`
                            : 'Free'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Print Footer */}
          <div className="pt-4 border-t border-stone-300 text-[11px] text-stone-500 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span>Generated via <strong>Wanderflow</strong> • GNDEC IT College Training Project</span>
            </div>
            <div>
              <span>Printed on: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
