import { Client } from "@hubspot/api-client";
import { config as loadEnv } from "dotenv";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { LocationContentGenerator } from "./lib/LocationContentGenerator.js";
import { ServiceContentGenerator } from "./lib/ServiceContentGenerator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
loadEnv();

// Initialize HubSpot client
const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

// Load configurations
const servicesConfig = JSON.parse(
  readFileSync(join(__dirname, "../config/services-config.json"), "utf-8"),
);
const locationsConfig = JSON.parse(
  readFileSync(join(__dirname, "../config/neighborhoods-config.json"), "utf-8"),
);

// Load page mapping if it exists
let pageMapping = { pages: {} };
const mappingPath = join(__dirname, "../.hubspot-pages.json");
if (existsSync(mappingPath)) {
  pageMapping = JSON.parse(readFileSync(mappingPath, "utf-8"));
  console.log(
    `📋 Loaded page mapping (last synced: ${new Date(pageMapping.lastSync).toLocaleString()})\n`,
  );
} else {
  console.log(
    "⚠️  No page mapping found. Run 'node scripts/sync-page-ids.js' first to avoid creating duplicates.\n",
  );
}

/**
 * Find existing page by slug from cached mapping
 */
async function findPageBySlug(slug) {
  // Check cached mapping first
  if (pageMapping.pages[slug]) {
    return pageMapping.pages[slug];
  }
  return null;
}

/**
 * Create or update a HubSpot page with generated content
 */
async function upsertPageWithContent(pageData, htmlContent) {
  try {
    // Check if page exists
    const existingPage = await findPageBySlug(pageData.slug);

    const widgetData = {
      main_content: {
        body: {
          html: htmlContent,
        },
      },
    };

    if (existingPage) {
      // Update existing page - only send fields that can be updated
      const updatePayload = {
        name: pageData.name,
        metaDescription: pageData.metaDescription,
        htmlTitle: pageData.htmlTitle,
        widgets: widgetData,
      };

      if (pageData.metaRobots) {
        updatePayload.metaRobots = pageData.metaRobots;
      }

      const response = await hubspotClient.cms.pages.sitePagesApi.update(
        existingPage.id,
        updatePayload,
      );
      console.log(`🔄 Updated: ${pageData.name} (${pageData.slug})`);
      return response;
    } else {
      // Create new page
      const createPayload = {
        ...pageData,
        widgets: widgetData,
      };

      const response =
        await hubspotClient.cms.pages.sitePagesApi.create(createPayload);
      console.log(`✅ Created: ${pageData.name} (${pageData.slug})`);
      return response;
    }
  } catch (error) {
    console.error(`❌ Failed to upsert ${pageData.name}:`, error.message);
    if (error.body) {
      console.error("Details:", JSON.stringify(error.body, null, 2));
    }
    throw error;
  }
}

/**
 * Generate and create service page
 */
async function createServicePage(service) {
  const isDraft = process.env.CREATE_AS_DRAFT === "true";
  const useDraftUrls = process.env.USE_DRAFT_URLS === "true";
  const slug = useDraftUrls
    ? `draft/services/${service.slug}`
    : `services/${service.slug}`;

  // Generate content
  const generator = new ServiceContentGenerator(service);
  const content = generator.generate();

  const pageData = {
    name: `${service.name} - Mobile Mechanic Muscle`,
    slug: slug,
    templatePath: "draft-templates/simple-content-page.html",
    state: isDraft ? "DRAFT" : "PUBLISHED",
    metaDescription: `Professional ${service.name.toLowerCase()} service in Nashville. Experienced mobile mechanics come to your location. Fast, reliable, transparent pricing.`,
    htmlTitle: `${service.name} in Nashville | Mobile Mechanic Muscle`,
    ...(process.env.NOINDEX_DRAFTS === "true" &&
      isDraft && {
        metaRobots: ["NOINDEX", "NOFOLLOW"],
      }),
  };

  return await upsertPageWithContent(pageData, content.fullHTML);
}

/**
 * Generate and create location page
 */
