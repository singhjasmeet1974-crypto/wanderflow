import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StorageService } from '../../lib/storage';
import {
  Home,
  Compass,
  MapPin,
  BookOpen,
  Users2,
  CalendarDays,
  LayoutDashboard,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
  Heart,
  ChevronDown,
  CalendarCheck,
  Settings,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, loginAsDemo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Dynamic counts for dropdown badges
  const [counts, setCounts] = useState({
    bookings: 0,
    saved: 0,
    trips: 0,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const refreshCounts = () => {
    try {
      const b = StorageService.getBookings().length;
      const s = StorageService.getSavedDestinations().length;
      const t = StorageService.getTrips().length;
      setCounts({ bookings: b, saved: s, trips: t });
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    refreshCounts();
  }, [location.pathname, userDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to dismiss dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserDropdownOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [userDropdownOpen]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Explore', path: '/explore', icon: MapPin },
    { name: 'Travel Guides', path: '/guides', icon: BookOpen },
    { name: 'Group Trips', path: '/group-trips', icon: Users2, badge: 'Gen-Z' },
    { name: 'My Bookings', path: '/bookings', icon: CalendarCheck, badge: 'Demo' },
    { name: 'My Trips', path: '/trips', icon: CalendarDays },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleDemoSignIn = () => {
    loginAsDemo();
    refreshCounts();
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      <nav
        aria-label="Main Navigation"
        className={`w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E6E2D8] transition-all duration-200 ${
          scrolled ? 'shadow-sm py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#16382B] text-[#F3EFE6] flex items-center justify-center shadow-sm group-hover:bg-[#235441] transition-colors">
                <Compass className="w-5 h-5 text-[#E5A43B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#16382B] font-editorial flex items-center gap-1">
                  Wanderflow
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0704D]"></span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-stone-500 -mt-1 font-sans-ui">
                  Explore • Plan • Together
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    id={link.path === '/' ? 'nav-home-btn' : undefined}
                    title={link.path === '/' ? 'Return to Home / Main default page' : link.name}
                    aria-label={link.name}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#16382B] text-white shadow-xs'
                        : 'text-stone-700 hover:text-[#16382B] hover:bg-stone-200/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#E5A43B]' : 'text-stone-500'}`} />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#E0704D]/15 text-[#E0704D] font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Profile Icon / Avatar & Dropdown */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="relative" ref={dropdownRef}>
                {/* Professional Profile Avatar Button (Always present) */}
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2.5 p-1.5 pr-3 rounded-full border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#16382B]/20 shadow-xs ${
                    userDropdownOpen
                      ? 'bg-stone-200/90 border-[#16382B]/40 ring-2 ring-[#16382B]/15'
                      : 'bg-white hover:bg-stone-100/90 border-stone-300/80 hover:border-stone-400'
                  }`}
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="menu"
                  aria-label="User profile and account navigation menu"
                >
                  {/* Avatar Photo or Professional Icon */}
                  {isAuthenticated && user?.avatarUrl ? (
                    <div className="relative">
                      <img
                        src={user.avatarUrl}
                        alt={user.fullName || 'User Profile'}
                        className="w-8 h-8 rounded-full object-cover border-2 border-[#16382B]/30"
                      />
                      <span
                        className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
                        title="Active Traveler"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#16382B] to-[#235441] text-white flex items-center justify-center shadow-xs border border-white/20">
                      <User className="w-4 h-4 text-[#E5A43B]" />
                    </div>
                  )}

                  {/* Name or Status Label */}
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-stone-900 leading-tight max-w-[110px] truncate">
                      {isAuthenticated && user ? user.fullName : 'My Account'}
                    </span>
                    <span className="text-[10px] font-semibold text-stone-500 leading-tight flex items-center gap-1">
                      {isAuthenticated && user ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                          <span>Online</span>
                        </>
                      ) : (
                        <span>Profile &amp; Trips</span>
                      )}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ml-0.5 ${
                      userDropdownOpen ? 'rotate-180 text-[#16382B]' : ''
                    }`}
                  />
                </button>

                {/* Professional Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    className="absolute right-0 mt-2.5 w-72 bg-white rounded-3xl shadow-2xl border border-stone-200/90 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 overflow-hidden"
                  >
                    {/* User Profile Card Header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-stone-50 to-stone-100/70 border-b border-stone-100 flex items-center gap-3">
                      <div className="relative shrink-0">
                        {isAuthenticated && user?.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.fullName}
                            className="w-11 h-11 rounded-2xl object-cover border-2 border-[#16382B] shadow-xs"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-2xl bg-[#16382B] text-white flex items-center justify-center shadow-xs">
                            <User className="w-5 h-5 text-[#E5A43B]" />
                          </div>
                        )}
                        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#E5A43B] text-[9px] font-extrabold text-[#0F261D]">
                          {isAuthenticated ? 'PRO' : 'GUEST'}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-stone-900 truncate">
                          {isAuthenticated && user ? user.fullName : 'Guest Traveler'}
                        </p>
                        <p className="text-[11px] text-stone-500 truncate">
                          {isAuthenticated && user ? user.email : 'Exploring Wanderflow'}
                        </p>
                        <span className="inline-block mt-0.5 text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 truncate max-w-full">
                          {isAuthenticated && user?.college ? user.college : 'Active Traveler Mode'}
                        </span>
                      </div>
                    </div>

                    {/* Quick Demo Switcher if Not Signed In */}
                    {!isAuthenticated && (
                      <div className="p-2 mx-2 my-1 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#E5A43B]" />
                            Demo Explorer Profile
                          </span>
                          <button
                            onClick={handleDemoSignIn}
                            className="px-2.5 py-1 rounded-lg bg-[#16382B] text-white text-[10px] font-bold hover:bg-[#235441] transition cursor-pointer"
                          >
                            Load Aarav
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Required Core Navigation Actions */}
                    <div className="py-1.5 space-y-0.5">
                      {/* 0. Home Page */}
                      <Link
                        to="/"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-100/80 hover:text-[#16382B] transition group"
                        role="menuitem"
                      >
                        <div className="w-7 h-7 rounded-lg bg-stone-100 group-hover:bg-[#16382B] group-hover:text-white flex items-center justify-center transition text-stone-600">
                          <Home className="w-4 h-4 text-[#E5A43B]" />
                        </div>
                        <div className="flex-1">
                          <span className="block leading-tight">Home Page</span>
                          <span className="text-[10px] text-stone-400 font-normal">
                            Return to main default page
                          </span>
                        </div>
                      </Link>
                      {/* 1. My Profile */}
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-100/80 hover:text-[#16382B] transition group"
                        role="menuitem"
                      >
                        <div className="w-7 h-7 rounded-lg bg-stone-100 group-hover:bg-[#16382B] group-hover:text-white flex items-center justify-center transition text-stone-600">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <span className="block leading-tight">My Profile</span>
                          <span className="text-[10px] text-stone-400 font-normal">
                            Persona, avatar &amp; details
                          </span>
                        </div>
                      </Link>

                      {/* 2. Bookings */}
                      <Link
                        to="/bookings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-100/80 hover:text-[#16382B] transition group"
                        role="menuitem"
                      >
                        <div className="w-7 h-7 rounded-lg bg-amber-50 group-hover:bg-[#E0704D] group-hover:text-white flex items-center justify-center transition text-amber-700">
                          <CalendarCheck className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <span className="block leading-tight">Bookings</span>
                          <span className="text-[10px] text-stone-400 font-normal">
                            Reservations &amp; vouchers
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E0704D]/15 text-[#E0704D]">
                          {counts.bookings}
                        </span>
                      </Link>

                      {/* 3. Saved Destination */}
                      <Link
                        to="/profile?tab=saved"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-100/80 hover:text-[#16382B] transition group"
                        role="menuitem"
                      >
                        <div className="w-7 h-7 rounded-lg bg-rose-50 group-hover:bg-rose-600 group-hover:text-white flex items-center justify-center transition text-rose-600">
                          <Heart className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <span className="block leading-tight">Saved Destination</span>
                          <span className="text-[10px] text-stone-400 font-normal">
                            Wishlist bookmarks
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                          {counts.saved}
                        </span>
                      </Link>

                      {/* 4. My Trips */}
                      <Link
                        to="/trips"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-100/80 hover:text-[#16382B] transition group"
                        role="menuitem"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 group-hover:bg-[#16382B] group-hover:text-white flex items-center justify-center transition text-emerald-700">
                          <CalendarDays className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <span className="block leading-tight">My Trips</span>
                          <span className="text-[10px] text-stone-400 font-normal">
                            Blueprints &amp; itineraries
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {counts.trips}
                        </span>
                      </Link>

                      {/* 5. Settings */}
                      <Link
                        to="/profile?tab=settings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-100/80 hover:text-[#16382B] transition group"
                        role="menuitem"
                      >
                        <div className="w-7 h-7 rounded-lg bg-stone-100 group-hover:bg-[#16382B] group-hover:text-white flex items-center justify-center transition text-stone-600">
                          <Settings className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <span className="block leading-tight">Settings</span>
                          <span className="text-[10px] text-stone-400 font-normal">
                            Preferences &amp; demo data
                          </span>
                        </div>
                      </Link>
                    </div>

                    {/* 6. Sign Out / Session Action */}
                    <div className="border-t border-stone-100 pt-1 mt-1">
                      {isAuthenticated ? (
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer text-left group"
                          role="menuitem"
                        >
                          <div className="w-7 h-7 rounded-lg bg-rose-50 group-hover:bg-rose-600 group-hover:text-white flex items-center justify-center transition text-rose-500">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span className="block leading-tight">Sign Out</span>
                            <span className="text-[10px] text-rose-400 font-normal">
                              End current session
                            </span>
                          </div>
                        </button>
                      ) : (
                        <Link
                          to="/auth"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-[#16382B] hover:bg-stone-100 transition cursor-pointer text-left group"
                          role="menuitem"
                        >
                          <div className="w-7 h-7 rounded-lg bg-stone-100 group-hover:bg-[#16382B] group-hover:text-white flex items-center justify-center transition text-stone-700">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span className="block leading-tight">Sign In / Register</span>
                            <span className="text-[10px] text-stone-400 font-normal">
                              Create or access account
                            </span>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-stone-700 hover:text-[#16382B] hover:bg-stone-200/60 transition"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#FAF9F6] px-4 pt-3 pb-6 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    id={link.path === '/' ? 'mobile-nav-home-btn' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                      isActive
                        ? 'bg-[#16382B] text-white shadow-xs'
                        : 'text-stone-700 hover:bg-stone-200/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#E5A43B]' : 'text-stone-500'}`} />
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E0704D]/20 text-[#E0704D] font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Profile & Account Section with the 6 items */}
            <div className="border-t border-stone-200 pt-3 space-y-2">
              <div className="flex items-center gap-3 px-3.5 py-2.5 bg-stone-100 rounded-2xl">
                {isAuthenticated && user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#16382B]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#16382B] text-white flex items-center justify-center">
                    <User className="w-5 h-5 text-[#E5A43B]" />
                  </div>
                )}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-xs font-bold text-stone-900 truncate">
                    {isAuthenticated && user ? user.fullName : 'Guest Traveler'}
                  </span>
                  <span className="text-[11px] text-stone-500 truncate">
                    {isAuthenticated && user ? user.email : 'Explore or sign in'}
                  </span>
                </div>
                {!isAuthenticated && (
                  <button
                    onClick={() => {
                      handleDemoSignIn();
                      setMobileMenuOpen(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#E0704D] text-white text-[10px] font-bold shrink-0"
                  >
                    Demo
                  </button>
                )}
              </div>

              {/* 1. My Profile */}
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-stone-700 hover:bg-stone-200/60 rounded-xl font-medium"
              >
                <User className="w-4 h-4 text-stone-500" />
                <span>My Profile</span>
              </Link>

              {/* 2. Bookings */}
              <Link
                to="/bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 text-sm text-stone-700 hover:bg-stone-200/60 rounded-xl font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <CalendarCheck className="w-4 h-4 text-stone-500" />
                  <span>Bookings</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                  {counts.bookings} Stays
                </span>
              </Link>

              {/* 3. Saved Destination */}
              <Link
                to="/profile?tab=saved"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 text-sm text-stone-700 hover:bg-stone-200/60 rounded-xl font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-stone-500" />
                  <span>Saved Destination</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">
                  {counts.saved}
                </span>
              </Link>

              {/* 4. My Trips */}
              <Link
                to="/trips"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 text-sm text-stone-700 hover:bg-stone-200/60 rounded-xl font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <CalendarDays className="w-4 h-4 text-stone-500" />
                  <span>My Trips</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {counts.trips}
                </span>
              </Link>

              {/* 5. Settings */}
              <Link
                to="/profile?tab=settings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-stone-700 hover:bg-stone-200/60 rounded-xl font-medium"
              >
                <Settings className="w-4 h-4 text-stone-500" />
                <span>Settings</span>
              </Link>

              {/* 6. Sign Out */}
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl text-left font-medium"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center py-2.5 rounded-xl bg-[#16382B] text-white text-sm font-semibold hover:bg-[#235441] transition"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
