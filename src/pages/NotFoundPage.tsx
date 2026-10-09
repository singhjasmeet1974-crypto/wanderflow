import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, MapPin } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#16382B] text-white flex items-center justify-center mx-auto shadow-lg">
          <Compass className="w-8 h-8 text-[#E5A43B] animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E0704D]">
            404 Error • Path Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-editorial">
            Looks like you've wandered off the trail.
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            The page you're searching for does not exist or may have moved to a new route.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold transition shadow-xs"
          >
            <Home className="w-4 h-4 text-[#E5A43B]" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition border border-stone-200"
          >
            <MapPin className="w-4 h-4 text-[#E0704D]" />
            <span>Browse Destinations</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
