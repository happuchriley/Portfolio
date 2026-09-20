import React, { useState, useEffect, useMemo } from 'react';

const Testimonials = () => {
  const testimonials = useMemo(
    () => [
      {
        text: 'THE MISFITS delivered a React app that felt designed end-to-end — clear communication, sharp UI, and no template leftovers. Easy recommend.',
        name: 'Sarah Johnson',
        role: 'CEO, TechStart Inc.',
        image: '/img/testimonial-1.jpg',
      },
      {
        text: 'They rebuilt our front end into something modern and fast. Conversion moved up, the timeline held, and the code was easy for our team to extend.',
        name: 'Michael Chen',
        role: 'Product Manager, Digital Solutions',
        image: '/img/testimonial-2.jpg',
      },
      {
        text: 'Strong frontend craft and calm professionalism. Complex React work, clean structure, solid docs — we’ll hire them again.',
        name: 'Emily Rodriguez',
        role: 'Founder, Creative Agency',
        image: '/img/testimonial-3.jpg',
      },
    ],
    []
  );

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  return (
    <section
      id="testimonials"
      className="w-full bg-background py-14 sm:py-16 lg:py-24 dark:bg-charcoal"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center sm:mb-14 wow fadeInUp" data-wow-delay="0.1s">
          <div className="title">
            <div className="title-center">
              <p className="section-kicker relative inline-block">Signal</p>
              <h2 id="testimonials-heading" className="section-title inline-block border-b-2 border-ink/15 pb-2 dark:border-cream/20">
                From collaborators
              </h2>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl wow fadeInUp" data-wow-delay="0.2s">
          <div
            className="relative overflow-hidden rounded-2xl border border-ink/10 bg-cream p-6 sm:p-8 lg:p-10 dark:border-cream/10 dark:bg-charcoal-lift"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            aria-live="polite"
          >
            <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" aria-hidden="true" />
            <div className="absolute right-0 top-0 h-full w-1.5 bg-ochre" aria-hidden="true" />
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <figure key={index} className="min-w-full px-2 sm:px-4">
                    <blockquote className="mb-6 text-base leading-relaxed text-foreground sm:text-lg md:text-xl dark:text-cream/85">
                      <p>&ldquo;{testimonial.text}&rdquo;</p>
                    </blockquote>
                    <figcaption className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt=""
                        className="collage-cutout h-14 w-14 rounded-full border-2 border-teal object-cover dark:border-ochre"
                        loading="lazy"
                        decoding="async"
                      />
                      <div>
                        <cite className="not-italic block text-base font-bold uppercase tracking-wide text-ink sm:text-lg dark:text-cream">
                          {testimonial.name}
                        </cite>
                        <span className="mt-0.5 block text-xs font-bold uppercase tracking-wider text-teal sm:text-sm dark:text-ochre">
                          {testimonial.role}
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div
              className="mt-8 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Select testimonial"
            >
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === currentTestimonial}
                  aria-label={`Show testimonial from ${testimonial.name}`}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2.5 min-h-0 transition-all ${
                    index === currentTestimonial
                      ? 'w-10 bg-primary'
                      : 'w-2.5 bg-cobalt/35 hover:bg-cobalt/55 dark:bg-teal/40 dark:hover:bg-teal/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
