Compress an image, stage it in /tmp (avoiding `.hsignore` issues), upload to HubSpot Files at `/mmm-client-photos/<name>`, and return the live URL ready to drop into HTML.

Arguments: `<source-path> [target-name] [--max-width=1400] [--quality=85] [--folder=/mmm-client-photos]`

## What to do

1. **Resolve the inputs:**
   - `<source-path>` is required. If it's a `~/Downloads/...` path or anywhere outside the project, that's fine.
   - `[target-name]` defaults to a slug derived from the source filename (lowercase, hyphenated, extension forced to `.jpg` unless source is already `.jpg`/`.png`/`.webp`).
   - `--max-width` defaults to `1400`. Use `1920` for hero images, `1400` for content, `800` for thumbnails.
   - `--quality` defaults to `85`. Drop to `75` for very large source files.
   - `--folder` defaults to `/mmm-client-photos` — change only if the user explicitly asks.

2. **Validate the source exists:**
   ```bash
   test -f "<source-path>" || echo "ERROR: source not found"
   ```
   Stop if it doesn't exist.

3. **Compress + format-convert via sips:**
   - For HEIC: `sips -s format jpeg -Z <max-width> -s formatOptions <quality> "<source>" --out "/tmp/mmm-upload/<target-name>"`
   - For PNG with `--target-name` ending in `.jpg`: same as HEIC (forces format conversion)
   - For JPG: `sips -Z <max-width> -s formatOptions <quality> "<source>" --out "/tmp/mmm-upload/<target-name>"`
   - For WebP/other: pass through with sips, no format conversion
   - Make sure `/tmp/mmm-upload/` exists: `mkdir -p /tmp/mmm-upload`

4. **Upload via the HubSpot CLI:**
   ```bash
   hs filemanager upload "/tmp/mmm-upload/<target-name>" "<folder>/<target-name>" --account=MMM
   ```
   Confirm `[SUCCESS]` in output. If error → report and stop.

5. **Build and verify the live URL:**
   ```bash
   URL="https://mobilemechanicmusclenearme.com/hs-fs/hubfs<folder>/<target-name>"
   curl -s -o /dev/null -w "%{http_code}" "$URL"
   ```
   Expect `200`. Note: HubSpot may take ~30s to make a newly-uploaded file public; if `404`, retry once after `sleep 30`.

6. **Report:**
   ```
   ✅ Compressed: <source> ($size_old → $size_new)
   ✅ Uploaded: <folder>/<target-name>
   ✅ Live URL (HTTP 200): https://mobilemechanicmusclenearme.com/hs-fs/hubfs<folder>/<target-name>
   ```
   Output the URL on its own final line so it's easy to copy into HTML.

## Examples

- `/upload-photo ~/Downloads/IMG_1234.heic suburban-rebuild.jpg` — convert HEIC, upload as suburban-rebuild.jpg
- `/upload-photo ./.tmp-photos/bmw-trio.jpg --max-width=1920` — large hero
- `/upload-photo ~/Downloads/photo.png logo-mark.png --max-width=400 --quality=90` — small, high-quality

## Notes

- `.tmp-photos/` is in `.hsignore`; **always stage in `/tmp/mmm-upload/`** before calling `hs filemanager upload`.
- Do not skip the compression step — original phone photos are often 8MB+ and bloat the page.
- After this command, you typically want to wire the URL into a page file and run `/deploy`.
