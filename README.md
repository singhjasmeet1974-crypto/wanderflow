# Wanderflow — Explore More. Plan Better. Travel Together.

> **A modern travel discovery and day-by-day itinerary planning platform.**

---

## 1. Project Overview & Vision

**Wanderflow** is a unified travel discovery and personalized day-by-day itinerary planning platform crafted specifically for college students, young travelers, solo backpackers, and friend groups.

Instead of juggling scattered spreadsheets, messy group chats, travel blogs, and fragmented booking portals, Wanderflow consolidates the entire journey into a single, intuitive platform:
$$\text{Discover Destinations} \longrightarrow \text{Explore Curated Guides} \longrightarrow \text{Plan Daily Itineraries} \longrightarrow \text{Track Estimated Costs} \longrightarrow \text{Check Live Weather} \longrightarrow \text{Export / Print Itinerary}$$

The application is built with a refined, modern editorial design aesthetic using a warm-neutral palette (`#FAF9F6`), deep forest green (`#16382B`), warm terracotta coral (`#E0704D`), and golden amber (`#E5A43B`), paired with sophisticated typography (**Plus Jakarta Sans** and **Playfair Display**).

---

## 2. Problem Statement

Young travelers—especially college students and Gen-Z adventurers—face significant hurdles when planning trips:
1. **Tool Fragmentation:** Planning requires switching between map apps, travel blogs, WhatsApp groups, spreadsheets, and booking engines.
2. **Unrealistic Budget Estimates:** Most commercial travel portals advertise high-season package rates without accounting for budget hostels, public Volvo buses, student discounts, or local food crawls.
3. **Complicated Group Coordination:** Friend groups struggle to agree on day-by-day schedules, resulting in trip fatigue or dropped plans.
4. **Offline Logistics Gaps:** Poor internet connectivity in high-altitude mountain valleys (e.g., Manali, Parvati Valley, Ladakh) makes accessing digital itineraries difficult without a clean, printable PDF document.

---

## 3. Project Objectives

- **Develop a unified web application** supporting destination exploration, customized day-by-day scheduling, and budget tracking.
- **Implement a robust architecture** supporting persistent client-side demo evaluation mode with seamless optional integration with **Supabase (PostgreSQL + Auth)**.
- **Provide live meteorological intelligence** via the free **Open-Meteo API** (latitude/longitude-based, requiring zero API keys) with graceful offline fallbacks.
- **Design an honest external booking gateway** generating contextual search deep-links to trusted providers (Booking.com, Skyscanner, MakeMyTrip, Agoda, Airbnb) with clear non-transactional disclaimers.
- **Prototype a Gen-Z Social Travel concept** allowing students to review curated group trip departures and register interest securely without exposing personal contact details.
- **Deliver a production-ready, testable codebase** with unit test coverage, responsive design across mobile/desktop, and complete project documentation.

---

## 4. Main Features

### A. Curated Destination Discovery
- **12+ Seeded Destinations** from India and abroad (Manali, Amritsar, Goa, Jaipur, Rishikesh, Udaipur, Kerala, Dharamshala, Ladakh, Bali, Bangkok, Paris).
- **Multi-Filter Engine:** Filter by category (*Mountains, Heritage, Beaches, Adventure, Nature, City Escapes*), budget ceiling slider, and search queries.
- **Sorting:** By popularity score, budget (low-to-high, high-to-low), or alphabetical name.
- **URL Parameter Sync:** Shareable filter states via `?q=...&category=...&maxBudget=...`.
- **Heuristic Recommender:** Rule-based smart match engine explaining recommendations based on student personas (*Student Budget, Adrenaline, Chill & Culture*).

### B. Destination Detail & Landmark Explorer
- High-resolution destination photography with graceful fallback handling.
- Key highlights, practical student tips, best time to visit, and climate classification.
- **Live Weather Widget:** Real-time temperature, wind speed, humidity, and condition via Open-Meteo.
- **Geographic Landmark Map:** Interactive OpenStreetMap integration with direct navigation links.
- **Sample Blueprint Itinerary:** Pre-calculated daily schedules ready to copy into your personal trips.

