import React from 'react';
import { useNavigate } from 'react-router-dom';

const TECH_ICONS = [
  { icon: 'fab fa-react', size: 'text-[2.75rem] sm:text-5xl', offset: 'mb-2 sm:mb-3' },
  { icon: 'fab fa-node-js', size: 'text-[2.5rem] sm:text-4xl', offset: 'mb-3 sm:mb-4' },
  { icon: 'fab fa-js-square', size: 'text-[2.5rem] sm:text-4xl', offset: 'mb-2' },
  { icon: 'fab fa-git-alt', size: 'text-[2.25rem] sm:text-[2.75rem]', offset: 'mb-5 sm:mb-6' },
  { icon: 'fab fa-npm', size: 'text-[2rem] sm:text-4xl', offset: 'mb-4 sm:mb-5' },
  { icon: 'fas fa-code', size: 'text-[3rem] sm:text-[3.25rem]', offset: 'mb-1' },
  { icon: 'fas fa-server', size: 'text-[2.25rem] sm:text-[2.75rem]', offset: 'mb-4 sm:mb-6' },
  { icon: 'fas fa-database', size: 'text-[2rem] sm:text-4xl', offset: 'mb-5 sm:mb-7' },
  { icon: 'fas fa-cloud', size: 'text-[2.5rem] sm:text-[3.5rem]', offset: 'mb-1 sm:mb-2' },
  { icon: 'fas fa-terminal', size: 'text-[2.25rem] sm:text-[2.75rem]', offset: 'mb-4 sm:mb-5' },
  { icon: 'fas fa-laptop-code', size: 'text-[2.75rem] sm:text-5xl', offset: 'mb-0' },
  { icon: 'fas fa-mobile-screen-button', size: 'text-[2rem] sm:text-4xl', offset: 'mb-3 sm:mb-5' },
];

const MARQUEE_ICONS = [...TECH_ICONS, ...TECH_ICONS];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      className="footer-with-tech-strip w-full border-t border-cream/10 text-cream"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/footer-bg.jpg)`,
      }}
    >
      <div className="relative z-[1] container mx-auto max-w-7xl px-3 py-12 text-center sm:px-4 sm:py-16 lg:pb-32 pb-28">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="inline-block min-h-[44px] max-w-full"
        >
          <p className="mb-4 px-1 text-2xl font-bold uppercase leading-tight text-cream min-[400px]:text-3xl sm:mb-5 sm:text-4xl md:text-5xl lg:text-6xl font-display">
            <span
              className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary align-middle text-xs text-white sm:h-10 sm:w-10 sm:text-sm"
              aria-hidden="true"
            >
              TM
            </span>
            THE MISFITS
          </p>
        </a>
        <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-ochre sm:text-base">
          Frontend studio · Accra & remote
        </p>
        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {[
            {
              href: 'https://github.com/happuchriley/Portfolio',
              icon: 'fab fa-github',
              label: 'GitHub',
            },
            { href: 'https://linkedin.com', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
            { href: 'https://twitter.com', icon: 'fab fa-x-twitter', label: 'Twitter' },
            { href: 'https://dribbble.com', icon: 'fab fa-dribbble', label: 'Dribbble' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lg-square m-1 flex min-h-[48px] min-w-[48px] items-center justify-center border-2 border-cream/35 text-cream transition-colors hover:border-primary hover:bg-primary hover:text-white"
              title={s.label}
              aria-label={`${s.label} (opens in new tab)`}
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>
        <p className="mb-2 px-2 text-sm text-cream/90">
          © {new Date().getFullYear()}{' '}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="border-b border-cream/40 transition-colors hover:text-ochre"
          >
            THE MISFITS
          </a>
          . All rights reserved.
        </p>
        <p className="mb-0 text-xs text-cream/65 sm:text-sm">
          Crafted for product teams who want interfaces with a point of view.
        </p>
      </div>

      <div className="footer-tech-strip" aria-hidden="true">
        <div className="footer-tech-strip-track">
          {MARQUEE_ICONS.map((item, index) => (
            <span key={index} className={`footer-tech-icon ${item.size} ${item.offset}`}>
              <i className={item.icon} />
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
