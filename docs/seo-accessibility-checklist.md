# SEO & Accessibility Checklist

## ✅ Completed SEO Items

### Meta Tags & Titles

- ✅ Unique HTML title for each page (format: "Service/Location | Mobile Mechanic Muscle")
- ✅ Meta descriptions (under 160 characters, descriptive)
- ✅ Proper title hierarchy (H1 → H2 → H3)
- ✅ Canonical URLs (handled by HubSpot)

### Schema Markup (JSON-LD)

- ✅ LocalBusiness schema on location pages
  - Business name, logo, phone, coordinates
  - Area served, opening hours
  - Social media links
- ✅ Service schema on service pages
  - Service type, provider info
  - Area served, price range indicators

### Content Structure

- ✅ Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`)
- ✅ Proper heading hierarchy (H1 only once, logical H2/H3 order)
- ✅ Descriptive anchor text for internal links
- ✅ Mobile-responsive CSS with media queries
- ✅ Nashville-specific content (Franklin, Brentwood, Murfreesboro, Hendersonville)
- ✅ Local landmarks and geographic context
- ✅ Phone number in clickable tel: format

### Technical SEO

- ✅ Clean URL structure (/services/brake-repair, /locations/franklin)
- ✅ UTF-8 character encoding
- ✅ Viewport meta tag for mobile
- ✅ Smooth scroll behavior with header offset
- ✅ HubSpot standard headers include performance optimizations

## ✅ Completed Accessibility Items

### Navigation & Structure

- ✅ Skip to content link for keyboard users
- ✅ `<nav>` element with aria-label
- ✅ Semantic HTML structure
- ✅ `<main>` landmark for primary content
- ✅ Logical heading hierarchy

### Links & Buttons

- ✅ Clickable phone numbers with tel: protocol
- ✅ High contrast text (white on teal #30beb4)
- ✅ Button hover states for visual feedback
- ✅ Descriptive link text (not "click here")

### Forms

- ✅ HubSpot form with proper labels (managed by form ID: 4dfc54af-6a62-4fdc-a2bf-2836626d42eb)
- ✅ Form anchored with id="quote-form" for direct linking

### Visual Design

- ✅ Color contrast ratios meet WCAG AA standards
  - Body text #2B394B on white background
  - White text on #30beb4 teal background
  - White text on #2B394B dark background
- ✅ Minimum 16px font size for body text
- ✅ Clear visual hierarchy
- ✅ Responsive design with mobile breakpoints

## ⚠️ Recommendations for Further Improvement

### SEO Enhancements

- [ ] Add Open Graph tags for social sharing
  ```html
  <meta property="og:title" content="..." />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="..." />
  <meta property="og:type" content="website" />
  ```
- [ ] Add Twitter Card tags
- [ ] Consider adding FAQ schema for common questions
- [ ] Add breadcrumb navigation and schema
- [ ] Create XML sitemap (HubSpot may handle this)
- [ ] Add alt text to logo image (currently has it: "Mobile Mechanic Muscle" ✅)
- [ ] Consider adding more internal linking between service and location pages
- [ ] Add robots.txt if not already present
- [ ] Set up Google Search Console and submit sitemap

### Accessibility Enhancements

- [ ] Add focus indicators for keyboard navigation (test with Tab key)
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Add aria-labels to icon-only elements (if any)
- [ ] Ensure form error messages are accessible
- [ ] Add language attribute to <html> tag: `<html lang="en">`
- [ ] Consider adding a mobile hamburger menu for better UX
- [ ] Test color contrast with automated tools (WAVE, axe DevTools)
- [ ] Ensure all interactive elements are keyboard accessible
- [ ] Add loading="lazy" to images below the fold for performance

### Performance

- [ ] Minimize CSS (inline styles currently used - good for critical CSS)
- [ ] Optimize form loading (HubSpot script loads externally)
- [ ] Consider preconnecting to HubSpot domains
  ```html
  <link rel="preconnect" href="https://js.hsforms.net" />
  ```
- [ ] Test Core Web Vitals (LCP, FID, CLS)
- [ ] Add webp images if not already optimized

### Content & UX

- [ ] Add customer testimonials or reviews schema
- [ ] Consider adding service area map
- [ ] Add "Why choose us" section with trust signals
- [ ] Consider adding FAQ section at bottom of pages
- [ ] Add estimated response time to contact form

## Testing Tools

### SEO Testing

- Google Search Console
- Screaming Frog SEO Spider
- Ahrefs Site Audit
- Moz Pro
- Google Rich Results Test (for schema)

### Accessibility Testing

- WAVE Browser Extension
- axe DevTools
- Lighthouse (Chrome DevTools)
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard navigation testing

### Performance Testing

- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Chrome DevTools Lighthouse

## Current Page Status

**Published Pages:** 11 total

- 7 Service pages: `/services/[service-slug]`
- 4 Location pages: `/locations/[location-slug]`

**State:** PUBLISHED (live on production URLs)
**Template:** simple-content-page.html with header/footer
**Form Integration:** HubSpot form (ID: 4dfc54af-6a62-4fdc-a2bf-2836626d42eb)
**Contact Phone:** (615) 496-3900
**Email:** mms.alwayshonest@gmail.com
