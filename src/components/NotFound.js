import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';
import SEO from './SEO';

const NotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="min-h-dvh flex flex-col overflow-x-hidden bg-background dark:bg-charcoal">
      <SEO
        title="Page not found"
        description="The page you requested could not be found. Return to THE MISFITS portfolio homepage."
        path={pathname}
        noindex
      />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex flex-col flex-grow outline-none">
        <div className="relative w-full overflow-hidden paper-surface py-16 sm:py-20 md:py-24">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-primary" />
            <div className="absolute left-[10%] bottom-[20%] h-20 w-20 rounded-full bg-ink dark:bg-cream" />
          </div>
          <div className="relative z-[1] container mx-auto px-4 max-w-7xl text-center">
            <p className="section-kicker mb-2 animate-slideInDown">Error 404</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase mb-4 animate-slideInDown text-ink dark:text-cream">
              Page Not Found
            </h1>
            <nav aria-label="Breadcrumb" className="animate-slideInDown">
              <ol className="flex justify-center items-center flex-wrap gap-x-2 gap-y-1 text-xs sm:text-sm uppercase font-semibold">
                <li>
                  <a
                    href="/"
                    className="text-ink dark:text-cream hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/');
                    }}
                  >
                    Home
                  </a>
                </li>
                <li className="text-ink/40 dark:text-cream/40" aria-hidden="true">
                  /
                </li>
                <li className="text-primary">404</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="flex-grow w-full py-10 sm:py-12 lg:py-20 bg-paper dark:bg-charcoal">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <p
                  className="text-6xl sm:text-7xl md:text-9xl font-bold wow fadeInUp mb-2 text-primary"
                  data-wow-delay="0.2s"
                  aria-hidden="true"
                >
                  404
                </p>
                <p
                  className="text-base sm:text-lg mb-8 wow fadeInUp text-foreground dark:text-cream/85"
                  data-wow-delay="0.4s"
                >
                  That page doesn&apos;t exist. Head home to explore the portfolio.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="btn btn-primary py-3 px-8 min-h-[48px] wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  Go Back To Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default NotFound;
