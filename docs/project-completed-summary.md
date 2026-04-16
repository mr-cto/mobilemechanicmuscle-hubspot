# Mobile Mechanic Muscle — Second Proposal

> Contractor: Dalessandro & Guarascio LLC
> Client: Alexander Dalessandro (Mobile Mechanic Muscle)
> Date: March 26, 2026

---

## Cost & Terms

**Rate:** $250/hour

| Scenario | Est. Hours | Est. Cost |
|----------|-----------|-----------|
| Without custom form (HubSpot native) | 6 hrs | **$1,500** |
| With custom form (HubSpot free tier limitations) | 8 hrs | **$2,000** |

**Deposit:** $750 required to commence work
**Balance:** Due upon completion
**Timebox:** 4 weeks from deposit date
**Standing terms:** Upon receipt of deposit, the previously agreed-to terms from the original proposal (MMM-D_G.pdf) apply — including the no-refund policy and completion criteria.

---

## Scope of Work

### A. Standalone High-End Vehicle Page

- Dedicated landing page targeting luxury/exotic vehicle owners
- Unique value proposition copy (specialized tools, experience with high-end makes)
- SEO-optimized for "luxury mobile mechanic Nashville" and related long-tail terms
- JSON-LD schema markup
- CTA routing to `/request-service`

### B. Dedicated Request-Service Page

- Standalone page at `/request-service` replacing inline form pattern
- **Intent gating**: qualifying questions before form display (service type, vehicle year/make, location confirmation)
- **Go/No-Go camera**: decision logic to filter low-quality or out-of-scope requests before submission
- **Anti-abuse rules**: rate limiting indicators, honeypot fields, required vehicle details
- All all-services and service-page CTAs route here as the single conversion endpoint

### C. Form Changes

| Change | Detail |
|--------|--------|
| **Remove** | Preferred Time field (not operationally useful) |
| **Add** | Go/No-Go gating logic (conditional form sections based on service eligibility) |

> **Note:** HubSpot free tier has limitations on form logic (conditional fields, branching, field count). This may require a **custom-built form** outside of HubSpot's native form tool to support the go/no-go gating and anti-abuse rules, with submissions pushed to HubSpot via API.

### D. Email Update Across HubSpot-Driven Pages

- Update client email on all HubSpot-managed pages (all-services schema, footer content, any other references)
- Templates already updated; this covers pages deployed through HubSpot that still reference the old email

### E. CTA Re-Routing

- Service-page and location-page templates currently use `#quote-form` anchors to their own embedded forms
- Re-route all CTAs site-wide to `/request-service` as the single conversion endpoint

---

---

# Original Proposal: Completion Report

> Source: **MMM-D_G.pdf** (signed January 31, 2026)

## Contracted vs. Delivered

### Environment & Discovery

| # | Contracted Item | Delivered | Status |
|---|----------------|-----------|--------|
| 1 | Initialize HubSpot CLI and VS Code dev environment | HubSpot CLI configured, VS Code repo initialized, deploy scripts built | Completed |
| 2 | Apple Business Connect investigation + submit verification docs | Investigated and attempted; verification was unsuccessful | **Unsuccessful** |
| 3 | Baseline traffic reports via Google Search Console and HubSpot Analytics | Traffic increase verified via Google Search Console | Completed |

### Architecture & Content

| # | Contracted Item | Delivered | Status |
|---|----------------|-----------|--------|
| 4 | 7 High-Intent Service Pages (Brake Repair, Diagnostics, etc.) | 7 service pages built, deployed, indexed | Completed |
| 5 | 4 Neighborhood Landing Pages (Franklin, Brentwood, Murfreesboro, Hendersonville) | **5 location pages** — added Nashville as 5th | **Over-delivered (+1)** |
| 6 | SEO-optimized copy with Nashville keywords + "Get a Quote" CTAs | All pages have SEO copy and CTAs routing to form | Completed |

### Technical SEO & UI Overhaul

| # | Contracted Item | Delivered | Status |
|---|----------------|-----------|--------|
| 7 | Hard-code LocalBusiness JSON-LD schema into global site header | JSON-LD (`AutoRepair` + `LocalBusiness`) applied per-page on all-services, service pages, location pages | Completed |
| 8 | Mobile-only "Sticky CTA" anchoring to "Request a Quote" form | Decided against implementing | Declined |
| 9 | Optimize HubSpot form layout for mobile speed | Form embedded and responsive on all-services page | Completed |
| 10 | Install Microsoft Clarity for behavior tracking | Installed via HubSpot | Completed |

### Launch & Finalization

| # | Contracted Item | Delivered | Status |
|---|----------------|-----------|--------|
| 11 | Execute 301 redirects for legacy URL paths | Legacy URL paths removed from Google indexing (not redirected) | Completed |
| 12 | Submit new XML sitemaps | Sitemap submitted to Google and accepted | Completed |
| 13 | Finalize Apple Maps — configure "Book" Action Link to intake form | Apple Maps verification was unsuccessful | **Unsuccessful** |
| 14 | Transfer ownership of optimized assets + final performance baseline | HubSpot assets live on client portal; repo retained by contractor | Completed |

### Definition of Done

| # | Criteria | Status |
|---|----------|--------|
| 1 | All 11 new pages live, responsive, and indexed | **13 pages** live (7 service + 5 location + 1 all-services) — exceeds 11 |
| 2 | Apple Business Connect configured with Action Links to intake form | Unsuccessful |
| 3 | Sticky CTA and all page buttons route to HubSpot Intake Form | Page buttons route to form; sticky CTA declined |
| 4 | 4-week project duration concluded | Concluded |

---

## Additional Delivery (Beyond Original Proposal)

- **Body Work & Collision** category added to all-services (client request mid-project)
- **Detailing & Appearance** category added to all-services (client request mid-project)
- **Expanded coverage copy**: Gallatin, Smyrna, Spring Hill, La Vergne, Robertson County
- **Accessibility improvements**: form labels, contrast, keyboard navigation, screen-reader support
- **CSS consolidation**: reduced duplicate styles, improved load performance
- **Deploy automation**: `npm run deploy` via `scripts/deploy-pages.js` for repeatable publishing
- **Vehicle Registered State** field added to HubSpot form

---

*Original proposal: Concluded. Second proposal: Ready for client approval and invoicing.*
