# Neighborhood Landing Page Generation Prompt

## Task

Generate a hyper-local landing page for: **[NEIGHBORHOOD_NAME]**

## Input Variables

- `NEIGHBORHOOD_NAME`: Name of area (e.g., "Franklin", "Brentwood")
- `COUNTY`: County name
- `ZIP_CODES`: Array of relevant zip codes
- `LANDMARKS`: Array of local landmarks/intersections
- `POPULATION`: Approximate population (for context)

## Output Requirements

### 1. Hero Section

```html
<section class="hero-section hero-local">
  <div class="hero-text">
    <h1>Mobile Mechanic in [NEIGHBORHOOD] | [TAGLINE]</h1>
    <p class="hero-subhead">
      Professional Mechanics Serving [Neighborhood] Residents Since [YEAR]
    </p>
    <a href="#quote-form" class="cta-button">Get Your Free Quote</a>
  </div>
</section>
```

### 2. Local Context Section

- H2: "Why [Neighborhood] Drivers Choose Mobile Mechanic Muscle"
- Mention specific local challenges (traffic, commute times, etc.)
- Reference 2-3 landmarks or major intersections naturally
- Example: "Whether you're off Cool Springs Blvd or near Aspen Grove, we come to you"

### 3. Services Overview

- H2: "Complete Auto Services in [Neighborhood]"
- Grid of 6-7 services with `.service-card`
- Link each to the corresponding service page

### 4. Convenience Factor

- H2: "Skip the Traffic, Skip the Wait"
- Emphasize avoiding I-65/I-24 traffic
- Highlight at-home/at-work service
- Include testimonial if available

### 5. Service Area Map Reference

- Brief mention of coverage area
- "We serve all of [Neighborhood] including [list 3-4 specific areas/subdivisions]"

### 6. Trust Signals

- Years in business
- Experienced Technicians
- Warranty details
- Same-day availability mention

### 7. Final CTA Section

```html
<section class="cta-section">
  <h2>Schedule Your Mobile Repair in [Neighborhood]</h2>
  <p>Call now or request your free quote online</p>
  <a href="#quote-form" class="cta-button">Get Started</a>
</section>
```

### 8. JSON-LD Schema

Include LocalBusiness schema with:

- Business name
- Service area (specific to this neighborhood)
- Address type: ServiceArea
- GeoCircle with coordinates
- Services offered

## Geographic Specificity Rules

- Must mention the neighborhood name 8-12 times naturally
- Include 3+ local landmarks or intersections
- Reference county name at least once
- Mention at least 2 nearby neighborhoods

## Word Count Target

600-900 words

## CTA Placement

- Hero: 0 words
- First CTA: ~300 words
- Final CTA: End

## Target Neighborhoods

1. **Franklin** (Williamson County)
   - Landmarks: Cool Springs, Downtown Franklin, Aspen Grove
   - Major roads: I-65, Hwy 96, Mack Hatcher Pkwy
2. **Brentwood** (Williamson County)
   - Landmarks: Maryland Farms, Brentwood Library, Hill Center
   - Major roads: I-65, Old Hickory Blvd, Concord Rd

3. **Murfreesboro** (Rutherford County)
   - Landmarks: MTSU, The Avenue, Medical Center Pkwy
   - Major roads: I-24, Old Fort Pkwy, Broad St

4. **Hendersonville** (Sumner County)
   - Landmarks: Rockland Rec Center, Drakes Creek Park, Indian Lake
   - Major roads: Vietnam Veterans Blvd, New Shackle Island Rd
