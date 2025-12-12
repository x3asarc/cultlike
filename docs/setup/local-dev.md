# LOCAL DEVELOPMENT SETUP (5 Minutes)

## Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Supabase account (free tier)

## Step 1: Clone & Install (2 minutes)

```bash
# Clone repo (or create new from template)
git clone [your-repo] cultural-events
cd cultural-events

# Install dependencies
npm install

# Copy env template
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# (Get from https://supabase.com/dashboard)
```

### What Goes in `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc... (only for server-side)
```

**Never commit `.env.local` — it has secrets.**

---

## Step 2: Start Supabase Locally (1 minute)

```bash
# Start local Postgres database
supabase start

# You'll see:
# ✓ Started Supabase local development setup
# ✓ Open http://localhost:54323 for Supabase Studio
```

Keep this running in a terminal tab.

---

## Step 3: Set Up Database (1 minute)

```bash
# Apply migrations (creates all tables)
supabase db reset

# Seed with test data
npm run seed:events

# Verify in Supabase Studio
# Open http://localhost:54323
# → Click "events" table
# → Should see 50 events
```

---

## Step 4: Start Next.js Dev Server (1 minute)

```bash
# In a new terminal tab
npm run dev

# You'll see:
# ▲ Next.js 14.0.0
# - Local:        http://localhost:3000
# - Environments: .env.local

# Open http://localhost:3000 in browser
```

---

## Step 5: Verify Everything Works

- [ ] Page loads (white background, no errors)
- [ ] Open DevTools Console (F12) — no red errors
- [ ] Open Supabase Studio (http://localhost:54323)
- [ ] Click "events" table — see 50 rows
- [ ] Go to http://localhost:3000/quiz — should render component

**If all checks pass: You're ready to code!**

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Database
supabase start           # Start local DB
supabase stop            # Stop local DB
supabase db reset        # Reset to migrations
npm run seed:events      # Seed with test data
npm run seed:reset       # Wipe and reseed

# Deployment
npm run build            # Build for production
npm run type-check       # Check TypeScript
npm run format           # Format code

# Debugging
npm run supabase:status  # Check Supabase health
npm run logs             # View server logs
```

---

## Troubleshooting

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

**Supabase won't start:**
```bash
# Make sure Docker is running
# Then try again
supabase start
```

**Database connection error:**
```bash
# Update .env.local with correct Supabase URL
# If local: NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
# Test connection:
psql postgresql://postgres:postgres@localhost:54322/postgres
```

**Changes not showing in browser:**
```bash
# Next.js has hot reload, but sometimes:
# 1. Hard refresh browser (Ctrl+Shift+R)
# 2. Clear .next folder: rm -rf .next
# 3. Restart server: Ctrl+C, then npm run dev
```

**TypeScript errors but code runs:**
```bash
# This is expected for MVP (fixing later)
# Continue building
# Run npm run type-check to see all errors
```

---

## VSCode Setup (Optional but Recommended)

Install extensions:
- **Prettier** — Code formatter
- **ESLint** — Linting
- **Supabase** — Browse database
- **REST Client** — Test API calls
- **Tailwind CSS IntelliSense** — Style autocomplete

---

## Git Workflow (Local)

```bash
# See what changed
git status

# Stage changes
git add .

# Commit with message
git commit -m "feat: add quiz location step"

# Push to GitHub
git push origin main

# Create tag when happy
git tag v1
git push origin --tags

# See all tags
git tag -l
```

---

## Next: Read MASTER_PROMPT.md

Once everything is working locally, open `.docs/MASTER_PROMPT.md` in your IDE. It has everything you need to start building with Claude Code.

---

## Need Help?

**Error message not listed above?**

1. Copy exact error message
2. Add to `.docs/SESSION_LOG.md` under "Blockers"
3. Ask Claude Code next session with error context
