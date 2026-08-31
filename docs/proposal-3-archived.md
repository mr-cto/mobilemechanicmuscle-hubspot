> **ARCHIVED 2026-08-31.** Proposal 3 was never sold. Client engagement closed at
> Proposal 2 (delivered and paid, 2026-04-24). Kept for reference only — nothing here
> is a live commitment, a current price, or an obligation to the client. Companion
> drafts: `proposal-3-conversion-archived.md`, `proposal-3-internal-detailed-archived.md`,
> `client-proposal-3-archived.pdf`.

# Proposal #3 — Off HubSpot, New Brand, 20,000 Pages

**From:** Tom
**For:** Alex — Mobile Mechanic Muscle
**Date:** May 4, 2026

---

## TL;DR

Three things, one number.

| # | What | $ |
|---|---|---:|
| 1 | Move site off HubSpot to Vercel | (bundled below) |
| 2 | Apply your new brand package | (bundled below) |
| 3 | Build engine + 20,000 generatable pages (lazy + cached) | |
| | **Total** | **$7,500** |

Plus ~$50–$150/year in AI API costs (Gemini Flash, pay-per-visit) — eaten by me or passed through, your call.

You and Allen never touch any of this. I run all of it. You wrench.

---

## What you got right

✅ Demand engine framing
✅ Route by job complexity
✅ Premium positioning, not the cheapest
✅ National travel for high-end work — opens up the real market
✅ 7-layer page architecture (core, make, model, problem, symptom, location, specialty)
✅ Booked invoices > traffic as the KPI

The vision is right. I'm building it.

---

## Two tracks, one site

You're moving away from everyday work. Allen and partner shops handle Nashville's daily grind. You focus on national luxury.

The site reflects that:

| Track | Audience | Pages | Target |
|---|---|---|---|
| **Allen's Nashville Everyday** | Daily-driver owners in middle TN | The original 17 pages, preserved | Brake jobs, diagnostics, basic repair — feeds Allen + partner shops |
| **Alex's National Luxury** | Collectors, exotic owners, classic restoration clients nationwide | 20,000 generated pages | Ferrari, Lamborghini, Bentley, classic muscle, restoration — Alex's personal practice |

The forms route appropriately based on which track the lead came from. Allen never gets a Pebble Beach Bugatti inquiry; Alex never gets a Camry brake job.

---

## Phase 1 — HubSpot → Vercel + Brand ($2,000, 8 hrs, ~1 week)

What changes:
- Site moves from HubSpot's locked CMS to Vercel (where I have full control to do everything in Phase 2)
- New brand package applied site-wide (logos, colors, fonts)
- All 17 existing pages and content stay intact

What stays the same (zero customer-facing change):
- HubSpot Forms API — leads still flow to your CRM
- HubSpot Files — images keep their current URLs
- HubSpot CRM — you manage contacts exactly like today
- Same URLs, same SEO, same Google rankings

Cutover plan:
- Parallel deploy at v2.mobilemechanicmusclenearme.com first
- You review on phone + desktop, sign off
- DNS cutover same day, 5-minute rollback if anything breaks

---

## Phase 2 — Luxury Auto Authority Engine ($5,500, 22 hrs)

This is the national luxury play. **All 20,000 generated pages target luxury, exotic, and classic vehicle owners.** Not a single page about Camry brakes.

### Architecture: lazy generation, cached forever

We don't pre-build 20K static pages. We build an **engine** that generates pages on demand and caches them so we never pay twice.

```
First visit to /luxury/<slug>:
   ↓
Check Vercel Postgres for slug
   ↓
   HIT  → serve cached page (~50ms)
   MISS → call Gemini Flash → store in DB → serve (~5–15s)
   ↓
Every subsequent visit: instant from cache
```

**Why this matters:**
- We pay only for pages that actually get traffic (and Google indexing)
- If 12,000 of 20,000 never get visited, we save 60% of API spend
- When the engine improves, we revalidate selectively, not rebuild everything
- Easy to scale past 20K later — no build-time bloat

### What gets built

