// Local preview server: clean URLs, Brotli/gzip, long caching for assets (like the real host),
// and /api/*.php handled by PHP's built-in server. Run: npm run serve  (default http://localhost:8080)
import http from 'node:http';
import { spawn } from 'node:child_process';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { join, extname, resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const PORT = Number(process.env.PORT || 8080);
const PHP_PORT = PORT + 1;

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};
const compressible = new Set(['.html', '.css', '.js', '.json', '.webmanifest', '.xml', '.txt', '.svg', '.ico']);

const php = spawn('php', ['-S', `127.0.0.1:${PHP_PORT}`, '-t', ROOT], { stdio: ['ignore', 'ignore', 'inherit'] });
process.on('exit', () => php.kill());
process.on('SIGINT', () => process.exit());

const secure = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let path = decodeURIComponent(url.pathname);

  if (path.startsWith('/api/')) {
    const proxy = http.request({ host: '127.0.0.1', port: PHP_PORT, path: req.url, method: req.method, headers: req.headers }, (r) => {
      res.writeHead(r.statusCode, r.headers);
      r.pipe(res);
    });
    proxy.on('error', () => { res.writeHead(502); res.end('PHP unavailable'); });
    req.pipe(proxy);
    return;
  }

  let file = resolve(ROOT, '.' + path);
  if (!file.startsWith(ROOT + sep) && file !== ROOT) { res.writeHead(403); return res.end('Forbidden'); }
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!path.endsWith('/')) { res.writeHead(301, { Location: path + '/' + url.search }); return res.end(); }
    file = join(file, 'index.html');
  }
  let status = 200;
  if (!existsSync(file)) { file = join(ROOT, '404.html'); status = 404; }

  const ext = extname(file);
  const headers = { 'Content-Type': types[ext] || 'application/octet-stream', ...secure };
  const immutable = path.startsWith('/assets/') && ext !== '.html';
  headers['Cache-Control'] = immutable ? 'public, max-age=31536000, immutable' : 'no-cache';
  if (compressible.has(ext) && (req.headers['accept-encoding'] || '').match(/br|gzip/)) {
    const buf = await readFile(file);
    const br = /\bbr\b/.test(req.headers['accept-encoding']);
    const body = br ? brotliCompressSync(buf) : gzipSync(buf);
    headers['Content-Encoding'] = br ? 'br' : 'gzip';
    headers['Vary'] = 'Accept-Encoding';
    headers['Content-Length'] = body.length;
    res.writeHead(status, headers);
    return res.end(body);
  }
  res.writeHead(status, { ...headers, 'Content-Length': statSync(file).size });
  createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`BC Tech preview: http://localhost:${PORT}  (PHP on ${PHP_PORT})`));
