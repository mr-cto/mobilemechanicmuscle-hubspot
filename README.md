# Nashville SEO Content Engine

> Automated content generation system for Mobile Mechanic Muscle using local LLM

## Overview

This workspace provides everything needed to generate 11 high-intent, SEO-optimized pages for mobilemechanicmusclenearme.com. The system includes:

- **7 Service Pages**: Brake Repair, Diagnostics, Battery/Starter, Cooling Systems, Suspension, Pre-Purchase Inspections, Emergency Roadside
- **4 Neighborhood Pages**: Franklin, Brentwood, Murfreesboro, Hendersonville

All content is designed for HubSpot CMS integration with consistent CSS classes and proper JSON-LD schema markup.

---

## 📁 Project Structure

```
.
├── .github/
│   └── copilot-instructions.md    # Project guidelines for AI assistants
├── config/
│   ├── services-config.json       # Configuration for 7 service pages
│   ├── neighborhoods-config.json  # Configuration for 4 neighborhood pages
│   └── generation-settings.json   # Global generation settings
├── prompts/
│   ├── system-prompt-base.md      # Base system prompt for LLM
│   ├── service-page-prompt.md     # Service page generation instructions
│   └── neighborhood-page-prompt.md # Neighborhood page generation instructions
├── schemas/
│   ├── service-schema-template.json      # Service JSON-LD template
│   ├── localbusiness-schema-template.json # LocalBusiness JSON-LD template
│   └── faq-schema-template.json          # FAQ JSON-LD template
├── templates/
│   ├── example-service-page.html         # Reference: Brake Repair page
│   └── example-neighborhood-page.html    # Reference: Franklin, TN page
├── reference/
│   └── hubspot-css-guide.md       # HubSpot CSS class documentation
└── README.md                       # This file
```

---

## 🚀 Quick Start

### 1. Configure Business Information

Edit [config/generation-settings.json](config/generation-settings.json) and replace placeholders:

```json
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

**Solution:** Ensure all required fields filled. Use [schema.org validator](https://validator.schema.org/).

---

## 📚 Additional Resources

- [HubSpot CMS Documentation](https://developers.hubspot.com/docs/cms)
- [JSON-LD Schema Reference](https://schema.org/)
- [Google's SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Nashville Market Research](https://www.nashvillechamber.com/)

---

## 🏁 Next Steps

1. **Fill in business information** in `generation-settings.json`
2. **Test generate** the Brake Repair page
3. **Review quality** against example template
4. **Adjust prompts** if needed
5. **Generate remaining 10 pages** over 2-3 weeks
6. **Upload to HubSpot** and publish
7. **Monitor performance** and iterate

---

## 📄 License

This content generation system is proprietary. Generated content is owned by Mobile Mechanic Muscle.

---

**Questions?** Review the [prompts/](prompts/) and [reference/](reference/) directories for detailed guidance.
