# SEO checklist for BC Tech

Everything that can be done in the code is done and checked by the build. This list covers what needs **you** (accounts, real information, time).

## Done in the website
- One `<h1>` per page, no skipped heading levels, unique titles and descriptions on all 20 pages.
- Canonical tag on every indexable page; the 404 page is `noindex` and has no canonical.
- JSON-LD structured data on every page (Organization, WebSite, ProfessionalService, WebPage, BreadcrumbList, plus Service, Article, FAQPage, OfferCatalog where they apply).
- `sitemap.xml` (19 pages) and `robots.txt` are generated on every build.
- Eight service pages, three guides and a guides index, all linked from the footer, the services page and the home page.
- HTTPS redirect, one address (no `www`), compression, caching and security headers in `.htaccess`.
- Lighthouse 100 (performance, accessibility, best practices, SEO) and zero axe accessibility violations on the pages tested.

## Before go-live (needs you)
1. **Pick the real domain.** Change `url` and `email` in `src/data/site.mjs`, run `npm run build`, and upload. Canonicals, sitemap, schema and share images all update. Also update `site.allowed_hosts` and the sender address in `public/api/config.php`.
2. **Add social links** (Facebook, LinkedIn, YouTube, Messenger, WhatsApp) in `site.social`. They feed the footer icons and the schema `sameAs`.
3. **Create the Google Business Profile** for Davao City, using the same name, address and phone number as the website. Add its link to `site.social.googleBusiness`.
4. **Confirm opening hours** (shown in the footer, contact page and schema).
5. **Add the SMTP details** in `public/api/config.php` so confirmation emails go out.

## Right after go-live (needs you)
1. Add the site to **Google Search Console** and **Bing Webmaster Tools**; submit `https://<domain>/sitemap.xml`; request indexing of the home page.
2. Run the live pages through Google's **Rich Results Test** and **PageSpeed Insights**.
3. Check Search Console after about 28 days for real-visitor speed data and any indexing problems.
4. Add the **"Website by BC Tech"** link to the LYFD website footer, and list BC Tech in business directories (Clutch, GoodFirms, DesignRush, Davao business listings).
5. Replace the LYFD placeholder screens with real screenshots and real results.

## When client reviews arrive
- Ask clients to review BC Tech on **Google Business Profile** first (this is where star ratings can appear in search).
- Add a testimonials section on the site using real names, businesses and photos with permission.
- Do **not** add review or rating markup for BC Tech's own reviews of itself. Google ignores it and can penalize it.

## Ongoing
- Publish a new guide every month or two (add it to `src/data/guides.mjs`; the page, sitemap and links are generated).
- Keep titles under about 60 characters and descriptions under about 160.
