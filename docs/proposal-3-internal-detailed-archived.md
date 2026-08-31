# Mobile Mechanic Muscle — Proposal #3: Evidence-Based Scope (Internal)

> **Contractor:** Dalessandro & Guarascio LLC
> **Client:** Alexander Dalessandro (Mobile Mechanic Muscle)
> **Date:** April 22, 2026
> **Note:** This is the INTERNAL detailed version. Client-facing version at `docs/proposal-3.md`.

---

## Audit Summary (Apr 22, 2026)

Before rewriting this proposal, I ran:
1. **Technical audit** of the live site (curl + schema extraction + asset counts)
2. **Competitive research** on top 5 Nashville mobile mechanic businesses
3. **Industry baseline research** (Whitespark 2026, BrightLocal, case studies)

### Technical audit findings

| Finding | Detail |
|---|---|
| ✅ Specialty pages have strong schema | AutoRepair, AutomotiveBusiness, FAQ, Service, OfferCatalog, GeoCircle, OpeningHoursSpecification across all 5 non-home managed pages |
| ❌ **Home page has ZERO schema markup** | `grep "@type"` on home HTML returned nothing. Home is unmanaged DnD — fixable in HubSpot editor. |
| ❌ Home page = 280KB HTML + **95 images** | Heavy, likely unoptimized. No WebP confirmed. |
| ✅ GA4 live | `G-QR6ERSYSV9` firing on every tested page |
| ✅ Google Search Console | connected; sitemap accepted |
| ✅ Microsoft Clarity | live |
| ⚠️ HubSpot script loader still loading | Required for HubSpot CMS forms; actual analytics tracking depends on client-side toggle in HubSpot settings |
| ✅ 17 managed pages indexed | confirmed in sitemap |

### Competitive audit findings (top Nashville competitors)

| # | Competitor | Reviews | Blog | Specialty Pages | CMS |
|---|---|---|---|---|---|
| 1 | Roberts Mobile Mechanics | **~130 / 4.4★** | Thin (1 post) | None (no luxury/muscle/fleet/financing) | WordPress + Elementor |
| 2 | Hooten's Mobile Mechanics | ~47 / 4.5★ | None | None | WordPress |
| 3 | Nashville's Best Mobile Mechanic | Modest | None | Fleet page (thin) | WordPress + BB Plugin |
| 4 | Mobile Mechanic of Nashville | Modest | Yes | None; leftover Vegas copy visible | WordPress |
| 5 | Wrench.com (national aggregator) | Mixed on Trustpilot | National | National fleet page + pricing calc | Custom |

**Key insight:** MMM's existing 17-page HubSpot site with luxury / muscle / commercial / fleet-adjacent pages is already more differentiated than any local competitor. The bottleneck is GMB + reviews + conversion attribution — NOT more pages.

### Industry baseline (Whitespark 2026 + BrightLocal + case studies)

| Factor | Weight |
|---|---|
| Proximity to searcher | ~55% |
| Google Business Profile signals | ~32% |
| Reviews (count, velocity, response rate) | 16–20% |
| On-page SEO | ~19% |
| Citations (as direct ranking factor) | **Deprecated in recent updates** |
| Backlinks (local service-area businesses) | Weak signal at MMM's scale |

**Target benchmark:** 75 Google reviews within 90 days, 150 within 12 months → competitive with Roberts.

**Content reality:** Enthusiast-style deep dives ("Hellcat supercharger rebuild") do NOT rank for mobile mechanics at sub-DR-20 sites. What DOES rank: service-support FAQs embedded into service pages with FAQ schema.

---

## Line-Item Evidence & Verdict (vs. prior draft)

