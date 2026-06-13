/**
 * Ensures SEO static files land in build/ with correct content.
 * CRA copies public/, but this guarantees sitemap.xml exists after every build.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const buildDir = path.join(root, 'build');
const siteUrl = (
  process.env.REACT_APP_SITE_URL || 'https://portfolio.theemisfits.com'
).replace(/\/$/, '');

if (!fs.existsSync(buildDir)) {
  console.error('postbuild-seo: build/ not found — run react-scripts build first.');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const robots = `# ${siteUrl}
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Yandex
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(buildDir, 'robots.txt'), robots, 'utf8');

console.log(`postbuild-seo: wrote sitemap.xml and robots.txt → ${buildDir}`);
