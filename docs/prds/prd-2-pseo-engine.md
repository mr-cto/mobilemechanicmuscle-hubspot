# PRD-2 — Programmatic SEO Engine via Local Claude Code Agent Swarm

**Status:** Draft
**Owner:** Tom
**Estimate:** 20 hours @ $250/hr = $5,000 (engine + first 1,000 pages)
**Phase:** 2 (depends on PRD-1 ship)
**Last updated:** 2026-05-04

---

## Problem

Mobile Mechanic Muscle wins on Google Business Profile but is invisible in long-tail organic search. Searches like *"BMW M3 brake service Brentwood TN"* or *"diesel skid steer hydraulic repair Franklin TN"* — the kind that match real customer intent — currently return zero MMM results, because no page exists for those specific (vehicle × service × locale) combinations.

Generic AI content fails Google's helpful-content filter. Templated programmatic SEO at scale (the "millions of pages" model) was killed by the March 2024 update. **What still works:** unique, locally-relevant, vehicle-specific pages with real research per page.

## Goal

Build a content engine that produces **thousands of unique, research-backed pages** at zero marginal AI cost by leveraging Tom's Claude Code Max subscription to spawn parallel agent workers locally. Each worker independently researches one (service × city × vehicle) tuple and writes one MDX page with no shared template.

Launch with **1,000 pages**, measure indexation + traffic for 60 days, scale to 5K → 10K → 20K based on results.

## Non-goals

