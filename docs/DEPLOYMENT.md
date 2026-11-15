# BC Tech website: setup, content and deployment

## 1. Run it on your computer

```bash
npm install        # first time only
npm run build      # builds src/ into public/
npm start          # build + preview at http://localhost:4173
```

The preview server also runs the PHP forms (needs `php` installed). Until SMTP is set up, emails are written to `public/api/storage/mail.log` instead of being sent.

## 2. Where things live

| What | Where |
|---|---|
| Site name, domain, phone, social links, opening hours, booking rules | `src/data/site.mjs` |
| Services, packages and prices, FAQs, case study text | `src/data/content.mjs` |
| Page layouts and wording | `src/pages/*.mjs` |
| Colors, fonts, spacing | `src/css/base.css` (variables at the top) |
| Scroll effects, menu, sliders | `src/js/main.js` |
| Form email code (PHP) | `src/static/api/` |
| Server rules (HTTPS, caching, security) | `src/static/.htaccess` |
| Approved logos and brand kit | `brand/` |

After any change run `npm run build`. The ready-to-upload site is the `public/` folder.

**Prices:** change them in `src/data/content.mjs` (`packages` and `addons`). The pricing page, home page and Google search data all update together.

**Domain:** the sitemap, canonical links and social previews use `site.url` in `src/data/site.mjs` (currently `https://bctech.com`).

## 3. Put it online (Z.com hosting, cPanel)

Do these in order:

1. **Turn on SSL** (free certificate) for the domain in cPanel. The `.htaccess` file forces HTTPS, so SSL must work first.
2. **Pick PHP 8.1 or newer** (cPanel > MultiPHP Manager) for the domain. PHP 7.4 also works.
3. **Create the mailbox** `info@bctech.com` (cPanel > Email Accounts). Optional: add a forwarder to `arnelcellona9597@gmail.com` (cPanel > Forwarders). The website also sends a copy (BCC) to that Gmail address by itself.
4. **Upload everything inside `public/`** to `public_html/` (File Manager or FTP). Turn on "Show hidden files" so `.htaccess` is included.
5. **Turn on real emails.** In `public_html/api/`, copy `config.example.php` to `config.php`, then edit it:
   - `'driver' => 'smtp'`
   - SMTP `host` (usually `mail.bctech.com`), `port` 587 with `'secure' => 'tls'` (or 465 with `'ssl'`)
   - `user` = `info@bctech.com` and its password
6. **Test:** send a message from the Contact page and book a call. Check that `info@bctech.com` and the Gmail address both receive them, and that the visitor gets the short confirmation email.

`config.php` is never committed to git, so the password stays off GitHub. If emails land in spam, ask Z.com to enable SPF and DKIM for the domain.

## 4. Before launch checklist

- [ ] Real phone / Viber / WhatsApp number in `src/data/site.mjs` (`phone`)
- [ ] Facebook page and other profiles in `src/data/site.mjs` (`social`). They feed the Google business data.
- [ ] Confirm the opening hours and booking time slots (`site.hours`, `site.booking` and the same values in `api/config.php`)
- [ ] LYFD screenshots, results and a client quote (see below)
- [ ] Have a lawyer review the Privacy page wording
- [ ] Submit `https://bctech.com/sitemap.xml` in Google Search Console
- [ ] Run Lighthouse on the live site (mobile and desktop). Local scores are 100 across the board; the live score also depends on the host.

## 5. Add the LYFD screenshots

The case study currently shows drawn placeholder browser frames.

1. Save optimized WebP images in `src/static/assets/img/work/` (for example `lyfd-home.webp`, about 1400px wide).
2. In `src/pages/work.mjs` and `src/pages/home.mjs`, replace the `browserMock(...)` call with an image, keeping the size attributes so the page does not jump:
   ```html
   <img src="/assets/img/work/lyfd-home.webp" width="1400" height="875" alt="LYFD homepage showing stainless steel kitchens" loading="lazy" decoding="async">
   ```
3. Run `npm run build`.

## 6. Git workflow

Work happens on branches, never straight on `main`:

```bash
git checkout -b feature/short-name
# edit, build, test
git add -A && git commit -m "Describe the change"
git push -u origin feature/short-name   # then open a pull request on GitHub
```

Commits use the project email `arnelcellona9597@gmail.com`.