### C. Day-by-Day Itinerary Planner
- Create trips with custom start/end dates, traveler counts, and travel styles (*Student Group, Budget Backpacker, Balanced Explorer, Scenic & Relaxed*).
- Auto-generate itinerary days from sample blueprints or start from scratch.
- **Full Activity CRUD:** Add, edit, and delete activities with exact times, categories, venue locations, notes, and estimated costs in INR (₹).
- **Accessible Reordering:** Up/Down buttons allow fast chronological rescheduling without drag-and-drop glitches.
- **Live Budget Estimator:** Sums activity costs dynamically in real time.

### D. Printable Trip Summary & Export PDF
- Dedicated printable itinerary view styled with `@media print`.
- Clean paper formatting ready for offline backpacking or sharing with college faculty and friends.

### E. Gen-Z Social Group Trips (Concept Prototype)
- Curated student batches (*Parvati Valley Trek, Goa Coastal Creators, Amritsar Heritage & Food Trail, Rishikesh Rapids*).
- Batch progress tracking (*X / Y spots interested*), travel vibes, and safety guidelines.
- **Interest Registration Modal:** Captures name, email, college, and traveler count to persistent local storage with transparent prototype safety disclaimers.

### F. Editorial Travel Guides & Checklists
- 6 comprehensive guides (*Budget Trip Planning, Minimalist Packing Checklist, First-Time Solo Travel, 48-Hour Weekend Getaways, Responsible Travel, Group Trip Harmony*).
- Interactive preparation checklists with completion counters.

### G. User Authentication & Dashboard
- Supports both **Supabase Auth** and an instant **1-Click Demo Sign In** (`aarav.sharma@wanderflow.app`).
- Personalized traveler dashboard with active trips, statistics, bookmarks, and one-click data reset.

---

## 5. Technology Stack & Rationale

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** with **TypeScript** | Strict type safety, modern hooks, component reusability. |
| **Build Tool** | **Vite 6** | Ultra-fast Hot Module Replacement (HMR) and optimized rollup bundle. |
| **Styling** | **Tailwind CSS v4** | Bespoke tokens, responsive utilities, clean zero-runtime CSS. |
| **Routing** | **React Router v7** | Client-side routing with URL query state synchronization. |
| **Icons** | **Lucide React** | Consistent, lightweight SVG icon system. |
| **Persistence** | **LocalStorage + Supabase Client** | Dual-mode persistence: runs 100% offline or with cloud PostgreSQL. |
| **Weather API** | **Open-Meteo API** | Free, open meteorological data without requiring API keys. |
| **Mapping** | **OpenStreetMap** | Open geospatial data, compliant attribution, zero API key cost. |
| **Testing** | **Vitest** | High-performance unit testing matching Vite configuration. |

---

## 6. Architecture & Directory Structure

