#!/usr/bin/env bash
# fetch-dev-docs.sh - Pulls documentation using the best method (Git or wget).
#
# Usage: chmod +x fetch-dev-docs.sh && ./fetch-dev-docs.sh

# --- Configuration ---
# Target directory for all documentation
BASE_DIR="$HOME/dev-docs"

# Wget configuration for site mirroring
WGET_CONFIG=(
  --recursive          # Recurse through the directory structure
  --page-requisites    # Get all necessary files (CSS, images, etc.)
  --convert-links      # Make links suitable for offline viewing
  --no-parent          # Don't ascend to the parent directory
  --wait=1             # Wait 1 second between retrievals (BE GENTLE)
  --limit-rate=50k     # Limit speed to 50k (Optional, but polite)
  --domains            # Limit recursion to specified domains
)

# --- Functions ---

# Function to clone or pull a Git repository
clone_or_pull() {
    REPO_URL="$1"
    TARGET_DIR="$2"
    echo "➡️ Git: Cloning/Pulling $TARGET_DIR from $REPO_URL"
    if [ -d "$TARGET_DIR" ]; then
        (cd "$TARGET_DIR" && git pull)
    else
        git clone "$REPO_URL" "$TARGET_DIR"
    fi
}

# Function to mirror a documentation website
mirror_site() {
    URL="$1"
    TARGET_DIR="$2"
    DOMAIN=$(echo "$URL" | awk -F/ '{print $3}') # Extracts the domain
    echo "🌐 Wget: Mirroring $TARGET_DIR from $URL"
    mkdir -p "$TARGET_DIR"
    (
      cd "$TARGET_DIR"
      wget "${WGET_CONFIG[@]}" "$URL" --domains="$DOMAIN"
    )
}

# --- Execution ---

# Ensure base directory exists
mkdir -p "$BASE_DIR"
cd "$BASE_DIR" || exit 1

echo "--- Starting Docs Fetch into $BASE_DIR ---"
set -e # Exit immediately if a command exits with a non-zero status.

# --- 1. Git Repos (Preferable for source docs) ---

# Note: The docs for these services are often within the main project repo.
clone_or_pull https://github.com/supabase/supabase.git supabase
clone_or_pull https://github.com/shadcn-ui/ui.git shadcn-ui
# React docs source: https://github.com/facebook/react/tree/main/docs
clone_or_pull https://github.com/facebook/react.git react-source
# Next.js docs source: https://github.com/vercel/next.js/tree/canary/docs
clone_or_pull https://github.com/vercel/next.js.git nextjs-source
# Tailwind CSS docs source: https://github.com/tailwindlabs/tailwindcss.com/
# Note: Tailwind's official site is separate, making mirroring a good option too.
clone_or_pull https://github.com/tailwindlabs/tailwindcss.com.git tailwind-site-source

# --- 2. Site Mirroring (For rendered HTML/client-side docs) ---

# Note: These are better as mirrored sites because they involve complex
# client-side rendering or are separate from the main source code.

# Mirror Vercel's official documentation
mirror_site "https://vercel.com/docs" "vercel-docs"

# Mirror Next.js's public docs site (usually more complete/user-friendly than source)
mirror_site "https://nextjs.org/docs" "nextjs-docs"

# Mirror shadcn/ui's rendered docs
mirror_site "https://ui.shadcn.com/docs" "shadcn-docs-site"

# Mirror Tailwind CSS docs site
mirror_site "https://tailwindcss.com/docs" "tailwindcss-docs"

echo "--- Docs Fetch Complete! ---"
echo "Your documentation is available in $BASE_DIR"