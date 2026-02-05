# HubSpot Connection & Setup Guide

## Overview

This document outlines the steps to connect to the client's existing HubSpot account and set up development access.

---

## 1. HubSpot Account Access

### Required Permissions

Request the following access from your client:

- **Super Admin** access (preferred for development)
- OR **Marketing Hub Pro/Enterprise** access with:
  - Website Pages
  - Landing Pages
  - Blog
  - Design Manager
  - Settings

### Access Methods

#### Option A: Direct User Account (Recommended)

1. Client adds your email as a user in HubSpot
2. Navigate to: **Settings → Users & Teams**
3. Client clicks **Create user** and adds your email
4. Select appropriate permissions
5. You'll receive invitation email

#### Option B: Developer Test Account

1. Use HubSpot Developer Test Portal
2. Clone client's design assets to test portal
3. Develop in test environment
4. Deploy to production when approved

---

## 2. HubSpot API Setup

### Create Private App for Programmatic Access

1. **Navigate to Settings:**
   - In HubSpot, go to **Settings → Integrations → Private Apps**

2. **Create Private App:**
   - Click **Create private app**
   - Name: `MMM Content Engine`
   - Description: `Nashville SEO content migration and development`

3. **Required Scopes:**
   Select the following scopes:
   - `cms.domains.read`
   - `cms.pages.read`
   - `cms.pages.write`
   - `cms.templates.read`
   - `cms.templates.write`
   - `cms.modules.read`
   - `cms.modules.write`
   - `cms.performance.read`

4. **Generate Token:**
   - Click **Create app**
   - Copy the generated access token
   - Store securely in `.env` file (see below)

---

## 3. Local Development Setup

### Install HubSpot CLI

```bash
# Install HubSpot CLI globally
npm install -g @hubspot/cli

# Verify installation
hs --version
```

### Configure Authentication

```bash
# Initialize HubSpot configuration
hs init

# Follow prompts:
# - Choose "Personal Access Key" or "OAuth2"
# - Enter your HubSpot account ID (Hub ID)
# - Enter your private app token (from step 2)
# - Set default account

# Verify connection
hs auth
```

### Create Environment File

Create `.env` file in project root:

```bash
# HubSpot Configuration
HUBSPOT_PORTAL_ID=your-portal-id-here
HUBSPOT_ACCESS_TOKEN=your-access-token-here
HUBSPOT_ACCOUNT_NAME=mobilemechanicmuscle

# Project Settings
NODE_ENV=development
```

**⚠️ Important:** Add `.env` to `.gitignore` to keep credentials secure

---

## 4. Download Existing Site Assets

### Using HubSpot CLI

```bash
# Create directory for existing site
mkdir existing-site
cd existing-site

# Fetch all website pages
hs fetch --portal=PORTAL_ID /

# Download specific components
hs fetch --portal=PORTAL_ID /templates
hs fetch --portal=PORTAL_ID /modules
hs fetch --portal=PORTAL_ID /css
hs fetch --portal=PORTAL_ID /js

# Download theme
hs fetch --portal=PORTAL_ID /themes
```

### Manual Audit (Backup Method)

If CLI issues occur:

1. Navigate to **Marketing → Website → Website Pages**
2. Export page list to CSV
3. Manually document each page:
   - URL
   - Title
   - Meta description
   - Template used
   - Last modified date

---

## 5. Set Up Version Control

### Initialize Git Repository

```bash
# Already initialized, but add proper .gitignore
cat >> .gitignore << EOL
# Environment variables
.env
.env.local

# HubSpot CLI
.hubspot

# Node modules
node_modules/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# Build outputs
dist/
build/

# Client data
client-assets/
backups/
EOL

# Initial commit
git add .
git commit -m "Initial project setup with HubSpot connection"
```

---

## 6. Create Staging Portal

### Option A: Sandbox Portal (HubSpot Pro/Enterprise)

If client has Pro or Enterprise:

1. Navigate to **Settings → Account Setup → Sandbox**
2. Click **Create sandbox**
3. Name: `MMM Staging - SEO Migration`
4. This creates a clone of production

### Option B: Developer Test Account

Free option for development:

1. Go to [HubSpot Developer Portal](https://developers.hubspot.com/)
2. Sign in with your HubSpot developer account
3. Create new test account
4. Note: Test accounts have limitations (no custom domains)

### Configure Staging in CLI

```bash
# Add staging account to CLI
hs auth

# When prompted, add second account:
# Account Name: mmm-staging
# Portal ID: [staging-portal-id]
# Access Token: [staging-token]

# Switch between accounts:
hs accounts list
hs accounts use mmm-staging
```

---

## 7. HubSpot Design Manager Access

### Navigate to Design Manager

1. **Main Navigation:** Marketing → Files and Templates → Design Manager
2. **View structure:**
   - Templates
   - Modules
   - CSS files
   - JavaScript files
   - Layouts

### Identify Current Theme

1. Check **Settings → Website → Pages**
2. Note the theme name
3. Document any custom modules in use

---

## 8. HubSpot API Testing

### Test API Connection

Create `test-connection.js`:

```javascript
require("dotenv").config();
const axios = require("axios");

const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

async function testConnection() {
  try {
    // Test pages API
    const response = await axios.get(
      `https://api.hubapi.com/cms/v3/pages/site-pages`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      },
    );

    console.log("✓ Connected successfully!");
    console.log(`Found ${response.data.total} pages`);
    console.log(
      "Sample pages:",
      response.data.results.slice(0, 3).map((p) => p.name),
    );
  } catch (error) {
    console.error(
      "✗ Connection failed:",
      error.response?.data || error.message,
    );
  }
}

testConnection();
```

Run test:

```bash
npm install axios dotenv
node test-connection.js
```

---

## 9. Access Verification Checklist

Before proceeding, verify:

- [ ] Can log into HubSpot portal
- [ ] Have appropriate permissions (Marketing Hub access)
- [ ] HubSpot CLI installed and authenticated
- [ ] Can fetch pages via CLI (`hs fetch`)
- [ ] Private app created with necessary scopes
- [ ] API token stored securely in `.env`
- [ ] Git repository initialized
- [ ] Staging/sandbox environment accessible
- [ ] Can access Design Manager
- [ ] Test API connection successful

---

## 10. Common Connection Issues

### Issue: "Authentication failed"

**Solution:** Verify token in `.env` matches HubSpot private app. Check for extra spaces.

### Issue: "Insufficient permissions"

**Solution:** Add missing scopes to private app in HubSpot settings.

### Issue: CLI can't find portal

**Solution:** Run `hs accounts list` to verify configuration. Use correct Portal ID.

### Issue: Sandbox not available

**Solution:** Client may not have Pro/Enterprise. Use developer test account instead.

---

## Next Steps

Once connected:

1. Run site audit ([see audit-checklist.md](audit-checklist.md))
2. Review existing content structure
3. Begin staging environment setup
4. Start migration planning

---

## Support Resources

- [HubSpot CLI Documentation](https://developers.hubspot.com/docs/cms/guides/getting-started-with-local-development)
- [HubSpot CMS API Reference](https://developers.hubspot.com/docs/api/cms/pages)
- [HubSpot Developer Community](https://community.hubspot.com/t5/CMS-Development/bd-p/cos-developers)
