import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Booking } from '../../types';
import {
  X,
  Calendar,
  Users,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Copy,
  Check,
  Printer,
  RotateCcw,
  Ban,
  MapPin,
  ShieldAlert,
  DollarSign,
} from 'lucide-react';

interface BookingDetailModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onCancelRequest: (booking: Booking) => void;
  onPrintRequest: (booking: Booking) => void;
}

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  booking,
  isOpen,
  onClose,
  onCancelRequest,
  onPrintRequest,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !booking) return null;

  const handleCopyReference = () => {
    navigator.clipboard.writeText(booking.bookingReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusConfig = {
    Confirmed: {
      label: 'Confirmed — Demo',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: CheckCircle2,
    },
    Completed: {
      label: 'Completed',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: Clock,
    },
    Cancelled: {
      label: 'Cancelled',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      icon: XCircle,
    },
    Pending: {
      label: 'Pending',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: AlertCircle,
    },
  }[booking.status] || {
    label: booking.status,
    badgeClass: 'bg-stone-100 text-stone-800 border-stone-300',
    icon: Clock,
  };

  const StatusIcon = statusConfig.icon;

  const checkInFormatted = new Date(`${booking.checkIn}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const checkOutFormatted = new Date(`${booking.checkOut}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const isCancellable = booking.status === 'Confirmed' || booking.status === 'Pending';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Prominent Demo Notice Bar */}
        <div className="bg-amber-500 text-[#0F261D] px-5 py-2.5 text-xs font-bold flex items-center justify-between border-b border-amber-600/30">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#0F261D]" />
            <span>DEMO BOOKING — NOT A REAL RESERVATION</span>
          </div>
          <span className="text-[10px] font-semibold bg-[#0F261D] text-white px-2 py-0.5 rounded-full">
            Simulation
          </span>
        </div>

        {/* Modal Header */}
        <div className="p-6 border-b border-stone-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Booking Reference:
              </span>
              <span className="font-mono font-bold text-sm text-[#16382B] bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                {booking.bookingReference}
              </span>
              <button
                onClick={handleCopyReference}
                className="p-1 text-stone-400 hover:text-stone-700 transition"
                title="Copy reference code"
                aria-label="Copy reference code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <h2 id="booking-modal-title" className="text-xl sm:text-2xl font-bold font-editorial text-stone-900">
              {booking.accommodationName}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#E0704D]" />
              <span>{booking.destinationLocation || booking.destinationName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.badgeClass}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{statusConfig.label}</span>
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition cursor-pointer"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-800 text-xs sm:text-sm">
          {/* Hero image and dates banner */}
          <div className="relative rounded-2xl overflow-hidden h-40 bg-stone-100 border border-stone-200">
            <img
              src={booking.accommodationImage || booking.destinationImage}
              alt={booking.accommodationName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4 text-white">
              <div className="flex flex-wrap items-center justify-between w-full gap-2">
                <div>
                  <span className="text-[11px] font-bold text-[#E5A43B] uppercase tracking-wider block">
                    Duration &amp; Stay
                  </span>
                  <span className="text-sm sm:text-base font-bold font-editorial">
                    {booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'} ({booking.rooms} {booking.rooms === 1 ? 'Room' : 'Rooms'})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-stone-300 block">Total Demo Amount</span>
                  <span className="text-base sm:text-xl font-bold font-editorial text-white">
                    ₹{booking.priceBreakdown.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stay Dates & Rooms */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">
                Check-In Date
              </span>
              <p className="font-bold text-stone-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <Calendar className="w-4 h-4 text-[#16382B]" />
                {checkInFormatted}
              </p>
              <span className="text-[10px] text-stone-400">Standard check-in from 01:00 PM</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">
                Check-Out Date
              </span>
              <p className="font-bold text-stone-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <Calendar className="w-4 h-4 text-[#E0704D]" />
                {checkOutFormatted}
              </p>
              <span className="text-[10px] text-stone-400">Standard check-out by 11:00 AM</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">
                Guests &amp; Accommodation
              </span>
              <p className="font-bold text-stone-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <Users className="w-4 h-4 text-stone-600" />
                {booking.guests.adults} Adults
                {booking.guests.children > 0 && `, ${booking.guests.children} Children`}
              </p>
              <span className="text-[10px] text-stone-400 truncate block">
                {booking.roomType || 'Standard Room'}
              </span>
            </div>
          </div>

          {/* Guest Information */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="text-xs uppercase font-bold tracking-wider text-stone-600 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#16382B]" />
              Guest Contact Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-stone-500 block">Primary Guest Name:</span>
                <strong className="text-stone-900 font-semibold">
                  {booking.guestDetails.fullName}
                </strong>
              </div>
              <div>
                <span className="text-stone-500 block">Contact Email:</span>
                <strong className="text-stone-900 font-semibold flex items-center gap-1">
                  <Mail className="w-3 h-3 text-stone-400" />
                  {booking.guestDetails.email}
                </strong>
              </div>
              {booking.guestDetails.phone && (
                <div>
                  <span className="text-stone-500 block">Contact Phone:</span>
                  <strong className="text-stone-900 font-semibold flex items-center gap-1">
                    <Phone className="w-3 h-3 text-stone-400" />
                    {booking.guestDetails.phone}
                  </strong>
                </div>
              )}
              {booking.guestDetails.specialRequests && (
                <div className="sm:col-span-2 pt-1 border-t border-stone-200">
                  <span className="text-stone-500 block">Special Requests:</span>
                  <p className="text-stone-700 italic">{booking.guestDetails.specialRequests}</p>
                </div>
              )}
            </div>
          </div>

          {/* Itemized Price Breakdown */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-stone-600 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#16382B]" />
              Transparent Demo Price Breakdown
            </h4>

            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex items-center justify-between">
                <span>
                  Nightly Rate (₹{booking.priceBreakdown.nightlyRate.toLocaleString()} × {booking.nights}N × {booking.rooms} {booking.rooms === 1 ? 'room' : 'rooms'})
                </span>
                <span className="font-medium text-stone-900">
                  ₹{booking.priceBreakdown.baseAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Applicable Demo Hospitality GST &amp; Platform Fee (12%)</span>
                <span className="font-medium text-stone-900">
                  ₹{booking.priceBreakdown.taxesAndFees.toLocaleString()}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-sm sm:text-base font-bold text-stone-900 font-editorial">
                <span>Final Estimated Total</span>
                <span className="text-[#16382B]">
                  ₹{booking.priceBreakdown.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-stone-400 italic">
              * Note: Simulated estimate for testing. No real money or card transaction was processed.
            </p>
          </div>

          {/* Cancellation Info */}
          {booking.status === 'Cancelled' ? (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-1">
              <span className="text-rose-900 font-bold flex items-center gap-1.5">
                <Ban className="w-4 h-4 text-rose-600" />
                This reservation was cancelled
              </span>
              <p className="text-rose-800">
                <strong>Reason:</strong> {booking.cancellationReason || 'Cancelled by traveler.'}
              </p>
              {booking.cancelledAt && (
                <span className="text-[10px] text-rose-600 block">
                  Cancelled on {new Date(booking.cancelledAt).toLocaleString()}
                </span>
              )}
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Demo Free Cancellation Policy
              </span>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                You can freely cancel this demo reservation at any time before departure. The status will update across your dashboard and preserve your evaluation history.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPrintRequest(booking)}
              className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>Print / Download Voucher</span>
            </button>

            <Link
              to={`/book-demo?dest=${booking.destinationId}${booking.accommodationId ? `&acc=${booking.accommodationId}` : ''}`}
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold shadow-xs transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
              <span>Book Again</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {isCancellable && (
              <button
                onClick={() => {
                  onClose();
                  onCancelRequest(booking);
                }}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition cursor-pointer flex items-center gap-1"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Cancel Reservation</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
