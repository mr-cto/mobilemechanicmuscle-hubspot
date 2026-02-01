# Setup Guide - With Full Account Access

## Quick Setup (15 minutes)

Since you have full access to Gmail and HubSpot, here's your fast-track setup:

---

## Step 1: Create HubSpot Private App (5 min)

### In HubSpot:

1. Log in to client's HubSpot account
2. Go to **Settings** (gear icon) → **Integrations** → **Private Apps**
3. Click **Create private app**
   - **Name:** `MMM Content Engine - Dev Access`
   - **Description:** `Nashville SEO migration project - Development access`
4. Go to **Scopes** tab and select:

```
✓ cms.domains.read
✓ cms.pages.read
✓ cms.pages.write
✓ cms.templates.read
✓ cms.templates.write
✓ cms.modules.read
✓ cms.modules.write
✓ cms.performance.read
```

5. Click **Create app**
6. **COPY THE TOKEN** (only shown once!) - looks like: `pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

---

## Step 2: Get Portal ID (1 min)

While in HubSpot:

1. Look at the browser URL: `https://app.hubspot.com/contacts/12345678/...`
2. The number after `/contacts/` is your **Portal ID**
3. OR go to **Settings** → **Account Setup** → **Account Dashboard** (top right)

---

## Step 3: Set Up Local Environment (5 min)

### Install HubSpot CLI:

```bash
# If you haven't already
npm install -g @hubspot/cli
```

### Create `.env` file:

```bash
cat > .env << 'EOL'
# HubSpot Configuration
HUBSPOT_PORTAL_ID=12345678
HUBSPOT_ACCESS_TOKEN=pat-na1-your-token-here
HUBSPOT_ACCOUNT_NAME=mobilemechanicmuscle

# Project Settings
NODE_ENV=development
EOL
```

**Replace with your actual values:**
- `HUBSPOT_PORTAL_ID=` [paste Portal ID]
- `HUBSPOT_ACCESS_TOKEN=` [paste the token you copied]

### Initialize HubSpot CLI:

```bash
# Configure CLI
hs init

# When prompted:
# - Paste your access token
# - Account name: mobilemechanicmuscle

# Verify connection
hs auth
# Should show: mobilemechanicmuscle (default)
```

---

## Step 4: Download Current Site (5 min)

```bash
# Create backup directory
mkdir -p existing-site
cd existing-site

# Download everything
hs fetch / .

# This downloads:
# - All pages
# - Templates
# - Modules
# - CSS/JS files
```

---

## Step 5: Get Business Information from HubSpot

While you're in their HubSpot account, grab this info:

### In HubSpot Settings:

1. **Business Info:** Settings → General → Company Information
   - Business name
   - Phone number
   - Email
   - Address
   - Founded year

2. **Logo:** Marketing → Files → Find logo image
   - Right-click → Copy URL
   - Should be like: `https://12345678.fs1.hubspotusercontent-na1.net/...`

3. **Social Media:** Settings → Marketing → Social → Connected accounts
   - Facebook URL
   - Google Business Profile URL (if linked)

### Update config file:

Edit `config/generation-settings.json` with the info you found:

```json
{
  "business_info": {
    "name": "Mobile Mechanic Muscle",
    "phone": "615-XXX-XXXX",     // ← From HubSpot
    "email": "info@example.com",  // ← From HubSpot
    "website": "https://mobilemechanicmusclenearme.com",
    "logo_url": "https://...",    // ← From HubSpot Files
    "established_year": "2015",   // ← From Company Info
    "rating": "4.9",              // ← Google Business (or estimate)
    "review_count": "127"         // ← Google Business (or estimate)
  }
}
```

---

## Step 6: Get Google Analytics Access

### In Gmail:

1. Search for "Google Analytics" in client's Gmail
2. Should find GA property info or invite emails
3. Or ask client: "What's the Google Analytics property ID?"

### If you need access:

1. Go to [analytics.google.com](https://analytics.google.com)
2. Sign in with client's Gmail
3. Note the property (should be their website)
4. Add your own email as a user (if needed):
   - Admin → Property Access Management
   - Add your email with Viewer permissions

---

## Step 7: Get Google Search Console Access

### In Gmail:

Search for "Google Search Console" or "Search Console"

### Access Search Console:

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Sign in with client's Gmail
3. Should see their website property
4. Add yourself if needed:
   - Settings → Users and permissions
   - Add your email with Full permissions

---

## ✅ Verification Checklist

Run these commands to verify everything works:

```bash
# Test HubSpot CLI connection
hs auth
# Should show: mobilemechanicmuscle (default)

# Test fetching a page list
hs list pages
# Should show list of pages

# Verify git is set up
git status
# Should show untracked files (no errors)

# Check config file exists
cat config/generation-settings.json | grep phone
# Should show phone number if you filled it in
```

**All working?** You're ready to start the audit! 🎉

---

## 🚀 Your Next Actions

### Today (30 min):
1. ✅ API access configured
2. ✅ Site downloaded
3. ✅ Business info collected
4. 📋 Start [audit-checklist.md](audit-checklist.md) - complete what you can today

### Tomorrow (2-3 hours):
1. Finish audit checklist
2. Run analytics review (GA + GSC)
3. Document findings
4. Test generate first content sample (Brake Repair page)

---

## 📊 Quick Audit While You're In HubSpot

Since you're already logged in, capture these now:

### Page Count:
- Marketing → Website → Website Pages → Count total pages

### Current Traffic:
- Reports → Analytics Tools → Traffic Analytics
- Note organic sessions last 30 days: _______

### Forms:
- Marketing → Lead Capture → Forms
- Count active forms: _______

### Blog Status:
- Marketing → Website → Blog
- Active? Yes/No: _______
- Total posts: _______

### Domain Settings:
- Settings → Website → Domains & URLs
- Primary domain: _______
- SSL Active? Yes/No: _______

**Save these numbers** - you'll need them for the audit!

---

## 🆘 Quick Troubleshooting

### "Invalid token" error:
- Token might have been revoked
- Go back to HubSpot → Settings → Private Apps
- Delete old app, create new one
- Get new token

### Can't fetch pages:
```bash
# Try with specific portal ID
hs fetch --portal=12345678 / .
```

### CLI asking for account:
```bash
# Use the configured account
hs accounts use mobilemechanicmuscle
```

---

## 📁 File Organization

Your workspace structure:

```
MMM-D&G/
├── .env                    ← Your API credentials (git ignored)
├── existing-site/          ← Downloaded HubSpot site (git ignored)
├── config/                 ← Fill in business info
├── docs/                   ← Your workflow guides
└── [other project files]
```

---

## Next: Start the Audit

Open [audit-checklist.md](audit-checklist.md) and begin filling it out!

**Time estimate:** 2-3 hours for complete audit
