Deploy all managed pages via `node scripts/deploy-pages.js`, then optionally verify the CDN has flushed by polling URLs until they contain expected content.

Arguments: optional `--verify="<url-path>:<grep-pattern>"` pairs (repeatable)

## What to do

1. **Run the deploy:**
   ```bash
   cd /Users/tomwash/Code/MMM-D\&G && node scripts/deploy-pages.js
   ```
   - If the output shows `❌ Failed: 0 pages` → continue
   - If failures > 0 → report them and stop. Do NOT proceed to verify.

2. **For each `--verify="path:pattern"` argument**, poll the URL until cache flushes:
   ```bash
   until curl -s -L "https://mobilemechanicmusclenearme.com/<path>?nc=$(date +%s%N)" | grep -q "<pattern>"; do sleep 5; done
   ```
   Use a 120s timeout overall. If a verify fails to match in 120s, report it as `STILL CACHED` and move on.

3. **Output a summary block:**
   ```
   ✅ Deploy: 17 pages updated, 0 failed
   ✅ Verify (cache flushed): /<path1> contains "<pattern1>"
   ✅ Verify (cache flushed): /<path2> contains "<pattern2>"
   ```
   Or, if any verify timed out:
   ```
   ⚠️ /<path> still showing cached version after 120s — try hard refresh in browser
   ```

## Examples

- `/deploy` — just deploy, no verification
- `/deploy --verify="commercial-equipment:service-van.jpg"` — deploy then confirm the van photo is live on the commercial page
- `/deploy --verify="services/diagnostics:logoLinkApplied" --verify="locations/nashville:logoLinkApplied"` — deploy + spot-check two generated pages have the logo handler

## Notes

- The deploy script reads from `.hubspot-pages.json` for page-id mapping. If that file is stale, run `node scripts/sync-page-ids.js` first.
- HubSpot's CDN typically flushes within 30–60s. The 120s overall timeout is conservative.
- This command does NOT push `src/css/custom.css` — for that, use `/css-push`.
