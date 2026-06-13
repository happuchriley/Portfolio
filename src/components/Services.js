import React from 'react';

/** Service photos: Unsplash & Pexels (free license). Stored in /public/img/services/. */
const services = [
  {
    title: 'React & SPA Development',
    description:
      'Building production-grade single-page applications with React — component-driven architecture, client-side routing, state management, and reusable UI systems. From MVPs to full-scale apps, I deliver maintainable codebases that scale with your product.',
    tags: ['React', 'React Router', 'Hooks', 'Context API'],
    image: '/img/services/web-development.jpg',
    imageAlt: 'Laptop with code — React web application development',
    align: 'left',
  },
  {
    title: 'Next.js & Full-Stack Front-End',
    description:
      'Leveraging Next.js for server-side rendering, static generation, and API routes — faster initial loads, better SEO, and a seamless bridge between front-end and back-end. Ideal for marketing sites, dashboards, and content-heavy platforms that need performance at scale.',
    tags: ['Next.js', 'SSR', 'SSG', 'API Routes'],
    image: '/img/services/frontend-development.jpg',
    imageAlt: 'Modern website UI on desktop, tablet, and phone — Next.js front-end development',
    align: 'right',
  },
  {
    title: 'TypeScript & Modern JavaScript',
    description:
      'Writing type-safe, self-documenting code with TypeScript and ES6+ JavaScript. Strong typing catches bugs early, improves developer experience, and makes large codebases easier to refactor — whether in React, Next.js, or Node.js environments.',
    tags: ['TypeScript', 'ES6+', 'Jest', 'ESLint'],
    image: '/img/services/responsive-design.jpg',
    imageAlt: 'TypeScript and modern JavaScript development workflow',
    align: 'left',
  },
  {
    title: 'UI Frameworks & Design Systems',
    description:
      'Crafting polished interfaces with Tailwind CSS, component libraries, and design tokens — consistent spacing, typography, and theming across every screen. I build accessible, dark-mode-ready UIs that look sharp on any device without reinventing styles from scratch.',
    tags: ['Tailwind CSS', 'Shadcn/ui', 'Radix UI', 'Design Tokens'],
    image: '/img/services/responsive-design.jpg',
    imageAlt: 'Component library and design system on multiple devices',
    align: 'right',
  },
  {
    title: 'E-commerce & API Integration',
    description:
      'Connecting front-end applications to REST APIs, Supabase, and payment gateways like Stripe and Paystack. I build checkout flows, real-time data sync, and secure authentication — turning your React or Next.js app into a complete, revenue-ready platform.',
    tags: ['Stripe', 'Supabase', 'REST APIs', 'Paystack'],
    image: '/img/services/ecommerce.jpg',
    imageAlt: 'E-commerce checkout and API integration on laptop',
    align: 'left',
  },
  {
    title: 'Performance & Deployment',
    description:
      'Optimizing bundle sizes, lazy loading, code splitting, and Core Web Vitals — then deploying to Netlify with CI/CD. Every app I ship is measured, monitored, and tuned for real-world speed on mobile and desktop.',
    tags: ['Vite', 'Webpack', 'Netlify', 'Core Web Vitals'],
    image: '/img/services/performance.jpg',
    imageAlt: 'Analytics dashboard for web performance metrics',
    align: 'right',
  },
  {
    title: 'SEO & Technical Foundations',
    description:
      'Implementing structured data, Open Graph tags, sitemaps, and semantic markup so search engines and social platforms index your React or Next.js app correctly. Technical SEO baked into the framework layer — not bolted on after launch.',
    tags: ['Schema.org', 'Open Graph', 'Sitemap', 'react-helmet'],
    image: '/img/services/seo.jpg',
    imageAlt: 'SEO and technical optimization strategy on laptop',
    align: 'left',
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="w-full py-10 sm:py-12 lg:py-20 bg-background dark:bg-black"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10 sm:mb-12">
          <div className="title wow fadeInUp" data-wow-delay="0.1s">
            <div className="title-center">
              <p className="relative inline-block text-base sm:text-lg font-light uppercase mb-2 text-foreground/80 dark:text-gray-400">
                Services
              </p>
              <h2
                id="services-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-dark dark:text-white border-b border-dark/20 dark:border-white/20 pb-2"
              >
                What I Do
              </h2>
            </div>
          </div>
        </div>

        {services.map((item, index) => (
          <div
            key={item.title}
            className={`service-item ${item.align === 'left' ? 'service-item-left' : 'service-item-right'} mt-8 sm:mt-10 overflow-hidden`}
          >
            <div
              className={`flex flex-col ${item.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
            >
              <div
                className={`w-full min-w-0 md:w-5/12 p-4 min-[400px]:p-6 sm:p-8 max-w-md md:max-w-none mx-auto wow ${
                  item.align === 'right' ? 'fadeInLeft' : 'fadeInRight'
                }`}
                data-wow-delay="0.2s"
              >
                <div className="relative inline-block w-full">
                  <img
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    className="w-full aspect-[3/2] object-cover rounded-full"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0 rounded-full border-[0.45rem] min-[400px]:border-[0.75rem] sm:border-[1.25rem] md:border-[2rem] lg:border-[3rem] border-dark/15 dark:border-white/15 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div
                className={`w-full min-w-0 md:w-7/12 px-3 min-[400px]:px-4 sm:px-5 md:px-6 lg:px-0 py-6 sm:py-8 md:py-12 ${
                  item.align === 'right' ? 'md:text-right' : ''
                } wow ${item.align === 'right' ? 'fadeInLeft' : 'fadeInRight'}`}
                data-wow-delay="0.5s"
              >
                <h3 className="text-lg min-[400px]:text-xl sm:text-2xl font-bold uppercase mb-3 sm:mb-4 text-dark dark:text-white leading-snug">
                  {item.title}
                </h3>
                <p className="mb-4 text-base sm:text-lg text-foreground dark:text-gray-300 hyphens-auto break-words">
                  {item.description}
                </p>
                <div
                  className={`flex gap-1.5 sm:gap-2 flex-wrap ${item.align === 'right' ? 'md:justify-end' : ''}`}
                >
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-primary text-white rounded-full text-xs sm:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
