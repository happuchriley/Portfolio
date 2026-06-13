# THE MISFITS Portfolio

## Run Locally

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

## Build

```bash
npm run build
```

## Netlify Deployment

- Build command: `npm run build`
- Publish directory: `build`
- SPA redirects: `public/_redirects` is already configured.
