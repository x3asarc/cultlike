# ARCHITECTURE OVERVIEW

## System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     BROWSER (User)                       │
├─────────────────────────────────────────────────────────┤
│  React Components (Next.js App Router)                  │
│  ├── Quiz Flow (Location → Month → Type)                │
│  ├── Event Listing (Grid + Filters)                     │
│  ├── Event Detail Page (Template-based)                 │
│  └── Venue Dashboard (Analytics)                        │
│                                                          │
│  State Management (Zustand)                             │
│  ├── quizStore (location, month, type)                  │
│  ├── authStore (user, token)                            │
│  └── filterStore (radius, sorting)                      │
└──────────────┬──────────────────────────────────────────┘
               │ HTTP / WebSocket
               ▼
┌─────────────────────────────────────────────────────────┐
│         VERCEL (Next.js Backend)                        │
├─────────────────────────────────────────────────────────┤
│  API Routes (/api/*)                                    │
│  ├── /api/events          → GET events, POST filters    │
│  ├── /api/reviews         → POST new review             │
│  ├── /api/auth            → Supabase Auth bridge        │
│  ├── /api/sync            → Manual Eventbrite sync      │
│  └── /api/seed            → CSV upload endpoint         │
│                                                          │
│  Server-Side Rendering (SSR)                           │
│  ├── Event detail pages (SEO)                           │
│  ├── Venue detail pages (schema.org markup)             │
│  └── Blog/venue guides (auto-generated)                 │
└──────────────┬──────────────────────────────────────────┘
               │ HTTPS
               ▼
┌─────────────────────────────────────────────────────────┐
│     SUPABASE (Postgres Database + Auth)                 │
├─────────────────────────────────────────────────────────┤
│  Tables:                                                │
│  ├── users              → Email, quiz responses         │
│  ├── locations          → Cities/neighborhoods          │
│  ├── event_types        → Theater, opera, concert       │
│  ├── venues             → Theaters, concert halls       │
│  ├── events             → Individual shows              │
│  ├── reviews            → User feedback                 │
│  ├── months             → January-December             │
│  └── event_count_* (views) → Aggregates for quiz       │
│                                                          │
│  Auth:                                                  │
│  ├── Magic link signup/signin                           │
│  ├── Session management (JWT)                           │
│  └── Row-Level Security (RLS) policies                  │
│                                                          │
│  Storage:                                               │
│  ├── Event images                                       │
│  ├── Venue photos                                       │
│  └── Blog post assets                                   │
│                                                          │
│  Edge Functions (Serverless):                           │
│  ├── Daily Eventbrite sync (cron)                       │
│  └── Review sentiment analysis (webhook)                │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────┐
│     EXTERNAL INTEGRATIONS                               │
├─────────────────────────────────────────────────────────┤
│  ├── Eventbrite API      → Event data sync              │
│  ├── Ticketmaster API    → Ticketed events              │
│  ├── Affiliate links     → Eventbrite, Ticketmaster     │
│  ├── Resend/SendGrid     → Email notifications          │
│  ├── Vercel Analytics    → User behavior tracking       │
│  └── PostHog             → Product events (optional)    │
└─────────────────────────────────────────────────────────┘
```

---

## DATA FLOW (Quiz Example)

```
User opens app
  ↓
App queries: SELECT * FROM locations WHERE active=true
  ↓
Render 5 floating fonts (sized by event_count)
  ↓
User clicks "Downtown"
  ↓
Store in Zustand: quizStore.setLocation('loc_001')
  ↓
Query months: SELECT * FROM months WHERE event_count > 0 AND location_id='loc_001'
  ↓
Render month grid (sized by event_count for that location)
  ↓
User clicks "March"
  ↓
Store in Zustand: quizStore.setMonth(3)
  ↓
Query types: SELECT type_id, COUNT(*) FROM events 
             WHERE location_id='loc_001' AND MONTH(date)=3
  ↓
Render type grid (sized by event_count)
  ↓
User clicks "Theater"
  ↓
Store in Zustand: quizStore.setType('type_001')
  ↓
Query results: SELECT * FROM events 
               WHERE location_id='loc_001' 
               AND MONTH(date)=3 
               AND type_id='type_001'
  ↓
Render event list grid with results
  ↓
User applies radius filter (turf.js geospatial)
  ↓
Filter results client-side by distance
  ↓
User clicks event → Navigate to detail page
  ↓
Server-side render event detail (SSR for SEO)
  ↓
Fetch related reviews from Supabase
  ↓
Display with schema.org markup (Google rich snippet)
```

---

## Component Hierarchy (Atomic Design)

```
Page (src/app/*/page.tsx)
├── Layout (Header, Footer)
├── Hero/Section (Context-specific)
└── Components
    ├── Quiz Components
    │   ├── LocationStep
    │   │   ├── FloatingText (Atom)
    │   │   └── FloatingGrid (Molecule)
    │   ├── MonthStep
    │   │   ├── MonthCard (Atom)
    │   │   └── MonthGrid (Molecule)
    │   └── TypeStep
    │       ├── TypeBubble (Atom)
    │       └── TypeGrid (Molecule)
    │
    ├── Event Components
    │   ├── EventCard (Molecule)
    │   │   ├── EventImage (Atom)
    │   │   ├── EventTitle (Atom)
    │   │   ├── EventMeta (Atom)
    │   │   └── EventPrice (Atom)
    │   ├── EventGrid (Organism)
    │   │   └── EventCard (Molecule) × N
    │   └── EventDetail (Organism)
    │       ├── EventHero
    │       ├── EventInfo
    │       ├── ReviewsList
    │       └── BookButton
    │
    └── Shared Components
        ├── Button (Atom)
        ├── Card (Atom)
        ├── Form (Molecule)
        ├── Modal (Organism)
        ├── Header (Organism)
        └── ErrorBoundary (Organism)