async function createLocationPage(location) {
  const isDraft = process.env.CREATE_AS_DRAFT === "true";
  const useDraftUrls = process.env.USE_DRAFT_URLS === "true";
  const slug = useDraftUrls
    ? `draft/locations/${location.slug}`
    : `locations/${location.slug}`;

  // Generate content
  const generator = new LocationContentGenerator(location);
  const content = generator.generate();

  const pageData = {
    name: `Mobile Mechanic in ${location.name}, TN`,
    slug: slug,
    templatePath: "draft-templates/simple-content-page.html",
    state: isDraft ? "DRAFT" : "PUBLISHED",
    metaDescription: `Mobile mechanic service in ${location.name}, TN. We come to your home or office. Professional auto repair at your location. Call for free quote.`,
    htmlTitle: `Mobile Mechanic in ${location.name}, TN | Mobile Mechanic Muscle`,
    ...(process.env.NOINDEX_DRAFTS === "true" &&
      isDraft && {
        metaRobots: ["NOINDEX", "NOFOLLOW"],
      }),
  };

  return await upsertPageWithContent(pageData, content.fullHTML);
}

/**
 * Generate and create all-services page
 */
async function createAllServicesPage() {
  const htmlContent = readFileSync(
    join(__dirname, "../src/pages/all-services.html"),
    "utf-8",
  );

  const pageData = {
    name: "Complete Mobile Mechanic Services",
    slug: "all-services",
    templatePath: "draft-templates/simple-content-page.html",
    state: process.env.CREATE_AS_DRAFT === "true" ? "DRAFT" : "PUBLISHED",
    htmlTitle:
      "Complete Mobile Mechanic Services | Nashville & Middle Tennessee",
    metaDescription:
      "Full list of mobile mechanic services from Mobile Mechanic Muscle. From oil changes to transmission work—we bring professional auto repair to your location in Nashville, Franklin, Brentwood & beyond.",
  };

  return await upsertPageWithContent(pageData, htmlContent);
}

/**
 * Generate and create high-end vehicles page
 */
async function createHighEndVehiclesPage() {
  const htmlContent = readFileSync(
    join(__dirname, "../src/pages/high-end-vehicles.html"),
    "utf-8",
  );

  const pageData = {
    name: "Luxury, Exotic & Supercar Service - Mobile Mechanic Muscle",
    slug: "high-end-vehicles",
    templatePath: "draft-templates/simple-content-page.html",
    state: process.env.CREATE_AS_DRAFT === "true" ? "DRAFT" : "PUBLISHED",
    htmlTitle:
      "Supercar & Exotic Vehicle Mobile Mechanic | Ferrari, Lamborghini, McLaren | Nashville",
    metaDescription:
      "Specialized mobile mechanic for supercars, exotics, and luxury vehicles in Nashville. Ferrari, Lamborghini, McLaren, Porsche, and more. Factory-grade diagnostics, OEM parts, and make-specific expertise at your location.",
  };

  return await upsertPageWithContent(pageData, htmlContent);
}

/**
 * Generate and create request-service page
 */
async function createRequestServicePage() {
  const htmlContent = readFileSync(
    join(__dirname, "../src/pages/request-service.html"),
    "utf-8",
  );

  const pageData = {
    name: "Request Service - Mobile Mechanic Muscle",
    slug: "request-service",
    templatePath: "draft-templates/simple-content-page.html",
    state: process.env.CREATE_AS_DRAFT === "true" ? "DRAFT" : "PUBLISHED",
    htmlTitle:
      "Request Mobile Mechanic Service | Nashville & Middle Tennessee",
    metaDescription:
      "Request a quote for mobile mechanic service in Nashville and Middle Tennessee. Quick intake form for engine repair, brakes, diagnostics, commercial equipment, muscle cars, luxury vehicles, and more.",
  };

  return await upsertPageWithContent(pageData, htmlContent);
}

/**
 * Generate and create commercial equipment page
 */
