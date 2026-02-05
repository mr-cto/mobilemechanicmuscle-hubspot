# Migration Plan: Existing Site → SEO-Optimized Site

## Overview

This migration plan ensures a smooth transition from the current Mobile Mechanic Muscle website to the new SEO-optimized version with minimal downtime and preserved search rankings.

---

## Migration Timeline

### Phase 1: Preparation (Week 1)

- Complete existing site audit
- Set up staging environment
- Generate new content
- Client review and approval

### Phase 2: Staging Build (Week 2-3)

- Build new pages in staging
- Implement schema markup
- Configure redirects
- QA testing

### Phase 3: Pre-Launch (Week 3-4)

- Final client approval
- Search Console setup
- Backup production site
- Pre-launch checklist

### Phase 4: Launch (Week 4)

- Deploy to production
- Monitor analytics
- Verify redirects
- Submit sitemap

### Phase 5: Post-Launch (Week 5-8)

- Monitor rankings
- Track conversions
- Iterate based on data
- Client reporting

---

## Pre-Migration Checklist

### Data Backup

- [ ] Export all current page content
- [ ] Backup HubSpot templates
- [ ] Export analytics data (3-6 months)
- [ ] Download all images/assets
- [ ] Export form submissions
- [ ] Document all custom modules
- [ ] Save current sitemap.xml

**Backup Location:** `backups/pre-migration-[DATE]/`

### Analytics Baseline

Document current performance (save screenshots):

- [ ] Google Analytics: Organic traffic last 90 days
- [ ] Google Search Console: Top keywords
- [ ] HubSpot Analytics: Conversion rates
- [ ] Page speed scores (all key pages)
- [ ] Current schema implementation
- [ ] Existing backlink profile

### Technical Preparation

- [ ] List all current URLs that will change
- [ ] Create redirect map (old URL → new URL)
- [ ] Verify staging environment is working
- [ ] Test HubSpot CLI deployment
- [ ] Prepare rollback plan if needed

---

## Content Migration Strategy

### New Pages to Create

**Service Pages (7 total):**

1. `/services/brake-repair` ← New
2. `/services/diagnostics` ← New
3. `/services/battery-starter` ← New
4. `/services/cooling-system` ← New
5. `/services/suspension` ← New
6. `/services/pre-purchase-inspection` ← New
7. `/services/emergency-roadside` ← New

**Neighborhood Pages (4 total):**

1. `/locations/franklin` ← New
2. `/locations/brentwood` ← New
3. `/locations/murfreesboro` ← New
4. `/locations/hendersonville` ← New

### Existing Pages to Update

| Current Page      | Action                    | Priority |
| ----------------- | ------------------------- | -------- |
| Homepage (/)      | Enhance with new CTAs     | High     |
| About             | Update with trust signals | Medium   |
| Contact           | Optimize form             | High     |
| Old service pages | Redirect to new structure | High     |

### Pages to Keep As-Is

- Legal pages (Privacy, Terms)
- Thank you pages
- Blog posts (if any exist)

---

## Redirect Map

### Format

```
OLD_URL → NEW_URL [301 Permanent]
```

### Example Redirects

```
/services → /services/brake-repair (or services hub page)
/brake-service → /services/brake-repair
/diagnostics-old → /services/diagnostics
/franklin-mechanic → /locations/franklin
```

**Create full redirect map:** `docs/redirect-map.csv`

| Old URL | New URL | Redirect Type | Priority | Notes |
| ------- | ------- | ------------- | -------- | ----- |
|         |         | 301           |          |       |

### Implement Redirects in HubSpot

1. **Navigate to:** Settings → Website → Domains & URLs → URL Redirects
2. **Add each redirect:**
   - Original URL: `/old-page`
   - Redirect to: `/new-page`
   - Type: 301 (Permanent)
3. **Test each redirect** before launch

---

## Staging Environment Setup

### Staging URL Structure

**Option A:** HubSpot Sandbox (if available)

