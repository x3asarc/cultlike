# CULTURAL EVENTS PLATFORM — Master Prompt for Claude Code

**Version:** 1.0  
**Phase:** 1 (MVP Launch, 90 days)  
**Last Updated:** [Today's Date]  
**Project Status:** [SETUP PHASE - Database schema created, seed data loaded, quiz component in progress]

---

## CRITICAL: READ THIS FIRST

You are building a **Cultural Events Platform MVP** — a search engine for cultural events (theater, opera, concerts, comedy, art) that helps users discover events they'll actually love, and gives venues systematic feedback they can't get anywhere else.

**This is NOT a project to over-engineer.** Speed to MVP is the metric. **Phase 1 is 90 days.** Everything else (ML, white-label, API) is Phase 2/3 and explicitly feature-flagged. Don't build it yet.

**Your job:** Make it work for 1 city, with 50-100 events, and get users + venues loving it.

---

## PART 0: PROJECT OVERVIEW (Refresh Every Session)

### What You're Building (Phase 1)
- ✅ **Quiz Flow:** Location → Month → Event Type (floating fonts sized by event density)
- ✅ **Event List:** Filterable grid with radius slider, affiliate booking links
- ✅ **Event Detail Page:** Consistent template, SEO-optimized with schema.org markup
- ✅ **Venue Analytics Dashboard:** Basic free tier (attendance tracking, reviews)
- ✅ **User Signup:** Email-based auth, quiz responses stored
- ✅ **Reviews:** Post-event feedback (would attend again? + one sentence)
- ✅ **Blog/Content:** Templated venue guides (auto-generated from DB)

### What You're NOT Building (Phase 2/3)
- ❌ ML recommendations (Phase 2, Month 6+)
- ❌ Membership paywall (Phase 2, Month 3+)
- ❌ Community features (Phase 2, Month 7+)
- ❌ Mobile app (web-only)
- ❌ Multiple cities in parallel (one city deep first)
- ❌ Advanced error handling (ad-hoc for MVP, Sentry later)

### Revenue Streams (Phase 1: Launch with free product, monetization added Month 3)
1. **User Membership** ($9-19/mo) — Not active Month 1-2, ready by Month 3
2. **Venue Analytics** ($99-497/mo) — Free tier live, paid tier by Month 3
3. **Affiliate Commissions** (3-8% per booking) — Live from day 1

---

## PART 1: TECHNOLOGY STACK (Why Each Choice)

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Next.js 14+ (React) | SSR for SEO, API routes, Vercel-native |
| **Styling** | Tailwind CSS + Framer Motion | Rapid UI, animations for floating fonts |
| **Forms** | React Hook Form + Zod | Type-safe form handling, validation |
| **State** | Zustand | Simple global state (quiz responses, filters) |
| **Database** | Supabase (PostgreSQL) | Auth, realtime, storage, Edge Functions |
| **Auth** | Supabase Auth | Email magic links, session management |
| **Payments** | Stripe (Phase 2) | Subscriptions, invoicing |
| **Mapping** | OpenStreetMap + Leaflet | Free, open-source alternative to Google Maps |
| **Email** | Resend or SendGrid | Transactional emails (signups, reminders) |
| **Analytics** | Vercel Analytics + PostHog | User behavior tracking |
| **Deployment** | Vercel + GitHub | Auto-deploy on push, preview URLs |
| **Migrations** | Supabase CLI | `supabase migration add`, version controlled |
| **Feature Flags** | Custom context hook | Manage Phase 2/3 features without merging to main |

### Key Decisions
- **TypeScript:** Strict mode from day 1 (catch bugs early)
- **Testing:** Manual testing for MVP (no unit tests yet; structure in place for Month 2)
- **Error Handling:** Lightweight boundary component + Vercel error tracking (ad-hoc for now)
- **State Management:** Zustand for global state (quiz, auth), React Context for component-level

---

## PART 2: PROJECT STRUCTURE (Folder Layout)

```
cultural-events/
├── .docs/                          # ← All documentation
│   ├── MASTER_PROMPT.md            # ← YOU ARE HERE (update after each session)
│   ├── SESSION_LOG.md              # ← Log what you built this session
│   ├── architecture/
│   │   ├── overview.md             # System diagram, component hierarchy
│   │   ├── components.md           # Naming conventions, atomic structure
│   │   ├── routing.md              # Next.js pages/routes explained
│   │   └── data-flow.md            # How data moves through app
│   ├── database/
│   │   ├── schema.md               # All tables, fields, relationships
│   │   ├── migrations.md           # How to add/modify tables
│   │   └── seed.md                 # Seeding strategy and setup
│   ├── integrations/
│   │   ├── SUPABASE.md             # Quick ref + common operations
│   │   ├── NEXTJS.md               # Project-specific Next.js patterns
│   │   ├── VERCEL.md               # Deployment, env vars, preview URLs
│   │   ├── STRIPE.md               # Payment integration (Phase 2)
│   │   ├── EVENTBRITE_API.md       # API schema, rate limits, normalization
│   │   └── RESEND.md               # Email integration
│   ├── setup/
│   │   ├── environment.md          # All env vars, local vs production
│   │   ├── local-dev.md            # 5-minute setup guide
│   │   ├── database-setup.md       # Creating tables, RLS policies
│   │   └── seeding.md              # Running seed script, manual CSV upload
│   ├── features/
│   │   ├── 01_quiz-flow.md         # Location → Month → Type selection
│   │   ├── 02_event-listing.md     # Event grid + filtering + radius
│   │   ├── 03_event-detail.md      # Template page, schema.org markup
│   │   ├── 04_user-auth.md         # Email signup + Supabase Auth
│   │   ├── 05_reviews.md           # Post-event feedback
│   │   ├── 06_venue-dashboard.md   # Free tier analytics (Phase 2: paid)
│   │   ├── 07_blog-templates.md    # Auto-generated venue guides
│   │   └── FEATURE_FLAGS.md        # How Phase 2/3 features are gated
│   ├── patterns/
│   │   ├── error-handling.md       # Error boundary, Vercel tracking
│   │   ├── logging.md              # What to log, where, how
│   │   ├── accessibility.md        # A11y requirements
│   │   └── performance.md          # Optimization targets
│   └── review/
│       ├── CHECKLIST.md            # Pre-commit checklist
│       └── PERFORMANCE.md          # Metrics to watch
├── .claude-prompts/                # ← Reusable Claude Code prompts
│   ├── new-page.md                 # "Create a new event detail page"
│   ├── new-feature.md              # "Add feature flag for X"
│   ├── database-change.md          # "Add column to venues table"
│   ├── debug-issue.md              # "Help debug this error"
│   └── generate-seed.md            # "Generate seed data for 10 events"
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md    # PR template for reviewing code
│   └── workflows/
│       └── deploy.yml              # Optional: CI/CD pipeline
├── scripts/
│   ├── seed.ts                     # TypeScript seed data generator
│   ├── reset-db.ts                 # Wipe and reseed database
│   └── migrate.ts                  # Manual migration runner (optional)
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout (Zustand provider, error boundary)
│   │   ├── page.tsx                # Home page (landing)
│   │   ├── quiz/
│   │   │   └── page.tsx            # Quiz flow (location → month → type)
│   │   ├── events/
│   │   │   ├── page.tsx            # Event listing grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Event detail (single page)
│   │   ├── venues/
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Venue detail page (template-based)
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Venue analytics dashboard (free tier)
│   │   └── api/
│   │       ├── auth/               # Auth endpoints
│   │       ├── events/             # Event CRUD endpoints
│   │       ├── reviews/            # Review submission
│   │       ├── sync/               # Eventbrite API sync (manual trigger)
│   │       └── seed/               # Manual CSV upload endpoint (Phase 1.5)
│   ├── components/
│   │   ├── quiz/
│   │   │   ├── LocationStep.tsx    # Step 1: Pick location
│   │   │   ├── MonthStep.tsx       # Step 2: Pick month
│   │   │   ├── TypeStep.tsx        # Step 3: Pick event type
│   │   │   └── QuizProvider.tsx    # Zustand store for quiz state
│   │   ├── events/
│   │   │   ├── EventCard.tsx       # Single event card
│   │   │   ├── EventGrid.tsx       # Grid of events
│   │   │   ├── RadiusFilter.tsx    # Radius slider with map
│   │   │   └── EventSkeleton.tsx   # Loading state
│   │   ├── venue/
│   │   │   ├── VenueHero.tsx       # Header section
│   │   │   ├── VenueInfo.tsx       # Info cards (capacity, rating, events)
│   │   │   ├── EventsList.tsx      # Past/upcoming events
│   │   │   ├── ReviewsList.tsx     # User reviews
│   │   │   └── VenueSchema.tsx     # Schema.org markup component
│   │   ├── ui/
│   │   │   ├── Button.tsx          # Reusable button
│   │   │   ├── Card.tsx            # Reusable card
│   │   │   ├── Modal.tsx           # Modal/dialog
│   │   │   └── ...                 # Other primitives
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Navigation
│   │   │   ├── Footer.tsx          # Footer
│   │   │   └── ErrorBoundary.tsx   # React error boundary
│   │   └── forms/
│   │       ├── LoginForm.tsx       # Email signup
│   │       └── ReviewForm.tsx      # Post-event review
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client + helpers
│   │   ├── zustand.ts              # Zustand stores (quiz state, auth)
│   │   ├── api.ts                  # API call helpers (with error handling)
│   │   ├── utils.ts                # Utility functions (dates, formatting, etc.)
│   │   ├── constants.ts            # App-wide constants
│   │   ├── hooks.ts                # Custom React hooks
│   │   ├── types.ts                # TypeScript interfaces/types
│   │   └── validators.ts           # Zod schemas for form validation
│   ├── styles/
│   │   ├── globals.css             # Global styles + Tailwind
│   │   └── animations.css          # Framer Motion animation definitions
│   └── middleware.ts               # Next.js middleware (auth check, etc.)
├── public/
│   └── images/                     # Static images
├── .env.example                    # Template for env vars
├── .env.local                      # Local env vars (DO NOT COMMIT)
├── next.config.js                  # Next.js config
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies
├── README.md                        # Project overview for new developers
└── git.workflow.md                 # ← HOW TO MANAGE VERSIONS (see below)
```

---

## PART 3: GIT & DEPLOYMENT WORKFLOW (Version Management)

### Why This Matters
You want to save "versions" of your code so you can deploy Version 4 instead of Version 5 if you prefer it.

### Strategy: Git Tags + Semantic Versioning

```bash
# After completing a feature set (or fixing a bug), tag it:
git tag v1      # "Happy with this state - ready to deploy"
git tag v2      # "Made improvements - ready to deploy"
git tag v3      # "Oops, broke something - revert to v2"
git tag v4      # "Fixed it"

# Push tags to GitHub:
git push origin --tags

# To deploy Version 4 instead of main:
# In Vercel dashboard:
# - Go to Project Settings → Git
# - Change deploy branch from "main" to "v4"
# - Wait for deploy to complete
```

**In GitHub:**
```bash
# See all versions:
git tag -l

# Checkout an old version to review:
git checkout v2

# View what changed between versions:
git log v2..v4 --oneline
```

**Your Workflow:**
1. Build feature in `main` branch
2. Test locally (`npm run dev`)
3. **When happy:** `git tag v{X}`
4. Push to GitHub: `git push origin --tags`
5. In Vercel: Switch deploy to `v{X}` if you want to deploy that version
6. Continue building in `main` for next features

This gives you **version control + deploy flexibility** without branches.

---

## PART 4: DATABASE SCHEMA (Quick Reference)

### Master Data (Populate once, update rarely)
```sql
-- Locations (cities/neighborhoods where events happen)
CREATE TABLE locations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  lat FLOAT, long FLOAT,
  event_count INT DEFAULT 0  -- Updated by trigger
);

-- Event Types (theater, opera, concert, etc.)
CREATE TABLE event_types (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  event_count INT DEFAULT 0  -- Updated by trigger
);

-- Months (for step 2 of quiz)
CREATE TABLE months (
  id INT PRIMARY KEY,  -- 1-12
  name TEXT NOT NULL,
  event_count INT DEFAULT 0  -- Updated by trigger
);
```

### Core Tables
```sql
-- Users (signup + quiz responses)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  quiz_responses JSONB,  -- { era, venue_size, budget, genres, discovery_mode }
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP
);

-- Venues (theaters, concert halls, comedy clubs)
CREATE TABLE venues (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  location_id UUID REFERENCES locations(id),
  type TEXT,  -- "theater", "concert_hall", etc.
  capacity INT,
  address TEXT,
  city TEXT,
  lat FLOAT, long FLOAT,
  website TEXT, phone TEXT,
  avg_rating FLOAT DEFAULT 0,
  total_reviews INT DEFAULT 0,
  created_at TIMESTAMP
);

-- Events (individual shows/performances)
CREATE TABLE events (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  venue_id UUID NOT NULL REFERENCES venues(id),
  type_id UUID NOT NULL REFERENCES event_types(id),
  location_id UUID NOT NULL REFERENCES locations(id),
  date DATE NOT NULL,
  time TIME,
  price DECIMAL(10,2),
  description TEXT,
  ticket_url TEXT,  -- Affiliate link (Eventbrite, Ticketmaster, etc.)
  source TEXT,  -- "manual", "eventbrite", "ticketmaster", etc.
  created_at TIMESTAMP
);

-- Reviews (post-event feedback)
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  event_id UUID NOT NULL REFERENCES events(id),
  would_attend_again BOOLEAN NOT NULL,
  review_text TEXT,
  rating INT,  -- 1-5 stars
  created_at TIMESTAMP
);
```

### Key Relationships
```
Location → Events (many events per location)
Event Type → Events (many events per type)
Venue → Events (many events per venue)
User → Reviews (many reviews per user)
Event → Reviews (many reviews per event)
```

### Triggers (Auto-Update Counts)
```sql
-- When new event added, update event_type.event_count
-- When new event added, update location.event_count
-- When new event added, update month.event_count (extract MONTH from date)
-- When new review added, update venue.avg_rating, total_reviews
```

**Full schema docs:** See `.docs/database/schema.md`

---

## PART 5: FEATURE FLAGS (Phase 2/3 Management)

### Why You Need This
Phase 2 features (recommendations, memberships) will be built in Phase 1, but hidden behind flags. This lets Claude Code add Phase 2 features without breaking Phase 1.

### Pattern (Simple Context Hook)

```typescript
// lib/useFeatureFlags.ts
const featureFlags = {
  RECOMMENDATIONS: false,        // Phase 2, Month 6
  MEMBERSHIP_PAYWALL: false,     // Phase 2, Month 3
  VENUE_ANALYTICS_PAID: false,   // Phase 2, Month 3
  COMMUNITY_FEATURES: false,     // Phase 3, Month 7
  INFLUENCER_PROGRAM: false,     // Phase 3, Month 9
};

export const useFeatureFlags = () => featureFlags;
```

### Usage in Components

```typescript
import { useFeatureFlags } from '@/lib/useFeatureFlags';

export function EventCard({ event }) {
  const flags = useFeatureFlags();

  return (
    <div>
      <h3>{event.title}</h3>
      
      {/* Phase 1: Always visible */}
      <button>View Details</button>
      
      {/* Phase 2: Hidden until RECOMMENDATIONS is true */}
      {flags.RECOMMENDATIONS && (
        <p>✨ Recommended for you based on your taste</p>
      )}
      
      {/* Phase 2: Hidden until MEMBERSHIP_PAYWALL is true */}
      {flags.MEMBERSHIP_PAYWALL && (
        <PremiumFeature />
      )}
    </div>
  );
}
```

### When You're Ready for Phase 2
```typescript
// Flip the switch (1 line)
RECOMMENDATIONS: true,  // Now visible to all users
```

**No refactoring. No deleting code. Just flip a boolean.**

See `.docs/features/FEATURE_FLAGS.md` for full pattern.

---

## PART 6: SEEDING DATA (How to Populate Events)

### Phase 1a: TypeScript Seed File (Week 1)

```bash
# Generate seed script
npm run generate-seed

# This creates scripts/seed.ts with 50 mock events
npm run seed:events

# Database now has:
# - 5 Locations
# - 10 Event Types
# - 50 Events spread across them
# - Triggers auto-calculate counts
```

See `scripts/seed.ts` for exact format.

### Phase 1b: Manual CSV Upload (Week 2)

Once you're happy with structure, add CSV upload endpoint:

```typescript
// src/app/api/seed/upload route
POST /api/seed/upload
Body: FormData with CSV file

CSV format:
title,venue_name,type,date,price,location,ticket_url
Hamilton,Richard Rodgers Theatre,theater,2025-03-15,75,Downtown,https://eventbrite.com/...
Swan Lake,Lincoln Center,ballet,2025-03-20,95,Midtown,https://...
```

This lets you **manually add events** without code changes.

See `.docs/setup/seeding.md` for step-by-step.

---

## PART 7: COMMON TASKS (Copy/Paste Into Claude Code)

### Task 1: "Create a new page for [feature]"
```markdown
Use this prompt in Claude Code:

I need to create a new page for [feature name].
Location: /src/app/[route]/page.tsx

Requirements:
- TypeScript strict mode
- Use Supabase for data fetching (see /src/lib/supabase.ts)
- Style with Tailwind CSS
- Add to sitemap automatically (next-sitemap handles this)
- Include SEO meta tags (title, description, canonical)
- [Any specific UI requirements]

Follow the pattern in /src/app/events/page.tsx for reference.
```

### Task 2: "Add a new column to the venues table"
```markdown
I need to add a new field to venues table.

New field: [field_name]
Type: [TEXT, INT, BOOLEAN, etc.]
Why: [Brief explanation]

Steps:
1. Create migration: npx supabase migration add [field_name]_venues
2. Add field to table definition
3. Update /src/lib/types.ts (Venue interface)
4. Update /src/lib/supabase.ts queries that fetch venues
5. Test locally: npx supabase db reset && npm run seed:events

Then provide migration SQL for me to run.
```

### Task 3: "Debug why [feature] isn't working"
```markdown
[Feature] is broken.

Expected: [What should happen]
Actual: [What's happening instead]
Steps to reproduce: [How to trigger the bug]

Please:
1. Check /src/lib/supabase.ts for query issues
2. Check Zustand store state (useQuizStore)
3. Check API response format
4. Suggest TypeScript or logic errors

I can run `npm run dev` and check browser console if you need.
```

### Task 4: "Generate 20 more seed events for [type] in [location]"
Use prompt: `.claude-prompts/generate-seed.md`

---

## PART 8: KEY FILES YOU'LL MODIFY OFTEN

### Edit These Weekly
- `src/components/` — Adding new components
- `src/app/` — New pages
- `.docs/SESSION_LOG.md` — Log what you built this session
- `.docs/MASTER_PROMPT.md` — Update project status, completed features

### Edit Rarely
- `src/lib/types.ts` — Only when schema changes
- `src/lib/supabase.ts` — Only when adding new queries
- `next.config.js` — Only for new middleware
- `tsconfig.json` — Only for new path aliases

### Never Edit (Claude Code Generates)
- `package.json` — Ask Claude Code to add deps, don't edit manually
- `.env.local` — Secrets only, generated from `.env.example`
- `node_modules/` — Auto-generated

---

## PART 9: INTEGRATION QUICK REFERENCES

### Supabase (Database + Auth)
**Quick commands:**
```bash
# Start local Supabase
npx supabase start

# Create migration
npx supabase migration add table_name

# Reset DB to fresh schema
npx supabase db reset

# View data in local console
http://localhost:54323 (Supabase Studio)
```

**Common queries (see `.docs/integrations/SUPABASE.md`):**
```typescript
import { createClient } from '@/lib/supabase';

const supabase = createClient();

// Fetch events for quiz results
const { data, error } = await supabase
  .from('events')
  .select('*')
  .eq('location_id', locationId)
  .eq('type_id', typeId);

// Insert review
const { error } = await supabase
  .from('reviews')
  .insert([{ user_id, event_id, would_attend_again, review_text }]);
```

**Auth:**
```typescript
// User signup (magic link)
const { error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: { emailRedirectTo: `${location.origin}/auth/callback` },
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Logout
await supabase.auth.signOut();
```

**Full guide:** `.docs/integrations/SUPABASE.md`

---

### Next.js (Routing, API Routes, SSR)
**Project structure:**
```
src/app/
├── page.tsx              → /
├── quiz/page.tsx         → /quiz
├── events/page.tsx       → /events
├── events/[slug]/page.tsx → /events/:slug
├── venues/[slug]/page.tsx → /venues/:slug
└── api/
    ├── events.ts         → POST /api/events
    ├── reviews.ts        → POST /api/reviews
    └── sync/index.ts     → GET /api/sync (manual Eventbrite sync)
```

**Generate meta tags (SEO):**
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Name — Cultural Events Platform',
  description: 'Discover and book this event. Reviews from attendees.',
  canonical: 'https://yoursite.com/events/event-slug',
};
```

**Fetch data server-side (SSR):**
```typescript
async function getEvent(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

export default async function EventPage({ params }) {
  const event = await getEvent(params.slug);
  return <div>{event.title}</div>;
}
```

**Full guide:** `.docs/integrations/NEXTJS.md`

---

### Vercel (Deployment)
**Deploy workflow:**
```bash
1. Push to GitHub
2. Vercel auto-deploys from main branch
3. Get preview URL (shows in GitHub PR)
4. When happy, version it: git tag v{N}
5. In Vercel settings, deploy from tag v{N} if you prefer old version
```

**Environment variables:**
- Create in Vercel dashboard under Project Settings → Environment Variables
- Or set in `.env.local` for local development
- Variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.

**Full guide:** `.docs/integrations/VERCEL.md`

---

### Zustand (State Management)
**Create a store:**
```typescript
// lib/stores/quizStore.ts
import { create } from 'zustand';

interface QuizState {
  location: string | null;
  month: number | null;
  type: string | null;
  setLocation: (id: string) => void;
  setMonth: (num: number) => void;
  setType: (id: string) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  location: null,
  month: null,
  type: null,
  setLocation: (id) => set({ location: id }),
  setMonth: (num) => set({ month: num }),
  setType: (id) => set({ type: id }),
  reset: () => set({ location: null, month: null, type: null }),
}));
```

**Use in component:**
```typescript
export function QuizFlow() {
  const { location, setLocation } = useQuizStore();
  return <button onClick={() => setLocation('loc_001')}>Select Location</button>;
}
```

**Full guide:** `.docs/integrations/ZUSTAND.md`

---

## PART 10: BEFORE YOU COMMIT (Checklist)

**Run these before pushing to GitHub:**

```bash
# 1. TypeScript compiles
npm run type-check

