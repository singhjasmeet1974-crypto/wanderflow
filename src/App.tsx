import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { TravelGuidesPage } from './pages/TravelGuidesPage';
import { TravelGuideDetailPage } from './pages/TravelGuideDetailPage';
import { DashboardPage } from './pages/DashboardPage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { TripDetailPage } from './pages/TripDetailPage';
import { GroupTripsPage } from './pages/GroupTripsPage';
import { GroupTripDetailPage } from './pages/GroupTripDetailPage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1F2937] selection:bg-[#E0704D]/20 selection:text-[#16382B]">
          {/* Subtle Demo & College Evaluation Banner */}
          <DemoBanner />

          {/* Persistent Navbar */}
          <Navbar />

          {/* Main Application Routes */}
          <main className="flex-1 w-full">
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Destinations */}
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/destinations/:id" element={<DestinationDetailPage />} />

              {/* Travel Guides */}
              <Route path="/guides" element={<TravelGuidesPage />} />
              <Route path="/guides/:slug" element={<TravelGuideDetailPage />} />

              {/* Group Trips (Gen-Z Social Travel Prototype) */}
              <Route path="/group-trips" element={<GroupTripsPage />} />
              <Route path="/group-trips/:id" element={<GroupTripDetailPage />} />

              {/* User Dashboard & Trips */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/trips" element={<DashboardPage />} />
              <Route path="/trips/new" element={<TripPlannerPage />} />
              <Route path="/trips/:id" element={<TripDetailPage />} />

              {/* Authentication & Profile */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/login" element={<Navigate to="/auth" replace />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Persistent Comprehensive Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
