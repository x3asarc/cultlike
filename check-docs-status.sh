#!/usr/bin/env bash
# check-docs-status.sh - Check what documentation has been downloaded

BASE_DIR="$HOME/dev-docs"

echo "📁 Documentation Download Status"
echo "================================="
echo "📍 Location: $BASE_DIR"
echo ""

if [ ! -d "$BASE_DIR" ]; then
    echo "❌ dev-docs directory not found"
    exit 1
fi

cd "$BASE_DIR"

echo "✅ Git Repositories:"
for repo in supabase shadcn-ui react-source nextjs-source tailwind-site-source; do
    if [ -d "$repo" ]; then
        echo "  ✅ $repo - $(du -sh "$repo" 2>/dev/null | cut -f1)"
    else
        echo "  ⏳ $repo - Not downloaded yet"
    fi
done

echo ""
echo "🌐 Downloaded Docs:"
for docs in vercel-docs nextjs-docs shadcn-docs-site tailwindcss-docs; do
    if [ -d "$docs" ]; then
        echo "  ✅ $docs - $(du -sh "$docs" 2>/dev/null | cut -f1)"
    else
        echo "  ⏳ $docs - Not downloaded yet"
    fi
done

echo ""
echo "📊 Total size: $(du -sh . 2>/dev/null | cut -f1)"