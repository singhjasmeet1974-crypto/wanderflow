import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '../../types';
import { StorageService } from '../../lib/storage';
import { MapPin, Heart, ArrowRight, Sparkles, Clock } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onSaveToggle?: (isSaved: boolean) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSaveToggle,
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(() =>
    StorageService.isDestinationSaved(destination.id)
  );
  const [imgError, setImgError] = useState(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = StorageService.toggleSaveDestination(destination.id);
    setIsSaved(newStatus);
    if (onSaveToggle) onSaveToggle(newStatus);
  };

  const fallbackImage =
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-[#E6E2D8] hover:border-[#16382B]/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail Section */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={imgError ? fallbackImage : destination.imageUrl}
          alt={`Travel destination ${destination.name}, ${destination.country}`}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16382B]/85 backdrop-blur-md text-white text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5A43B]"></span>
          <span>{destination.category}</span>
        </div>

        {/* Save / Favorite Button */}
        <button
          onClick={handleHeartClick}
          aria-label={isSaved ? `Remove ${destination.name} from saved destinations` : `Save ${destination.name} to favorites`}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-stone-700 hover:text-rose-600 transition shadow-xs cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition ${
              isSaved ? 'text-rose-600 fill-rose-600 scale-110' : 'text-stone-700'
            }`}
          />
        </button>

        {/* Suggested Duration Tag */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-stone-200 text-[11px] font-medium flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#E5A43B]" />
          <span>{destination.suggestedDuration}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16382B] mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#E0704D]" />
            <span>
              {destination.region}, {destination.country}
            </span>
          </div>

          <h3 className="text-xl font-bold text-stone-900 group-hover:text-[#16382B] transition font-editorial mb-2">
            {destination.name}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {destination.shortDescription}
          </p>

          {/* Highlights tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {destination.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom meta & CTA */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] text-stone-600 uppercase font-bold tracking-wider block">
              Estimated Budget
            </span>
            <span className="text-sm font-bold text-[#16382B]">
              ₹{destination.budgetEstimate.min.toLocaleString()} - ₹{destination.budgetEstimate.max.toLocaleString()}
            </span>
          </div>

          <Link
            to={`/destinations/${destination.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#16382B] group-hover:text-[#E0704D] transition"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};
