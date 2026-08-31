#!/usr/bin/env node
/**
 * Build a standalone staging preview of the client-facing pages, for client
 * sign-off, deployable without a HubSpot token.
 *
 * WHY THIS EXISTS. `npm run full-deploy` pushes straight to the client's LIVE
 * HubSpot CMS, and it has been unavailable since the personal access key in
 * hubspot.config.yml expired 2026-05-03. That left no way to show Alex a change
 * before it is public. This builds the same pages into a static site that any
 * host can serve, so review happens somewhere that is not production.
 *
 * WHY IT IS SAFE TO SHOW A CLIENT.
 *   - noindex, nofollow in the meta, in robots.txt, and as an X-Robots-Tag
 *     header. The pages are near-duplicates of the live site and MUST NOT be
 *     indexed against it.
 *   - Form submissions are intercepted. src/pages/request-service.html POSTs
 *     directly to api.hsforms.com from page JS; left alone, a client clicking
 *     through the preview would file real leads into their own CRM. The shim
 *     below answers those calls locally and says so on screen.
 *   - reCAPTCHA is stubbed. Its site key is domain-locked to the live host, so
 *     without a stub the submit path hangs and the form looks broken.
 *
 * The page markup itself is copied byte-for-byte and rendered in an iframe, so
 * what the client signs off on is the real thing, not a re-render. All preview
 * chrome lives in the shell OUTSIDE the iframe.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src', 'pages');
const OUT = join(ROOT, 'preview');

/** Display names + order. A page absent here still builds, titled from its slug. */
const LABELS = {
  'request-service': 'Request Service',
  'high-end-vehicles': 'High-End Vehicles',
  'muscle-cars': 'Muscle Cars',
  'commercial-equipment': 'Commercial & Equipment',
  'all-services': 'All Services',
};
const ORDER = Object.keys(LABELS);

const titleize = (s) => LABELS[s] || s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Runs INSIDE the iframe, before the page's own inline script. Order matters:
 * the page captures `window.fetch` when its script runs, so the shim has to be
 * installed in <head>, above the fragment.
 */
const SHIM = `<script>
(function () {
  var INTERCEPT = /api\\.hsforms\\.com|forms\\.hubspot|hubapi\\.com/i;
  var realFetch = window.fetch ? window.fetch.bind(window) : null;

  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    if (INTERCEPT.test(url)) {
      toast('Preview only \\u2014 this form was NOT submitted. Nothing reached the CRM.');
      return Promise.resolve(new Response(
        JSON.stringify({ inlineMessage: 'Preview submission intercepted.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      ));
    }
    return realFetch ? realFetch(input, init) : Promise.reject(new Error('fetch unavailable'));
  };

  // Domain-locked on the live host; without this the submit path never resolves.
  // Assigned unconditionally, and the real api.js tag is stripped at build time —
  // if it loads it overwrites this stub and paints a red "Invalid domain" box
  // over the page, which is not what a client should see at sign-off.
  window.grecaptcha = {
    ready: function (cb) { try { cb(); } catch (e) {} },
    execute: function () { return Promise.resolve('preview-recaptcha-token'); },
  };

  function toast(msg) {
    try {
      var d = document.createElement('div');
      d.textContent = msg;
      d.setAttribute('style', [
        'position:fixed', 'left:50%', 'bottom:24px', 'transform:translateX(-50%)',
        'z-index:2147483647', 'max-width:min(560px,92vw)',
        'background:#111', 'color:#fff', 'padding:14px 18px', 'border-radius:10px',
        'border:1px solid #f5c518', 'box-shadow:0 8px 32px rgba(0,0,0,.45)',
        'font:500 14px/1.45 system-ui,-apple-system,Segoe UI,sans-serif',
        'text-align:center',
      ].join(';'));
      document.body.appendChild(d);
      setTimeout(function () { d.remove(); }, 6000);
    } catch (e) {}
  }
})();
<\/script>`;

/** reCAPTCHA's site key is registered to the live domain only. Loading it here
 *  overwrites the stub above and renders a red "Invalid domain for site key"
 *  error box on top of the page. Strip the tag; the stub answers in its place. */
const stripRecaptcha = (html) => html.replace(
  /<script\b[^>]*recaptcha\/api\.js[^>]*>\s*<\/script>/gi,
  '<!-- preview: reCAPTCHA api.js removed (site key is domain-locked); stubbed in <head> -->',
);

