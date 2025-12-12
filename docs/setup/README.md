# Cultural Events Platform

A Next.js application for discovering and booking cultural events like theater, opera, concerts, and art exhibitions. Users take a quiz to find events matched to their taste.

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free tier)

### Setup (5 minutes)

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo>
   cd cultural-events-platform
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Supabase credentials to .env.local
   ```

3. **Start Supabase locally**
   ```bash
   supabase start
   ```

4. **Set up database**
   ```bash
   supabase db reset
   npm run seed:events
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Visit the app**
   - App: http://localhost:3000
   - Supabase Studio: http://localhost:54323

## Features

### Phase 1 (Current)
- ✅ Quiz flow (location → month → type selection)
- ✅ Event listing with filters
- ✅ Vienna test data (50+ events, 10 venues)
- ✅ Responsive design
- ✅ TypeScript strict mode

### Coming Soon
- Interactive quiz with floating animations
- Real event data integration
- User authentication
- Event reviews and ratings
- Venue analytics dashboard

## Architecture

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **State:** Zustand
- **Animations:** Framer Motion (planned)
- **Deployment:** Vercel

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   ├── quiz/            # Quiz flow
│   └── events/          # Event listing
├── components/          # React components
│   ├── ui/              # UI primitives
│   ├── quiz/            # Quiz-specific
│   └── events/          # Event-related
├── lib/                 # Utilities
│   ├── supabase.ts      # Database client
│   ├── types.ts         # TypeScript types
│   └── zustand.ts       # State management
scripts/
├── seed.ts              # Database seeding
supabase/
├── migrations/          # Database schema
```

## Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run type-check       # Check TypeScript

# Database
supabase start           # Start local DB
supabase stop            # Stop local DB
supabase db reset        # Reset to latest migrations
npm run seed:events      # Seed with Vienna test data

# Deployment
git push origin main     # Auto-deploy to Vercel
git tag v1 && git push origin --tags  # Version releases
```

## Data

The app includes realistic Vienna cultural events data:

- **Venues:** Wiener Staatsoper, Burgtheater, Musikverein, etc.
- **Events:** 50+ events spread across 2025
- **Types:** Opera, theater, classical concerts, ballet, jazz, etc.
- **Locations:** 5 Vienna districts

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically on every push

### Environment Variables (Production)
```
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

## Documentation & Best Practices

### ⚠️ IMPORTANT: Service Documentation Reference
**When facing any development difficulties, ALWAYS refer to the comprehensive service documentation first:**

- **Next.js Best Practices:** `docs/dev-docs/nextjs-source/` - Official Next.js source documentation
- **React Best Practices:** `docs/dev-docs/react-source/` - Official React source documentation and patterns
- **React Compiler:** `docs/dev-docs/react-source/compiler/` - React compiler documentation and playground
- **Shadcn/UI Components:** `docs/dev-docs/shadcn-ui/` - Shadcn/UI component library source and patterns
- **Supabase Integration:** `docs/dev-docs/supabase/` - Supabase platform documentation and best practices
- **Tailwind CSS:** `docs/dev-docs/tailwindcss-docs/` & `docs/dev-docs/tailwind-site-source/` - Tailwind styling guides
- **Vercel Deployment:** `docs/dev-docs/vercel-docs/` - Vercel deployment and platform documentation

These directories contain the complete, up-to-date official documentation and should be your PRIMARY reference for:
- Component patterns and best practices
- Performance optimization
- TypeScript usage
- Build configuration
- Testing strategies
- Deployment guidelines

### Project Documentation
- See `docs/` folder for project-specific documentation
- `docs/development/MASTER_PROMPT.md` - Complete project overview
- `docs/setup/START_HERE.md` - Quick start guide
- `docs/setup/local-dev.md` - Development setup
- `docs/integrations/SUPABASE.md` - Database integration guide

## Contributing

1. Follow the existing code style
2. Run `npm run type-check` before committing
3. Test manually in browser
4. Use feature branches for new features

## License

MIT