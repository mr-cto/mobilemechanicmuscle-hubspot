import { Client } from "@hubspot/api-client";
import { config as loadEnv } from "dotenv";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

loadEnv();

const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

const PAGE_ID = "210210284161";

/**
 * Deploy (update) the high-end vehicles page
 * - Switches template to simple-content-page (which already exists)
 * - Updates HTML content
 * - Publishes
 */
async function deployPage() {
  const htmlContent = readFileSync(
    join(__dirname, "../src/pages/high-end-vehicles.html"),
    "utf-8",
  );

  const widgetData = {
    main_content: {
      body: {
        html: htmlContent,
      },
    },
  };

  // Update the existing page — switch template + refresh content
  const response = await hubspotClient.cms.pages.sitePagesApi.update(
    PAGE_ID,
    {
      name: "Luxury, Exotic & Supercar Service - Mobile Mechanic Muscle",
      templatePath: "draft-templates/simple-content-page.html",
      htmlTitle:
        "Supercar & Exotic Vehicle Mobile Mechanic | Ferrari, Lamborghini, McLaren | Nashville",
      metaDescription:
        "Specialized mobile mechanic for supercars, exotics, and luxury vehicles in Nashville. Ferrari, Lamborghini, McLaren, Porsche, and more. Factory-grade diagnostics, OEM parts, and make-specific expertise at your location.",
      widgets: widgetData,
    },
  );
  console.log(`✅ Updated page ${PAGE_ID}`);
  console.log(`   Template: ${response.templatePath}`);
  console.log(`   State: ${response.state}`);
  console.log(`   URL: https://mobilemechanicmusclenearme.com/high-end-vehicles`);
  return response;
}

// ── Main ─────────────────────────────────────────────────────
async function main() {
  console.log("🚀 Deploying High-End Vehicles Page\n");

  console.log("Updating page with working template + latest HTML...");
  await deployPage();

  console.log("\n✅ Done! Page should be live now.");
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  if (err.body) console.error("Details:", JSON.stringify(err.body, null, 2));
  process.exit(1);
});
