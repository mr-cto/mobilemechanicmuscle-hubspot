import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Content generator for location pages
 * Reads config data and generates SEO-optimized HTML content
 */
class LocationContentGenerator {
  constructor(location, systemPrompt, neighborhoodPrompt) {
    this.location = location;
    this.systemPrompt = systemPrompt;
    this.neighborhoodPrompt = neighborhoodPrompt;
  }

  /**
   * Generate complete HTML content for location page
   */
  generate() {
    const heroSection = this.generateHero();
    const localContextSection = this.generateLocalContext();
    const servicesSection = this.generateServices();
    const convenienceSection = this.generateConvenience();
    const serviceAreaSection = this.generateServiceArea();
    const trustSection = this.generateTrust();
    const ctaSection = this.generateCTA();
    const contactForm = this.generateContactForm();
    const schema = this.generateSchema();

    return {
      hero: heroSection,
      localContext: localContextSection,
      services: servicesSection,
      convenience: convenienceSection,
      serviceArea: serviceAreaSection,
      trust: trustSection,
      cta: ctaSection,
      contactForm: contactForm,
      schema: schema,
      fullHTML: this.assembleFullPage({
        heroSection,
        localContextSection,
        servicesSection,
        convenienceSection,
        serviceAreaSection,
        trustSection,
        ctaSection,
        contactForm,
        schema,
      }),
    };
  }

  generateHero() {
    return `<section class="hero-section hero-local">
  <div class="container">
    <div class="hero-text">
      <h1>Mobile Mechanic in ${this.location.name}, TN | Service at Your Home or Office</h1>
      <p class="hero-subhead">Skip the drive to a shop. Professional mechanics serve ${this.location.name} residents with expert auto repair at your location.</p>
      <a href="#quote-form" class="cta-button">Get Your Free Quote</a>
    </div>
  </div>
</section>`;
  }

  generateLocalContext() {
    const landmarks = this.location.landmarks.slice(0, 3);
    const landmarkText =
      landmarks.length >= 2
        ? `${landmarks[0]} and ${landmarks[1]}`
        : landmarks[0];

    return `<section class="content-section">
  <div class="container">
    <h2>${this.location.name}'s Trusted Mobile Mechanic Service</h2>
    <p>${this.location.local_context}</p>
    <p>Whether you're near ${landmarkText} dealing with a check engine light or parked at home with a brake problem, we come to you. No need to drive to a shop or wait in a lobby—our experienced mechanics bring professional service directly to your driveway.</p>
    <a href="#quote-form" class="cta-button cta-secondary">Schedule Your Service</a>
  </div>
</section>`;
  }

  generateServices() {
    const services = [
      {
        name: "Brake Repair",
        slug: "brake-repair",
        description:
          "Pads, rotors, calipers, and complete brake system service.",
      },
      {
        name: "Diagnostics",
        slug: "diagnostics",
        description:
          "Check engine light troubleshooting and computer diagnostics.",
      },
      {
        name: "Battery & Starter",
        slug: "battery-starter",
        description: "Battery testing, replacement, and starter repair.",
      },
      {
        name: "Cooling System",
        slug: "cooling-system",
        description:
          "Radiator, thermostat, water pump repair, and coolant flushes.",
      },
      {
        name: "Suspension & Steering",
        slug: "suspension",
        description:
          "Shocks, struts, ball joints, tie rods, and steering components.",
      },
      {
        name: "Pre-Purchase Inspections",
        slug: "pre-purchase-inspection",
        description: "Comprehensive vehicle inspection before you buy.",
      },
    ];

    const serviceCards = services
      .map(
        (service) => `      <section class="offer-card card card--light">
        <div class="offer-card__content">
          <h3 style="font-size:24px">${service.name}</h3>
          <p style="font-size:16px">${service.description}</p>
        </div>
        <div class="offer-card__button-wrapper">
          <a href="/services/${service.slug}" class="cta-button cta-secondary">Learn More</a>
        </div>
      </section>`,
      )
      .join("\n");

    return `<section class="content-section content-section-alt">
  <div class="container">
    <h2>Complete Auto Services in ${this.location.name}</h2>
    <p>We handle everything from routine maintenance to complex diagnostics. All work comes with a 1-year parts and labor warranty when we supply the parts.</p>
    
    <div class="page-service-grid">
${serviceCards}
    </div>
    
    <p style="text-align: center; margin-top: 30px; font-size: 1.1rem;">These are just our most common services. We handle <strong>oil changes, transmission work, exhaust systems, electrical diagnostics, AC repair, tune-ups, and much more</strong>. If it's under the hood, we can fix it. <a href="tel:+16154963900" style="color: #30beb4; text-decoration: none; font-weight: 600;">Call (615) 496-3900</a> to discuss your specific needs.</p>
  </div>
</section>`;
  }

