import React, { useState, useEffect, useMemo } from 'react';
import CvDownloadLink from './CvDownloadLink';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useMemo(
    () => [
      {
        image: '/img/carousel-1.jpg',
        line: 'Interfaces with structure — and a point of view.',
      },
      {
        image: '/img/carousel-2.jpg',
        line: 'React products that feel designed, not templated.',
      },
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [slides]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[100dvh] min-h-screen overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Introduction"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
          }`}
          aria-hidden={index !== currentSlide}
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full scale-105 object-cover object-center animate-collage-drift"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={index === 0 ? 'high' : 'low'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
        </div>
      ))}

      {/* Collage geometry */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
        <div className="absolute -left-[10%] top-[12%] h-[38vmin] w-[38vmin] rounded-full bg-ochre/90 mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute bottom-[-20%] right-[-8%] h-[55vmin] w-[55vmin] rounded-full border-[clamp(1.5rem,4vw,3.5rem)] border-cream/25" />
        <div className="absolute right-0 top-0 h-full w-3 bg-primary sm:w-4" />
        <div className="absolute bottom-[22%] left-[6%] h-2 w-20 bg-teal sm:w-28" />
      </div>

      <div className="relative z-[3] flex min-h-[100dvh] min-h-screen flex-col justify-end px-4 pb-[max(5rem,env(safe-area-inset-bottom)+3rem)] pt-[max(7rem,env(safe-area-inset-top)+5rem)] sm:px-8 lg:justify-center lg:pb-24">
        <div className="mx-auto w-full max-w-6xl animate-collage-in">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-ochre sm:mb-5">
            <span>Accra</span>
            <span className="h-1 w-1 rounded-full bg-cream/50" aria-hidden="true" />
            <span>Remote</span>
            <span className="h-1 w-1 rounded-full bg-cream/50" aria-hidden="true" />
            <span>Frontend studio</span>
          </div>

          <h1 className="max-w-[14ch] font-display text-[clamp(3.25rem,12vw,7.5rem)] font-bold uppercase leading-[0.88] tracking-tight text-cream">
            THE
            <br />
            MISFITS
          </h1>

          <p className="mt-4 max-w-md text-sm font-semibold uppercase tracking-[0.16em] text-cream/65 sm:text-base">
            Derrick Teye — Frontend
          </p>

          <p
            key={currentSlide}
            className="mt-5 max-w-lg text-lg leading-snug text-cream/95 animate-fadeIn sm:text-xl"
          >
            {slides[currentSlide].line}
          </p>

          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-center">
            <a
              href="#portfolio"
              onClick={(e) => scrollToSection(e, 'portfolio')}
              className="btn btn-primary inline-flex min-h-[52px] items-center justify-center px-8"
            >
              View work
            </a>
            <a
              href="#studio"
              onClick={(e) => scrollToSection(e, 'studio')}
              className="inline-flex min-h-[52px] items-center justify-center border-2 border-cream/60 px-8 text-sm font-bold uppercase tracking-wide text-cream transition hover:border-ochre hover:bg-ochre hover:text-ink"
            >
              Open studio
            </a>
            <CvDownloadLink className="inline-flex min-h-[52px] items-center justify-center gap-2 px-4 text-sm font-bold uppercase tracking-wide text-cream/80 transition hover:text-ochre">
              CV
              <i className="fas fa-download text-xs" aria-hidden="true" />
            </CvDownloadLink>
          </div>
        </div>
      </div>

      {/* Slide index */}
      <div className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-[4] flex -translate-x-1/2 items-center gap-4 sm:left-auto sm:right-8 sm:translate-x-0">
        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-cream/70 transition hover:text-ochre"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
        >
          <i className="fas fa-arrow-left" aria-hidden="true" />
        </button>
        <p className="font-display text-sm font-bold text-cream tabular-nums">
          0{currentSlide + 1}
          <span className="text-cream/40"> / 0{slides.length}</span>
        </p>
        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-cream/70 transition hover:text-ochre"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          aria-label="Next slide"
        >
          <i className="fas fa-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
