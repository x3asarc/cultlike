# Claude Code Prompt: Create a New Page

## When to Use
When you need a new page component (detail page, listing page, dashboard, etc.)

## How to Use
1. Copy the template below
2. Paste into Claude Code
3. Replace [PLACEHOLDERS] with your specific requirements
4. Ask Claude Code to generate

---

## TEMPLATE

I need to create a new page for [PAGE_NAME].

**Location:** `src/app/[ROUTE]/page.tsx`

**What it does:**
[1-2 sentence description of page purpose and main content]

**Requirements:**
- TypeScript strict mode
- Use Supabase for data (see `/src/lib/supabase.ts` for client setup)
- Fetch data server-side (SSR for SEO)
- Style with Tailwind CSS only (no shadcn for now)
- Include SEO meta tags:
  - title: [specific title pattern]
  - description: [description pattern]
  - canonical: [URL pattern]
- Include schema.org markup for Google rich snippets:
  - @type: [e.g., Event, Place, Organization]
  - Required fields: [list key fields]
- Mobile responsive (test at 375px)
- Keyboard accessible (Tab through interactive elements)

**Data requirements:**
- Fetch from tables: [e.g., events, venues, reviews]
- Handle loading state: Show skeleton or simple "Loading..." text
- Handle error state: Show user-friendly message, not technical error
- Query logic: [Brief description of WHERE clauses, JOINs, ORDER BY]

**UI structure:**
- Header section with: [e.g., title, image, key info]
- Main content area with: [e.g., description, lists, cards]
- Footer section with: [e.g., CTA button, related items]

**Example data structure (if needed):**
```typescript
interface PageData {
  [field]: [type];  // [description]
}
```

**Reference implementations:**
- Similar page: `/src/app/[similar_page]/page.tsx`
- Supabase queries: `.docs/integrations/SUPABASE.md`
- Component patterns: `.docs/architecture/components.md`
- Feature details: `.docs/features/[RELEVANT_FEATURE].md`

**After implementation:**
- Test locally: `npm run dev` → navigate to page
- Check meta tags: Right-click → "View Page Source" → Look for `<title>`, `<meta>`, `<script type="application/ld+json">`
- Check mobile: DevTools → Toggle device toolbar → Resize to 375px
- Verify data: Open Supabase Studio (http://localhost:54323) → Check tables have data

---

## EXAMPLES

### Example 1: Event Detail Page

```
I need to create a new page for event details.

Location: src/app/events/[slug]/page.tsx

What it does:
Shows complete details for a single event: title, venue, date, price, description, attendee reviews, and booking button. Each event has a unique URL slug.

Requirements:
- TypeScript strict mode
- Use Supabase for data (see /src/lib/supabase.ts)
- Fetch data server-side (SSR for SEO)
- Tailwind CSS styling
- SEO meta tags:
  - title: "{Event Title} — Cultural Events Platform"
  - description: "{Event Description} at {Venue Name} on {Date}"
  - canonical: "https://yoursite.com/events/{slug}"
- Schema.org markup:
  - @type: Event
  - Fields: name, description, startDate, url, offers (price, priceCurrency), location
- Mobile responsive (375px+)
- Keyboard accessible

Data requirements:
- Fetch from: events (JOIN venues, event_types, reviews)
- Loading: Show skeleton with title, image placeholders
- Error: "Event not found" message
- Query: SELECT * FROM events WHERE slug = {slug} WITH venues, reviews

UI structure:
- Hero: Event image, title, date/time, price
- Details: Venue info, description, attendee count
- Reviews: List of attendee reviews (top 5)
- CTA: "Get Tickets" button (affiliate link)

After implementation:
- Test locally
- Check meta tags (View Page Source)
- Check mobile responsive
- Verify Supabase query works
```

### Example 2: Venue Dashboard (Analytics)

```
I need to create a new page for venue analytics dashboard.

Location: src/app/dashboard/page.tsx

What it does:
Shows venue owner their event analytics: attendance, reviews, demographics, no-show rate, etc. Free tier shows basics, paid tier shows advanced metrics.

Requirements:
- TypeScript strict
- Server-side auth check (protect from non-authenticated users)
- Supabase for data + RLS (only show venue's own data)
- Charts/visualizations for metrics (use recharts)
- Tailwind CSS
- No SEO needed (private page)
- Mobile responsive

Data requirements:
- Fetch: events, reviews, bookings for authenticated venue
- RLS: Only show data where venue_id = auth.user.venue_id
- Aggregates: COUNT(attendees), AVG(rating), SUM(no_shows)
- Period filters: Last 30 days, 90 days, all time

UI structure:
- Header: Venue name, total events, total attendees
- Metric cards: Attendance rate, avg rating, no-show %, repeat attendee %
- Charts: Attendance trend (line chart), review sentiment (bar chart)
- Event list: Sortable table of events with attendance

After implementation:
- Test locally with Supabase auth
- Verify RLS works (query only shows own venue data)
- Test mobile view
```

---

## ADVANCED: With Custom Components

If you need a complex page, you can specify components too:

```
I need to create a new page using custom components.

Location: src/app/[route]/page.tsx

Components needed:
- <EventHero /> — Image, title, date, venue
- <EventDetails /> — Description, capacity, ticket URL
- <ReviewsList /> — List of reviews with ratings
- <BookingButton /> — CTA button with affiliate link

Each component:
- Should be in src/components/events/
- Accept data as props
- Handle loading/error states
- Be keyboard accessible

[Rest of requirements...]
```

---

## TIPS FOR BETTER RESULTS

1. **Be specific about data** — Instead of "fetch events", say "fetch upcoming events where date > today and location_id = loc_001"
2. **Show example data** — Include sample JSON of what you expect back
3. **Reference existing patterns** — "Follow the pattern in /src/app/events/page.tsx"
4. **Include error cases** — "If no events found, show message 'No events in this location'"
5. **Test in browser** — After Claude generates, test in `npm run dev`

---

## AFTER CLAUDE GENERATES

Checklist before committing:

- [ ] TypeScript: `npm run type-check` (no errors)
- [ ] Tests: Open http://localhost:3000, navigate to page
- [ ] Data: Check Supabase Studio → Table has data
- [ ] SEO: Right-click → "View Page Source" → See title/meta/schema
- [ ] Mobile: DevTools → 375px width → Responsive?
- [ ] Keyboard: Tab through page → All interactive elements reachable?

See `.docs/review/CHECKLIST.md` for full pre-commit list.
