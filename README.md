# Dinglish Garden

> Grow your English, one word at a time.

A mobile-first vocabulary learning website with 6 fun learning modes.

## Features

- **Daily Word** — One featured word per day with streak tracking
- **Flashcards** — Tap-to-flip cards, mark as known or review
- **Multiple Choice Quiz** — 4-option quiz with score tracking
- **Word Matching** — Pair English words with Chinese meanings
- **Fill-in-the-Blank** — Type missing words in example sentences
- **Word Garden** — Visual collection of learned words

## Tech Stack

- [Astro](https://astro.build) — Static site framework
- [Bun](https://bun.sh) — Runtime & package manager
- localStorage — All progress saved locally, no backend needed
- Cloudflare Pages — Deployment target

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Deploy to Cloudflare Pages (Wrangler)

```bash
# Login to Cloudflare (first time only)
wrangler login

# Build & deploy in one command
bun run deploy

# Or deploy manually
bun run build
wrangler pages deploy dist --project-name=dinglish-garden
```

After first deploy, add custom domain `dinglish.bruneng.com` in Cloudflare Pages dashboard.

## Project Structure

```
src/
  data/vocabulary.ts    — 55 built-in vocabulary words
  utils/storage.ts      — localStorage helpers
  styles/global.css     — Garden-themed styles
  layouts/Layout.astro  — Base HTML layout
  pages/index.astro     — Main SPA page with all modes
```