# 2. No console errors
npm run dev  # Test in browser, check console

# 3. Format code
npm run format

# 4. Mobile responsive
Resize browser to 375px width, test all pages

# 5. SEO tags present
Inspect page source, see <title>, <meta name="description">

# 6. Supabase queries work
Check Network tab in DevTools, see successful API calls

# 7. No hardcoded secrets
Grep codebase for passwords, API keys, tokens
```

Full checklist: `.docs/review/CHECKLIST.md`

---

## PART 11: SESSION WORKFLOW (Start & End Each Session)

### At Start of Session (5 minutes)
1. **Read SESSION_LOG.md** — What did you build last session?
2. **Read MASTER_PROMPT.md (this file)** — Any updates to phase, status?
3. **Check current branch** — `git status`
4. **Start local dev** — `npm run dev`
5. **Open Supabase Studio** — `http://localhost:54323` (check DB state)

### During Session
1. **Build one feature** (not 5 at once)
2. **Test locally** (`npm run dev` + manual browser testing)
3. **Commit often** — `git add . && git commit -m "feat: add location step to quiz"`

### At End of Session (10 minutes)
1. **Log what you did** — Update `.docs/SESSION_LOG.md`
2. **Update MASTER_PROMPT.md** — Change "Project Status:" to reflect completed work
3. **Tag version if happy** — `git tag v{N}`
4. **Push to GitHub** — `git push origin main && git push origin --tags`
5. **Note blockers** — If stuck, document in SESSION_LOG so next session knows

