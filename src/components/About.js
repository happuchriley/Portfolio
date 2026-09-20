import React from 'react';

const CAPABILITIES = [
  { title: 'Systems', detail: 'Component architecture & TypeScript', color: 'bg-primary' },
  { title: 'Commerce', detail: 'APIs, auth, Paystack & Stripe', color: 'bg-ochre' },
  { title: 'Craft', detail: 'Design systems & responsive UI', color: 'bg-teal' },
  { title: 'Ship', detail: 'CI/CD & Core Web Vitals', color: 'bg-cobalt' },
];

const About = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-cream dark:bg-charcoal"
      aria-labelledby="about-heading"
    >
      <div className="grid lg:grid-cols-2">
        {/* Manifesto panel */}
        <div className="relative flex flex-col justify-between border-b border-ink/10 px-4 py-16 sm:px-8 sm:py-20 lg:border-b-0 lg:border-r lg:border-ink/10 lg:px-12 lg:py-24 dark:border-cream/10">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <p className="absolute -left-4 bottom-8 font-display text-[clamp(5rem,22vw,12rem)] font-bold uppercase leading-none tracking-tighter text-ink/[0.04] dark:text-cream/[0.05]">
              DT
            </p>
            <div className="absolute right-8 top-12 h-24 w-24 rounded-full bg-ochre/80 sm:h-32 sm:w-32" />
          </div>

          <div className="relative z-[1]">
            <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-primary">
              About
            </p>
            <h2
              id="about-heading"
              className="font-display text-[clamp(2.4rem,5vw,4rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink dark:text-cream"
            >
              Not a
              <br />
              template.
              <br />
              <span className="text-primary">A studio.</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/85 sm:text-lg dark:text-cream/80">
              I&apos;m Derrick Teye — I design and ship production interfaces with React
              and Next.js. Clear architecture, sharp UX, deploys that hold up past the demo.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/70 dark:text-cream/60">
              Less cookie-cutter SaaS. More craft you can feel in the first scroll.
            </p>
          </div>

          <div className="relative z-[1] mt-12 grid grid-cols-2 gap-px bg-ink/15 dark:bg-cream/15">
            {CAPABILITIES.map((item) => (
              <div
                key={item.title}
                className="bg-cream p-4 sm:p-5 dark:bg-charcoal"
              >
                <span className={`mb-3 block h-1.5 w-8 ${item.color}`} aria-hidden="true" />
                <p className="font-display text-sm font-bold uppercase tracking-wide text-ink dark:text-cream">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-snug text-foreground/65 dark:text-cream/55">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="relative z-[1] mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#portfolio"
              onClick={(e) => scrollToSection(e, 'portfolio')}
              className="btn btn-primary min-h-[48px] px-8 py-3.5 text-center"
            >
              See the work
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="inline-flex min-h-[48px] items-center justify-center border-2 border-ink px-8 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-cream dark:border-cream dark:text-cream dark:hover:bg-cream dark:hover:text-charcoal"
            >
              Start a project
            </a>
          </div>
        </div>

        {/* Portrait plane */}
        <div className="relative min-h-[28rem] bg-paper dark:bg-charcoal-lift sm:min-h-[32rem] lg:min-h-full">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-primary" />
            <div className="absolute bottom-[18%] right-[12%] h-20 w-20 rounded-full bg-teal sm:h-28 sm:w-28" />
            <div className="absolute right-[8%] top-[10%] h-3 w-24 bg-ochre" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12 lg:p-16">
            <figure className="relative w-full max-w-sm">
              <div
                className="absolute -inset-3 translate-x-3 translate-y-3 bg-ink dark:bg-cream/20"
                aria-hidden="true"
              />
              <img
                src="/img/about.png"
                alt="Derrick Teye, Frontend Developer"
                className="relative aspect-[3/4] w-full border-4 border-ink object-cover object-top dark:border-cream/40"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="relative mt-4 flex items-center justify-between">
                <span className="font-display text-sm font-bold uppercase tracking-wider text-ink dark:text-cream">
                  Derrick Teye
                </span>
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-foreground/50 dark:text-cream/45">
                  Accra · Remote
                </span>
              </figcaption>
            </figure>
          </div>

          <p
            className="pointer-events-none absolute bottom-6 right-6 hidden font-display text-[0.7rem] font-bold uppercase tracking-[0.4em] text-ink/30 [writing-mode:vertical-rl] dark:text-cream/25 lg:block"
            aria-hidden="true"
          >
            Frontend developer
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
