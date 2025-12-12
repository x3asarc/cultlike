# GIT & VERSIONING WORKFLOW

## Why This Matters

You want to:
1. **Save versions** of your code (v1, v2, v3, etc.)
2. **Deploy any version** to Vercel (if you like v4 better than v5, deploy v4)
3. **Keep history** of what changed between versions

Git tags + Vercel's deploy settings make this super easy.

---

## The Basic Workflow

### Step 1: Build & Test Locally

```bash
# Start dev server
npm run dev

# Build a feature/fix
# Test it thoroughly in browser

# Check what changed
git status
git diff
```

### Step 2: Commit Your Changes

```bash
# Stage changes
git add .

# Commit with clear message
git commit -m "feat: add quiz location selection"

# View commit
git log --oneline -5
```

### Step 3: Push to GitHub

```bash
# Push to main branch
git push origin main

# GitHub actions run (if any)
# Vercel auto-deploys from main
# You get a preview URL
```

### Step 4: Tag When Happy

Once you've tested the preview and everything looks good:

```bash
# Create a tag (snapshot of current code)
git tag v1

# Push tags to GitHub
git push origin --tags

# View all tags
git tag -l
# Output:
# v1

# See what's in a tag
git show v1

# See commits between tags
git log v1..main --oneline  # What's new since v1
```

### Step 5 (Optional): Deploy Old Version

If you prefer an older version:

```bash
# In Vercel dashboard:
# Project Settings → Git
# Change "Production Branch" to "v{X}"

# Or via Vercel CLI:
vercel --prod --build-env VERCEL_GIT_COMMIT_REF=v4
```

---

## Semantic Versioning (How to Number)

```
v1      = First stable version (quiz working)
v2      = Added new feature (event detail page)
v3      = Bug fix (disabled broken feature)
v4      = Major feature (user auth working)
v5      = Oops, broke something, revert to v4
```

**Pattern:** v{major}.{minor}.{patch}
- Major: Big new feature (auth, payments, etc.)
- Minor: Small new feature (new page, component)
- Patch: Bug fix

**For MVP, just use v1, v2, v3... incrementing by 1.**

---

## Workflow Examples

### Scenario 1: Build & Deploy Normally

```bash
# Monday morning: Build quiz
npm run dev
# Implement quiz flow
git add .
git commit -m "feat: add quiz step 1 location selection"
git push origin main

# Preview looks good
git tag v1
git push origin --tags

# In Vercel: Set production branch to "v1"
# → v1 is now live
```

### Scenario 2: Build Multiple Features, Deploy Specific One

```bash
# Week 1: Build quiz
git commit -m "feat: add quiz"
git tag v1
git push origin --tags

# Week 2: Start event listing (still in progress)
git commit -m "feat: add event listing (WIP)"
git tag v2
git push origin --tags

# Week 3: Complete event listing
git commit -m "feat: finish event listing"
git tag v3
git push origin --tags

# But v3 has a bug in event filtering
# Deploy v2 instead (quiz + basic listing)
# In Vercel: Set production branch to "v2"

# Then fix v3 bug:
git commit -m "fix: event filtering bug"
git tag v4
git push origin --tags
# In Vercel: Set production branch to "v4"
```

### Scenario 3: Rollback to Old Version

```bash
# v5 broke something
# Quickly rollback to v4

# Option A: Switch Vercel to v4
# In Vercel dashboard: Set branch to "v4"
# Done instantly

# Option B: Continue from v5 but cherry-pick v4
git checkout v4
git checkout -b hotfix/rollback
# Make minimal fix
git commit -m "fix: critical bug from v5"
git tag v6
git push origin --tags
# In Vercel: Set branch to "v6"
```

---

## GitHub Tags vs Branches

**Tags:** Version snapshots (v1, v2, v3)
- Immutable (don't change)
- Point to specific commit
- Use for deployment

**Branches:** Active development lines (main, develop, feature/x)
- Mutable (change constantly)
- Used for PRs and collaboration
- Use for ongoing work

---

## Vercel Integration

### Connect GitHub to Vercel

```
1. Go to https://vercel.com
2. Import project from GitHub
3. Connect repo
4. Vercel auto-deploys main branch
```

### Set Production Deployment

```
Project Settings → Git → Production Branch
├── main    (deploy latest code)
├── v1      (deploy specific tag)
├── v2
└── v5
```

Every time you change this, Vercel re-deploys that ref.

### Preview Deployments

```
Every push to GitHub = automatic preview URL
https://cultural-events-preview-abc123.vercel.app

Review preview, then:
→ If good: Merge to main (auto-deploys production)
→ If bad: Push fix, get new preview
```

---

## Troubleshooting

**"Tag already exists"**
```bash
# Can't create v1 twice
# Delete and recreate:
git tag -d v1              # Delete local
git push origin --delete tag v1  # Delete remote
git tag v1                 # Create new
git push origin --tags
```

**"Can't push to Vercel"**
- Check GitHub is connected in Vercel
- Check env vars are set in Vercel
- Vercel dashboard shows build logs (check for errors)

**"Preview looks different than local"**
- Build differences between local and production
- Check env vars match (.env.local vs Vercel settings)
- Check build logs in Vercel dashboard

---

## Command Cheat Sheet

```bash
# Tagging
git tag v1                     # Create tag
git push origin --tags         # Push all tags
git tag -l                     # List tags
git show v1                    # See tag details
git checkout v1                # Switch to tag
git tag -d v1                  # Delete local tag
git push origin --delete tag v1 # Delete remote tag

# History
git log --oneline -10          # Last 10 commits
git log v1..v2                 # Commits between v1 and v2
git diff v1..v2                # Changes between v1 and v2
git log --graph --all --oneline # Visual history

# Undo
git reset --hard v1            # Go back to v1 (dangerous!)
git revert HEAD                # Undo last commit safely
git checkout HEAD -- file.ts   # Discard changes to file
```

---

## Best Practices

1. **Tag only when happy** — v1 should be stable
2. **Write clear commit messages** — Future you will thank present you
3. **Tag after testing** — Not before
4. **Keep tags in GitHub** — `git push origin --tags`
5. **One feature per commit** — Easy to review and undo
6. **Don't force push** — Unless absolutely sure
7. **Review before deploying** — Test preview first

---

## For Future (Multi-Contributor)

When team joins:
```bash
# Main branch policy
├── Require PR reviews
├── Require tests passing
├── Require status checks

# Branching
main
├── feature/quiz-flow (PR → main)
├── feature/event-details (PR → main)
└── hotfix/bug (PR → main)

# Tag strategy
v1-stable → Tag stable releases
v1-release → Release candidates
v1-hotfix → Bug fixes
```

See `.github/PULL_REQUEST_TEMPLATE.md` for PR review process.
