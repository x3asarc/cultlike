#!/usr/bin/env bash
# fetch-dev-docs-windows.sh - Windows-compatible docs fetcher using curl instead of wget
#
# Usage: bash fetch-dev-docs-windows.sh

# --- Configuration ---
# Target directory for all documentation  
BASE_DIR="$HOME/dev-docs"

# --- Functions ---

# Function to clone or pull a Git repository
clone_or_pull() {
    REPO_URL="$1"
    TARGET_DIR="$2"
    echo "➡️ Git: Cloning/Pulling $TARGET_DIR from $REPO_URL"
    if [ -d "$TARGET_DIR" ]; then
        echo "   Updating existing repository..."
        (cd "$TARGET_DIR" && git pull)
    else
        echo "   Cloning new repository..."
        git clone "$REPO_URL" "$TARGET_DIR"
    fi
    echo "   ✅ Complete: $TARGET_DIR"
}

# Function to download documentation using curl
download_docs() {
    URL="$1"
    TARGET_DIR="$2"
    echo "🌐 Curl: Downloading docs from $URL to $TARGET_DIR"
    mkdir -p "$TARGET_DIR"
    
    # Download the main page
    curl -L -s "$URL" -o "$TARGET_DIR/index.html"
    echo "   ✅ Downloaded: $TARGET_DIR/index.html"
}

# --- Execution ---

# Ensure base directory exists
mkdir -p "$BASE_DIR"
cd "$BASE_DIR" || exit 1

echo "--- Starting Docs Fetch into $BASE_DIR ---"
echo "📍 Working directory: $(pwd)"

# --- Git Repos (Source documentation) ---
echo ""
echo "=== CLONING GIT REPOSITORIES ==="

clone_or_pull https://github.com/supabase/supabase.git supabase
clone_or_pull https://github.com/shadcn-ui/ui.git shadcn-ui  
clone_or_pull https://github.com/facebook/react.git react-source
clone_or_pull https://github.com/vercel/next.js.git nextjs-source
clone_or_pull https://github.com/tailwindlabs/tailwindcss.com.git tailwind-site-source

# --- Download key documentation pages ---
echo ""
echo "=== DOWNLOADING DOCUMENTATION PAGES ==="

download_docs "https://vercel.com/docs" "vercel-docs"
download_docs "https://nextjs.org/docs" "nextjs-docs" 
download_docs "https://ui.shadcn.com/docs" "shadcn-docs-site"
download_docs "https://tailwindcss.com/docs" "tailwindcss-docs"

echo ""
echo "--- Docs Fetch Complete! ---"
echo "📁 Your documentation is available in: $BASE_DIR"
echo ""
echo "📋 Summary:"
echo "   Git repositories: supabase, shadcn-ui, react-source, nextjs-source, tailwind-site-source"  
echo "   Downloaded docs: vercel-docs, nextjs-docs, shadcn-docs-site, tailwindcss-docs"