import React, { useState, useEffect, useMemo } from 'react';

const Testimonials = () => {
  const testimonials = useMemo(() => [
    {
      text: "Working with THE MISFITS was an absolute pleasure. They delivered a stunning React application that exceeded our expectations. Their attention to detail and communication throughout the project was exceptional. Highly recommended!",
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      image: "/img/testimonial-1.jpg"
    },
    {
      text: "THE MISFITS transformed our outdated website into a modern, responsive masterpiece. Their expertise as a Frontend Developer and in UI/UX design helped us increase our conversion rate by 40%. The project was completed on time and within budget.",
      name: "Michael Chen",
      role: "Product Manager, Digital Solutions",
      image: "/img/testimonial-2.jpg"
    },
    {
      text: "I've worked with many Frontend Developers, but THE MISFITS stands out for their technical skills and professionalism. They built a complex React application with clean code and excellent documentation. Will definitely work with them again!",
      name: "Emily Rodriguez",
      role: "Founder, Creative Agency",
      image: "/img/testimonial-3.jpg"
    }
  ], []);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  return (
    <section id="testimonials" className="w-full py-10 sm:py-12 lg:py-20 bg-secondary dark:bg-dark" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10 sm:mb-12">
          <div className="title wow fadeInUp" data-wow-delay="0.1s">
            <div className="title-center">
              <p className="relative inline-block text-base sm:text-lg font-light uppercase mb-2 text-foreground/80 dark:text-gray-400">
                Testimonials
              </p>
              <h2 id="testimonials-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-dark dark:text-white border-b border-dark/20 dark:border-white/20 pb-2">
                What Clients Say
              </h2>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto w-full min-w-0 wow fadeInUp px-2 sm:px-0" data-wow-delay="0.3s">
          <div
            className="relative"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            aria-live="polite"
          >
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <figure
                    key={index}
                    className="testimonial-item text-center min-w-full px-2 min-[400px]:px-3 sm:px-4"
                  >
                    <blockquote className="text-sm min-[400px]:text-base sm:text-lg md:text-xl mb-5 sm:mb-6 text-foreground dark:text-gray-300 leading-relaxed hyphens-auto break-words">
                      <p>&ldquo;{testimonial.text}&rdquo;</p>
                    </blockquote>
                    <figcaption>
                      <cite className="not-italic text-base min-[400px]:text-lg sm:text-xl font-bold uppercase mb-2 block tracking-wide text-dark dark:text-white px-1">
                        {testimonial.name}
                      </cite>
                      <span className="text-primary text-xs min-[400px]:text-sm sm:text-base font-medium block px-2">{testimonial.role}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-2 sm:gap-3 flex-wrap" role="tablist" aria-label="Select testimonial">
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === currentTestimonial}
                  aria-label={`Show testimonial from ${testimonial.name}`}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 transition-all min-h-[48px] min-w-[48px] shrink-0 ${
                    index === currentTestimonial
                      ? 'border-primary scale-105 sm:scale-110 ring-2 ring-primary/40'
                      : 'border-dark/25 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name}, ${testimonial.role}`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
