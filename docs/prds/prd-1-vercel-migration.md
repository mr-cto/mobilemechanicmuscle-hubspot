# PRD-1 — Re-platform to Vercel + Brand Refresh

**Status:** Draft
**Owner:** Tom
**Estimate:** 8 hours @ $250/hr = $2,000
**Phase:** 1 (precedes pSEO engine in PRD-2)
**Last updated:** 2026-05-04

---

## Problem

The current site lives on HubSpot's Growth theme, which is **locked** — modules can't be edited in Design Manager, the home/contact/gallery pages are HubSpot drag-and-drop only, and there's no path to programmatic page generation. This blocks PRD-2 (the pSEO engine) entirely.

Concurrently, Alex delivered a new brand package (logos, colors, fonts) on 2026-04-29. Applying it to HubSpot would mean fighting locked theme CSS for 10+ hours; applying it to a Next.js port is ~2 hours of Tailwind config.

## Goal

Move all rendering to a Next.js project on Vercel Pro with the new brand applied, **while keeping HubSpot for what it's actually good at** — Forms API, CRM, and image hosting. Zero customer-facing change in lead flow.

## Non-goals

- ❌ Migrating contacts off HubSpot (stays as CRM)
- ❌ Migrating images off HubSpot Files (absolute URLs continue to work from Vercel)
- ❌ Building a CMS UI (separate quote if Alex wants one later)
- ❌ Changing form behavior (still POSTs to HubSpot Forms API endpoint `94d999ff-8124-43e0-a42d-9610a4891681`)
- ❌ URL structure changes (preserves SEO; no redirect rules needed)

## Architecture

```
                       ┌─────────────────────────┐
                       │   Vercel Pro project    │
                       │   (Next.js, App Router) │
                       │                         │
  customer ──HTTPS──→  │   /                     │   ←── deploys from this repo
  mobilemechanic      │   /services/<slug>      │
  musclenearme.com    │   /locations/<slug>     │
                       │   /high-end-vehicles    │
                       │   /muscle-cars          │
                       │   /commercial-equipment │
                       │   /request-service      │       ┌──────────────────┐
                       │   /all-services         │  POST │   HubSpot         │
                       │       (form posts) ──────────→ │   Forms API       │
                       │                         │       │   (unchanged)    │
                       │   <img src="hubspot     │       └──────────────────┘
                       │     fileUrl"> ──────────────→ │   HubSpot Files   │
                       │                         │       │   CDN (unchanged) │
                       └─────────────────────────┘       └──────────────────┘
                                                                  │
                                                                  ▼
                                                         ┌──────────────────┐
                                                         │  HubSpot CRM      │
                                                         │  (lead capture,   │
                                                         │   unchanged)      │
                                                         └──────────────────┘
```

## Scope (the 8 hours)

| # | Task | Hrs |
|---|---|---:|
| 1 | `npx create-next-app@latest` with App Router + TypeScript + Tailwind, link to Vercel Pro project | 0.5 |
| 2 | Tailwind theme tokens from MMM Brand Package PDF (color palette, type scale, brand fonts loaded via `next/font`) | 1.5 |
| 3 | Port 17 pages from `src/pages/*.html` → `app/<route>/page.tsx`. HTML drops in mostly verbatim; swap relative asset URLs to absolute HubSpot Files URLs; replace logo `<img>` src with new brand logo | 3.0 |
| 4 | Form: `app/request-service/page.tsx` keeps the existing client-side fetch to HubSpot Forms API. Update CORS/origin if needed; no backend changes | 0.5 |
| 5 | Service + location pages — port `scripts/lib/ServiceContentGenerator.js` and `LocationContentGenerator.js` outputs to MDX or static TSX. Generate from `config/services-config.json` and `config/neighborhoods-config.json` at build time | 1.0 |
| 6 | DNS prep: add `v2.mobilemechanicmusclenearme.com` as preview domain on Vercel; final cutover swaps `mobilemechanicmusclenearme.com` apex CNAME from HubSpot to Vercel | 0.5 |
| 7 | Smoke test: every URL responds 200, forms submit successfully (verify in HubSpot CRM), images load from HubSpot CDN, mobile + desktop visual parity | 0.5 |
| 8 | Cutover + post-deploy verification | 0.5 |

## Brand application checklist

From `~/Downloads/Mobile Mechanic Muscle/`:

- [ ] **Logo:** swap to `MMM Logo Transparent (1).png` (or whichever variant Alex prefers — confirm during preview review). Variants for header (transparent), favicon, OG image.
- [ ] **Color palette:** extracted from `Aurora Pallette.png` and the Brand Package PDF → Tailwind theme `colors.brand.*` tokens
- [ ] **Typography:** brand fonts (per Package PDF) loaded via `next/font/google` or `next/font/local` for the heading/body pairing
- [ ] **OG / social images:** regenerate with new brand
- [ ] **Favicon:** new logo, sized appropriately (`favicon.ico`, `apple-touch-icon.png`)
- [ ] **Inline styles sweep:** the existing 17 pages have inline `<style>` blocks (per CLAUDE.md). Regex pass to extract hardcoded color hex values; replace with Tailwind classes during port

## Cutover plan

1. **T-1 day:** Deploy to `v2.mobilemechanicmusclenearme.com`. Alex reviews on phone + desktop. Sign-off required.
2. **T-0:** DNS swap of apex domain CNAME. Vercel SSL provisions automatically.
3. **T+1 hour:** Submit updated `sitemap.xml` to Search Console (URLs unchanged — this is just a freshness ping).
4. **T+24 hours:** Verify Google Analytics + Search Console show traffic on new origin (Vercel logs) instead of HubSpot.

**Rollback:** if anything breaks, swap CNAME back to HubSpot. Total revert time < 5 min once DNS propagates.

## Acceptance criteria

- [ ] All 17 URLs render at parity with current HubSpot pages
- [ ] Request-service form submits → HubSpot CRM contact created with all expected fields
- [ ] New brand logo, color palette, and typography applied site-wide
- [ ] No console errors on any page
- [ ] Lighthouse mobile score ≥ 85 on home and request-service (currently lower on HubSpot due to unoptimized assets)
- [ ] Search Console verified on new origin

## Risks + mitigations

| Risk | Mitigation |
|---|---|
| HubSpot Forms API CORS blocks Vercel origin | Pre-test in Phase 1 before cutover; add Vercel domain to HubSpot allowed origins if needed (~15 min) |
| Brand fonts unlicensed for web use | Verify license in Brand Package PDF; if proprietary, use closest Google Fonts equivalent + flag to Alex |
| HubSpot Files CDN URL pattern changes | Low — has been stable for years; if it changes we re-host the ~30 images on Vercel Blob (out of scope for Phase 1) |
| Inline `<style>` blocks contain conflicts after color-token sweep | QA pass page-by-page during port |

## Dependencies

- Vercel Pro account (confirmed: Tom's existing team account)
- HubSpot Forms API endpoint ID `94d999ff-8124-43e0-a42d-9610a4891681` (existing, no change)
- HubSpot CRM access (no change)
- Brand Package PDF + asset folder at `~/Downloads/Mobile Mechanic Muscle/` (confirmed: present)

## Open questions for Alex

- Which logo variant from the 5 transparent + 6 with-background do you want as primary site header?
- Brand Package PDF — any custom hex codes, or extract from `Aurora Pallette.png`?
- After cutover, do you want me to delete the HubSpot CMS pages or leave them as warm-standby for 30 days?
