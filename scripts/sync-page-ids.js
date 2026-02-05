import { Client } from "@hubspot/api-client";
import { config as loadEnv } from "dotenv";
import { writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

loadEnv();

const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

/**
 * Fetch all site pages and build a mapping of slug -> page ID
 */
async function syncPageIds() {
  console.log("🔍 Fetching all pages from HubSpot...\n");

  try {
    // Fetch pages with pagination
    // getPage() returns a collection despite singular name
    let allPages = [];
    let after = undefined;

    do {
      const response = await hubspotClient.cms.pages.sitePagesApi.getPage(
        undefined, // createdAt
        undefined, // createdAfter
        undefined, // createdBefore
        undefined, // updatedAt
        undefined, // updatedAfter
        undefined, // updatedBefore
        undefined, // sort
        after, // after (pagination cursor)
        100, // limit
        false, // archived
      );

      allPages = allPages.concat(response.results || []);
      after = response.paging?.next?.after;
    } while (after);

    console.log(`📄 Found ${allPages.length} total pages\n`);

    // Filter for our service and location pages
    const servicePages = allPages.filter(
      (p) => p.slug && p.slug.startsWith("services/"),
    );
    const locationPages = allPages.filter(
      (p) => p.slug && p.slug.startsWith("locations/"),
    );
    const allServicesPage = allPages.find((p) => p.slug === "all-services");

    console.log(`✅ Service pages: ${servicePages.length}`);
    console.log(`✅ Location pages: ${locationPages.length}`);
    if (allServicesPage) {
      console.log(`✅ All Services page: 1`);
    }
    console.log();

    // Build mapping
    const mapping = {
      lastSync: new Date().toISOString(),
      portalId: process.env.HUBSPOT_PORTAL_ID,
      pages: {},
    };

    const pagesToMap = [...servicePages, ...locationPages];
    if (allServicesPage) {
      pagesToMap.push(allServicesPage);
    }

    pagesToMap.forEach((page) => {
      mapping.pages[page.slug] = {
        id: page.id,
        name: page.name,
        state: page.state,
        updatedAt: page.updatedAt,
      };
    });

    // Save to file
    const outputPath = join(__dirname, "../.hubspot-pages.json");
    writeFileSync(outputPath, JSON.stringify(mapping, null, 2));

    console.log(`💾 Saved page mapping to .hubspot-pages.json`);
    console.log(`\n📋 Mapped pages by slug:`);
    Object.keys(mapping.pages).forEach((slug) => {
      console.log(`   ${slug} → ${mapping.pages[slug].id}`);
    });
  } catch (error) {
    console.error("❌ Error syncing page IDs:", error.message);
    process.exit(1);
  }
}

syncPageIds();
