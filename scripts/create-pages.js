#!/usr/bin/env node
/**
 * HubSpot Page Creation Script
 * Creates service and location pages via HubSpot API
 */

import { Client } from '@hubspot/api-client';
import { readFileSync } from 'fs';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config();

// Initialize HubSpot client
const hubspotClient = new Client({ 
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN 
});

// Load configurations
const servicesConfig = JSON.parse(
  readFileSync(join(__dirname, '../config/services-config.json'), 'utf-8')
);
const locationsConfig = JSON.parse(
  readFileSync(join(__dirname, '../config/neighborhoods-config.json'), 'utf-8')
);

/**
 * Create a HubSpot page
 */
async function createPage(pageData) {
  try {
    const response = await hubspotClient.cms.pages.sitePagesApi.create(pageData);
    console.log(`✅ Created: ${pageData.name} (${pageData.slug})`);
    return response;
  } catch (error) {
    console.error(`❌ Failed to create ${pageData.name}:`, error.message);
    if (error.body) {
      console.error('Details:', JSON.stringify(error.body, null, 2));
    }
    throw error;
  }
}

/**
 * Generate service page data
 */
function generateServicePage(service) {
  const isDraft = process.env.CREATE_AS_DRAFT === 'true';
  const useDraftUrls = process.env.USE_DRAFT_URLS === 'true';
  const slug = useDraftUrls 
    ? `draft/services/${service.slug}` 
    : `services/${service.slug}`;

  return {
    name: `${service.name} - Mobile Mechanic Muscle`,
    slug: slug,
    templatePath: '@hubspot/draft-templates/service-page.html',
    state: isDraft ? 'DRAFT' : 'PUBLISHED',
    metaDescription: `Professional ${service.name.toLowerCase()} service in Nashville. ASE-certified mobile mechanics come to your location. Fast, reliable, transparent pricing.`,
    htmlTitle: `${service.name} in Nashville | Mobile Mechanic Muscle`,
    // Set to noindex if draft
    ...(process.env.NOINDEX_DRAFTS === 'true' && isDraft && {
      metaRobots: ['NOINDEX', 'NOFOLLOW']
    }),
    widgets: {
      // Page content would go here
      // For now, using template defaults
    }
  };
}

/**
 * Generate location page data
 */
function generateLocationPage(location) {
  const isDraft = process.env.CREATE_AS_DRAFT === 'true';
  const useDraftUrls = process.env.USE_DRAFT_URLS === 'true';
  const slug = useDraftUrls 
    ? `draft/locations/${location.slug}` 
    : `locations/${location.slug}`;

  return {
    name: `Mobile Mechanic in ${location.name}, TN`,
    slug: slug,
    templatePath: '@hubspot/draft-templates/location-page.html',
    state: isDraft ? 'DRAFT' : 'PUBLISHED',
    metaDescription: `Mobile mechanic service in ${location.name}, TN. We come to your home or office. Professional auto repair at your location. Call for free quote.`,
    htmlTitle: `Mobile Mechanic in ${location.name}, TN | Mobile Mechanic Muscle`,
    ...(process.env.NOINDEX_DRAFTS === 'true' && isDraft && {
      metaRobots: ['NOINDEX', 'NOFOLLOW']
    }),
    widgets: {}
  };
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting HubSpot page creation...\n');
  console.log(`Portal ID: ${process.env.HUBSPOT_PORTAL_ID}`);
  console.log(`Draft mode: ${process.env.CREATE_AS_DRAFT}`);
  console.log(`Using draft URLs: ${process.env.USE_DRAFT_URLS}\n`);

  const pages = [];

  // Generate service pages
  console.log('📝 Generating service pages...');
  for (const service of servicesConfig.services) {
    pages.push({
      type: 'service',
      data: generateServicePage(service)
    });
  }

  // Generate location pages
  console.log('📍 Generating location pages...');
  for (const location of locationsConfig.locations) {
    pages.push({
      type: 'location',
      data: generateLocationPage(location)
    });
  }

  console.log(`\n📊 Total pages to create: ${pages.length}\n`);

  // Create pages
  let successCount = 0;
  let failCount = 0;

  for (const page of pages) {
    try {
      await createPage(page.data);
      successCount++;
      // Rate limiting - wait 500ms between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully created: ${successCount} pages`);
  console.log(`❌ Failed: ${failCount} pages`);
  console.log('='.repeat(50));
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { createPage, generateServicePage, generateLocationPage };