### Session Log Template
```markdown
## Session {Date}

### Completed
- ✅ Feature: [feature name]
  - What it does: [brief]
  - Files touched: src/app/quiz/page.tsx, src/components/LocationStep.tsx
  - Tested: Yes, works locally

### Blockers
- [If any issues encountered]

### Next Steps
- [ ] [What to build next session]

### Notes
- [Any gotchas, patterns, decisions made]
```

---

## PART 12: WHEN YOU'RE STUCK

### "TypeScript error I don't understand"
→ Google the error + "typescript" + search in codebase  
→ Post error + relevant code in `.docs/SESSION_LOG.md` and ask Claude Code next session

### "Supabase query returns undefined"
→ Check Network tab (DevTools) — is API call being made?  
→ Check Supabase RLS policies — restricting data?  
→ Run query in Supabase Studio console — does data exist?  
→ See `.docs/integrations/SUPABASE.md` for debugging steps

### "Page doesn't show data after adding new field"
→ Did you update `types.ts`?  
→ Did you migrate the DB?  
→ Did you run `npm run seed:events` to reseed?  
→ Hardest bugs are missing migrations — check `.docs/database/migrations.md`

### "Something works locally but not on Vercel"
→ Almost always env vars  
→ Check Vercel Settings → Environment Variables  
→ Make sure all Supabase keys are set  
→ See `.docs/integrations/VERCEL.md`

