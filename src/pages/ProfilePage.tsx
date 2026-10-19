import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../lib/storage';
import { DestinationService } from '../lib/destinationService';
import { TravelStyle, GroupTripInterest, Booking, Trip } from '../types';
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
} from 'lucide-react';

const PRESET_AVATARS = [
  {
    name: 'Aarav (Default)',
    url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Simran (Backpacker)',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Kabir (Trekker)',
    url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Ananya (Photographer)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Rohan (Roadtripper)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
];

const PREFERRED_CATEGORY_OPTIONS = [
  'Mountains',
  'Beaches',
  'Heritage',
  'Nature',
  'Adventure',
  'City Escapes',
];

export const ProfilePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const { user, updateProfile, logout, resetDemoData, isDemoMode } = useAuth();
  const navigate = useNavigate();

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'overview' | 'saved' | 'trips' | 'settings'>(
    initialTab === 'saved' ? 'saved' : initialTab === 'settings' ? 'settings' : 'overview'
  );

  // Form Fields
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [college, setCollege] = useState(user?.college || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [cityOrCountry, setCityOrCountry] = useState(user?.cityOrCountry || '');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(user?.travelStyle || 'Student Group');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || PRESET_AVATARS[0].url);
  const [customAvatarInput, setCustomAvatarInput] = useState('');
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);

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

  useEffect(() => {
    setSavedDestinationIds(StorageService.getSavedDestinations());
    setBookings(StorageService.getBookings());
    setTrips(StorageService.getTrips());
    setGroupInterests(StorageService.getGroupInterests());
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
    }
  }, [user]);

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
    ];
    checks.forEach((c) => {
      if (c) score += 12.5;
    });
    return Math.round(score);
  }, [fullName, email, avatarUrl, college, bio, phone, cityOrCountry, preferredCategories]);

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
    });
    setToastMessage('Profile changes saved successfully!');
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
    }
    setToastMessage('Edits reverted to saved profile.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleCategory = (cat: string) => {
    if (preferredCategories.includes(cat)) {
      setPreferredCategories(preferredCategories.filter((c) => c !== cat));
    } else {
      setPreferredCategories([...preferredCategories, cat]);
    }
  };

  const handleRemoveSaved = (destId: string) => {
    StorageService.toggleSaveDestination(destId);
    setSavedDestinationIds(StorageService.getSavedDestinations());
    setToastMessage('Destination removed from saved bookmarks.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo trips, sample bookings, and profile data to initial evaluation state?')) {
      resetDemoData();
      setSavedDestinationIds(StorageService.getSavedDestinations());
      setBookings(StorageService.getBookings());
      setTrips(StorageService.getTrips());
      setGroupInterests([]);
      setToastMessage('All demo datasets have been reset to factory state!');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const savedDestinations = DestinationService.getAllDestinations().filter((d) =>
    savedDestinationIds.includes(d.id)
  );

  const upcomingBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#16382B] text-white text-xs font-semibold shadow-xl flex items-center gap-2 border border-white/20 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-[#E5A43B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Profile Hero Card */}
      <div className="bg-gradient-to-br from-[#16382B] via-[#1B4334] to-[#0F261D] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            {/* Avatar with Change Button */}
            <div className="relative shrink-0">
              <img
                src={avatarUrl}
                alt={user?.fullName || 'Traveler'}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#E5A43B] shadow-md"
              />
              <button
                type="button"
                onClick={() => setAvatarPickerOpen(!avatarPickerOpen)}
                className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white shadow-md transition cursor-pointer"
                title="Change Avatar"
                aria-label="Change avatar photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* User Meta */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-4xl font-extrabold font-editorial text-white">
                  {fullName || 'Explorer Profile'}
                </h1>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#E5A43B] text-[#0F261D] font-extrabold">
                  {isDemoMode ? 'Demo Traveler' : 'Supabase Authenticated'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 flex items-center gap-2 flex-wrap">
                <span>{email}</span>
                {cityOrCountry && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-stone-200">
                      <MapPin className="w-3 h-3 text-[#E0704D]" />
                      {cityOrCountry}
                    </span>
                  </>
                )}
              </p>

              <p className="text-xs text-stone-400">
                Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '2026'}
                {' • '}College: <strong className="text-stone-200">{college || 'Explorer Club'}</strong>
              </p>
            </div>
          </div>

          {/* Quick Shortcuts: Link to Bookings & Itineraries */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              to="/bookings"
              className="px-4 py-2.5 rounded-xl bg-[#E0704D] hover:bg-[#cb5b38] text-white text-xs font-bold shadow-md transition flex items-center gap-2"
            >
              <CalendarDays className="w-4 h-4" />
              <span>My Bookings ({bookings.length})</span>
            </Link>

            <Link
              to="/trips"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition flex items-center gap-1.5"
            >
              <span>My Trips ({trips.length})</span>
            </Link>
          </div>
        </div>

        {/* Profile Completion Meter */}
        <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 w-full max-w-md">
            <div className="space-y-1 w-full">
              <div className="flex justify-between text-[11px]">
                <span className="text-stone-300 font-medium">Profile Completion</span>
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

          <div className="text-[11px] text-stone-300">
            Travel Style Persona: <strong className="text-white">{travelStyle}</strong>
          </div>
        </div>

        {/* Avatar Picker Dropdown Modal */}
        {avatarPickerOpen && (
          <div className="relative z-20 mt-4 p-4 rounded-2xl bg-white text-stone-900 border border-stone-200 shadow-xl space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800">
                Choose an Avatar Preset or Paste Custom Photo URL
              </span>
              <button
                type="button"
                onClick={() => setAvatarPickerOpen(false)}
                className="text-xs text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {PRESET_AVATARS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setAvatarUrl(preset.url);
                    setAvatarPickerOpen(false);
                  }}
                  className={`flex flex-col items-center gap-1 p-1.5 rounded-xl border shrink-0 transition cursor-pointer ${
                    avatarUrl === preset.url
                      ? 'border-[#16382B] ring-2 ring-[#16382B] bg-stone-50'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span className="text-[9px] font-semibold text-stone-600 truncate max-w-[60px]">
                    {preset.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
              <input
                type="url"
                value={customAvatarInput}
                onChange={(e) => setCustomAvatarInput(e.target.value)}
                placeholder="Or paste custom image URL..."
                className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-[#16382B]"
              />
              <button
                type="button"
                onClick={() => {
                  if (customAvatarInput.trim()) {
                    setAvatarUrl(customAvatarInput.trim());
                    setCustomAvatarInput('');
                    setAvatarPickerOpen(false);
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-[#16382B] text-white text-xs font-semibold cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Section Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        {[
          { id: 'overview', label: 'Edit Profile & Details' },
          { id: 'saved', label: `Saved Wishlist (${savedDestinations.length})` },
          { id: 'trips', label: `My Trips & Bookings (${bookings.length})` },
          { id: 'settings', label: 'Demo Controls' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
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
              className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-5 shadow-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h2 className="text-lg font-bold font-editorial text-stone-900">
                  Personal &amp; Contact Details
                </h2>
                <span className="text-[11px] text-stone-400">
                  Updates persist immediately in storage
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#16382B] focus:outline-none bg-stone-50/50"
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

              {/* Preferred Destination Categories */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  Preferred Destination Themes
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
                            ? 'bg-[#16382B] text-white shadow-xs'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Buttons: Save & Cancel */}
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
                  Manage simulated bookings, check cancellation terms, and access print-ready PDF vouchers.
                </p>
              </div>

              {upcomingBookings.length > 0 && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                  <span className="font-bold text-emerald-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    Next Upcoming Trip
                  </span>
                  <p className="font-semibold text-emerald-950">
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

      {/* TAB 2: Saved Destinations Wishlist */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
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
                          <span>Book Demo</span>
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
                Explore destinations like Manali, Goa, or Amritsar and tap the heart icon to save them here.
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

      {/* TAB 3: My Trips & Bookings Integration */}
      {activeTab === 'trips' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold font-editorial text-stone-900">
                My Trips &amp; Itineraries Overview
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
              // Find matching booking for this destination
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

                    {/* Associated Booking Notice */}
                    {relatedBooking ? (
                      <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                        <div>
                          <span className="font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            Associated Demo Booking:
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
                          Book Demo Stay
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
                      <span>Open Daily Schedule</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Demo Presentation Controls */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-editorial text-stone-900">
              Demo Evaluation &amp; Presentation Controls
            </h2>
            <p className="text-xs text-stone-500">
              Tools to reset sample records or manage testing states during academic viva evaluation.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-300 space-y-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-700" />
              <h3 className="text-base font-bold text-amber-950 font-editorial">
                Reset Demo Dataset to Factory Baseline
              </h3>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              This will restore the 3 initial sample bookings (1 upcoming in Manali, 1 completed in Amritsar, 1 cancelled in Rishikesh), reload the seed Manali squad trip, and reset bookmarks.
            </p>
            <button
              onClick={handleResetData}
              className="px-5 py-2.5 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#E5A43B]" />
              <span>Reset Demo State Now</span>
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 space-y-3">
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
