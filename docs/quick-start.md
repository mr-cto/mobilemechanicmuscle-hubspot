# Quick Start: First Day Setup

## Overview

This guide gets you operational on Day 1 of the Mobile Mechanic Muscle project.

---

## ☑️ Before You Begin

Have these ready from the client:

- [ ] HubSpot account email invitation
- [ ] Portal ID (Hub ID)
- [ ] Business contact information:
  - [ ] Phone number
  - [ ] Email address
  - [ ] Business address
  - [ ] Logo files
  - [ ] Established year

---

## 🔧 Local Setup (30 minutes)

### 1. Install HubSpot CLI

```bash
# Install globally
npm install -g @hubspot/cli

# Verify installation
hs --version
```

### 2. Clone Project Repository

```bash
# Navigate to your workspace
cd ~/Code

# Clone this repository (if not already)
git clone [REPOSITORY_URL] MMM-D\&G
cd MMM-D\&G
```

### 3. Create Environment File

```bash
# Create .env file
touch .env

# Add to .env:
cat > .env << 'EOL'
# HubSpot Configuration
HUBSPOT_PORTAL_ID=
HUBSPOT_ACCESS_TOKEN=
HUBSPOT_ACCOUNT_NAME=mobilemechanicmuscle

# Project Settings
NODE_ENV=development
EOL
```

**Don't fill in credentials yet - we'll get these in next steps**

---

## 🔐 HubSpot Access (15 minutes)

### 1. Accept HubSpot Invitation

- Check email for HubSpot invitation
- Click "Accept invitation"
- Set password and log in
- Note: You should see client's portal

### 2. Get Portal ID

Once logged into HubSpot:

1. Click **Settings** (gear icon, bottom left)
2. Navigate to **Account Setup → Account Dashboard**
3. Find **Hub ID** (usually at top right)
4. Copy this number (e.g., `12345678`)
5. Add to your `.env` file:
   ```
   HUBSPOT_PORTAL_ID=12345678
   ```

### 3. Create Private App

1. In HubSpot, go to **Settings → Integrations → Private Apps**
2. Click **Create private app**
3. Name: `MMM Content Engine`
4. Description: `Nashville SEO content migration and development`
5. Go to **Scopes** tab
6. Select these scopes:
   - `cms.domains.read`
   - `cms.pages.read`
   - `cms.pages.write`
   - `cms.templates.read`
   - `cms.templates.write`
   - `cms.modules.read`
   - `cms.modules.write`
   - `cms.performance.read`
7. Click **Create app**
8. Copy the access token shown (only shown once!)
9. Add to your `.env` file:
   ```
   HUBSPOT_ACCESS_TOKEN=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

### 4. Authenticate HubSpot CLI

```bash
# Initialize HubSpot CLI
hs init

# Follow prompts:
# ? Enter your personal CMS access key: [paste access token]
# ? Name to identify this account: mobilemechanicmuscle
# ✓ Configuration saved to: ~/.hubspot.config.yml

# Verify connection
hs auth
# Should show: mobilemechanicmuscle (default)
```

---

## 📥 Download Existing Site (10 minutes)

```bash
# Create directory for existing site backup
mkdir existing-site
cd existing-site

# Fetch all current pages
hs fetch / .

# This will download:
# - All website pages
# - Templates
# - Modules
# - CSS/JS files
```

**Result:** You now have a complete backup of the current site

---

## 📊 Get Analytics Access (5 minutes)

### Google Analytics

Ask client for:

- [ ] Read access to Google Analytics property
- [ ] Note property ID

### Google Search Console

Ask client for:

- [ ] Owner or Full access to Search Console property
- [ ] Note property URL

---

## 📝 Fill in Business Config (10 minutes)

Edit [config/generation-settings.json](../config/generation-settings.json):

```json
{
  "business_info": {
    "name": "Mobile Mechanic Muscle",
    "phone": "615-XXX-XXXX", // ← Get from client
    "email": "info@example.com", // ← Get from client
    "website": "https://mobilemechanicmusclenearme.com",
    "logo_url": "https://...", // ← Get from HubSpot or client
    "established_year": "2015", // ← Get from client
    "rating": "4.9", // ← Get from Google Business
    "review_count": "127", // ← Get from Google Business
    "social_media": {
      "facebook": "https://...", // ← Get from client
      "google_business": "https://..." // ← Get from client
    }
  }
}
```

---

## ✅ Verification Checklist

Before proceeding to Day 2:

- [ ] HubSpot CLI installed and authenticated
- [ ] Can run `hs auth` successfully
- [ ] Have downloaded existing site with `hs fetch`
- [ ] `.env` file created with Portal ID and Token
- [ ] Business information filled in `generation-settings.json`
- [ ] Google Analytics access confirmed
- [ ] Google Search Console access confirmed
- [ ] Git repository initialized (`git status` works)

---

## 🚨 Troubleshooting

### "hs: command not found"

```bash
# Reinstall HubSpot CLI
npm install -g @hubspot/cli

# If still not working, check npm global path:
npm config get prefix
# Should be something like /usr/local or ~/.npm-global

# Add to PATH if needed:
export PATH=$PATH:$(npm config get prefix)/bin
```

### "Authentication failed"

- Verify your access token is correct (no extra spaces)
- Check token hasn't expired
- Verify you selected correct scopes when creating private app

### "Permission denied"

- Ask client to upgrade your HubSpot user permissions
- You need at least Marketing Hub access

### Can't find Portal ID

1. Log into HubSpot
2. Look at URL: `https://app.hubspot.com/contacts/12345678/...`
3. The number after `/contacts/` is your Portal ID

---

## 📚 Next Steps

Once verification checklist is complete:

1. **Day 2:** Begin [Audit Checklist](audit-checklist.md)
2. **Review:** [Project Roadmap](project-roadmap.md) for full timeline
3. **Reference:** [HubSpot Connection Guide](hubspot-connection.md) for detailed info

---

## 🆘 Need Help?

**HubSpot CLI Issues:**

- [HubSpot CLI Documentation](https://developers.hubspot.com/docs/cms/guides/getting-started-with-local-development)
- [HubSpot Developer Forums](https://community.hubspot.com/t5/CMS-Development/bd-p/cos-developers)

**Project Questions:**

- Review [Project Roadmap](project-roadmap.md)
- Check [Migration Plan](migration-plan.md)

---

## ⏱️ Time Estimate

Total setup time: ~70 minutes

- Local setup: 30 min
- HubSpot access: 15 min
- Download site: 10 min
- Analytics access: 5 min
- Config update: 10 min

**You're ready to start the audit tomorrow! 🎉**
