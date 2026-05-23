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
                  Software Developer
                </h2>
              </div>
            </div>
            <p
              className="mb-6 text-base sm:text-lg text-foreground dark:text-gray-300 wow fadeInUp hyphens-auto break-words"
              data-wow-delay="0.2s"
            >
              I'm a passionate software developer with over 3+ years of
              experience creating modern, responsive web applications. I
              specialize in building user-friendly interfaces using React,
              Vue.js, and vanilla JavaScript. My goal is to create seamless user
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
                Expert in React, Vue.js & JavaScript
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
            className="w-full min-w-0 lg:w-5/12 wow fadeInUp"
            data-wow-delay="0.5s"
          >
            <img
              src="/img/about.png"
              alt="DERRICK TEYE, frontend developer"
              className="w-full max-w-md mx-auto lg:max-w-none h-auto rounded-lg lg:rounded-none"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
