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

## Manage projects (in the site)

Open **`/manage`** (footer: “Add / manage projects”).

- **Add new project** — title, image path, live URL, stack, order  
- **Edit / remove** existing projects  
- Changes apply on this device immediately  
- **Download JSON** → replace `public/data/projects.json`, commit, and redeploy so everyone sees it  

Optional Decap UI still at `/admin/` after Netlify Identity + Git Gateway.

## Build

```bash
npm run build
```

## Netlify

- Build command: `npm run build`
- Publish directory: `build`
- SPA redirects: `public/_redirects` is already configured.
