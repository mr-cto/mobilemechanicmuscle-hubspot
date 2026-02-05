# Developer Guide - Improved Workflow

## 🎯 Overview

This project now has a **zero-duplicate deployment system** that tracks page IDs and updates existing pages instead of creating new ones.

## 🚀 Quick Start

### First Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Sync existing pages from HubSpot
npm run sync

# 3. Deploy/update all pages
npm run deploy
```

### Daily Workflow

```bash
# Check current status
npm run status

# Update all pages with latest content
npm run deploy

# Or do both at once
npm run full-deploy
```

## 📋 Available Commands

| Command               | What It Does                               | When To Use                               |
| --------------------- | ------------------------------------------ | ----------------------------------------- |
| `npm run status`      | Shows project status and page mapping      | Check before/after deployments            |
| `npm run sync`        | Fetches page IDs from HubSpot              | After manual page changes in HubSpot UI   |
| `npm run deploy`      | Updates existing pages or creates new ones | Update content on existing pages          |
| `npm run clean`       | Finds and deletes duplicate pages          | If duplicates somehow get created         |
| `npm run full-deploy` | Sync + deploy in one command               | Safest option, ensures mapping is current |

## 🔄 How It Works

### 1. Page Mapping System

The system maintains a cache file (`.hubspot-pages.json`) that maps page slugs to their HubSpot IDs:

```json
{
  "lastSync": "2026-02-01T15:56:03.123Z",
  "portalId": "46603985",
  "pages": {
    "services/brake-repair": {
      "id": "206537428120",
      "name": "Brake Repair - Mobile Mechanic Muscle",
      "state": "PUBLISHED",
      "updatedAt": "2026-02-01T15:30:00.000Z"
    }
  }
}
```

### 2. Smart Deploy Process

When you run `npm run deploy`:

1. ✅ Loads the page mapping from `.hubspot-pages.json`
2. ✅ For each configured page:
   - Checks if slug exists in mapping
   - If YES → **Updates** the existing page with new content
   - If NO → **Creates** a new page
3. ✅ No duplicates possible!

### 3. Sync Process

When you run `npm run sync`:

1. ✅ Fetches ALL pages from HubSpot using the API
2. ✅ Filters for service and location pages
3. ✅ Builds the mapping file
4. ✅ Saves to `.hubspot-pages.json`

## 📝 Common Scenarios

### Scenario 1: Update Content on All Pages

```bash
# Make changes to content generators or configs
# Then update all pages:
npm run deploy
```

Result: All 12 pages updated with 🔄 icons, no duplicates created.

### Scenario 2: Add a New Location

```bash
# 1. Add location to config/neighborhoods-config.json
# 2. Deploy (it will create the new page)
npm run deploy

# 3. Re-sync to add new page to mapping
npm run sync
```

### Scenario 3: Someone Edited Pages in HubSpot UI

```bash
# Re-sync to get latest page IDs and metadata
npm run sync

# Then deploy your changes
npm run deploy
```

### Scenario 4: Check If Everything Is In Sync

```bash
npm run status
```

This shows:

- How many pages are configured vs mapped
- Which pages exist in HubSpot
- When mapping was last synced
- Missing pages (if any)

### Scenario 5: Clean Up Duplicate Pages

```bash
npm run clean
```

Interactive process:

1. Finds duplicate slugs
2. Shows which will be kept (newest)
3. Asks for confirmation
4. Deletes old duplicates
5. Run `npm run sync` after to update mapping

## 🛠️ Technical Details

### HubSpot API Quirks

The `sitePagesApi.getPage()` method returns a **collection** of pages despite the singular name. Parameters:

```javascript
hubspotClient.cms.pages.sitePagesApi.getPage(
  undefined, // createdAt
  undefined, // createdAfter
  undefined, // createdBefore
  undefined, // updatedAt
  undefined, // updatedAfter
  undefined, // updatedBefore
  undefined, // sort
  after, // pagination cursor
  100, // limit per page
  false, // include archived
);
```

### Why This Is Better

**Before:**

- ❌ Script always created new pages
- ❌ Duplicates on every run
- ❌ Manual cleanup required
- ❌ No way to update existing pages

**After:**

- ✅ Updates existing pages by default
- ✅ Only creates if page doesn't exist
- ✅ No duplicates possible
- ✅ Fast - uses cached mapping
- ✅ Status visibility with `npm run status`
- ✅ Easy cleanup with `npm run clean`

## 🎓 Best Practices

1. **Run `npm run status` often** - See what's deployed and when
2. **Use `npm run full-deploy` when unsure** - Safest option
3. **Sync after manual HubSpot changes** - Keep mapping current
4. **Don't delete `.hubspot-pages.json`** - It's gitignored but critical
5. **Check status after deployments** - Verify everything worked

## 🐛 Troubleshooting

### "No page mapping found" warning

**Problem:** `.hubspot-pages.json` doesn't exist

**Solution:**

```bash
npm run sync
```

### All pages showing as "Created" instead of "Updated"

**Problem:** Mapping is out of date or missing pages

**Solution:**

```bash
npm run sync
npm run deploy
```

### Script errors about missing pages

**Problem:** Config has pages that don't exist in HubSpot

**Solution:** First deployment creates them:

```bash
npm run deploy
npm run sync  # Update mapping with new pages
```

### Duplicate pages somehow appeared

**Solution:**

```bash
npm run clean  # Interactive cleanup
npm run sync   # Update mapping
```

## 📦 Files Created

| File                          | Purpose                       | Git Tracked?       |
| ----------------------------- | ----------------------------- | ------------------ |
| `.hubspot-pages.json`         | Page ID mapping cache         | ❌ No (gitignored) |
| `scripts/sync-page-ids.js`    | Fetches pages from HubSpot    | ✅ Yes             |
| `scripts/deploy-pages.js`     | Upserts pages with content    | ✅ Yes             |
| `scripts/clean-duplicates.js` | Interactive duplicate cleanup | ✅ Yes             |
| `scripts/status.js`           | Shows project status          | ✅ Yes             |

## 🎉 Summary

You now have a **professional-grade deployment system** that:

- ✅ Tracks page IDs automatically
- ✅ Updates existing pages instead of duplicating
- ✅ Provides clear status visibility
- ✅ Includes safety checks and cleanup tools
- ✅ Works with simple npm commands
- ✅ Eliminates manual HubSpot UI cleanup

**The developer experience is now:**

```bash
npm run deploy  # Just works, no duplicates! 🎉
```
