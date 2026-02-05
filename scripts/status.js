import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const servicesConfig = JSON.parse(
  readFileSync(join(__dirname, "../config/services-config.json"), "utf-8"),
);
const locationsConfig = JSON.parse(
  readFileSync(join(__dirname, "../config/neighborhoods-config.json"), "utf-8"),
);

const mappingPath = join(__dirname, "../.hubspot-pages.json");

console.log("📊 Nashville SEO Content Engine - Status\n");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

// Check config
console.log("📋 Configuration:");
console.log(`   Services: ${servicesConfig.services.length}`);
console.log(`   Locations: ${locationsConfig.neighborhoods.length}`);
console.log(
  `   Total pages needed: ${servicesConfig.services.length + locationsConfig.neighborhoods.length}\n`,
);

// Check mapping
if (existsSync(mappingPath)) {
  const mapping = JSON.parse(readFileSync(mappingPath, "utf-8"));
  const pageCount = Object.keys(mapping.pages).length;
  const lastSync = new Date(mapping.lastSync).toLocaleString();

  console.log("✅ Page Mapping:");
  console.log(`   File: .hubspot-pages.json`);
  console.log(`   Pages mapped: ${pageCount}`);
  console.log(`   Last synced: ${lastSync}\n`);

  // Show which pages are mapped
  const servicePages = Object.keys(mapping.pages).filter((s) =>
    s.startsWith("services/"),
  );
  const locationPages = Object.keys(mapping.pages).filter((s) =>
    s.startsWith("locations/"),
  );

  console.log(`   Service pages (${servicePages.length}):`);
  servicePages.forEach((slug) => {
    const config = servicesConfig.services.find(
      (s) => `services/${s.slug}` === slug,
    );
    const status = config ? "✓" : "⚠️ not in config";
    console.log(`      ${status} ${slug}`);
  });

  console.log(`\n   Location pages (${locationPages.length}):`);
  locationPages.forEach((slug) => {
    const config = locationsConfig.neighborhoods.find(
      (n) => `locations/${n.slug}` === slug,
    );
    const status = config ? "✓" : "⚠️ not in config";
    console.log(`      ${status} ${slug}`);
  });

  // Check for missing pages
  const missingServices = servicesConfig.services.filter(
    (s) => !mapping.pages[`services/${s.slug}`],
  );
  const missingLocations = locationsConfig.neighborhoods.filter(
    (n) => !mapping.pages[`locations/${n.slug}`],
  );

  if (missingServices.length > 0 || missingLocations.length > 0) {
    console.log("\n⚠️  Missing from mapping:");
    missingServices.forEach((s) => console.log(`      services/${s.slug}`));
    missingLocations.forEach((n) => console.log(`      locations/${n.slug}`));
    console.log("\n   Run: node scripts/sync-page-ids.js");
  }
} else {
  console.log("⚠️  No page mapping found");
  console.log("   Run: node scripts/sync-page-ids.js\n");
}

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("📖 Quick Commands:\n");
console.log("   Sync page IDs:     node scripts/sync-page-ids.js");
console.log("   Deploy/update:     node scripts/deploy-pages.js");
console.log("   Clean duplicates:  node scripts/clean-duplicates.js");
console.log("   Check status:      node scripts/status.js");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
