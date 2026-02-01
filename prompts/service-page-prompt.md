# Service Page Generation Prompt

## Task

Generate a complete service page for: **[SERVICE_NAME]**

## Input Variables

- `SERVICE_NAME`: Name of the service (e.g., "Brake Repair", "Diagnostics")
- `SERVICE_SLUG`: URL slug (e.g., "brake-repair", "diagnostics")
- `PRIMARY_KEYWORD`: Main SEO keyword
- `SECONDARY_KEYWORDS`: Array of related keywords

## Output Requirements

### 1. Hero Section

```html
<section class="hero-section">
  <div class="hero-text">
    <h1>[Keyword-Optimized Headline]</h1>
    <p class="hero-subhead">
      [Compelling subheadline emphasizing mobile convenience]
    </p>
    <a href="#quote-form" class="cta-button">Get Your Free Quote</a>
  </div>
</section>
```

### 2. Problem/Solution Section

- H2: What problem does this service solve?
- 2-3 paragraphs: Describe common symptoms, urgency, consequences of delay
- Include first CTA

### 3. Service Details Section

- H2: "How Our [SERVICE] Works"
- 4-6 bullet points or numbered steps
- Emphasize: We come to you, transparent pricing, ASE-certified techs

### 4. Why Choose Mobile Section

- H2: "Why Choose Mobile Mechanic Muscle?"
- 3-4 service cards using `.service-card` class
- Points: Convenience, Expertise, Fair Pricing, Warranty

### 5. Service Area Mention

- Brief paragraph mentioning Nashville service area
- Include: Franklin, Brentwood, Murfreesboro, Hendersonville
- Natural keyword integration

### 6. FAQ Section (Optional)

- 3-5 common questions about the service
- Include pricing ranges if applicable

### 7. Final CTA Section

```html
<section class="cta-section">
  <h2>Ready to Get Back on the Road?</h2>
  <p>[Urgency-driven copy]</p>
  <a href="#quote-form" class="cta-button">Schedule Your [SERVICE] Now</a>
</section>
```

### 8. JSON-LD Schema

Include Service schema with:

- Service name
- Provider (Mobile Mechanic Muscle)
- Service area (GeoCircle covering Nashville metro)
- Price range (if applicable)
- Availability

## Word Count Target

800-1,200 words

## CTA Placement

- Hero: 0 words
- First CTA: ~300 words
- Second CTA: ~600 words
- Final CTA: End

## Example Services

1. Brake Repair
2. Diagnostics & Check Engine Light
3. Battery & Starter Service
4. Cooling System Repair
5. Suspension & Steering
6. Pre-Purchase Inspections
7. Emergency Roadside Assistance
