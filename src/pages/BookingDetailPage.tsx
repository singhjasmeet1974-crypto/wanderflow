import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { StorageService } from '../lib/storage';
import { Booking } from '../types';
import { CancelBookingModal } from '../components/booking/CancelBookingModal';
import { PrintableBookingVoucher } from '../components/booking/PrintableBookingVoucher';
import {
  ArrowLeft,
  Calendar,
  Users,
  Building,
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
  ChevronRight,
  Home,
} from 'lucide-react';

export const BookingDetailPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [copied, setCopied] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [printVoucherOpen, setPrintVoucherOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadBooking = () => {
    if (bookingId) {
      const found = StorageService.getBookingById(bookingId);
      setBooking(found);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadBooking();
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold font-editorial text-stone-900">
          Booking Record Not Found
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          No reservation matching ID or reference <strong className="font-mono text-stone-900">{bookingId}</strong> could be found in your local demo history.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#16382B] text-white rounded-xl text-xs font-semibold hover:bg-[#235441] transition"
          >
            <Home className="w-4 h-4 text-[#E5A43B]" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/bookings"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 text-stone-800 rounded-xl text-xs font-semibold hover:bg-stone-200 transition border border-stone-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to My Bookings</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyReference = () => {
    navigator.clipboard.writeText(booking.bookingReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmCancel = (id: string, reason: string) => {
    const updated = StorageService.cancelBooking(id, reason);
    if (updated) {
      setBooking(updated);
      setToastMessage(`Booking ${updated.bookingReference} has been cancelled.`);
      setTimeout(() => setToastMessage(null), 3500);
    }
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#16382B] text-white text-xs font-semibold shadow-xl flex items-center gap-2 border border-white/20 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-[#E5A43B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cancellation Modal */}
      <CancelBookingModal
        booking={booking}
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirmCancel={handleConfirmCancel}
      />

      {/* Printable Voucher Modal */}
      {printVoucherOpen && (
        <PrintableBookingVoucher
          booking={booking}
          onClose={() => setPrintVoucherOpen(false)}
        />
      )}

      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-[#16382B] font-medium flex items-center gap-1" title="Return to Home">
            <Home className="w-3.5 h-3.5 text-[#E5A43B]" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link to="/bookings" className="hover:text-[#16382B] font-medium">
            My Bookings
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-mono font-bold truncate">
            {booking.bookingReference}
          </span>
        </nav>

        <button
          onClick={() => navigate('/bookings')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bookings</span>
        </button>
      </div>

      {/* Main Reservation Card */}
      <div className="bg-white rounded-3xl border border-[#E6E2D8] shadow-md overflow-hidden space-y-0">
        {/* Top Demo Simulation Banner */}
        <div className="bg-amber-500 text-[#0F261D] px-6 py-2.5 text-xs font-bold flex items-center justify-between border-b border-amber-600/30">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#0F261D]" />
            <span>DEMO BOOKING — NOT A REAL RESERVATION</span>
          </div>
          <span className="text-[10px] font-semibold bg-[#0F261D] text-white px-2 py-0.5 rounded-full">
            TR-101 Evaluation
          </span>
        </div>

        {/* Hero Image Section */}
        <div className="relative h-56 sm:h-72 w-full bg-stone-900 overflow-hidden">
          <img
            src={booking.accommodationImage || booking.destinationImage}
            alt={booking.accommodationName}
            className="w-full h-full object-cover filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Hero Content */}
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${statusConfig.badgeClass}`}
                >
                  <StatusIcon className="w-3.5 h-3.5" />
                  <span>{statusConfig.label}</span>
                </span>
                <span className="text-xs text-stone-300 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E0704D]" />
                  {booking.destinationLocation || booking.destinationName}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-editorial text-white tracking-tight">
                {booking.accommodationName}
              </h1>

              {booking.roomType && (
                <p className="text-xs sm:text-sm text-stone-200 mt-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#E5A43B]" />
                  <span>{booking.roomType}</span>
                </p>
              )}
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs text-stone-300 block">Total Demo Amount</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-editorial text-white">
                ₹{booking.priceBreakdown.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Reference row */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Booking Reference:
              </span>
              <span className="font-mono font-bold text-sm text-[#16382B] bg-white px-2.5 py-1 rounded-lg border border-stone-300">
                {booking.bookingReference}
              </span>
              <button
                onClick={handleCopyReference}
                className="p-1.5 text-stone-500 hover:text-stone-800 transition rounded-lg hover:bg-stone-200"
                title="Copy Reference"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <span className="text-xs text-stone-500">
              Booked on {new Date(booking.createdAt).toLocaleString()}
            </span>
          </div>

          {/* Key Dates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">
                Check-In
              </span>
              <strong className="text-sm sm:text-base font-bold text-stone-900 block flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#16382B]" />
                {checkInFormatted}
              </strong>
              <span className="text-[11px] text-stone-400">Check-in time after 01:00 PM</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">
                Check-Out
              </span>
              <strong className="text-sm sm:text-base font-bold text-stone-900 block flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#E0704D]" />
                {checkOutFormatted}
              </strong>
              <span className="text-[11px] text-stone-400">Check-out time by 11:00 AM</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">
                Duration &amp; Party
              </span>
              <strong className="text-sm sm:text-base font-bold text-stone-900 block flex items-center gap-1.5">
                <Users className="w-4 h-4 text-stone-600" />
                {booking.nights}N • {booking.guests.adults} Adults
              </strong>
              <span className="text-[11px] text-stone-400">
                {booking.rooms} {booking.rooms === 1 ? 'Room' : 'Rooms'}
              </span>
            </div>
          </div>

          {/* Guest Contact Details */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-stone-600 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#16382B]" />
              Guest Particulars
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-stone-500 block">Primary Guest Name:</span>
                <strong className="text-stone-900 font-semibold block mt-0.5">
                  {booking.guestDetails.fullName}
                </strong>
              </div>

              <div>
                <span className="text-stone-500 block">Contact Email:</span>
                <strong className="text-stone-900 font-semibold block mt-0.5 flex items-center gap-1 truncate">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  {booking.guestDetails.email}
                </strong>
              </div>

              {booking.guestDetails.phone && (
                <div>
                  <span className="text-stone-500 block">Contact Phone:</span>
                  <strong className="text-stone-900 font-semibold block mt-0.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    {booking.guestDetails.phone}
                  </strong>
                </div>
              )}

              {booking.guestDetails.specialRequests && (
                <div className="sm:col-span-3 pt-2 border-t border-stone-200">
                  <span className="text-stone-500 block">Special Requests &amp; Notes:</span>
                  <p className="text-stone-700 italic mt-0.5">
                    "{booking.guestDetails.specialRequests}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Itemized Price Ledger */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-stone-600 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#16382B]" />
              Itemized Demo Price Breakdown
            </h3>

            <div className="space-y-2 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>
                  Base Room Charge (₹{booking.priceBreakdown.nightlyRate.toLocaleString()} × {booking.nights} nights × {booking.rooms} rooms)
                </span>
                <span className="font-semibold text-stone-900">
                  ₹{booking.priceBreakdown.baseAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Demo Hospitality GST &amp; Platform Fee (12%)</span>
                <span className="font-semibold text-stone-900">
                  ₹{booking.priceBreakdown.taxesAndFees.toLocaleString()}
                </span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between text-base sm:text-lg font-bold text-stone-900 font-editorial">
                <span>Total Estimated Cost</span>
                <span className="text-[#16382B]">
                  ₹{booking.priceBreakdown.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 italic">
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
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Demo Free Cancellation Policy
              </span>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                You can freely cancel this demo reservation at any time before departure. The status will update across your dashboard and preserve your evaluation history.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPrintVoucherOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>Print / Save Voucher PDF</span>
              </button>

              <Link
                to={`/book-demo?dest=${booking.destinationId}${booking.accommodationId ? `&acc=${booking.accommodationId}` : ''}`}
                className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-xs transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4 text-stone-600" />
                <span>Book Again</span>
              </Link>
            </div>

            {isCancellable && (
              <button
                onClick={() => setCancelModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition cursor-pointer flex items-center gap-1.5"
              >
                <Ban className="w-4 h-4" />
                <span>Cancel Reservation</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
