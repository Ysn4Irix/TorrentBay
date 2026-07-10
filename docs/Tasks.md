# TorrentBay Milestones

## Milestone 1: Project Foundation

- Initialize Expo React Native with TypeScript, NativeWind, Expo Router, Zustand, MMKV, Cheerio, and Lucide icons.
- Configure strict TypeScript, linting, formatting, path aliases, and app constants.
- Create clean architecture folders for app routes, features, services, models, store, hooks, utils, constants, and types.
- Add base routes for Splash, Home, Search Results, Torrent Details, Favorites, and Settings.
- Establish shared UI primitives, theme tokens, and reusable loading, empty, and error states.

## Milestone 2: Core Scraping Pipeline

- Build The Pirate Bay search URL generator with category, pagination, and optional sort support.
- Implement HTML fetching with timeout, retry-safe errors, and no JavaScript execution.
- Parse relevant torrent result nodes while ignoring ads, trackers, scripts, iframes, and unrelated markup.
- Extract, sanitize, validate, and normalize torrent metadata into the `Torrent` model.
- Add parser and scraping pipeline tests for valid, empty, malformed, and changed-layout HTML.

## Milestone 3: Search Experience

- Implement Home search UI with instant search, manual search, clear input, recent searches, and favorites shortcuts.
- Build Search Results with query header, filters, optional sorting, pagination, and virtualized list rendering.
- Add loading, empty, retry, offline, timeout, provider unavailable, and rate-limit states.
- Connect search state to the scraper pipeline with stale-response protection.
- Optimize list rendering for smooth scrolling and minimal re-renders.

## Milestone 4: Torrent Details and Actions

- Implement Torrent Details with complete metadata, trusted/VIP indicators, description, and provider links.
- Add actions for copy magnet link, open magnet, share magnet, view details, and open provider page.
- Add accessible labels, feedback states, and failure handling for unsupported actions.
- Ensure scraped values render as text only and are never injected as HTML.

## Milestone 5: Local Data Features

- Implement MMKV-backed recent searches, search history, and favorites stores.
- Add history controls for search again, delete single entry, and clear all history.
- Add favorites controls for bookmark, unbookmark, list favorites, and clear favorites.
- Implement Settings actions for clear cache, clear favorites, clear history, About, and app version.
- Add persistence tests for storage, deletion, and cache clearing.

## Milestone 6: Quality, Performance, and Release Readiness

- Verify TalkBack labels, scalable text, touch targets, and high contrast compatibility.
- Profile startup time, search flow, memory usage, FlatList performance, and unnecessary re-renders.
- Complete test coverage for parser, scraping pipeline, search flow, favorites, and navigation.
- Validate graceful handling for no internet, invalid HTML, provider changes, timeouts, and unknown errors.
- Run lint, type check, tests, and Expo build checks before release.
- Confirm acceptance criteria and out-of-scope constraints are met.
