import React from 'react';
import { DestinationCategory } from '../../types';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: DestinationCategory | 'All';
  onCategoryChange: (category: DestinationCategory | 'All') => void;
  maxBudget: number;
  onBudgetChange: (budget: number) => void;
  sortBy: 'popularity' | 'budget-asc' | 'budget-desc' | 'name';
  onSortChange: (sort: 'popularity' | 'budget-asc' | 'budget-desc' | 'name') => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  maxBudget,
  onBudgetChange,
  sortBy,
  onSortChange,
  onResetFilters,
  totalResultsCount,
}) => {
  const categories: (DestinationCategory | 'All')[] = [
    'All',
    'Mountains',
    'Heritage',
    'Beaches',
    'Adventure',
    'Nature',
    'City Escapes',
  ];

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'All' || maxBudget < 160000 || sortBy !== 'popularity';

  return (
    <div className="bg-white rounded-2xl border border-[#E6E2D8] p-5 shadow-xs space-y-5">
      {/* Search Input & Sort Dropdown */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by destination name, state, country, or keyword (e.g. Manali, Amritsar, Beach)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#16382B] focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-4 h-4 text-stone-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as 'popularity' | 'budget-asc' | 'budget-desc' | 'name')
            }
            aria-label="Sort destinations"
            className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#16382B]"
          >
            <option value="popularity">Sort by: Popularity</option>
            <option value="budget-asc">Budget: Low to High</option>
            <option value="budget-desc">Budget: High to Low</option>
            <option value="name">Destination Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Travel Category
          </span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs text-[#E0704D] hover:underline font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#16382B] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget Slider & Results Count */}
      <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="flex items-center justify-between text-xs font-medium text-stone-600 mb-1.5">
            <span>Max Budget Ceiling:</span>
            <span className="font-bold text-[#16382B]">
              {maxBudget >= 160000 ? 'Any Budget' : `Under ₹${maxBudget.toLocaleString()}`}
            </span>
          </div>
          <input
            type="range"
            min="5000"
            max="160000"
            step="5000"
            value={maxBudget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            aria-label="Filter by maximum budget"
            className="w-full accent-[#16382B] cursor-pointer"
          />
        </div>

        <div className="text-xs font-medium text-stone-500">
          Showing <strong className="text-stone-900">{totalResultsCount}</strong> curated destinations
        </div>
      </div>
    </div>
  );
};