```text
Wander flow/
├── public/
│   └── favicon.svg                 # Wanderflow brand compass mark
├── src/
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces (Destination, Trip, User, Guide, etc.)
│   ├── data/
│   │   ├── destinations.ts         # 12+ verified destinations with coordinates & sample plans
│   │   ├── travelGuides.ts         # 6 editorial travel guides with checklists
│   │   └── groupTrips.ts           # Curated Gen-Z group trip batches
│   ├── lib/
│   │   ├── storage.ts              # LocalStorage manager with demo user & seed trip
│   │   ├── supabase.ts             # Supabase client with graceful offline fallback
│   │   ├── weather.ts              # Open-Meteo weather service with WMO code translation
│   │   ├── booking.ts              # External provider search deep-links generator
│   │   └── __tests__/              # Vitest test suite (weather, booking, storage)
│   ├── context/
│   │   └── AuthContext.tsx         # Auth state provider (Supabase Auth + Demo Mode)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Responsive navigation bar with mobile drawer
│   │   │   └── Footer.tsx          # Comprehensive footer with links and credits
│   │   ├── common/
│   │   │   ├── DemoBanner.tsx      # Top demo mode notice & reset button
│   │   │   └── PrintableTrip.tsx   # Window.print formatted trip itinerary modal
│   │   ├── destination/
│   │   │   ├── DestinationCard.tsx # Destination card with image fallback & heart button
│   │   │   ├── FilterBar.tsx       # Search, category pills, budget slider, sorting
│   │   │   ├── WeatherWidget.tsx   # Live Open-Meteo weather widget
│   │   │   └── DestinationMap.tsx  # OpenStreetMap landmark embed & directions
│   │   ├── trip/
│   │   │   ├── TripCard.tsx        # Dashboard trip card with dates & progress
│   │   │   ├── ActivityItem.tsx    # Activity row with accessible move up/down & editing
│   │   │   ├── DaySchedule.tsx     # Day itinerary accordion with add activity form
│   │   │   └── ExternalBookingModal.tsx # Booking partner search modal
│   │   └── group/
│   │       ├── GroupTripCard.tsx   # Gen-Z group trip card with progress bar
│   │       └── GroupInterestModal.tsx # Interest submission modal with safety notice
│   ├── pages/
│   │   ├── HomePage.tsx            # Hero, categories, popular destinations, collections
│   │   ├── ExplorePage.tsx         # Search, multi-filters, rule-based recommendation
│   │   ├── DestinationDetailPage.tsx # Destination details, live weather, map, itinerary
│   │   ├── TravelGuidesPage.tsx    # 6 editorial guides grid
│   │   ├── TravelGuideDetailPage.tsx # Article reader with interactive checklist
│   │   ├── DashboardPage.tsx       # Personalized user dashboard & statistics
│   │   ├── TripPlannerPage.tsx     # New itinerary setup wizard
│   │   ├── TripDetailPage.tsx      # Full interactive day-by-day activity editor
│   │   ├── GroupTripsPage.tsx      # Group travel hub & safety framework
│   │   ├── GroupTripDetailPage.tsx # Group trip batch details & schedule
│   │   ├── AuthPage.tsx            # Login, Register & 1-Click Demo Sign In
│   │   ├── ProfilePage.tsx         # User profile editor, bookmarks & demo reset
│   │   └── NotFoundPage.tsx        # 404 error page
│   ├── App.tsx                     # Main router & layout assembly
│   ├── main.tsx                    # React application entry point
│   └── index.css                   # Tailwind v4, custom scrollbars, print styles
├── supabase/
│   └── schema.sql                  # PostgreSQL DDL, tables, constraints & RLS policies
├── .env.example                    # Template environment variables
├── package.json                    # Project configuration & dependencies
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite 6 + Tailwind v4 plugin configuration
```

---

## 7. Prerequisites

- **Node.js:** `v20.18.0` or higher (LTS recommended)
- **Package Manager:** `npm` (v10+ or higher)
- **Web Browser:** Any modern evergreen browser (Google Chrome, Firefox, Microsoft Edge, Safari)

---

## 8. Installation & Setup

1. **Clone or Navigate to the Workspace:**
   ```bash
   cd "Wander flow"
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Note: The application runs 100% out of the box in Demo Evaluation Mode without requiring any environment variables or API keys.)*

---

## 9. How to Run the Application

### Development Server:
```bash
npm run dev
```
Open your browser at: `http://localhost:5173/` (or `http://127.0.0.1:5173/`).

### Unit Tests:
```bash
npm test
```
Runs the Vitest test suite testing weather parsing, booking URL encoding, and storage CRUD.

### Production Build:
```bash
npm run build
```
Type-checks TypeScript and compiles production distribution bundles to `./dist`.

### Preview Production Build:
```bash
npm run preview
```

---

## 10. College Demonstration Guide (Demo Mode)

For live college viva evaluation or classroom presentation:
1. **Zero Configuration Needed:** Launch `npm run dev` and open the app in any browser.
2. **Instant Demo Sign In:**
   - On the top banner or Navbar, click **Demo Sign In**.
   - Automatically signs in as **Aarav Sharma (Wanderflow Explorer)**.
