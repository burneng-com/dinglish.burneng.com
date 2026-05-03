#!/usr/bin/env bash
set -euo pipefail

# Read current version
VERSION_FILE="VERSION"
CURRENT=$(cat "$VERSION_FILE" | tr -d '\n')
echo "Current version: $CURRENT"

# Parse and bump
# Format: v20260503.1 → v20260503.2
DATE_PART=$(echo "$CURRENT" | cut -d'.' -f1 | tr -d 'v')
NUM_PART=$(echo "$CURRENT" | cut -d'.' -f2)
TODAY=$(date +%Y%m%d)

if [ "$DATE_PART" = "$TODAY" ]; then
  NUM_PART=$((NUM_PART + 1))
else
  DATE_PART="$TODAY"
  NUM_PART=1
fi

NEW_VERSION="v${DATE_PART}.${NUM_PART}"
echo "$NEW_VERSION" > "$VERSION_FILE"

# Update package.json version
sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"${NEW_VERSION}\"/" package.json

echo "New version: $NEW_VERSION"

# Git tag
git add VERSION package.json
git commit -m "Release ${NEW_VERSION}" || true
git tag "$NEW_VERSION"

# Build and deploy
echo "Building..."
bun run build

echo "Deploying..."
CLOUDFLARE_ACCOUNT_ID=abb8ec8efb3bf663e3a620ac4f1642e1 wrangler pages deploy dist --project-name=dinglish-garden

# Push with tags
git push origin main --tags

echo "Deployed ${NEW_VERSION} successfully!"