| Project | Original Price | Verdict | Action |
|---|---|---|---|
| GBP Optimization | $1,500 | **HIGH ROI** — 32% of Map Pack ranking weight, non-negotiable | **Kept** |
| Review Generation | $1,000 | **HIGH ROI** — Roberts at ~130 is the bar | **Kept** |
| Financing Page | $500 | **HIGH ROI** — no competitor has one; Sunbit/Affirm data shows ticket lift | **Kept** |
| Conversion Tracking + UTM | $750 | **HIGH ROI** — GA4 already live, needs event config to prove channel attribution | **Kept** |
| Home Page Rebuild | $1,500 | **MEDIUM–HIGH ROI** — validated: 0 schema + 95 images + brand inconsistency | **Kept** |
| Technical SEO Audit | $1,000 | **MEDIUM ROI** — one-time pass, worth doing | **Kept & bundled with keyword research ($1,250 combined)** |
| Keyword Research (standalone) | $1,000 | **REDUNDANT** when bundled | **Folded into tech audit** |
| Visual Portfolio / Case Studies | $1,250 | **MEDIUM ROI** — conversion support + GBP reuse | **Kept** |
| Fleet B2B Page | $1,500 | **MEDIUM ROI** — credibility asset for outbound, NOT inbound magnet | **Kept with caveat** |
| Duplicate Cleanup + Apple Maps Retry | $750 | **HOUSEKEEPING** — still valid | **Kept** |
| 10 Blog Articles (enthusiast) | $3,750 | **SMOKE as scoped** | **Rebriefed → 10 service-support FAQs embedded in service pages w/ FAQ schema @ $2,000** |
| 60-day Link Building | $2,500 | **SMOKE** — weak signal for local service, money better on reviews | **DROPPED** |
| Citation Building | $1,000 | **SMOKE** — Google deprecated as ranking factor. $150 Whitespark covers 90% | **DROPPED; $150 Whitespark push included in Project G at no extra cost** |
| Interactive Service Area Map | $750 | **SMOKE** — free embedded Google Maps does it | **DROPPED** |

**Total cut from prior version: $5,250** (link building $2,500 + citations $1,000 + interactive map $750 + keyword research standalone $1,000). **Blog rebrief saved another $1,750.**

---

## Final Project List (Evidence-Based)

### Track 1: High ROI — The Four Things That Move The Needle

#### Project G — Google Business Profile Optimization
**Evidence:** GBP = ~32% of Map Pack ranking weight (Whitespark 2026). Single highest-leverage activity. Top Nashville competitor has ~130 reviews; MMM is not in the Map Pack top 3.

**Deliverables:**
- GBP audit + profile rebuild (categories, service list, attributes)
- Services catalog seeded; service area = 60-mile Nashville radius
- Q&A section seeded (8–10 common questions)
- Existing photos uploaded + captioned
- GBP Posts cadence set up (first 4 drafted)
- Messaging + booking link configured → `/request-service`
- One-time Whitespark citation push (top 20 aggregators — included at no extra cost; replaces standalone citations project)
- `AggregateRating` schema on home page pulling from GBP

**Estimate:** 6 hrs × $250 = **$1,500**

---

#### Project I — Review Velocity Program
**Evidence:** Roberts Mobile Mechanics has ~130 reviews at 4.4★. Everyone else under 50. To rank in Map Pack top 3, MMM needs to clear that bar.

**Deliverables:**
- Post-service SMS/email review ask via HubSpot Workflow (free-tier compatible) or NiceJob ($75/mo — client-choice recommendation)
- Review link routing (Google-first, alternate platforms as fallback)
- Response templates for 5★ / 3★ / 1★ reviews
- Review performance dashboard
- Process documentation for Alex to train staff

**Target:** 75 new reviews within 90 days of activation.

**Estimate:** 4 hrs × $250 = **$1,000**

---

#### Project C — Financing Explainer Page
**Evidence:** No Nashville competitor has a dedicated financing page. Sunbit/Affirm published data shows conversion lift on repairs >$500 when financing is surfaced clearly. American First Finance link currently exists as footer link only, no context.

**Deliverables:**
- New managed page at `/financing`
- "How It Works" 3-step flow
- Approval amounts, FAQ, soft-sell copy
- Apply buttons above and below fold

**Estimate:** 2 hrs × $250 = **$500**

---

#### Project N — Conversion Tracking + UTM Strategy
**Evidence:** GA4 (`G-QR6ERSYSV9`) live but no conversion events configured. Without this, no attribution of leads to source.

**Deliverables:**
- GA4 conversion events:
  - Form submission (per category)
  - Phone click-to-call
  - Financing click-out (American First Finance)
  - Directions click (Apple/Google Maps)
- Cross-domain tracking validation
- UTM templates (business cards, Apple Maps, GMB Posts, Facebook, partner referrals)
- GA4 ↔ Search Console linkage confirmed
- Clarity funnel analysis of `/request-service` form — find drop-off
- Monthly reporting template

**Estimate:** 3 hrs × $250 = **$750**

---

**Package 1 — Rank & Convert:** G + I + C + N = **$3,750**
(No discount vs. a la carte at this tier — price is honest.)

---

### Track 2: Medium ROI — Site Polish

#### Project A — Home Page Rebuild
**Evidence:** Home page has zero schema (all other pages do). 95 images, unoptimized. Brand inconsistency vs. specialty pages.

