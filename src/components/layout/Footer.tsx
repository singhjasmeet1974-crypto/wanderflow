import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, GraduationCap, MapPin, Shield, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F261D] text-stone-300 border-t border-[#1B4332] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#235441] text-[#F3EFE6] flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#E5A43B]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-stone-100 font-editorial">
                Wanderflow
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Explore More. Plan Better. Travel Together. A unified travel discovery and personalized day-by-day itinerary platform designed for student explorers, friends, and solo backpackers.
            </p>

            <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800 flex items-start gap-3 text-xs text-stone-300">
              <GraduationCap className="w-5 h-5 text-[#E5A43B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">College Training Project</strong>
                <span>Bachelor of Technology in Information Technology</span>
                <span className="block text-stone-400">Guru Nanak Dev Engineering College (GNDEC), Ludhiana</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#E5A43B] font-bold">
              Discovery
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/explore?category=Mountains" className="hover:text-white transition">
                  Mountain Escapes
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Heritage" className="hover:text-white transition">
                  Heritage &amp; Culture
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Beaches" className="hover:text-white transition">
                  Coastal &amp; Beaches
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Adventure" className="hover:text-white transition">
                  Adventure Expeditions
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-white transition text-[#E0704D] flex items-center gap-1">
                  All 12+ Destinations <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#E5A43B] font-bold">
              Travel Planning
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/guides" className="hover:text-white transition">
                  Editorial Travel Guides
                </Link>
              </li>
              <li>
                <Link to="/group-trips" className="hover:text-white transition">
                  Gen-Z Group Trips Hub
                </Link>
              </li>
              <li>
                <Link to="/trips" className="hover:text-white transition">
                  Day-by-Day Itinerary Editor
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  Traveler Dashboard
                </Link>
              </li>
              <li>
                <Link to="/guides/how-to-plan-a-budget-trip" className="hover:text-white transition">
                  Student Budget Tactics
                </Link>
              </li>
            </ul>
          </div>

          {/* Responsible Disclosure */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#E5A43B] font-bold">
              Integrations &amp; Policy
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Wanderflow is a planning companion. Booking redirects open official providers (Booking.com, MakeMyTrip, Skyscanner). Wanderflow never charges cards or guarantees booking holds.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-stone-400 pt-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Free Open-Meteo Weather APIs</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; 2026 Wanderflow. Built with React, TypeScript &amp; Tailwind CSS for GNDEC IT College Training.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-stone-300">
              Designed with <Heart className="w-3 h-3 text-[#E0704D] fill-current" /> for curious travelers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
