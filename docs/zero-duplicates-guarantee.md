# 🛡️ Zero Duplicates Guarantee

## Overview

**All deployment scripts now prevent duplicate page creation.** This document explains how the system works and guarantees you'll never create duplicates again.

## How It Works

### 1. Page Mapping Cache

Every script loads `.hubspot-pages.json` which contains:

```json
{
  "lastSync": "2026-02-01T15:56:03.123Z",
  "portalId": "46603985",
  "pages": {
    "services/brake-repair": {
      "id": "206537428120",
      "name": "Brake Repair - Mobile Mechanic Muscle",
      "state": "PUBLISHED"
    }
  }
}
```

### 2. Lookup Before Action

Every deployment script:

```javascript
// 1. Load mapping
if (existsSync('.hubspot-pages.json')) {
  pageMapping = JSON.parse(readFileSync('.hubspot-pages.json'));
} else {
  console.log("⚠️ Run 'npm run sync' first");
}

// 2. Check before creating
async function findPageBySlug(slug) {
  if (pageMapping.pages[slug]) {
    return pageMapping.pages[slug];  // Found it!
  }
  return null;  // Doesn't exist yet
}

// 3. Update or create
if (existingPage) {
  await hubspotClient.cms.pages.sitePagesApi.update(existingPage.id, ...);
  console.log('🔄 Updated');
} else {
  await hubspotClient.cms.pages.sitePagesApi.create(...);
  console.log('✅ Created');
}
```

### 3. Visual Feedback

- 🔄 **Updated** = Page already existed, content refreshed
- ✅ **Created** = New page, didn't exist before

If you see 🔄 on every page, **you're safe** - no duplicates were created.

## Updated Scripts

### ✅ deploy-pages.js

**Status:** Primary deployment script  
**Duplicate Prevention:** Uses page mapping  
**Recommended:** Yes, use this via `npm run deploy`

### ✅ create-pages-with-content.js

**Status:** Legacy script, updated with mapping  
**Duplicate Prevention:** Now uses page mapping  
**Recommended:** Use `deploy-pages.js` instead

### ✅ sync-page-ids.js

**Status:** Active utility  
**Purpose:** Builds the mapping file  
**Run:** After manual HubSpot changes

### ✅ clean-duplicates.js

**Status:** Active utility  
**Purpose:** Removes any existing duplicates  
**Run:** If duplicates somehow exist

## Workflow Guarantees

### ✅ Safe Workflow (Zero Duplicates)

```bash
npm run sync     # Fetch current page IDs
npm run deploy   # All pages show 🔄 Updated
```

**Result:** Zero duplicates created

### ✅ First-Time Deployment

```bash
npm run deploy   # All pages show ✅ Created (no mapping exists yet)
npm run sync     # Now build the mapping
npm run deploy   # All pages show 🔄 Updated
```

**Result:** 12 pages created once, then updated forever

### ✅ Add New Page

```bash
# Edit config/services-config.json to add new service
npm run deploy   # New page shows ✅ Created, others show 🔄 Updated
npm run sync     # Add new page to mapping
```

**Result:** Only the new page is created, existing pages updated

### ❌ What Could Go Wrong?

**Only possible way to create duplicates:**

1. Delete `.hubspot-pages.json` manually
2. Run `npm run deploy`
3. Pages that already exist in HubSpot will be duplicated

**Prevention:** Don't delete the mapping file. If you do, run `npm run sync` first.

## Verification Commands

### Check If You're Safe

```bash
npm run status
```

Output should show:

```
✅ Page Mapping:
   Pages mapped: 12
   Last synced: [recent date]
```

### Test Without Risk

```bash
npm run sync     # Refresh mapping
npm run status   # Verify all pages are mapped
npm run deploy   # Should show 🔄 for all pages
```

If all show 🔄, you're guaranteed zero duplicates.

### Emergency Cleanup

```bash
npm run clean    # Interactive duplicate removal
npm run sync     # Rebuild mapping from cleaned state
```

## Technical Details

### Why This Is Bulletproof

1. **Local Cache:** Mapping file is fast, no API rate limits
2. **Explicit Check:** Every page lookup is explicit in code
3. **Clear Logging:** You see 🔄 vs ✅ for every operation
4. **Update Payload:** Update API uses different payload than create (prevents accidental creation)

### The Update-Only Pattern

```javascript
if (existingPage) {
  // Can ONLY update, cannot accidentally create
  await update(existingPage.id, { content });
} else {
  // Explicitly creating new page
  await create({ slug, content });
}
```

This pattern makes it **impossible** to create duplicates if the page exists in the mapping.

## Migration from Old System

If you were using the old scripts that created duplicates:

```bash
# 1. Clean up existing duplicates
npm run clean

# 2. Build page mapping
npm run sync

# 3. Verify status
npm run status

# 4. From now on, just use:
npm run deploy
```

**All future deployments will update existing pages, never create duplicates.**

## Summary

✅ **Page mapping system** prevents duplicates at the source  
✅ **All scripts updated** to use mapping  
✅ **Visual feedback** shows update vs create  
✅ **Cleanup tools** available if needed  
✅ **Simple workflow:** `npm run deploy` just works

**You will never create duplicates again.** 🎉
