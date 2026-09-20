import React from 'react';
import { useProjects } from '../hooks/useProjects';

const ACCENTS = [
  { bar: 'bg-primary', text: 'text-primary' },
  { bar: 'bg-ochre', text: 'text-ochre' },
  { bar: 'bg-teal', text: 'text-teal' },
  { bar: 'bg-cobalt', text: 'text-cobalt' },
];

function ProjectBlock({ project, index }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const hasLink = project.link && project.link !== '#';
  const num = String(index + 1).padStart(2, '0');

  return (
    <article className="group flex h-full flex-col border-2 border-ink bg-cream dark:border-cream/20 dark:bg-charcoal-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
        <div className={`absolute left-0 top-0 z-[1] h-1.5 w-full ${accent.bar}`} aria-hidden="true" />
        <img
          src={project.image}
          alt={`${project.title} — ${project.category} project preview`}
          className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${project.imageClass ?? 'object-cover'}`}
          loading={index < 3 ? 'eager' : 'lazy'}
          decoding="async"
        />
        {project.featured && (
          <span className="absolute left-0 top-0 z-[2] bg-primary px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-white">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-display text-sm font-bold text-ink/30 dark:text-cream/30">
            {num}
          </span>
          <span className={`text-[0.65rem] font-bold uppercase tracking-[0.2em] ${accent.text}`}>
            {project.category}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold uppercase leading-tight text-ink sm:text-xl dark:text-cream">
          {project.title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-foreground/80 sm:text-base dark:text-cream/75">
          {project.blurb}
        </p>

        <div>
          <p className="mb-1.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-foreground/40 dark:text-cream/35">
            Built with
          </p>
          <ul className="flex flex-wrap gap-1.5" aria-label={`Technologies for ${project.title}`}>
            {(project.technologies || []).map((tech) => (
              <li key={tech}>
                <span className="inline-block border border-ink/15 bg-paper px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-ink dark:border-cream/20 dark:bg-charcoal dark:text-cream/85">
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {hasLink ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex min-h-[48px] items-center justify-center gap-2 border-2 border-ink px-5 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-cream dark:border-cream dark:text-cream dark:hover:bg-cream dark:hover:text-charcoal"
          >
            Open live site
            <i className="fas fa-arrow-up-right-from-square text-[0.65rem]" aria-hidden="true" />
          </a>
        ) : (
          <p className="mt-auto text-xs font-semibold uppercase tracking-wider text-foreground/40 dark:text-cream/35">
            Link coming soon
          </p>
        )}
      </div>
    </article>
  );
}

const Portfolio = () => {
  const { projects, status, error, reload } = useProjects();

  return (
    <section
      id="portfolio"
      className="relative w-full overflow-hidden bg-[#F3EBD8] py-16 sm:py-20 lg:py-28 dark:bg-charcoal"
      aria-labelledby="portfolio-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-[6%] top-[6%] h-[28vmin] w-[28vmin] rounded-full bg-ochre/20 dark:bg-ochre/10" />
        <div className="absolute bottom-[10%] right-[-8%] h-[36vmin] w-[36vmin] rounded-full border-[1.5rem] border-ink/8 dark:border-cream/8" />
      </div>

      <div className="relative z-[1] container mx-auto max-w-7xl px-4">
        <header className="mb-10 border-b-2 border-ink pb-6 dark:border-cream/25 sm:mb-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-primary">
                Portfolio
              </p>
              <h2
                id="portfolio-heading"
                className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-ink dark:text-cream"
              >
                Recent work
              </h2>
            </div>
            {status === 'ready' && projects.length > 0 && (
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-foreground/50 dark:text-cream/45">
                {projects.length} projects · live links
              </p>
            )}
          </div>
          <p className="mt-4 max-w-xl text-base text-foreground/75 dark:text-cream/65">
            Each project below shows what it is, what it was built with, and a link to the live site.
          </p>
        </header>

        {status === 'loading' && (
          <p className="py-16 text-center text-sm font-semibold uppercase tracking-wider text-foreground/60 dark:text-cream/50">
            Loading projects…
          </p>
        )}

        {status === 'error' && (
          <div className="mx-auto max-w-md border-2 border-primary/40 bg-cream p-6 text-center dark:bg-charcoal-lift">
            <p className="mb-4 text-foreground dark:text-cream/85">{error}</p>
            <button type="button" onClick={reload} className="btn btn-primary min-h-[44px] px-6">
              Retry
            </button>
          </div>
        )}

        {status === 'ready' && projects.length === 0 && (
          <p className="py-16 text-center text-foreground/70 dark:text-cream/60">
            No published projects yet. Add entries in{' '}
            <code className="bg-ink/5 px-1.5 py-0.5 text-sm dark:bg-cream/10">
              public/data/projects.json
            </code>{' '}
            or open <code className="bg-ink/5 px-1.5 py-0.5 text-sm dark:bg-cream/10">/admin</code>.
          </p>
        )}

        {status === 'ready' && projects.length > 0 && (
          <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {projects.map((project, index) => (
              <ProjectBlock
                key={project.id || project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
