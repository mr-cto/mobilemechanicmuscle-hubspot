Find-and-replace a string across all 6 managed page source files (the 4 standalone pages + 2 templates), report which files matched, and optionally trigger a deploy.

Arguments: `<old-string-or-@file> <new-string-or-@file> [--deploy]`

## What to do

1. **Resolve the strings:**
   - If `<old>` starts with `@`, read the contents of that file as the search string (allows multi-line patterns).
   - If `<new>` starts with `@`, read the contents of that file as the replacement.
   - Otherwise treat them as literal strings.
   - Use Python for the replace — it handles multi-line correctly and avoids the `sed` newline-escape mess.

2. **Run replace across the canonical 6 files:**
   ```python
   files = [
     'src/pages/all-services.html',
     'src/pages/request-service.html',
     'src/pages/muscle-cars.html',
     'src/pages/commercial-equipment.html',
     'src/templates/service-page.html',
     'src/templates/location-page.html',
   ]
   ```
   Note: `src/pages/high-end-vehicles.html` is intentionally excluded — it has a custom theme and patterns rarely apply identically there. If the user wants to include it, they should explicitly pass `--include-lux`.

3. **For each file:**
   - Read content
   - If `old_string in content`:
     - Write the replaced version
     - Report `Updated: <file>`
   - Else:
     - Report `SKIP (no match): <file>`

4. **Surface a count summary:**
   ```
   Updated 4 of 6 files. Skipped: src/pages/request-service.html, src/templates/location-page.html (no match)
   ```

5. **If `--deploy` was passed**, immediately invoke the deploy command:
   ```bash
   cd /Users/tomwash/Code/MMM-D\&G && node scripts/deploy-pages.js
   ```
   Report deploy success/failure summary.

6. **If NOT `--deploy`**, remind the user:
   ```
   Run `/deploy` to push these changes live.
   ```

## When to use this

Use it when you'd otherwise be running the same `Edit` tool call across multiple files for the same change. Examples from past work:
- Replacing `#quote-form` anchor with `/request-service` everywhere
- Adding a guard flag (`a.dataset.navFixApplied`) to inline scripts
- Rewording a CTA that appears in multiple hero sections

## When NOT to use this

- The change is structurally different per file (e.g., different selectors, different surrounding context). In that case, do separate Edit calls.
- The change should ALSO go to the generators (`scripts/lib/*Generator.js`). Bulk-edit only touches the 6 managed page files. The generators need separate edits — flag this to the user.
- The pattern only appears in one file. Just use Edit directly.

## Notes

- Service pages (`/services/*`) and location pages (`/locations/*`) are GENERATED at deploy time from `ServiceContentGenerator.js` and `LocationContentGenerator.js`. To affect those pages, edit the generators, not the templates in `src/templates/`. The `service-page.html` and `location-page.html` files in `src/templates/` are NOT used by the deploy script — they're legacy reference templates.
- For HTML attribute order or whitespace differences that would prevent a literal match, use Edit on each file individually instead.
