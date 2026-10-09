import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { DestinationCard } from '../components/destination/DestinationCard';
import { FilterBar } from '../components/destination/FilterBar';
import { DestinationCategory, Destination } from '../types';
import {
  Compass,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  Bot,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL params
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = (searchParams.get('category') as DestinationCategory) || 'All';
  const initialBudget = searchParams.get('maxBudget')
    ? Number(searchParams.get('maxBudget'))
    : 160000;
  const initialSort = (searchParams.get('sort') as any) || 'popularity';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory | 'All'>(
    initialCategory
  );
  const [maxBudget, setMaxBudget] = useState(initialBudget);
  const [sortBy, setSortBy] = useState<'popularity' | 'budget-asc' | 'budget-desc' | 'name'>(
    initialSort
  );

  // Recommendation Mode Toggle
  const [showAiRecommendations, setShowAiRecommendations] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<'Student Budget' | 'Adrenaline' | 'Chill & Culture'>(
    'Student Budget'
  );

  // Sync state to URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (maxBudget < 160000) params.set('maxBudget', maxBudget.toString());
    if (sortBy !== 'popularity') params.set('sort', sortBy);
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategory, maxBudget, sortBy, setSearchParams]);

  // Filter & Sort Logic
  const filteredDestinations = useMemo(() => {
    let result = DESTINATIONS.filter((dest) => {
      // Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesRegion = dest.region.toLowerCase().includes(q);
        const matchesCountry = dest.country.toLowerCase().includes(q);
        const matchesTags = dest.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchesName && !matchesRegion && !matchesCountry && !matchesTags) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All' && dest.category !== selectedCategory) {
        return false;
      }

      // Budget filter
      if (dest.budgetEstimate.min > maxBudget) {
        return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'popularity') {
        return b.popularityScore - a.popularityScore;
      }
      if (sortBy === 'budget-asc') {
        return a.budgetEstimate.min - b.budgetEstimate.min;
      }
      if (sortBy === 'budget-desc') {
        return b.budgetEstimate.min - a.budgetEstimate.min;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, maxBudget, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxBudget(160000);
    setSortBy('popularity');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Breadcrumbs */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#16382B] uppercase tracking-wider">
          <Compass className="w-4 h-4 text-[#E5A43B]" />
          <span>Curated Travel Discovery</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-editorial">
              Explore Destinations
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mt-1">
              Filter through our verified repository of Indian and international destinations with indicative budgets, travel seasons, and activity guides.
            </p>
          </div>

          {/* AI Recommendation Assistant Toggle */}
          <button
            onClick={() => setShowAiRecommendations(!showAiRecommendations)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#16382B]/30 hover:border-[#16382B] text-[#16382B] text-xs font-bold shadow-xs transition self-start md:self-auto cursor-pointer"
          >
            <Bot className="w-4 h-4 text-[#E0704D]" />
            <span>
              {showAiRecommendations ? 'Hide Smart Match' : 'Smart Recommendation Engine'}
            </span>
          </button>
        </div>
      </div>

      {/* Smart Rule-Based Recommendation Prototype Section */}
      {showAiRecommendations && (
        <section aria-label="Smart Recommendation Engine" className="p-6 rounded-2xl bg-gradient-to-br from-[#FAF9F6] to-stone-100 border border-[#16382B]/20 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#16382B] text-white">
                  <Bot className="w-4 h-4 text-[#E5A43B]" />
                </span>
                <h3 className="text-base font-bold text-stone-900 font-editorial">
                  Rule-Based Travel Recommender (Prototype)
                </h3>
              </div>
              <p className="text-xs text-stone-500">
                Transparent heuristic matcher based on student budget thresholds and trip styles (no opaque black-box ML).
              </p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
              Heuristic Engine
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-stone-700">Select Travel Persona:</span>
            {(['Student Budget', 'Adrenaline', 'Chill & Culture'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedStyle === style
                    ? 'bg-[#16382B] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Persona Insights */}
          <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-700 space-y-1">
            {selectedStyle === 'Student Budget' && (
              <>
                <p className="font-semibold text-[#16382B]">
                  💡 Recommended for college budgets: <strong>Amritsar &amp; Rishikesh</strong>
                </p>
                <p className="text-stone-500">
                  Why? Both feature economical sleeper trains, free langar or cheap ashram/hostel dining, and monument entry discounts.
                </p>
              </>
            )}
            {selectedStyle === 'Adrenaline' && (
              <>
                <p className="font-semibold text-[#16382B]">
                  ⚡ Recommended for thrill-seekers: <strong>Rishikesh, Manali &amp; Ladakh</strong>
                </p>
                <p className="text-stone-500">
                  Why? White-water rafting rapids, tandem paragliding, and high-altitude mountain passes offer maximum adventure.
                </p>
              </>
            )}
            {selectedStyle === 'Chill & Culture' && (
              <>
                <p className="font-semibold text-[#16382B]">
                  🌸 Recommended for relaxation: <strong>Udaipur, Kerala &amp; Dharamshala</strong>
                </p>
                <p className="text-stone-500">
                  Why? Quiet lakeside ghats, emerald tea plantation trails, and peaceful Tibetan monasteries with indie cafes.
                </p>
              </>
            )}
          </div>
        </section>
      )}

      {/* Filter and Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        maxBudget={maxBudget}
        onBudgetChange={setMaxBudget}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onResetFilters={handleResetFilters}
        totalResultsCount={filteredDestinations.length}
      />

      {/* Destinations Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 sm:p-16 rounded-3xl bg-white border border-[#E6E2D8] text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
            <Compass className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-stone-900 font-editorial">
              No matching destinations found
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              We couldn't find any places matching "{searchQuery}" under ₹{maxBudget.toLocaleString()} in the selected category.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16382B] text-white text-xs font-semibold hover:bg-[#235441] transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
