import React, { useState, useRef } from 'react';

const EMAIL = 'rileyhappuch@gmail.com';
const PHONE_DISPLAY = '054 689 6286';
const PHONE_TEL = '+233546896286';
const WHATSAPP_E164 = '233546896286';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent("Hi — I'm reaching out from THE MISFITS portfolio.")}`;

const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY?.trim();
const SUBMIT_COOLDOWN_MS = 45_000;

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  company: '',
};

const Contact = () => {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const lastSubmitRef = useRef(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (formData.company) {
      return;
    }

    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
      setStatus({
        type: 'error',
        text: 'Please wait a moment before sending another message.',
      });
      return;
    }

    if (!formData.name?.trim() || !formData.email?.trim() || !formData.subject?.trim() || !formData.message?.trim()) {
      setStatus({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    if (!WEB3FORMS_KEY) {
      setStatus({
        type: 'info',
        text: `I couldn’t send that from here — please use ${EMAIL} or WhatsApp below.`,
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Portfolio] ${formData.subject.trim()}`,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          from_name: formData.name.trim(),
          replyto: formData.email.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        lastSubmitRef.current = Date.now();
        setFormData(initialForm);
        setStatus({
          type: 'success',
          text: 'Thanks — your message was sent. I’ll get back to you soon.',
        });
      } else {
        setStatus({
          type: 'error',
          text: data.message || 'Something went wrong. Try email or WhatsApp instead.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        text: 'Network error. Please try again or use email / WhatsApp.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-10 sm:py-12 lg:py-20 bg-background dark:bg-black" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10 sm:mb-12">
          <div className="title wow fadeInUp" data-wow-delay="0.1s">
            <div className="title-center">
              <p className="relative inline-block text-base sm:text-lg font-light uppercase mb-2 text-foreground/80 dark:text-gray-400">
                Contact
              </p>
              <h2 id="contact-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-dark dark:text-white border-b border-dark/20 dark:border-white/20 pb-2">
                Get In Touch
              </h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-[480px]:gap-10 lg:gap-12">
          <div className="wow fadeInUp min-w-0" data-wow-delay="0.2s">
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold uppercase mb-4 text-dark dark:text-white">Let&apos;s Work Together</h3>
              <p className="mb-6 text-base sm:text-lg text-foreground dark:text-gray-300">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out if you&apos;d like to collaborate!
              </p>
            </div>

            <address className="space-y-5 sm:space-y-6 not-italic">
              <div className="flex gap-4 items-start">
                <div className="btn-lg-square bg-primary rounded-full shrink-0 flex items-center justify-center min-h-[52px] min-w-[52px] sm:min-h-[60px] sm:min-w-[60px]" aria-hidden="true">
                  <i className="fas fa-envelope text-white"></i>
                </div>
                <div className="min-w-0 pt-1">
                  <h4 className="text-base sm:text-lg font-bold uppercase mb-1 text-dark dark:text-white">Email</h4>
                  <a className="mb-0 text-foreground dark:text-gray-300 break-all hover:text-primary transition-colors" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="btn-lg-square bg-primary rounded-full shrink-0 flex items-center justify-center min-h-[52px] min-w-[52px] sm:min-h-[60px] sm:min-w-[60px]" aria-hidden="true">
                  <i className="fas fa-phone text-white"></i>
                </div>
                <div className="min-w-0 pt-1">
                  <h4 className="text-base sm:text-lg font-bold uppercase mb-1 text-dark dark:text-white">Phone</h4>
                  <a className="mb-0 text-foreground dark:text-gray-300 hover:text-primary transition-colors" href={`tel:${PHONE_TEL}`}>
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="btn-lg-square bg-primary rounded-full shrink-0 flex items-center justify-center min-h-[52px] min-w-[52px] sm:min-h-[60px] sm:min-w-[60px]" aria-hidden="true">
                  <i className="fas fa-map-marker-alt text-white"></i>
                </div>
                <div className="min-w-0 pt-1">
                  <h4 className="text-base sm:text-lg font-bold uppercase mb-1 text-dark dark:text-white">Location</h4>
                  <p className="mb-0 text-foreground dark:text-gray-300">Available for Remote Work</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="btn-lg-square bg-primary rounded-full shrink-0 flex items-center justify-center min-h-[52px] min-w-[52px] sm:min-h-[60px] sm:min-w-[60px]" aria-hidden="true">
                  <i className="fas fa-clock text-white"></i>
                </div>
                <div className="min-w-0 pt-1">
                  <h4 className="text-base sm:text-lg font-bold uppercase mb-1 text-dark dark:text-white">Availability</h4>
                  <p className="mb-0 text-foreground dark:text-gray-300">Always available — reach out anytime.</p>
                </div>
              </div>
            </address>
          </div>

          <div className="wow fadeInUp min-w-0" data-wow-delay="0.4s">
            <form onSubmit={handleSubmit} id="contactForm" aria-label="Contact form" noValidate className="relative">
              <div className="space-y-4">
                <div
                  className="absolute left-0 top-0 -z-10 h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
                  aria-hidden="true"
                >
                  <label htmlFor="contact-company">Company</label>
                  <input
                    type="text"
                    name="company"
                    id="contact-company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-semibold text-dark dark:text-gray-200 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-base bg-background dark:bg-dark border border-dark/15 dark:border-white/15 rounded-lg text-foreground dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Your name"
                      required
                      maxLength={200}
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-semibold text-dark dark:text-gray-200 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-base bg-background dark:bg-dark border border-dark/15 dark:border-white/15 rounded-lg text-foreground dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="your@email.com"
                      required
                      maxLength={254}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-semibold text-dark dark:text-gray-200 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base bg-background dark:bg-dark border border-dark/15 dark:border-white/15 rounded-lg text-foreground dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="What is this about?"
                    required
                    maxLength={200}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-semibold text-dark dark:text-gray-200 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="contact-message w-full px-4 py-3 text-base bg-background dark:bg-dark border border-dark/15 dark:border-white/15 rounded-lg text-foreground dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-y"
                    placeholder="Leave a message here"
                    required
                    maxLength={5000}
                  ></textarea>
                </div>

                {status && (
                  <p
                    role="status"
                    className={`rounded-lg px-4 py-3 text-sm ${
                      status.type === 'success'
                        ? 'bg-green-500/15 text-green-800 dark:text-green-300 border border-green-500/30'
                        : status.type === 'info'
                          ? 'bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25'
                          : 'bg-red-500/10 text-red-800 dark:text-red-300 border border-red-500/25'
                    }`}
                  >
                    {status.text}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full py-3 min-h-[48px] text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>

                <p className="text-center text-sm text-foreground/80 dark:text-gray-400 pt-1">or</p>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-[#25D366] bg-[#25D366]/10 px-3 min-[400px]:px-4 py-3 text-sm min-[400px]:text-base font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366] hover:text-white dark:border-[#25D366] dark:bg-[#25D366]/15 dark:text-[#25D366] dark:hover:text-white text-center"
                >
                  <i className="fab fa-whatsapp text-xl" aria-hidden="true"></i>
                  Chat on WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
