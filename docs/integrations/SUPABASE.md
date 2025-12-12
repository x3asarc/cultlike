# SUPABASE QUICK REFERENCE

## Local Development Commands

```bash
# Start local Supabase (first time setup)
supabase start

# Seed the database
npm run seed:events

# Reset database to clean state
supabase db reset

# View data (open Supabase Studio)
http://localhost:54323

# Stop Supabase
supabase stop
```

---

## Common Queries (Copy/Paste)

### Fetch Events (for quiz results)
```typescript
import { createClient } from '@/lib/supabase';

const supabase = createClient();

const { data: events, error } = await supabase
  .from('events')
  .select('id, title, venue:venues(name), date, price, type:event_types(name)')
  .eq('location_id', locationId)
  .eq('type_id', typeId)
  .eq('month(date)', month) // Postgres function
  .order('date', { ascending: true });

if (error) {
  console.error('Error fetching events:', error);
  return [];
}

return events;
```

### Fetch Single Event (for detail page)
```typescript
const { data: event, error } = await supabase
  .from('events')
  .select(`
    id, title, description, date, time, price,
    venue:venues(*),
    type:event_types(name),
    location:locations(name),
    reviews(id, would_attend_again, review_text, user_id)
  `)
  .eq('id', eventId)
  .single();
```

### Fetch Venue (for venue detail page)
```typescript
const { data: venue, error } = await supabase
  .from('venues')
  .select(`
    id, name, slug, capacity, address, website, phone, avg_rating,
    location:locations(name),
    events(id, title, date, price, type:event_types(name)),
    reviews(id, would_attend_again, review_text, rating, created_at)
  `)
  .eq('slug', slug)
  .single();
```

### Insert Review (after event)
```typescript
const { data, error } = await supabase
  .from('reviews')
  .insert([{
    user_id: userId,
    event_id: eventId,
    would_attend_again: true,
    review_text: 'Amazing performance!',
    rating: 5
  }])
  .select();
```

### Fetch Quiz Data (for location/month/type counts)
```typescript
// Get all locations with event counts
const { data: locations } = await supabase
  .from('locations')
  .select('id, name, event_count')
  .eq('active', true)
  .order('event_count', { ascending: false });

// Get all months with event counts
const { data: months } = await supabase
  .from('months')
  .select('id, name, event_count')
  .order('id');

// Get all event types with counts
const { data: types } = await supabase
  .from('event_types')
  .select('id, name, icon, event_count')
  .order('event_count', { ascending: false });
```

### Fetch User with Quiz Responses
```typescript
const { data: user, error } = await supabase
  .from('users')
  .select('id, email, quiz_responses, subscription_tier')
  .eq('id', userId)
  .single();

// quiz_responses is JSONB:
// { era: 'contemporary', budget: '$50+', genres: [...], ... }
```

---

## Authentication

### Email Signup (Magic Link)
```typescript
const { error } = await supabase.auth.signInWithOtp({
  email: userEmail,
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
  },
});
```

### Handle Auth Callback
```typescript
// src/app/auth/callback/page.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    
    // Exchange code for session
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // User authenticated, redirect to quiz
        router.push('/quiz');
      }
    });
  }, [router]);

  return <div>Signing you in...</div>;
}
```

### Get Current User
```typescript
const supabase = createClient();
const { data: { user } } = await supabase.auth.getUser();

if (user) {
  console.log('Logged in:', user.email);
}
```

### Logout
```typescript
await supabase.auth.signOut();
```

---

## Row-Level Security (RLS)

By default, RLS is ENABLED. You must set policies for data access.

### Example: Users Can Only See Their Own Reviews
```sql
-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can read reviews on public events
CREATE POLICY "Users can read reviews" ON reviews
FOR SELECT
USING (true);  -- Anyone can read

-- Create policy: Users can only INSERT their own reviews
CREATE POLICY "Users can insert own reviews" ON reviews
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can only UPDATE their own reviews
CREATE POLICY "Users can update own reviews" ON reviews
FOR UPDATE
USING (auth.uid() = user_id);
```

**Check policies in Supabase Studio:**
1. Go to Authentication → Policies
2. Verify policies exist for your tables
3. If data isn't showing, RLS is probably blocking it

---

## Schema Triggers (Auto-Update Counts)

When new event inserted, automatically update `event_count` fields:

```sql
-- Trigger: Update location.event_count
CREATE OR REPLACE FUNCTION update_location_event_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE locations
  SET event_count = (SELECT COUNT(*) FROM events WHERE location_id = NEW.location_id)
  WHERE id = NEW.location_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_location_count
AFTER INSERT ON events
FOR EACH ROW
EXECUTE FUNCTION update_location_event_count();

-- Similar triggers for event_types, months
```

**Once set up, you never manually update counts — they auto-calculate.**

---

## Debugging

### Query returns NULL
1. **Check data exists:** Open Supabase Studio, browse table
2. **Check RLS policy:** Is policy blocking SELECT?
3. **Check WHERE clause:** Is your filter too strict?

```typescript
// Debug: log the query
const { data, error } = await supabase
  .from('events')
  .select('*')
  .eq('location_id', locationId);

console.log('Query result:', { data, error });
```

### Error: "new row violates row-level security policy"
→ RLS policy is blocking INSERT/UPDATE. Check policies in Supabase Studio.

### Error: "relation "events" does not exist"
→ Table hasn't been created yet. Run `supabase db reset` to apply migrations.

### Supabase not syncing with production
→ Check env vars in Vercel. Production uses different Supabase project.

---

## Edge Functions (Serverless)

For tasks like API syncing (Phase 2):

```typescript
// supabase/functions/sync-eventbrite/index.ts
import { serve } from "https://deno.land/std@0.131.0/http/server.ts"

serve(async (req) => {
  try {
    // Call Eventbrite API
    const events = await fetch('https://www.eventbrite.com/api/...');
    
    // Transform and insert to Supabase
    // ...
    
    return new Response(JSON.stringify({ success: true }))
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
```

Deploy: `supabase functions deploy sync-eventbrite`

See `.docs/integrations/SUPABASE.md` for full guide.

---

## Official Docs
- https://supabase.com/docs
- JavaScript Client: https://supabase.com/docs/reference/javascript
- Auth: https://supabase.com/docs/guides/auth
- RLS: https://supabase.com/docs/guides/auth/row-level-security
- Edge Functions: https://supabase.com/docs/guides/functions
