import React from 'react';

function PortfolioExtLink({ href, children, ariaContext }) {
  if (!href || href === '#') return null;
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
      title: 'E-Commerce Platform',
      image: '/img/team-1.jpg',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Styled Components', 'Git'],
      link: '#',
      liveDemo: 'https://github.com/vercel/commerce',
      caseStudy: 'https://github.com/vercel/commerce/blob/main/README.md',
    },
    {
      title: 'Task Management App',
      image: '/img/team-2.jpg',
      technologies: ['Vue.js', 'JavaScript', 'Firebase', 'Tailwind CSS', 'Vuex', 'REST API'],
      link: '#',
      liveDemo: 'https://vuejs.org/examples/',
      caseStudy: 'https://blog.vuejs.org/',
    },
    {
      title: 'SaaS Dashboard',
      image: '/img/team-3.jpg',
      technologies: ['Next.js', 'React', 'GraphQL', 'SCSS', 'Stripe', 'Docker'],
      link: '#',
      liveDemo: 'https://nextjs.org/showcase',
      caseStudy: 'https://vercel.com/blog',
    },
    {
      title: 'Enterprise App',
      image: '/img/team-4.jpg',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'Material UI', 'NgRx', 'Jest'],
      link: '#',
      liveDemo: 'https://angular.dev/tutorials',
      caseStudy: 'https://blog.angular.io/',
    },
    {
      title: 'Analytics Dashboard',
      image: '/img/team-5.jpg',
      technologies: ['React', 'Firebase', 'Material UI', 'Chart.js', 'PWA', 'Webpack'],
      link: '#',
      liveDemo: 'https://firebase.google.com/docs/samples',
      caseStudy: 'https://firebase.googleblog.com/',
    },
    {
      title: 'Creative Portfolio',
      image: '/img/team-6.jpg',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Three.js', 'WebGL'],
      link: '#',
      liveDemo: 'https://threejs.org/examples/',
      caseStudy: 'https://developer.chrome.com/blog',
    },
    {
      title: 'Blog Platform',
      image: '/img/team-7.jpg',
      technologies: ['Vue.js', 'Nuxt.js', 'Vuetify', 'Pinia', 'Vite', 'Vitest'],
      link: '#',
      liveDemo: 'https://nuxt.com/docs/getting-started/introduction',
      caseStudy: 'https://nuxt.com/blog',
    },
    {
      title: 'Real-time Chat App',
      image: '/img/team-8.jpg',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'AWS'],
      link: '#',
      liveDemo: 'https://socket.io/demos',
      caseStudy: 'https://socket.io/blog/',
    },
  ];

  return (
    <section id="portfolio" className="w-full py-10 sm:py-12 lg:py-20 bg-background dark:bg-black" aria-labelledby="portfolio-heading">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10 sm:mb-12">
          <div className="title wow fadeInUp" data-wow-delay="0.1s">
            <div className="title-center">
              <p className="relative inline-block text-base sm:text-lg font-light uppercase mb-2 text-foreground/80 dark:text-gray-400">
                Portfolio
              </p>
              <h2 id="portfolio-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-dark dark:text-white border-b border-dark/20 dark:border-white/20 pb-2">
                My Recent Work
              </h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 min-[480px]:gap-5 sm:gap-6">
          {projects.map((project, index) => {
            const hasPrimaryLink = project.link && project.link !== '#';
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
                    className="w-full h-auto aspect-[4/3] object-cover pointer-events-none"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="team-after flex" aria-hidden="true">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex}>{tech}</span>
                    ))}
                  </div>
                </div>
                <ul className="portfolio-tech-below" aria-label={`Technologies for ${project.title}`}>
                  {project.technologies.map((tech, techIndex) => (
                    <li key={techIndex}>
                      <span className="portfolio-tech-below-pill">{tech}</span>
                    </li>
                  ))}
                </ul>
                <div className="team-footer">
                  <a
                    href={project.link || '#'}
                    className="team-footer-title w-full min-h-[44px] items-center justify-center"
                    target={hasPrimaryLink ? '_blank' : undefined}
                    rel={hasPrimaryLink ? 'noopener noreferrer' : undefined}
                    title={project.title}
                    aria-label={`${project.title}${hasPrimaryLink ? ' (opens in new tab)' : ''}`}
                  >
                    <h3>{project.title}</h3>
                  </a>
                  <div className="team-footer-actions">
                    <PortfolioExtLink href={project.liveDemo} ariaContext={project.title}>
                      Live demo
                    </PortfolioExtLink>
                    <PortfolioExtLink href={project.caseStudy} ariaContext={project.title}>
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
