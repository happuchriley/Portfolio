import React, { useState, useRef } from 'react';
import {
  CONTACT_EMAILS,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_E164,
} from '../constants/contact';

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(
  "Hi — I'd like to start a project with THE MISFITS."
)}`;

const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY?.trim();
const SUBMIT_COOLDOWN_MS = 45_000;

const fieldClass =
  'field-input w-full rounded-full border-2 border-ink/12 bg-paper px-5 py-3.5 text-base text-foreground placeholder:text-foreground/40 shadow-none transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-cream/15 dark:bg-charcoal dark:text-cream dark:placeholder:text-cream/40';

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

    if (formData.company) return;

    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
      setStatus({
        type: 'error',
        text: 'Give it a moment before sending another note.',
      });
      return;
    }

    if (
      !formData.name?.trim() ||
      !formData.email?.trim() ||
      !formData.subject?.trim() ||
      !formData.message?.trim()
    ) {
      setStatus({ type: 'error', text: 'Fill in every field so I can reply properly.' });
      return;
    }

    if (!WEB3FORMS_KEY) {
      setStatus({
        type: 'info',
        text: `Form isn’t connected yet — email ${CONTACT_EMAILS.join(' or ')} or WhatsApp below.`,
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('access_key', WEB3FORMS_KEY);
      payload.append('name', formData.name.trim());
      payload.append('email', formData.email.trim());
      payload.append('subject', `[THE MISFITS] ${formData.subject.trim()}`);
      payload.append('message', formData.message.trim());
      payload.append('from_name', formData.name.trim());
      payload.append('replyto', formData.email.trim());

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        lastSubmitRef.current = Date.now();
        setFormData(initialForm);
        setStatus({
          type: 'success',
          text: 'Message sent. I’ll get back to you soon.',
        });
      } else {
        setStatus({
          type: 'error',
          text: data.message || 'Something broke — try email or WhatsApp.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        text: 'Network issue. Retry, or use email / WhatsApp.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-paper py-16 sm:py-20 lg:py-28 dark:bg-charcoal paper-surface"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center sm:mb-14 wow fadeInUp" data-wow-delay="0.1s">
          <div className="title">
            <div className="title-center">
              <p className="section-kicker relative inline-block">Contact</p>
              <h2
                id="contact-heading"
                className="section-title inline-block border-b-2 border-ink/15 pb-2 dark:border-cream/20"
              >
                Let’s talk
              </h2>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-lg text-base text-foreground/75 dark:text-cream/65">
            Briefs, collaborations, and roles — send the short version of what you’re building.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="wow fadeInUp min-w-0" data-wow-delay="0.15s">
            <h3 className="mb-3 text-xl font-bold uppercase text-ink sm:text-2xl dark:text-cream">
              Direct lines
            </h3>
            <p className="mb-8 max-w-md text-base leading-relaxed text-foreground/85 dark:text-cream/75">
              Prefer a quick ping? Use email or WhatsApp. Prefer a structured brief? Use the form.
            </p>

            <address className="space-y-5 not-italic">
              {[
                {
                  icon: 'fas fa-envelope',
                  bg: 'bg-primary',
                  iconColor: 'text-white',
                  title: 'Email',
                  body: CONTACT_EMAILS.map((address) => (
                    <a
                      key={address}
                      className="block break-all text-foreground transition-colors hover:text-primary dark:text-cream/85"
                      href={`mailto:${address}`}
                    >
                      {address}
                    </a>
                  )),
                },
                {
                  icon: 'fas fa-phone',
                  bg: 'bg-ochre',
                  iconColor: 'text-ink',
                  title: 'Phone',
                  body: (
                    <a
                      className="text-foreground transition-colors hover:text-ochre dark:text-cream/85"
                      href={`tel:${PHONE_TEL}`}
                    >
                      {PHONE_DISPLAY}
                    </a>
                  ),
                },
                {
                  icon: 'fas fa-map-marker-alt',
                  bg: 'bg-teal',
                  iconColor: 'text-white',
                  title: 'Base',
                  body: (
                    <p className="mb-0 text-foreground dark:text-cream/85">
                      Accra, Ghana · Remote-friendly
                    </p>
                  ),
                },
                {
                  icon: 'fas fa-clock',
                  bg: 'bg-cobalt',
                  iconColor: 'text-white',
                  title: 'Response',
                  body: (
                    <p className="mb-0 text-foreground dark:text-cream/85">
                      Usually within one business day
                    </p>
                  ),
                },
              ].map((row) => (
                <div key={row.title} className="flex items-start gap-4">
                  <div
                    className={`btn-lg-square ${row.bg} flex min-h-[52px] min-w-[52px] shrink-0 items-center justify-center sm:min-h-[56px] sm:min-w-[56px]`}
                    aria-hidden="true"
                  >
                    <i className={`${row.icon} ${row.iconColor}`} />
                  </div>
                  <div className="min-w-0 pt-1">
                    <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-ink dark:text-cream">
                      {row.title}
                    </h4>
                    {row.body}
                  </div>
                </div>
              ))}
            </address>
          </div>

          <div className="wow fadeInUp min-w-0" data-wow-delay="0.25s">
            <form
              onSubmit={handleSubmit}
              id="contactForm"
              aria-label="Project inquiry form"
              noValidate
              className="relative overflow-hidden rounded-3xl border border-ink/10 bg-cream p-6 shadow-sm dark:border-cream/10 dark:bg-surface sm:p-8"
            >
              <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" aria-hidden="true" />
              <div className="absolute right-0 top-0 h-full w-1.5 bg-teal" aria-hidden="true" />
              <p className="mb-5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ochre">
                Project brief
              </p>
              <div className="space-y-4">
                <div
                  className="pointer-events-none absolute left-0 top-0 -z-10 h-0 w-0 overflow-hidden opacity-0"
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

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink dark:text-cream">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder="Your name"
                      required
                      maxLength={200}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink dark:text-cream">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder="you@company.com"
                      required
                      maxLength={254}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink dark:text-cream">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={fieldClass}
                    placeholder="New product UI / rebuild / role…"
                    required
                    maxLength={200}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink dark:text-cream">
                    Brief
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${fieldClass} contact-message !rounded-2xl resize-y`}
                    placeholder="What are you building, who’s it for, and when do you need it?"
                    required
                    maxLength={5000}
                    rows={5}
                  />
                </div>

                {status && (
                  <p
                    role="status"
                    className={`rounded-2xl border-2 px-4 py-3 text-sm ${
                      status.type === 'success'
                        ? 'border-teal/40 bg-teal/10 text-teal dark:text-teal'
                        : status.type === 'info'
                          ? 'border-ochre/40 bg-ochre/10 text-ink dark:text-ochre'
                          : 'border-primary/40 bg-primary/10 text-primary'
                    }`}
                  >
                    {status.text}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full min-h-[52px] py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Send brief'}
                </button>

                <p className="pt-1 text-center text-xs font-semibold uppercase tracking-wider text-foreground/50 dark:text-cream/45">
                  or
                </p>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-[#25D366] bg-[#25D366]/10 px-4 py-3 text-sm font-bold uppercase tracking-wide text-[#128C7E] transition-colors hover:bg-[#25D366] hover:text-white dark:text-[#25D366] dark:hover:text-white"
                >
                  <i className="fab fa-whatsapp text-xl" aria-hidden="true" />
                  WhatsApp
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
