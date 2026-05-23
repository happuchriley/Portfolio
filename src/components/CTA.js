import React from 'react';

const CTA = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-10 sm:py-12 lg:py-20 bg-secondary dark:bg-dark" aria-labelledby="cta-heading">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-center">
          <div className="w-full min-w-0 lg:w-7/12 text-center max-w-3xl mx-auto px-1 sm:px-0">
            <div className="title mx-auto px-2 sm:px-5 wow fadeInUp" data-wow-delay="0.1s">
              <div className="title-center">
                <p className="relative inline-block text-base sm:text-lg font-light uppercase mb-2 text-foreground/80 dark:text-gray-400">
                  Let&apos;s Work Together
                </p>
                <h2 id="cta-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-dark dark:text-white border-b border-dark/20 dark:border-white/20 pb-2">
                  Have a Project in Mind?
                </h2>
              </div>
            </div>
            <p className="text-base sm:text-lg md:text-xl mb-8 wow fadeInUp text-foreground dark:text-gray-300 hyphens-auto break-words px-1" data-wow-delay="0.2s">
              I&apos;m always interested in new opportunities and exciting projects.{' '}
              <span className="hidden sm:inline">
                <br />
              </span>
              Let&apos;s discuss how I can help bring your ideas to life.
            </p>
            <div className="wow fadeInUp flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3" data-wow-delay="0.3s">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="btn btn-primary py-3 px-8 min-h-[48px] inline-flex items-center justify-center"
              >
                Get In Touch
              </a>
              <a
                href="#portfolio"
                onClick={(e) => scrollToSection(e, 'portfolio')}
                className="btn btn-outline-primary border-2 py-3 px-8 min-h-[48px] inline-flex items-center justify-center"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
