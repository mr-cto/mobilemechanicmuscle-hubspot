# JSON-LD Schema Implementation

## Status: ✅ FULLY IMPLEMENTED

All service and location pages now include comprehensive JSON-LD structured data for SEO.

## What's Implemented

### Service Pages (7 pages)

**Schema Type:** `Service`

**Includes:**

- ✅ Service name and description
- ✅ Provider info (AutomotiveBusiness type)
- ✅ Contact details (phone, email)
- ✅ Physical address (Nashville base)
- ✅ GeoCircle area served (Nashville + 25 miles)
- ✅ Offer catalog with service details
- ✅ Opening hours (Mon-Fri 8AM-6PM, Sat 9AM-3PM)
- ✅ Price range ($$)

**Example Schema:**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Brake Repair",
  "description": "Professional brake repair service...",
  "provider": {
    "@type": "AutomotiveBusiness",
    "name": "Mobile Mechanic Muscle",
    "url": "https://mobilemechanicmusclenearme.com",
    "telephone": "(615) 496-3900",
    "email": "mms.alwayshonest@gmail.com",
    "address": { ... }
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "latitude": "36.1627",
      "longitude": "-86.7816"
    },
    "geoRadius": "25 miles"
  },
  "hasOfferCatalog": { ... },
  "openingHoursSpecification": [ ... ]
}
```

### Location Pages (5 pages)

**Schema Type:** `AutomotiveBusiness` (subtype of LocalBusiness)

**Includes:**

- ✅ Business name and alternate name
- ✅ Location-specific URL
- ✅ Contact details (phone, email)
- ✅ Location-specific address with ZIP
- ✅ Precise GeoCoordinates for each location
- ✅ Area served (city + Nashville)
- ✅ Complete offer catalog (all 7 services)
- ✅ Opening hours
- ✅ Payment methods accepted
- ✅ Social media links (Facebook, Instagram)
- ✅ Price range ($$)

**Example Schema:**

```json
{
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "@id": "https://mobilemechanicmusclenearme.com",
  "name": "Mobile Mechanic Muscle",
  "url": "https://mobilemechanicmusclenearme.com/locations/nashville",
  "telephone": "(615) 496-3900",
  "email": "mms.alwayshonest@gmail.com",
  "description": "Professional mobile mechanic serving Nashville...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Nashville",
    "addressRegion": "TN",
    "postalCode": "37201",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "36.1627",
    "longitude": "-86.7816"
  },
  "areaServed": [
    { "@type": "City", "name": "Nashville" },
    { "@type": "City", "name": "Nashville" }
  ],
  "hasOfferCatalog": {
    "itemListElement": [
      // All 7 services listed
    ]
  },
  "openingHoursSpecification": [ ... ],
  "sameAs": [ ... ]
}
```

## Schema Location in HTML

Each page includes the schema at the bottom of the content, just before the closing tags:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    ...schema data...
  }
</script>
```

## SEO Benefits

### For Service Pages:

- ✅ Google understands what service you offer
- ✅ Service appears in local search results
- ✅ Rich snippets may show service details
- ✅ Area coverage is clear to search engines

### For Location Pages:

- ✅ Local business listings in Google
- ✅ Google Maps integration potential
- ✅ Shows in "near me" searches
- ✅ Complete service catalog visible to Google
- ✅ Operating hours displayed
- ✅ Contact info easily indexed

## Validation

### Test Your Schemas

1. **Google Rich Results Test**
   - Visit: https://search.google.com/test/rich-results
   - Enter page URL (e.g., `mobilemechanicmusclenearme.com/services/brake-repair`)
   - Verify: Should show valid Service schema

2. **Schema Markup Validator**
   - Visit: https://validator.schema.org/
   - Paste page URL or schema JSON
   - Check for errors/warnings

3. **View on Live Pages**
   ```bash
   # Check any page source:
   curl https://mobilemechanicmusclenearme.com/services/brake-repair | grep -A 50 'application/ld+json'
   ```

## Files Modified

- ✅ [scripts/lib/ServiceContentGenerator.js](../scripts/lib/ServiceContentGenerator.js) - Enhanced service schema
- ✅ [scripts/lib/LocationContentGenerator.js](../scripts/lib/LocationContentGenerator.js) - Enhanced location schema

## Template Files (Reference)

- 📋 [schemas/service-schema-template.json](../schemas/service-schema-template.json) - Service schema template
- 📋 [schemas/localbusiness-schema-template.json](../schemas/localbusiness-schema-template.json) - Location schema template
- 📋 [schemas/faq-schema-template.json](../schemas/faq-schema-template.json) - FAQ schema (not yet implemented)

## Deployment Status

**Last Updated:** All 12 pages deployed with enhanced schemas

| Page Type      | Count | Schema Status |
| -------------- | ----- | ------------- |
| Service Pages  | 7     | ✅ Deployed   |
| Location Pages | 5     | ✅ Deployed   |

## What's Different from Templates

The templates in `/schemas/` had placeholders. Current implementation:

**Service Pages:**

- ❌ No aggregateRating (need real review data)
- ✅ All other fields implemented with real data

**Location Pages:**

- ❌ No aggregateRating (need real review data)
- ✅ All other fields implemented with real data
- ✅ All 7 services in offer catalog

## Future Enhancements

### When You Have Reviews:

Add aggregateRating to both schemas:

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "47"
}
```

### When You Have Photos:

Add image galleries:

```json
"image": [
  "https://...photo1.jpg",
  "https://...photo2.jpg"
]
```

### FAQ Schema:

Implement FAQ schema from [schemas/faq-schema-template.json](../schemas/faq-schema-template.json) for better SERP features.

## Testing Results

✅ **Valid JSON:** All schemas parse correctly  
✅ **Required Fields:** All required Schema.org fields present  
✅ **Type Correctness:** Using correct types (AutomotiveBusiness, Service)  
✅ **Geo Data:** Accurate coordinates for all locations  
✅ **Contact Info:** Real phone/email on all pages

## Summary

Your pages now have **comprehensive, SEO-optimized JSON-LD schemas** that match or exceed the template requirements. This helps Google understand your business, services, and service areas, leading to better local search visibility and potential rich results.

**All schemas are live on production pages right now.** 🎉
