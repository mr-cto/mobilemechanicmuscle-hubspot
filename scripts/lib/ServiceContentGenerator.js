import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Content generator for service pages
 * Reads config data and generates SEO-optimized HTML content
 */
class ServiceContentGenerator {
  constructor(service) {
    this.service = service;
  }

  /**
   * Generate complete HTML content for service page
   */
  generate() {
    const heroSection = this.generateHero();
    const problemSection = this.generateProblem();
    const solutionSection = this.generateSolution();
    const howItWorksSection = this.generateHowItWorks();
    const whyChooseSection = this.generateWhyChoose();
    const serviceAreaSection = this.generateServiceArea();
    const ctaSection = this.generateCTA();
    const contactForm = this.generateContactForm();
    const schema = this.generateSchema();

    return {
      hero: heroSection,
      problem: problemSection,
      solution: solutionSection,
      howItWorks: howItWorksSection,
      whyChoose: whyChooseSection,
      serviceArea: serviceAreaSection,
      cta: ctaSection,
      contactForm: contactForm,
      schema: schema,
      fullHTML: this.assembleFullPage({
        heroSection,
        problemSection,
        solutionSection,
        howItWorksSection,
        whyChooseSection,
        serviceAreaSection,
        ctaSection,
        contactForm,
        schema,
      }),
    };
  }

  generateHero() {
    return `<section class="hero-section">
  <div class="container">
    <div class="hero-text">
      <h1>${this.service.name} | Mobile Mechanic Muscle</h1>
      <p class="hero-subhead">Professional ${this.service.name.toLowerCase()} service in Nashville. We come to your location with all the tools and expertise needed.</p>
      <a href="#quote-form" class="cta-button">Get Your Free Quote</a>
    </div>
  </div>
</section>`;
  }

  generateProblem() {
    const problems = this.service.common_problems.slice(0, 3);
    const problemItems = problems
      .map((problem) => `      <li>${problem}</li>`)
      .join("\n");

    return `<section class="content-section">
  <div class="container">
    <h2>Signs You Need ${this.service.name}</h2>
    <p>Don't ignore these warning signs. Addressing them early can prevent costly repairs down the road.</p>
    
    <ul class="problem-list">
${problemItems}
    </ul>
    
    <a href="#quote-form" class="cta-button cta-secondary">Schedule Inspection</a>
  </div>
</section>`;
  }

  generateSolution() {
    return `<section class="content-section content-section-alt">
  <div class="container">
    <h2>Our ${this.service.name} Process</h2>
    <p>We bring professional ${this.service.name.toLowerCase()} service directly to your driveway, parking lot, or office. No need to tow your vehicle or wait at a shop.</p>
    
    <div class="solution-benefits">
      <div class="benefit-item">
        <h3>Mobile Convenience</h3>
        <p>We come to you with fully-equipped service vehicles containing all necessary tools and diagnostic equipment.</p>
      </div>
      
      <div class="benefit-item">
        <h3>Experienced Technicians</h3>
        <p>Our mechanics are experienced professionals with years of expertise in ${this.service.name.toLowerCase()}.</p>
      </div>
      
      <div class="benefit-item">
        <h3>Quality Parts & Warranty</h3>
        <p>We use high-quality parts and back our work with a 1-year parts and labor warranty when we supply the parts.</p>
      </div>
    </div>
  </div>
</section>`;
  }

  generateHowItWorks() {
    return `<section class="content-section">
  <div class="container">
    <h2>How Mobile ${this.service.name} Works</h2>
    
    <div class="page-steps-grid">
      <div class="step">
        <div class="step-number">1</div>
        <h3>Request a Quote</h3>
        <p>Call us or fill out our online form. Describe your vehicle's symptoms and we'll provide an estimate.</p>
      </div>
      
      <div class="step">
        <div class="step-number">2</div>
        <h3>Schedule Appointment</h3>
        <p>We'll find a time that works for you. Same-day service often available for urgent repairs.</p>
      </div>
      
      <div class="step">
        <div class="step-number">3</div>
        <h3>We Come to You</h3>
        <p>Our mobile mechanic arrives at your location with all necessary tools and equipment.</p>
      </div>
      
      <div class="step">
        <div class="step-number">4</div>
        <h3>Professional Service</h3>
        <p>We perform the ${this.service.name.toLowerCase()} efficiently and test everything to ensure proper operation.</p>
      </div>
    </div>
  </div>
</section>`;
  }

  generateWhyChoose() {
    const benefits = this.service.key_benefits.slice(0, 4);
    const benefitItems = benefits
      .map(
        (benefit) =>
          `      <div class="benefit-card">
        <h3>${benefit}</h3>
      </div>`,
      )
      .join("\n");

    return `<section class="content-section content-section-alt">
  <div class="container">
    <h2>Why Choose Mobile Mechanic Muscle for ${this.service.name}?</h2>
    
    <div class="page-benefits-grid">
${benefitItems}
    </div>
    
    <p class="trust-statement">With over 1,000+ satisfied customers in Nashville and surrounding areas, we've built our reputation on quality work, transparent service, and exceptional customer care.</p>
  </div>
</section>`;
  }

