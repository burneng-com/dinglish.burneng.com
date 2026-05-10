# Changelog

All notable changes to Dinglish Garden will be documented in this file.

## v20260510.1 — 2026-05-10

### Added
- `/admin` page to add, delete, export, and import custom vocabulary words
- Source selector on homepage: Built-in / My Words / All
- All 6 learning modes support custom word source
- CSV export/import for custom words (separate from progress backup)
- "Manage My Words" link on homepage to /admin
- i18n support (EN/ZH) for all new UI elements

### Fixed
- Empty source guard added to Flashcard mode (mini-cc review)
- Source selection whitelist validation for localStorage value

## v20260503.4 — 2026-05-03

### Added
- Difficulty stats (beginner/intermediate/advanced) in Garden view

## v20260503.3 — 2026-05-03

### Added
- `/changelog` page rendering CHANGELOG.md
- Version number displayed in footer with link to changelog

## v20260503.2 — 2026-05-03

### Fixed
- Fixed init() crash caused by null element addEventListener calls
- Fixed E2E test strict mode violation on `[data-back]` selector

### Added
- 15 Playwright E2E tests covering all 6 learning modes
- CSV import for restoring learning progress from backup
- Version number display with link to changelog page
- `/changelog` page to view version history
- Auto-versioning deploy script (`scripts/deploy.sh`)
- CHANGELOG.md for tracking releases

## v20260503.1 — 2026-05-03

### Added
- Initial release of Dinglish Garden
- 6 learning modes: Daily Word, Flashcards, Quiz, Matching, Fill-in-the-Blank, Word Garden
- 55 built-in vocabulary words (20 beginner, 20 intermediate, 15 advanced)
- Chinese/English language toggle with persistent preference
- Progress dashboard: learned count, review count, daily streak, quiz accuracy
- CSV export/import for learning progress backup and transfer
- Mobile-first responsive design with garden theme
- Reset progress with confirmation modal
- E2E test suite with Playwright (16 tests)
- Wrangler-based deploy script with auto-versioning
