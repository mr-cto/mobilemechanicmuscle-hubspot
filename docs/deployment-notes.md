# Page Deployment Scripts

## Important Notes

### Duplicate Pages Issue

**⚠️ CURRENT LIMITATION:** The deployment script currently creates new pages each time it runs, leading to duplicates.

**Workaround:**

1. Before running the script, manually delete old versions of pages in HubSpot (Marketing → Website → Website Pages)
2. Or use HubSpot's bulk delete feature to remove duplicate pages by name/slug pattern

### Scripts

#### `deploy-pages.js` (Recommended - Work in Progress)

**Status:** Experimental - lookup functionality not working yet

- Attempts to find existing pages by slug and update them
- Falls back to creating new pages if lookup fails
- Currently creates duplicates due to API limitations

**Usage:**

```bash
node scripts/deploy-pages.js
```

#### `create-pages-with-content.js` (Current Working Script)

**Status:** Working but creates duplicates

- Creates new pages every time it runs
- Does not check for existing pages
- **Best practice:** Delete old pages before running

**Usage:**

```bash
# 1. Delete old versions in HubSpot UI first
# 2. Then run:
node scripts/create-pages-with-content.js
```

### Environment Variables

Controls in `.env`:

- `CREATE_AS_DRAFT=false` - Publish immediately
- `USE_DRAFT_URLS=false` - Use production URLs (/services/, /locations/)
- `NOINDEX_DRAFTS=false` - Allow search engine indexing

### Future Improvements

To properly implement upsert functionality, we need:

1. ✅ Find existing page by slug
2. ⚠️ HubSpot API method to list/search pages (getAll() not available in current SDK version)
3. ✅ Update existing page with new content
4. ✅ Create new page if it doesn't exist

**Alternative Solutions:**

- Use HubSpot's Page ID instead of slug (requires maintaining a mapping file)
- Use HubSpot CLI `hs watch` for continuous updates
- Manually track page IDs in config files
- Wait for HubSpot SDK update with better search/list capabilities

### Current Deployment Process

**Manual Steps Required:**

1. Go to HubSpot: Marketing → Website → Website Pages
2. Search for pages with names like "Brake Repair - Mobile Mechanic Muscle"
3. Select all duplicate/old versions
4. Delete them
5. Run `node scripts/create-pages-with-content.js` or `node scripts/deploy-pages.js`
6. Verify new pages are live

**Pages Managed:**

- 7 Service pages: `/services/*`
- 5 Location pages: `/locations/*` (Nashville, Franklin, Brentwood, Murfreesboro, Hendersonville)
- Total: 12 pages

### Tracking Page Changes

If you modify content in:

- `scripts/lib/LocationContentGenerator.js` - Affects all location pages
- `scripts/lib/ServiceContentGenerator.js` - Affects all service pages
- `config/neighborhoods-config.json` - Changes location data
- `config/services-config.json` - Changes service data

Then you need to:

1. Delete old pages in HubSpot
2. Re-run the deploy script
3. Test all pages for correctness