3. **Pre-Seeded Sample Trip:**
   - Navigate to **Dashboard** or **My Trips**.
   - A realistic 4-day trip: *"Himalayan Mountain Escape with College Squad"* in Manali is pre-loaded with full daily activities and costs.
4. **Interactive Editor Demo:**
   - Click **Manage Itinerary** on the Manali trip.
   - Show adding an activity, editing details, using the Up/Down buttons to reorder, and watching the calculated budget update.
5. **Printable Trip Demo:**
   - Click **Print Itinerary PDF** to show the print-optimized paper layout.
6. **Live Meteorological Test:**
   - Open **Destinations** &rarr; **Manali** or **Amritsar**.
   - Show the green **Live Open-Meteo API** badge displaying real current temperature and wind speed for the location.
7. **Resetting Data:**
   - Click **Reset Demo Data** on the top demo banner to instantly restore the factory evaluation state.

---

## 11. Database & Supabase Integration (Optional)

If connecting to an external live Supabase instance:
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in the Supabase Dashboard.
3. Copy and run the contents of [`supabase/schema.sql`](file:///c:/Users/singh/OneDrive/Documents/Wander%20flow/supabase/schema.sql).
4. Retrieve your **Project URL** and **Anon Key** from Project Settings &rarr; API.
5. Add them to your local `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
6. Restart `npm run dev`. Wanderflow will automatically detect the credentials and activate live Supabase authentication and database sync.

---

## 12. Available Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | `HomePage` | Hero section, functional search, categories, and collections. |
| `/explore` | `ExplorePage` | Full destination catalogue, multi-filters, and rule-based matcher. |
| `/destinations/:id` | `DestinationDetailPage` | Overview, live weather, map, attractions, sample plan, booking modal. |
| `/guides` | `TravelGuidesPage` | 6 editorial guides with category filters. |
| `/guides/:slug` | `TravelGuideDetailPage` | Full guide reading experience with interactive checklist. |
| `/group-trips` | `GroupTripsPage` | Curated student batches and safety framework roadmap. |
| `/group-trips/:id` | `GroupTripDetailPage` | Detailed batch overview and interest registration. |
| `/dashboard` | `DashboardPage` | User dashboard with upcoming trips, statistics, and bookmarks. |
| `/trips` | `DashboardPage` | Itineraries management view. |
| `/trips/new` | `TripPlannerPage` | New trip creation wizard. |
| `/trips/:id` | `TripDetailPage` | Interactive day-by-day activity editor and budget calculator. |
| `/auth` | `AuthPage` | Sign In, Sign Up, and 1-Click Demo evaluation sign in. |
| `/profile` | `ProfilePage` | Traveler profile editor, saved bookmarks, and demo data reset. |
| `*` | `NotFoundPage` | 404 page with return to home. |

---

## 13. Known Limitations

- **Booking Redirection:** Wanderflow is a travel discovery and itinerary planning platform, not an airline or hotel broker. Booking links open external provider searches (Booking.com, MakeMyTrip, Skyscanner) and do not process transactions directly.
- **Social Group Matching:** Stranger-matching, group chat, and identity verification are documented future enhancements and are not functional in the initial prototype to guarantee user safety and privacy.

---

## 14. Future Enhancements

1. **AI Personalized Recommendations:** Integrate LLM-based custom travel itineraries based on natural language student prompts.
2. **Community Reviews & Verified Student Photos:** Allow authenticated students to upload geotagged hostel reviews.
3. **Real Group Trip Matching & Identity Verification:** Secure email verification and KYC identity verification before pairing travelers.
4. **Group Chat & In-App Expense Splitter:** Real-time chat per group trip and Splitwise-style group bill settlement.
5. **Offline PWA Support:** Full Progressive Web App service worker caching for offline map viewing on high Himalayan trails.

---

## 15. Credits & License

- **Platform:** Wanderflow Travel Discovery & Itinerary Planner
- **License:** MIT
- **Year:** 2026
