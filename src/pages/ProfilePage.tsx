import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../lib/storage';
import { DESTINATIONS } from '../data/destinations';
import { TravelStyle, GroupTripInterest } from '../types';
import {
  User,
  Mail,
  GraduationCap,
  Heart,
  Calendar,
  LogOut,
  RotateCcw,
  CheckCircle2,
  Trash2,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout, resetDemoData, isDemoMode } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [college, setCollege] = useState(user?.college || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(user?.travelStyle || 'Student Group');
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>([]);
  const [groupInterests, setGroupInterests] = useState<GroupTripInterest[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setSavedDestinationIds(StorageService.getSavedDestinations());
    setGroupInterests(StorageService.getGroupInterests());
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, college, bio, travelStyle });
    setToastMessage('Profile settings updated successfully!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRemoveSaved = (destId: string) => {
    StorageService.toggleSaveDestination(destId);
    setSavedDestinationIds(StorageService.getSavedDestinations());
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo trips and saved destinations back to initial evaluation state?')) {
      resetDemoData();
      setSavedDestinationIds(StorageService.getSavedDestinations());
      setGroupInterests([]);
      setToastMessage('Demo dataset reset to factory state!');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const savedDestinations = DESTINATIONS.filter((d) =>
    savedDestinationIds.includes(d.id)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#16382B] text-white text-xs font-semibold shadow-xl flex items-center gap-2 border border-white/20 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-[#E5A43B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-editorial">
          Profile &amp; Settings
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Manage your travel persona, saved bookmarks, and evaluation data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Profile Form */}
        <div className="lg:col-span-7 space-y-6">
          <form
            onSubmit={handleSaveProfile}
            className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-5 shadow-xs"
          >
            <div className="flex items-center gap-4 pb-4 border-b border-stone-100">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                alt={user?.fullName || 'Traveler'}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#16382B]"
              />
              <div>
                <span className="font-bold text-base text-stone-900 block font-editorial">
                  {user?.fullName}
                </span>
                <span className="text-xs text-stone-500">{user?.email}</span>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  {isDemoMode ? 'Local Demo Mode' : 'Supabase Authenticated'}
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Full Display Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                College or University
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Travel Style Persona
              </label>
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value as TravelStyle)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              >
                <option value="Student Group">Student Group</option>
                <option value="Budget Backpacker">Budget Backpacker</option>
                <option value="Balanced Explorer">Balanced Explorer</option>
                <option value="Scenic & Relaxed">Scenic &amp; Relaxed</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Bio / Travel Motto
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              Save Profile Changes
            </button>
          </form>

          {/* Group Trip Submissions */}
          <div className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-base font-bold font-editorial text-stone-900">
              Registered Group Trip Interests ({groupInterests.length})
            </h3>
            {groupInterests.length > 0 ? (
              <div className="space-y-2.5">
                {groupInterests.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">{item.tripTitle}</span>
                      <span className="text-[10px] text-stone-400">
                        {new Date(item.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-stone-500">
                      Pax: {item.travelerCount} • College: {item.collegeOrCity}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500">
                You haven't registered interest for any group trips yet.
              </p>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Saved Bookmarks & Reset Data */}
        <div className="lg:col-span-5 space-y-6">
          {/* Saved Bookmarks */}
          <div className="bg-white rounded-3xl border border-[#E6E2D8] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-editorial text-stone-900 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Saved Bookmarks ({savedDestinations.length})</span>
              </h3>
            </div>

            {savedDestinations.length > 0 ? (
              <div className="space-y-2.5">
                {savedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                  >
                    <Link
                      to={`/destinations/${dest.id}`}
                      className="flex items-center gap-2.5 hover:text-[#16382B] min-w-0"
                    >
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        className="w-9 h-9 rounded-lg object-cover shrink-0"
                      />
                      <div className="truncate">
                        <span className="font-bold text-stone-900 block truncate">
                          {dest.name}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          {dest.category} • ₹{dest.estimatedDailyCost}/d
                        </span>
                      </div>
                    </Link>

                    <button
                      onClick={() => handleRemoveSaved(dest.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500">No saved destinations.</p>
            )}
          </div>

          {/* Reset Demo Presentation Data */}
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-amber-700" />
              Demo Presentation Controls
            </h4>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              If evaluating during college viva or demo presentation, reset all trips and user state back to fresh defaults.
            </p>
            <button
              onClick={handleResetData}
              className="w-full py-2.5 rounded-xl bg-[#235441] hover:bg-[#16382B] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#E5A43B]" />
              <span>Reset Demo State</span>
            </button>
          </div>

          {/* Sign Out */}
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full py-3 rounded-2xl bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-700 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border border-stone-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Wanderflow</span>
          </button>
        </div>
      </div>
    </div>
  );
};
