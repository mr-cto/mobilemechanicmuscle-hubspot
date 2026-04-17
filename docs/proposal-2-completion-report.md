# Mobile Mechanic Muscle — Second Proposal: Completion Report

> Contractor: Dalessandro & Guarascio LLC
> Client: Alexander Dalessandro (Mobile Mechanic Muscle)
> Proposal Date: March 26, 2026
> Completion Date: April 16–17, 2026

---

## Cost & Terms

**Rate:** $250/hour
**Scenario Selected:** With custom form (HubSpot free tier limitations) — 8 hrs / $2,000
**Deposit Received:** $750
**Balance Due:** $1,250

---

## Scope of Work: Contracted vs. Delivered

### A. Standalone High-End Vehicle Page

| Contracted | Delivered | Status |
|-----------|-----------|--------|
| Dedicated landing page targeting luxury/exotic vehicle owners | Full standalone page at `/high-end-vehicles` with cinematic dark theme (Playfair Display + Inter fonts, gold accent palette) | **Completed** |
| Unique value proposition copy | Specialized copy covering Ferrari, Lamborghini, McLaren, Porsche, Mercedes-AMG, BMW M, Bentley, Maserati, and more | **Completed** |
| SEO-optimized for "luxury mobile mechanic Nashville" | Title, meta description, and content optimized for luxury/exotic long-tail terms | **Completed** |
| JSON-LD schema markup | Service schema + FAQ schema (4 questions) with AutomotiveBusiness provider | **Completed** |
| CTA routing to `/request-service` | Header CTA and final CTA section both route to `/request-service` | **Completed** |

**Additional:** Custom header/footer within the page (standalone luxury theme), hero background image from client gallery, cinematic scroll-reveal animations, stats bar (12 luxury makes, 8+ years, 60-mile radius, Mon-Sat).

### B. Dedicated Request-Service Page

| Contracted | Delivered | Status |
|-----------|-----------|--------|
| Standalone page at `/request-service` | Live at `/request-service` with 4-step intake flow (terms gate + 3 form steps) | **Completed** |
| Intent gating: qualifying questions before form | Step 0: Premium service terms acknowledgment. Step 1: Vehicle category selection (4 categories). Step 2: Vehicle details + modifications + address. Step 3: Contact info | **Completed** |
| Go/No-Go camera: decision logic to filter out-of-scope requests | ZIP code validation against 60-mile Nashville radius. Out-of-area users see rejection message and cannot submit. Terms gate filters tire-kickers before form access | **Completed** |
| Anti-abuse rules: rate limiting, honeypot, required vehicle details | Honeypot field, 3-submission-per-session rate limit, 3-second speed check, Google reCAPTCHA v3 (invisible) | **Completed** |
| All CTAs route here as single conversion endpoint | All service pages, location pages, all-services, high-end-vehicles, and `/contact` (JS redirect) route to `/request-service` | **Completed** |

**Form submission flow:**
1. User reads premium service terms and clicks "I Understand — Continue"
2. User selects vehicle category (Luxury/Exotic, Commercial Equipment, Muscle/Classic, Every Day Driver)
3. If Luxury/Exotic: entire form transforms to cinematic dark/gold design language
4. User enters vehicle details: year, make, model, VIN (conditional), registered state, full address, modifications & configuration, issue description
5. Go/No-Go check: ZIP validated against Nashville 60-mile service area
6. If passed: user enters contact info (first name, last name, phone, email, preferred contact method)
7. Google reCAPTCHA v3 executes invisibly
8. Submission sent to category-specific HubSpot form via API
9. Success confirmation displayed

**Rejection paths (user told "we can't help"):**
- ZIP code outside 60-mile Nashville radius → "Outside Our Service Area" message with option to go back and try a different ZIP

### C. Form Changes

| Change | Contracted | Delivered | Status |
|--------|-----------|-----------|--------|
| Remove Preferred Time | Remove field (not operationally useful) | Not included in custom form | **Completed** |
| Add Go/No-Go gating | Conditional form sections based on service eligibility | 3-step flow with ZIP-based Go/No-Go gate between steps 2 and 3 | **Completed** |

