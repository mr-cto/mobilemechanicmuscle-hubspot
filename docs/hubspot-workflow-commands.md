# HubSpot Development Workflow - Safe Commands

## Current Account
- **Name:** MMM
- **Portal ID:** 46603985
- **Auth Method:** Personal Access Key
- **Domain:** mobilemechanicmusclenearme.com

---

## Safe Development Commands

### 1. Upload Templates to Draft Location

```bash
# Upload base layout
hs upload src/templates/layouts/base.html draft-templates/layouts/base.html --account=MMM

# Upload service page template
hs upload src/templates/service-page.html draft-templates/service-page.html --account=MMM

# Upload location page template
hs upload src/templates/location-page.html draft-templates/location-page.html --account=MMM

# Upload CSS
hs upload src/css/custom.css draft-css/custom.css --account=MMM
```

### 2. Watch for Changes (Safe - Goes to Draft Location)

```bash
# Watch src/ and upload to draft-templates/
hs watch src/templates/ draft-templates/ --account=MMM

# Watch CSS
hs watch src/css/ draft-css/ --account=MMM
```

### 3. Create Draft Pages (Manual in HubSpot UI)

After uploading templates:

1. Go to **Marketing → Website → Website Pages**
2. Click **Create → Website Page**
3. Select your `draft-templates/service-page.html` template
4. **Set URL:** `/draft/services/brake-repair` (not `/services/brake-repair`)
5. **Before saving:**
   - Go to **Settings → SEO**
   - Set **Meta robots:** `noindex, nofollow`
6. Save as **Draft** (not Published)

### 4. Review Draft Pages

Share these URLs with client (not indexed, not public):
- https://mobilemechanicmusclenearme.com/draft/services/brake-repair
- https://mobilemechanicmusclenearme.com/draft/services/diagnostics
- https://mobilemechanicmusclenearme.com/draft/locations/franklin
- etc.

### 5. When Approved - Clone to Production

In HubSpot UI for each draft page:

1. **Actions → Clone**
2. Change URL from `/draft/services/brake-repair` to `/services/brake-repair`
3. **Settings → SEO:**
   - Remove `noindex, nofollow`
   - Add meta description
   - Enable sitemap
4. **Publish**

---

## Commands to AVOID (Will Overwrite Existing Pages)

❌ **Don't do this:**
```bash
# This could overwrite existing pages!
hs upload src/templates/service-page.html templates/service-page.html --account=MMM

# This puts templates in production location
hs watch src/ templates/ --account=MMM
```

✅ **Do this instead:**
```bash
# Safe - goes to draft location
hs upload src/templates/service-page.html draft-templates/service-page.html --account=MMM
hs watch src/ draft-templates/ --account=MMM
```

---

## Backup Commands

### Before Making Any Changes

```bash
# Backup current Design Manager files
hs fetch --account=MMM / backups/$(date +%Y-%m-%d)/

# Commit to Git
git add backups/
git commit -m "Backup before changes: $(date +%Y-%m-%d)"
```

### Restore if Needed

```bash
# Upload from backup
hs upload backups/2026-01-31/templates/ templates/ --account=MMM
```

---

## Development Workflow

### Day-to-Day Development

```bash
# 1. Start watch mode (uploads to draft location automatically)
hs watch src/templates/ draft-templates/ --account=MMM

# 2. Edit files locally in src/
# Changes auto-upload to draft-templates/

# 3. Preview in HubSpot at /draft/... URLs

# 4. Commit to Git when satisfied
git add src/
git commit -m "Update service page template"
```

### Creating New Page

```bash
# 1. Copy template
cp src/templates/service-page.html src/pages/services/brake-repair.html

# 2. Edit content locally

# 3. Upload to HubSpot (manual)
hs upload src/pages/services/brake-repair.html draft-pages/services/brake-repair.html --account=MMM

# 4. Create page in HubSpot UI using draft-pages/services/brake-repair.html
#    URL: /draft/services/brake-repair
#    SEO: noindex, nofollow
```

---

## Migration Day Commands

### Pre-Migration Checklist

```bash
# 1. Backup everything
hs fetch --account=MMM / backups/pre-migration-$(date +%Y-%m-%d)/
git add backups/
git commit -m "Pre-migration backup"

# 2. Test all draft pages
# Visit each /draft/... URL and verify

# 3. Get client final approval
```

### Migration Process

1. **Clone pages in HubSpot UI** (no CLI command for this)
   - Clone each `/draft/...` page to production URL
   - Update SEO settings
   - Publish

2. **Update navigation menus** in HubSpot
   - Add new service pages
   - Add new location pages

3. **Submit to search engines**
   - Google Search Console
   - Update sitemap

4. **Monitor**
   - Check Google Analytics
   - Verify no 404s
   - Test all links

### Post-Migration

```bash
# Delete draft pages in HubSpot UI after confirming production works

# Tag in Git
git tag -a v1.0-launch -m "Initial 11-page launch"
git push origin v1.0-launch
```

---

## Troubleshooting

### Check What's Currently on HubSpot

```bash
# List files in Design Manager
hs list --account=MMM templates/
hs list --account=MMM draft-templates/
```

### Compare Local vs HubSpot

```bash
# Fetch current from HubSpot
hs fetch --account=MMM draft-templates/ compare/

# Compare
diff -r src/templates/ compare/draft-templates/
```

### Verify Account

```bash
# Show current account
hs accounts list

# Expected output:
# ┌──────────┬─────────────────────────────────────────┐
# │ Name     │ MMM                                      │
# │ Portal ID│ 46603985                                 │
# │ Auth Type│ personalaccesskey                        │
# │ Default  │ Yes                                      │
# └──────────┴─────────────────────────────────────────┘
```

---

## Quick Reference

**Safe to run anytime:**
- `hs accounts list`
- `hs list draft-templates/`
- `hs fetch / backups/`

**Safe during development:**
- `hs upload src/... draft-templates/...`
- `hs watch src/... draft-templates/...`

**Use with caution (production):**
- `hs upload ... templates/...` (could overwrite existing)
- `hs upload ... pages/...` (affects published pages)

**Never run:**
- Commands without `--account=MMM` (wrong account)
- Upload to `templates/` without testing first
- Delete commands without backup