---

## PART 13: PHASE 2/3 THINKING (For Context Only)

**Don't build this yet.** But you'll see comments in code like:

```typescript
// PHASE 2: ML recommendations
// if (useFeatureFlags().RECOMMENDATIONS) {
//   const recs = await getRecommendations(userId);
//   return <RecommendationsList recs={recs} />;
// }
```

When Phase 2 starts (Month 6), you'll:
1. Flip `RECOMMENDATIONS: true` in featureFlags
2. Build the recommendation engine (hidden from Phase 1 code)
3. Deploy with no Phase 1 changes

This is your roadmap in code form.

---

## PART 14: FINAL REMINDERS

1. **Speed > Perfection** — Ship rough, iterate fast
2. **One feature per session** — Avoid scope creep
3. **Test in browser** — Don't trust "it compiled" as proof it works
4. **Commit small** — Makes debugging easier
5. **Ask Claude Code specific questions** — "Help with X" vs "Build X"
6. **Log your sessions** — Future you will thank present you
7. **Phase 1 is MVP only** — Don't over-engineer
8. **Deploy often** — Tag versions, experiment with deployment

---

## FILES YOU REFERENCE OFTEN

| What | Where |
|------|-------|
| Database schema | `.docs/database/schema.md` |
| Feature progress | `.docs/SESSION_LOG.md` |
| Supabase quick ref | `.docs/integrations/SUPABASE.md` |
| Component patterns | `.docs/architecture/components.md` |
| Pre-commit checklist | `.docs/review/CHECKLIST.md` |
| Type definitions | `src/lib/types.ts` |
| Zustand stores | `src/lib/zustand.ts` |
| Supabase queries | `src/lib/supabase.ts` |

---

**Good luck. Build fast. This will be great.**
