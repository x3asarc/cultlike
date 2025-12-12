# Claude Code Prompt: Modify Database Schema

## When to Use
When you need to add a column, create a table, or change database structure.

## How to Use
1. Copy template below
2. Paste into Claude Code
3. Replace [PLACEHOLDERS]
4. Ask Claude to generate migration + code updates

---

## TEMPLATE

I need to modify the database schema.

**Change:** [Add column / Create table / Modify column / Add relationship]

**Specific requirement:**
Add [FIELD_NAME] to [TABLE_NAME]
- Type: [TEXT, INT, BOOLEAN, UUID, JSONB, etc.]
- Constraints: [NOT NULL, UNIQUE, DEFAULT value, etc.]
- Why: [Brief explanation of what this field is used for]
- Example values: [1-2 examples of data that will be stored]

**Steps I want you to do:**

1. **Create migration file:**
   ```bash
   supabase migration add [descriptive_name]  # e.g., add_sentiment_to_reviews
   ```

2. **Write migration SQL:**
   ```sql
   ALTER TABLE [table] ADD COLUMN [field] [type] [constraints];
   [Any indexes, triggers, or related changes]
   ```

3. **Update TypeScript types:**
   - File: `src/lib/types.ts`
   - Update [TABLE_NAME] interface to include new field
   - Mark as optional (?) or required

4. **Update Supabase queries:**
   - File: `src/lib/supabase.ts`
   - Any queries that fetch [TABLE_NAME] now include [FIELD_NAME]
   - Update INSERT/UPDATE queries

5. **Update components that use [TABLE_NAME]:**
   - Files: [list any components that will display this field]
   - Add field to component JSX if user-facing

6. **Provide migration SQL:**
   - I'll run: `supabase migration up` locally
   - Then: `npm run seed:events` to reseed

**Reference:**
- Schema docs: `.docs/database/schema.md`
- Migration examples: `.docs/database/migrations.md`
- Type definitions: `src/lib/types.ts`
- Supabase queries: `src/lib/supabase.ts`

---

## EXAMPLES

### Example 1: Add Sentiment Score to Reviews

```
I need to modify the database schema.

Change: Add sentiment analysis to reviews

Specific requirement:
Add sentiment_score column to reviews table
- Type: FLOAT (0.0 to 1.0, where 1.0 is positive, 0.0 is negative)
- Constraints: DEFAULT 0.5 (neutral if not set), NOT NULL
- Why: Track sentiment of user reviews to show venue if reviews are positive/negative overall
- Example values: 0.8 (very positive), 0.2 (negative), 0.5 (neutral)

Steps:
1. Create migration: supabase migration add add_sentiment_to_reviews
2. Migration SQL:
   ALTER TABLE reviews ADD COLUMN sentiment_score FLOAT NOT NULL DEFAULT 0.5;
   CREATE INDEX idx_reviews_sentiment ON reviews(sentiment_score);
3. Update TypeScript: Review interface + sentiment_score: number
4. Update Supabase queries: SELECT includes sentiment_score
5. Update components: ReviewCard shows sentiment indicator (emoji or color)
6. Provide migration SQL for me to run
```

### Example 2: Add Capacity to Venues

```
I need to modify the database schema.

Change: Add venue capacity field

Specific requirement:
Add capacity column to venues table
- Type: INT
- Constraints: NOT NULL (must be set)
- Why: Show users if venue is small (intimate) or large, affects event experience
- Example values: 100 (small), 500 (medium), 2000 (large theater)

Steps:
1. Create migration: supabase migration add add_capacity_to_venues
2. Migration SQL:
   ALTER TABLE venues ADD COLUMN capacity INT NOT NULL DEFAULT 500;
3. Update TypeScript: Venue interface + capacity: number
4. Update Supabase queries: SELECT includes capacity
5. Update components: VenueCard shows "500-seat theater", EventCard shows venue size
6. Provide migration SQL
```

### Example 3: Create New Table for Bookmarks

```
I need to modify the database schema.

Change: Create new table for user bookmarks

Specific requirement:
Create bookmarks table
- Fields:
  - id: UUID PRIMARY KEY
  - user_id: UUID REFERENCES auth.users(id)
  - event_id: UUID REFERENCES events(id)
  - created_at: TIMESTAMP DEFAULT NOW()
- Constraints: UNIQUE(user_id, event_id) — can't bookmark same event twice
- Why: Users want to save events to view later
- Example: User bookmarks "Hamilton" on March 15

Steps:
1. Create migration: supabase migration add create_bookmarks_table
2. Migration SQL:
   CREATE TABLE bookmarks (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES auth.users(id),
     event_id UUID NOT NULL REFERENCES events(id),
     created_at TIMESTAMP DEFAULT NOW(),
     UNIQUE(user_id, event_id)
   );
   CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
3. Update TypeScript: Create Bookmark interface
4. Create Supabase queries: addBookmark(), removeBookmark(), getUserBookmarks()
5. Update components: EventCard shows "❤️ Bookmark" button
6. Provide migration SQL
```

---

## MIGRATION CHECKLIST

After Claude generates migration:

- [ ] **Migration file created:** `supabase/migrations/[timestamp]_[name].sql`
- [ ] **SQL is valid:** No syntax errors
- [ ] **Types updated:** `src/lib/types.ts` reflects changes
- [ ] **Queries updated:** `src/lib/supabase.ts` includes new field
- [ ] **Run locally:** `supabase migration up`
- [ ] **Seed:** `npm run seed:events`
- [ ] **TypeScript compiles:** `npm run type-check`
- [ ] **Test in browser:** Data appears correctly

---

## COMMON SCHEMA CHANGES

### Add a Simple Column
```sql
ALTER TABLE venues ADD COLUMN description TEXT;
```

### Add Foreign Key Relationship
```sql
ALTER TABLE reviews ADD COLUMN venue_id UUID REFERENCES venues(id);
```

### Make Field Unique
```sql
ALTER TABLE venues ADD CONSTRAINT unique_venue_slug UNIQUE(slug);
```

### Add Index for Filtering
```sql
CREATE INDEX idx_events_location ON events(location_id);
```

### Add Timestamp (Created/Updated)
```sql
ALTER TABLE reviews ADD COLUMN created_at TIMESTAMP DEFAULT NOW();
```

### Change Field Type
```sql
ALTER TABLE reviews ALTER COLUMN rating TYPE INT;
```

---

## WHEN TO ASK CLAUDE

**Simple additions:**
- "Add color_preference TEXT to users"
- "Add is_verified BOOLEAN to venues"

**Complex changes:**
- Creating relationships between tables
- Adding constraints or indexes
- Adding triggers or functions
- Optimizing query performance

---

## AFTER MIGRATION

Commit with clear message:
```
git commit -m "feat: add sentiment_score to reviews schema"
```

Update docs:
- `.docs/database/schema.md` — Add new field description
- `.docs/features/[relevant].md` — How this field is used

See `.docs/database/migrations.md` for full guide.
