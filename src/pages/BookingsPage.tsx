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
  LayoutGrid,
  Table as TableIcon,
  Download,
  Printer,
  Eye,
  RotateCcw,
  Ban,
  MapPin,
  Building,
  DollarSign,
  Copy,
  Check,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

type BookingTab = 'all' | 'upcoming' | 'completed' | 'cancelled';
type SortOption = 'newest' | 'oldest' | 'checkin-soon' | 'price-high' | 'price-low';
type ViewMode = 'cards' | 'table';

export const BookingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as BookingTab) || 'all';

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<BookingTab>(initialTab);
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  // Modals state
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [voucherBooking, setVoucherBooking] = useState<Booking | null>(null);

  // Copy feedback
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const refreshBookings = () => {
    setBookings(StorageService.getBookings());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    refreshBookings();
  }, []);

  // Sync activeTab when URL query changes
  useEffect(() => {
    const tab = searchParams.get('tab') as BookingTab;
    if (tab && ['all', 'upcoming', 'completed', 'cancelled'].includes(tab)) {
      setActiveTab(tab);
    } else if (!tab) {
      setActiveTab('all');
    }
  }, [searchParams]);

  // Update tab in URL query
  const handleTabChange = (tab: BookingTab) => {
    setActiveTab(tab);
    setSearchParams(tab === 'all' ? {} : { tab });
  };

  // Distinct Destinations present in bookings
  const uniqueDestinations = useMemo(() => {
    const map = new Map<string, string>();
    bookings.forEach((b) => {
      map.set(b.destinationId, b.destinationName);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [bookings]);

  // Dynamic Statistics
  const stats = useMemo(() => {
    const total = bookings.length;
    const upcoming = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending').length;
    const completed = bookings.filter((b) => b.status === 'Completed').length;
    const cancelled = bookings.filter((b) => b.status === 'Cancelled').length;

    // Financial calculations
    const totalSpend = bookings.reduce(
      (sum, b) => (b.status !== 'Cancelled' ? sum + (b.priceBreakdown?.totalAmount || 0) : sum),
      0
    );
    const totalNights = bookings.reduce(
      (sum, b) => (b.status !== 'Cancelled' ? sum + (b.nights || 0) : sum),
      0
    );
    const avgNightlyRate =
      totalNights > 0 ? Math.round(totalSpend / totalNights) : 0;

    return {
      total,
      upcoming,
      completed,
      cancelled,
      totalSpend,
      totalNights,
      avgNightlyRate,
    };
  }, [bookings]);

  // Next Upcoming Booking Spotlight
  const nextUpcomingBooking = useMemo(() => {
    const upcoming = bookings
      .filter((b) => b.status === 'Confirmed' || b.status === 'Pending')
      .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime());
    return upcoming.length > 0 ? upcoming[0] : null;
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

    // Filter by Destination chip
    if (selectedDestination !== 'all') {
      result = result.filter((b) => b.destinationId === selectedDestination);
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
          b.guestDetails.fullName.toLowerCase().includes(q) ||
          (b.roomType && b.roomType.toLowerCase().includes(q))
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
  }, [bookings, activeTab, selectedDestination, searchQuery, sortBy]);

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

  const handleCopyRef = (refCode: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(refCode);
    setCopiedRef(refCode);
    setToastMessage(`Copied reference ${refCode} to clipboard!`);
    setTimeout(() => {
      setCopiedRef(null);
      setToastMessage(null);
    }, 2500);
  };

  const handleExportCSV = () => {
    if (bookings.length === 0) return;
    const headers = [
      'Reference',
      'Status',
      'Accommodation',
      'Destination',
      'CheckIn',
      'CheckOut',
      'Nights',
      'Rooms',
      'Adults',
      'GuestName',
      'GuestEmail',
      'TotalAmount_INR',
      'BookingDate',
    ];

    const rows = bookings.map((b) => [
      `"${b.bookingReference}"`,
      `"${b.status}"`,
      `"${b.accommodationName.replace(/"/g, '""')}"`,
      `"${b.destinationName}"`,
      `"${b.checkIn}"`,
      `"${b.checkOut}"`,
      b.nights,
      b.rooms,
      b.guests.adults,
      `"${b.guestDetails.fullName.replace(/"/g, '""')}"`,
      `"${b.guestDetails.email}"`,
      b.priceBreakdown.totalAmount,
      `"${b.createdAt}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `wanderflow-bookings-export-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setToastMessage('Exported bookings ledger to CSV!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#16382B] text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5 border border-white/20 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-[#E5A43B] shrink-0" />
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

      {/* Header Banner & Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#16382B] text-white text-[11px] font-bold shadow-xs">
              Travel Operations Center
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-amber-900 bg-amber-50 px-3 py-1 rounded-full font-bold border border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              Demo Simulation Ledger
            </span>
            <span className="text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full font-bold border border-emerald-200">
              Free Cancellation Available
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-editorial tracking-tight">
            My Bookings Dashboard
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
            Manage your simulated hotel and hostel stays, review itemized price breakdowns, download official travel vouchers, and track your overall trip expenditure.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-bold border border-stone-300 shadow-xs transition cursor-pointer"
            title="Download full bookings ledger as CSV"
          >
            <Download className="w-4 h-4 text-stone-500" />
            <span>Export CSV</span>
          </button>

          <Link
            to="/book-demo"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#E0704D] hover:bg-[#cb5b38] text-white text-xs sm:text-sm font-bold shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book New Stay</span>
          </Link>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-[#16382B] hover:bg-[#235441] text-white text-xs sm:text-sm font-bold shadow-xs transition"
          >
            <Compass className="w-4 h-4 text-[#E5A43B]" />
            <span>Explore Places</span>
          </Link>
        </div>
      </div>

      {/* Featured Next Upcoming Journey Spotlight Banner */}
      {nextUpcomingBooking && (
        <section className="bg-gradient-to-br from-[#16382B] via-[#1B4334] to-[#0F261D] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
            <img
              src={nextUpcomingBooking.accommodationImage || nextUpcomingBooking.destinationImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E5A43B] text-[#0F261D] text-[10px] font-extrabold tracking-wider uppercase">
                  Next Journey Ahead
                </span>
                <span className="text-xs text-stone-300 font-mono">
                  Ref: {nextUpcomingBooking.bookingReference}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-editorial text-white">
                {nextUpcomingBooking.accommodationName}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-stone-200">
                  <MapPin className="w-3.5 h-3.5 text-[#E0704D]" />
                  {nextUpcomingBooking.destinationLocation}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-stone-200">
                  <Calendar className="w-3.5 h-3.5 text-[#E5A43B]" />
                  {nextUpcomingBooking.checkIn} to {nextUpcomingBooking.checkOut} ({nextUpcomingBooking.nights} Nights)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-stone-200">
                  <Users className="w-3.5 h-3.5 text-stone-300" />
                  {nextUpcomingBooking.guests.adults} Adults • {nextUpcomingBooking.rooms} Room
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="text-left md:text-right mr-2">
                <span className="text-[10px] uppercase font-bold text-stone-300 block">
                  Total Reserved
                </span>
                <span className="text-2xl font-bold font-editorial text-white">
                  ₹{nextUpcomingBooking.priceBreakdown.totalAmount.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => handleOpenDetails(nextUpcomingBooking)}
                className="px-4 py-2.5 rounded-xl bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold transition shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#16382B]" />
                <span>View Stay</span>
              </button>

              <button
                onClick={() => handleOpenPrint(nextUpcomingBooking)}
                className="px-4 py-2.5 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white text-xs font-bold transition shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Voucher PDF</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Summary Analytics Metrics Cards */}
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
              Total Reservations
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
              Upcoming Stays
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
            Confirmed departures
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
              Completed Stays
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
            Past travel milestones
          </span>
        </div>

        {/* Total Spend & Analytics */}
        <div className="p-5 rounded-3xl bg-white border border-[#E6E2D8] text-stone-900 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase font-bold tracking-wider text-stone-500">
              Demo Spend Total
            </span>
            <DollarSign className="w-4 h-4 text-[#16382B]" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold font-editorial text-[#16382B] block">
            ₹{stats.totalSpend.toLocaleString()}
          </span>
          <span className="text-[11px] mt-1 block text-stone-500">
            {stats.totalNights} Nights • Avg ₹{stats.avgNightlyRate.toLocaleString()}/night
          </span>
        </div>
      </section>

      {/* Destination Quick-Filter Chips */}
      {uniqueDestinations.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-1">
            Destination:
          </span>
          <button
            onClick={() => setSelectedDestination('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer ${
              selectedDestination === 'all'
                ? 'bg-[#16382B] text-white shadow-xs'
                : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            All Destinations ({bookings.length})
          </button>
          {uniqueDestinations.map((d) => {
            const count = bookings.filter((b) => b.destinationId === d.id).length;
            const isSelected = selectedDestination === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDestination(d.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#16382B] text-white shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {d.name} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Search, Filter Tabs, Sorting & View Mode Toolbar */}
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

          {/* Search, Sorting, and View Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stays, ref, guest..."
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
                <option value="newest">Booking Date: Newest</option>
                <option value="oldest">Booking Date: Oldest</option>
                <option value="checkin-soon">Check-in: Earliest</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>

            {/* View Mode Switcher (Cards vs Table Ledger) */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shrink-0">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white text-[#16382B] shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Card View"
                aria-label="Switch to Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#16382B] shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Table Ledger View"
                aria-label="Switch to Table Ledger View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bookings Display (Cards View or Table Ledger View) */}
      <section className="space-y-4">
        {filteredBookings.length > 0 ? (
          viewMode === 'cards' ? (
            /* Cards View */
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
            /* High-Density Table Ledger View */
            <div className="bg-white rounded-3xl border border-[#E6E2D8] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-wider text-[10px] border-b border-stone-200">
                    <tr>
                      <th className="py-3.5 px-4">Status &amp; Reference</th>
                      <th className="py-3.5 px-4">Accommodation</th>
                      <th className="py-3.5 px-4">Destination</th>
                      <th className="py-3.5 px-4">Stay Dates</th>
                      <th className="py-3.5 px-4">Guests</th>
                      <th className="py-3.5 px-4 text-right">Amount</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium">
                    {filteredBookings.map((booking) => {
                      const isUpcoming =
                        booking.status === 'Confirmed' || booking.status === 'Pending';
                      const statusColor =
                        booking.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : booking.status === 'Completed'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : booking.status === 'Cancelled'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200';

                      return (
                        <tr
                          key={booking.id}
                          className="hover:bg-stone-50/70 transition cursor-pointer"
                          onClick={() => handleOpenDetails(booking)}
                        >
                          {/* Reference & Status */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex flex-col gap-1">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border w-max ${statusColor}`}
                              >
                                {booking.status}
                              </span>
                              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-stone-900">
                                <span>{booking.bookingReference}</span>
                                <button
                                  onClick={(e) => handleCopyRef(booking.bookingReference, e)}
                                  className="p-1 text-stone-400 hover:text-stone-700 rounded"
                                  title="Copy reference"
                                >
                                  {copiedRef === booking.bookingReference ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* Accommodation & Room */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={booking.accommodationImage || booking.destinationImage}
                                alt={booking.accommodationName}
                                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200"
                              />
                              <div>
                                <strong className="text-stone-900 font-bold block truncate max-w-[200px]">
                                  {booking.accommodationName}
                                </strong>
                                <span className="text-[11px] text-stone-500 block truncate max-w-[200px]">
                                  {booking.roomType || 'Standard Room'}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Destination */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="flex items-center gap-1 font-semibold text-stone-800">
                              <MapPin className="w-3.5 h-3.5 text-[#E0704D]" />
                              {booking.destinationName}
                            </span>
                            <span className="text-[10px] text-stone-400 block truncate max-w-[150px]">
                              {booking.destinationLocation}
                            </span>
                          </td>

                          {/* Stay Dates */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="text-xs">
                              <span className="font-bold text-stone-800 block">
                                {booking.checkIn}
                              </span>
                              <span className="text-[11px] text-stone-400 block">
                                to {booking.checkOut} ({booking.nights}N)
                              </span>
                            </div>
                          </td>

                          {/* Party Size */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="text-xs font-semibold text-stone-800 block">
                              {booking.guests.adults} Adults
                            </span>
                            <span className="text-[11px] text-stone-400 block">
                              {booking.rooms} {booking.rooms === 1 ? 'Room' : 'Rooms'}
                            </span>
                          </td>

                          {/* Amount */}
                          <td className="py-4 px-4 whitespace-nowrap text-right">
                            <strong className="text-sm font-bold text-[#16382B] block font-editorial">
                              ₹{booking.priceBreakdown.totalAmount.toLocaleString()}
                            </strong>
                            <span className="text-[10px] text-stone-400 block">
                              incl. demo tax
                            </span>
                          </td>

                          {/* Actions */}
                          <td
                            className="py-4 px-4 whitespace-nowrap text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenDetails(booking)}
                                className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 transition"
                                title="View details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleOpenPrint(booking)}
                                className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 transition"
                                title="Print voucher"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>

                              {isUpcoming && (
                                <button
                                  onClick={() => handleOpenCancel(booking)}
                                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition"
                                  title="Cancel booking"
                                >
                                  <Ban className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          /* Empty Search / Filter State */
          <div className="p-12 sm:p-16 rounded-3xl bg-white border border-[#E6E2D8] text-center space-y-4 max-w-2xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-3xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <CalendarDays className="w-8 h-8 text-[#16382B]/60" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900">
                {searchQuery
                  ? 'No matching reservations found'
                  : selectedDestination !== 'all'
                  ? `No bookings in selected destination`
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
              {searchQuery || selectedDestination !== 'all' ? (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDestination('all');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
                >
                  Clear Filters
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

export default BookingsPage;
