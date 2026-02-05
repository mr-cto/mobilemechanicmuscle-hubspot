import { Client } from "@hubspot/api-client";
import { config as loadEnv } from "dotenv";
import readline from "readline";

loadEnv();

const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Find and delete duplicate pages
 */
async function cleanDuplicates() {
  console.log("🔍 Searching for duplicate pages...\n");

  try {
    // Fetch all pages (getPage returns a collection despite singular name)
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

    // Group pages by slug
    const pagesBySlug = {};
    allPages.forEach((page) => {
      if (
        page.slug &&
        (page.slug.startsWith("services/") ||
          page.slug.startsWith("locations/"))
      ) {
        if (!pagesBySlug[page.slug]) {
          pagesBySlug[page.slug] = [];
        }
        pagesBySlug[page.slug].push(page);
      }
    });

    // Find duplicates
    const duplicates = Object.entries(pagesBySlug)
      .filter(([slug, pages]) => pages.length > 1)
      .map(([slug, pages]) => ({
        slug,
        pages: pages.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        ),
      }));

    if (duplicates.length === 0) {
      console.log("✅ No duplicates found!\n");
      rl.close();
      return;
    }

    console.log(`⚠️  Found ${duplicates.length} pages with duplicates:\n`);

    duplicates.forEach(({ slug, pages }) => {
      console.log(`\n📄 ${slug} (${pages.length} copies)`);
      pages.forEach((page, index) => {
        const label = index === 0 ? "KEEP (newest)" : "DELETE";
        console.log(
          `   ${label}: ${page.name} (ID: ${page.id}, Updated: ${new Date(page.updatedAt).toLocaleString()})`,
        );
      });
    });

    // Calculate pages to delete
    const pagesToDelete = duplicates.flatMap(({ pages }) => pages.slice(1));

    console.log(
      `\n⚠️  This will DELETE ${pagesToDelete.length} duplicate pages (keeping the newest version of each).\n`,
    );

    rl.question("Continue? (yes/no): ", async (answer) => {
      if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
        console.log("\n🗑️  Deleting duplicates...\n");

        for (const page of pagesToDelete) {
          try {
            await hubspotClient.cms.pages.sitePagesApi.archive(page.id);
            console.log(`✅ Deleted: ${page.name} (${page.slug})`);
            // Rate limiting
            await new Promise((resolve) => setTimeout(resolve, 200));
          } catch (error) {
            console.error(`❌ Failed to delete ${page.name}:`, error.message);
          }
        }

        console.log("\n✅ Cleanup complete!");
      } else {
        console.log("\n❌ Cancelled - no pages were deleted.");
      }

      rl.close();
    });
  } catch (error) {
    console.error("❌ Error cleaning duplicates:", error.message);
    rl.close();
    process.exit(1);
  }
}

cleanDuplicates();
