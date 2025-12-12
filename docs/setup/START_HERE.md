# 🚀 START HERE

Everything is ready. Follow this guide to get set up and start building.

---

## STEP 1: Copy Files to Your Machine (5 minutes)

All the documentation and setup files created above are in:
- `MASTER_PROMPT.md` → Copy to root or keep handy
- `.docs/` → Entire folder with all documentation
- `scripts/seed.ts` → For generating test data
- `git.workflow.md` → For version management
- `.claude-prompts/` → Reusable prompts for Claude Code

You should copy these to your local project folder now.

---

## STEP 2: Set Up Local Development (5 minutes)

Follow: `.docs/setup/local-dev.md`

Quick version:
```bash
# 1. Install dependencies
npm install

# 2. Set up Supabase locally
supabase start

# 3. Copy env template
cp .env.example .env.local
# Add Supabase credentials from dashboard

# 4. Create database
supabase db reset

# 5. Seed test data
npm run seed:events

# 6. Start dev server
npm run dev

# 7. Verify it works
# Open http://localhost:3000
# Check http://localhost:54323 (Supabase Studio)
```

✅ When everything works, continue.

---

## STEP 3: Read MASTER_PROMPT.md (15 minutes)

This is your north star. Read:
- PART 0: Overview (what you're building)
- PART 1: Tech stack (why each choice)
- PART 2: Project structure (where everything lives)
- PART 4: Database schema (how data is organized)

This gives you 90% of what you need. Skim other sections for reference.

---

## STEP 4: Review the Architecture (10 minutes)

Read: `.docs/architecture/overview.md`

Understand:
- System diagram (browser ↔ Vercel ↔ Supabase)
- Data flow for quiz (location → month → type → results)
- Component hierarchy
- Rendering strategy (SSR vs CSR)

---

## STEP 5: Build First Feature with Claude Code (varies)

### Start Simple: Quiz Location Step

**Use this prompt in Claude Code:**

```markdown
# Build: Quiz Location Selection (Step 1)

Follow MASTER_PROMPT.md and .docs/features/01_quiz-flow.md

I need to create the first step of the quiz: location selection.

Location: src/app/quiz/page.tsx and src/components/quiz/LocationStep.tsx

What it does:
User sees a white screen with floating text bubbles sized by event count.
Each bubble is a location name. When user clicks a location, it's stored 
and they proceed to month selection.

Requirements:
- TypeScript strict
- Fetch locations from Supabase (use createClient() from src/lib/supabase.ts)
- Floating fonts sized by venue_count (use Framer Motion)
- Click handler stores selection in Zustand store (src/lib/zustand.ts - create if needed)
- Mobile responsive (375px+)
- Keyboard accessible (Tab + Enter to select)

UI:
- White background (100vh)
- Centered container
- Floating <motion.div> elements (use Framer Motion)
- Font size: venue_count * 0.5 + 'rem' minimum 24px
- Cursor: pointer on hover
- Smooth animation on load

After implementation:
- Test locally: npm run dev → http://localhost:3000/quiz
- Click each location → Console log should show selection
- Mobile test: DevTools → 375px width
- Check Zustand store (DevTools → Redux tab)

Reference:
- Framer Motion: .docs/integrations/NEXTJS.md
- Zustand setup: Create new store in src/lib/zustand.ts
- Supabase queries: .docs/integrations/SUPABASE.md example "Fetch Quiz Data"
```

Expected output: Quiz page with floating location bubbles that respond to clicks.

### Then: Month Step (Step 2)
Same pattern, but query months WHERE location_id = selected location

### Then: Type Step (Step 3)
Same pattern, but query types WHERE location_id AND month match

### Then: Event Listing
Show matching events in a grid

### Then: Event Detail Page
Use `.claude-prompts/new-page.md` template for this one

---

## STEP 6: Track Your Progress

After each session:

1. **Log what you built:**
   ```
   Edit .docs/SESSION_LOG.md
   - What I completed
   - Blockers (if any)
   - What to build next
   ```

2. **Update master prompt:**
   ```
   Edit MASTER_PROMPT.md
   - Update "Project Status:" section
   - Note completed features
   ```

3. **Commit and tag:**
   ```bash
   git add .
   git commit -m "feat: add quiz location selection"
   git tag v1  # When happy with changes
   git push origin main --tags
   ```

---

## STEP 7: Key Files to Know

### Read These First
- `MASTER_PROMPT.md` ← Start here
- `.docs/setup/local-dev.md` ← Setup
- `.docs/architecture/overview.md` ← System design

### Reference Often
- `.docs/integrations/SUPABASE.md` ← Database queries
- `.docs/features/01_quiz-flow.md` ← Current feature
- `.docs/review/CHECKLIST.md` ← Before committing

### Use as Needed
- `.claude-prompts/new-page.md` ← Creating pages
- `.claude-prompts/database-change.md` ← Schema changes
- `.docs/patterns/*.md` ← Code patterns
- `git.workflow.md` ← Version management

---

## STEP 8: Claude Code Workflow

### Each Session:

1. **Open Claude Code**
   ```bash
   # In your project terminal
   open -a "Claude Code"  # macOS
   # or run on Windows/Linux equivalent
   ```

2. **Open MASTER_PROMPT.md in Claude**
   - Copy entire file
   - Paste into Claude Code chat
   - Add context: "This is my project setup. I'm building [feature]."

3. **Ask for specific task**
   ```
   Using MASTER_PROMPT.md as context:
   
   I need to build the event listing page (Step 4 of quiz flow).
   
   Requirements:
   - Fetch events matching location, month, type filters
   - Display as grid of cards
   - Include radius slider for distance filtering
   - Use Leaflet + OpenStreetMap for map
   - Style with Tailwind
   
   [Rest of specific requirements]
   ```

4. **Claude generates code**
   - Review code locally
   - Test in browser
   - Make adjustments if needed

5. **Commit when happy**
   ```bash
   git add .
   git commit -m "feat: add event listing with radius filter"
   ```

6. **Update docs**
   - `.docs/SESSION_LOG.md`
   - `.docs/MASTER_PROMPT.md`

7. **Tag when significant progress**
   ```bash
   git tag v{N}
   git push origin --tags
   ```

---

## 🎯 Your First Week (Rough Timeline)

**Day 1-2:** Setup + Quiz Location Step
- Get local dev working
- Build floating location bubbles
- Click → store in Zustand
- Test with 5 locations

**Day 3:** Quiz Month Step
- Query months for selected location
- Floating month bubbles
- Click → store month
- Only show months with events

**Day 4:** Quiz Type Step
- Query types for location + month
- Same floating bubble pattern
- Navigate to event results

**Day 5-7:** Event Listing
- Show events matching quiz selections
- Grid of event cards
- Radius filter with map
- Affiliate booking links

**End of Week 1:** First Demo-Ready Version
- Tag as v1
- All quiz flow working
- Can view events
- No auth/reviews yet (Phase 2)

---

## ❌ Common Mistakes to Avoid

1. **Trying to do too much at once**
   - Build ONE feature per session (quiz step, listing, detail page)
   - Avoid jumping between features

2. **Not testing locally**
   - Always: `npm run dev` → click around
   - Check browser console for errors (F12)

3. **Committing without checking types**
   - Always run: `npm run type-check` before commit
   - Fix red squiggles in IDE

4. **Not reading the feature docs**
   - Before building quiz, read `.docs/features/01_quiz-flow.md`
   - Each feature doc has gotchas and testing checklist

5. **Forgetting to update docs**
   - Update `.docs/SESSION_LOG.md` after each session
   - Update `.docs/MASTER_PROMPT.md` status section
   - Future you will need this context

6. **Not using feature flags for Phase 2**
   - Phase 2 code (recommendations, membership) goes behind flags
   - Don't commit Phase 2 code unless it's hidden

---

## 🆘 When You're Stuck

1. **Check relevant .docs/ file**
   - For Supabase issue → `.docs/integrations/SUPABASE.md`
   - For component pattern → `.docs/architecture/components.md`
   - For database schema → `.docs/database/schema.md`

2. **Check existing code patterns**
   - Open similar component
   - Copy/adapt pattern

3. **Test in Supabase Studio**
   - Open http://localhost:54323
   - Browse tables directly
   - Check if data exists
   - Verify RLS policies

4. **Check browser DevTools**
   - F12 → Console: Any errors?
   - Network tab: Is API call being made?
   - Application tab: Check Supabase session

5. **Ask Claude Code**
   - Paste error message + relevant code
   - Ask to debug
   - Include `.docs/` links for context

6. **Update SESSION_LOG.md**
   - Document the blocker
   - Note what you tried
   - Next session will have context

---

## 📊 Success Metrics (End of Phase 1)

By 90 days, you should have:

- ✅ Quiz flow (location → month → type)
- ✅ Event listing with filters + map
- ✅ Event detail page (template-based, SEO optimized)
- ✅ User auth (email signup)
- ✅ Reviews (post-event feedback)
- ✅ Venue dashboard (free tier)
- ✅ Blog content (templated venue guides)
- ✅ 50-100 test events in database
- ✅ Deployed to Vercel (preview working)
- ✅ 500+ website visitors
- ✅ 100+ email signups
- ✅ 30+ venue confirmations

---

## Next Steps

1. **Right now:** Copy `.docs/` and files to your project
2. **Next 5 min:** Follow `.docs/setup/local-dev.md`
3. **Next 15 min:** Read `MASTER_PROMPT.md`
4. **Next 10 min:** Read `.docs/architecture/overview.md`
5. **Next session:** Open Claude Code, paste MASTER_PROMPT.md, build quiz location step

---

## Final Notes

- This is a lot of documentation, but you don't need to memorize it
- Use it as reference when stuck
- Update it as you build
- Each `.docs/` file is a tool — use when needed

**You're ready. Go build something great.**

Questions? Check `.docs/SESSION_LOG.md` for asking Claude Code next session.

Good luck 🚀
