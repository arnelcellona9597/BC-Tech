// Turns the full-size AI originals in assets-src/ into small AVIF + WebP files for the site.
// Run: npm run images   (the build then copies src/static/ into public/)
// Output: src/static/assets/img/ai/<name>-<width>.avif|webp and src/data/images.json (sizes for the markup).
import { readdirSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname, resolve, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'assets-src');
const OUT = join(ROOT, 'src', 'static', 'assets', 'img', 'ai');
mkdirSync(OUT, { recursive: true });

// widths to produce per image (never larger than the original)
const plan = {
  'home-hero': [640, 960, 1280],
  'ind-cafe': [480, 800, 1200],
  'ind-shop': [480, 800, 1200],
  'ind-clinic': [480, 800, 1200],
  'ind-hotel': [480, 800, 1200],
  'ind-builder': [480, 800, 1200],
  'services-head': [480, 800, 1200],
  'contact-head': [480, 800, 1200],
};

const manifest = {};
const kb = (n) => (n / 1024).toFixed(0) + ' KB';
for (const file of readdirSync(SRC).filter((f) => f.endsWith('.png')).sort()) {
  const name = parse(file).name;
  const widths = plan[name];
  if (!widths) { console.log(`skip ${name} (not in plan)`); continue; }
  const meta = await sharp(join(SRC, file)).metadata();
  const ratio = meta.height / meta.width;
  manifest[name] = { ratio: +ratio.toFixed(4), variants: [] };
  const row = [];
  for (const w of widths.filter((x) => x <= meta.width)) {
    const h = Math.round(w * ratio);
    const base = sharp(join(SRC, file)).resize(w, h, { fit: 'cover', kernel: 'lanczos3' });
    await base.clone().avif({ quality: name === 'home-hero' ? 70 : 60, effort: 6 }).toFile(join(OUT, `${name}-${w}.avif`));
    await base.clone().webp({ quality: name === 'home-hero' ? 84 : 80, effort: 6 }).toFile(join(OUT, `${name}-${w}.webp`));
    manifest[name].variants.push({ w, h });
    row.push(`${w}w avif ${kb(statSync(join(OUT, `${name}-${w}.avif`)).size)} / webp ${kb(statSync(join(OUT, `${name}-${w}.webp`)).size)}`);
  }
  console.log(`${name}: ${row.join(' | ')}`);
}
writeFileSync(join(ROOT, 'src', 'data', 'images.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('manifest written');
