import React from "react";
import CvDownloadLink from "./CvDownloadLink";

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
              className="mb-6 text-base sm:text-lg text-foreground dark:text-gray-300 wow fadeInUp hyphens-auto break-words"
              data-wow-delay="0.2s"
            >
              I'm a passionate Frontend Developer with over 3+ years of
              experience creating modern, responsive web applications. I
              specialize in building user-friendly interfaces using React,
              JavaScript, and modern CSS. My goal is to create seamless user
              experiences that are both beautiful and functional.
            </p>
            <ul
              className="list-none mb-8 space-y-3 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <li className="flex items-center text-foreground dark:text-gray-300">
                <i
                  className="fa fa-check-circle text-primary mr-2"
                  aria-hidden="true"
                ></i>
                3+ Years of Professional Experience
              </li>
              <li className="flex items-center text-foreground dark:text-gray-300">
                <i
                  className="fa fa-check-circle text-primary mr-2"
                  aria-hidden="true"
                ></i>
                Expert in React, JavaScript & responsive UI
              </li>
              <li className="flex items-center text-foreground dark:text-gray-300">
                <i
                  className="fa fa-check-circle text-primary mr-2"
                  aria-hidden="true"
                ></i>
                Responsive Design & Mobile-First Approach
              </li>
            </ul>
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <a
                href="#portfolio"
                onClick={(e) => scrollToSection(e, "portfolio")}
                className="btn btn-outline-primary border-2 py-3 w-full text-center"
              >
                View Portfolio
              </a>
              <CvDownloadLink
                showIcon={false}
                className="btn btn-outline-primary border-2 py-3 w-full text-center inline-flex items-center justify-center gap-2"
              >
                Download CV
              </CvDownloadLink>
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
