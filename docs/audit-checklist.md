# Existing Website Audit Checklist

## Overview

Complete this audit before beginning development work. This ensures you understand the current site structure and can plan an effective migration.

---

## 1. Site Structure Audit

### Page Inventory

| Page Name | URL       | Template | Word Count | Meta Description | Keywords | Priority |
| --------- | --------- | -------- | ---------- | ---------------- | -------- | -------- |
| Home      | /         |          |            |                  |          | High     |
| Services  | /services |          |            |                  |          | High     |
| About     | /about    |          |            |                  |          | Medium   |
| Contact   | /contact  |          |            |                  |          | High     |

**Action Items:**

- [ ] Export complete page list from HubSpot
- [ ] Document URL structure and patterns
- [ ] Identify orphan pages (no inbound links)
- [ ] Note duplicate content issues

### Navigation Analysis

```
Primary Navigation:
- [ ] Item 1: _______________ (links to: _______)
- [ ] Item 2: _______________ (links to: _______)
- [ ] Item 3: _______________ (links to: _______)

Footer Navigation:
- [ ] Legal pages documented
- [ ] Service links documented
- [ ] Contact links documented
```

---

## 2. Content Audit

### Service Pages

For each existing service page, document:

| Service Page    | Exists? | Word Count | Has CTA? | Schema Present? | Grade (A-F) |
| --------------- | ------- | ---------- | -------- | --------------- | ----------- |
| Brake Repair    |         |            |          |                 |             |
| Diagnostics     |         |            |          |                 |             |
| Battery Service |         |            |          |                 |             |
| Cooling System  |         |            |          |                 |             |
| Suspension      |         |            |          |                 |             |
| Pre-Purchase    |         |            |          |                 |             |
| Roadside        |         |            |          |                 |             |

**Content Quality Checklist:**

- [ ] Professional tone maintained?
- [ ] Clear call-to-action present?
- [ ] Mobile-friendly content structure?
- [ ] Local keywords used naturally?
- [ ] Contact info easy to find?

### Location Pages

| Location Page  | Exists? | Geo-Optimized? | Local Landmarks? | Grade (A-F) |
| -------------- | ------- | -------------- | ---------------- | ----------- |
| Franklin       |         |                |                  |             |
| Brentwood      |         |                |                  |             |
| Murfreesboro   |         |                |                  |             |
| Hendersonville |         |                |                  |             |

---

## 3. Technical SEO Audit

### On-Page SEO

Run each page through this checklist:

**Title Tags:**

- [ ] Unique titles on all pages?
- [ ] Include target keywords?
- [ ] Under 60 characters?
- [ ] Brand name included?

**Meta Descriptions:**

- [ ] Present on all pages?
- [ ] Compelling and actionable?
- [ ] 150-160 characters?
- [ ] Include keywords naturally?

**Heading Structure:**

- [ ] Single H1 per page?
- [ ] Logical H2/H3 hierarchy?
- [ ] Keywords in headings?

**URLs:**

- [ ] Clean, readable URLs?
- [ ] Keywords in URL slug?
- [ ] No unnecessary parameters?
- [ ] Consistent pattern?

### Schema Markup

Check for existing structured data:

