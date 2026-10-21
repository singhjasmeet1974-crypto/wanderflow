import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../lib/storage';
import { DestinationService } from '../lib/destinationService';
import { TravelStyle, GroupTripInterest, Booking, Trip } from '../types';
import { BookingCard } from '../components/booking/BookingCard';
import { BookingDetailModal } from '../components/booking/BookingDetailModal';
import { CancelBookingModal } from '../components/booking/CancelBookingModal';
import { PrintableBookingVoucher } from '../components/booking/PrintableBookingVoucher';
import {
  Heart,
  MapPin,
  Camera,
  CheckCircle2,
  Trash2,
  ArrowRight,
  RotateCcw,
  LogOut,
  CalendarDays,
  PlusCircle,
  Mail,
  Phone,
  School,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  Clock,
  Download,
  Share2,
  Copy,
  Check,
  Award,
  AlertCircle,
  Eye,
  Sliders,
  DollarSign,
} from 'lucide-react';

const PRESET_AVATARS = [
  {
    name: 'Aarav (Default)',
    role: 'Lead Backpacker',
    url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Simran',
    role: 'Cultural Trekker',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Kabir',
    role: 'Mountain Nomad',
    url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Ananya',
    role: 'Photographer',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Rohan',
    role: 'Roadtripper',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Priya',
    role: 'Solo Explorer',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
];

const PREFERRED_CATEGORY_OPTIONS = [
  'Mountains',
  'Beaches',
  'Heritage',
  'Nature',
  'Adventure',
  'City Escapes',
  'Roadtrips',
  'Spiritual & Wellness',
];

const DIETARY_OPTIONS = [
  'Pure Vegetarian',
  'Vegan',
  'Halal Friendly',
  'Jain Food',
  'Gluten-Free',
  'Local Street Food Explorer',
  'Pet Friendly Stays',
  'Wheelchair Accessible',
];

export const ProfilePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const { user, isAuthenticated, updateProfile, logout, loginAsDemo, resetDemoData, isDemoMode } = useAuth();
  const navigate = useNavigate();

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'saved' | 'trips' | 'settings'>(
    initialTab === 'saved'
      ? 'saved'
      : initialTab === 'settings'
      ? 'settings'
      : initialTab === 'bookings'
      ? 'bookings'
      : initialTab === 'trips'
      ? 'trips'
      : 'overview'
  );

  // Form Fields
  const [fullName, setFullName] = useState(user?.fullName || 'Aarav Sharma');
  const [email, setEmail] = useState(user?.email || 'aarav.sharma@wanderflow.app');
  const [college, setCollege] = useState(user?.college || 'Wanderflow Explorers Club (GNDEC Ludhiana)');
  const [bio, setBio] = useState(
    user?.bio || 'Passionate backpacker, mountain lover, and lead explorer at Wanderflow.'
  );
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [cityOrCountry, setCityOrCountry] = useState(user?.cityOrCountry || 'Ludhiana, Punjab, India');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(user?.travelStyle || 'Student Group');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || PRESET_AVATARS[0].url);
  const [customAvatarInput, setCustomAvatarInput] = useState('');
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);

  // Emergency Contact Details
  const [emergencyName, setEmergencyName] = useState(user?.emergencyContact?.name || 'Rajesh Sharma');
  const [emergencyRelation, setEmergencyRelation] = useState(user?.emergencyContact?.relationship || 'Father');
  const [emergencyPhone, setEmergencyPhone] = useState(user?.emergencyContact?.phone || '+91 98111 22334');

  // Dietary & Accessibility Preferences
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(
    user?.dietaryPreferences || ['Pure Vegetarian', 'Local Street Food Explorer']
  );

  // Preferred Currency
  const [preferredCurrency, setPreferredCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP'>(
    user?.preferredCurrency || 'INR'
  );

  // Preferred destinations / categories
  const [preferredCategories, setPreferredCategories] = useState<string[]>(
    user?.preferredDestinations || ['Mountains', 'Heritage', 'Adventure']
  );

  // State from storage
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [groupInterests, setGroupInterests] = useState<GroupTripInterest[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Modals for Bookings Tab
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [voucherBooking, setVoucherBooking] = useState<Booking | null>(null);

  const loadAllData = () => {
    setSavedDestinationIds(StorageService.getSavedDestinations());
    setBookings(StorageService.getBookings());
    setTrips(StorageService.getTrips());
    setGroupInterests(StorageService.getGroupInterests());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadAllData();
  }, []);

  // Sync state if user context changes
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setCollege(user.college || '');
      setBio(user.bio || '');
      setPhone(user.phone || '');
      setCityOrCountry(user.cityOrCountry || '');
      setTravelStyle(user.travelStyle || 'Student Group');
      setAvatarUrl(user.avatarUrl || PRESET_AVATARS[0].url);
      if (user.preferredDestinations) {
        setPreferredCategories(user.preferredDestinations);
      }
      if (user.emergencyContact) {
        setEmergencyName(user.emergencyContact.name || '');
        setEmergencyRelation(user.emergencyContact.relationship || '');
        setEmergencyPhone(user.emergencyContact.phone || '');
      }
      if (user.dietaryPreferences) {
        setDietaryPreferences(user.dietaryPreferences);
      }
      if (user.preferredCurrency) {
        setPreferredCurrency(user.preferredCurrency);
      }
    }
  }, [user]);

  // Sync activeTab when URL query params change (e.g. from navbar clicks)
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'saved' || tab === 'settings' || tab === 'bookings' || tab === 'trips' || tab === 'overview') {
      setActiveTab(tab as any);
    } else if (!tab) {
      setActiveTab('overview');
    }
  }, [searchParams]);

  // Sync sub-tab with URL
  const handleTabChange = (tab: 'overview' | 'bookings' | 'saved' | 'trips' | 'settings') => {
    setActiveTab(tab);
    setSearchParams(tab === 'overview' ? {} : { tab });
  };

  // Profile Completion Percentage Calculation
  const profileCompletion = useMemo(() => {
    let score = 0;
    const checks = [
      Boolean(fullName.trim()),
      Boolean(email.trim()),
      Boolean(avatarUrl.trim()),
      Boolean(college.trim()),
      Boolean(bio.trim()),
      Boolean(phone.trim()),
      Boolean(cityOrCountry.trim()),
      preferredCategories.length > 0,
      Boolean(emergencyName.trim()),
      dietaryPreferences.length > 0,
    ];
    checks.forEach((c) => {
      if (c) score += 10;
    });
    return Math.min(100, Math.round(score));
  }, [
    fullName,
    email,
    avatarUrl,
    college,
    bio,
    phone,
    cityOrCountry,
    preferredCategories,
    emergencyName,
    dietaryPreferences,
  ]);

  // Handle Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: fullName.trim(),
      email: email.trim(),
      college: college.trim(),
      bio: bio.trim(),
      phone: phone.trim(),
      cityOrCountry: cityOrCountry.trim(),
      travelStyle,
      avatarUrl,
      preferredDestinations: preferredCategories,
      emergencyContact: {
        name: emergencyName.trim(),
        relationship: emergencyRelation.trim(),
        phone: emergencyPhone.trim(),
      },
      dietaryPreferences,
      preferredCurrency,
    });
    setToastMessage('Profile changes saved successfully to storage!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCancelEdit = () => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setCollege(user.college || '');
      setBio(user.bio || '');
      setPhone(user.phone || '');
      setCityOrCountry(user.cityOrCountry || '');
      setTravelStyle(user.travelStyle || 'Student Group');
      setAvatarUrl(user.avatarUrl || PRESET_AVATARS[0].url);
      setEmergencyName(user.emergencyContact?.name || '');
      setEmergencyRelation(user.emergencyContact?.relationship || '');
      setEmergencyPhone(user.emergencyContact?.phone || '');
    }
    setToastMessage('Form reverted to last saved profile.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleCategory = (cat: string) => {
    if (preferredCategories.includes(cat)) {
      setPreferredCategories(preferredCategories.filter((c) => c !== cat));
    } else {
      setPreferredCategories([...preferredCategories, cat]);
    }
  };

  const handleToggleDietary = (item: string) => {
    if (dietaryPreferences.includes(item)) {
      setDietaryPreferences(dietaryPreferences.filter((d) => d !== item));
    } else {
      setDietaryPreferences([...dietaryPreferences, item]);
    }
  };

  const handleRemoveSaved = (destId: string) => {
    StorageService.toggleSaveDestination(destId);
    setSavedDestinationIds(StorageService.getSavedDestinations());
    setToastMessage('Destination removed from wishlist.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Reset all demo trips, sample bookings, and profile data to baseline evaluation state?'
      )
    ) {
      resetDemoData();
      loadAllData();
      setToastMessage('All demo datasets have been reset to factory state!');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleExportData = () => {
    const data = {
      profile: user,
      bookings: StorageService.getBookings(),
      trips: StorageService.getTrips(),
      savedDestinations: StorageService.getSavedDestinations(),
      groupInterests: StorageService.getGroupInterests(),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wanderflow-profile-${user?.fullName?.replace(/\s+/g, '-').toLowerCase() || 'traveler'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMessage('Profile and travel data downloaded as JSON!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setToastMessage('Profile link copied to clipboard!');
    setTimeout(() => {
      setCopiedLink(false);
      setToastMessage(null);
    }, 2500);
  };

  const handleConfirmCancelBooking = (bookingId: string, reason: string) => {
    const updated = StorageService.cancelBooking(bookingId, reason);
    if (updated) {
      setBookings(StorageService.getBookings());
      setToastMessage(`Booking ${updated.bookingReference} has been cancelled.`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const savedDestinations = DestinationService.getAllDestinations().filter((d) =>
    savedDestinationIds.includes(d.id)
  );

  const upcomingBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending');
  const completedBookings = bookings.filter((b) => b.status === 'Completed');
  const cancelledBookings = bookings.filter((b) => b.status === 'Cancelled');

  const totalSpent = useMemo(() => {
    return bookings.reduce((sum, b) => sum + (b.priceBreakdown?.totalAmount || 0), 0);
  }, [bookings]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#16382B] text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5 border border-white/20 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-[#E5A43B] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Booking Modals */}
      <BookingDetailModal
        booking={selectedBooking}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onCancelRequest={(b) => {
          setBookingToCancel(b);
          setCancelModalOpen(true);
        }}
        onPrintRequest={(b) => setVoucherBooking(b)}
      />

      <CancelBookingModal
        booking={bookingToCancel}
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirmCancel={handleConfirmCancelBooking}
      />

      {voucherBooking && (
        <PrintableBookingVoucher
          booking={voucherBooking}
          onClose={() => setVoucherBooking(null)}
        />
      )}

      {/* Guest Mode Notice */}
      {!isAuthenticated && (
        <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-amber-900 font-medium">
              You are viewing in <strong>Guest Evaluation Mode</strong>. You can customize this profile or load the pre-configured demo explorer account.
            </span>
          </div>
          <button
            onClick={loginAsDemo}
            className="px-4 py-2 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold transition shrink-0 cursor-pointer shadow-xs"
          >
            Load Demo Traveler Profile
          </button>
        </div>
      )}

      {/* Header Profile Hero Card */}
      <div className="bg-gradient-to-br from-[#16382B] via-[#1B4334] to-[#0F261D] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#E5A43B_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            {/* Avatar with Camera Trigger */}
            <div className="relative shrink-0">
              <img
                src={avatarUrl}
                alt={fullName || 'Traveler'}
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-[#E5A43B] shadow-xl"
              />
              <button
                type="button"
                onClick={() => setAvatarPickerOpen(!avatarPickerOpen)}
                className="absolute -bottom-2 -right-2 p-2.5 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white shadow-lg transition cursor-pointer"
                title="Change Avatar Photo"
                aria-label="Change profile avatar photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* User Meta Information */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-4xl font-extrabold font-editorial text-white tracking-tight">
                  {fullName || 'Explorer Profile'}
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-[#E5A43B] text-[#0F261D] font-extrabold shadow-xs">
                  <Award className="w-3 h-3 text-[#0F261D]" />
                  Verified Explorer
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-stone-200 font-semibold border border-white/20">
                  {isDemoMode ? 'Demo Traveler' : 'Supabase Authenticated'}
                </span>
              </div>

              <div className="text-xs sm:text-sm text-stone-300 flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-stone-200">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  {email}
                </span>
                {phone && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-stone-200">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      {phone}
                    </span>
                  </>
                )}
                {cityOrCountry && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-stone-200">
                      <MapPin className="w-3.5 h-3.5 text-[#E0704D]" />
                      {cityOrCountry}
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs text-stone-400 flex items-center gap-1.5 flex-wrap">
                <School className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>Affiliation: <strong className="text-stone-200">{college || 'Explorer Club'}</strong></span>
                <span>•</span>
                <span>Loyalty: <strong className="text-[#E5A43B]">1,450 WanderPoints (Gold)</strong></span>
              </p>
            </div>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              to="/bookings"
              className="px-4 py-2.5 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white text-xs font-bold shadow-md transition flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>My Bookings ({bookings.length})</span>
            </Link>

            <Link
              to="/trips"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition flex items-center gap-1.5"
            >
              <CalendarDays className="w-4 h-4" />
              <span>My Trips ({trips.length})</span>
            </Link>

            <button
              onClick={handleShareProfile}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/20 cursor-pointer"
              title="Copy Profile Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Profile Completion Meter & Traveler Persona */}
        <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 w-full max-w-md">
            <div className="space-y-1 w-full">
              <div className="flex justify-between text-[11px]">
                <span className="text-stone-300 font-medium flex items-center gap-1">
                  Profile Completion
                  {profileCompletion === 100 && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  )}
                </span>
                <span className="font-bold text-[#E5A43B]">{profileCompletion}%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#E5A43B] to-[#E0704D] h-full rounded-full transition-all duration-500"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </div>
          </div>

          <div className="text-[11px] text-stone-300 flex items-center gap-2">
            <span>Travel Style Persona:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30">
              {travelStyle}
            </span>
          </div>
        </div>

        {/* Avatar Picker Dropdown / Modal */}
        {avatarPickerOpen && (
          <div className="relative z-20 mt-5 p-5 rounded-3xl bg-white text-stone-900 border border-stone-200 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div>
                <h3 className="text-xs font-bold text-stone-900">
                  Select an Avatar Preset or Custom Photo URL
                </h3>
                <p className="text-[11px] text-stone-500">
                  Choose a persona photo representing your travel style
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAvatarPickerOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {PRESET_AVATARS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setAvatarUrl(preset.url);
                    setAvatarPickerOpen(false);
                    setToastMessage(`Avatar changed to ${preset.name}!`);
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border transition cursor-pointer ${
                    avatarUrl === preset.url
                      ? 'border-[#16382B] ring-2 ring-[#16382B] bg-stone-50'
                      : 'border-stone-200 hover:border-stone-400 bg-white'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="text-center">
                    <span className="text-[11px] font-bold text-stone-900 block truncate">
                      {preset.name}
                    </span>
                    <span className="text-[9px] text-stone-500 block truncate">
                      {preset.role}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom URL Input */}
            <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
              <input
                type="url"
                value={customAvatarInput}
                onChange={(e) => setCustomAvatarInput(e.target.value)}
                placeholder="Or paste custom image URL (Unsplash, Gravatar, Cloudinary)..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16382B]"
              />
              <button
                type="button"
                onClick={() => {
                  if (customAvatarInput.trim()) {
                    setAvatarUrl(customAvatarInput.trim());
                    setCustomAvatarInput('');
                    setAvatarPickerOpen(false);
                    setToastMessage('Custom avatar applied!');
                    setTimeout(() => setToastMessage(null), 2500);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold cursor-pointer transition shadow-xs"
              >
                Apply Photo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Edit Profile & Details' },
          { id: 'bookings', label: `My Bookings Dashboard (${bookings.length})` },
          { id: 'saved', label: `Saved Wishlist (${savedDestinations.length})` },
          { id: 'trips', label: `My Trips & Plans (${trips.length})` },
          { id: 'settings', label: 'Settings & Demo Controls' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#16382B] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Edit Profile & Personal Preferences */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Edit Form (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <form
              onSubmit={handleSaveProfile}
              className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-6 shadow-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h2 className="text-xl font-bold font-editorial text-stone-900">
                    Personal &amp; Contact Details
                  </h2>
                  <p className="text-xs text-stone-500">
                    Update your identity, contact channels, and student persona
                  </p>
                </div>
                <span className="text-[11px] text-stone-400 hidden sm:inline">
                  Updates persist immediately
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">
                    Full Display Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">
                    City or Country
                  </label>
                  <input
                    type="text"
                    value={cityOrCountry}
                    onChange={(e) => setCityOrCountry(e.target.value)}
                    placeholder="e.g. Ludhiana, Punjab, India"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">
                    College / Institution / Organization
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Guru Nanak Dev Engineering College, Ludhiana"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">
                    Travel Style Persona
                  </label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value as TravelStyle)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#16382B] focus:outline-none bg-stone-50/50 cursor-pointer"
                  >
                    <option value="Student Group">Student Group (Budget squad trips &amp; shared homestays)</option>
                    <option value="Budget Backpacker">Budget Backpacker (Hostels, overnight transit &amp; street food)</option>
                    <option value="Balanced Explorer">Balanced Explorer (Boutique stays, local experiences &amp; comfort)</option>
                    <option value="Scenic & Relaxed">Scenic &amp; Relaxed (Mountain chalets, cafe hopping &amp; sunset points)</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">
                    Bio / Travel Motto
                  </label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell other travelers about your favorite destinations or bucket list..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Emergency Contact Particulars */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16382B]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Emergency Contact Particulars (For Group &amp; Student Safety)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Relationship
                    </label>
                    <input
                      type="text"
                      value={emergencyRelation}
                      onChange={(e) => setEmergencyRelation(e.target.value)}
                      placeholder="e.g. Father, Guardian, Friend"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Emergency Phone
                    </label>
                    <input
                      type="tel"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      placeholder="+91 98111 22334"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Dietary & Stay Preferences */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  Dietary &amp; Accommodation Preferences
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_OPTIONS.map((item) => {
                    const isSelected = dietaryPreferences.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleToggleDietary(item)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#16382B] text-white shadow-xs'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Destination Categories */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  Favorite Destination Themes
                </label>
                <div className="flex flex-wrap gap-2">
                  {PREFERRED_CATEGORY_OPTIONS.map((cat) => {
                    const isSelected = preferredCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleToggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#E0704D] text-white shadow-xs'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Save & Cancel Buttons */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-bold transition cursor-pointer"
                >
                  Cancel / Revert
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#E5A43B]" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          </div>

          {/* Side Shortcuts & Bookings Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Booking Dashboard Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#E6E2D8] space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#E0704D] block">
                  My Bookings
                </span>
                <span className="text-xs font-bold text-stone-500">
                  {bookings.length} Total
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold font-editorial text-stone-900">
                  Confirmed Stays Dashboard
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Manage simulated bookings, check cancellation policies, and print official travel vouchers.
                </p>
              </div>

              {upcomingBookings.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                  <span className="font-bold text-emerald-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    Next Upcoming Trip
                  </span>
                  <p className="font-bold text-emerald-950">
                    {upcomingBookings[0].accommodationName}
                  </p>
                  <p className="text-[11px] text-emerald-800">
                    {upcomingBookings[0].checkIn} • Ref: {upcomingBookings[0].bookingReference}
                  </p>
                </div>
              )}

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/bookings"
                  className="w-full py-2.5 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold transition text-center shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Open Bookings Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/book-demo"
                  className="w-full py-2.5 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white text-xs font-bold transition text-center shadow-xs flex items-center justify-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Book Another Demo Stay</span>
                </Link>
              </div>
            </div>

            {/* Quick Profile Stats */}
            <div className="p-6 rounded-3xl bg-white border border-[#E6E2D8] space-y-3 shadow-xs">
              <h3 className="text-xs uppercase font-bold tracking-wider text-stone-600">
                Explorer Analytics
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-400 font-bold block uppercase">
                    Bookings Made
                  </span>
                  <strong className="text-lg font-bold text-stone-900 block font-editorial">
                    {bookings.length}
                  </strong>
                  <span className="text-[10px] text-emerald-600 font-semibold">
                    {upcomingBookings.length} upcoming
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-400 font-bold block uppercase">
                    Trips Planned
                  </span>
                  <strong className="text-lg font-bold text-stone-900 block font-editorial">
                    {trips.length}
                  </strong>
                  <span className="text-[10px] text-stone-500">Active itineraries</span>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-400 font-bold block uppercase">
                    Saved Places
                  </span>
                  <strong className="text-lg font-bold text-stone-900 block font-editorial">
                    {savedDestinations.length}
                  </strong>
                  <span className="text-[10px] text-rose-600 font-semibold">In wishlist</span>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] text-stone-400 font-bold block uppercase">
                    WanderPoints
                  </span>
                  <strong className="text-lg font-bold text-[#E5A43B] block font-editorial">
                    1,450 XP
                  </strong>
                  <span className="text-[10px] text-stone-500">Gold tier</span>
                </div>
              </div>
            </div>

            {/* Registered Group Interests summary */}
            <div className="p-6 rounded-3xl bg-white border border-[#E6E2D8] space-y-3 shadow-xs">
              <h3 className="text-xs uppercase font-bold tracking-wider text-stone-600">
                Registered Group Trip Interests ({groupInterests.length})
              </h3>
              {groupInterests.length > 0 ? (
                <div className="space-y-2">
                  {groupInterests.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                    >
                      <strong className="text-stone-900 block truncate">{item.tripTitle}</strong>
                      <span className="text-[10px] text-stone-500">
                        Pax: {item.travelerCount} • {new Date(item.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-400">No group trips registered yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Embedded My Bookings Dashboard */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
            <div>
              <h2 className="text-2xl font-bold font-editorial text-stone-900">
                My Bookings Dashboard ({bookings.length})
              </h2>
              <p className="text-xs text-stone-500">
                Direct management of your simulated reservations, vouchers, and cancellation terms.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/bookings"
                className="px-4 py-2 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <span>Full Bookings Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/book-demo"
                className="px-4 py-2 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Book Stay</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">
                Total Stays
              </span>
              <strong className="text-2xl font-bold text-stone-900 font-editorial">
                {bookings.length}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs">
              <span className="text-[10px] text-emerald-700 font-bold uppercase block">
                Upcoming Trips
              </span>
              <strong className="text-2xl font-bold text-emerald-800 font-editorial">
                {upcomingBookings.length}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 shadow-xs">
              <span className="text-[10px] text-blue-700 font-bold uppercase block">
                Completed
              </span>
              <strong className="text-2xl font-bold text-blue-800 font-editorial">
                {completedBookings.length}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 shadow-xs">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">
                Total Spend (Demo)
              </span>
              <strong className="text-2xl font-bold text-[#16382B] font-editorial">
                ₹{totalSpent.toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Bookings List */}
          {bookings.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onViewDetails={(b) => {
                    setSelectedBooking(b);
                    setDetailModalOpen(true);
                  }}
                  onCancelRequest={(b) => {
                    setBookingToCancel(b);
                    setCancelModalOpen(true);
                  }}
                  onPrintRequest={(b) => setVoucherBooking(b)}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-[#E6E2D8] text-center space-y-3 max-w-md mx-auto">
              <CalendarCheck className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="text-base font-bold font-editorial text-stone-900">
                No bookings found
              </h3>
              <p className="text-xs text-stone-500">
                You don't have any simulated hotel or hostel bookings recorded yet.
              </p>
              <Link
                to="/book-demo"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#E0704D] text-white text-xs font-bold"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Demo Reservation</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Saved Destinations Wishlist */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div>
              <h2 className="text-2xl font-bold font-editorial text-stone-900">
                Saved Destinations Wishlist ({savedDestinations.length})
              </h2>
              <p className="text-xs text-stone-500">
                Destinations you have bookmarked for future college adventures.
              </p>
            </div>

            <Link
              to="/explore"
              className="text-xs font-bold text-[#16382B] hover:text-[#E0704D] flex items-center gap-1"
            >
              <span>Explore More Places</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {savedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="bg-white rounded-3xl border border-[#E6E2D8] overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-stone-100">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 text-white text-[10px] font-bold">
                      {dest.category}
                    </span>
                    <button
                      onClick={() => handleRemoveSaved(dest.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-rose-600 transition shadow-xs cursor-pointer"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-[#E0704D] font-semibold mb-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{dest.region}, {dest.country}</span>
                      </div>
                      <h3 className="text-lg font-bold font-editorial text-stone-900">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                        {dest.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase font-bold">
                          Daily Budget
                        </span>
                        <strong className="text-xs font-bold text-[#16382B]">
                          ₹{dest.estimatedDailyCost.toLocaleString()}/day
                        </strong>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Link
                          to={`/destinations/${dest.id}`}
                          className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/book-demo?dest=${dest.id}`}
                          className="px-3 py-1.5 rounded-lg bg-[#E0704D] hover:bg-[#cb5b38] text-white text-xs font-bold shadow-xs flex items-center gap-1"
                        >
                          <span>Book Stay</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-[#E6E2D8] text-center space-y-3 max-w-md mx-auto">
              <Heart className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="text-base font-bold font-editorial text-stone-900">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-stone-500">
                Explore destinations like Manali, Goa, or Amritsar and tap the heart icon to bookmark them here.
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16382B] text-white text-xs font-bold hover:bg-[#235441]"
              >
                <span>Browse Destinations</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: My Trips & Itineraries */}
      {activeTab === 'trips' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div>
              <h2 className="text-2xl font-bold font-editorial text-stone-900">
                My Trips &amp; Itineraries Overview ({trips.length})
              </h2>
              <p className="text-xs text-stone-500">
                Connected view of your custom day-by-day itineraries and associated demo reservations.
              </p>
            </div>

            <Link
              to="/trips/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white text-xs font-bold shadow-xs transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Itinerary</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trips.map((trip) => {
              const relatedBooking = bookings.find((b) => b.destinationId === trip.destinationId);
              return (
                <div
                  key={trip.id}
                  className="bg-white rounded-3xl border border-[#E6E2D8] p-6 space-y-4 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#E0704D] tracking-wider block">
                          {trip.destinationName}
                        </span>
                        <h3 className="text-lg font-bold font-editorial text-stone-900 mt-0.5">
                          {trip.title}
                        </h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 shrink-0">
                        {trip.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-bold block">
                          Dates
                        </span>
                        <strong>{trip.startDate} to {trip.endDate}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-bold block">
                          Travelers
                        </span>
                        <strong>{trip.travelerCount} Travelers</strong>
                      </div>
                    </div>

                    {relatedBooking ? (
                      <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                        <div>
                          <span className="font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            Associated Booking:
                          </span>
                          <span className="text-[11px] text-emerald-900">
                            {relatedBooking.accommodationName} ({relatedBooking.bookingReference})
                          </span>
                        </div>
                        <Link
                          to={`/bookings/${relatedBooking.id}`}
                          className="text-[11px] font-bold text-emerald-800 underline"
                        >
                          View Stay
                        </Link>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
                        <span>No accommodation reserved yet for this trip.</span>
                        <Link
                          to={`/book-demo?dest=${trip.destinationId}`}
                          className="text-[11px] font-bold text-[#16382B] underline"
                        >
                          Book Stay
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700">
                      {trip.days.length} Days Blueprint
                    </span>
                    <Link
                      to={`/trips/${trip.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#16382B] hover:text-[#E0704D]"
                    >
                      <span>Open Schedule</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: Settings & Account Controls */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-3xl">
          <div className="space-y-1 pb-2 border-b border-stone-200">
            <h2 className="text-2xl font-bold font-editorial text-stone-900">
              Account Settings &amp; Preferences
            </h2>
            <p className="text-xs text-stone-500">
              Configure currency, notification channels, data exports, or reset presentation data.
            </p>
          </div>

          {/* Preferences Card */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 font-editorial flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#16382B]" />
              Regional &amp; Currency Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Preferred Currency
                </label>
                <select
                  value={preferredCurrency}
                  onChange={(e) => setPreferredCurrency(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none bg-stone-50/50"
                >
                  <option value="INR">₹ INR (Indian Rupee)</option>
                  <option value="USD">$ USD (US Dollar)</option>
                  <option value="EUR">€ EUR (Euro)</option>
                  <option value="GBP">£ GBP (British Pound)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Timezone
                </label>
                <input
                  type="text"
                  disabled
                  value="Asia/Kolkata (IST +05:30)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 font-medium bg-stone-100 text-stone-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Data Export Card */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 font-editorial flex items-center gap-2">
              <Download className="w-4 h-4 text-[#16382B]" />
              Data Portability
            </h3>
            <p className="text-xs text-stone-500">
              Download your complete profile data, booked reservations, and custom trip itineraries as a standardized JSON document.
            </p>
            <button
              onClick={handleExportData}
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition flex items-center gap-2 cursor-pointer border border-stone-300"
            >
              <Download className="w-4 h-4 text-stone-600" />
              <span>Export Complete Travel Data (JSON)</span>
            </button>
          </div>

          {/* Demo Reset Card */}
          <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-300 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-700" />
              <h3 className="text-base font-bold text-amber-950 font-editorial">
                Reset Demo Dataset to Baseline State
              </h3>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              This will restore the 3 initial sample bookings (1 upcoming in Manali, 1 completed in Amritsar, 1 cancelled in Rishikesh), reload the seed Manali squad trip, and reset your saved wishlist.
            </p>
            <button
              onClick={handleResetData}
              className="px-5 py-2.5 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#E5A43B]" />
              <span>Reset Demo State Now</span>
            </button>
          </div>

          {/* Session Management Card */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 font-editorial">
              Session Management
            </h3>
            <p className="text-xs text-stone-500">
              Sign out of your active session and return to guest browsing mode.
            </p>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-700 text-xs font-bold transition flex items-center gap-2 cursor-pointer border border-stone-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Wanderflow</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
