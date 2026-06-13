import React from "react";

function PortfolioExtLink({ href, children, ariaContext }) {
  if (!href || href === "#") return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${children} — ${ariaContext} (opens in new tab)`}
    >
      {children}
    </a>
  );
}

const Portfolio = () => {
  /** Replace liveDemo / caseStudy with your deployed app and write-up (blog, Notion, PDF, etc.). */
  const projects = [
    {
      title: "The Misfits Shop",
      image: "/img/misfits-shop.jpg",
      imageClass: "object-cover object-top",
      technologies: [
        "React",
        "TypeScript",
        "Supabase",
        "Styled Components",
        "Git",
      ],
      link: "https://theemisfits.com/",
    },
    {
      title: "Gloss Girlies",
      image: "/img/gloss-girlies.jpg",
      imageClass: "object-cover object-top",
      technologies: [
        "Vue.js",
        "JavaScript",
        "Supabase",
        "Tailwind CSS",
        "Vuex",
        "REST API",
      ],
      link: "https://glossgirlies.netlify.app/",
    },
    {
      title: "School Management System-Skuul",
      image: "/img/skuul.jpg",
      imageClass: "object-cover object-top",
      technologies: ["Next.js", "React", "GraphQL", "SCSS", "Stripe", "Docker"],
      link: "https://sku-ul.netlify.app/",
    },
    {
      title: "The Misfits-Portfolio",
      image: "/img/misfits-portfolio.jpg",
      imageClass: "object-cover object-top",
      technologies: [
        "React",
        "Tailwind CSS",
        "JavaScript",
        "React Router",
        "WOW.js",
        "Netlify",
      ],
      link: "https://portfolio.theemisfits.com/",
    },
    {
      title: "Audit Software",
      image: "/img/audit-software.jpg",
      imageClass: "object-cover object-top",
      technologies: [
        "React",
        "Firebase",
        "Material UI",
        "Chart.js",
        "PWA",
        "Webpack",
      ],
      link: "https://excelz-audit.vercel.app/",
    },
    {
      title: "Farm-Flux",
      image: "/img/farm-flux.jpg",
      imageClass: "object-cover object-center",
      technologies: [
        "React",
        "Next.js",
        "PostgreSQL",
        "Tailwind CSS",
        "Real-time feeds",
        "Auth",
      ],
      link: "https://farm-flux.netlify.app/",
    },
  ];

  return (
    <section
      id="portfolio"
      className="w-full py-10 sm:py-12 lg:py-20 bg-background dark:bg-black"
      aria-labelledby="portfolio-heading"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10 sm:mb-12">
          <div className="title wow fadeInUp" data-wow-delay="0.1s">
            <div className="title-center">
              <p className="relative inline-block text-base sm:text-lg font-light uppercase mb-2 text-foreground/80 dark:text-gray-400">
                Portfolio
              </p>
              <h2
                id="portfolio-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-dark dark:text-white border-b border-dark/20 dark:border-white/20 pb-2"
              >
                My Recent Work
              </h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 min-[480px]:gap-5 sm:gap-6">
          {projects.map((project, index) => {
            const hasPrimaryLink = project.link && project.link !== "#";
            return (
              <article
                key={index}
                className="team-item wow fadeInUp relative min-w-0"
                data-wow-delay={`${(index % 4) * 0.2 + 0.1}s`}
              >
                <div className="team-body rounded-lg overflow-hidden">
                  <div className="team-before flex" aria-hidden="true">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex}>{tech}</span>
                    ))}
                  </div>
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    className={`block w-full aspect-[4/3] pointer-events-none ${project.imageClass ?? "object-cover"}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="team-after flex" aria-hidden="true">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex}>{tech}</span>
                    ))}
                  </div>
                </div>
                <ul
                  className="portfolio-tech-below"
                  aria-label={`Technologies for ${project.title}`}
                >
                  {project.technologies.map((tech, techIndex) => (
                    <li key={techIndex}>
                      <span className="portfolio-tech-below-pill">{tech}</span>
                    </li>
                  ))}
                </ul>
                <div className="team-footer">
                  <a
                    href={project.link || "#"}
                    className="team-footer-title w-full min-h-[44px] items-center justify-center"
                    target={hasPrimaryLink ? "_blank" : undefined}
                    rel={hasPrimaryLink ? "noopener noreferrer" : undefined}
                    title={project.title}
                    aria-label={`${project.title}${hasPrimaryLink ? " (opens in new tab)" : ""}`}
                  >
                    <h3>{project.title}</h3>
                  </a>
                  <div className="team-footer-actions">
                    <PortfolioExtLink
                      href={project.liveDemo}
                      ariaContext={project.title}
                    >
                      Live demo
                    </PortfolioExtLink>
                    <PortfolioExtLink
                      href={project.caseStudy}
                      ariaContext={project.title}
                    >
                      Case study
                    </PortfolioExtLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
