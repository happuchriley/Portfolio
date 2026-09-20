# THE MISFITS Portfolio

Agency-leaning frontend portfolio with collage studio puzzle, light/dark themes, and data-driven projects.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Environment

Add to `.env`:

```bash
REACT_APP_WEB3FORMS_ACCESS_KEY=your_web3forms_key
REACT_APP_SITE_URL=https://portfolio.theemisfits.com
```

## Add a project (no React edits)

1. Drop a cover image into `public/img/projects/` (or reuse an existing path under `public/img/`).
2. Open `public/data/projects.json` and append an object:

```json
{
  "id": "my-new-app",
  "title": "My New App",
  "category": "Product",
  "blurb": "One sentence about what it does.",
  "image": "/img/projects/my-new-app.jpg",
  "imageClass": "object-cover object-top",
  "technologies": ["React", "TypeScript"],
  "link": "https://example.com",
  "featured": false,
  "published": true,
  "order": 7
}
```

3. Redeploy (or refresh locally). The Portfolio section loads this file at runtime.

### Optional: visual CMS

- Visit `/admin` after enabling **Netlify Identity** + **Git Gateway** on your Netlify site.
- Decap CMS is configured in `public/admin/` to edit `projects.json` and upload images to `public/img/projects/`.

## Build

```bash
npm run build
```

## Netlify

- Build command: `npm run build`
- Publish directory: `build`
- SPA redirects: `public/_redirects` is already configured.