**Technical implementation:** Custom HTML/CSS/JS form submitting to HubSpot Forms API v3. Not using HubSpot's embedded form widget — full control over UX, validation, and gating logic.

**HubSpot integration:**
- 4 cloned forms (one per vehicle category) with CAPTCHA disabled to allow API submissions
- Original form (`4dfc54af-...`) retained with CAPTCHA for legacy embedded use
- Fields mapped: `firstname`, `lastname`, `phone`, `email`, `vin_license_plate_number`, `year`, `make`, `model`, `vehicle_registration_state`, `state`, `address`, `message`
- Category, modifications, preferred contact method, vehicle address, and swap details appended to `message` field to conserve HubSpot free tier property slots
- `service_type` created as custom dropdown property

### D. Email Update Across HubSpot-Driven Pages

| Contracted | Delivered | Status |
|-----------|-----------|--------|
| Update client email on all HubSpot-managed pages | Email removed from all pages entirely (client does not want email contact) | **Completed** |
| Templates already updated; covers pages deployed through HubSpot | Removed from: `all-services.html` JSON-LD, `high-end-vehicles.html` footer + JSON-LD, `footer-content.html`, `partials/footer.html` | **Completed** |

### E. CTA Re-Routing

| Contracted | Delivered | Status |
|-----------|-----------|--------|
| Re-route `#quote-form` anchors to `/request-service` | All service-page and location-page template CTAs updated from `#quote-form` to `/request-service` | **Completed** |
| All CTAs site-wide to `/request-service` | Zero `#quote-form` or `mailto:` references remain in codebase. All CTAs route to `/request-service` | **Completed** |

---

## Additional Scope (Added During Project)

### F. Remove Email from Website Completely

| Delivered | Status |
|-----------|--------|
| Removed visible email links from both footer templates | **Completed** |
| Removed `"email"` field from JSON-LD schema on all-services and high-end-vehicles | **Completed** |
| Client directive: no email contact, only through form | **Completed** |

### G. American First Finance Integration

| Delivered | Status |
|-----------|--------|
| External financing link added to all page footers (both footer templates) | **Completed** |
| Link added to all-services CTA section, high-end-vehicles footer, commercial-equipment, muscle-cars | **Completed** |
| Link added to request-service form (step 3, before submit) | **Completed** |
| Footer "Book Appointment" converted to secondary button style in Get In Touch section | **Completed** |
| URL: `https://americanfirstfinance.com/app/?dealer=32791&loc=1&src=UA` | **Completed** |

### H. Two New Pages (Main Site Theme, Full SEO)

#### H1. Commercial Equipment Page

| Delivered | Status |
|-----------|--------|
| Full page at `/commercial-equipment` with main site theme (Poppins, teal/navy) | **Completed** |
| Equipment grid: skid steers, excavators, generators, forklifts, box trucks, trailers, diesel engines, mowers | **Completed** |
| Services list: engine/drivetrain, hydraulics/pneumatics, electrical/controls, brakes/steering/suspension | **Completed** |
| FAQ section (4 questions) | **Completed** |
| JSON-LD: Service schema + FAQ schema | **Completed** |
| SEO: title, meta description, structured data | **Completed** |
| Client gallery image added below hero | **Completed** |
| CTAs to `/request-service` + financing link | **Completed** |

#### H2. Muscle Cars Page

| Delivered | Status |
|-----------|--------|
| Full page at `/muscle-cars` with main site theme | **Completed** |
| Vehicle grid: Chevrolet/GM, Ford, Dodge/Mopar, Classic & Vintage, Modern Performance, Trucks & Muscle SUVs | **Completed** |
| Services list: engine/performance, brakes/suspension, electrical/ignition, cooling/exhaust/drivetrain | **Completed** |
| FAQ section (4 questions) | **Completed** |
| JSON-LD: Service schema + FAQ schema | **Completed** |
| SEO: title, meta description, structured data | **Completed** |
| 3-image gallery from client HubSpot photos (Barracuda, Super Bee, service shot) | **Completed** |
| CTAs to `/request-service` + financing link | **Completed** |

---