  generateServiceArea() {
    const locations = [
      "Franklin",
      "Brentwood",
      "Murfreesboro",
      "Hendersonville",
      "Nashville",
    ];
    const locationLinks = locations
      .map(
        (loc) =>
          `      <li><a href="/locations/${loc.toLowerCase()}">${loc}</a></li>`,
      )
      .join("\n");

    return `<section class="content-section">
  <div class="container">
    <h2>Serving Nashville Metro Area</h2>
    <p style="background: #f8f9fa; padding: 20px; border-left: 4px solid #30beb4; margin-bottom: 30px;"><strong>Need a different service?</strong> ${this.service.name} is just one of many repairs we handle. From oil changes to transmission work, exhaust to electrical—if it's automotive, we do it. Call us at <a href="tel:+16154963900" style="color: #30beb4;">(615) 496-3900</a> to discuss your needs.</p>
    <p>We provide mobile ${this.service.name.toLowerCase()} throughout Middle Tennessee including:</p>
    
    <ul class="location-list">
${locationLinks}
    </ul>
    
    <p>Don't see your city? We serve the entire Nashville metro area and beyond. Call to confirm service in your area.</p>
  </div>
</section>`;
  }

  generateCTA() {
    return `<section class="cta-section">
  <div class="container">
    <h2>Need ${this.service.name}? We Come to You.</h2>
    <p>Schedule your mobile service today and experience the convenience of professional auto repair at your location.</p>
    <a href="#quote-form" class="cta-button">Request Your Free Quote</a>
    <p class="phone-cta">Or Call: <a href="tel:615-496-3900"><strong>(615) 496-3900</strong></a></p>
  </div>
</section>`;
  }

  generateContactForm() {
    return `<section class="content-section" id="quote-form">
  <div class="container">
    <h2>Get Your Free Quote</h2>
    <p>Fill out the form below and we'll get back to you quickly with an estimate.</p>
    <div id="hs_form_target_service_form"></div>
  </div>
</section>

<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
<script>
  if (window.hbspt) {
    hbspt.forms.create({
      region: "na1",
      portalId: "46603985",
      formId: "4dfc54af-6a62-4fdc-a2bf-2836626d42eb",
      target: '#hs_form_target_service_form',
      cssClass: 'hs-form stacked hs-custom-form',
      inlineMessage: 'Thank you for contacting us! We will be in touch soon.'
    });
  }
</script>`;
  }

  generateSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: this.service.name,
      description: `Professional ${this.service.name.toLowerCase()} service in Nashville and Middle Tennessee. We come to your location with all necessary tools and equipment. ${this.service.description}`,
      provider: {
        "@type": "AutomotiveBusiness",
        name: "Mobile Mechanic Muscle",
        url: "https://mobilemechanicmusclenearme.com",
        telephone: "(615) 496-3900",
        email: "service@mobilemechanicmusclenearme.com",
        image:
          "https://mobilemechanicmusclenearme.com/hs-fs/hubfs/IMG_20260203_144742.png",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nashville",
          addressRegion: "TN",
          addressCountry: "US",
        },
      },
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: "36.1627",
          longitude: "-86.7816",
        },
        geoRadius: "25 miles",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Mobile Auto Repair Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: this.service.name,
              description: this.service.description,
            },
          },
        ],
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "06:00",
          closes: "16:00",
        },
      ],
    };
  }

  assembleFullPage(sections) {
    return `<style>
  * { box-sizing: border-box; }
  body { font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif; color: #2B394B; line-height: 1.6; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
  .hero-section { padding: 80px 20px; text-align: center; background: linear-gradient(135deg, #30beb4 0%, #26a89e 100%); color: white; }
  .hero-section h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; color: white; }
  .hero-section p { color: white; }
  .hero-subhead { font-size: 1.25rem; margin-bottom: 30px; color: white; }
  .cta-button { display: inline-block; padding: 15px 30px; background: white; color: #30beb4 !important; text-decoration: none; font-weight: 600; text-transform: uppercase; transition: all 0.3s; border-radius: 4px; }
  .cta-button:hover { background: #2B394B; color: white !important; }
  .cta-secondary { background: transparent; color: #30beb4 !important; border: 2px solid #30beb4; }
  .cta-secondary:hover { background: #30beb4; color: white !important; border-color: #30beb4; }
  .content-section { padding: 60px 20px; }
  .content-section-alt { background: #F5F8FA; }
  .content-section h2 { font-size: 2rem; font-weight: 700; text-transform: uppercase; margin-bottom: 20px; color: #2B394B; }
  .content-section p { color: #2B394B; }
  .problem-list, .location-list { margin: 20px 0; padding-left: 20px; color: #2B394B; }
  .page-solution-benefits, .page-benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 40px; }
  .benefit-item h3, .benefit-card h3 { font-size: 1.5rem; margin-bottom: 10px; color: #30beb4; font-weight: 600; }
  .benefit-item p, .benefit-card p { color: #2B394B; }
  .page-steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 40px; }
  .step { text-align: center; }
  .step h3 { color: #2B394B; }
  .step p { color: #2B394B; }
  .step-number { width: 60px; height: 60px; background: #30beb4; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; margin: 0 auto 20px; }
  .feature { flex: 1 1 200px; color: #2B394B; }
  .cta-section { padding: 80px 20px; text-align: center; background: #2B394B; color: white; }
  .cta-section h2 { color: white; margin-bottom: 20px; }
  .cta-section p { color: white; }
  .phone-cta { margin-top: 20px; font-size: 1.125rem; color: white; }
  .phone-cta a { color: #30beb4; text-decoration: none; }
  .trust-statement { font-style: italic; margin-top: 30px; padding: 20px; background: white; border-left: 4px solid #30beb4; color: #2B394B; }
  
  /* Scroll offset for sticky header */
  html { scroll-padding-top: 100px; scroll-behavior: smooth; }
</style>

${sections.heroSection}

${sections.problemSection}

${sections.solutionSection}

${sections.howItWorksSection}

${sections.whyChooseSection}

${sections.serviceAreaSection}

${sections.ctaSection}

${sections.contactForm}

<script type="application/ld+json">
${JSON.stringify(sections.schema, null, 2)}
</script>`;
  }
}

export { ServiceContentGenerator };
