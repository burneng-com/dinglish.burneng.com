# Changelog

All notable changes to Dinglish Garden will be documented in this file.

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
