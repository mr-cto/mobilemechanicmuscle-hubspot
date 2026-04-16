/**
 * find-assets.js — Find HubSpot File Manager URLs for high-end vehicles assets
 */
import { config as loadEnv } from "dotenv";
loadEnv();

const TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

async function search(endpoint, label) {
  try {
    const res = await fetch(`https://api.hubapi.com${endpoint}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const data = await res.json();
    if (data.objects?.length > 0) {
      console.log(`\n${label} (objects):`);
      for (const f of data.objects) {
        console.log(`  ${f.name || f.title}: ${f.url || f.friendly_url || f.default_hosting_url}`);
      }
      return data.objects;
    }
    if (data.results?.length > 0) {
      console.log(`\n${label} (results):`);
      for (const f of data.results) {
        console.log(`  ${f.name}: ${f.url || f.defaultHostingUrl}`);
      }
      return data.results;
    }
    if (data.total_count === 0 || data.total === 0 || (Array.isArray(data) && data.length === 0)) {
      console.log(`\n${label}: no results`);
    } else {
      console.log(`\n${label} response keys:`, Object.keys(data));
      if (data.message) console.log(`  message: ${data.message}`);
    }
    return [];
  } catch (e) {
    console.log(`\n${label} error:`, e.message);
    return [];
  }
}

async function main() {
  console.log("🔍 Searching for high-end vehicles assets...\n");

  // Try Files API v3 (newer)
  await search(`/files/v3/files/search?name=hero-video`, "Files v3: hero-video");
  await search(`/files/v3/files/search?name=bleed-image`, "Files v3: bleed-image");

  // Try with path filter
  await search(`/files/v3/files/search?path=high-end-vehicles`, "Files v3: path search");

  // Try File Manager API v2 (older but sometimes has different results)
  await search(`/filemanager/api/v2/files?name=hero-video`, "FM v2: hero-video");
  await search(`/filemanager/api/v2/files?name=bleed-image`, "FM v2: bleed-image");

  // Search by folder
  await search(`/filemanager/api/v2/files?folder_path=/high-end-vehicles`, "FM v2: folder /high-end-vehicles");
  await search(`/filemanager/api/v2/files?folder_path=high-end-vehicles`, "FM v2: folder high-end-vehicles");

  // Try listing all files
  await search(`/filemanager/api/v2/files?limit=50&order_by=-updated`, "FM v2: recent 50 files");

  // Try Files v3 listing all
  await search(`/files/v3/files?limit=20&sort=-updatedAt`, "Files v3: recent 20");
}

main();
