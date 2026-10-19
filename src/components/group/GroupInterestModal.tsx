import React, { useState } from 'react';
import { GroupTrip } from '../../types';
import { StorageService } from '../../lib/storage';
import { useAuth } from '../../context/AuthContext';
import {
  Users2,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

interface GroupInterestModalProps {
  trip: GroupTrip;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const GroupInterestModal: React.FC<GroupInterestModalProps> = ({
  trip,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [userName, setUserName] = useState(user?.fullName || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [collegeOrCity, setCollegeOrCity] = useState(
    user?.college || 'Wanderflow Explorers Club'
  );
  const [travelerCount, setTravelerCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail) return;

    StorageService.registerGroupInterest({
      tripId: trip.id,
      tripTitle: trip.title,
      userName,
      userEmail,
      collegeOrCity,
      travelerCount,
      notes,
    });

    setSubmitted(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E0704D] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Community Expedition
            </span>
            <h3 className="text-xl font-bold text-stone-900 font-editorial mt-0.5">
              Express Interest in {trip.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Safety & Community Notice */}
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-950">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Community Expedition Notice</span>
          </div>
          <p className="leading-relaxed">
            This records your interest for the expedition squad. We safeguard personal contact details and do not charge upfront booking fees until trip batch sizes are verified.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-stone-900 font-editorial">
              Interest Registered!
            </h4>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Your submission for <strong>{trip.title}</strong> has been saved to your local profile storage.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  placeholder="Aarav Sharma"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50/50 focus:bg-white focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  placeholder="aarav@wanderflow.app"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50/50 focus:bg-white focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Hometown or Community
                </label>
                <input
                  type="text"
                  value={collegeOrCity}
                  onChange={(e) => setCollegeOrCity(e.target.value)}
                  placeholder="e.g. Mumbai, Bangalore, or Club"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50/50 focus:bg-white focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Number of Friends (Pax)
                </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={travelerCount}
                  onChange={(e) => setTravelerCount(Number(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50/50 focus:bg-white focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Travel Style &amp; Vibes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Excited about stargazing, comfortable with dormitory stays, bringing a guitar!"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50/50 focus:bg-white focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              ></textarea>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#16382B] hover:bg-[#235441] text-white shadow-xs transition"
              >
                Submit Interest
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
