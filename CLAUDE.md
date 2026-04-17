# Mobile Mechanic Muscle — HubSpot CMS Project

## Overview

This repo manages the HubSpot CMS pages for [mobilemechanicmusclenearme.com](https://mobilemechanicmusclenearme.com). Pages are built locally as HTML and deployed to HubSpot via the CMS Pages API. The site runs on HubSpot's **Growth theme** (locked, cannot edit modules in Design Manager).

**Client:** Alexander Dalessandro (Mobile Mechanic Muscle)
**Contractor:** Dalessandro & Guarascio LLC

---

## Architecture

### Two types of pages

1. **Managed pages** (17 pages) — deployed from this repo via `scripts/deploy-pages.js`. Content goes into the `main_content` rich text widget of `simple-content-page.html`. Header comes from the template; footer comes from both the template include AND the page content.

2. **Unmanaged pages** (3 pages: home, contact, gallery) — built with HubSpot's drag-and-drop page editor using `generated-home.html` which extends the Growth theme's `base.html`. **Do NOT modify** `generated-home.html` or `base.html` — it breaks the DnD pages.

### Template structure

```
HubSpot Design Manager
├── growth-customized/                    # Growth theme (LOCKED - cannot edit modules)
│   ├── templates/
│   │   ├── layouts/                      # Empty — base.html is hidden in theme package
│   │   ├── partials/
│   │   │   └── footer.html              # Global footer (ID: 206542447704) — editable via API
│   │   ├── generated-home.html          # DO NOT MODIFY — breaks DnD pages
│   │   └── simple-content-page.html     # Our managed page template (ID: 206896422479)
│   ├── generated-content.html           # Data file for home page — DO NOT MODIFY
│   └── all-services.html
├── draft-templates/                      # Legacy templates
│   └── simple-content-page.html         # Also used — has header + footer include
└── draft-css/
    └── custom.css                        # Loaded on managed pages only
```

### Header situation

- The Growth theme's `website-header` module renders on all pages. It's **locked** and cannot be edited in Design Manager.
- The header uses "centered" layout (`header__container--centered`) which stacks logo above nav by default.
- Managed pages inject inline CSS to override this to a left-aligned layout (logo left, nav right).
- The logo image is a tall portrait image (`IMG_20260203_144742.png`) — must be height-constrained via CSS.
- On mobile, the Growth theme's built-in hamburger menu handles navigation. We add CSS to ensure the mobile menu doesn't overflow.

### Footer situation

- The footer partial lives in Design Manager (`growth-customized/templates/partials/footer.html`, ID: `206542447704`).
- It's included in `simple-content-page.html` via `{% include %}`.
- Managed pages ALSO have the footer HTML in their page content (from our deploy). Both render — the template include's footer is styled by the Design Manager CSS, and our content footer has its own inline `<style>` block.
- The footer partial can be updated via the Templates v2 API: `PUT /content/api/v2/templates/206542447704`
- After updating the partial, pages must be redeployed to trigger HubSpot to re-render with the new partial.
- Footer CSS must include `display: block !important` on `.footer-content` and layout rules for `.footer-grid` because the Growth theme's base CSS uses float-based grid that conflicts with flexbox.

---

## Deploying

```bash
# Deploy all 17 managed pages
npm run deploy
# or
node scripts/deploy-pages.js
```

### Environment variables (`.env`)

```
HUBSPOT_ACCESS_TOKEN=pat-na1-...
HUBSPOT_PORTAL_ID=46603985
CREATE_AS_DRAFT=false
USE_DRAFT_URLS=false
NOINDEX_DRAFTS=false
```

### Page mapping (`.hubspot-pages.json`)

Maps page slugs to HubSpot page IDs. If a page isn't in the mapping, the deploy script creates a new page (causing duplicates). Run `node scripts/sync-page-ids.js` to rebuild the mapping, then manually add new pages that the sync script doesn't know about.

**Current page IDs:**
- `all-services`: 206890247351
- `high-end-vehicles`: 210210284161
- `request-service`: 211170040586
- `commercial-equipment`: 211170041176
- `muscle-cars`: 211170040588
- Service pages: 206537428120–206542583850
- Location pages: 206537428132–206542583854

### Updating the Design Manager footer via API

```javascript
// Template ID: 206542447704
// Use PUT /content/api/v2/templates/206542447704 with { source: "..." }
// Then redeploy pages to trigger re-render
```

---

## Page inventory

### Managed pages (deployed from repo)

| Page | File | Slug |
|------|------|------|
| All Services | `src/pages/all-services.html` | `all-services` |
| High-End Vehicles | `src/pages/high-end-vehicles.html` | `high-end-vehicles` |
| Request Service | `src/pages/request-service.html` | `request-service` |
| Commercial Equipment | `src/pages/commercial-equipment.html` | `commercial-equipment` |
| Muscle Cars | `src/pages/muscle-cars.html` | `muscle-cars` |
| 7 Service Pages | Generated from `config/services-config.json` | `services/*` |
| 5 Location Pages | Generated from `config/neighborhoods-config.json` | `locations/*` |

### Unmanaged pages (HubSpot page editor only)

- Home page (`/`)
- Contact page (`/contact`)
- Gallery page (`/gallery`)

---

## Request Service Form (`/request-service`)

### Flow

1. **Step 1:** Service type selection (12 categories)
2. **Step 2:** Vehicle details (year, make, model, VIN, registered state, ZIP, description)
3. **Go/No-Go:** ZIP validated against 60-mile Nashville radius (prefixes 370-385, 420-422)
4. **Step 3:** Contact info (name, phone, email, preferred contact method)
5. **Submit:** Google reCAPTCHA v3 → HubSpot Forms API

### HubSpot forms

- **Original form** (`4dfc54af-6a62-4fdc-a2bf-2836626d42eb`): Has reCAPTCHA enabled. Used on unmanaged pages via embedded widget. **Cannot receive API submissions** due to CAPTCHA.
- **Cloned form** (`94d999ff-8124-43e0-a42d-9610a4891681`): CAPTCHA disabled. Used by our custom form's API submission.

### Anti-abuse

- Honeypot field (`rsWebsite`) — hidden, bots fill it, silently shows success
- Rate limit: 3 submissions per session
- Speed check: < 3 seconds from page load = bot
- Google reCAPTCHA v3 (site key: `6LeZL7ss...`) — invisible, client-side only

### HubSpot field mapping

| Form Field | HubSpot Property |
|------------|-----------------|
| firstname | `firstname` |
| lastname | `lastname` |
| phone | `phone` |
| email | `email` |
| service_type | `service_type` (custom dropdown) |
| vin_license_plate_number | `vin_license_plate_number` |
| year | `year` |
| make | `make` |
| model | `model` |
| vehicle_registration_state | `vehicle_registration_state` |
| state | `state` |
| message | `message` (includes service type, preferred contact, ZIP appended) |

### HubSpot free tier limits

- 10 custom contact properties. `service_type` uses 1 slot.
- Preferred contact method and ZIP are rolled into the `message` field.

---

## CSS architecture on managed pages

Each managed page has inline `<style>` blocks because `simple-content-page.html` doesn't inherit the Growth theme's CSS. Key blocks:

1. **Header settings** — replicates Growth theme's header colors, fonts, menu styles
2. **Header layout fix** — overrides centered layout to left-aligned (logo left, nav right)
3. **Mobile menu fix** — constrains mobile dropdown to viewport width
4. **Page-specific styles** — form styles (request-service), grid layouts, etc.

The `template_main.min.css` from the Growth theme was **removed** from managed pages because it sets `.footer { background: white }` which conflicts with the dark footer. Header styles are replicated inline instead.

---

## Key decisions and gotchas

### DO NOT

- Modify `generated-home.html` or `generated-content.html` — breaks the home page
- Create `base.html` in `growth-customized/templates/layouts/` — overrides the hidden theme base and breaks CSS
- Edit Growth theme modules — they're locked
- Add `recaptchaToken` to HubSpot form submission context — returns 400
- Use the original form ID for API submissions — CAPTCHA blocks it

### Service area

- 60-mile radius from Nashville
- ZIP prefixes: 370-385 (Tennessee), 420-422 (Southern Kentucky)
- JSON-LD schemas all use `"geoRadius": "60 miles"`

### Client preferences

- No email on the website — contact only through form or phone
- American First Finance link on all pages: `https://americanfirstfinance.com/app/?dealer=32791&loc=1&src=UA`
- Phone: (615) 496-3900
- Hours: Mon-Sat 6AM-4PM

### Known duplicate pages in HubSpot

Previous deploys created duplicates (e.g. `request-service-1`, `commercial-equipment-2`). These should be deleted in HubSpot: Marketing > Website > Website Pages.

---

## File structure

```
src/
├── pages/
│   ├── all-services.html         # Main services listing
│   ├── high-end-vehicles.html    # Luxury/exotic standalone page (custom lux theme)
│   ├── request-service.html      # Custom intake form with Go/No-Go gating
│   ├── commercial-equipment.html # Heavy equipment page (main site theme)
│   └── muscle-cars.html          # Muscle car page (main site theme)
├── sections/
│   └── footer-content.html       # Legacy footer (not actively used)
└── templates/
    ├── partials/
    │   └── footer.html           # Footer partial (deployed to pages + Design Manager)
    ├── service-page.html         # Template for generated service pages
    ├── location-page.html        # Template for generated location pages
    ├── page-with-header-footer.html
    └── blank-page.html

scripts/
├── deploy-pages.js               # Main deploy script (all 17 pages)
├── deploy-high-end-page.js       # Standalone deployer for lux page
├── sync-page-ids.js              # Rebuilds .hubspot-pages.json
├── lib/
│   ├── ServiceContentGenerator.js
│   └── LocationContentGenerator.js
└── ...

config/
├── services-config.json          # 7 service page definitions
└── neighborhoods-config.json     # 5 location page definitions

docs/
├── proposal-2-completion-report.md
├── project-completed-summary.md
└── visual-asset-prompts.md
```
