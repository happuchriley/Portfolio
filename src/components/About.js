import React from "react";

const About = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="w-full bg-secondary py-10 sm:py-12 lg:py-20 dark:bg-dark"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-6 min-[480px]:gap-8 lg:gap-12">
          <div className="w-full min-w-0 lg:w-7/12 pb-0 lg:pb-12 py-6 sm:py-8 lg:py-12">
            <div className="title wow fadeInUp" data-wow-delay="0.1s">
              <div className="title-left">
                <p className="relative inline-block text-base sm:text-lg font-light uppercase mb-2 text-foreground/80 dark:text-gray-400">
                  About Me
                </p>
                <h2
                  id="about-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-dark dark:text-white border-b border-dark/20 dark:border-white/20 pb-2"
                >
                  Frontend Developer
                </h2>
              </div>
            </div>
            <p
              className="mb-4 text-base sm:text-lg text-foreground dark:text-gray-300 wow fadeInUp hyphens-auto break-words"
              data-wow-delay="0.2s"
            >
              I'm a passionate Frontend Developer with 3+ years of experience
              building production web applications with modern JavaScript
              frameworks. I specialize in React and Next.js — architecting
              component-based UIs, integrating REST APIs and Supabase, and
              shipping performant apps to Netlify.
            </p>
            <p
              className="mb-6 text-base sm:text-lg text-foreground dark:text-gray-300 wow fadeInUp hyphens-auto break-words"
              data-wow-delay="0.25s"
            >
              My toolkit spans TypeScript, Tailwind CSS, React Router, state
              management patterns, and AI-assisted workflows with Cursor and
              GitHub Copilot. I focus on clean architecture, accessibility, and
              measurable performance — not just pixels, but code that teams can
              maintain and scale.
            </p>
            <ul
              className="list-none mb-6 space-y-3 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <li className="flex items-center text-foreground dark:text-gray-300">
                <i
                  className="fa fa-check-circle text-primary mr-2"
                  aria-hidden="true"
                ></i>
                3+ Years building with React, Next.js &amp; TypeScript
              </li>
              <li className="flex items-center text-foreground dark:text-gray-300">
                <i
                  className="fa fa-check-circle text-primary mr-2"
                  aria-hidden="true"
                ></i>
                Component architecture, hooks &amp; REST API integration
              </li>
              <li className="flex items-center text-foreground dark:text-gray-300">
                <i
                  className="fa fa-check-circle text-primary mr-2"
                  aria-hidden="true"
                ></i>
                Tailwind CSS, design systems &amp; responsive UI at scale
              </li>
              <li className="flex items-center text-foreground dark:text-gray-300">
                <i
                  className="fa fa-check-circle text-primary mr-2"
                  aria-hidden="true"
                ></i>
                Deployment, CI/CD &amp; Core Web Vitals optimization
              </li>
            </ul>
            <div
              className="flex flex-wrap gap-2 mb-8 wow fadeInUp"
              data-wow-delay="0.35s"
              aria-label="Technologies and frameworks"
            >
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Supabase",
                "Vite",
                "Netlify",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border border-primary/30 rounded-full text-xs sm:text-sm font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <a
                href="#portfolio"
                onClick={(e) => scrollToSection(e, "portfolio")}
                className="btn btn-outline-primary border-2 py-3 w-full text-center"
              >
                View Portfolio
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="btn btn-primary py-3 w-full text-center"
              >
                Get In Touch
              </a>
            </div>
          </div>
          <div
            className="w-full min-w-0 lg:w-5/12 wow fadeInUp px-4 sm:px-6 lg:px-2 py-6 sm:py-8"
            data-wow-delay="0.5s"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none pt-6 pr-6 pb-10 pl-10 sm:pt-8 sm:pr-8 sm:pb-12 sm:pl-14">
              <div
                className="pointer-events-none absolute left-0 top-0 h-[72%] w-[78%] rounded-2xl border-2 border-primary/50 bg-primary/10 dark:bg-primary/15"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-2 right-0 h-16 w-16 sm:h-20 sm:w-20 border-b-[3px] border-r-[3px] border-primary rounded-br-2xl"
                aria-hidden="true"
              />
              <div className="relative rounded-2xl border-2 border-primary/80 bg-background p-4 sm:p-5 lg:p-6 shadow-lg shadow-primary/10 dark:bg-black/40 dark:shadow-black/50">
                <div className="overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10">
                  <img
                    src="/img/about.png"
                    alt="Derrick Teye, Frontend Developer"
                    className="w-full aspect-[3/4] max-h-[min(70vh,520px)] object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
