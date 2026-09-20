import React from 'react';

const tagStyles = ['tag-chip-primary', 'tag-chip-ochre', 'tag-chip-teal', 'tag-chip-cobalt'];
const ringColors = [
  'border-primary/45',
  'border-ochre/55',
  'border-teal/50',
  'border-cobalt/50',
];

const services = [
  {
    title: 'Product UI',
    description:
      'React and Next.js interfaces with solid component architecture — APIs wired cleanly, screens that feel intentional.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    image: '/img/services/frontend-development.jpg',
    imageAlt: 'Product UI across devices',
    align: 'left',
  },
  {
    title: 'Commerce & checkout',
    description:
      'Storefronts and payment flows with Paystack or Stripe — secure checkout, clear UX, ready to take orders.',
    tags: ['Paystack', 'Stripe', 'Supabase', 'REST'],
    image: '/img/services/ecommerce.jpg',
    imageAlt: 'Commerce checkout experience',
    align: 'right',
  },
  {
    title: 'Responsive systems',
    description:
      'Layouts and design tokens that hold across phone, tablet, and desktop — hierarchy first, decoration second.',
    tags: ['Design systems', 'A11y', 'Tailwind'],
    image: '/img/services/responsive-design.jpg',
    imageAlt: 'Responsive layout system',
    align: 'left',
  },
  {
    title: 'Ship & speed',
    description:
      'Netlify, Vercel, CI/CD, and Core Web Vitals work so releases stay fast after launch — not only on day one.',
    tags: ['Netlify', 'Vercel', 'CI/CD', 'CWV'],
    image: '/img/services/performance.jpg',
    imageAlt: 'Performance and deployment',
    align: 'right',
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="w-full bg-background py-16 sm:py-20 lg:py-28 dark:bg-charcoal"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center sm:mb-14">
          <div className="title wow fadeInUp" data-wow-delay="0.1s">
            <div className="title-center">
              <p className="section-kicker relative inline-block">Capabilities</p>
              <h2
                id="services-heading"
                className="section-title inline-block border-b-2 border-ink/15 pb-2 dark:border-cream/20"
              >
                How we ship
              </h2>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-lg text-base text-foreground/75 dark:text-cream/65">
            Focused offers for product teams — not a bloated agency menu.
          </p>
        </div>

        {services.map((item, index) => (
          <div
            key={item.title}
            className={`service-item mt-8 overflow-hidden sm:mt-10 ${
              item.align === 'left' ? 'service-item-left' : 'service-item-right'
            }`}
          >
            <div
              className={`flex flex-col items-center ${
                item.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              <div
                className={`mx-auto w-full min-w-0 max-w-md p-4 min-[400px]:p-6 sm:p-8 md:max-w-none md:w-5/12 wow ${
                  item.align === 'right' ? 'fadeInLeft' : 'fadeInRight'
                }`}
                data-wow-delay="0.2s"
              >
                <div className="relative inline-block w-full">
                  <img
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    className="collage-cutout aspect-[3/2] w-full rounded-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-full border-[0.45rem] min-[400px]:border-[0.75rem] sm:border-[1.25rem] md:border-[2rem] lg:border-[2.5rem] ${ringColors[index % ringColors.length]}`}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div
                className={`w-full min-w-0 px-4 py-6 sm:px-6 sm:py-8 md:w-7/12 md:py-12 lg:px-10 ${
                  item.align === 'right' ? 'md:text-right' : ''
                } wow ${item.align === 'right' ? 'fadeInLeft' : 'fadeInRight'}`}
                data-wow-delay="0.45s"
              >
                <h3 className="mb-3 text-xl font-bold uppercase leading-snug text-ink sm:text-2xl dark:text-cream">
                  {item.title}
                </h3>
                <p className="mb-5 text-base leading-relaxed text-foreground/90 sm:text-lg dark:text-cream/80">
                  {item.description}
                </p>
                <div
                  className={`flex flex-wrap gap-2 ${item.align === 'right' ? 'md:justify-end' : ''}`}
                >
                  {item.tags.map((tag, tagIndex) => (
                    <span key={tag} className={tagStyles[(index + tagIndex) % tagStyles.length]}>
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