## Infrastructure & DevOps Delivered

| Item | Detail |
|------|--------|
| Deploy script updated | `scripts/deploy-pages.js` now deploys all 17 pages: all-services, high-end-vehicles, request-service, commercial-equipment, muscle-cars, 7 service pages, 5 location pages |
| Page mapping updated | `.hubspot-pages.json` includes IDs for all new pages (request-service: `211170040586`, commercial-equipment: `211170041176`, muscle-cars: `211170040588`, high-end-vehicles: `210210284161`) |
| HubSpot forms (4 clones) | Original form retained with CAPTCHA. 4 category-specific clones without CAPTCHA for API submissions (Luxury, Commercial, Muscle, Every Day) |
| Google reCAPTCHA v3 | Site key `6LeZL7ss...` integrated on request-service page for invisible bot detection |
| `service_type` property | Created as custom dropdown in HubSpot |
| Design Manager API | Footer partial managed programmatically via Templates v2 API (`PUT /content/api/v2/templates/206542447704`) |
| `/contact` sunset | JS redirect installed, navigation updated, managed page links replaced |
| Service radius updated | All JSON-LD schemas updated from 25 miles to 60 miles |
| Header CSS overrides | Inline theme settings for managed pages (logo sizing, left-aligned layout, mobile responsive) |
| Footer partial | Synced between local repo (`src/templates/partials/footer.html`) and HubSpot Design Manager |

---

## Page Inventory (17 Managed Pages)

| Page | Slug | HubSpot ID | Status |
|------|------|-----------|--------|
| All Services | `all-services` | 206890247351 | Published |
| High-End Vehicles | `high-end-vehicles` | 210210284161 | Published |
| Request Service | `request-service` | 211170040586 | Published |
| Commercial Equipment | `commercial-equipment` | 211170041176 | Published |
| Muscle Cars | `muscle-cars` | 211170040588 | Published |
| Brake Repair | `services/brake-repair` | 206537428120 | Published |
| Diagnostics | `services/diagnostics` | 206542583850 | Published |
| Battery & Starter | `services/battery-starter` | 206537428122 | Published |
| Cooling System | `services/cooling-system` | 206537428124 | Published |
| Suspension | `services/suspension` | 206537428126 | Published |
| Pre-Purchase Inspection | `services/pre-purchase-inspection` | 206537428128 | Published |
| Emergency Roadside | `services/emergency-roadside` | 206537428130 | Published |
| Nashville | `locations/nashville` | 206538447467 | Published |
| Franklin | `locations/franklin` | 206542583852 | Published |
| Brentwood | `locations/brentwood` | 206537428132 | Published |
| Murfreesboro | `locations/murfreesboro` | 206537428134 | Published |
| Hendersonville | `locations/hendersonville` | 206542583854 | Published |

---

## Additional Work Delivered (Beyond Original Proposal Scope)

### Form Rework — Vehicle Category System (April 17, 2026)

**Replaced 12-service-type picker with 4 vehicle category system:**
- Luxury / Exotic (gold Playfair Display selected state, full lux mode transformation)
- Commercial Equipment (road vs off-road equipment type toggle)
- Muscle / Classic (auto-shows deep modification detail)
- Every Day Driver (clean standard flow)

**Each category submits to its own HubSpot form:**

| Category | Form ID | Email Subject |
|----------|---------|---------------|
| Luxury / Exotic | `94d999ff-8124-43e0-a42d-9610a4891681` | Luxury/Exotic Submission |
| Commercial Equipment | `482a95b1-9c29-4602-b4bf-6d55f8cb6196` | Commercial Equipment Submission |
| Muscle / Classic | `267af2e7-0947-4466-a558-aab4ff859ff8` | Muscle/Classic Submission |
| Every Day Driver | `9ebb3bd1-5bab-41cd-ac2e-e25450ecefe2` | Every Day Driver Submission |

### Luxury Mode — Elevated Form Experience

