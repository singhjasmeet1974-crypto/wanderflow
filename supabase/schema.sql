-- ==============================================================================
-- WANDERFLOW - SUPABASE POSTGRESQL RELATIONAL SCHEMA & ROW LEVEL SECURITY
-- Relational Schema & Security Policies for Wanderflow Travel Platform
-- ==============================================================================

-- 1. PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  college TEXT DEFAULT 'Guru Nanak Dev Engineering College',
  bio TEXT,
  travel_style TEXT DEFAULT 'Student Group',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are readable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. DESTINATIONS
CREATE TABLE IF NOT EXISTS public.destinations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  country TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  budget_min INT NOT NULL,
  budget_max INT NOT NULL,
  estimated_daily_cost INT NOT NULL,
  best_time_to_visit TEXT NOT NULL,
  climate_type TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  popularity_score INT DEFAULT 90,
  suggested_duration TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  practical_tips TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Destinations are readable by everyone"
  ON public.destinations FOR SELECT
  USING (true);

-- 3. SAVED DESTINATIONS (Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id TEXT REFERENCES public.destinations(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, destination_id)
);

ALTER TABLE public.saved_destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved destinations"
  ON public.saved_destinations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save destinations"
  ON public.saved_destinations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their saved destinations"
  ON public.saved_destinations FOR DELETE
  USING (auth.uid() = user_id);

-- 4. TRIPS
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id TEXT REFERENCES public.destinations(id),
  destination_name TEXT NOT NULL,
  destination_image TEXT,
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  traveler_count INT DEFAULT 1,
  travel_style TEXT DEFAULT 'Student Group',
  preferences_notes TEXT,
  status TEXT DEFAULT 'Upcoming',
  estimated_total_budget INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own trips"
  ON public.trips FOR ALL
  USING (auth.uid() = user_id);

-- 5. ITINERARY DAYS & ACTIVITIES
CREATE TABLE IF NOT EXISTS public.itinerary_days (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
  day_number INT NOT NULL,
  date DATE NOT NULL,
  theme_title TEXT,
  notes TEXT,
  UNIQUE(trip_id, day_number)
);

ALTER TABLE public.itinerary_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their itinerary days"
  ON public.itinerary_days FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.trips WHERE trips.id = itinerary_days.trip_id AND trips.user_id = auth.uid()
  ));

CREATE TABLE IF NOT EXISTS public.itinerary_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day_id UUID REFERENCES public.itinerary_days(id) ON DELETE CASCADE,
  time TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  notes TEXT,
  estimated_cost INT DEFAULT 0,
  category TEXT DEFAULT 'Sightseeing',
  order_index INT DEFAULT 0
);

ALTER TABLE public.itinerary_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their itinerary activities"
  ON public.itinerary_activities FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.itinerary_days 
    JOIN public.trips ON trips.id = itinerary_days.trip_id
    WHERE itinerary_days.id = itinerary_activities.day_id AND trips.user_id = auth.uid()
  ));

-- 6. GROUP TRIP INTERESTS (Gen-Z Social Travel Prototype)
CREATE TABLE IF NOT EXISTS public.group_trip_interests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id TEXT NOT NULL,
  trip_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  college_or_city TEXT NOT NULL,
  traveler_count INT DEFAULT 1,
  notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.group_trip_interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their interest"
  ON public.group_trip_interests FOR INSERT
  WITH CHECK (true);