```

---

## State Management Strategy

### Global State (Zustand)
```typescript
// Quiz state (needed across multiple pages)
useQuizStore
├── location: string | null
├── month: number | null
├── type: string | null
└── actions: setLocation(), setMonth(), setType(), reset()

// Auth state (needed everywhere)
useAuthStore
├── user: User | null
├── isLoading: boolean
└── actions: login(), logout(), signup()

// UI state (needed across components)
useUIStore
├── isMobileMenuOpen: boolean
├── isFiltersPanelOpen: boolean
└── actions: toggleMenu(), toggleFilters()
```

### Component-Level State (React useState)
```typescript
// Only use useState for local component concerns:
// - Form inputs
// - Toggles
// - Temporary UI state (loading, errors)

const [formData, setFormData] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState(null);
```

---

## Rendering Strategy

### Server-Side Rendering (SSR) — For SEO
- Event detail pages (`/events/[slug]`)
- Venue detail pages (`/venues/[slug]`)
- Blog/venue guides

**Why:** Google needs to see `<title>`, `<meta>` tags, and schema.org markup in HTML.

```typescript
// src/app/events/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const event = await fetchEvent(params.slug); // Server-side
  return {
    title: `${event.title} — Cultural Events`,
    description: event.description,
    openGraph: { ... }
  };
}

export default async function EventPage({ params }) {
  const event = await fetchEvent(params.slug);
  return <EventDetail event={event} />; // Rendered on server
}
```

### Client-Side Rendering (CSR) — For Interactivity
- Quiz flow (clicks, state changes)
- Filters (radius slider)
- Forms (signup, review)

```typescript
// src/app/quiz/page.tsx
'use client'; // Mark as client component

export default function QuizPage() {
  const { location, setLocation } = useQuizStore();
  return (
    <LocationStep 
      selected={location}
      onSelect={setLocation}
    />
  );
}
```

---

## Error Boundaries

```
App Root
└── ErrorBoundary (catches React errors)
    ├── Header
    ├── Layout
    │   └── Page-specific ErrorBoundary
    │       └── Page content
    └── Footer
```

When error occurs:
1. React Error Boundary catches it
2. Shows fallback UI (nice message instead of white screen)
3. Logs to Vercel/Sentry (later, Phase 2)
4. User can still navigate

See `.docs/patterns/error-handling.md`

---

## Performance Targets

- Quiz page load: < 1s
- Event list render: < 2s
- Event detail page: < 1.5s (SSR helps)
- Mobile interactive: < 2.5s
- Lighthouse score: > 90

Measured via Vercel Analytics + Lighthouse CI

---

## Deployment Flow

```
Code change in main branch
  ↓
Push to GitHub
  ↓
Vercel auto-builds
  ↓
Preview URL generated (shared in PR)
  ↓
When happy: git tag v{N}
  ↓
Option A: Deploy main (latest code)
Option B: Deploy v{N} (old version you prefer)
  ↓
Vercel switches to that ref
  ↓
Live on production
```

See `.docs/integrations/VERCEL.md`
