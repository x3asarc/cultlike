# CULTURAL EVENTS PLATFORM — Complete Build Guide
## The Business Idea, Tech Stack, & 90-Day Roadmap (Merged)

---

## PART 0: THE TLDR (What You're Actually Building)

You're building a **search engine for cultural events** (not a marketplace). Think of it like Spotify for discovering live culture—theater, opera, concerts, comedy, art. Users find events they'll actually love (not just browse all 10,000 generic listings), venues get systematic feedback they literally can't get anywhere else, and you make money through three channels: user memberships, venue analytics, and affiliate commissions.

**Why this wins:**
- You're not competing on supply (events are everywhere). You're competing on *taste* and *intelligence*.
- Every user review teaches your system. Every venue partnership deepens your data moat.
- By Month 12, you have proprietary data on what makes cultural experiences transcendent—worth $20-50M.

---

## PART 1: THE BUSINESS MODEL (Three Revenue Streams in Parallel)

### Stream 1: User Membership ($9-19/mo, 3-5% conversion)

**Free Tier:**
- Browse all events, basic filters (location, date, activity type)
- See recommendations (powered by your quiz)

**Premium Tier ($9-19/mo):**
- Unlimited personalized recommendations (Spotify for events)
- Early ticket access (24-48 hours before public) — IF you negotiate with venues
- Member-only exclusive events (1-2/month in-person culture club)
- Discount codes (10-20% off partner venues)
- Smart calendar feature ("Here are events we think you'll love next Friday")
- Ad-free experience

**Why This Works:** By Month 6, when you have 5,000+ reviews, your quiz-based recommendations are so good that people pay for "unlimited."

---

### Stream 2: Venue Analytics Suite ($99-497/mo, 10-15% venue adoption)

**Why Venues Need This:**
"Why did 100 people buy tickets but only 60 showed up?" "Which shows get word-of-mouth vs. need promotion?" "How do I reach out-of-towners vs. locals?"

These are problems venues can't solve anywhere.

