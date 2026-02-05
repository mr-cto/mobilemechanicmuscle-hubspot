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
    "⚠️  No page mapping found. Run 'npm run sync' first to avoid creating duplicates.\n",
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
    // Check if page exists in mapping
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
 * Main execution
 */
async function main() {
  console.log("🚀 Starting HubSpot page creation with generated content...\n");
  console.log(`Portal ID: ${process.env.HUBSPOT_PORTAL_ID}`);
  console.log(`Draft mode: ${process.env.CREATE_AS_DRAFT}`);
  console.log(`Using draft URLs: ${process.env.USE_DRAFT_URLS}\n`);

  let successCount = 0;
  let failCount = 0;

  // Create service pages
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
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
