import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Booking } from '../../types';
import {
  Calendar,
  Users,
  Building,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Copy,
  Check,
  Eye,
  Printer,
  RotateCcw,
  Ban,
  MapPin,
  ShieldCheck,
} from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
  onViewDetails: (booking: Booking) => void;
  onCancelRequest: (booking: Booking) => void;
  onPrintRequest: (booking: Booking) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onViewDetails,
  onCancelRequest,
  onPrintRequest,
}) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopyReference = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(booking.bookingReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusConfig = {
    Confirmed: {
      label: 'Confirmed — Demo',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: CheckCircle2,
      dotClass: 'bg-emerald-500',
    },
    Completed: {
      label: 'Completed',
      badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: Clock,
      dotClass: 'bg-blue-500',
    },
    Cancelled: {
      label: 'Cancelled',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: XCircle,
      dotClass: 'bg-rose-500',
    },
    Pending: {
      label: 'Pending',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: AlertCircle,
      dotClass: 'bg-amber-500',
    },
  }[booking.status] || {
    label: booking.status,
    badgeClass: 'bg-stone-100 text-stone-800 border-stone-200',
    icon: Clock,
    dotClass: 'bg-stone-500',
  };

  const StatusIcon = statusConfig.icon;

  const fallbackImage =
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

  const checkInFormatted = new Date(`${booking.checkIn}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const checkOutFormatted = new Date(`${booking.checkOut}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const isCancellable = booking.status === 'Confirmed' || booking.status === 'Pending';

  return (
    <article className="group bg-white rounded-3xl border border-[#E6E2D8] hover:border-[#16382B]/30 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Demo Simulation Header Ribbon */}
      <div className="bg-stone-900 text-stone-300 px-4 py-1.5 text-[10px] font-semibold tracking-wider uppercase flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-[#E5A43B]" />
          <span>Demo Simulation Booking</span>
        </div>
        <span className="text-stone-400 font-mono text-[9px]">Not a real reservation</span>
      </div>

      <div className="p-5 sm:p-6 flex flex-col md:flex-row gap-5 flex-1">
        {/* Left: Thumbnail & Badges */}
        <div className="relative w-full md:w-56 h-48 md:h-auto rounded-2xl overflow-hidden bg-stone-100 shrink-0">
          <img
            src={imgError ? fallbackImage : (booking.accommodationImage || booking.destinationImage)}
            alt={booking.accommodationName}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-xs ${statusConfig.badgeClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotClass}`} />
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{statusConfig.label}</span>
            </span>
          </div>

          {/* Nights Duration Badge */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold">
            {booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}
          </div>
        </div>

        {/* Right: Booking Details */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div>
            {/* Top row: Reference ID & Booking Date */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  Ref:
                </span>
                <span className="font-mono font-bold text-xs sm:text-sm text-[#16382B] bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                  {booking.bookingReference}
                </span>
                <button
                  onClick={handleCopyReference}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded transition cursor-pointer"
                  title="Copy Reference Code"
                  aria-label="Copy booking reference"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <span className="text-[11px] text-stone-400">
                Booked on {new Date(booking.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Accommodation Title & Destination */}
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16382B]">
                <MapPin className="w-3.5 h-3.5 text-[#E0704D] shrink-0" />
                <span className="truncate">{booking.destinationLocation || booking.destinationName}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-editorial text-stone-900 group-hover:text-[#16382B] transition">
                {booking.accommodationName}
              </h3>

              {booking.roomType && (
                <p className="text-xs text-stone-500 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-stone-400" />
                  <span>{booking.roomType}</span>
                </p>
              )}
            </div>

            {/* Dates & Guests Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-stone-100 text-xs">
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <span className="text-[10px] text-stone-400 uppercase font-bold block mb-0.5">
                  Check-In
                </span>
                <span className="font-semibold text-stone-800 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#16382B]" />
                  {checkInFormatted}
                </span>
              </div>

              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <span className="text-[10px] text-stone-400 uppercase font-bold block mb-0.5">
                  Check-Out
                </span>
                <span className="font-semibold text-stone-800 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#E0704D]" />
                  {checkOutFormatted}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <span className="text-[10px] text-stone-400 uppercase font-bold block mb-0.5">
                  Party Size
                </span>
                <span className="font-semibold text-stone-800 flex items-center gap-1">
                  <Users className="w-3 h-3 text-stone-500" />
                  {booking.guests.adults} {booking.guests.adults === 1 ? 'Adult' : 'Adults'}
                  {booking.guests.children > 0 && `, ${booking.guests.children} Child`}
                  {' • '}{booking.rooms} {booking.rooms === 1 ? 'Room' : 'Rooms'}
                </span>
              </div>
            </div>

            {booking.status === 'Cancelled' && booking.cancellationReason && (
              <div className="mt-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <Ban className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Cancellation Reason:</span> {booking.cancellationReason}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar: Price & Action Buttons */}
          <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">
                Total Demo Amount
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-[#16382B] font-editorial">
                  ₹{booking.priceBreakdown.totalAmount.toLocaleString()}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  ({booking.nights}N • incl. demo taxes)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* View Details */}
              <button
                onClick={() => onViewDetails(booking)}
                className="px-3.5 py-2 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#E5A43B]" />
                <span>View Details</span>
              </button>

              {/* Print Summary */}
              <button
                onClick={() => onPrintRequest(booking)}
                className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition cursor-pointer"
                title="Print Demo Voucher"
                aria-label="Print demo booking voucher"
              >
                <Printer className="w-4 h-4" />
              </button>

              {/* Book Again */}
              <Link
                to={`/book-demo?dest=${booking.destinationId}${booking.accommodationId ? `&acc=${booking.accommodationId}` : ''}`}
                className="px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition flex items-center gap-1"
                title="Book this destination again with new dates"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">Book Again</span>
              </Link>

              {/* Cancel Action if applicable */}
              {isCancellable && (
                <button
                  onClick={() => onCancelRequest(booking)}
                  className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition flex items-center gap-1 cursor-pointer border border-transparent hover:border-rose-200"
                  title="Cancel this demo booking"
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