  generateConvenience() {
    const majorRoads = this.location.major_roads.slice(0, 2).join(" and ");

    return `<section class="content-section">
  <div class="container">
    <h2>Why ${this.location.name} Residents Choose Mobile Mechanic Muscle</h2>
    
    <div class="page-benefit-grid">
      <div class="benefit">
        <h3>Skip the Traffic Headache</h3>
        <p>No need to navigate ${majorRoads} during rush hour. We come to your home, office, or wherever your vehicle is parked in ${this.location.name}.</p>
      </div>
      
      <div class="benefit">
        <h3>Stay Productive While We Work</h3>
        <p>Why waste half a day at a repair shop when you could be working, spending time with family, or relaxing at home? We handle everything on-site.</p>
      </div>
      
      <div class="benefit">
        <h3>Professional Service, Local Convenience</h3>
        <p>We're familiar with ${this.location.name}'s streets, neighborhoods, and traffic patterns. Fast response times and reliable service you can count on.</p>
      </div>
    </div>
  </div>
</section>`;
  }

  generateServiceArea() {
    const areas = this.location.landmarks.slice(0, 4);
    const areaItems = areas
      .map(
        (area) =>
          `      <li><strong>${area}:</strong> Professional mobile mechanic service available</li>`,
      )
      .join("\n");

    return `<section class="content-section content-section-alt">
  <div class="container">
    <h2>Serving All of ${this.location.name} & ${this.location.county}</h2>
    <p>We provide mobile mechanic service throughout ${this.location.name} including:</p>
    
    <ul class="area-list">
${areaItems}
    </ul>
    
    <p>Can't find your specific area? Give us a call—we likely serve your location!</p>
  </div>
</section>`;
  }

  generateTrust() {
    return `<section class="content-section">
  <div class="container">
    <h2>Professional Service You Can Trust</h2>
    
    <div class="page-trust-signals">
      <div class="trust-item">
        <h3>🏆 Experienced Technicians</h3>
        <p>Our mechanics have years of professional experience and stay current with the latest automotive technology.</p>
      </div>
      
      <div class="trust-item">
        <h3>✅ 1-Year Parts & Labor Warranty</h3>
        <p>All repairs come with a 1-year warranty on parts and labor when we supply the parts. We stand behind our work.</p>
      </div>
      
      <div class="trust-item">
        <h3>⚡ Same-Day Service Available</h3>
        <p>Need service fast? We offer same-day appointments for ${this.location.name} residents when available.</p>
      </div>
      
      <div class="trust-item">
        <h3>💰 Honest Service & Estimates</h3>
        <p>No surprise fees. We provide detailed estimates before starting any work.</p>
      </div>
    </div>
  </div>
</section>`;
  }

  generateCTA() {
    return `<section class="cta-section">
  <div class="container">
    <h2>Ready for Hassle-Free Auto Repair in ${this.location.name}?</h2>
    <p>Schedule your mobile mechanic service and we'll come to you.</p>
    <a href="#quote-form" class="cta-button">Get Your Free Quote</a>
    <p class="phone-cta">Or Call: <a href="tel:615-496-3900"><strong>(615) 496-3900</strong></a></p>
  </div>
</section>`;
  }

  generateContactForm() {
    return `<section class="content-section" id="quote-form">
  <div class="container">
    <h2>Get Your Free Quote</h2>
    <p>Fill out the form below and we'll get back to you quickly with an estimate.</p>
    <div id="hs_form_target_location_form"></div>
  </div>
</section>

<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
<script>
  if (window.hbspt) {
    hbspt.forms.create({
      region: "na1",
      portalId: "46603985",
      formId: "4dfc54af-6a62-4fdc-a2bf-2836626d42eb",
      target: '#hs_form_target_location_form',
      cssClass: 'hs-form stacked hs-custom-form',
      inlineMessage: 'Thank you for contacting us! We will be in touch soon.'
    });
  }
</script>`;
  }

  generateSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "AutomotiveBusiness",
      "@id": "https://mobilemechanicmusclenearme.com",
      name: "Mobile Mechanic Muscle",
      alternateName: "Mobile Mechanic Muscle Near Me",
      url: `https://mobilemechanicmusclenearme.com/locations/${this.location.slug}`,
      telephone: "(615) 496-3900",
      email: "service@mobilemechanicmusclenearme.com",
      description: `Professional mobile mechanic serving ${this.location.name} and surrounding areas. We come to you for brake repair, diagnostics, and all automotive services.`,
      image:
        "https://mobilemechanicmusclenearme.com/hs-fs/hubfs/IMG_20260203_144742.png",
      priceRange: "$$",
      paymentAccepted: "Cash, Credit Card, Debit Card",
      address: {
        "@type": "PostalAddress",
        addressLocality: this.location.name,
        addressRegion: "TN",
        postalCode: this.location.zip_codes?.[0] || "",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: this.location.coordinates.latitude.toString(),
        longitude: this.location.coordinates.longitude.toString(),
      },
      areaServed: [
        {
          "@type": "City",
          name: this.location.name,
          address: {
            "@type": "PostalAddress",
            addressRegion: "TN",
            addressCountry: "US",
          },
        },
        {
          "@type": "City",
          name: "Nashville",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Mobile Auto Repair Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Brake Repair",
              description:
                "Mobile brake service including pads, rotors, and fluid",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Diagnostic Services",
              description:
                "Check engine light diagnostics and computer scanning",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Battery & Starter Service",
              description: "Battery testing, replacement, and starter service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cooling System Repair",
              description: "Radiator, thermostat, and coolant system repair",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Suspension & Steering",
              description: "Shocks, struts, and steering component service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pre-Purchase Inspections",
              description: "Comprehensive vehicle inspection before purchase",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Emergency Roadside Assistance",
              description: "Mobile emergency repair and roadside service",
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
      sameAs: [
        "https://www.facebook.com/mobilemechanicmuscle",
        "https://www.instagram.com/mobilemechanicmuscle",
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
  .page-service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px; }
  .offer-card { background: white; border: 1px solid #e1e5e9; padding: 30px; border-radius: 8px; }
  .offer-card h3 { font-size: 24px; font-weight: 700; margin-bottom: 15px; text-transform: uppercase; color: #2B394B; }
  .offer-card p { color: #2B394B; }
  .offer-card__button-wrapper { margin-top: 20px; }
  .page-benefit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px; }
  .benefit h3 { font-size: 1.5rem; margin-bottom: 10px; color: #30beb4; font-weight: 600; }
  .benefit p { color: #2B394B; }
  .area-list { list-style: none; margin: 30px 0; padding: 0; }
  .area-list li { padding: 10px 0; border-bottom: 1px solid #e1e5e9; color: #2B394B; }
  .page-trust-signals { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 40px; }
  .trust-item h3 { font-size: 1.25rem; margin-bottom: 10px; color: #30beb4; font-weight: 600; }
  .trust-item p { color: #2B394B; }
  .cta-section { padding: 80px 20px; text-align: center; background: #2B394B; color: white; }
  .cta-section h2 { color: white; margin-bottom: 20px; }
  .cta-section p { color: white; }
  .phone-cta { margin-top: 20px; font-size: 1.125rem; color: white; }
  .phone-cta a { color: #30beb4; text-decoration: none; }
  
  /* Scroll offset for sticky header */
  html { scroll-padding-top: 100px; scroll-behavior: smooth; }
</style>

${sections.heroSection}

${sections.localContextSection}

${sections.servicesSection}

${sections.convenienceSection}

${sections.serviceAreaSection}

${sections.trustSection}

${sections.ctaSection}

${sections.contactForm}

<script type="application/ld+json">
${JSON.stringify(sections.schema, null, 2)}
</script>`;
  }
}

export { LocationContentGenerator };
