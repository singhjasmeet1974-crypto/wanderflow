import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TRAVEL_GUIDES } from '../data/travelGuides';
import { BookOpen, Clock, ArrowRight, User, Sparkles, Filter } from 'lucide-react';

export const TravelGuidesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Budgeting & Hacks', 'Packing & Gear', 'Solo Travel', 'Weekend Escapes', 'Eco Travel', 'Group Travel'];

  const filteredGuides = selectedCategory === 'All'
    ? TRAVEL_GUIDES
    : TRAVEL_GUIDES.filter((g) => g.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#16382B] uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-[#E5A43B]" />
          <span>Field Notes &amp; Backpacking Wisdom</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-editorial">
              Editorial Travel Guides
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mt-1">
              Tested strategies, packing checklists, and budget advice curated for college students and youth explorers.
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-1 border-b border-stone-200 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#16382B] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuides.map((guide) => (
          <article
            key={guide.id}
            className="group bg-white rounded-3xl overflow-hidden border border-[#E6E2D8] hover:border-[#16382B]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={guide.coverImage}
                  alt={guide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#16382B]/85 backdrop-blur-md text-white text-[11px] font-semibold">
                  {guide.category}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-stone-200 text-[11px] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#E5A43B]" />
                  <span>{guide.readTimeMinutes} min read</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <img
                    src={guide.author.avatar}
                    alt={guide.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-stone-300"
                  />
                  <span className="text-xs text-stone-500 font-medium">
                    {guide.author.name} • {guide.publishedDate}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-stone-900 group-hover:text-[#16382B] transition font-editorial leading-snug">
                  {guide.title}
                </h2>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {guide.summary}
                </p>
              </div>
            </div>

            <div className="p-5 bg-[#FAF9F6] border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#16382B]">
                Read Article
              </span>
              <Link
                to={`/guides/${guide.slug}`}
                className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 group-hover:bg-[#16382B] group-hover:text-white transition shadow-2xs"
                aria-label={`Read article: ${guide.title}`}
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