When Luxury/Exotic is selected, the entire form transforms to match the high-end-vehicles page design language:
- Background transitions to dark (#0a0a0a) with 1.2s ease animation
- Headings switch to Playfair Display with gold italic `<em>` portions and white regular text
- Form fields get dark inputs (#1a1a1a) with gold focus borders and glow
- Buttons turn gold (#c9a962) on dark
- Progress dots turn gold
- Atmospheric glow orb (radial gradient, pulsing animation) — matches lux hero page
- Gold separator line under headings with 2s scaleX reveal animation (250px wide)
- Antialiased text rendering
- Error states use gold instead of red (gentle nudge, not aggressive)
- Category cards go dark with gold accents
- All transitions are smooth — toggling off lux mode fades back gracefully over 1.2s
- Space reserved for gold line in non-lux mode to prevent layout snapping

### Terms Gate (Step 0)

Added pre-form acknowledgment step with premium service messaging:
- "This is a premium service. Pricing reflects professional diagnostics, expertise, and convenience."
- "All requests are reviewed prior to approval. Incomplete or inaccurate submissions will not be processed."
- User must click "I Understand — Continue" before accessing the form

### Modifications & Configuration Section (Universal)

Added to step 2 for all vehicle categories:

**Modification level (selectable cards):**
- No — Fully stock
- Minor Mods — Bolt-ons, intake, exhaust, tune
- Major Mods — Engine swap, trans swap, custom wiring, fabrication

**Conditional fields:**
- Minor/Major → shows "list known modifications" textarea
- Major OR Muscle/Classic category → shows deep detail:
  - Factory engine/transmission config? (Yes / No / Unsure cards)
  - Engine/swap details textarea
- Muscle/Classic always shows the deep detail section regardless of mod selection

**Disclaimer:**
- "Modified and non-factory vehicles may require additional diagnostic time..."
- "Final pricing for modified or custom vehicles is determined after physical inspection..."

All modification data appended to HubSpot message field.

### Commercial Equipment — Road vs Off-Road Toggle

Replaced radio buttons with selectable cards for commercial category:
- **Road Vehicle**: enables VIN + registration state fields
- **Off-Road Equipment**: shows serial number / equipment ID field (optional)
- Year, make, model still collected for both
- Equipment type included in submission message

### Full Address Collection

Added vehicle's current location fields to step 2 (all categories):
- Street address, city, state, ZIP
- Full address string sent to HubSpot `address` field and appended to message

### VIN Logic by Category

| Category | VIN Required | Registered State Required |
|----------|-------------|--------------------------|
| Luxury / Exotic | Yes | Yes |
| Commercial — Road | Yes | Yes |
| Commercial — Off-Road | No (serial number optional) | No |
| Muscle / Classic | No | Yes (via standard block) |
| Every Day Driver | Yes | Yes |

### Header & Footer Fixes

- **Header layout**: CSS overrides to convert Growth theme's centered layout to left-aligned (logo left, nav right)
- **Header logo**: Constrained to 85px height (50px on mobile)
- **Mobile nav**: Fixed overflow by constraining mobile menu to 100vw with position fixed
- **Footer partial**: Updated via HubSpot Templates API (ID: `206542447704`) — can now be managed programmatically
- **Footer links**: Added High-End Vehicles, Muscle Cars, Commercial Equipment to services column
- **Footer Book Appointment**: Moved to Get In Touch section as secondary outlined button
- **Footer CSS**: Inline styles with `!important` to override Growth theme's white background

### Image Updates

- **High-end vehicles hero**: Replaced video with client gallery image (CSS background, 20% opacity)
- **High-end vehicles bleed image**: Replaced AI mechanic with S85 rod bearings photo from client gallery
- **Muscle cars page**: 3-image gallery added (Barracuda, Super Bee, service shot)
- **Commercial equipment page**: Full-width client gallery image added

### Google reCAPTCHA v3

- Site key: `6LeZL7ss...` integrated on request-service page
- Invisible client-side bot detection before HubSpot API submission
- Original HubSpot forms retain native CAPTCHA for embedded use
- Cloned forms (4) have CAPTCHA disabled to allow API submissions

### Design Manager API Access

- Discovered Templates v2 API can read/write Design Manager files
- Footer partial can be updated programmatically: `PUT /content/api/v2/templates/206542447704`
- Eliminates need for manual Design Manager edits for footer changes

### Duplicate Page Cleanup Needed

Previous deploys created duplicate pages in HubSpot sitemap:
- `request-service-1`, `request-service-2`
- `commercial-equipment-1`, `commercial-equipment-2`
- `muscle-cars-1`, `muscle-cars-2`
- `high-end-vehicles-1` through `high-end-vehicles-4`

These should be unpublished/deleted in HubSpot: Marketing > Website > Website Pages.

---

## Definition of Done

| # | Criteria | Status |
|---|----------|--------|
| 1 | High-end vehicle page live with luxury theme, SEO, and JSON-LD | **Completed** |
| 2 | Request-service page live with intent gating, Go/No-Go, and anti-abuse | **Completed** |
| 3 | Custom form submits to HubSpot via API with all required fields | **Completed** |
| 4 | Email removed from all pages and JSON-LD | **Completed** |
| 5 | All CTAs site-wide route to `/request-service` | **Completed** |
| 6 | American First Finance link on all pages | **Completed** |
| 7 | Commercial equipment page live with full SEO | **Completed** |
| 8 | Muscle cars page live with full SEO | **Completed** |
| 9 | Service radius updated to 60 miles across all pages | **Completed** |
| 10 | 4 vehicle category forms with per-category HubSpot submission | **Completed** |
| 11 | Luxury mode form transformation matching high-end-vehicles design | **Completed** |
| 12 | Universal modifications & configuration section | **Completed** |
| 13 | Terms gate with premium service acknowledgment | **Completed** |
| 14 | Full address collection for vehicle location | **Completed** |
| 15 | Commercial road vs off-road equipment type toggle | **Completed** |

---

## Known Limitations & Notes

- **HubSpot free tier**: 10 custom contact property limit. `service_type` uses 1 slot. Modification data, preferred contact method, and address are rolled into the `message` field.
- **Header/footer on unmanaged pages** (home, contact, gallery): These use the Growth theme's DnD template which cannot be safely modified from our deploy scripts. Header and footer changes on those 3 pages must be done manually in HubSpot's page editor or via the Templates API for the footer partial.
- **Growth theme is locked**: Cannot edit theme modules directly in Design Manager. CSS overrides are applied inline on managed pages.
- **Form CAPTCHA**: Original HubSpot form has reCAPTCHA enabled (blocks API submissions). 4 cloned forms without CAPTCHA are used for API submissions. Google reCAPTCHA v3 is integrated client-side as the spam protection layer.
- **Contact page sunset in progress**: `/contact` has a JS redirect to `/request-service`. Home page links still reference `/contact` (client action needed in page editor). Once home page is updated and `/contact` is unpublished, sunset is complete.

---

## Sunset: `/contact` → `/request-service`

### Completed

| Step | Action | Status |
|------|--------|--------|
| 1 | All 17 managed pages route to `/request-service` | **Done** |
| 2 | Design Manager footer updated — "Request Service" button replaces "Book Appointment" | **Done** |
| 3 | High-end vehicles page — all `/contact` links replaced | **Done** |
| 4 | `/contact` page — JS redirect (`window.location.replace('/request-service')`) installed | **Done** |
| 5 | Navigation menu — updated to link to `/request-service` | **Done** |

### Remaining (Client Action Required)

| Step | Action | Status |
|------|--------|--------|
| 6 | Update home page hero + service card buttons from `/contact` to `/request-service` in HubSpot page editor | **Pending** |
| 7 | Unpublish `/contact` page (keep in draft 30 days, then delete) | **Pending** |
| 8 | Delete duplicate pages in HubSpot (request-service-1, commercial-equipment-1, etc.) | **Pending** |
| 9 | Submit updated sitemap in Google Search Console | **Pending** |
| 10 | Monitor for `/contact` 404s in Google Search Console for 2 weeks | **Pending** |

### Note
HubSpot free tier does not support 301 URL redirects. A JavaScript redirect is in place on the `/contact` page as the workaround. This handles all existing bookmarks, Google results, and external links pointing to `/contact`.

---

*Second proposal: Completed. Balance due: $1,250.*