- [ ] LocalBusiness schema present?
- [ ] Service schema on service pages?
- [ ] FAQ schema where applicable?
- [ ] Organization schema?
- [ ] Validate at [schema.org validator](https://validator.schema.org/)

**Current Schema Grade:** **\_\_\_**

---

## 4. Performance Audit

### Page Speed Analysis

Use [Google PageSpeed Insights](https://pagespeed.web.dev/):

| Page     | Mobile Score | Desktop Score | LCP | FID | CLS | Issues |
| -------- | ------------ | ------------- | --- | --- | --- | ------ |
| Home     |              |               |     |     |     |        |
| Services |              |               |     |     |     |        |

**Common Performance Issues:**

- [ ] Large unoptimized images
- [ ] Excessive JavaScript
- [ ] No lazy loading
- [ ] Render-blocking resources
- [ ] No caching headers

### Mobile Responsiveness

- [ ] Site passes [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [ ] Navigation usable on mobile?
- [ ] CTAs easily tappable?
- [ ] No horizontal scrolling?
- [ ] Font sizes readable?

---

## 5. Current SEO Performance

### Organic Traffic (Google Analytics)

Document baseline metrics (last 90 days):

- **Total Organic Sessions:** **\_\_\_**
- **Top Landing Pages:**
  1. ******\_****** (sessions: \_\_\_)
  2. ******\_****** (sessions: \_\_\_)
  3. ******\_****** (sessions: \_\_\_)

- **Conversion Rate:** **\_\_\_**
- **Bounce Rate:** **\_\_\_**
- **Avg. Session Duration:** **\_\_\_**

### Keyword Rankings (Google Search Console)

Export top 20 keywords:

| Keyword | Impressions | Clicks | CTR | Avg. Position |
| ------- | ----------- | ------ | --- | ------------- |
|         |             |        |     |               |

**Ranking Analysis:**

- [ ] #1-3 positions: \_\_\_ keywords
- [ ] #4-10 positions: \_\_\_ keywords
- [ ] #11-20 positions: \_\_\_ keywords

### Backlink Profile (Optional)

Use Ahrefs/SEMrush/Moz if available:

- **Total Backlinks:** **\_\_\_**
- **Referring Domains:** **\_\_\_**
- **Domain Authority:** **\_\_\_**
- **Top Linking Sites:**
  1. ***
  2. ***
  3. ***

---

## 6. Design & UX Audit

### Visual Design

- [ ] Consistent branding?
- [ ] Professional appearance?
- [ ] Clear visual hierarchy?
- [ ] High-quality images?
- [ ] Color contrast meets WCAG standards?

### User Experience

- [ ] Clear value proposition on homepage?
- [ ] Easy to find contact information?
- [ ] Forms simple and functional?
- [ ] Trust signals present (certifications, reviews)?
- [ ] Logical information architecture?

### Call-to-Actions

Document all CTAs:

| Page | CTA Text | CTA Type         | Placement | Effective? |
| ---- | -------- | ---------------- | --------- | ---------- |
|      |          | Button/Link/Form |           | Yes/No     |

**CTA Analysis:**

- [ ] CTAs above the fold?
- [ ] Action-oriented language?
- [ ] Sufficient contrast/visibility?
- [ ] Multiple paths to conversion?

---

## 7. Content Gaps Analysis

### Missing Service Pages

Compare existing pages to PRD requirements:

- [ ] All 7 core services covered?
- [ ] All 4 neighborhoods covered?
- [ ] Service-to-location cross-links present?
- [ ] FAQ sections on service pages?

### Missing Content Elements

- [ ] Customer testimonials/reviews
- [ ] Service area map
- [ ] Pricing information (ranges)
- [ ] Process/how-it-works sections
- [ ] Before/after examples
- [ ] Team/about information

---

## 8. Competitive Analysis

### Top 3 Competitors

Research local competitors ranking for target keywords:

#### Competitor 1: ********\_********

- **URL:** ******\_******
- **Strengths:** ******\_******
- **Weaknesses:** ******\_******
- **Content Volume:** ******\_******
- **Schema Implementation:** ******\_******

#### Competitor 2: ********\_********

- **URL:** ******\_******
- **Strengths:** ******\_******
- **Weaknesses:** ******\_******

#### Competitor 3: ********\_********

- **URL:** ******\_******
- **Strengths:** ******\_******
- **Weaknesses:** ******\_******

**Competitive Advantages to Leverage:**

1. ***
2. ***
3. ***

---

## 9. HubSpot Specific Audit

### Template Analysis

- [ ] Document current templates in use
- [ ] Identify custom modules
- [ ] Check for deprecated HubL code
- [ ] Review template structure (drag-drop vs. coded)

**Current Templates:**

1. ***
2. ***
3. ***

### HubSpot Tools Usage

- [ ] Forms: \_\_\_ active forms documented
- [ ] CTAs: \_\_\_ CTAs documented
- [ ] Blog: Active? \_\_\_ posts total
- [ ] Workflows: Any automated actions?
- [ ] Smart content: In use?

### Settings Review

- [ ] Domain settings correct?
- [ ] SSL certificate active?
- [ ] Redirects documented?
- [ ] 404 page customized?
- [ ] robots.txt reviewed?
- [ ] sitemap.xml generated?

---

## 10. Audit Summary & Recommendations

### Critical Issues (Fix Immediately)

1. ***
2. ***
3. ***

### High Priority Improvements

1. ***
2. ***
3. ***

### Medium Priority Enhancements

1. ***
2. ***

### Low Priority (Nice to Have)

1. ***
2. ***

---

## 11. Baseline Metrics Summary

Record these for before/after comparison:

| Metric                 | Current Value | Target After Migration |
| ---------------------- | ------------- | ---------------------- |
| Organic Sessions/mo    |               | +30%                   |
| Conversion Rate        |               | +20%                   |
| Avg. Page Load Time    |               | <3s                    |
| Pages Indexed          |               | +11 (new pages)        |
| Keywords Ranking #1-10 |               | +15                    |
| Mobile Usability Score |               | 95+                    |
| Schema Implementation  |               | 100%                   |

---

## Audit Completion Checklist

- [ ] All sections above completed
- [ ] Screenshots taken of key pages
- [ ] Analytics data exported
- [ ] Competitive research documented
- [ ] Content inventory spreadsheet created
- [ ] Technical issues documented
- [ ] Recommendations prioritized
- [ ] Audit report compiled for client review

---

## Next Steps After Audit

1. Present audit findings to client
2. Prioritize improvements based on impact/effort
3. Finalize migration plan
4. Begin staging environment setup
5. Start content generation for new pages

---

## Tools Used

- [ ] Google Analytics
- [ ] Google Search Console
- [ ] Google PageSpeed Insights
- [ ] HubSpot Analytics
- [ ] Screaming Frog (optional)
- [ ] Ahrefs/SEMrush (optional)
- [ ] Schema.org validator

**Audit Completed By:** ******\_******  
**Date:** ******\_******  
**Review Date:** ******\_******
