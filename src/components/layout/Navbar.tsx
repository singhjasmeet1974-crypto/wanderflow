import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
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
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, loginAsDemo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navLinks = [
    { name: 'Explore', path: '/explore', icon: MapPin },
    { name: 'Travel Guides', path: '/guides', icon: BookOpen },
    { name: 'Group Trips', path: '/group-trips', icon: Users2, badge: 'Gen-Z' },
    { name: 'My Bookings', path: '/bookings', icon: CalendarCheck, badge: 'Demo' },
    { name: 'My Trips', path: '/trips', icon: CalendarDays },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      <nav
        aria-label="Main Navigation"
        className={`w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E6E2D8] transition-all duration-200 ${
          scrolled ? 'shadow-sm py-3' : 'py-4'
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
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
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

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-full bg-stone-100 hover:bg-stone-200/80 border border-stone-200 transition cursor-pointer"
                    aria-expanded={userDropdownOpen}
                    aria-label="User profile menu"
                  >
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="w-7 h-7 rounded-full object-cover border border-[#16382B]/20"
                    />
                    <span className="text-xs font-semibold text-stone-800 max-w-[120px] truncate">
                      {user.fullName}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-500 mr-1" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-4 py-2.5 border-b border-stone-100">
                        <p className="text-xs font-bold text-stone-900 truncate">{user.fullName}</p>
                        <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                          {user.college || 'Active Explorer'}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-[#16382B]"
                        >
                          <User className="w-4 h-4 text-stone-400" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/bookings"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-[#16382B]"
                        >
                          <CalendarCheck className="w-4 h-4 text-stone-400" />
                          <span className="flex-1">My Bookings</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                            Demo
                          </span>
                        </Link>
                        <Link
                          to="/profile?tab=saved"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-[#16382B]"
                        >
                          <Heart className="w-4 h-4 text-stone-400" />
                          <span>Saved Destinations</span>
                        </Link>
                        <Link
                          to="/trips"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-[#16382B]"
                        >
                          <CalendarDays className="w-4 h-4 text-stone-400" />
                          <span>My Trips</span>
                        </Link>
                        <Link
                          to="/profile?tab=settings"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-[#16382B]"
                        >
                          <Settings className="w-4 h-4 text-stone-400" />
                          <span>Settings</span>
                        </Link>
                      </div>

                      <div className="border-t border-stone-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 cursor-pointer text-left"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={loginAsDemo}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-stone-700 hover:text-[#16382B] hover:bg-stone-200/70 border border-stone-300 transition cursor-pointer"
                    title="Sign in instantly with a demo explorer profile"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E5A43B]" />
                    Demo Sign In
                  </button>

                  <Link
                    to="/auth"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold bg-[#16382B] text-white hover:bg-[#235441] shadow-xs transition"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-stone-700 hover:text-[#16382B] hover:bg-stone-200/60 transition"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-[#FAF9F6] px-4 pt-3 pb-6 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                      isActive
                        ? 'bg-[#16382B] text-white'
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

            <div className="border-t border-stone-200 pt-3">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3.5 py-2 bg-stone-100 rounded-xl">
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="w-9 h-9 rounded-full object-cover border border-[#16382B]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-stone-900">{user.fullName}</span>
                      <span className="text-[11px] text-stone-500">{user.email}</span>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3.5 py-2 text-sm text-stone-700 hover:bg-stone-200/60 rounded-lg"
                  >
                    <User className="w-4 h-4 text-stone-500" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/bookings"
                    className="flex items-center justify-between px-3.5 py-2 text-sm text-stone-700 hover:bg-stone-200/60 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-stone-500" />
                      <span>My Bookings</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                      Demo
                    </span>
                  </Link>

                  <Link
                    to="/profile?tab=saved"
                    className="flex items-center gap-2 px-3.5 py-2 text-sm text-stone-700 hover:bg-stone-200/60 rounded-lg"
                  >
                    <Heart className="w-4 h-4 text-stone-500" />
                    <span>Saved Destinations</span>
                  </Link>

                  <Link
                    to="/trips"
                    className="flex items-center gap-2 px-3.5 py-2 text-sm text-stone-700 hover:bg-stone-200/60 rounded-lg"
                  >
                    <CalendarDays className="w-4 h-4 text-stone-500" />
                    <span>My Trips &amp; Itineraries</span>
                  </Link>

                  <Link
                    to="/profile?tab=settings"
                    className="flex items-center gap-2 px-3.5 py-2 text-sm text-stone-700 hover:bg-stone-200/60 rounded-lg"
                  >
                    <Settings className="w-4 h-4 text-stone-500" />
                    <span>Settings &amp; Demo Controls</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg text-left"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  <button
                    onClick={loginAsDemo}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm font-semibold bg-white hover:bg-stone-50 transition"
                  >
                    <Sparkles className="w-4 h-4 text-[#E5A43B]" />
                    Demo Sign In
                  </button>
                  <Link
                    to="/auth"
                    className="w-full flex items-center justify-center py-2.5 rounded-xl bg-[#16382B] text-white text-sm font-semibold hover:bg-[#235441] transition"
                  >
                    Sign In / Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
