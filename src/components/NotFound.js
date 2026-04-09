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
    <div className="min-h-dvh flex flex-col overflow-x-hidden bg-background dark:bg-black">
      <SEO
        title="Page not found"
        description="The page you requested could not be found. Return to the Riley Happuch portfolio homepage."
        path={pathname}
        noindex
      />
      <Navbar />
      
      <main id="main-content" tabIndex={-1} className="flex flex-col flex-grow outline-none">
        <div className="relative w-full">
          <div 
            className="page-header bg-gradient-to-b from-black/70 to-black/90 py-12 sm:py-16 md:py-20"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${process.env.PUBLIC_URL}/img/carousel-1.jpg)`,
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <div className="container mx-auto px-4 max-w-7xl text-center">
              <p className="text-sm sm:text-base font-semibold uppercase tracking-wider text-white/80 mb-2 animate-slideInDown">
                Error 404
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase mb-4 animate-slideInDown text-white">
                Page Not Found
              </h1>
              <nav aria-label="Breadcrumb" className="animate-slideInDown">
                <ol className="flex justify-center items-center flex-wrap gap-x-2 gap-y-1 text-xs sm:text-sm uppercase">
                  <li><a href="/" className="text-white hover:text-primary transition-colors min-h-[44px] inline-flex items-center" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a></li>
                  <li className="text-white" aria-hidden="true">/</li>
                  <li className="text-primary">404</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex-grow w-full py-10 sm:py-12 lg:py-20 bg-secondary dark:bg-dark">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <i className="bi bi-exclamation-triangle text-5xl sm:text-6xl md:text-8xl text-primary wow fadeInUp mb-4" data-wow-delay="0.1s" aria-hidden="true"></i>
                <p className="text-6xl sm:text-7xl md:text-9xl font-bold wow fadeInUp mb-2 text-dark/90 dark:text-white/90" data-wow-delay="0.2s" aria-hidden="true">
                  404
                </p>
                <p className="text-base sm:text-lg mb-8 wow fadeInUp text-foreground dark:text-gray-300" data-wow-delay="0.4s">
                  We&apos;re sorry — the page you&apos;re looking for doesn&apos;t exist. Head back to the homepage to explore the portfolio.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="btn btn-outline-primary border-2 py-3 px-8 min-h-[48px] wow fadeInUp"
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
