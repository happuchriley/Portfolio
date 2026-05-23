import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navLinkClass =
  'nav-link text-white uppercase py-3 lg:py-0 lg:inline-flex lg:items-center min-h-[44px] lg:min-h-0 flex w-full max-w-sm lg:max-w-none lg:w-auto items-center justify-center text-center lg:justify-start lg:text-left hover:text-primary transition-colors duration-500';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (mq.matches) setIsOpen(false);
    };
    closeOnDesktop();
    mq.addEventListener('change', closeOnDesktop);
    return () => mq.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const bodyPrev = document.body.style.overflow;
    const htmlPrev = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = bodyPrev;
      document.documentElement.style.overflow = htmlPrev;
    };
  }, [isOpen]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const linkItems = (
    <>
      <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className={navLinkClass}>
        Home
      </a>
      <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={navLinkClass}>
        About
      </a>
      <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className={navLinkClass}>
        Services
      </a>
      <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className={navLinkClass}>
        Portfolio
      </a>
      <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className={navLinkClass}>
        Testimonials
      </a>
      <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={navLinkClass}>
        Contact
      </a>
    </>
  );

  return (
    <nav
      className={`navbar absolute w-full top-0 left-0 z-[9] transition-all duration-500 ${
        isOpen
          ? 'bg-dark/95 shadow-lg backdrop-blur-sm dark:bg-black/95 lg:bg-transparent lg:shadow-none lg:backdrop-blur-none dark:lg:bg-transparent'
          : ''
      }`}
      aria-label="Primary"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-2 min-[400px]:gap-3 py-2.5 min-[400px]:py-3 sm:py-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              setIsOpen(false);
            }}
            className="navbar-brand min-h-[44px] flex items-center shrink min-w-0 max-w-[min(100%,calc(100vw-7.5rem))] sm:max-w-none -ml-1 min-[400px]:-ml-2 pl-1 min-[400px]:pl-2"
          >
            <h2 className="mb-0 flex min-w-0 items-center gap-1 text-primary uppercase font-josefin text-base min-[400px]:text-lg sm:text-xl md:text-2xl leading-tight">
              <i className="fas fa-code shrink-0" aria-hidden="true"></i>
              <span className="truncate">THE MISFITS</span>
            </h2>
          </a>

          <div className="hidden lg:flex flex-1 flex-wrap items-center justify-center gap-x-2 gap-y-2 min-w-0 px-2 xl:px-4">
            {linkItems}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="btn btn-outline-primary border-2 px-5 py-2.5 text-center min-h-[44px] hidden lg:inline-flex items-center justify-center"
            >
              Hire Me
            </a>
            <button
              type="button"
              className="lg:hidden p-3 text-white min-h-[44px] min-w-[44px] flex flex-col items-center justify-center rounded-lg hover:bg-white/10 dark:hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="primary-navigation"
            >
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white" />
            </button>
          </div>
        </div>

        <div
          id="primary-navigation"
          className={`${isOpen ? 'block' : 'hidden'} lg:hidden border-t border-white/10 pb-4 text-center dark:border-white/10`}
        >
          <div className="mx-auto flex w-full flex-col items-center pt-2 sm:max-w-md">{linkItems}</div>
          <div className="mx-auto mt-3 w-full max-w-sm px-4 sm:max-w-md sm:px-0">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="btn btn-outline-primary border-2 px-6 py-3 text-center min-h-[44px] w-full inline-flex items-center justify-center"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
