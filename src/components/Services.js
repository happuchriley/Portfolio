import React from 'react';

/** Service photos: Unsplash & Pexels (free license). Stored in /public/img/services/. */
const services = [
  {
    title: 'Web Development',
    description:
      'Crafting responsive and dynamic websites using the latest technologies and best practices. Specializing in turning ideas into functional and user-friendly digital experiences.',
    tags: ['React', 'React Router', 'Hooks', 'Context API'],
    image: '/img/services/web-development.jpg',
    imageAlt: 'Laptop with code — web development workspace',
    align: 'left',
  },
  {
    title: 'Front-end Development',
    description:
      'Creating the user interface and experience with modern JavaScript frameworks. Focusing on visually appealing, interactive websites that engage users.',
    tags: ['Next.js', 'SSR', 'SSG', 'API Routes'],
    image: '/img/services/frontend-development.jpg',
    imageAlt: 'Modern website UI on desktop, tablet, and phone — front-end development',
    align: 'right',
  },
  {
    title: 'Responsive Web Design',
    description:
      'Designing websites that adapt seamlessly to various screen sizes and devices. Prioritizing a consistent, enjoyable experience across desktops, tablets, and smartphones.',
    tags: ['Tailwind CSS', 'Shadcn/ui', 'Radix UI', 'Design Tokens'],
    image: '/img/services/responsive-design.jpg',
    imageAlt: 'Responsive layout on tablet and mobile devices',
    align: 'left',
  },
  {
    title: 'E-commerce Development',
    description:
      'Building online stores with secure payment flows, inventory considerations, and user-friendly interfaces—platforms that support sales and a smooth shopping experience.',
    tags: ['Stripe', 'Paystack', 'Supabase', 'REST APIs'],
    image: '/img/services/ecommerce.jpg',
    imageAlt: 'Online store checkout on laptop with payment card — e-commerce',
    align: 'right',
  },
  {
    title: 'Website Maintenance & Support',
    description:
      'Ongoing updates, fixes, and care so your site stays secure, functional, and current. Keeping everything running smoothly as your needs evolve.',
    tags: ['Netlify', 'Vercel', 'Cloudflare', 'Monitoring'],
    image: '/img/services/maintenance.jpg',
    imageAlt: 'Team collaborating on website maintenance and support',
    align: 'left',
  },
  {
    title: 'Performance Optimization',
    description:
      'Improving speed and efficiency through code tuning, asset optimization, and solid architecture—faster experiences for users and stronger technical SEO signals.',
    tags: ['Vite', 'Webpack', 'Core Web Vitals', 'Lazy loading'],
    image: '/img/services/performance.jpg',
    imageAlt: 'Analytics dashboard for web performance metrics',
    align: 'right',
  },
  {
    title: 'SEO Integration',
    description:
      'Applying SEO best practices to improve visibility and rankings: semantic structure, meta content, performance, and technical foundations search engines reward.',
    tags: ['Schema.org', 'Open Graph', 'Sitemap', 'react-helmet'],
    image: '/img/services/seo.jpg',
    imageAlt: 'SEO and digital marketing strategy on laptop',
    align: 'left',
  },
  {
    title: 'Payment Gateway Integration',
    description:
      'Integrating secure checkout flows with Paystack, Stripe, and other payment providers—supporting local and international transactions with a smooth buyer experience.',
    tags: ['Paystack', 'Stripe', 'Checkout UX', 'Webhooks'],
    image: '/img/services/ecommerce.jpg',
    imageAlt: 'Payment gateway integration for online checkout',
    align: 'right',
  },
  {
    title: 'Deployment & Hosting',
    description:
      'Deploying production-ready apps to Netlify, Vercel, Cloudflare Pages, and other platforms. Setting up CI/CD pipelines so every release is fast, reliable, and repeatable.',
    tags: ['Netlify', 'Vercel', 'CI/CD', 'GitHub Actions'],
    image: '/img/services/maintenance.jpg',
    imageAlt: 'Cloud deployment and hosting workflow',
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
