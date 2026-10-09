import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, TravelStyle } from '../types';
import { StorageService, DEFAULT_DEMO_USER } from '../lib/storage';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: () => void;
  signup: (
    fullName: string,
    email: string,
    password: string,
    college?: string,
    travelStyle?: TravelStyle
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetDemoData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(!isSupabaseConfigured);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            const profile: UserProfile = {
              id: data.session.user.id,
              email: data.session.user.email || '',
              fullName: data.session.user.user_metadata?.full_name || 'Traveler',
              avatarUrl:
                data.session.user.user_metadata?.avatar_url ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
              college: data.session.user.user_metadata?.college || 'College Explorer',
              bio: data.session.user.user_metadata?.bio || 'Traveler on Wanderflow',
              travelStyle: (data.session.user.user_metadata?.travelStyle as TravelStyle) || 'Student Group',
              createdAt: data.session.user.created_at || new Date().toISOString(),
            };
            setUser(profile);
            setIsDemoMode(false);
          } else {
            // Check local fallback
            const localUser = StorageService.getUserProfile();
            if (localUser && StorageService.isAuthenticated()) {
              setUser(localUser);
            }
          }
        } else {
          // Local / Demo evaluation mode
          const localUser = StorageService.getUserProfile();
          if (localUser && StorageService.isAuthenticated()) {
            setUser(localUser);
          }
          setIsDemoMode(true);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || email.split('@')[0],
            avatarUrl:
              data.user.user_metadata?.avatar_url ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            college: data.user.user_metadata?.college || 'College Traveler',
            bio: 'Planning adventures on Wanderflow.',
            travelStyle: 'Student Group',
            createdAt: new Date().toISOString(),
          };
          setUser(profile);
          StorageService.setUserProfile(profile);
          setIsLoading(false);
          return { success: true };
        }
      }

      // Demo mode login check
      // Allow any test login with length >= 6 for seamless evaluation
      if (password.length < 6) {
        setIsLoading(false);
        return { success: false, error: 'Password must be at least 6 characters.' };
      }

      const existingProfile = StorageService.getUserProfile();
      const profile: UserProfile = existingProfile?.email === email
        ? existingProfile
        : {
            id: `usr-${Date.now()}`,
            email,
            fullName: email.split('@')[0].replace(/[._]/g, ' '),
            avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            college: 'Guru Nanak Dev Engineering College (GNDEC)',
            bio: 'Travel enthusiast exploring the world with Wanderflow.',
            travelStyle: 'Student Group',
            createdAt: new Date().toISOString(),
          };

      setUser(profile);
      StorageService.setUserProfile(profile);
      setIsLoading(false);
      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: 'An unexpected authentication error occurred.' };
    }
  };

  const loginAsDemo = () => {
    setUser(DEFAULT_DEMO_USER);
    StorageService.setUserProfile(DEFAULT_DEMO_USER);
    setIsDemoMode(true);
  };

  const signup = async (
    fullName: string,
    email: string,
    password: string,
    college: string = 'Guru Nanak Dev Engineering College (GNDEC)',
    travelStyle: TravelStyle = 'Student Group'
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (password.length < 6) {
        setIsLoading(false);
        return { success: false, error: 'Password must be at least 6 characters.' };
      }

      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              college,
              travelStyle,
            },
          },
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email,
            fullName,
            avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            college,
            bio: 'Student traveler on Wanderflow.',
            travelStyle,
            createdAt: new Date().toISOString(),
          };
          setUser(profile);
          StorageService.setUserProfile(profile);
          setIsLoading(false);
          return { success: true };
        }
      }

      // Demo Mode signup
      const newProfile: UserProfile = {
        id: `user-${Date.now()}`,
        email,
        fullName,
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        college,
        bio: 'Explorer discovering incredible journeys.',
        travelStyle,
        createdAt: new Date().toISOString(),
      };
      setUser(newProfile);
      StorageService.setUserProfile(newProfile);
      setIsLoading(false);
      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: 'Could not create account.' };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    StorageService.clearAuth();
    setUser(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    StorageService.setUserProfile(updated);
  };

  const resetDemoData = () => {
    StorageService.resetAllDemoData();
    setUser(DEFAULT_DEMO_USER);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isDemoMode,
        login,
        loginAsDemo,
        signup,
        logout,
        updateProfile,
        resetDemoData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
