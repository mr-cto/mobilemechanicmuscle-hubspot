/**
 * fix-and-deploy.js
 * ─────────────────────────────────────────────────
 * All-in-one script to:
 *   1. Create/verify the blank-page template in HubSpot Design Manager
 *   2. Find the File Manager URLs for hero-video.mp4 and bleed-image.png
 *   3. Update the page HTML with those URLs
 *   4. Re-deploy the page content
 *   5. Publish the page
 *
 * Usage:  node scripts/fix-and-deploy.js
 */

import { config as loadEnv } from "dotenv";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

loadEnv();

const ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const PAGE_ID = "210210284161"; // Already-created high-end vehicles page

if (!ACCESS_TOKEN) {
  console.error("❌ Missing HUBSPOT_ACCESS_TOKEN in .env");
  process.exit(1);
}

/** Convenience wrapper for HubSpot API calls */
async function hs(method, path, body) {
  const opts = {
    method,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  };
  if (body) opts.body = typeof body === "string" ? body : JSON.stringify(body);
  const res = await fetch(`https://api.hubapi.com${path}`, opts);
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { status: res.status, ok: res.ok, json, text };
}

/** Raw PUT for source-code uploads (content-type: text/html) */
async function hsRawPut(path, htmlContent) {
  const res = await fetch(`https://api.hubapi.com${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "text/html",
    },
    body: htmlContent,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { status: res.status, ok: res.ok, json, text };
}

// ─────────────────────────────────────────────────
// STEP 1: Create blank-page template
// ─────────────────────────────────────────────────
async function ensureTemplate() {
  console.log("─── Step 1: Ensure blank-page template exists ───\n");

  const templateContent = readFileSync(
    join(__dirname, "../src/templates/blank-page.html"),
    "utf-8",
  );

  const templatePath = "draft-templates/blank-page.html";

  // Check if it already exists via source code API
  const check = await hs(
    "GET",
    `/cms/v3/source-code/${PORTAL_ID}/published/${templatePath}`,
  );

  if (check.ok) {
    console.log(`✅ Template already exists at ${templatePath}\n`);
    return true;
  }

  console.log(
    `   Template not found (${check.status}). Attempting creation...\n`,
  );

  // Method 1: PUT to source-code API (published environment)
  console.log("   Trying: Source Code API PUT (published)...");
  const put1 = await hsRawPut(
    `/cms/v3/source-code/${PORTAL_ID}/published/${templatePath}`,
    templateContent,
  );
  if (put1.ok) {
    console.log(`   ✅ Template created via Source Code API (published)\n`);
    return true;
  }
  console.log(`   ↳ ${put1.status}: ${put1.json?.message || put1.text}\n`);

  // Method 2: POST to source-code API with JSON body
  console.log("   Trying: Source Code API POST (JSON body)...");
  const post1 = await hs(
    "POST",
    `/cms/v3/source-code/${PORTAL_ID}/published`,
    {
      path: templatePath,
      content: templateContent,
    },
  );
  if (post1.ok) {
    console.log(`   ✅ Template created via Source Code API POST\n`);
    return true;
  }
  console.log(`   ↳ ${post1.status}: ${post1.json?.message || post1.text}\n`);

  // Method 3: PUT to source-code API (developer/draft environment)
  console.log("   Trying: Source Code API PUT (developer env)...");
  const put2 = await hsRawPut(
    `/cms/v3/source-code/${PORTAL_ID}/developer/${templatePath}`,
    templateContent,
  );
  if (put2.ok) {
    console.log(`   ✅ Template created in developer env\n`);
    // Now publish it
    console.log("   Publishing developer → published...");
    const pub = await hs(
      "POST",
      `/cms/v3/source-code/${PORTAL_ID}/publish/${templatePath}`,
    );
    if (pub.ok) {
      console.log(`   ✅ Template published\n`);
    } else {
      console.log(
        `   ⚠️  Publish step returned ${pub.status} — may need manual publish\n`,
      );
    }
    return true;
  }
  console.log(`   ↳ ${put2.status}: ${put2.json?.message || put2.text}\n`);

  // Method 4: Create via the Design Manager templates API
  console.log("   Trying: Design Manager Templates API...");
  const tmpl = await hs("POST", `/content/api/v4/pages/templates`, {
    source: templateContent,
    path: templatePath,
    is_available_for_new_content: true,
    template_type: 4, // page template
    label: "Blank Page (No Header/Footer)",
  });
  if (tmpl.ok) {
    console.log(`   ✅ Template created via Templates API\n`);
    return true;
  }
  console.log(`   ↳ ${tmpl.status}: ${tmpl.json?.message || tmpl.text}\n`);

  // Method 5: Try the CMS v3 templates endpoint
  console.log("   Trying: CMS v3 Templates API...");
  const tmpl2 = await hs("POST", `/cms/v3/templates`, {
    source: templateContent,
    path: templatePath,
    is_available_for_new_content: true,
    template_type: "PAGE",
    label: "Blank Page (No Header/Footer)",
  });
  if (tmpl2.ok) {
    console.log(`   ✅ Template created via CMS v3 Templates API\n`);
    return true;
  }
  console.log(`   ↳ ${tmpl2.status}: ${tmpl2.json?.message || tmpl2.text}\n`);

  console.log("   ❌ All API methods failed.\n");
  console.log("   📋 Manual fix: Upload the template through HubSpot UI:");
  console.log("      1. Go to: Settings → Tools → Design Manager");
  console.log("      2. Create folder: draft-templates");
  console.log('      3. New file → HTML + HubL → paste blank-page.html contents');
  console.log("      4. Save as: blank-page.html inside draft-templates/");
  console.log("      5. Click 'Publish to live page'\n");
  return false;
}

// ─────────────────────────────────────────────────
// STEP 2: Find File Manager URLs for assets
// ─────────────────────────────────────────────────
async function getAssetUrls() {
  console.log("─── Step 2: Find File Manager URLs for assets ───\n");

  const assets = {};

  // Search for hero-video.mp4
  const videoSearch = await hs(
    "GET",
    `/filemanager/api/v3/files/search?name=hero-video.mp4&limit=5`,
  );
  if (videoSearch.ok && videoSearch.json?.results?.length > 0) {
    const video = videoSearch.json.results[0];
    assets.heroVideo = video.url;
    console.log(`   🎬 hero-video.mp4: ${video.url}`);
  } else {
    // Try alternate search
    const alt = await hs(
      "GET",
      `/filemanager/api/v3/files/search?name=hero-video&limit=5`,
    );
    if (alt.ok && alt.json?.results?.length > 0) {
      assets.heroVideo = alt.json.results[0].url;
      console.log(`   🎬 hero-video.mp4: ${assets.heroVideo}`);
    } else {
      console.log("   ⚠️  hero-video.mp4 not found in File Manager");
      // Try files API v3
      const files = await hs(
        "GET",
        `/files/v3/files/search?name=hero-video&limit=5`,
      );
      if (files.ok && files.json?.results?.length > 0) {
        assets.heroVideo = files.json.results[0].url;
        console.log(`   🎬 hero-video.mp4 (v3): ${assets.heroVideo}`);
      }
    }
  }

  // Search for bleed-image.png
  const imgSearch = await hs(
    "GET",
    `/filemanager/api/v3/files/search?name=bleed-image.png&limit=5`,
  );
  if (imgSearch.ok && imgSearch.json?.results?.length > 0) {
    const img = imgSearch.json.results[0];
    assets.bleedImage = img.url;
    console.log(`   🖼️  bleed-image.png: ${img.url}`);
  } else {
    const alt = await hs(
      "GET",
      `/filemanager/api/v3/files/search?name=bleed-image&limit=5`,
    );
    if (alt.ok && alt.json?.results?.length > 0) {
      assets.bleedImage = alt.json.results[0].url;
      console.log(`   🖼️  bleed-image.png: ${assets.bleedImage}`);
    } else {
      const files = await hs(
        "GET",
        `/files/v3/files/search?name=bleed-image&limit=5`,
      );
      if (files.ok && files.json?.results?.length > 0) {
        assets.bleedImage = files.json.results[0].url;
        console.log(`   🖼️  bleed-image.png (v3): ${assets.bleedImage}`);
      }
    }
  }

  // If neither search worked, list all files in high-end-vehicles folder
  if (!assets.heroVideo && !assets.bleedImage) {
    console.log("\n   Searching for all files in /high-end-vehicles/ folder...");
    const folder = await hs(
      "GET",
      `/filemanager/api/v3/files/search?path=/high-end-vehicles&limit=20`,
    );
    if (folder.ok && folder.json?.results?.length > 0) {
      for (const f of folder.json.results) {
        console.log(`   📁 ${f.name}: ${f.url}`);
        if (f.name.includes("hero-video")) assets.heroVideo = f.url;
        if (f.name.includes("bleed-image")) assets.bleedImage = f.url;
      }
    }

    // Also try the v3 files API folder search
    const folder2 = await hs(
      "GET",
      `/files/v3/files/search?path=high-end-vehicles&limit=20`,
    );
    if (folder2.ok && folder2.json?.results?.length > 0) {
      for (const f of folder2.json.results) {
        console.log(`   📁 ${f.name}: ${f.url}`);
        if (f.name.includes("hero-video")) assets.heroVideo = f.url;
        if (f.name.includes("bleed-image")) assets.bleedImage = f.url;
      }
    }
  }

  console.log("");
  return assets;
}

// ─────────────────────────────────────────────────
// STEP 3: Build page HTML with correct URLs
// ─────────────────────────────────────────────────
function buildPageHtml(assets) {
  console.log("─── Step 3: Build page HTML with asset URLs ───\n");

  let html = readFileSync(
    join(__dirname, "../src/pages/high-end-vehicles.html"),
    "utf-8",
  );

  if (assets.heroVideo) {
    html = html.replace(
      /src="hero-video\.mp4"/g,
      `src="${assets.heroVideo}"`,
    );
    console.log(`   ✅ Replaced hero-video.mp4 → ${assets.heroVideo}`);
  } else {
    console.log("   ⚠️  No hero-video URL found — leaving relative path");
  }

  if (assets.bleedImage) {
    html = html.replace(
      /url\('bleed-image\.png'\)/g,
      `url('${assets.bleedImage}')`,
    );
    console.log(`   ✅ Replaced bleed-image.png → ${assets.bleedImage}`);
  } else {
    console.log("   ⚠️  No bleed-image URL found — leaving relative path");
  }

  console.log("");
  return html;
}

// ─────────────────────────────────────────────────
// STEP 4: Update the page in HubSpot
// ─────────────────────────────────────────────────
async function updatePage(htmlContent) {
  console.log("─── Step 4: Update page content ───\n");

  const widgetData = {
    main_content: {
      body: {
        html: htmlContent,
      },
    },
  };

  const updatePayload = {
    name: "Luxury, Exotic & Supercar Service - Mobile Mechanic Muscle",
    htmlTitle:
      "Supercar & Exotic Vehicle Mobile Mechanic | Ferrari, Lamborghini, McLaren | Nashville",
    metaDescription:
      "Specialized mobile mechanic for supercars, exotics, and luxury vehicles in Nashville. Ferrari, Lamborghini, McLaren, Porsche, and more. Factory-grade diagnostics, OEM parts, and make-specific expertise at your location.",
    widgets: widgetData,
  };

  const res = await hs("PATCH", `/cms/v3/pages/site-pages/${PAGE_ID}`, updatePayload);

  if (res.ok) {
    console.log(`   ✅ Page updated successfully`);
    console.log(`   State: ${res.json?.state}`);
    console.log(`   Template: ${res.json?.templatePath}`);
  } else {
    console.log(`   ❌ Update failed (${res.status}): ${res.json?.message || res.text}`);
    // Try with the older API endpoint
    console.log("   Retrying with PUT...");
    const res2 = await hs("PUT", `/cms/v3/pages/site-pages/${PAGE_ID}`, updatePayload);
    if (res2.ok) {
      console.log(`   ✅ Page updated (PUT method)`);
    } else {
      console.log(`   ❌ PUT also failed (${res2.status}): ${res2.json?.message || res2.text}`);
    }
  }
  console.log("");
}

// ─────────────────────────────────────────────────
// STEP 5: Publish the page
// ─────────────────────────────────────────────────
async function publishPage() {
  console.log("─── Step 5: Publish page ───\n");

  // First check current state
  const check = await hs("GET", `/cms/v3/pages/site-pages/${PAGE_ID}`);
  if (check.ok) {
    console.log(`   Current state: ${check.json?.state}`);
    console.log(`   Current template: ${check.json?.templatePath}`);
    console.log(`   Slug: ${check.json?.slug}`);
  }

  // Schedule publish immediately
  const pub = await hs(
    "POST",
    `/cms/v3/pages/site-pages/${PAGE_ID}/publish`,
  );
  if (pub.ok) {
    console.log(`   ✅ Page published!`);
  } else {
    console.log(
      `   ⚠️  Publish returned ${pub.status}: ${pub.json?.message || pub.text}`,
    );
    // If PATCH to set state works instead
    const patch = await hs("PATCH", `/cms/v3/pages/site-pages/${PAGE_ID}`, {
      state: "PUBLISHED",
    });
    if (patch.ok) {
      console.log(`   ✅ Page state set to PUBLISHED`);
    }
  }

  console.log(
    `\n   🌐 URL: https://mobilemechanicmusclenearme.com/high-end-vehicles\n`,
  );
}

// ─────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────
async function main() {
  console.log("\n🚀 Fix & Deploy: High-End Vehicles Page\n");
  console.log(`   Portal: ${PORTAL_ID}`);
  console.log(`   Page ID: ${PAGE_ID}`);
  console.log(`   Token: ${ACCESS_TOKEN.substring(0, 10)}...`);
  console.log("");

  // Step 1
  const templateOk = await ensureTemplate();

  // Step 2
  const assets = await getAssetUrls();

  // Step 3
  const html = buildPageHtml(assets);

  // Step 4
  await updatePage(html);

  // Step 5
  if (templateOk) {
    await publishPage();
  } else {
    console.log(
      "⚠️  Template not confirmed — page may still 404 until template is uploaded.\n",
    );
    console.log("After manually uploading the template, run:");
    console.log("   node -e \"fetch('https://api.hubapi.com/cms/v3/pages/site-pages/210210284161/publish', {method:'POST',headers:{Authorization:'Bearer '+process.env.HUBSPOT_ACCESS_TOKEN}}).then(r=>r.json()).then(console.log)\"");
  }

  console.log("\n✅ Done!\n");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
