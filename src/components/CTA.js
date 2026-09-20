import React from 'react';

const CTA = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-28"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-charcoal" aria-hidden="true" />
      <div className="absolute inset-y-0 left-0 w-[min(16%,7rem)] bg-primary" aria-hidden="true" />
      <div className="absolute right-0 top-0 h-full w-[min(10%,4.5rem)] bg-ochre" aria-hidden="true" />
      <div className="absolute right-[14%] top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-teal sm:h-36 sm:w-36" aria-hidden="true" />
      <div className="absolute bottom-10 left-[20%] h-2.5 w-28 bg-cobalt" aria-hidden="true" />

      <div className="relative z-[1] container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-ochre">
            Next brief
          </p>
          <h2
            id="cta-heading"
            className="text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl md:text-5xl"
          >
            Got a product to ship?
          </h2>
          <div className="mx-auto mt-5 flex h-1.5 w-28 overflow-hidden rounded-full" aria-hidden="true">
            <span className="w-1/3 bg-primary" />
            <span className="w-1/3 bg-ochre" />
            <span className="w-1/3 bg-teal" />
          </div>
          <p className="mt-6 text-base leading-relaxed text-cream/80 sm:text-lg">
            Tell me the problem, the stack constraints, and the deadline —
            I&apos;ll bring the interface.
          </p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="btn btn-primary inline-flex min-h-[52px] items-center justify-center px-8"
            >
              Start a project
            </a>
            <a
              href="#portfolio"
              onClick={(e) => scrollToSection(e, 'portfolio')}
              className="btn inline-flex min-h-[52px] items-center justify-center border-2 border-ochre bg-ochre/10 px-8 text-ochre hover:bg-ochre hover:text-ink"
            >
              Browse work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
