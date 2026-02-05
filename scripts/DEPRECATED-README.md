# ⚠️ DEPRECATED SCRIPTS

## create-pages-with-content.js

**STATUS:** ⚠️ Use `deploy-pages.js` instead

This script has been superseded by the improved workflow.

### Why It's Deprecated

- Original implementation before mapping system existed
- Kept for backward compatibility only
- Same functionality now in `deploy-pages.js` with better error handling

### What To Use Instead

```bash
# Instead of: node scripts/create-pages-with-content.js
# Use:
npm run deploy
```

Or directly:

```bash
node scripts/deploy-pages.js
```

### If You Must Use This Script

It now uses the same mapping system as `deploy-pages.js`, so you must run sync first:

```bash
npm run sync
node scripts/create-pages-with-content.js
```

**Recommended:** Just use `npm run deploy` - it's the same code with better logging.
