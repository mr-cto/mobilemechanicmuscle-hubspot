# HubSpot CSS & HTML Reference Guide

## Overview

This document defines the CSS classes and HTML structure patterns to use when generating content for mobilemechanicmusclenearme.com. All generated HTML must use these existing classes to ensure zero design drift.

---

## Layout Classes

### Container Classes

- `.container` - Main content wrapper (max-width: 1200px, centered)
- `.container-fluid` - Full-width container
- `.row` - Flexbox row wrapper
- `.col-*` - Column classes (follows Bootstrap grid system)

---

## Component Classes

### Hero Sections

```html
<section class="hero-section">
  <div class="hero-text">
    <h1>Hero Headline</h1>
    <p class="hero-subhead">Supporting copy</p>
    <a href="#quote-form" class="cta-button">Call to Action</a>
  </div>
</section>
```

**Class Definitions:**

- `.hero-section` - Full-width hero area with background image/gradient
- `.hero-text` - Content wrapper within hero (centered, max-width)
- `.hero-subhead` - Larger subheadline text below H1

**Variants:**

- `.hero-local` - Modified hero for neighborhood pages (slightly different styling)

---

### CTA Buttons

```html
<a href="#quote-form" class="cta-button">Get Your Free Quote</a>
<a href="tel:[PHONE]" class="cta-button cta-secondary">Call Now</a>
```

**Class Definitions:**

- `.cta-button` - Primary action button (brand color background, white text)
- `.cta-secondary` - Secondary button (outline style)
- `.cta-small` - Smaller button variant

**Usage Rules:**

- Always link to `#quote-form` or `tel:[PHONE]`
- Use verb-first copy ("Get", "Schedule", "Call")
- One primary CTA per section maximum

---

### Service Cards

```html
<div class="service-card">
  <div class="service-icon">
    <img src="[ICON_URL]" alt="[SERVICE_NAME]" />
  </div>
  <h3>[Service Name]</h3>
  <p>[Brief service description]</p>
  <a href="[SERVICE_PAGE_URL]" class="card-link">Learn More →</a>
</div>
```

**Class Definitions:**

- `.service-card` - Card container with shadow and hover effect
- `.service-icon` - Icon wrapper (fixed size, centered)
- `.card-link` - Text link at bottom of card

**Layout:**

- Typically used in grids: 3 cards per row on desktop, 1 on mobile
- Wrap in `.service-grid` container

---

### Content Sections

```html
<section class="content-section">
  <div class="container">
    <h2>Section Headline</h2>
    <p>Body copy goes here...</p>
  </div>
</section>
```

**Class Definitions:**

- `.content-section` - Standard section padding (80px top/bottom on desktop)
- `.content-section-alt` - Alternate background color for visual breaks

**Typography:**

- Use semantic HTML: `<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`
- No need for extra classes on typography elements

---

### Testimonial Blocks

```html
<div class="testimonial-block">
  <blockquote>
    <p>"[Customer quote]"</p>
    <cite>— [Customer Name], [Location]</cite>
  </blockquote>
</div>
```

**Class Definitions:**

- `.testimonial-block` - Styled quote container
- Use `<blockquote>` and `<cite>` for proper semantics

---

### List Styles

```html
<ul class="checklist">
  <li>List item with checkmark icon</li>
  <li>Another benefit</li>
</ul>

<ul class="icon-list">
  <li><span class="icon">✓</span> Custom icon list</li>
</ul>
```

**Class Definitions:**

- `.checklist` - Unordered list with checkmark bullets
- `.icon-list` - List with custom icon support
- `.process-list` - Numbered list with larger numbers

---

### Call-Out Boxes

```html
<div class="callout-box">
  <h3>Important Information</h3>
  <p>Highlighted content goes here</p>
</div>
```

**Class Definitions:**

- `.callout-box` - Bordered box for emphasis
- `.callout-warning` - Yellow/orange variant for urgent info
- `.callout-success` - Green variant for positive info

---

## Utility Classes

### Spacing

- `.mb-20` - Margin bottom 20px
- `.mt-20` - Margin top 20px
- `.py-40` - Padding top/bottom 40px
- `.px-20` - Padding left/right 20px

Increments: 10, 20, 30, 40, 50, 60, 80

### Text Alignment

- `.text-center` - Center align text
- `.text-left` - Left align text
- `.text-right` - Right align text

### Visibility

- `.mobile-only` - Only visible on mobile devices
- `.desktop-only` - Only visible on desktop

---

## Form Integration

```html
<div id="quote-form">
  <!-- HubSpot form embed goes here -->
  <!-- Do NOT generate form HTML, use HubSpot form ID -->
</div>
```

**Important:**

- Never generate form HTML
- Reference the form anchor: `#quote-form`
- HubSpot forms are embedded via script in the CMS

---

## HTML Structure Rules

1. **Semantic HTML Required**
   - Use `<section>`, `<article>`, `<header>`, `<nav>` appropriately
   - Don't use `<div>` when a semantic element exists

2. **Section Hierarchy**

   ```html
   <section class="content-section">
     <div class="container">
       <h2>Section Title</h2>
       <div class="row">
         <div class="col-md-6">
           <!-- Content -->
         </div>
       </div>
     </div>
   </section>
   ```

3. **Never Use**
   - Inline styles
   - `<br>` for spacing (use margin utilities instead)
   - Empty divs for spacing
   - `<span>` as a wrapper (use semantic elements)

4. **Always Include**
   - Alt text on all images
   - Proper heading hierarchy (don't skip levels)
   - Descriptive link text (no "click here")

---

## Mobile Considerations

- All sections stack vertically on mobile
- `.service-grid` becomes single column
- Hero text increases in size on mobile (responsive)
- CTAs are full-width on mobile

---

## Color Palette (for reference)

**Primary Colors:**

- Brand Blue: `#0066CC` (primary CTA)
- Dark Blue: `#003D7A` (headings)

**Secondary Colors:**

- Orange: `#FF6B35` (accent, secondary CTAs)
- Gray: `#4A5568` (body text)
- Light Gray: `#F7FAFC` (backgrounds)

**Usage:**

- You don't need to specify colors in HTML
- Classes handle all styling
- Reference for understanding brand

---

## Examples by Page Type

### Service Page Structure

```html
<section class="hero-section">...</section>
<section class="content-section">
  <div class="container">
    <!-- Problem/solution content -->
  </div>
</section>
<section class="content-section content-section-alt">
  <div class="container">
    <!-- How it works -->
  </div>
</section>
<section class="content-section">
  <div class="service-grid">
    <!-- Why choose us cards -->
  </div>
</section>
<section class="cta-section">...</section>
```

### Neighborhood Page Structure

```html
<section class="hero-section hero-local">...</section>
<section class="content-section">
  <div class="container">
    <!-- Local context -->
  </div>
</section>
<section class="content-section">
  <div class="service-grid">
    <!-- Services offered -->
  </div>
</section>
<section class="content-section content-section-alt">
  <!-- Testimonial -->
</section>
<section class="cta-section">...</section>
```

---

## Quality Checklist

Before finalizing generated HTML:

- [ ] All classes match this reference guide
- [ ] No inline styles present
- [ ] Semantic HTML used throughout
- [ ] Mobile-responsive class structure
- [ ] CTA placed every ~300 words
- [ ] All images have alt text
- [ ] Links have descriptive text
- [ ] Heading hierarchy is correct (H1 → H2 → H3)
