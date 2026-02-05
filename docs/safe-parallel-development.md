# Safe Parallel Development Strategy

## Goal

Work on new pages without affecting the 3 existing published pages until ready for launch.

---

## Strategy: Use `/draft/` URL Path During Development

### How It Works

**Current Site:**

- `/` - Home page (published)
- `/contact` - Contact page (published)
- `/gallery` - Gallery page (published)

**Development Pages (Hidden from Public):**

- `/draft/services/brake-repair` - NOT indexed, NOT linked
- `/draft/services/diagnostics` - NOT indexed, NOT linked
- `/draft/locations/franklin` - NOT indexed, NOT linked
- etc.

### Benefits

✅ Pages are live on HubSpot but **not discoverable**  
✅ You can preview and show client  
✅ No risk of overwriting existing pages  
✅ Easy to move to production URLs when ready  
✅ Can use real domain for testing (mobilemechanicmusclenearme.com/draft/...)

---

## Implementation Steps

### Phase 1: Build in `/draft/` Directory

Upload all templates and pages to development paths:

```bash
# Upload templates to draft location
hs upload src/templates/ draft-templates/ --account=MMM
hs upload src/css/ draft-css/ --account=MMM

# Create pages at draft URLs
# In HubSpot UI, create pages with URL path: /draft/services/brake-repair
```

### Phase 2: Configure Pages for Development

For each page in HubSpot:

1. **Settings → SEO → Meta robots:** Set to `noindex, nofollow`
2. **Page URL:** Use `/draft/` prefix (e.g., `/draft/services/brake-repair`)
3. **Don't link from existing site** - Keep orphaned during development
4. **Password protect** (optional): Settings → Password protect for extra security

### Phase 3: Client Review

Share draft links directly:

- https://mobilemechanicmusclenearme.com/draft/services/brake-repair
- https://mobilemechanicmusclenearme.com/draft/locations/franklin

Client can review without affecting live site.

### Phase 4: Go Live (Migration Day)

When approved:

1. **Clone draft pages to production URLs:**
   - `/draft/services/brake-repair` → `/services/brake-repair`
   - `/draft/locations/franklin` → `/locations/franklin`

2. **Update SEO settings:**
   - Remove `noindex, nofollow`
   - Add proper meta descriptions
   - Enable sitemaps

3. **Update navigation:**
   - Add new pages to main menu
   - Update footer links

4. **Submit to Google:**
   - Submit new URLs to Google Search Console
   - Update sitemap

5. **Delete draft pages** (after confirming production works)

---

## Alternative Strategy: HubSpot Sandboxes (Premium Feature)

If client has **Enterprise** HubSpot:

### Use Sandbox Environment

- Complete isolated copy of production
- Test everything without risk
- Push changes when ready
- **Requires HubSpot Enterprise plan**

Check if available:

```bash
# List available environments
hs accounts list
```

If you see multiple accounts/environments, you can use sandbox workflow.

---

## Recommended Approach for Your Project

### Option 1: `/draft/` Path Method (Free, Easy)

**Best for:** Starter/Professional HubSpot plans

**Workflow:**

1. Upload templates to HubSpot
2. Create pages with `/draft/` URL prefix
3. Set `noindex, nofollow` on all draft pages
4. Share direct links with client for review
5. Clone to production URLs when approved
6. Clean up draft pages

**Pros:**

- Works on any HubSpot plan
- Simple to implement
- Easy client review process
- Zero risk to existing site

**Cons:**

- Manual cloning process
- Need to remember to update SEO settings

---

### Option 2: Local Development + Manual Publishing

**Best for:** Maximum control

**Workflow:**

1. Build everything locally in `src/`
2. Generate all content files
3. Keep files local until approved
4. Upload only when client signs off
5. Publish to final URLs directly

**Pros:**

- Nothing touches HubSpot until approved
- Complete local control
- Can use Git for versioning

**Cons:**

- Client can't preview on real domain
- Harder to show progress

---

## My Recommendation: Hybrid Approach

1. **Local Development:**
   - Build templates in `src/`
   - Generate content locally
   - Version control with Git
   - Test locally with HubSpot local dev server

2. **HubSpot Staging (Draft URLs):**
   - Upload to `/draft/` paths for client review
   - Set `noindex, nofollow`
   - Password protect if needed
   - Get client approval

3. **Production Deployment:**
   - Clone draft pages to production URLs
   - Update SEO settings
   - Update navigation
   - Go live

---

## Protecting Existing Pages

### Backup Current Site

```bash
# Download current published pages (already done)
hs fetch --account=MMM / existing-site/

# Commit to Git
git add existing-site/
git commit -m "Backup existing published pages"
```

### Lock Existing Pages (Optional)

In HubSpot UI:

1. Go to each existing page (Home, Contact, Gallery)
2. Click **Actions → Permissions**
3. Restrict editing to only you

---

## Safe Development Checklist

Before uploading anything:

- [ ] Existing site backed up locally
- [ ] Git repository committed
- [ ] All new pages use `/draft/` URL prefix
- [ ] All draft pages set to `noindex, nofollow`
- [ ] Draft pages NOT linked from navigation
- [ ] Client approval process defined
- [ ] Migration checklist prepared
- [ ] Rollback plan documented

---

## Next Steps

1. **Choose your approach** (I recommend Hybrid)
2. **Update templates** to use `/draft/` paths temporarily
3. **Upload to HubSpot** with draft URLs
4. **Generate content** for all 11 pages
5. **Share draft links** with client
6. **Get approval**
7. **Execute migration** to production URLs

---

## Questions to Confirm

1. **Does client have Enterprise HubSpot?** (Check for Sandbox access)
2. **Do you want password protection** on draft pages?
3. **When is target launch date?** (So we can plan migration window)
4. **Who needs review access?** (Get their HubSpot user info)
