import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      className="w-full bg-dark dark:bg-black text-gray-100 border-t border-white/10 dark:border-white/10 py-10 sm:py-12 lg:py-20"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/footer-bg.png)`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center bottom',
      }}
    >
      <div className="container mx-auto max-w-7xl text-center px-3 sm:px-4">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="inline-block min-h-[44px] max-w-full">
          <p className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 sm:mb-6 text-white uppercase font-josefin font-bold leading-tight break-words px-1">
            <i className="fas fa-code mr-1 sm:mr-2" aria-hidden="true"></i>Riley Happuch
          </p>
        </a>
        <div className="flex flex-wrap justify-center mb-8 gap-2 sm:gap-3">
          <a
            href="https://github.com"
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
        <p className="mb-2 text-sm sm:text-base px-2 break-words text-white/95">
          &copy; <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="border-b border-white/40 hover:text-primary transition-colors">Riley Happuch</a>, All Right Reserved.
        </p>
        <p className="mb-0 text-sm sm:text-base text-white/80">Frontend Developer &amp; UI/UX Enthusiast</p>
      </div>
    </footer>
  );
};

export default Footer;