function pageDoc(slug, fragment) {
  fragment = stripRecaptcha(fragment);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>${titleize(slug)} — MMM staging preview</title>
${SHIM}
</head>
<body>
${fragment}
</body>
</html>
`;
}

function shell(slugs, builtAt) {
  const tabs = slugs.map((s, i) =>
    `<button class="tab${i === 0 ? ' on' : ''}" data-slug="${s}">${titleize(s)}</button>`).join('\n      ');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>Mobile Mechanic Muscle — Staging Preview</title>
<style>
  :root { --bg:#0f1113; --panel:#191c1f; --line:#2c3136; --ink:#e8eaed; --dim:#9aa2aa; --accent:#f5c518; }
  * { box-sizing:border-box; }
  html,body { margin:0; padding:0; height:100%; }
  body { background:var(--bg); color:var(--ink); font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;
         display:flex; flex-direction:column; }
  .bar { background:var(--panel); border-bottom:1px solid var(--line); padding:10px 16px;
         display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
  .badge { background:var(--accent); color:#111; font-weight:700; font-size:11px; letter-spacing:.09em;
           text-transform:uppercase; padding:5px 10px; border-radius:5px; white-space:nowrap; }
  .note { color:var(--dim); font-size:13px; }
  .note b { color:var(--ink); font-weight:600; }
  .spacer { flex:1 1 auto; }
  .tabs { display:flex; gap:6px; padding:9px 16px; background:var(--panel);
          border-bottom:1px solid var(--line); overflow-x:auto; }
  .tab { background:transparent; color:var(--dim); border:1px solid var(--line); border-radius:7px;
         padding:7px 13px; font:inherit; font-size:13.5px; cursor:pointer; white-space:nowrap; }
  .tab:hover { color:var(--ink); border-color:#3d444b; }
  .tab.on { background:var(--ink); color:#111; border-color:var(--ink); font-weight:600; }
  .widths { display:flex; gap:6px; }
  .w { background:transparent; color:var(--dim); border:1px solid var(--line); border-radius:7px;
       padding:6px 11px; font:inherit; font-size:12.5px; cursor:pointer; }
  .w.on { background:var(--accent); color:#111; border-color:var(--accent); font-weight:700; }
  .stage { flex:1 1 auto; display:flex; justify-content:center; overflow:auto; padding:14px; }
  .frame { width:100%; max-width:100%; height:100%; background:#fff; border:0; border-radius:8px;
           box-shadow:0 6px 28px rgba(0,0,0,.5); transition:max-width .18s ease; }
  .foot { padding:8px 16px; background:var(--panel); border-top:1px solid var(--line);
          color:var(--dim); font-size:12px; }
  @media (max-width:640px) { .widths { display:none; } }
</style>
</head>
<body>
  <div class="bar">
    <span class="badge">Staging preview</span>
    <span class="note">Not the live site. Nothing here is public, and <b>forms do not submit</b> — test them freely.</span>
    <span class="spacer"></span>
    <div class="widths">
      <button class="w on" data-w="100%">Desktop</button>
      <button class="w" data-w="820px">Tablet</button>
      <button class="w" data-w="414px">Phone</button>
    </div>
  </div>
  <div class="tabs">
      ${tabs}
  </div>
  <div class="stage"><iframe class="frame" id="stageFrame" title="Page preview" src="pages/${slugs[0]}.html"></iframe></div>
  <div class="foot">Built ${builtAt} · ${slugs.length} pages · review only, not indexed by search engines</div>
<script>
  var frame = document.getElementById('stageFrame');
  document.querySelectorAll('.tab').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.tab').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      frame.src = 'pages/' + b.dataset.slug + '.html';
    });
  });
  document.querySelectorAll('.w').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.w').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      frame.style.maxWidth = b.dataset.w;
    });
  });
<\/script>
</body>
</html>
`;
}

const STUB = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>Not part of this preview</title>
<style>
 body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0f1113;color:#e8eaed;
      font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif;padding:24px;text-align:center}
 .box{max-width:520px} h1{font-size:20px;margin:0 0 10px} p{color:#9aa2aa;margin:0}
</style></head>
<body><div class="box">
  <h1>This page isn't part of the preview</h1>
  <p>Location and individual service pages are generated on the live site and aren't
     included in this review build. The pages up for sign-off are in the tabs at the top.</p>
</div></body></html>
`;

function main() {
  // Clear generated output but keep `.vercel` — it holds the project link, and
  // wiping it would orphan the deployment onto a new project every build.
  if (existsSync(OUT)) {
    for (const entry of readdirSync(OUT)) {
      if (entry === '.vercel') continue;
      rmSync(join(OUT, entry), { recursive: true, force: true });
    }
  }
  mkdirSync(join(OUT, 'pages'), { recursive: true });

  const found = readdirSync(SRC).filter((f) => f.endsWith('.html')).map((f) => basename(f, '.html'));
  const slugs = [...ORDER.filter((s) => found.includes(s)), ...found.filter((s) => !ORDER.includes(s))];
  if (!slugs.length) { console.error('refused: no pages found in ' + SRC); process.exit(1); }

  for (const slug of slugs) {
    writeFileSync(join(OUT, 'pages', `${slug}.html`), pageDoc(slug, readFileSync(join(SRC, `${slug}.html`), 'utf8')));
    console.log(`  page  ${slug}`);
  }

  const builtAt = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  writeFileSync(join(OUT, 'index.html'), shell(slugs, builtAt));
  writeFileSync(join(OUT, 'not-in-preview.html'), STUB);
  writeFileSync(join(OUT, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

  // Root-relative links inside the pages (/all-services, /locations/nashville, ...)
  // would 404 here. Map the ones we built; send the rest to the stub so a click
  // during sign-off explains itself instead of showing a 404.
  writeFileSync(join(OUT, 'vercel.json'), JSON.stringify({
    $schema: 'https://openapi.vercel.sh/vercel.json',
    framework: null,
    headers: [{
      source: '/(.*)',
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
    }],
    rewrites: [
      ...slugs.map((s) => ({ source: `/${s}`, destination: `/pages/${s}.html` })),
      { source: '/locations/:slug*', destination: '/not-in-preview.html' },
      { source: '/services/:slug*', destination: '/not-in-preview.html' },
    ],
  }, null, 2) + '\n');

  console.log(`\nbuilt ${slugs.length} pages -> ${OUT}`);
  console.log('deploy:  npm run preview:deploy');
}

main();