**Deliverables (in HubSpot editor):**
- Hero rebuild + dual CTA
- 4-vertical service pillar layout
- Trust bar (years, service area, warranty/insurance, financing)
- Add `LocalBusiness` + `AggregateRating` schema (not currently present)
- Image optimization pass (95 → ~15–20 critical images, WebP where supported)
- Final CTA section matching specialty page pattern
- Mobile-first responsive validation

**Estimate:** 6 hrs × $250 = **$1,500**

---

#### Project JK — Technical SEO + Keyword Research (bundled)
**Evidence:** Tech audit worth one-time pass. Keyword research folded in — separate keyword-research project was redundant.

**Deliverables:**
- Core Web Vitals audit + prioritized fixes (when PageSpeed API quota available)
- Mobile responsiveness audit
- Internal linking audit (service ↔ location cross-links)
- Image SEO pass (alt text, filename, WebP)
- `robots.txt` optimization
- **Keyword research**: 100 keyword universe, priority ranking, 6-month editorial calendar for Track 3
- Cluster map tying future content to service/location pages

**Estimate:** 5 hrs × $250 = **$1,250**

---

#### Project E — Visual Portfolio / Case Studies
**Evidence:** Alex has Suburban, service van, forklift, Barracuda, Super Bee photos. Repurposable as portfolio + GBP Posts + social.

**Deliverables:**
- New managed page at `/work` (or upgrade of gallery)
- 3 written case studies, ~500 words each (Hellcat / Classic Chevy / Fleet Skid Steer)
- Captions with vehicle/work details (SEO alt text)
- Before/after where applicable
- `Article` + `ImageObject` schema

**Estimate:** 5 hrs × $250 = **$1,250**

---

**Package 2 — Polish & Position:** Package 1 + A + JK + E = $3,750 + $4,000 = **$7,250** (saves $500 vs à la carte)

---

### Track 3: Content + Fleet + Housekeeping

#### Project L — Service-Support FAQ Content (10 articles, REBRIEFED)
**Evidence:** Enthusiast deep-dives don't rank at sub-DR-20 for mobile mechanics. Magic Auto Center case study: ranked #1 in Valencia with NO blog — just service + location pages + GBP. What DOES work: short FAQ-style support articles embedded on service pages with FAQ schema.

**Rebriefed deliverables (10 short articles, 600–900 words each):**
1. "How long does a mobile brake job take?"
2. "Will a mobile mechanic come to my apartment complex or office parking lot?"
3. "What should I do before a mobile mechanic arrives?"
4. "How does pricing compare: mobile mechanic vs. shop?"
5. "What can't a mobile mechanic do at my location?"
6. "Silver Rock & warranty claims — how does it work mobile?"
7. "Do you service fleets or just individual vehicles?"
8. "Emergency roadside — how fast can you get here in Nashville?"
9. "How do I know if my Hellcat needs real service vs. a quick diagnostic?"
10. "Pre-purchase inspection: what we check and why it matters"

**Each:**
- 600–900 words, FAQ schema
- Embedded on relevant service/specialty page (not standalone blog posts)
- Primary keyword + 2–3 supporting
- Internal link to service or location pages

**Estimate:** 8 hrs × $250 = **$2,000**

*(Reduced from $3,750 because scope is tighter and articles are shorter but more effective for this business type.)*

---

#### Project B — Fleet B2B Landing Page (with caveat)
**Evidence:** Search volume for "fleet mechanic Nashville" is low (<100/mo). Fleet business is won via outbound + referrals. Nashville's Best has a thin fleet page. Opportunity exists but as a credibility asset for outbound sales, not an inbound magnet.

**Caveat to deliver with proposal:** Only recommend if Alex plans active outreach to property managers, contractors, and delivery companies. If he's not doing outreach, skip this.

**Deliverables:**
- New managed page at `/fleet-services`
- B2B-focused copy (uptime, SLA, recurring PM, multi-equipment discounts, PO/invoicing)
- Dedicated intake form variant
- Linked from `/commercial-equipment` and home page
- JSON-LD `Service` schema tailored to B2B

**Estimate:** 6 hrs × $250 = **$1,500**

---

#### Project F — Duplicate Page Cleanup + Apple Maps Retry
**Evidence:** Duplicate pages from prior deploys still exist in HubSpot sitemap (`request-service-1`, etc.). Apple Business Connect failed in Proposal 1 due to Michigan-based docs on a TN business.

**Deliverables:**
- Identify and unpublish duplicates in HubSpot
- Confirm URL routing + resubmit sitemap
- Apple Business Connect retry (contingent on TN-based verification docs; same disclaimer as Proposal 1 — no guarantee)

