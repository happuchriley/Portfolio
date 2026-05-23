import React, { useState, useEffect, useMemo } from 'react';
import CvDownloadLink from './CvDownloadLink';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useMemo(() => [
    {
      image: '/img/carousel-1.jpg',
      title: "Hello, I'm Derrick Teye",
      subtitle: 'Frontend Developer',
      description: "I create beautiful, responsive, and performant web applications\n using modern technologies and best practices."
    },
    {
      image: '/img/carousel-2.jpg',
      title: "Hello, I'm Derrick Teye",
      subtitle: 'Frontend Developer',
      description: "I create beautiful, responsive, and performant web applications\n using modern technologies and best practices."
    }
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[100dvh] min-h-screen overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Introduction"
    >
      <div className="relative w-full min-h-[100dvh] min-h-screen">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={index !== currentSlide}
          >
            <img
              src={slide.image}
              alt={`${slide.subtitle} — modern web interfaces and responsive design`}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchpriority={index === 0 ? 'high' : 'low'}
            />
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center px-3 min-[400px]:px-5 sm:px-6 md:px-8 pt-[max(6.5rem,env(safe-area-inset-top,0px)+4.5rem)] pb-[max(5.5rem,env(safe-area-inset-bottom,0px)+1.25rem)] sm:pt-24 sm:pb-20">
              <div className="title mx-auto max-w-4xl w-full px-1 min-[400px]:px-2 sm:px-5 animate-slideInDown">
                <div className="title-center hero-title-center">
                  <p className="text-sm min-[400px]:text-base sm:text-lg font-light mb-2 text-white/95">{slide.title}</p>
                  <h1 className="text-[clamp(1.5rem,5.5vw+0.85rem,6rem)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase mb-3 sm:mb-4 leading-[1.1] tracking-tight text-white border-b border-white/30 pb-2">
                    {slide.subtitle}
                  </h1>
                </div>
              </div>
              <p className="text-sm min-[400px]:text-base sm:text-lg md:text-xl mb-6 sm:mb-8 animate-slideInDown whitespace-pre-line max-w-2xl text-white/90 px-1 leading-relaxed">
                {slide.description}
              </p>
              <div className="flex flex-col min-[480px]:flex-row flex-wrap items-stretch min-[480px]:items-center justify-center gap-3 sm:gap-4 w-full max-w-md min-[480px]:max-w-none mx-auto animate-slideInDown px-1">
                <a
                  href="#portfolio"
                  onClick={(e) => scrollToSection(e, 'portfolio')}
                  className="btn btn-outline-primary border-2 py-3 px-6 sm:px-8 min-h-[48px] inline-flex items-center justify-center"
                >
                  View My Work
                </a>
                <CvDownloadLink className="btn btn-primary py-3 px-6 sm:px-8 min-h-[48px] inline-flex items-center justify-center gap-2">
                  Download CV
                </CvDownloadLink>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        type="button"
        className="absolute left-1 min-[400px]:left-2 sm:left-4 bottom-[max(1rem,env(safe-area-inset-bottom,0px)+0.5rem)] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-[2] text-white hover:text-primary transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
      >
        <span className="block w-11 h-11 sm:w-12 sm:h-12 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
          <i className="fas fa-chevron-left" aria-hidden="true"></i>
        </span>
      </button>
      
      <button
        type="button"
        className="absolute right-1 min-[400px]:right-2 sm:right-4 bottom-[max(1rem,env(safe-area-inset-bottom,0px)+0.5rem)] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-[2] text-white hover:text-primary transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        aria-label="Next slide"
      >
        <span className="block w-11 h-11 sm:w-12 sm:h-12 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
          <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </span>
      </button>
    </section>
  );
};

export default Hero;
