import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'studio', label: 'Studio' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onManage = location.pathname.startsWith('/manage');
  const solidNav = scrolled || onManage || isOpen;

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const linkTone = solidNav
    ? 'text-ink/70 hover:text-primary dark:text-cream/70 dark:hover:text-ochre'
    : 'text-cream/80 hover:text-ochre';

  const linkItems = NAV.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      onClick={(e) => scrollToSection(e, item.id)}
      className={`${linkTone} inline-flex min-h-[44px] items-center justify-center px-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] transition-colors lg:min-h-0 xl:text-xs`}
    >
      {item.label}
    </a>
  ));

  return (
    <nav
      className={`navbar absolute left-0 top-0 z-[9] w-full transition-all duration-500 ${
        isOpen
          ? 'bg-charcoal/95 shadow-md backdrop-blur-sm lg:bg-transparent lg:shadow-none lg:backdrop-blur-none'
          : ''
      } ${solidNav ? 'navbar-scrolled' : ''}`}
      aria-label="Primary"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-3 py-3 sm:py-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              setIsOpen(false);
            }}
            className="flex min-h-[44px] min-w-0 items-center gap-2.5"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary font-display text-[0.65rem] font-bold text-white"
              aria-hidden="true"
            >
              TM
            </span>
            <span
              className={`truncate font-display text-base font-bold uppercase tracking-tight sm:text-lg ${
                solidNav ? 'text-ink dark:text-cream' : 'text-cream'
              }`}
            >
              THE MISFITS
            </span>
          </a>

          <div className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-7">
            {linkItems}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle light={!solidNav && !isOpen} />
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="btn btn-primary hidden min-h-[44px] items-center justify-center px-5 py-2.5 lg:inline-flex"
            >
              Start a project
            </a>
            <button
              type="button"
              className={`flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5 lg:hidden ${
                solidNav ? 'text-ink dark:text-cream' : 'text-cream'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="primary-navigation"
            >
              <span className={`block h-0.5 w-6 bg-current transition ${isOpen ? 'translate-y-[4px] rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${isOpen ? '-translate-y-[4px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        <div
          id="primary-navigation"
          className={`${isOpen ? 'block' : 'hidden'} border-t border-cream/15 pb-5 lg:hidden`}
        >
          <div className="flex flex-col items-center gap-1 pt-3">{linkItems}</div>
          <div className="mx-auto mt-4 w-full max-w-sm px-4">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="btn btn-primary inline-flex min-h-[48px] w-full items-center justify-center px-6"
            >
              Start a project
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
