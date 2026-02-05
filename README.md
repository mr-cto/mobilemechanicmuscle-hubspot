# Nashville SEO Content Engine

> Complete HubSpot website enhancement project for Mobile Mechanic Muscle

## Overview

This is a professional web development project to migrate and enhance an existing HubSpot website with SEO-optimized content. The project includes:

- **HubSpot Integration**: Connect to client's existing HubSpot account
- **Site Audit**: Comprehensive review of current website
- **Content Generation**: 11 new SEO-optimized pages using local LLM
  - 7 Service Pages: Brake Repair, Diagnostics, Battery/Starter, Cooling Systems, Suspension, Pre-Purchase Inspections, Emergency Roadside
  - 4 Neighborhood Pages: Franklin, Brentwood, Murfreesboro, Hendersonville
- **Staging Environment**: Development portal for client review
- **Migration Plan**: Zero-downtime deployment strategy
- **Client Reporting**: Value comparison and performance tracking

All content is designed for HubSpot CMS integration with consistent CSS classes and proper JSON-LD schema markup.

---

## 📁 Project Structure

````
.
├── .github/
│   └── copilot-instructions.md           # Project guidelines for AI assistants
├── config/
│   ├── services-config.json              # Configuration for 7 service pages
│   ├── neighborhoods-config.json         # Configuration for 4 neighborhood pages
│   └── generation-settings.json          # Global generation settings
├── docs/
│   ├── hubspot-connection.md             # ⭐ HubSpot setup & authentication
│   ├── audit-checklist.md                # ⭐ Existing site audit template
│   ├── migration-plan.md                 # ⭐ Deployment & migration strategy
│   ├── value-comparison.md               # ⭐ Client-facing ROI documentation
│   └── project-roadmap.md                # ⭐ 4-week sprint timeline
├── prompts/
│   ├── system-prompt-base.md             # Base system prompt for LLM
│   ├── service-page-prompt.md            # Service page generation instructions
│   └── neighborhood-page-prompt.md       # Neighborhood page generation instructions
├── schemas/
│   ├── service-schema-template.json      # Service JSON-LD template
│   ├── localbusiness-schema-template.json # LocalBusiness JSON-LD template
│   └── faq-schema-template.json          # FAQ JSON-LD template
├── templates/
│   ├── example-service-page.html         # Reference: Brake Repair page
│   └── example-neighborhood-page.html    # Reference: Franklin, TN page
├── reference/
## 🚀 Quick Start Guide

### For Agency Team

Follow these steps in order:

### Step 1: Connect to HubSpot (Week 1, Day 1-2)

📖 **Guide:** [HubSpot Connection Setup](docs/hubspot-connection.md)

```bash
# Install HubSpot CLI
npm install -g @hubspot/cli

# Initialize connection
hs init

# Verify access
hs auth
````

**Get from client:**

- HubSpot account access (Super Admin or Marketing Hub)
- PoStep 4: Generate Content (Week 2)

📖 **Guide:** Content generation instructions below

####al ID

- Permission to create Private App

### Step 2: Audit Existing Site (Week 1, Day 3-4)

📖 **Guide:** [Audit Checklist](docs/audit-checklist.md)

```bash
# Download current site
mkdir existing-site
hs fetch --portal=PORTAL_ID /

