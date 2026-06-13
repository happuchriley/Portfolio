import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'THE MISFITS';
const DEFAULT_TITLE = 'THE MISFITS — Frontend Developer Portfolio';
const DEFAULT_DESCRIPTION =
  'THE MISFITS — Frontend Developer specializing in React, Next.js, TypeScript, and Tailwind CSS. Building scalable SPAs, integrating APIs, and shipping performant web apps. Open to remote work and collaborations.';
const DEFAULT_KEYWORDS =
  'Frontend Developer, React developer, Next.js, TypeScript, Tailwind CSS, JavaScript, web developer, portfolio, UI developer, SPA, Supabase, Netlify, Ghana, remote developer';
const DEFAULT_SITE_URL = 'https://portfolio.theemisfits.com';
const DEFAULT_IMAGE = '/img/the-misfits-logo.png';
const TWITTER_HANDLE = '@themisfits';

function resolveBaseUrl() {
  return (
    process.env.REACT_APP_SITE_URL?.replace(/\/$/, '') ||
    (typeof window !== 'undefined' ? window.location.origin : DEFAULT_SITE_URL)
  ).trim();
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  path = '/',
  noindex = false,
  imagePath = DEFAULT_IMAGE,
  imageAlt = 'THE MISFITS — Frontend Developer Portfolio',
}) {
  const base = resolveBaseUrl();
  const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\//, '')}`;
  const url = base ? `${base}${normalizedPath}` : '';
  const image = base && imagePath ? `${base}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}` : '';

  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: base,
        name: fullTitle,
        description,
        inLanguage: 'en-US',
        publisher: { '@id': `${base}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${base}/#organization`,
        name: SITE_NAME,
        url: base,
        logo: {
          '@type': 'ImageObject',
          url: image,
        },
        description,
        knowsAbout: [
          'React',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'Tailwind CSS',
          'Supabase',
          'REST APIs',
          'Responsive Web Design',
          'UI Development',
          'Web Performance',
        ],
        sameAs: [
          'https://github.com/happuchriley',
          'https://portfolio.theemisfits.com',
        ],
      },
      {
        '@type': 'Person',
        '@id': `${base}/#person`,
        name: 'Derrick Teye',
        jobTitle: 'Frontend Developer',
        url: base,
        image,
        worksFor: { '@id': `${base}/#organization` },
        knowsAbout: [
          'React.js',
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'JavaScript',
        ],
        sameAs: [
          'https://github.com/happuchriley',
          'https://portfolio.theemisfits.com',
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: fullTitle,
        description,
        isPartOf: { '@id': `${base}/#website` },
        about: { '@id': `${base}/#person` },
        inLanguage: 'en-US',
      },
    ],
  };

  return (
    <Helmet htmlAttributes={{ lang: 'en' }} prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SITE_NAME} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="generator" content="React" />

      {url ? <link rel="canonical" href={url} /> : null}
      <link rel="sitemap" type="application/xml" title="Sitemap" href={`${base}/sitemap.xml`} />

      {/* Open Graph — Facebook, LinkedIn, Discord, etc. */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {url ? <meta property="og:url" content={url} /> : null}
      {image ? <meta property="og:image" content={image} /> : null}
      {image ? <meta property="og:image:secure_url" content={image} /> : null}
      {image ? <meta property="og:image:alt" content={imageAlt} /> : null}
      {image ? <meta property="og:image:width" content="1200" /> : null}
      {image ? <meta property="og:image:height" content="630" /> : null}
      {image ? <meta property="og:image:type" content="image/png" /> : null}

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}
      {image ? <meta name="twitter:image:alt" content={imageAlt} /> : null}

      {/* Google & general crawlers */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}
      <meta
        name="googlebot"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <meta name="bingbot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Apple Safari / iOS */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />

      {/* Microsoft Edge / Windows */}
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content={`${base}/browserconfig.xml`} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