**What You Charge For:**
- Real-time attendance tracking + no-show analysis
- Attendee demographics (age, location, return frequency)
- Sentiment analysis of reviews (why people loved it or didn't)
- Competitor benchmarking (how your event stacks up)
- Predictive recommendations ("Based on feedback, try X next month")

**Margin:** ~90% (fully automated). Huge.

**Strategy:** Free tier (basic listing + basic analytics) → Upgrade to Pro ($99-497/mo) based on case studies.

---

### Stream 3: Affiliate + Partnership Revenue

- **Affiliate commissions:** 3-8% per booking when you link to Eventbrite/Ticketmaster
- **Hotel widget revenue share:** 5-15% commission (hotels embed your widget, you get bookings)
- **Tourism board white-label:** $2-5K/mo per city (they get your platform under their branding)
- **Year 2 additions:** API access ($500-5K/mo), experiential packages ($1,500-3K per person), influencer commission (20% per referral)

**Expected Month 12 Revenue Breakdown:**
- Memberships: $8,000
- Venue Analytics: $15,000
- Affiliates: $12,000
- Partnerships: $2,000
- **Total: $37,000 MRR** ($444K annual)

---

## PART 2: THE DATA ARCHITECTURE (Critical for Your Requirements)

### Phase 1: Static Lists (Weeks 1-4)

**Start here.** Before APIs, before complexity, you need a single source of truth.

Create three core lists in Airtable or Supabase:

#### List 1: Locations (Master Data)
```
| Location ID | Name       | City   | Lat/Long  | Venue Count | Active |
|-------------|------------|--------|-----------|-------------|--------|
| loc_001    | Downtown   | Paris  | 48.8, 2.3 | 12         | Yes    |
| loc_002    | Marais     | Paris  | 48.8, 2.3 | 8          | Yes    |
| loc_003    | Montmartre | Paris  | 48.8, 2.3 | 5          | Yes    |
```

#### List 2: Event Types (Master Data)
```
| Type ID | Name       | Icon  | Parent Category | Event Count | Active |
|---------|------------|-------|-----------------|-------------|--------|
| type_001| Theater    | 🎭    | Performing Arts | 24         | Yes    |
| type_002| Opera      | 🎵    | Performing Arts | 8          | Yes    |
| type_003| Comedy     | 😂    | Performing Arts | 15         | Yes    |
| type_004| Concert    | 🎸    | Music           | 30         | Yes    |
```

#### List 3: Months (Static Reference)
```
| Month ID | Name      | Event Count | Season       |
|----------|-----------|-------------|--------------|
| month_01 | January   | 45         | Winter       |
| month_02 | February  | 38         | Winter       |
...
| month_12 | December  | 120        | Holiday      |
```

**Why This Matters:** Your quiz (Step 1: Pick Location → Step 2: Pick Month → Step 3: Pick Type) pulls FROM these lists. When you add the 6th location, it automatically appears on the screen. Zero code changes.

---

### Phase 2: Static Event Listings (Weeks 2-4)

Manually create 50-100 events in Airtable/Supabase:

```
| Event ID | Title      | Venue ID | Type ID | Date       | Price | Location ID | 
|----------|------------|----------|---------|------------|-------|-------------|
| ev_001  | Hamilton   | ven_012  | type_001| 2025-03-15 | €45   | loc_001    |
| ev_002  | Swan Lake  | ven_005  | type_005| 2025-03-20 | €60   | loc_002    |
```

**Important:** Each event links to Location, Type, AND Month. This allows filtering at every stage of your quiz.

---

### Phase 3: Dynamic APIs (Month 2+)

**Only after you have 50-100 working static events, layer in APIs:**

- Eventbrite API (biggest event source)
- Ticketmaster API (ticketed events)
- Local tourism board feeds (official events)
- Facebook Events API (community events)

**Data Ingestion Strategy:**
1. Create Supabase Edge Function that calls Eventbrite API (once daily)
2. Normalize API events to match your schema (Title, Venue, Type, Date, Price, Location)
3. Insert into Events table (deduplicate to avoid doubles)
4. Types and Locations from API auto-map to your master lists (or create new entries)

**The Beauty:** Your quiz still works the same way. It pulls from Lists 1, 2, 3. Those lists now include both manual entries AND API-fetched data. Zero UI changes.

---

## PART 3: THE FRONTEND ARCHITECTURE (Quiz + Event Pages)

### The Quiz Flow (Auto-Populating)

**Step 1: Location**
```
Frontend queries:
SELECT name, venue_count FROM locations WHERE active = true ORDER BY venue_count DESC

Renders floating fonts sized by venue_count
Each font is a clickable link that stores user choice
```

**Step 2: Month** (After location selected)
```
Frontend queries:
SELECT name, event_count FROM months WHERE active = true ORDER BY event_count DESC

Filters to only show months with events in selected location
Floating fonts sized by event_count for that location
```

**Step 3: Type** (After location + month selected)
```
Frontend queries:
SELECT type.name, COUNT(events) as count 
FROM event_types type
JOIN events e ON e.type_id = type.id
WHERE e.location_id = ? AND EXTRACT(MONTH FROM e.date) = ?
ORDER BY count DESC

Floating fonts sized by count
```

**Step 4: Results**
```
Query all events matching [location, month, type]
Display as filterable grid with radius slider
Each event links to detail page
```

### Venue Detail Page (Template-Based with Liquid)

**Create ONE template** (`/pages/venues/[venue-slug].jsx`) that fills dynamically:

```liquid
---
layout: base.liquid
title: "{{ venue.name }} — {{ venue.type }} in {{ venue.city }}"
seo_title: "{{ venue.name }} | Live Events in {{ venue.city }}"
seo_description: "{{ venue.capacity }}-seat {{ venue.type }} featuring {{ event_count }} events this year. Reviews, tickets, directions. Discover {{ venue.name }} on Cultural Events."
canonical: "{{ site.url }}/venues/{{ venue.slug }}"
schema_type: "TheaterEvent"  # For Google Events rich snippets
---

<div class="venue-hero">
  <h1>{{ venue.name }}</h1>
  <p class="subtitle">{{ venue.type }} • {{ venue.neighborhood }}, {{ venue.city }}</p>
</div>

<section class="venue-overview">
  <div class="info-grid">
    <div class="info-card">
      <h3>Capacity</h3>
      <p>{{ venue.capacity }} seats</p>
    </div>
    <div class="info-card">
      <h3>Events This Year</h3>
      <p>{{ event_count }}</p>
    </div>
    <div class="info-card">
      <h3>Average Rating</h3>
      <p>{{ venue.avg_rating }}/5.0</p>
    </div>
  </div>
</section>

<section class="recent-events">
  <h2>Upcoming Events at {{ venue.name }}</h2>
  {% for event in venue.upcoming_events limit:6 %}
    <div class="event-card">
      <h3>{{ event.title }}</h3>
      <p>{{ event.date | date: "%B %d, %Y" }} at {{ event.time }}</p>
      <p class="price">${{ event.price }}</p>
      <a href="{{ event.ticket_url }}" class="btn-book">Get Tickets</a>
    </div>
  {% endfor %}
</section>

<section class="past-events">
  <h2>What Visitors Loved About {{ venue.name }}</h2>
  {% for event in venue.past_events limit:10 %}
    <div class="past-event">
      <h4>{{ event.title }} ({{ event.date | date: "%B %Y" }})</h4>
      <p class="attendance">{{ event.attendance_count }} people attended</p>
      <p class="rating">⭐ {{ event.avg_rating }}/5.0</p>
      <div class="reviews">
        {% for review in event.reviews limit:3 %}
          <blockquote>{{ review.text }}</blockquote>
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</section>

<section class="visitor-insights">
  <h2>Visitor Demographics</h2>
  <p>Based on {{ total_reviews }} reviews from people who attended:</p>
  {% for demo in venue.demographics %}
    <p>{{ demo.label }}: {{ demo.percentage }}%</p>
  {% endfor %}
</section>

<section class="contact">
  <h3>Directions & Info</h3>
  <p>{{ venue.address }}</p>
  <div class="map" id="map-{{ venue.id }}"></div>
  <p>{{ venue.phone }}</p>
  <p><a href="{{ venue.website }}">Visit Website</a></p>
</section>

<!-- Schema.org markup for Google rich snippets -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TheaterEvent",
  "name": "{{ venue.name }}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{ venue.street }}",
    "addressLocality": "{{ venue.city }}",
    "postalCode": "{{ venue.postal_code }}",
    "addressCountry": "FR"
  },
  "location": {
    "@type": "Place",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": {{ venue.lat }},
      "longitude": {{ venue.long }}
    }
  },
  "capacity": {{ venue.capacity }},
  "events": [
    {% for event in venue.upcoming_events limit:5 %}
    {
      "@type": "Event",
      "name": "{{ event.title }}",
      "startDate": "{{ event.date | date: '%Y-%m-%d' }}",
      "url": "{{ event.ticket_url }}",
      "offers": {
        "@type": "Offer",
        "price": "{{ event.price }}",
        "priceCurrency": "EUR",
        "url": "{{ event.ticket_url }}"
      }
    }{{ forloop.last | false: ',' }}
    {% endfor %}
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{ venue.avg_rating }}",
    "ratingCount": "{{ total_reviews }}"
  },
  "review": [
    {% for review in venue.top_reviews limit:5 %}
    {
      "@type": "Review",
      "author": "{{ review.author }}",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "{{ review.rating }}"
      },
      "reviewBody": "{{ review.text }}"
    }{{ forloop.last | false: ',' }}
    {% endfor %}
  ]
}
</script>
```

**Why This Works:**
- One template, unlimited venues
- All SEO structured data auto-fills from database
- Google Events indexes each page as rich snippet
- Each venue page is unique (different title, description, reviews, rating)
- When new events arrive via API, page auto-updates

---

## PART 4: THE TECH STACK (Optimized for Your Workflow)

### Frontend & Deployment
- **Framework:** Next.js 14+ (SSR for SEO, API routes, perfect Vercel fit)
- **Animation/UI:** Framer Motion (floating fonts), Tailwind CSS, shadcn/ui
- **Forms:** React Hook Form (quiz form handling)
- **State:** Zustand or Jotai (lightweight, quiz filtering)
- **SEO:** next-seo + next-sitemap (auto meta tags + sitemap)

### Backend & Database
- **Primary:** Supabase (PostgreSQL) — one account, everything managed
  - **Auth:** Email-based signup (magic links)
  - **Database:** Users, Events, Venues, Reviews, Bookings, Analytics tables
  - **Storage:** For images (venue photos, event banners)
  - **Edge Functions:** For API integrations (Eventbrite sync, webhooks)
  - **Realtime:** For live review updates on venue dashboard
  - **Row-Level Security (RLS):** Venues only see their own data

### Data Ingestion Pipeline
- **Static Phase:** Manual CSV import to Airtable/Supabase
- **Dynamic Phase:** Supabase Edge Function (cron job) that:
  1. Calls Eventbrite API daily
  2. Normalizes response to your schema
  3. Deduplicates (don't double-add events)
  4. Upserts into Events table
  5. Updates Locations and Types lists automatically

### Payments & Subscriptions
- **Stripe** for subscription billing (user memberships + venue analytics)
- Use Stripe Webhooks to sync subscription status to Supabase
- Stripe Invoicing for venue B2B billing

### SEO & Content
- **Blog Platform:** MDX files in your Next.js repo (version-controlled, cheap)
- **Schema.org Markup:** Generated via Liquid templates (Google rich snippets)
- **Sitemap:** next-sitemap auto-generates from database (includes all venue pages)
- **Analytics:** Vercel built-in + PostHog for product events

### Email & Notifications
- **Transactional:** Resend or SendGrid (signups, reminders, receipts)
- **Marketing:** Listmonk (self-hosted, open-source, GDPR-friendly)
- **Triggered Emails:** Supabase Edge Functions call Resend on event (new review, new event alert)

### Mapping
- **OpenStreetMap + Leaflet.js** (free, open-source alternative to Google Maps)
- **Radius filtering:** turf.js for client-side geospatial queries

### Analytics
- **User Behavior:** Vercel Analytics or PostHog (open-source)
- **Venue Metrics:** Supabase queries (dashboards for venue analytics customers)
- **SEO:** Google Search Console + Plausible (privacy-first analytics)

### Cost Estimate (Month 1-3)
- Vercel: $20 (pro plan)
- Supabase: $25 (pro plan)
- Stripe: Transaction fees only
- Domain: $12/year
- **Total: ~$50-60/month**

---

## PART 5: THE 90-DAY ROADMAP (What You Do Each Week)

### MONTH 1: MVP Launch (Weeks 1-4)

**Week 1-2: Setup + Curation**
- [ ] Deploy Next.js + Supabase to Vercel (boilerplate: 2 days)
- [ ] Design database schema (Events, Venues, Locations, Types, Reviews)
- [ ] Create master data lists (Locations, Types) in Airtable
- [ ] Manually input 50 events + 30 venues (1-2 weeks)
- [ ] Build quiz flow (3-step form, queries master lists)
- [ ] Build event list page (card grid, radius filter)
- [ ] Build event detail page (template-based)

**Week 3-4: Soft Launch**
- [ ] Push to GitHub, deploy to Vercel
- [ ] Launch to friends + local community (Reddit, Facebook groups)
- [ ] Email 50 venues: "We're aggregating your events. Verify your listing?"
- [ ] Write 5 blog posts on high-intent keywords ("Best [activity] in [city]")
- [ ] Set up Google Analytics, Search Console, Plausible
- [ ] Expected: 500 visitors, 100 signups, 30 venue confirmations

---

### MONTH 2: Product-Market Fit (Weeks 5-8)

**Week 5-6: Venue Partnerships**
- [ ] Create "Venue Kit" (PDF showing analytics value)
- [ ] Pitch 100 venues personally (email/call)
- [ ] Offer: 3-month free analytics access to first 20 venues
- [ ] Expected: 20 venues opt-in, provide direct event feeds

**Week 7-8: Personalization**
- [ ] Launch "Cultural Personality Quiz" (5 questions)
  - What era? (Classic, contemporary, experimental)
  - Venue size? (Intimate, large)
  - Budget per event?
  - Genres?
  - Discovery mode? (New vs proven)
- [ ] Implement rules-based recommendations (SQL queries, no ML yet)
- [ ] Add Review feature:
  - "Would you go again? (Yes/No)"
  - "One-sentence review"
  - "Who would love this event?"
- [ ] Venues can see feedback in free dashboard
- [ ] Expected: 3K visitors, 500 signups, 20 reviews posted, 3-5 venues starting to see value

---

### MONTH 3: Monetization + Scale (Weeks 9-12)

**Week 9-10: Upsell + Case Studies**
- [ ] Document first venue success (analytics proof)
- [ ] Create case study: "How [Venue] Sold 40% More Tickets Using [Platform]"
- [ ] Pitch remaining venues with case study
- [ ] Offer: $99/mo for full Venue Analytics Suite (5-10 venues convert)
- [ ] Launch membership: $9/mo freemium upsell

**Week 11-12: Second City Preparation**
- [ ] Replicate Month 1-2 playbook for City #2
- [ ] Use Eventbrite API (apply now if you haven't)
- [ ] Clone quiz/event structure (no code changes, just data)
- [ ] Expected: 10K visitors, 1.5K signups, 50 venues total, 200+ reviews, $1,300-2,070 MRR

---

## PART 6: CRITICAL ROADBLOCKS & SOLUTIONS

### Roadblock 1: Data Aggregation (Scraping vs. Legitimate APIs)

**Problem:** You need 50-100 events to launch but can't scrape ethically.

**Solution (Phased):**
1. **Month 1:** Manual input (50 events, 2 weeks of work)
2. **Month 2:** Apply for Eventbrite API (72-hour approval)
3. **Month 2:** Email venues directly ("Give us your calendar")
4. **Month 3:** Layer in Ticketmaster API + tourism board feeds

**Why This Works:** You own relationships (Month 1) THEN scale data (Month 2+).

---

### Roadblock 2: Personalization Complexity

**Problem:** "Spotify for events" requires ML, which requires data and expertise.

**Solution:** Graduate approach:
- **Month 1-3:** Quiz-based rules (no ML, fast)
- **Month 6+:** Light collaborative filtering (simple algorithms)
- **Year 2:** Advanced ML (when you have 10K+ users + data)

By Month 6, you have 5,000 reviews. That's enough to start real ML. But you don't need it to launch.

---

### Roadblock 3: Venue Adoption Friction

**Problem:** "Why add another platform? I'm already on Eventbrite."

**Solution:** Vertical targeting + case studies + freemium

Start with venues that have *specific pain*:
- Independent theaters (want to understand audience dropoff)
- Comedy clubs (want word-of-mouth tracking)
- Experimental venues (want to reach right audience)

Offer free trial → demonstrate ROI → upsell to paid.

---

### Roadblock 4: Solo Founder Bandwidth

**Problem:** By Month 3, you can't do everything (product + sales + content).

**Solution:** Leverage stack:
- **Automate:** Email templates, Zapier workflows, templated blog generation
- **Outsource:** Content writer ($200/mo), VA for emails ($300/mo)
- **Hire:** Once revenue hits $5K/mo (Month 4-5)

---

### Roadblock 5: Content/SEO Strategy Burden

**Problem:** Can't write 100 unique blog posts.

**Solution:** Templated generation:
- Create ONE template for venue guides
- Pull data from database (reviews, past events, ratings, demographics)
- Generate 500+ pages automatically
- Updates when new reviews come in

Example:
```
[Venue Name] is a [capacity]-seat [type] in [neighborhood].

Past Events:
- [Opera performance]: [attendance] attendees, [rating] stars
- [Jazz night]: [attendance] attendees, [rating] stars

What visitors say:
- "[Top review quote]"

Getting there:
[Google Maps], [Parking], [Nearby cafes]
```

---

## PART 7: YOUR COMPETITIVE ADVANTAGE (Why You Win)

1. **Taste differentiation:** Eventbrite optimizes for transactions. You optimize for "people find culture they actually love."

2. **Venue feedback moat:** No one else systematically gathers venue feedback. This data is gold.

3. **SEO flywheel:** 500 venue pages + 100 blog posts + user reviews = long-tail keyword dominance in 6 months.

4. **Community lock-in:** Users post reviews (switching cost). Venues rely on feedback. Each interaction makes platform stickier.

5. **Mission clarity:** "Revitalize local culture" resonates emotionally. Competitors are just "marketplaces."

---

## PART 8: FINANCIAL PROJECTIONS (Conservative)

| Metric | Month 3 | Month 6 | Month 9 | Month 12 |
|--------|---------|---------|---------|----------|
| **Users** | 1,500 | 10,000 | 35,000 | 75,000 |
| **Venues** | 50 | 150 | 300 | 500 |
| **Reviews** | 200 | 1,500 | 5,000 | 12,000 |
| **Cities** | 1 | 2 | 3-4 | 5 |
| **MRR** | $1,370 | $6,000 | $18,000 | $37,000 |
| **Status** | Breakeven | Profitable | Profitable | Profitable |

**What Happens Next:**
- **Month 6:** Revenue supports hiring (1 developer + 1 contractor)
- **Month 12:** $37K/mo allows small team, potential Series A conversations
- **Year 2:** $100K+/mo with 5 cities + partnerships

---

## PART 9: MONTH 1 ACTION ITEMS (This Week)

### Day 1-2: Clarify Data Strategy
Choose one:
- **Option A:** Eventbrite API only (fastest launch, less control)
- **Option B:** Venue partnerships only (slower, deep relationships)
- **Option C (Recommended):** Apply for Eventbrite API + start venue outreach in parallel

### Day 3-4: Build MVP
Using Next.js + Supabase:
1. Create Events, Venues, Locations, Types, Reviews tables
2. Populate master data (20 locations, 10 types, 50 events)
3. Build quiz form (3 steps pulling from master lists)
4. Build results grid with filtering
5. Deploy to Vercel

### Day 5: Launch + Get First 50 Users
- Email network (20 people)
- Post to Reddit + local community groups
- Email 50 venues
- Outcome: 50-100 visitors, 15-30 signups, 5 venue confirmations

---

## PART 10: WHAT NOT TO BUILD YET

❌ Mobile apps (responsive web is fine)  
❌ Complex ML (quiz-based rules work)  
❌ Multiple cities in parallel (one city deep first)  
❌ Custom payment infrastructure (use Stripe)  
❌ Real-time chat or community (later, after core works)  
❌ Video platform (keep it simple)  
❌ Merch/physical products (Phase 2 thinking)

---

## PART 11: THE FOUNDER JOURNEY (What You're Actually Signing Up For)

**Month 1-3:** 60-80 hours/week, $0 revenue, proof-of-concept phase
- You're building to prove it works, not to make money yet
- Expected: 500 visitors, 100 signups, 30 venues interested

**Month 4-6:** 50-70 hours/week, $1,300-6,000 MRR, inflection phase
- You're building with confidence now, but still solo
- Time to hire your first contractor/part-time dev
- Expected: 10K users, 150 venues, $6K/mo

**Month 7-12:** 40-50 hours/week, $18K-37K MRR, team building phase
- You're now a CEO managing people, not just a builder
- Hardest phase mentally (delegation is hard)
- Expected: 75K users, 500 venues, $37K/mo, Series A conversations possible

---

## APPENDIX: Database Schema (Supabase)

```sql
-- Master Lists
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  city TEXT NOT NULL,
  lat FLOAT,
  long FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE event_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  parent_category TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Entities
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  location_id UUID REFERENCES locations(id),
  type TEXT,
  capacity INT,
  address TEXT,
  city TEXT,
  lat FLOAT,
  long FLOAT,
  website TEXT,
  phone TEXT,
  avg_rating FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  venue_id UUID NOT NULL REFERENCES venues(id),
  type_id UUID NOT NULL REFERENCES event_types(id),
  location_id UUID NOT NULL REFERENCES locations(id),
  date DATE NOT NULL,
  time TIME,
  price DECIMAL(10,2),
  description TEXT,
  ticket_url TEXT,
  source TEXT, -- 'manual' or 'eventbrite' or 'ticketmaster'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  event_id UUID NOT NULL REFERENCES events(id),
  would_attend_again BOOLEAN,
  review_text TEXT,
  rating INT,
  sentiment_score FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  quiz_responses JSONB, -- Stores: era, venue_size, budget, genres, discovery_mode
  saved_events UUID[],
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## FINAL THOUGHT

You're not building another event listings site. You're building cultural infrastructure.

In 90 days, you'll have:
- A live platform people use
- Real revenue ($1,300+)
- Venue partners who trust you
- Data no one else has

That's worth doing, even if it fails. Especially if it succeeds.

Go build.
