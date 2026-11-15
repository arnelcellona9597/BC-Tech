// Generates the 1200x630 social-share image for each page (brand black, monogram, page headline).
// Text is converted to outlined paths with opentype.js, so it looks the same everywhere.
import { readFileSync } from 'node:fs';
import opentype from 'opentype.js';
import sharp from 'sharp';

const here = (p) => new URL(p, import.meta.url);
const cinzel = opentype.loadSync(here('./og-cinzel.ttf').pathname);
const mont = opentype.loadSync(here('./og-montserrat.ttf').pathname);
const markSvg = readFileSync(here('../src/img/mark.svg'), 'utf8');

const r2 = (n) => Math.round(n * 100) / 100;

function glyphRun(font, str, size, tracking = 0) {
  let x = 0;
  let d = '';
  const glyphs = font.stringToGlyphs(str);
  glyphs.forEach((g, i) => {
    d += g.getPath(x, 0, size).toPathData(2);
    x += (g.advanceWidth * size) / font.unitsPerEm;
    if (i < glyphs.length - 1) x += (font.getKerningValue(g, glyphs[i + 1]) * size) / font.unitsPerEm + tracking;
  });
  return { d, width: x };
}

function wrap(font, str, size, tracking, maxWidth) {
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (glyphRun(font, t, size, tracking).width > maxWidth && line) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

// pull the three <path> elements out of the inline mark
const markPaths = [...markSvg.matchAll(/<path[^>]*>/g)].map((m) => m[0]);
const markGroup = (ink, slash) =>
  markPaths
    .map((p, i) => p.replace(/fill="currentColor"/, `fill="${ink}"`).replace(/class="mark-slash" fill="#C8102E"/, `fill="${slash}"`))
    .join('');

export async function ogImage({ headline, label = 'BC TECH', tagline = 'BUILT TO BRING YOU BUSINESS', domain }) {
  const W = 1200, H = 630, padX = 84;
  const lines = wrap(cinzel, headline, 66, 1, 700).slice(0, 4);
  const lh = 78;
  const blockH = lines.length * lh;
  const top = Math.max(210, (H - blockH) / 2 + 20);
  const head = lines.map((l, i) => `<path fill="#fff" transform="translate(${padX} ${r2(top + i * lh + 52)})" d="${glyphRun(cinzel, l, 66, 1).d}"/>`).join('');

  const brand = glyphRun(cinzel, 'BC', 30, 6);
  const tech = glyphRun(cinzel, 'TECH', 30, 6);
  const tag = glyphRun(mont, tagline, 17, 5.5);
  const dom = glyphRun(mont, domain.toUpperCase(), 16, 4);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<radialGradient id="g1" cx="100%" cy="0%" r="75%"><stop offset="0" stop-color="#C8102E" stop-opacity=".55"/><stop offset="1" stop-color="#C8102E" stop-opacity="0"/></radialGradient>
<radialGradient id="g2" cx="0%" cy="100%" r="55%"><stop offset="0" stop-color="#C8102E" stop-opacity=".22"/><stop offset="1" stop-color="#C8102E" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="#0B0B0C"/>
<rect width="${W}" height="${H}" fill="url(#g1)"/><rect width="${W}" height="${H}" fill="url(#g2)"/>
<g transform="translate(700 -20) scale(3.4)" opacity=".9">${markGroup('#17171A', '#2A0A11')}</g>
<g transform="translate(${padX} 70) scale(.28)">${markGroup('#fff', '#C8102E')}</g>
<g fill="#fff" transform="translate(${padX + 66} 106)"><path d="${brand.d}"/><path transform="translate(${r2(brand.width + 22)} 0)" d="${tech.d}"/></g>
<path fill="#C8102E" transform="translate(${padX + 66 + r2(brand.width + 11)} 96)" d="M0-5L5 0L0 5L-5 0Z"/>
<rect x="${padX}" y="${r2(top - 34)}" width="64" height="3" fill="#C8102E"/>
${head}
<path fill="#fff" fill-opacity=".8" transform="translate(${padX} ${H - 70})" d="${tag.d}"/>
<path fill="#C8102E" transform="translate(${padX} ${H - 40})" d="${dom.d}"/>
</svg>`;
  return sharp(Buffer.from(svg)).png({ palette: true, quality: 90, compressionLevel: 9 }).toBuffer();
}