async function createCommercialEquipmentPage() {
  const htmlContent = readFileSync(
    join(__dirname, "../src/pages/commercial-equipment.html"),
    "utf-8",
  );

  const pageData = {
    name: "Commercial & Heavy Equipment Service - Mobile Mechanic Muscle",
    slug: "commercial-equipment",
    templatePath: "draft-templates/simple-content-page.html",
    state: process.env.CREATE_AS_DRAFT === "true" ? "DRAFT" : "PUBLISHED",
    htmlTitle:
      "Commercial & Heavy Equipment Mobile Mechanic | Nashville & Middle Tennessee",
    metaDescription:
      "On-site mobile mechanic for commercial equipment and heavy machinery in Nashville. Skid steers, excavators, forklifts, generators, box trucks, diesel engines. We come to your job site.",
  };

  return await upsertPageWithContent(pageData, htmlContent);
}

/**
 * Generate and create muscle cars page
 */
async function createMuscleCarsPage() {
  const htmlContent = readFileSync(
    join(__dirname, "../src/pages/muscle-cars.html"),
    "utf-8",
  );

  const pageData = {
    name: "Muscle Car Service - Mobile Mechanic Muscle",
    slug: "muscle-cars",
    templatePath: "draft-templates/simple-content-page.html",
    state: process.env.CREATE_AS_DRAFT === "true" ? "DRAFT" : "PUBLISHED",
    htmlTitle:
      "Muscle Car Mobile Mechanic | Classic & Modern American Muscle | Nashville",
    metaDescription:
      "Specialized mobile mechanic for classic and modern muscle cars in Nashville. Camaro, Mustang, Challenger, Corvette, Hellcat, and more. V8 diagnostics, brake service, and bolt-on installs at your location.",
  };

  return await upsertPageWithContent(pageData, htmlContent);
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Deploying HubSpot pages with generated content...\n");
  console.log(`Portal ID: ${process.env.HUBSPOT_PORTAL_ID}`);
  console.log(`Draft mode: ${process.env.CREATE_AS_DRAFT}`);
  console.log(`Using draft URLs: ${process.env.USE_DRAFT_URLS}`);
  console.log(`Mode: Create new pages or update existing ones\n`);

  let successCount = 0;
  let failCount = 0;

  // Create all-services page first
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📋 ALL SERVICES PAGE");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  try {
    await createAllServicesPage();
    successCount++;
  } catch (error) {
    failCount++;
  }
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Create high-end vehicles page
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🏎️  HIGH-END VEHICLES PAGE");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  try {
    await createHighEndVehiclesPage();
    successCount++;
  } catch (error) {
    failCount++;
  }
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Create request-service page
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📝 REQUEST SERVICE PAGE");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  try {
    await createRequestServicePage();
    successCount++;
  } catch (error) {
    failCount++;
  }
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Create commercial equipment page
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🏗️  COMMERCIAL EQUIPMENT PAGE");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  try {
    await createCommercialEquipmentPage();
    successCount++;
  } catch (error) {
    failCount++;
  }
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Create muscle cars page
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🏎️  MUSCLE CARS PAGE");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  try {
    await createMuscleCarsPage();
    successCount++;
  } catch (error) {
    failCount++;
  }
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Create service pages
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📝 SERVICE PAGES");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  for (const service of servicesConfig.services) {
    try {
      await createServicePage(service);
      successCount++;
    } catch (error) {
      failCount++;
    }
    // Rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Create location pages
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📍 LOCATION PAGES");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  for (const location of locationsConfig.neighborhoods) {
    try {
      await createLocationPage(location);
      successCount++;
    } catch (error) {
      failCount++;
    }
    // Rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Summary
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📊 CREATION SUMMARY");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`✅ Successfully created: ${successCount} pages`);
  console.log(`❌ Failed: ${failCount} pages`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  if (failCount === 0) {
    console.log("🎉 All pages created successfully with generated content!");
    console.log("\n📝 Next steps:");
    console.log(
      "1. Review pages in HubSpot: Marketing → Website → Website Pages",
    );
    console.log("2. Check content quality and SEO optimization");
    console.log(
      "3. When ready, change .env to use production URLs and republish",
    );
  }
}

main().catch(console.error);
