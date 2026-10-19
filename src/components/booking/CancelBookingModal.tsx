import React, { useState } from 'react';
import { Booking } from '../../types';
import { Ban, AlertTriangle, X } from 'lucide-react';


interface CancelBookingModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: (bookingId: string, reason: string) => void;
}

const COMMON_CANCEL_REASONS = [
  'College exam schedule conflict',
  'Change of travel dates or itinerary',
  'Found alternative stay / hostel option',
  'Trip postponed with travel group',
  'Testing demo booking workflow',
  'Other reason',
];

export const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
  booking,
  isOpen,
  onClose,
  onConfirmCancel,
}) => {
  const [selectedReason, setSelectedReason] = useState(COMMON_CANCEL_REASONS[0]);
  const [customReason, setCustomReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !booking) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const finalReason = selectedReason === 'Other reason' && customReason.trim()
      ? customReason.trim()
      : selectedReason;

    onConfirmCancel(booking.id, finalReason);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-dialog-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header Warning */}
        <div className="p-6 pb-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shadow-xs">
              <Ban className="w-6 h-6" />
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h3 id="cancel-dialog-title" className="text-xl font-bold font-editorial text-stone-900">
              Cancel Demo Reservation?
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Are you sure you want to cancel booking <strong className="font-mono text-stone-900">{booking.bookingReference}</strong> for <strong className="text-stone-900">{booking.accommodationName}</strong>?
            </p>
          </div>
        </div>

        {/* Informational Callout */}
        <div className="px-6">
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>Record will be retained in history</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              The booking will be updated to <span className="font-semibold text-rose-700">Cancelled</span> and dashboard statistics will adjust immediately. You can view it anytime under the "Cancelled" tab.
            </p>
          </div>
        </div>

        {/* Reason Selection Form */}
        <form onSubmit={handleConfirm} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              Reason for Cancellation
            </label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
            >
              {COMMON_CANCEL_REASONS.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          {selectedReason === 'Other reason' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">
                Please specify:
              </label>
              <input
                type="text"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                required
                placeholder="Brief reason for cancellation"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              />
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition cursor-pointer"
            >
              Keep Booking
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Confirm Cancellation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