# Document findings in audit-checklist.md
```

**Key tasks:**

- Page inventory
- SEO analysis
- Performance audit
- Content gaps identification

### Step 3: Configure Business Information (Week 1, Day 5)

Edit [config/generation-settings.json](config/generation-settings.json) with client's real data:

```json
{
  "business_info": {
    "phone": "615-XXX-XXXX",        // ← Get from client
    "email": "info@example.com",    // ← Get from client
    "logo_url": "https://...",      // ← Get from HubSpot
    "established_year": "2015"      // ← Get from client
{
  "business_info": {
    "phone": "615-XXX-XXXX", // ← Add real phone number
    "email": "info@example.com", // ← Add real email
    "logo_url": "https://...", // ← Add logo URL
    "established_year": "2015" // ← Add founding year
  }
}
```

### 2. Choose Your Generation Method

#### Option A: Using a Local LLM (Recommended)

**Compatible with:** Ollama, LM Studio, GPT4All, or any OpenAI-compatible API

1. **Load the system prompt:**

   ```bash
   cat prompts/system-prompt-base.md
   ```

2. **Generate a service page:**

   ```bash
   # Combine system prompt + service prompt + config
   cat prompts/system-prompt-base.md \
       prompts/service-page-prompt.md \
       config/services-config.json
   ```

3. **Send to your LLM with specific service:**
   ```
   Generate the "Brake Repair" service page using the configuration for ID "brake-repair" from the services config.
   ```

#### Option B: Using GitHub Copilot

Simply open this workspace in VS Code with Copilot enabled. The `.github/copilot-instructions.md` file provides context automatically.

**Example prompt:**

```
Generate the Diagnostics service page HTML using the service-page-prompt template and diagnostics config from services-config.json
```

---

## 📋 4-Week Sprint Plan

| Week       | Focus              | Tasks                                                                                                                        |
| ---------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **Week 1** | Setup & Training   | • Fill in business info<br>• Test generate one service page<br>• Review output quality<br>• Adjust prompts if needed         |
| **Week 2** | Service Pages      | • Generate 7 service pages<br>• Insert JSON-LD schemas<br>• Upload to HubSpot CMS<br>• Internal linking                      |
| **Week 3** | Neighborhood Pages | • Generate 4 neighborhood pages<br>• Geo-optimize content<br>• Upload to HubSpot<br>• Cross-link to service pages            |
| **Week 4** | QA & Launch        | • Schema validation<br>• Mobile responsiveness check<br>• SEO audit with Screaming Frog<br>• Submit to Google Search Console |

---

## 🎯 Content Generation Workflow

### For Service Pages

1. **Select a service** from [config/services-config.json](config/services-config.json)
2. **Feed to LLM:**
   - System prompt: [prompts/system-prompt-base.md](prompts/system-prompt-base.md)
   - Task prompt: [prompts/service-page-prompt.md](prompts/service-page-prompt.md)
   - Service config: The specific service object from `services-config.json`
3. **Review output** against [templates/example-service-page.html](templates/example-service-page.html)
4. **Insert JSON-LD** using [schemas/service-schema-template.json](schemas/service-schema-template.json)
5. **Validate CSS classes** using [reference/hubspot-css-guide.md](reference/hubspot-css-guide.md)

### For Neighborhood Pages

1. **Select a neighborhood** from [config/neighborhoods-config.json](config/neighborhoods-config.json)
2. **Feed to LLM:**
   - System prompt: [prompts/system-prompt-base.md](prompts/system-prompt-base.md)
   - Task prompt: [prompts/neighborhood-page-prompt.md](prompts/neighborhood-page-prompt.md)
   - Neighborhood config: The specific neighborhood object
3. **Review output** against [templates/example-neighborhood-page.html](templates/example-neighborhood-page.html)
4. **Insert JSON-LD** using [schemas/localbusiness-schema-template.json](schemas/localbusiness-schema-template.json)
5. **Ensure local landmarks** are naturally integrated

---

## 🔧 Configuration Files Explained

### services-config.json

Defines the 7 service pages with:

- Primary/secondary keywords
- Common problems addressed
- Price ranges
- Key benefits

### neighborhoods-config.json

Defines the 4 neighborhood pages with:

- Geographic coordinates
- Local landmarks
- Major roads
- Nearby areas
- Zip codes

### generation-settings.json

Global settings including:

- Business contact info
- CTA variations
- Trust signals
- Word count targets
- SEO parameters

---

## ✅ Quality Checklist

Before uploading to HubSpot, verify:

- [ ] **Word Count:** 600-1,200 words
- [ ] **CTA Frequency:** Every ~300 words
- [ ] **CSS Classes:** All match [hubspot-css-guide.md](reference/hubspot-css-guide.md)
- [ ] **JSON-LD:** Valid schema included
- [ ] **Keywords:** Naturally integrated (1-2% density)
- [ ] **Headings:** Proper H1 → H2 → H3 hierarchy
- [ ] **Links:** All CTAs point to `#quote-form` or `tel:[PHONE]`
- [ ] **Local Terms:** Nashville-specific terminology used
- [ ] **Mobile-First:** Responsive structure maintained
- [ ] **No Inline Styles:** All styling via CSS classes

---

## 🧪 Testing Your Generated Content

### Schema Validation

```bash
# Copy your JSON-LD schema and test at:
# https://validator.schema.org/
```

### Keyword Density Check

```bash
# Use a tool like:
# https://www.searchenginejournal.com/technical-seo/keyword-density-checker/
```

### Readability Score

```bash
# Check Flesch Reading Ease (target: 60-70)
# https://readable.com/
```

---

## 🎨 HubSpot Integration

### Uploading Content

1. **Copy HTML sections** (not full page)
2. **Create new page** in HubSpot CMS
3. **Paste HTML** into Custom HTML module
4. **Add JSON-LD** in page footer
5. **Set SEO metadata** (title, description)
6. **Publish** and test

### Internal Linking Strategy

- Link service pages to relevant neighborhood pages
- Link neighborhood pages to all service pages
- Create hub page linking to all 11 pages
- Add breadcrumb navigation

---

## 📞 Support & Customization

### Modifying Prompts

To adjust tone, length, or structure:

1. Edit relevant prompt file in `prompts/`
2. Regenerate sample page
3. Compare to original
4. Iterate until satisfied

### Adding New Services

1. Add new service object to `services-config.json`
2. Generate page using standard workflow
3. Update navigation/internal links

### Adding New Neighborhoods

1. Add new neighborhood to `neighborhoods-config.json`
2. Include coordinates, landmarks, major roads
3. Generate page using standard workflow

---

## 📊 SEO Metrics to Track

After launch, monitor:

- **Organic traffic** to each page (Google Analytics)
- **Keyword rankings** for primary keywords (SEMrush/Ahrefs)
- **Click-through rate** from SERPs (Google Search Console)
- **Conversion rate** on quote form (HubSpot)
- **Page load speed** (PageSpeed Insights)

---

## 🚨 Common Issues & Solutions

### Issue: Generated content too generic

**Solution:** Add more specific details to config files. Include actual customer pain points.

### Issue: CSS classes not matching

**Solution:** Review [hubspot-css-guide.md](reference/hubspot-css-guide.md) and regenerate with explicit class instructions.

### Issue: Keywords feel forced

**Solution:** Lower keyword density target in generation settings. Focus on natural language.

### Issue: Schema validation errors

\*\*So� Key Documentation

### For Project Team

| Document                                               | Purpose               | When to Use               |
| ------------------------------------------------------ | --------------------- | ------------------------- |
| [HubSpot Connection Guide](docs/hubspot-connection.md) | Set up access & API   | Week 1, Days 1-2          |
| [Audit Checklist](docs/audit-checklist.md)             | Review existing site  | Week 1, Days 3-4          |
| [Project Roadmap](docs/project-roadmap.md)             | Full timeline & tasks | Daily reference           |
| [Migration Plan](docs/migration-plan.md)               | Deployment strategy   | Week 3-4                  |
| [HubSpot CSS Guide](reference/hubspot-css-guide.md)    | HTML/CSS standards    | During content generation |

### For Client

| Document                                           | Purpose                        |
| -------------------------------------------------- | ------------------------------ |
| [Value Comparison Chart](docs/value-comparison.md) | ROI and improvements explained |
| [Project Roadmap](docs/project-roadmap.md)         | What to expect & when          |

---

## 🎯 Success Metrics

### Project Completion Criteria

- [ ] All 11 pages live in production
- [ ] Zero 404 errors from redirects
- [ ] All schema validated
- [ ] Forms capturing leads
- [ ] Mobile usability score 90+
- [ ] Client trained on HubSpot
- [ ] Week 1 performance report delivered

### Expected Results (90 days post-launch)

- **+50% organic traffic** (conservative estimate)
- **+20% conversion rate**
- **15+ new keywords** ranking #1-10
- **+40 leads/month** (at current conversion rates)

---

## 📚 Additional Resources

- [HubSpot CMS Documentation](https://developers.hubspot.com/docs/cms)
- [HubSpot CLI Guide](https://developers.hubspot.com/docs/cms/guides/getting-started-with-local-development)
- [JSON-LD Schema Reference](https://schema.org/)
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 🏁 Getting Started

### For Your First Time Here:

1. **Read:** [Project Roadmap](docs/project-roadmap.md) for complete overview
2. **Start:** [HubSpot Connection Guide](docs/hubspot-connection.md) to connect to client
3. **Next:** [Audit Checklist](docs/audit-checklist.md) to review existing site
4. **Then:** Generate content using prompts in `prompts/` directory
5. **Finally:** Follow [Migration Plan](docs/migration-plan.md) to launchtemplate
6. **Adjust prompts** if needed
7. **Generate remaining 10 pages** over 2-3 weeks
8. **Upload to HubSpot** and publish
9. **Monitor performance** and iterate

---

## 📄 License

This content generation system is proprietary. Generated content is owned by Mobile Mechanic Muscle.

---

**Questions?** Review the [prompts/](prompts/) and [reference/](reference/) directories for detailed guidance.
