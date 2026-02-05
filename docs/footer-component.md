# Footer Component

## Overview

All pages now use a comprehensive footer component instead of just an `<hr>` tag.

## What's Included

### Footer Sections

1. **Company Info**
   - Mobile Mechanic Muscle branding
   - Brief description of services

2. **Quick Links**
   - Services
   - About Us
   - Gallery
   - Contact

3. **Service Areas**
   - Nashville
   - Franklin
   - Brentwood
   - Murfreesboro
   - Hendersonville

4. **Contact Information**
   - Phone: (615) 496-3900
   - Email: mms.alwayshonest@gmail.com
   - Hours: Mon-Sat 6AM-4PM

### Footer Bottom

- Copyright notice
- Service area mention

## Design Features

- **Dark Theme**: Background #2B394B (matches site brand)
- **Teal Accents**: Headings and links use #30beb4
- **4-Column Grid**: Responsive layout (stacks on mobile)
- **Hover Effects**: Links highlight on hover
- **Mobile Responsive**: Single column on smaller screens

## Implementation

The footer is built directly into the template at [src/templates/simple-content-page.html](../src/templates/simple-content-page.html).

### Template Structure

```html
<footer class="footer">
  <div class="footer-content">
    <div class="footer-grid">
      <!-- 4 columns -->
    </div>
    <div class="footer-bottom">
      <!-- Copyright -->
    </div>
  </div>
</footer>
```

### Styling

All footer styles are included in the template `<style>` block for easy deployment via API.

## Updates

To update the footer across all pages:

1. Edit [src/templates/simple-content-page.html](../src/templates/simple-content-page.html)
2. Upload template: `hs upload src/templates/simple-content-page.html draft-templates/simple-content-page.html`
3. Deploy changes: `npm run deploy`

All 12 pages will be updated automatically.

## Current Status

✅ **Deployed**: All 12 pages now have the new footer  
✅ **Consistent**: Same footer on all service and location pages  
✅ **Branded**: Matches site color scheme and typography  
✅ **Functional**: Internal links, phone/email links, service area links

## Preview

Visit any of these pages to see the footer:

- https://mobilemechanicmusclenearme.com/services/brake-repair
- https://mobilemechanicmusclenearme.com/locations/nashville
