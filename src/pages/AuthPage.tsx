import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TravelStyle } from '../types';
import {
  Compass,
  Sparkles,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  GraduationCap,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, loginAsDemo, isDemoMode } = useAuth();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('aarav.sharma@gndec.ac.in');
  const [password, setPassword] = useState('college2026');
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [college, setCollege] = useState('Guru Nanak Dev Engineering College (GNDEC)');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('Student Group');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    if (isLoginTab) {
      const res = await login(email, password);
      setIsSubmitting(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setErrorMsg(res.error || 'Invalid credentials.');
      }
    } else {
      const res = await signup(fullName, email, password, college, travelStyle);
      setIsSubmitting(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setErrorMsg(res.error || 'Registration failed.');
      }
    }
  };

  const handleQuickDemoLogin = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#E6E2D8] p-6 sm:p-8 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#16382B] text-white flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#E5A43B]" />
            </div>
            <span className="text-2xl font-bold font-editorial text-[#16382B]">
              Wanderflow
            </span>
          </Link>
          <h2 className="text-xl font-bold text-stone-900 font-editorial">
            {isLoginTab ? 'Sign In to Your Account' : 'Create Student Account'}
          </h2>
          <p className="text-xs text-stone-500">
            Organize trips, save favorite spots, and collaborate with your squad.
          </p>
        </div>

        {/* 1-Click College Demo Login Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A43B]" />
              Evaluation Shortcut
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
              GNDEC IT
            </span>
          </div>
          <p className="text-[11px] text-amber-900 leading-relaxed">
            One-click sign in as pre-seeded demo traveler (Aarav Sharma) with instant access to sample trips.
          </p>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5A43B]" />
            <span>Instant Demo Sign In</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-stone-100 p-1">
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(true);
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              isLoginTab
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(false);
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              !isLoginTab
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginTab && (
            <>
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  College / University
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="GNDEC Ludhiana"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#16382B] focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-[11px] font-bold text-stone-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@gndec.ac.in"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-stone-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#16382B] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-[#16382B] hover:bg-[#235441] text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isLoginTab ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
