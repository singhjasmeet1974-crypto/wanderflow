import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../lib/storage';
import { DESTINATIONS } from '../data/destinations';
import { getAccommodationsForDestination } from '../data/accommodations';
import {
  calculateBookingPrice,
  validateBookingDates,
  generateBookingReference,
} from '../lib/booking';
import { Booking, Accommodation, RoomType } from '../types';

import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Star,
  User,
  Mail,
  Phone,
  Home,
} from 'lucide-react';

export const DemoBookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  // Search parameters for preselection
  const initialDestId = searchParams.get('dest') || 'manali';
  const initialAccId = searchParams.get('acc') || '';

  // Step state (1 to 5, and 6 for Confirmation screen)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Destination & Accommodation
  const [selectedDestId, setSelectedDestId] = useState<string>(initialDestId);
  const destination = useMemo(() => {
    return DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];
  }, [selectedDestId]);

  const accommodations = useMemo(() => {
    return getAccommodationsForDestination(selectedDestId);
  }, [selectedDestId]);

  const [selectedAcc, setSelectedAcc] = useState<Accommodation>(() => {
    if (initialAccId) {
      const found = accommodations.find((a) => a.id === initialAccId);
      if (found) return found;
    }
    return accommodations[0];
  });

  // Keep selectedAcc synchronized if destination changes
  useEffect(() => {
    const list = getAccommodationsForDestination(selectedDestId);
    if (!list.some((a) => a.id === selectedAcc.id)) {
      setSelectedAcc(list[0]);
    }
  }, [selectedDestId, selectedAcc.id]);

  // Step 2: Dates, Room, and Guests
  // Default dates: next week
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const weekAfter = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000);
  const defaultCheckIn = nextWeek.toISOString().split('T')[0];
  const defaultCheckOut = weekAfter.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(defaultCheckIn);
  const [checkOut, setCheckOut] = useState<string>(defaultCheckOut);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(1);
  const [selectedRoomTypeName, setSelectedRoomTypeName] = useState<string>(
    selectedAcc.roomTypes[0]?.name || 'Standard Explorer Room'
  );
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Update room type when accommodation changes
  useEffect(() => {
    if (selectedAcc.roomTypes.length > 0) {
      setSelectedRoomTypeName(selectedAcc.roomTypes[0].name);
    }
  }, [selectedAcc]);

  // Step 4: Guest Details (prefilled from profile)
  const [fullName, setFullName] = useState<string>(user?.fullName || 'Aarav Sharma');
  const [email, setEmail] = useState<string>(user?.email || 'aarav.sharma@wanderflow.app');
  const [phone, setPhone] = useState<string>(user?.phone || '+91 98765 43210');

  // Completed booking receipt state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Errors state
  const [dateError, setDateError] = useState<string | null>(null);

  // Dynamic price calculation
  const selectedRoomType = selectedAcc.roomTypes.find((r: RoomType) => r.name === selectedRoomTypeName);
  const nightlyRate = selectedRoomType ? selectedRoomType.pricePerNight : selectedAcc.pricePerNight;


  const dateValidation = validateBookingDates(checkIn, checkOut);
  const priceBreakdown = calculateBookingPrice(nightlyRate, checkIn, checkOut, rooms);

  // Step validation
  const validateStep2 = (): boolean => {
    if (!dateValidation.isValid) {
      setDateError(dateValidation.error || 'Please enter valid check-in and check-out dates.');
      return false;
    }
    setDateError(null);
    return true;
  };

  const validateStep4 = (): boolean => {
    if (!fullName.trim() || !email.trim()) {
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 2) {
      if (!validateStep2()) return;
    }
    if (currentStep === 4) {
      if (!validateStep4()) return;
    }
    setCurrentStep((prev) => Math.min(5, prev + 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Final confirmation
  const handleConfirmBooking = () => {
    const reference = generateBookingReference();
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      bookingReference: reference,
      userId: user?.id || 'demo-user-01',
      destinationId: destination.id,
      destinationName: destination.name,
      destinationLocation: `${destination.region}, ${destination.country}`,
      destinationImage: destination.imageUrl,
      accommodationId: selectedAcc.id,
      accommodationName: selectedAcc.name,
      accommodationImage: selectedAcc.imageUrl,
      roomType: selectedRoomTypeName,
      checkIn,
      checkOut,
      nights: dateValidation.nights,
      guests: { adults, children },
      rooms,
      guestDetails: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        specialRequests: specialRequests.trim() || undefined,
      },
      priceBreakdown,
      currency: 'INR',
      status: 'Confirmed',
      bookingType: 'demo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    StorageService.saveBooking(newBooking);
    setConfirmedBooking(newBooking);
    setCurrentStep(6); // Step 6 = Confirmation receipt screen
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xs text-stone-500 hover:text-[#16382B] flex items-center gap-1 font-medium"
            title="Go to main default page"
          >
            <Home className="w-3.5 h-3.5 text-[#E5A43B]" />
            <span>Home</span>
          </Link>
          <span className="text-stone-300">•</span>
          <Link
            to="/bookings"
            className="text-xs text-stone-500 hover:text-[#16382B] flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>My Bookings</span>
          </Link>
          <span className="text-stone-300">•</span>
          <span className="text-xs text-stone-500">Interactive Demo Reservation</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-editorial">
              Book Demo Trip
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Simulate reserving a boutique stay or mountain hostel on Wanderflow with real-time pricing and persistent storage.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-900 text-xs font-semibold shrink-0">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>Demo Mode — No Real Payment</span>
          </div>
        </div>
      </div>

      {/* 5-Step Progress Stepper (Only visible during steps 1-5) */}
      {currentStep <= 5 && (
        <div className="bg-white rounded-2xl border border-[#E6E2D8] p-4 shadow-xs">
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {[
              { num: 1, title: 'Destination & Stay' },
              { num: 2, title: 'Dates & Guests' },
              { num: 3, title: 'Price Summary' },
              { num: 4, title: 'Guest Details' },
              { num: 5, title: 'Confirm' },
            ].map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div key={step.num} className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition mb-1 ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-[#16382B] text-[#E5A43B] ring-2 ring-[#E5A43B]'
                        : 'bg-stone-100 text-stone-400'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-semibold truncate max-w-[60px] sm:max-w-none ${
                      isCurrent ? 'text-[#16382B] font-bold' : isPast ? 'text-emerald-700' : 'text-stone-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 1: Select Destination & Accommodation */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-editorial text-stone-900">
              Step 1: Choose Your Destination &amp; Lodging
            </h2>
            <p className="text-xs text-stone-500">
              Select one of our 12 curated Wanderflow destinations, then pick an accommodation.
            </p>
          </div>

          {/* Destination Selector Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              Destination Location
            </label>
            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm font-semibold focus:ring-2 focus:ring-[#16382B] focus:outline-none bg-stone-50/50"
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.region}, {d.country} ({d.category})
                </option>
              ))}
            </select>
          </div>

          {/* Accommodation Cards List */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-stone-700 block">
              Available Stays in {destination.name}
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accommodations.map((acc) => {
                const isSelected = selectedAcc.id === acc.id;
                return (
                  <div
                    key={acc.id}
                    onClick={() => setSelectedAcc(acc)}
                    className={`rounded-2xl border p-4 transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#16382B] ring-2 ring-[#16382B] bg-[#16382B]/5 shadow-sm'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="relative h-32 rounded-xl overflow-hidden bg-stone-100">
                        <img
                          src={acc.imageUrl}
                          alt={acc.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-bold">
                          {acc.type}
                        </span>
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-white/90 text-stone-900 text-[10px] font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 text-[#E5A43B] fill-current" />
                          {acc.rating} ({acc.reviewCount})
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm text-stone-900 font-editorial">
                          {acc.name}
                        </h3>
                        <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                          {acc.description}
                        </p>
                      </div>

                      {/* Amenities pills */}
                      <div className="flex flex-wrap gap-1">
                        {acc.amenities.slice(0, 3).map((amenity, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-medium"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-3">
                      <div>
                        <span className="text-[10px] text-stone-400 block">From</span>
                        <strong className="text-sm font-bold text-[#16382B]">
                          ₹{acc.pricePerNight.toLocaleString()}{' '}
                          <span className="text-[10px] font-normal text-stone-500">/ night</span>
                        </strong>
                      </div>

                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-lg ${
                          isSelected
                            ? 'bg-[#16382B] text-white'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select Stay'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Dates &amp; Guests</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Dates, Room Type & Guests */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-editorial text-stone-900">
              Step 2: Dates, Guests &amp; Room Selection
            </h2>
            <p className="text-xs text-stone-500">
              Set your itinerary schedule for <strong className="text-stone-800">{selectedAcc.name}</strong>.
            </p>
          </div>

          {dateError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
              {dateError}
            </div>
          )}

          {/* Date Range Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 block">
                Check-In Date *
              </label>
              <input
                type="date"
                value={checkIn}
                min={today.toISOString().split('T')[0]}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  setDateError(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 block">
                Check-Out Date *
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || today.toISOString().split('T')[0]}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                  setDateError(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              />
            </div>
          </div>

          {dateValidation.isValid && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
              <span>Duration of stay:</span>
              <strong>{dateValidation.nights} {dateValidation.nights === 1 ? 'Night' : 'Nights'}</strong>
            </div>
          )}

          {/* Room Type Options */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              Room Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedAcc.roomTypes.map((room: RoomType) => {
                const isSelected = selectedRoomTypeName === room.name;
                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoomTypeName(room.name)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'border-[#16382B] ring-2 ring-[#16382B] bg-[#16382B]/5'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-stone-900">{room.name}</span>
                      <strong className="text-xs text-[#16382B]">
                        ₹{room.pricePerNight.toLocaleString()}/night
                      </strong>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                      {room.description}
                    </p>
                    <span className="inline-block mt-1 text-[10px] text-stone-400">
                      Up to {room.maxGuests} guest(s)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guests & Rooms Counters */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">Adults (12+)</label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">Children (0-11)</label>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              >
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Child' : 'Children'}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">Rooms</label>
              <select
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Room' : 'Rooms'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              Special Requests or Group Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Late night Volvo bus arrival, mountain view floor, early check-in inquiry..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#16382B] focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 transition cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Price Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Price Summary & Live Calculations */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-editorial text-stone-900">
              Step 3: Calculated Price &amp; Stay Breakdown
            </h2>
            <p className="text-xs text-stone-500">
              Review your simulated quote before entering guest credentials.
            </p>
          </div>

          {/* Stay Overview Card */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row gap-4 items-center">
            <img
              src={selectedAcc.imageUrl}
              alt={selectedAcc.name}
              className="w-full sm:w-28 h-24 rounded-xl object-cover shrink-0"
            />
            <div className="space-y-1 w-full text-xs">
              <span className="text-[10px] uppercase font-bold text-[#E0704D] block">
                {destination.name} • {destination.region}
              </span>
              <h3 className="text-base font-bold text-stone-900 font-editorial">
                {selectedAcc.name}
              </h3>
              <p className="text-stone-600">
                {selectedRoomTypeName} • {priceBreakdown.nights} Nights • {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
              </p>
              <p className="text-stone-500">
                {checkIn} to {checkOut} ({adults} Adults{children > 0 ? `, ${children} Children` : ''})
              </p>
            </div>
          </div>

          {/* Transparent Ledger */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-stone-600">
              Itemized Quote Ledger
            </h4>

            <div className="space-y-2 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>
                  Nightly Lodging Rate (₹{priceBreakdown.nightlyRate.toLocaleString()} × {priceBreakdown.nights}N × {priceBreakdown.rooms}R)
                </span>
                <span className="font-semibold text-stone-900">
                  ₹{priceBreakdown.baseAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Demo Hospitality GST &amp; Platform Service Fee (12%)</span>
                <span className="font-semibold text-stone-900">
                  ₹{priceBreakdown.taxesAndFees.toLocaleString()}
                </span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between text-base sm:text-lg font-bold text-stone-900 font-editorial">
                <span>Estimated Total Demo Cost</span>
                <span className="text-[#16382B]">
                  ₹{priceBreakdown.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
              * Note: All prices, taxes, and fees are simulated demonstration estimates. No real charge or credit card transaction will occur.
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 transition cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Guest Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Guest Details */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-editorial text-stone-900">
              Step 4: Primary Guest Contact Information
            </h2>
            <p className="text-xs text-stone-500">
              Prefilled from your Wanderflow profile. You may modify details for this demo booking.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 block">
                Primary Traveler Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="e.g. Aarav Sharma"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 block">
                Confirmation Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. traveler@wanderflow.app"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 block">
                Contact Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 transition cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Final Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Final Confirmation Screen */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-150">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-editorial text-stone-900">
              Step 5: Final Review &amp; Confirm Demo Reservation
            </h2>
            <p className="text-xs text-stone-500">
              Please double check your dates and accommodation before generating the confirmation code.
            </p>
          </div>

          {/* Prominent Demo Warning Banner */}
          <div className="p-4 rounded-2xl bg-amber-500 text-[#0F261D] space-y-1 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 text-[#0F261D]" />
              <span>DEMO BOOKING — NOT A REAL RESERVATION</span>
            </div>
            <p className="text-xs text-[#0F261D]/90 leading-relaxed">
              This reservation is completely simulated for testing and evaluation purposes. No real payment is taken, and no real hotel, flight, or travel provider is contacted.
            </p>
          </div>

          {/* Reservation Summary Card */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-2 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#E0704D] block">
                  {destination.name}
                </span>
                <h3 className="text-lg font-bold text-stone-900 font-editorial">
                  {selectedAcc.name}
                </h3>
                <p className="text-xs text-stone-600">{selectedRoomTypeName}</p>
              </div>

              <div className="sm:text-right">
                <span className="text-[10px] text-stone-400 block uppercase font-bold">
                  Total Demo Price
                </span>
                <span className="text-xl font-extrabold text-[#16382B] font-editorial">
                  ₹{priceBreakdown.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-stone-400 block">Check-In:</span>
                <strong className="text-stone-800">{checkIn}</strong>
              </div>
              <div>
                <span className="text-stone-400 block">Check-Out:</span>
                <strong className="text-stone-800">{checkOut}</strong>
              </div>
              <div>
                <span className="text-stone-400 block">Duration:</span>
                <strong className="text-stone-800">{dateValidation.nights} Nights</strong>
              </div>
              <div>
                <span className="text-stone-400 block">Guests &amp; Rooms:</span>
                <strong className="text-stone-800">{adults} Adults • {rooms} Room</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 text-xs">
              <span className="text-stone-400 block">Booked under:</span>
              <strong className="text-stone-900">{fullName} ({email})</strong>
              {phone && <span className="text-stone-500"> • {phone}</span>}
            </div>

            {specialRequests && (
              <div className="pt-2 border-t border-stone-200 text-xs">
                <span className="text-stone-400 block">Requests:</span>
                <p className="italic text-stone-700">"{specialRequests}"</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 transition cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleConfirmBooking}
              className="px-7 py-3 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs sm:text-sm font-bold shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#E5A43B]" />
              <span>Confirm Demo Booking</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Confirmation Receipt Screen */}
      {currentStep === 6 && confirmedBooking && (
        <div className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-10 space-y-8 shadow-xl animate-in zoom-in-95 duration-200 text-center">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
              Confirmed — Demo Reservation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-editorial">
              Your Demo Booking is Confirmed!
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
              Your simulated trip has been saved in persistent storage and is immediately available in your <strong className="text-stone-900">My Bookings</strong> dashboard.
            </p>
          </div>

          {/* Reference Badge Card */}
          <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-stone-200 max-w-md mx-auto space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Official Demo Booking Reference
            </span>
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#16382B] bg-white px-4 py-2 rounded-xl border border-stone-300 inline-block">
              {confirmedBooking.bookingReference}
            </span>
            <p className="text-[11px] text-stone-500">
              {confirmedBooking.accommodationName} • {confirmedBooking.nights} Nights
            </p>
            <p className="text-xs font-bold text-[#16382B]">
              Total Demo Amount: ₹{confirmedBooking.priceBreakdown.totalAmount.toLocaleString()}
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/bookings"
              className="px-6 py-3 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-2"
            >
              <span>View in My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={`/bookings/${confirmedBooking.id}`}
              className="px-5 py-3 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs sm:text-sm font-semibold transition flex items-center gap-2"
            >
              <span>View Booking Voucher</span>
            </Link>

            <Link
              to="/explore"
              className="px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-semibold transition"
            >
              Continue Exploring
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
