import hubspot from "@hubspot/api-client";
import "dotenv/config";

const hubspotClient = new hubspot.Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

async function listAllPages() {
  console.log("🔍 Fetching all pages from HubSpot...\n");

  try {
    let allPages = [];
    let after = undefined;

    do {
      const response = await hubspotClient.cms.pages.sitePagesApi.getPage(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        after,
        100,
        false,
      );

      allPages = allPages.concat(response.results || []);
      after = response.paging?.next?.after;
    } while (after);

    console.log(`📄 Found ${allPages.length} total pages\n`);

    // Sort by name
    allPages.sort((a, b) => a.name.localeCompare(b.name));

    console.log("📋 All Pages:");
    console.log("─".repeat(100));

    allPages.forEach((page) => {
      const state = page.state === "PUBLISHED" ? "✅" : "📝";
      const slug = page.slug || "(homepage)";
      console.log(`\n${state} ${page.name}`);
      console.log(`   ID: ${page.id}`);
      console.log(`   Slug: ${slug}`);
      console.log(`   Template: ${page.templatePath || "N/A"}`);
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.body) {
      console.error("Details:", JSON.stringify(error.body, null, 2));
    }
    process.exit(1);
  }
}

listAllPages();
