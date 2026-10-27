import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TRAVEL_GUIDES } from '../data/travelGuides';
import {
  BookOpen,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Bookmark,
  Sparkles,
  CheckSquare,
  Square,
  Home,
} from 'lucide-react';

export const TravelGuideDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const guide = TRAVEL_GUIDES.find((g) => g.slug === slug || g.id === slug);

  const [checkedItems, setCheckedItems] = useState<{ [index: number]: boolean }>({});
  const [copyNotice, setCopyNotice] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!guide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-editorial text-stone-900">
          Guide Not Found
        </h2>
        <p className="text-sm text-stone-600">
          We could not locate the requested travel guide.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#16382B] text-white rounded-xl text-xs font-semibold"
          >
            <Home className="w-4 h-4 text-[#E5A43B]" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-800 rounded-xl text-xs font-semibold border border-stone-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Travel Guides</span>
          </Link>
        </div>
      </div>
    );
  }

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyNotice(true);
      setTimeout(() => setCopyNotice(false), 2500);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#16382B] transition"
            title="Go to main default page"
          >
            <Home className="w-4 h-4 text-[#E5A43B]" />
            <span>Home</span>
          </Link>
          <span className="text-stone-300">/</span>
          <button
            onClick={() => navigate('/guides')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#16382B] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Travel Guides</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {copyNotice && (
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              Link copied!
            </span>
          )}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition cursor-pointer"
            title="Copy article URL"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header className="space-y-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="px-3 py-1 rounded-full bg-[#16382B] text-white text-xs font-semibold">
            {guide.category}
          </span>
          <span className="text-xs text-stone-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#E5A43B]" />
            {guide.readTimeMinutes} min read
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-editorial leading-tight">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans-ui">
          {guide.subtitle}
        </p>

        {/* Author Card */}
        <div className="pt-4 flex items-center justify-center sm:justify-start gap-3 border-t border-stone-100">
          <img
            src={guide.author.avatar}
            alt={guide.author.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-[#16382B]"
          />
          <div className="text-left">
            <span className="font-bold text-sm text-stone-900 block">{guide.author.name}</span>
            <span className="text-xs text-stone-500">{guide.author.role} • {guide.publishedDate}</span>
          </div>
        </div>
      </header>

      {/* Hero Cover Image */}
      <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-stone-100 shadow-md">
        <img
          src={guide.coverImage}
          alt={guide.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Editorial Content Sections */}
      <div className="space-y-10 text-stone-800 leading-relaxed font-sans-ui">
        {/* Summary Lead */}
        <div className="p-6 rounded-2xl bg-[#FAF9F6] border-l-4 border-[#16382B] text-sm sm:text-base text-stone-700 font-medium italic">
          "{guide.summary}"
        </div>

        {/* Body Sections */}
        {guide.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl font-bold font-editorial text-stone-900 border-b border-stone-200 pb-2">
              {section.heading}
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              {section.content}
            </p>

            {/* Key Tips Callout */}
            {section.keyTips && section.keyTips.length > 0 && (
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E5A43B]" />
                  Key Tactical Takeaways
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
                  {section.keyTips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16382B] shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}

        {/* Interactive Checklist if provided */}
        {guide.checklist && guide.checklist.length > 0 && (
          <section className="bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-editorial text-stone-900">
                  Interactive Traveler Checklist
                </h3>
                <p className="text-xs text-stone-500">
                  Check off items as you prepare for your upcoming journey.
                </p>
              </div>
              <span className="text-xs font-bold text-[#16382B] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                {Object.values(checkedItems).filter(Boolean).length} / {guide.checklist.length} Completed
              </span>
            </div>

            <div className="space-y-2.5 pt-2">
              {guide.checklist.map((item, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-300 text-stone-500 line-through'
                        : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                    <span className="text-xs sm:text-sm font-medium">{item}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Guide Footer */}
      <footer className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/guides"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Other Travel Guides</span>
        </Link>

        <Link
          to="/trips/new"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold shadow-md transition"
        >
          <span>Plan a Trip with These Tips</span>
        </Link>
      </footer>
    </article>
  );
};
