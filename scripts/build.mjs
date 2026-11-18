// Builds the deployable site into /public from /src. Run: npm run build
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { transform } from 'esbuild';
import { renderPage } from '../src/lib/layout.mjs';
import { site } from '../src/data/site.mjs';
import { ogImage } from './og.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'public');
const BRAND = join(ROOT, 'brand', 'davao-byte', 'website');

const out = (...p) => join(OUT, ...p);
const write = (p, data) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, data); };
const hash = (s) => createHash('sha1').update(s).digest('hex').slice(0, 8);

// Remove only the generated files (never /public/api or .htaccess)
const GENERATED = ['index.html', '404.html', 'services', 'pricing', 'work', 'about', 'contact', 'privacy', 'guides', 'assets', 'sitemap.xml', 'robots.txt', 'site.webmanifest'];
for (const g of GENERATED) {
  const target = resolve(OUT, g);
  if (!target.startsWith(OUT + sep)) throw new Error(`Refusing to remove outside public/: ${target}`);
  rmSync(target, { recursive: true, force: true });
}
mkdirSync(OUT, { recursive: true });

// ---- static files (htaccess, php api) and brand icons
if (existsSync(join(SRC, 'static'))) cpSync(join(SRC, 'static'), OUT, { recursive: true });
for (const f of ['favicon.ico', 'favicon.svg', 'favicon-16.png', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png']) {
  cpSync(join(BRAND, f), out(f));
}

// ---- fonts
for (const f of readdirSync(join(SRC, 'fonts'))) cpSync(join(SRC, 'fonts', f), out('assets', 'fonts', f));

// ---- CSS (inlined into every page: no render-blocking request)
const cssSrc = ['base', 'components', 'effects', 'visuals', 'luxe', 'shell', 'scene', 'theme', 'mobile-perf'].map((n) => readFileSync(join(SRC, 'css', `${n}.css`), 'utf8')).join('\n');
const css = (await transform(cssSrc, { loader: 'css', minify: true })).code.trim();

// ---- JS (small, deferred, content-hashed)
const js = {};
for (const name of ['theme-init', 'main', 'shell', 'forms', 'booking', 'charts', 'pricing', 'particles', 'slider-full', 'phmap', 'popup', 'gtm']) {
  const code = (await transform(readFileSync(join(SRC, 'js', `${name}.js`), 'utf8'), { minify: true, target: 'es2019' })).code;
  const file = `${name}.${hash(code)}.js`;
  write(out('assets', 'js', file), code);
  js[name] = `/assets/js/${file}`;
}
const assets = {
  js,
  fonts: { cinzel: '/assets/fonts/cinzel-brand.woff2', playfair: '/assets/fonts/playfair-display-latin-wght-normal.woff2', montserrat: '/assets/fonts/montserrat-latin-wght-normal.woff2', peso: '/assets/fonts/peso-sign.woff2' },
};

// ---- pages
const pageNames = ['home', 'services', 'service-detail', 'guides', 'pricing', 'work', 'about', 'contact', 'privacy', 'notfound'];
const pages = [];
for (const n of pageNames) {
  const mod = await import(pathToFileURL(join(SRC, 'pages', `${n}.mjs`)).href);
  if (mod.entries) pages.push(...mod.entries); else pages.push(mod);
}
const squash = (h) => h.replace(/^[ \t]+/gm, '').replace(/\n{2,}/g, '\n');
for (const { meta, body } of pages) {
  write(out(meta.file), squash(renderPage({ meta, body: body(), css, assets })));
}

// ---- social share images (one per page, generated from the headline)
mkdirSync(out('assets', 'img', 'og'), { recursive: true });
for (const { meta } of pages) {
  if (meta.key === 'notfound') continue;
  write(out(meta.ogImage), await ogImage({ headline: meta.ogHeadline, domain: new URL(site.url).host }));
}

// ---- sitemap, robots, manifest
const urls = pages.filter((p) => !p.meta.skipSitemap).map(({ meta }) => `  <url>
    <loc>${site.url}${meta.path}</loc>
    <lastmod>${site.built}</lastmod>
    <changefreq>${meta.key === 'home' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${meta.priority || '0.5'}</priority>
  </url>`).join('\n');
write(out('sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
write(out('robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site.url}/sitemap.xml\n`);
write(out('site.webmanifest'), JSON.stringify({
  name: site.name,
  short_name: site.name,
  description: site.tagline,
  lang: site.lang,
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: site.themeColor,
  theme_color: site.themeColor,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
  ],
}, null, 2) + '\n');

console.log(`Built ${pages.length} pages. CSS ${(css.length / 1024).toFixed(1)} KB (inlined). JS: ${Object.keys(js).join(', ')}.`);