1. **Seed registry** — 20,000 seed records (luxury make × model × problem × wealthy zip × angle), filtered for relevance
2. **Dynamic route** — `/luxury/[...slug]/page.tsx` checks DB, generates on miss, caches the result
3. **Generation service** — sends each seed to Gemini 2.5 Flash with Search Grounding, validates output, stores in Postgres
4. **Race-condition handling** — distributed lock so two simultaneous visitors don't trigger double-generation
5. **Pre-warm worker** — fetches top 1,500 highest-intent pages from our own infrastructure right after sitemap submission, so Google bots hit warm cache (~$15 in API costs)
6. **Sitemap generator** — produces 10 sitemap files of 2K URLs each, submitted to Search Console
7. **Admin endpoint** — force-regenerate a single page if you ever want to update it
8. **QA sampler** — spot-checks 5% against quality rubric, flags failures for prompt iteration

### Why Gemini 2.5 Flash with Search Grounding

**Search Grounding** is the difference between unique-feeling collector content and AI slop. Gemini queries Google in real-time when generating each page:

- "Ferrari 458 timing service Greenwich CT" references real Greenwich collector businesses, real 458 timing chain failure modes, real comparison to dealer service
- "1969 Pontiac GTO restoration Pebble Beach" cites actual Pebble Beach concours culture, real GTO-specific build-sheet decoding, real period-correct restoration standards
- No two pages share research — each one independently grounded in real collector and vehicle facts

Cost: pay-per-visit at ~$0.0075/page. Realistic 12-month spend: $50–$150.

### Page audience: luxury and exotic owners only

Every generated page targets one of:

- **Modern exotic owners** — Ferrari, Lamborghini, McLaren, Bugatti, Pagani, Koenigsegg
- **Modern luxury performance** — BMW M-series, Mercedes-AMG, Audi RS, Porsche 911/Cayenne/Panamera, Aston Martin, Bentley, Rolls Royce, Maserati
- **Modern muscle** — Hellcat, Demon, ZL1, Z06, GT500, Trackhawk, TRX
- **Classic muscle** — Pontiac GTO, Chevelle, Camaro Z/28, Mustang Boss, original Hellcat era cars
- **Classic exotic / vintage** — pre-90s Ferrari, Porsche 911 air-cooled, classic Mercedes SL, Jaguar E-type, vintage Aston, Daytona-era restorations

**Not in scope:** Civic, Camry, F-150, RAV4, Wrangler, work vans, fleet, daily drivers. Those leads route to Allen via the original 17 pages.

### Geographic seed list (national wealthy zips)

~50 wealthy U.S. metros where collectors live, where the cars are stored:

