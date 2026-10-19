import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { StorageService } from '../lib/storage';
import { Booking } from '../types';
import { BookingCard } from '../components/booking/BookingCard';
import { BookingDetailModal } from '../components/booking/BookingDetailModal';
import { CancelBookingModal } from '../components/booking/CancelBookingModal';
import { PrintableBookingVoucher } from '../components/booking/PrintableBookingVoucher';
import {
  CalendarDays,
  PlusCircle,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';

type BookingTab = 'all' | 'upcoming' | 'completed' | 'cancelled';
type SortOption = 'newest' | 'oldest' | 'checkin-soon' | 'price-high' | 'price-low';

export const BookingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as BookingTab) || 'all';

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<BookingTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Modals state
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [voucherBooking, setVoucherBooking] = useState<Booking | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const refreshBookings = () => {
    setBookings(StorageService.getBookings());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    refreshBookings();
  }, []);

  // Update tab in URL query
  const handleTabChange = (tab: BookingTab) => {
    setActiveTab(tab);
    setSearchParams(tab === 'all' ? {} : { tab });
  };

  // Dynamic Statistics (Always computed from records)
  const stats = useMemo(() => {
    const total = bookings.length;
    const upcoming = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending').length;
    const completed = bookings.filter((b) => b.status === 'Completed').length;
    const cancelled = bookings.filter((b) => b.status === 'Cancelled').length;
    return { total, upcoming, completed, cancelled };
  }, [bookings]);

  // Filtered & Sorted Bookings
  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    // Filter by tab
    if (activeTab === 'upcoming') {
      result = result.filter((b) => b.status === 'Confirmed' || b.status === 'Pending');
    } else if (activeTab === 'completed') {
      result = result.filter((b) => b.status === 'Completed');
    } else if (activeTab === 'cancelled') {
      result = result.filter((b) => b.status === 'Cancelled');
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.destinationName.toLowerCase().includes(q) ||
          b.accommodationName.toLowerCase().includes(q) ||
          b.destinationLocation.toLowerCase().includes(q) ||
          b.bookingReference.toLowerCase().includes(q) ||
          b.guestDetails.fullName.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'checkin-soon') {
        return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
      }
      if (sortBy === 'price-high') {
        return b.priceBreakdown.totalAmount - a.priceBreakdown.totalAmount;
      }
      if (sortBy === 'price-low') {
        return a.priceBreakdown.totalAmount - b.priceBreakdown.totalAmount;
      }
      return 0;
    });

    return result;
  }, [bookings, activeTab, searchQuery, sortBy]);

  const handleOpenDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailModalOpen(true);
  };

  const handleOpenCancel = (booking: Booking) => {
    setBookingToCancel(booking);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = (bookingId: string, reason: string) => {
    const updated = StorageService.cancelBooking(bookingId, reason);
    if (updated) {
      refreshBookings();
      setToastMessage(`Booking ${updated.bookingReference} has been cancelled.`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleOpenPrint = (booking: Booking) => {
    setVoucherBooking(booking);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#16382B] text-white text-xs font-semibold shadow-xl flex items-center gap-2 border border-white/20 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-[#E5A43B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Detail Modal */}
      <BookingDetailModal
        booking={selectedBooking}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onCancelRequest={(b) => handleOpenCancel(b)}
        onPrintRequest={(b) => handleOpenPrint(b)}
      />

      {/* Cancellation Modal */}
      <CancelBookingModal
        booking={bookingToCancel}
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirmCancel={handleConfirmCancel}
      />

      {/* Printable Voucher Modal */}
      {voucherBooking && (
        <PrintableBookingVoucher
          booking={voucherBooking}
          onClose={() => setVoucherBooking(null)}
        />
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#16382B] text-white text-[11px] font-bold">
              Account Management
            </span>
            <span className="flex items-center gap-1 text-[11px] text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full font-semibold border border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              Demo Booking System
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-editorial tracking-tight">
            My Bookings Dashboard
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
            View and manage your upcoming simulated stays, review detailed price breakdowns, print official trip vouchers, or start a new demo booking.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/book-demo"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white text-xs sm:text-sm font-bold shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book Demo Trip</span>
          </Link>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs sm:text-sm font-semibold border border-stone-300 transition"
          >
            <span>Explore Places</span>
          </Link>
        </div>
      </div>

      {/* Dynamic Summary Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bookings */}
        <div
          onClick={() => handleTabChange('all')}
          className={`p-5 rounded-3xl border transition cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#16382B] text-white border-[#16382B] shadow-lg'
              : 'bg-white hover:border-[#16382B]/30 border-[#E6E2D8] text-stone-900 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-[11px] uppercase font-bold tracking-wider ${
                activeTab === 'all' ? 'text-stone-300' : 'text-stone-500'
              }`}
            >
              Total Bookings
            </span>
            <CalendarDays
              className={`w-4 h-4 ${activeTab === 'all' ? 'text-[#E5A43B]' : 'text-stone-400'}`}
            />
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold font-editorial block">
            {stats.total}
          </span>
          <span
            className={`text-[11px] mt-1 block ${
              activeTab === 'all' ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            All records in storage
          </span>
        </div>

        {/* Upcoming Trips */}
        <div
          onClick={() => handleTabChange('upcoming')}
          className={`p-5 rounded-3xl border transition cursor-pointer ${
            activeTab === 'upcoming'
              ? 'bg-[#16382B] text-white border-[#16382B] shadow-lg'
              : 'bg-white hover:border-[#16382B]/30 border-[#E6E2D8] text-stone-900 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-[11px] uppercase font-bold tracking-wider ${
                activeTab === 'upcoming' ? 'text-stone-300' : 'text-stone-500'
              }`}
            >
              Upcoming Trips
            </span>
            <CheckCircle2
              className={`w-4 h-4 ${
                activeTab === 'upcoming' ? 'text-emerald-400' : 'text-emerald-600'
              }`}
            />
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold font-editorial text-emerald-600 block">
            {stats.upcoming}
          </span>
          <span
            className={`text-[11px] mt-1 block ${
              activeTab === 'upcoming' ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            Confirmed demo stays
          </span>
        </div>

        {/* Completed Trips */}
        <div
          onClick={() => handleTabChange('completed')}
          className={`p-5 rounded-3xl border transition cursor-pointer ${
            activeTab === 'completed'
              ? 'bg-[#16382B] text-white border-[#16382B] shadow-lg'
              : 'bg-white hover:border-[#16382B]/30 border-[#E6E2D8] text-stone-900 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-[11px] uppercase font-bold tracking-wider ${
                activeTab === 'completed' ? 'text-stone-300' : 'text-stone-500'
              }`}
            >
              Completed Trips
            </span>
            <Clock
              className={`w-4 h-4 ${activeTab === 'completed' ? 'text-blue-400' : 'text-blue-600'}`}
            />
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold font-editorial text-blue-600 block">
            {stats.completed}
          </span>
          <span
            className={`text-[11px] mt-1 block ${
              activeTab === 'completed' ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            Past travel experiences
          </span>
        </div>

        {/* Cancelled Bookings */}
        <div
          onClick={() => handleTabChange('cancelled')}
          className={`p-5 rounded-3xl border transition cursor-pointer ${
            activeTab === 'cancelled'
              ? 'bg-[#16382B] text-white border-[#16382B] shadow-lg'
              : 'bg-white hover:border-[#16382B]/30 border-[#E6E2D8] text-stone-900 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-[11px] uppercase font-bold tracking-wider ${
                activeTab === 'cancelled' ? 'text-stone-300' : 'text-stone-500'
              }`}
            >
              Cancelled
            </span>
            <XCircle
              className={`w-4 h-4 ${activeTab === 'cancelled' ? 'text-rose-400' : 'text-rose-600'}`}
            />
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold font-editorial text-rose-600 block">
            {stats.cancelled}
          </span>
          <span
            className={`text-[11px] mt-1 block ${
              activeTab === 'cancelled' ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            Preserved in history
          </span>
        </div>
      </section>

      {/* Search, Filter Tabs & Sorting Toolbar */}
      <section className="bg-white rounded-3xl border border-[#E6E2D8] p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#16382B] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              All Bookings ({stats.total})
            </button>

            <button
              onClick={() => handleTabChange('upcoming')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-[#16382B] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Upcoming ({stats.upcoming})
            </button>

            <button
              onClick={() => handleTabChange('completed')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                activeTab === 'completed'
                  ? 'bg-[#16382B] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Completed ({stats.completed})
            </button>

            <button
              onClick={() => handleTabChange('cancelled')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                activeTab === 'cancelled'
                  ? 'bg-[#16382B] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Cancelled ({stats.cancelled})
            </button>
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stays, places, or ref..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#16382B] focus:outline-none bg-stone-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-700 bg-stone-50/50 focus:ring-2 focus:ring-[#16382B] focus:outline-none cursor-pointer"
              >
                <option value="newest">Booking Date: Newest First</option>
                <option value="oldest">Booking Date: Oldest First</option>
                <option value="checkin-soon">Check-in: Earliest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Bookings List or Empty State */}
      <section className="space-y-4">
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onViewDetails={handleOpenDetails}
                onCancelRequest={handleOpenCancel}
                onPrintRequest={handleOpenPrint}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 sm:p-16 rounded-3xl bg-white border border-[#E6E2D8] text-center space-y-4 max-w-2xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-3xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <CalendarDays className="w-8 h-8 text-[#16382B]/60" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900">
                {searchQuery
                  ? 'No matching reservations found'
                  : activeTab === 'cancelled'
                  ? 'No cancelled bookings'
                  : activeTab === 'completed'
                  ? 'No completed trips yet'
                  : 'Your next adventure starts here'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                {searchQuery
                  ? `No reservations matched "${searchQuery}". Try searching with another term or clear the filter.`
                  : 'Plan your next student getaway or explore iconic stays across Manali, Goa, Amritsar, and Jaipur.'}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
                >
                  Clear Search Filter
                </button>
              ) : (
                <>
                  <Link
                    to="/book-demo"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white text-xs font-bold shadow-xs transition"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Try Demo Booking</span>
                  </Link>
                  <Link
                    to="/explore"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#16382B] text-white text-xs font-semibold hover:bg-[#235441] transition"
                  >
                    <span>Explore Destinations</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
