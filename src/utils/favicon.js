const base = process.env.PUBLIC_URL || '';

const assets = {
  /** Black icon — for light OS / browser chrome */
  light: {
    icon16: `${base}/favicon-16x16.png`,
    icon32: `${base}/favicon-32x32.png`,
    icon64: `${base}/favicon-64x64.png`,
    icon: `${base}/favicon.png`,
    apple: `${base}/apple-touch-icon.png`,
  },
  /** White icon — default for dark OS / browser chrome */
  dark: {
    icon16: `${base}/favicon-16x16-dark.png`,
    icon32: `${base}/favicon-32x32-dark.png`,
    icon64: `${base}/favicon-64x64-dark.png`,
    icon: `${base}/favicon-dark.png`,
    apple: `${base}/apple-touch-icon-dark.png`,
  },
};

function osPrefersLight() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: light)').matches;
}

export function applyFaviconFromOS() {
  if (typeof document === 'undefined') return;
  const cfg = osPrefersLight() ? assets.light : assets.dark;

  const set = (id, href, sizes) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = href;
    if (sizes) el.setAttribute('sizes', sizes);
  };

  set('app-favicon-16', cfg.icon16, '16x16');
  set('app-favicon-32', cfg.icon32, '32x32');
  set('app-favicon-64', cfg.icon64, '64x64');
  set('app-favicon', cfg.icon);
  set('app-apple-icon', cfg.apple);
}

/** Subscribe to OS theme changes; returns cleanup. */
export function initFaviconListener() {
  if (typeof window === 'undefined') return () => {};

  applyFaviconFromOS();

  const mq = window.matchMedia('(prefers-color-scheme: light)');
  const onChange = () => applyFaviconFromOS();

  if (mq.addEventListener) {
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }

  mq.addListener(onChange);
  return () => mq.removeListener(onChange);
}
