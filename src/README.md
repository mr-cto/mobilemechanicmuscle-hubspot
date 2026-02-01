# HubSpot Local Development - Mobile Mechanic Muscle

## Structure Created

```
src/
├── templates/
│   ├── layouts/
│   │   └── base.html              ✅ Main layout with header/footer
│   ├── service-page.html          ✅ Reusable service template
│   └── location-page.html         ✅ Reusable location template
├── css/
│   └── custom.css                 ✅ Custom styles
├── pages/
│   ├── services/                  📝 Generate 7 service pages here
│   └── locations/                 📝 Generate 4 location pages here
├── modules/                        📝 Create custom modules if needed
└── sections/                       📝 Create reusable sections if needed
```

## Quick Start

### 1. Watch for Changes (Auto-sync to HubSpot)

```bash
# Start watching - uploads changes automatically
hs watch src/ src/ --account=MMM
```

### 2. Upload Initial Structure

```bash
# Upload templates
hs upload src/templates/ templates/ --account=MMM

# Upload CSS
hs upload src/css/ css/ --account=MMM
```

### 3. Create New Service Page

Copy template and customize:

```bash
# Copy the template
cp src/templates/service-page.html src/pages/services/brake-repair.html

# Edit the file:
# - Change SERVICE_NAME to "Brake Repair"
# - Change service-slug to "brake-repair"
# - Add specific content
# - Update schema data
```

### 4. Upload to HubSpot

```bash
hs upload src/pages/services/brake-repair.html pages/services/brake-repair.html --account=MMM
```

Or if watch is running, just save the file!

## Templates Ready

✅ **base.html** - Main layout
- Header with navigation
- Footer with links
- Standard HubSpot includes
- Mobile responsive structure

✅ **service-page.html** - For 7 service pages
- Hero section
- Problem/solution content
- How it works
- Why choose us
- Service area
- CTA sections
- Quote form
- JSON-LD schema

✅ **location-page.html** - For 4 neighborhood pages
- Local hero
- Location-specific context
- Services grid
- Why choose us (local)
- Area coverage
- CTA sections
- Quote form
- LocalBusiness schema

✅ **custom.css** - Professional styling
- Mobile responsive
- Brand colors
- Button styles
- Grid layouts
- Typography

## Next Steps

1. **Start watch command** to auto-sync
2. **Generate content** for your 11 pages using LLM
3. **Create pages** by copying templates and filling in content
4. **Upload** and they're live!

## Variables to Replace

When creating pages from templates:

**Service Pages:**
- `SERVICE_NAME` → "Brake Repair", "Diagnostics", etc.
- `service-slug` → "brake-repair", "diagnostics", etc.
- `PRIMARY_KEYWORD` → Your target keyword
- `SECTION_HEADING` → Actual heading text
- `SECTION_CONTENT` → Your generated content
- `form_id_here` → Actual HubSpot form ID

**Location Pages:**
- `LOCATION_NAME` → "Franklin", "Brentwood", etc.
- `location-slug` → "franklin", "brentwood", etc.
- `COUNTY_NAME` → "Williamson County", etc.
- Local landmarks and specific content

## Tips

- Use `hs watch` during development for instant updates
- Test pages in HubSpot preview before publishing
- Update phone/email in base.html footer
- Add real form IDs before going live