- ❌ Generic templated content with mad-libs blanks (this is what Google penalizes)
- ❌ Pure AI-API token-burning batch generation (defeats the cost advantage)
- ❌ Real-time / on-demand generation (overkill — pages are static)
- ❌ Per-page human review (impossible at this volume; quality enforced via brief design + sampling)
- ❌ Backlink campaigns or off-site SEO (separate workstream if Alex wants)

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       LOCAL (Tom's Mac)                                  │
│                                                                          │
│   ┌──────────────┐    ┌──────────────┐                                  │
│   │ seeds.ts     │    │ briefs/      │   each brief is a unique         │
│   │              │ ─→ │  seed-001.md │   prompt: service+city+vehicle   │
│   │ generates    │    │  seed-002.md │   + research hooks + angle       │
│   │ unique tuples│    │  ...         │   (story / FAQ / problem-list /  │
│   └──────────────┘    └──────────────┘    technical / comparison)        │
│                              │                                           │
│                              ▼                                           │
│                       ┌──────────────┐                                   │
│                       │ dispatcher.ts│   spawns N parallel               │
│                       │              │   `claude --print < brief.md`     │
│                       │ queue + retry│   processes (Max sub)             │
│                       │ + checkpoint │                                   │
│                       └──────┬───────┘                                   │
│         ┌──────┬──────┬──────┼──────┬──────┬──────┐                     │
│         ▼      ▼      ▼      ▼      ▼      ▼      ▼                     │
│      claude  claude  claude  claude  claude  claude  claude              │
│      worker  worker  worker  worker  worker  worker  worker              │
│      (Max)   (Max)   (Max)   (Max)   (Max)   (Max)   (Max)               │
│         │      │      │      │      │      │      │                     │
│         │ each researches its tuple via WebSearch + WebFetch              │
│         │ writes one .mdx file with frontmatter + 800-1500 words          │
│         ▼      ▼      ▼      ▼      ▼      ▼      ▼                     │
│   ┌─────────────────────────────────────────────────────────┐           │
│   │  content/seo-pages/<slug>.mdx                            │           │
│   └─────────────────────────────────────────────────────────┘           │
│                              │                                           │
│                              ▼                                           │
│                       ┌──────────────┐                                   │
│                       │ linker.ts    │   builds internal-link graph     │
│                       │              │   between generated pages         │
│                       └──────┬───────┘                                   │
│                              ▼                                           │
│                       ┌──────────────┐                                   │
│                       │ qa-sampler.ts│   spot-check 5% against rubric    │
│                       │              │   (uniqueness, length, schema,    │
│                       │              │   factual grounding, no slop)     │
│                       └──────────────┘                                   │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   │ git commit, push
                                   ▼
                          ┌──────────────────┐
                          │  Vercel build    │   Next.js generateStaticParams
                          │                  │   over content/seo-pages/*    
                          │  Static HTML     │   → 1K → 20K static routes    
                          └──────────────────┘
```

## Seed strategy

A "seed" defines one page's identity. The engine generates ~20K unique seeds; the first 1K are sampled for the Phase 2a launch.

**Seed dimensions:**

| Dimension | Source | Count |
|---|---|---:|
| **Service** | `config/services-config.json` (existing 7) + 13 expansions (oil change, tire rotation, alignment, AC service, transmission, fuel injection, alternator/starter, suspension, exhaust, fluid service, recall work, key/ignition, heater core) | ~20 |
| **City / neighborhood** | `config/neighborhoods-config.json` (existing 5) + expand to all 200+ cities and zip-tied neighborhoods within the 60-mile Nashville radius (Brentwood, Franklin, Hendersonville, Mt. Juliet, Smyrna, etc., plus 420-422 KY) | ~200 |
| **Vehicle category** | Muscle (Camaro, Challenger, Mustang, Charger, Hellcat) + Exotic (M3, M5, AMG, RS, Cayman, R8) + Diesel (Ram, F-250, Silverado HD, Cummins) + Commercial (skid steer, excavator, fleet van) + Everyday (Civic, Camry, F-150, RAV4) | ~25 |
| **Angle / shape** | Each seed gets one mandatory angle to enforce structural variation: `customer-story`, `problem-list`, `technical-deepdive`, `comparison`, `faq-driven`, `cost-breakdown`, `local-context` | 7 |

20 × 200 × 25 = 100K theoretical combinations. Filter to 20K most-relevant (e.g. don't generate "skid steer service for Honda Civic owner in Brentwood").

**Each brief contains:**
- The tuple (service, city, vehicle)
- The mandatory angle for that page
- 2-3 research hooks (e.g., "look up the most common reported issue for this make/model on NHTSA recalls", "find one local landmark or business in this city to anchor the geographic relevance")
- Required output frontmatter (title, slug, description, keywords, schema_type)
- Forbidden phrases ("high quality service", "we are the best", "look no further", "in today's world", etc.)
- Min word count: 800
- Required: at least 2 internal links to existing service or location pages

## Scope (the 20 hours)

| # | Task | Hrs |
|---|---|---:|
| 1 | Expand `services-config.json` and `neighborhoods-config.json` to seed dimensions | 2.0 |
| 2 | `seeds.ts` — combinatorics, filter rules, output 20K seed JSON records | 3.0 |
| 3 | `dispatcher.ts` — Node.js orchestrator that spawns N=10–15 parallel `claude --print` subprocesses, queue management, retry on failure, checkpoint to resume after Mac restart | 4.0 |
| 4 | `briefs/template.md` (the prompt sent to each agent) — iterate until output is reliably unique-shaped, fact-grounded, no slop. **This is where the project lives or dies.** | 4.0 |
| 5 | Output validators: frontmatter present, min word count, schema markup correct, forbidden phrases absent, internal links present | 2.0 |
| 6 | `linker.ts` — post-pass that builds the internal link graph after all pages are generated, updates each MDX's links section | 2.0 |
| 7 | Sitemap chunking (10 sitemaps × ~2K URLs each per Google's 50K limit), Search Console submission script | 1.0 |
| 8 | `qa-sampler.ts` — picks 5% random sample, scores against rubric, surfaces failures for prompt iteration | 1.0 |
| 9 | Wire generated MDX into Next.js `app/seo/[slug]/page.tsx` with `generateStaticParams` | 1.0 |

**Total: 20 hours = $5,000**

## Production runs (zero billable hours)

After engine ship, page generation runs unattended on Tom's Mac:

| Wave | Pages | Wall-clock | When |
|---|---:|---|---|
| 2a — Launch | 1,000 | ~5–8 hrs (15 parallel × ~5 min/page) | Engine completion + 1 day |
| 2b — Scale 1 | +4,000 | ~20–32 hrs | After 30-day indexation review |
| 2c — Scale 2 | +5,000 | ~25–40 hrs | After 60-day traffic review |
| 2d — Full | +10,000 | ~50–80 hrs | After 90-day result confirmation |

Phase 2b–2d quoted at the time (light scope: monitoring + prompt tweaks based on what indexation reveals — likely 2–5 hrs each).

## Quality rubric (qa-sampler scoring)

Each sampled page scored 0–10 across:

1. **Local relevance** — references real landmarks, neighborhoods, road conditions specific to the city (not generic "Nashville area")
2. **Vehicle specificity** — references real common issues for that exact make/model/year band (not generic "your vehicle")
3. **Service grounding** — describes the actual service performed, parts involved, time/cost realism
4. **Structural uniqueness** — does this page's shape differ from the 5 nearest seed neighbors?
5. **Slop absence** — zero forbidden phrases, zero LLM tells ("In conclusion," "It's important to note," etc.)
6. **CTA clarity** — single clear next step (call, request quote, financing)

Pass threshold: ≥ 7/10 average. Below threshold = brief gets retuned, batch regenerated.

## Risks + mitigations

| Risk | Mitigation |
|---|---|
| Anthropic Max TOS constraints on bulk use | Verify current AUP before kickoff. Fallback: switch to Haiku via API at ~$30 total token cost — engine architecture unchanged |
| Wall-clock interruption (Mac sleep, restart) | Dispatcher checkpoints per-page completion; resumable from queue state |
| Web search rate limits during research | Throttle parallel agents to 10–15; rotate user agents on WebFetch; add backoff |
| Helpful-content penalty if quality slips | QA sampler enforces threshold before any batch publishes; first 100 pages reviewed manually before scaling |
| Indexation budget — Google won't crawl 20K immediately | Sitemap chunking + gradual submission; expect 30–60% indexed at 90 days, more over time |
| Internal duplicate content (similar tuples produce similar pages) | Mandatory angle assignment per seed forces structural variation; QA dimension #4 catches it |
| Brand voice drift across 20K pages | Briefs include 2-sentence brand voice anchor pulled from new Brand Package |

## Acceptance criteria

**Engine (Phase 2 deliverable):**
- [ ] `seeds.ts` outputs ≥ 20,000 valid seed records
- [ ] `dispatcher.ts` runs 10+ parallel workers, resumes after kill
- [ ] Brief design produces ≥ 7/10 average across a 50-page test batch
- [ ] Validator catches malformed output (tested with deliberate failures)
- [ ] All 1,000 launch pages render as static routes on Vercel
- [ ] All 1,000 pages submitted to Search Console
- [ ] QA sample of 50 pages scores ≥ 7/10 average

**60-day post-launch (informs Phase 2b decision):**
- ≥ 30% of submitted URLs indexed
- ≥ 0 organic traffic on at least 50 pages
- 0 manual actions / penalties in Search Console

## Dependencies

- PRD-1 shipped (Vercel project live, content directory set up)
- Tom's Claude Code Max subscription active
- Search Console access for `mobilemechanicmusclenearme.com` (existing)
- Updated configs: services + neighborhoods expanded per seed strategy

## Open questions for Alex

- Are there service/vehicle combos to **exclude** (e.g., does MMM not work on RVs, motorcycles)? Saves filter rules.
- Cap on cities? Strict 60-mile radius or willing to seed pages for nearby outskirts (90-mile) since organic traffic doesn't care about service-radius constraints?
- Comfortable with content going live before he reads each one, given the 5% QA sample?

## Future (post-Phase 2, separately quoted)

- **Auto-regen on data updates** — when a service page's pricing changes, dispatcher re-generates only affected pSEO pages
- **CMS UI for Alex** — review/edit/approve a generated page before it commits
- **Schema enrichment** — FAQ schema, HowTo schema for service-specific pages
- **Local citation backfill** — submit NAP to BrightLocal-equivalent
