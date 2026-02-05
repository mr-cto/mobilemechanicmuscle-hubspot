# HubSpot Page Generation Scripts

## ⚡ Quick Start - Zero-Duplicate Workflow

**All scripts now use page mapping to prevent duplicates!**

### Daily Workflow

```bash
# Check status (see what's deployed)
npm run status

# Update all pages (no duplicates!)
npm run deploy
```

### First Time / After Manual HubSpot Changes

```bash
# Sync page IDs from HubSpot
npm run sync

# Then deploy
npm run deploy
```

### Clean Up Duplicates (If Any Exist)

```bash
npm run clean
```

---

## 🛡️ Duplicate Prevention

**All deployment scripts now:**

- ✅ Load page mapping from `.hubspot-pages.json`
- ✅ Update existing pages instead of creating new ones
- ✅ Only create pages that don't exist
- ❌ **NEVER create duplicates**

---

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Configure API access:**

```bash
cp .env.example .env
# Edit .env and add your HubSpot Personal Access Token
```

3. **Get your Personal Access Token:**
   - Go to HubSpot → Settings → Integrations → Private Apps
   - Create app with permissions: `cms.pages.read`, `cms.pages.write`
   - Copy the access token to `.env`

## Usage

### Create All Pages (Draft Mode with Draft URLs)

```bash
npm run create-pages
```

This will:

- Create 11 pages (7 services + 4 locations)
- Set URLs to `/draft/services/...` and `/draft/locations/...`
- Set pages to DRAFT status
- Add `noindex, nofollow` meta tags
- Use template defaults (content placeholders)

### Environment Variables

Edit `.env` to control behavior:

```bash
# Your HubSpot API token
HUBSPOT_ACCESS_TOKEN=your_token_here

# Portal ID
HUBSPOT_PORTAL_ID=46603985

# Create pages as drafts (true) or published (false)
CREATE_AS_DRAFT=true

# Use /draft/ URL prefix (true) or production URLs (false)
USE_DRAFT_URLS=true

# Add noindex,nofollow to draft pages
NOINDEX_DRAFTS=true
```

## Workflow

### Phase 1: Create Draft Pages (Safe)

```bash
# .env settings:
CREATE_AS_DRAFT=true
USE_DRAFT_URLS=true
NOINDEX_DRAFTS=true

npm run create-pages
```

Result: Pages at `/draft/services/brake-repair`, etc. - hidden from Google, reviewable

### Phase 2: Go Live (After Approval)

Option A: Manual clone in HubSpot UI
Option B: Update and re-create:

```bash
# .env settings:
CREATE_AS_DRAFT=false
USE_DRAFT_URLS=false
NOINDEX_DRAFTS=false

npm run create-pages
```

## Future Enhancements

- [ ] Add content generation from LLM
- [ ] Bulk update existing pages
- [ ] Deploy from local HTML files
- [ ] Automated SEO validation
- [ ] Scheduled publishing

## Troubleshooting

**"401 Unauthorized"**

- Check your access token in `.env`
- Verify token has `cms.pages.write` permission

**"Template not found"**

- Ensure templates uploaded to Design Manager
- Check template path matches HubSpot structure

**Rate limiting**

- Script includes 500ms delay between requests
- For large batches, increase delay if needed