- Production: `mobilemechanicmusclenearme.com`
- Staging: Sandbox portal (preview URLs)

**Option B:** HubSpot Preview URLs

- Use HubSpot's built-in staging/preview

### Staging Deployment Process

```bash
# Switch to staging account
hs accounts use mmm-staging

# Upload new content
hs upload services/ services/
hs upload locations/ locations/

# Deploy templates
hs upload templates/ templates/

# Upload modules
hs upload modules/ modules/
```

### Client Review Process

1. **Share staging links** with client
2. **Request feedback** on:
   - Content accuracy
   - Design/layout
   - CTAs and forms
   - Mobile experience
3. **Iterate based on feedback**
4. **Get written approval** before production

---

## Schema Implementation

### New Schema Markup

Each page needs appropriate schema:

**Service Pages:**

- Service schema (use `service-schema-template.json`)
- Include pricing, availability, service area
- Embed in page `<head>` or via HubSpot module

**Neighborhood Pages:**

- LocalBusiness schema (use `localbusiness-schema-template.json`)
- Include geo-coordinates
- Area served specifications

**FAQ Sections:**

- FAQPage schema (use `faq-schema-template.json`)
- Add to relevant service pages

### Schema Validation

Before launch:

- [ ] Validate all schema at [validator.schema.org](https://validator.schema.org/)
- [ ] Test in [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verify no errors in schema markup

---

## Pre-Launch Checklist

### Technical Verification

- [ ] All new pages built in production
- [ ] Schema markup validated
- [ ] Redirects configured and tested
- [ ] Forms functional on new pages
- [ ] CTAs link to correct form/phone
- [ ] Mobile responsive on all pages
- [ ] Images optimized and loading
- [ ] Internal links working
- [ ] External links (if any) working
- [ ] No broken links (run Screaming Frog)

### SEO Verification

- [ ] Title tags unique and optimized
- [ ] Meta descriptions compelling
- [ ] H1/H2/H3 hierarchy correct
- [ ] Keywords naturally integrated
- [ ] Image alt text present
- [ ] Canonical tags set correctly
- [ ] robots.txt allows crawling
- [ ] sitemap.xml includes new pages

### Content Verification

- [ ] No typos or grammar errors
- [ ] Phone numbers correct
- [ ] Email addresses correct
- [ ] Service areas accurate
- [ ] Pricing info current (if shown)
- [ ] CTAs clear and compelling
- [ ] Trust signals present

### Client Sign-Off

- [ ] Client has reviewed all new pages
- [ ] Client approved content
- [ ] Client approved design/layout
- [ ] Client aware of launch timeline
- [ ] Client has access to staging for final review

---

## Launch Day Process

### Launch Steps (Production Deployment)

**Timing:** Ideally launch on Tuesday or Wednesday mid-morning (avoid Fridays/weekends)

1. **Pre-Launch (1 hour before):**

   ```bash
   # Final backup
   hs fetch / backups/pre-launch-$(date +%Y%m%d)/

   # Verify staging one last time
   hs accounts use mmm-staging
   # Test all critical paths
   ```

2. **Deploy to Production:**

   ```bash
   # Switch to production account
   hs accounts use mmm-production

   # Upload new pages
   hs upload services/ services/
   hs upload locations/ locations/

   # Upload updated templates
   hs upload templates/ templates/

   # Publish pages in HubSpot UI
   # (Set each page to "Published")
   ```

3. **Configure Redirects:**
   - Implement all redirects from redirect map
   - Test each redirect manually

4. **Submit New Sitemap:**
   - HubSpot auto-generates sitemap.xml
   - Submit to Google Search Console:
     - Go to Sitemaps section
     - Submit: `mobilemechanicmusclenearme.com/sitemap.xml`

5. **Verify Launch:**
   - [ ] All new pages live and accessible
   - [ ] Redirects working
   - [ ] Forms submitting correctly
   - [ ] Analytics tracking firing
   - [ ] No console errors
   - [ ] Mobile display correct

---

## Post-Launch Monitoring

### Week 1: Daily Checks

- [ ] Monitor Google Search Console for errors
- [ ] Check Analytics for traffic anomalies
- [ ] Verify form submissions working
- [ ] Review crawl errors
- [ ] Monitor page speed
- [ ] Check for broken links

### Week 2-4: Weekly Reviews

Track these metrics:

| Metric              | Pre-Launch | Week 1 | Week 2 | Week 3 | Week 4 |
| ------------------- | ---------- | ------ | ------ | ------ | ------ |
| Organic Sessions    |            |        |        |        |        |
| Conversion Rate     |            |        |        |        |        |
| Avg. Position (GSC) |            |        |        |        |        |
| Impressions         |            |        |        |        |        |
| CTR                 |            |        |        |        |        |

### Months 2-3: Performance Optimization

- Review which pages rank well
- Identify opportunities for further optimization
- Adjust content based on performance data
- Add more internal links to new pages
- Build backlinks to neighborhood pages

---

## Rollback Plan

If critical issues arise post-launch:

### Emergency Rollback Steps

1. **Unpublish new pages** in HubSpot
2. **Remove redirects** causing issues
3. **Restore backup content** from `backups/pre-launch-[DATE]/`
4. **Notify client** of rollback
5. **Diagnose issue** in staging
6. **Fix and re-launch** when resolved

### Rollback Scenarios

| Issue               | Response                    | Action                      |
| ------------------- | --------------------------- | --------------------------- |
| Traffic drops >50%  | Immediate rollback          | Investigate redirect issues |
| Forms not working   | Leave pages, fix forms      | Update form embed code      |
| Schema errors       | Leave pages, fix schema     | Re-validate and update      |
| Major design issues | Rollback if client requests | Fix in staging, redeploy    |

---

## Migration Risk Assessment

### High Risk Items

- **Redirects:** Misconfigured redirects can tank traffic
  - **Mitigation:** Test all redirects before launch
- **Schema Errors:** Invalid schema can hurt rich results
  - **Mitigation:** Validate all schema pre-launch

### Medium Risk Items

- **Content Quality:** New content may underperform initially
  - **Mitigation:** Use existing high-performing pages as models
- **Forms:** Form breaks = lost leads
  - **Mitigation:** Test forms thoroughly in staging

### Low Risk Items

- **Design Changes:** Minor visual updates
- **Internal Links:** Easy to fix post-launch

---

## Success Criteria

Migration is considered successful when:

- [ ] All new pages indexed by Google (1-2 weeks)
- [ ] No drop in organic traffic (30 days)
- [ ] Conversion rate maintained or improved
- [ ] All schema markup validated
- [ ] Client satisfied with new pages
- [ ] Page speed improved or maintained
- [ ] Mobile usability score 90+

---

## Post-Migration Deliverables

### For Client

1. **Migration Report:**
   - Before/after metrics
   - New pages created
   - SEO improvements made
   - Next steps recommendations

2. **Training Materials:**
   - How to edit new pages in HubSpot
   - How to track performance
   - When to contact for support

3. **Performance Dashboard:**
   - Set up Google Analytics dashboard
   - Configure weekly email reports

---

## Timeline Summary

```
Week 1:  Audit + Content Generation + Client Review
Week 2:  Staging Build + Testing
Week 3:  Final QA + Client Approval + Pre-Launch Prep
Week 4:  Launch + Monitoring
Week 5-8: Performance tracking + optimization
```

---

## Key Contacts & Resources

**Project Lead:** ******\_******  
**HubSpot Support:** support@hubspot.com  
**Emergency Contact:** ******\_******

**Documentation:**

- [HubSpot Connection Guide](hubspot-connection.md)
- [Audit Checklist](audit-checklist.md)
- [Value Comparison Chart](value-comparison.md)

---

## Migration Log

Use this section to track actual migration events:

| Date | Action | Performed By | Status | Notes |
| ---- | ------ | ------------ | ------ | ----- |
|      |        |              |        |       |
