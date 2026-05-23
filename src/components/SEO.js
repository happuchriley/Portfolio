import { Helmet } from 'react-helmet-async';

const DEFAULT_DESCRIPTION =
  'THE MISFITS — frontend developer portfolio. React, responsive UI, and performant web applications. Open to remote work and collaborations.';

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  noindex = false,
  imagePath = '/img/the-misfits-logo.png',
}) {
  const base = (
    process.env.REACT_APP_SITE_URL?.replace(/\/$/, '') ||
    (typeof window !== 'undefined' ? window.location.origin : '')
  ).trim();
  const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\//, '')}`;
  const url = base ? `${base}${normalizedPath === '//' ? '/' : normalizedPath}` : '';
  const image =
    base && imagePath ? `${base}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}` : '';

  const fullTitle = title ? `${title} | THE MISFITS` : 'THE MISFITS — Frontend Developer Portfolio';

  return (
    <Helmet htmlAttributes={{ lang: 'en' }} prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {url ? <link rel="canonical" href={url} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {url ? <meta property="og:url" content={url} /> : null}
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
    </Helmet>
  );
}
