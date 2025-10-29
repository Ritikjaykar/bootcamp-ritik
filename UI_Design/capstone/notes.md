# Inform India — Design Rationale

## Overview
"Inform India" is a lightweight HTML/CSS press releases explorer focused on clarity, typographic reading comfort, accessibility, and responsive behavior. The deliverable includes a landing page (index.html), a detail page (detail.html), and shared styles (styles.css).

---

## Typography & Spacing (25 pts)
- **Font stack:** `Inter, system-ui` for modern UI text. `line-height:1.5` and `max-width` measured in `ch`.
- **Measure:** article body uses `--measure: 65ch` to maintain readable line length (~60–75ch).
- **Spacing scale:** `--space-1..--space-5` provides consistent rhythm for margins, padding, and grid gaps.

## Color & Contrast (20 pts)
- **CSS variables:** Light & dark theme variables declared in `:root`. Dark theme toggles using the CSS checkbox hack (`.theme-toggle`).
- **Color systems:** OKLCH used for accent tones (`--accent` / `--accent-strong`) for perceptual uniformity; HSL used for backgrounds and muted text for broad support.
- **WCAG:** Aim for AA contrast on text/background. Headline colors use `--text` vs `--card` backgrounds. Accent links use higher chroma OKLCH for clear affordance.

## Layout & Responsiveness (15 pts)
- **Grid-based cards:** `card-list` uses `repeat(auto-fit, minmax(260px, 1fr))` for fluid columns (1→2→3+).
- **Two-column main:** `.layout` provides main + sidebar; collapses to single column at 980px.
- **Images:** `<picture>` with WebP + JPG sources and `loading="lazy"` for performance.

## Usability & Accessibility (30 pts)
- **Landmarks:** `<header>`, `<main>`, `<aside>`, `<footer>` used; `role` attributes where appropriate.
- **Keyboard:** All cards and read links are keyboard-focusable (`tabindex="0"` and focus-visible styles).
- **Filters:** Category filters are CSS-only radios, accessible with labels. They visually filter cards via attribute selectors in CSS (no JS).
- **Alerts & feedback:** Load-more and search are UI-only (visual). The design is ready for progressive enhancement with JS if needed.
- **ARIA:** `aria-live="polite"` on card-list to signal updates; `aria-label` and visually-hidden labels for controls.

## Performance
- Use responsive `picture` sources for thumbnails and hero images (1x/2x).
- `loading="lazy"` and `decoding="async"` used where supported.
- CSS-only interactions reduce script cost.

## What works (limitations)
- Search and "Load more" are visual controls (no JS). They are intentionally included as UI affordances that can be wired to JS later.
- Date sorting is shown as "Sorted by: Newest" visually; a JS enhancement could allow dynamic sorting.

## Testing & Checklist
- [ ] Keyboard navigation: Tab through header, filters, cards, read links.
- [ ] Color contrast: measure headline/body on both themes (aim >= 4.5:1 for body text).
- [ ] Responsiveness: check 320px/768px/1440px breakpoints.
- [ ] Image fallback: test WebP fallback to JPG in non-WebP browsers.

## Files
- index.html — landing
- detail.html — article
- styles.css — shared styles & theme
- notes.md — this rationale

---

## Next steps (if allowed)
- Add minimal JS to wire search, sorting, and "load more" for full interactivity.
- Replace placeholder images with editorial assets and add alt text documenting source/credits.
- Add pagination and server-side data integration for a production-ready explorer.