- **Northeast:** Greenwich, Hamptons, Manhattan UES, Westport, Darien, Boston Back Bay
- **Southeast:** Buckhead, Naples FL, Palm Beach, Charleston, Miami Beach, Coral Gables
- **Midwest:** Bloomfield Hills, Lake Forest, Indian Hill (Cincinnati)
- **South Central:** Highland Park (Dallas), Tarrytown (Austin), River Oaks (Houston)
- **Mountain:** Aspen, Vail, Park City, Jackson Hole, Telluride
- **West:** Bel Air, Malibu, Atherton, Pebble Beach, Carmel, Hillsborough
- **Pacific NW:** Mercer Island, Bellevue, Hunts Point
- **Nashville metro** — kept as one of the 50 (it's a real luxury market and your home base)

50 cities × 25 luxury makes × 8 specialty services × 7 angles × 3–5 problem variants → filtered down to the 20,000 most-relevant combinations.

### Page architecture (collector-grade)

| Priority | Layer | Why |
|---|---|---|
| 1 | **Make + Model + Problem** | "Ferrari 458 timing chain service" — collectors search this exact thing |
| 2 | **Wealthy zip + make** | "Greenwich Bentley specialist" — geo-targeted authority |
| 3 | **Restoration / specialty** | "1969 GTO restoration", "Air-cooled 911 service" — feeds your future shop |
| 4 | **Make + Model + Service** | "Lamborghini Urus brake service" |
| 5 | **Symptom + collector vehicle** | "Classic Ferrari overheating diagnosis" |
| 6 | **Make-level authority** | "Ferrari specialist Aspen" |
| 7 | **National travel positioning** | "Mobile luxury auto specialist — we travel to your collection" |

### Voice and positioning

Every page reads as collector-grade, not strip-mall mechanic:

- **Diagnostic-first** becomes **inspection-first** ("pre-purchase inspection", "concours-grade evaluation")
- **CTA** is "schedule consultation" or "request inspection," never "book service"
- **Pricing** is implicit and consultative — never quoted upfront
- **Travel** is positioned as a service, not a constraint ("we travel to your garage, your storage facility, your storage trailer at the auction")
- **Trust signals** prioritize collector-relevant credentials (auction event presence, club affiliations, high-ticket past projects)

### Quality bar

Every generated page passes a programmatic check before going to cache:
- Min 800 words
- Frontmatter complete (title, meta, schema, OG image)
- ≥ 2 internal links to related collector pages
- No forbidden phrases ("high quality service," "look no further," "in today's world," etc.)
- Real geographic reference present (a landmark, road, or business in the target zip)
- Make/model-specific reference present (a real common failure mode, original part number, era-correct detail)

If a generation fails the rubric, the lock releases and the next visitor triggers regeneration with a refined prompt.

I spot-check the first 100 generated pages manually before launch. After launch, the QA sampler runs weekly on a 5% random sample of newly-generated pages. If any week scores below 7/10 average, I retune and force-regenerate the affected slugs.

### Timeline

- Week 1: build engine + brief iteration (12 hrs) — uses a 100-page warm test set, manually reviewed
- Week 2: pre-warm script seeds the top 1,500 highest-intent pages (~$15 in API). Sitemap submitted to Search Console. (6 hrs)
- Week 3: cleanup, QA, monitoring dashboard so you can see what's getting hit (4 hrs)

Engine **live and serving** by end of Week 3. The other 18,500 pages exist as routes — they generate the first time someone (or Google) visits. Indexation takes 2–6 months — Google won't crawl all 20K immediately.

---

## What you and Allen never touch

You're mechanics. You wrench. I do all the tech.

❌ Never log into a CMS, admin panel, or publishing tool
❌ Never paste prompts into ChatGPT or write copy
❌ Never edit code, push deploys, or configure analytics
❌ Never touch the page engine, the API, or the brand assets

✅ Answer the phone
✅ Show up to jobs
✅ Mark jobs complete in HubSpot like you already do
✅ Read my 5-minute monthly report
✅ Tell me when something's off — I fix it

---

## Payment

| Item | When | Amount |
|---|---|---:|
| Phase 1 deposit (40%) | Today | $800 |
| Phase 1 delivery (60%) | DNS cutover | $1,200 |
| Phase 2 deposit (40%) | Phase 1 ship | $2,200 |
| Phase 2 midpoint (30%) | Engine live, top 100 pages reviewed | $1,650 |
| Phase 2 delivery (30%) | Pre-warm complete, sitemap submitted, dashboard ready | $1,650 |
| AI API + Postgres | Pass-through or bundled (your call) | ~$50–$150/year |

Same Mercury links. Same family rate ($250/hr). 2 free revision hours per phase.

---

## What I'm NOT charging for

- Strategy calls
- The first 1,000 pages of QA (manual review — significant time)
- Search Console + GA setup
- Migration insurance — if cutover breaks something, the fix is on me
- Re-running batches if the rubric fails on first try (eats my time, not your budget)

---

## Risks (real ones)

**Indexation isn't guaranteed.** Google may take 6+ months to crawl 20K. Realistic: 30–60% indexed at 90 days, more over time. Most pages may never get traffic — we're playing the long tail. If even 1% of indexed pages land high-intent traffic, the math works.

**Quality is enforced by the engine, not by you.** The brief design + 5% sample review is what stands between us and Google's helpful-content filter. If a batch fails, I fix the brief and regenerate (no extra charge).

**Travel logistics aren't in this proposal.** Insurance for $200K cars, mobile rig, scheduling for national jobs — those are operational decisions you'll need to make as the leads roll in. We can scope those separately when ready.

---

## Next Steps

1. Yes/no on the proposal
2. AI API costs: pass-through (~$150 line item) or bundled into Phase 2?
3. OpenPhone / similar phone routing — do you want me to bundle that into Phase 1, or skip for now? *(Honest read: missed-call-text-back is the highest-ROI thing I could install for you, and it's ~$200 of my time. Strongly recommend bundling.)*
4. Send Phase 1 deposit ($800) — I start within 3 business days

---

— Tom
