import React from 'react';
import { useNavigate } from 'react-router-dom';

/** Decorative strip — duplicated for a seamless repeat-x marquee */
const TECH_ICONS = [
  { icon: 'fas fa-laptop-code', size: 'text-[2.75rem] sm:text-5xl', offset: 'mb-0' },
  { icon: 'fas fa-mobile-screen-button', size: 'text-[2rem] sm:text-4xl', offset: 'mb-3 sm:mb-5' },
  { icon: 'fas fa-code', size: 'text-[3rem] sm:text-[3.25rem]', offset: 'mb-1' },
  { icon: 'fas fa-server', size: 'text-[2.25rem] sm:text-[2.75rem]', offset: 'mb-4 sm:mb-6' },
  { icon: 'fab fa-react', size: 'text-[2.5rem] sm:text-5xl', offset: 'mb-2 sm:mb-3' },
  { icon: 'fas fa-database', size: 'text-[2rem] sm:text-4xl', offset: 'mb-5 sm:mb-7' },
  { icon: 'fas fa-cloud', size: 'text-[2.5rem] sm:text-[3.5rem]', offset: 'mb-1 sm:mb-2' },
  { icon: 'fas fa-terminal', size: 'text-[2.25rem] sm:text-[2.75rem]', offset: 'mb-4 sm:mb-5' },
  { icon: 'fab fa-js-square', size: 'text-[2.5rem] sm:text-4xl', offset: 'mb-2' },
  { icon: 'fab fa-html5', size: 'text-[2.75rem] sm:text-5xl', offset: 'mb-0 sm:mb-1' },
  { icon: 'fab fa-css3-alt', size: 'text-[2.5rem] sm:text-4xl', offset: 'mb-3 sm:mb-4' },
  { icon: 'fas fa-git-alt', size: 'text-[2.25rem] sm:text-[2.75rem]', offset: 'mb-5 sm:mb-6' },
];

const MARQUEE_ICONS = [...TECH_ICONS, ...TECH_ICONS];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      className="footer-with-tech-strip w-full text-gray-100 border-t border-white/10 dark:border-white/10"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/footer-bg.jpg)`,
      }}
    >
      <div className="relative z-[1] container mx-auto max-w-7xl text-center px-3 sm:px-4 py-10 sm:py-12 lg:py-16 pb-28 sm:pb-32">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="inline-block min-h-[44px] max-w-full">
          <p className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 sm:mb-6 text-white uppercase font-josefin font-bold leading-tight break-words px-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]">
            <i className="fas fa-code mr-1 sm:mr-2" aria-hidden="true"></i>THE MISFITS
          </p>
        </a>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          <a
            href="https://github.com/happuchriley/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lg-square btn-outline-primary border-2 m-1 flex items-center justify-center min-h-[48px] min-w-[48px]"
            title="GitHub"
            aria-label="GitHub (opens in new tab)"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lg-square btn-outline-primary border-2 m-1 flex items-center justify-center min-h-[48px] min-w-[48px]"
            title="LinkedIn"
            aria-label="LinkedIn (opens in new tab)"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lg-square btn-outline-primary border-2 m-1 flex items-center justify-center min-h-[48px] min-w-[48px]"
            title="Twitter"
            aria-label="Twitter (opens in new tab)"
          >
            <i className="fab fa-x-twitter"></i>
          </a>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lg-square btn-outline-primary border-2 m-1 flex items-center justify-center min-h-[48px] min-w-[48px]"
            title="Dribbble"
            aria-label="Dribbble (opens in new tab)"
          >
            <i className="fab fa-dribbble"></i>
          </a>
        </div>
        <p className="mb-2 text-sm sm:text-base px-2 break-words text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
          &copy;{' '}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="border-b border-white/40 hover:text-primary transition-colors"
          >
            THE MISFITS
          </a>
          , All Right Reserved.
        </p>
        <p className="mb-0 text-sm sm:text-base text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
          Frontend Developer &amp; UI/UX Enthusiast
        </p>
      </div>

      <div className="footer-tech-strip" aria-hidden="true">
        <div className="footer-tech-strip-track">
          {MARQUEE_ICONS.map((item, index) => (
            <span key={index} className={`footer-tech-icon ${item.size} ${item.offset}`}>
              <i className={item.icon}></i>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