**Estimate:** 3 hrs × $250 = **$750**

---

**Package 3 — Everything That Works:** Package 2 + L + B + F = $7,250 + $4,250 = **$10,500** (saves $1,250 vs à la carte)

---

## What I Dropped (with Evidence)

| Dropped | Original Price | Why |
|---|---|---|
| **60-day Link Building Campaign** | $2,500 | Backlinks are a weak ranking signal for local service-area businesses at MMM's scale (Whitespark 2026, industry case studies). A $2,500 spend buys 10–15 mediocre local directory links that barely move DR. Better spent on reviews. |
| **Standalone Citation Building** | $1,000 | Google deprecated citations as a *direct* ranking factor in recent updates. A one-time $150 Whitespark or BrightLocal push covers the top 20 aggregators. Included in Project G at no extra cost. |
| **Interactive Service Area Map** | $750 | Free embedded Google Map does 90% of the job. Custom interactive map is flash, not function. |
| **Standalone Keyword Research** | $1,000 | Redundant with tech audit. Folded into Project JK. |
| **Enthusiast Blog Articles** | $3,750 → $2,000 | "Hellcat supercharger rebuild" style deep-dives don't rank for sub-DR-20 mobile mechanics. Rebriefed as service-support FAQs with FAQ schema — becomes medium-ROI. Savings: $1,750. |

**Total cut: $5,250** vs. initial draft. **Plus $1,750 saved** on blog rebrief.

---

## Ongoing (Pay-As-You-Go, Not Retainer)

| Service | Price |
|---|---|
| Additional FAQ article batch (5 articles) | $1,000 |
| Additional FAQ article batch (10 articles) | $2,000 |
| Quarterly SEO audit + adjustment | $750 |
| GBP posts batch (12 posts, 3 months weekly cadence) | $750 |
| Site maintenance block (4 hours) | $1,000 |

Nothing billed until requested.

---

## Package Summary

| Package | Price | Saves | Timeline | Includes |
|---|---|---|---|---|
| **1 — Rank & Convert** | $3,750 | — (honest price) | 3 weeks | G, I, C, N |
| **2 — Polish & Position** | $7,250 | $500 | 6 weeks | Pkg 1 + A, JK, E |
| **3 — Everything That Works** | $10,500 | $1,250 | 10 weeks | Pkg 2 + L, B, F |

---

## Terms

- **Rate:** $250/hr
- **Deposit:** 40% to commence
- **Payment schedule:**
  - Package 1 / individual projects: 40% deposit, 60% on delivery
  - Packages 2 and 3: 40% deposit, 30% midpoint, 30% on delivery
- **Revisions:** 2-hour revision allowance per project or package. Beyond that billed at $250/hr with prior approval.
- **Ownership:** Client owns deliverables upon final payment.
- **No recurring retainers.** Additional work quoted per batch.
- **Apple Business Connect:** Subject to Apple's review; not guaranteed.

---

## My Recommendation

**Start with Package 1 ($3,750).** This is where the highest, fastest ROI lives for a mobile mechanic in Alex's market position. Evidence-backed:
- GBP = 32% of local ranking weight
- Reviews close the gap with Roberts (~130 benchmark)
- Financing page is a cheap, unique conversion lifter
- Conversion tracking lets us actually prove ROI before spending more

**Package 2 adds $3,500 for site polish** — worth it if the home page is bleeding trust (it's currently the weakest link: no schema, 95 unoptimized images). But measurable first; don't commit until Package 1 shows movement.

**Package 3 adds another $3,250 for content + fleet + housekeeping.** Content rebriefed as FAQ-style (what actually works for this business type). Fleet only if Alex plans outbound. Housekeeping closes prior proposal loose ends.

**Total max spend: $10,500.** Previously was $13,250. The $2,750 difference is smoke I refuse to sell.

---

## Research Sources

- Whitespark 2026 Local Search Ranking Factors (GBP weight, review weight, citation deprecation)
- BrightLocal service-area-page guide
- ReplyOnTheFly 2026 review benchmarks
- 12AM Agency automotive SEO case studies
- Magic Auto Center case study (#1 local ranking, no blog)
- Roberts Mobile Mechanics / Hooten's / Nashville's Best / Mobile Mechanic of Nashville / Wrench.com (live competitive audit, Apr 22 2026)
- Sunbit + Affirm published conversion-lift data
- Live technical audit of mobilemechanicmusclenearme.com (Apr 22 2026): schema extraction via grep, asset counts via curl

*Proposal 3 — Internal evidence-based version.*
*Client version at `docs/proposal-3.md`.*
