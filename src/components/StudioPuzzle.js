import React, { useEffect, useId, useRef, useState } from 'react';

const PIECES = [
  {
    id: 'spark',
    src: '/img/agency/idea-stairs.png',
    num: '01',
    label: 'Spark',
    word: 'IDEA',
    caption:
      'Filament first. A clear problem, a louder brand — then the climb from spark to open door.',
    accent: 'bg-ochre',
    pin: 'bg-ochre',
    wall: 'left-[1%] top-[4%] w-[46%] sm:w-[40%] lg:w-[36%] rotate-[-5deg] z-[2]',
  },
  {
    id: 'machine',
    src: '/img/agency/retro-terminal.png',
    num: '02',
    label: 'Machine',
    word: 'SYSTEM',
    caption:
      'Then the machine. Structure, components, constraints — the interface as a system you can ship.',
    accent: 'bg-primary',
    pin: 'bg-primary',
    wall: 'right-[2%] top-[2%] w-[44%] sm:w-[38%] lg:w-[34%] rotate-[4deg] z-[3]',
  },
  {
    id: 'create',
    src: '/img/agency/bauhaus-create.png',
    num: '03',
    label: 'Create',
    word: 'STRUCTURE',
    caption:
      'Structure first, then expression. Interfaces built like systems you can extend — not pages you decorate.',
    accent: 'bg-teal',
    pin: 'bg-teal',
    wall: 'left-[28%] top-[22%] w-[38%] sm:w-[32%] lg:w-[28%] rotate-[1.5deg] z-[4]',
  },
  {
    id: 'broken-form',
    src: '/img/agency/broken-form.png',
    num: '04',
    label: 'Broken Form',
    word: 'COLLAGE',
    caption:
      'Layer meaning. Break the template. Keep the brand loud — frontend as editorial craft.',
    accent: 'bg-cobalt',
    pin: 'bg-cobalt',
    wall: 'right-[18%] top-[28%] w-[40%] sm:w-[34%] lg:w-[30%] rotate-[-3deg] z-[5]',
  },
  {
    id: 'assemblage',
    src: '/img/agency/cubist-figure.png',
    num: '05',
    label: 'Assemblage',
    word: 'COMPOSE',
    caption:
      'Components are puzzle pieces. Compose, reuse, ship — the product is what they become together.',
    accent: 'bg-ochre',
    pin: 'bg-ochre',
    wall: 'left-[6%] bottom-[4%] w-[40%] sm:w-[34%] lg:w-[30%] rotate-[3deg] z-[6]',
  },
  {
    id: 'vision',
    src: '/img/agency/see-home.png',
    num: '06',
    label: 'Vision',
    word: 'FEEL',
    caption:
      'See what the product should feel like before the pixels settle. Clarity over decoration.',
    accent: 'bg-primary',
    pin: 'bg-primary',
    wall: 'right-[6%] bottom-[2%] w-[42%] sm:w-[36%] lg:w-[32%] rotate-[-2deg] z-[7]',
  },
];

const StudioPuzzle = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [seen, setSeen] = useState(() => new Set([0]));
  const [entered, setEntered] = useState(false);
  const titleId = useId();
  const active = PIECES[activeIndex];
  const complete = seen.size === PIECES.length;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setEntered(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setEntered(true);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = (index) => {
    setActiveIndex(index);
    setSeen((prev) => new Set(prev).add(index));
  };

  const next = () => select((activeIndex + 1) % PIECES.length);
  const prev = () => select((activeIndex - 1 + PIECES.length) % PIECES.length);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="studio-wall relative w-full overflow-hidden"
      aria-labelledby={titleId}
    >
      {/* Plaster / studio wall */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[#E8DFC8] dark:bg-charcoal" />
        <div className="studio-wall-texture absolute inset-0 opacity-60 dark:opacity-40" />
        <div className="absolute -left-20 top-0 h-[55%] w-[55%] rounded-full bg-ochre/20 blur-3xl dark:bg-ochre/10" />
        <div className="absolute -right-16 bottom-10 h-[40%] w-[45%] rounded-full bg-primary/10 blur-3xl dark:bg-primary/15" />
        <div className="studio-pegs absolute inset-0 opacity-[0.18] dark:opacity-[0.12]" />
      </div>

      <div
        className={`relative z-[1] mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-20 lg:pt-24 transition-all duration-700 ${
          entered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
          <div>
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-primary">
              Open studio
            </p>
            <h2
              id={titleId}
              className="font-display text-[clamp(1.85rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-tight text-ink dark:text-cream"
            >
              Solve the form
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/70 dark:text-cream/60 sm:text-base">
              Walk the wall. Pull a print forward — from spark and machine to collage and open door.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-sm border border-ink/20 bg-cream/80 px-4 py-2.5 shadow-sm dark:border-cream/15 dark:bg-charcoal-lift">
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-foreground/50 dark:text-cream/45">
              On the wall
            </span>
            <span className="font-display text-xl font-bold text-ink dark:text-cream">
              {seen.size}/{PIECES.length}
            </span>
          </div>
        </div>

        {/* The wall — overlapping pinned prints */}
        <div className="relative mx-auto aspect-[3/4] w-full max-w-5xl sm:aspect-[16/12] lg:aspect-[16/11]">
          <div
            className="pointer-events-none absolute inset-x-[4%] bottom-[16%] h-px bg-ink/25 dark:bg-cream/20"
            aria-hidden="true"
          />

          {PIECES.map((piece, i) => {
            const isActive = i === activeIndex;
            const wasSeen = seen.has(i);
            return (
              <button
                key={piece.id}
                type="button"
                onClick={() => select(i)}
                aria-pressed={isActive}
                aria-label={`${piece.label}: ${piece.word}`}
                className={`studio-print group absolute ${piece.wall} origin-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8DFC8] dark:focus-visible:ring-offset-charcoal`}
                style={{
                  transition:
                    'transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1), filter 0.35s ease, opacity 0.45s ease, box-shadow 0.35s ease',
                  transform: isActive
                    ? 'scale(1.12) translateY(-6px) rotate(0deg)'
                    : undefined,
                  filter: isActive ? 'none' : 'brightness(0.88) saturate(0.9)',
                  opacity: entered ? 1 : 0,
                  zIndex: isActive ? 30 : 2 + i,
                }}
              >
                <span
                  className={`relative block overflow-hidden bg-cream p-1.5 transition-shadow duration-300 sm:p-2 dark:bg-[#EDE6D8] ${
                    isActive
                      ? 'ring-2 ring-ink shadow-[0_22px_48px_-10px_rgba(0,0,0,0.5)] dark:ring-ochre'
                      : 'ring-1 ring-ink/20 shadow-[0_12px_28px_-14px_rgba(0,0,0,0.35)]'
                  }`}
                >
                  <span className="relative block aspect-[4/5] overflow-hidden bg-ink/10 sm:aspect-[5/6]">
                    <img
                      src={piece.src}
                      alt=""
                      className={`h-full w-full object-cover transition-transform duration-500 ${
                        isActive ? 'scale-100' : 'scale-[1.03] group-hover:scale-105'
                      }`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    {!isActive && (
                      <span className="absolute inset-0 bg-ink/15 dark:bg-black/25" aria-hidden="true" />
                    )}
                  </span>

                  <span className="mt-1.5 flex items-center justify-between gap-2 px-0.5">
                    <span className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-ink sm:text-xs">
                      {piece.num}
                    </span>
                    <span className="truncate text-[0.55rem] font-bold uppercase tracking-[0.14em] text-ink/55 sm:text-[0.6rem]">
                      {piece.label}
                    </span>
                  </span>
                </span>

                <span
                  className={`absolute left-1/2 top-0 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink/30 shadow-md transition-transform duration-300 ${piece.pin} ${
                    isActive ? 'scale-125' : ''
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`pointer-events-none absolute -right-1 top-6 h-5 w-12 -rotate-12 bg-ochre/70 mix-blend-multiply dark:bg-ochre/50 ${
                    i % 2 === 0 ? 'opacity-90' : 'left-2 right-auto rotate-[18deg] opacity-80'
                  }`}
                  aria-hidden="true"
                />
                {wasSeen && !isActive && (
                  <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-cream dark:bg-cream dark:text-charcoal">
                    <i className="fas fa-check text-[0.55rem]" aria-hidden="true" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Drafting table / caption rail */}
        <div className="relative z-[2] -mt-2 sm:-mt-4">
          <div className="studio-desk overflow-hidden border-x border-t border-ink/15 bg-[#D4C9B0] dark:border-cream/10 dark:bg-charcoal-lift">
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:p-7 lg:p-8">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-block px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-ink ${active.accent}`}
                  >
                    {active.label}
                  </span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ink/45 dark:text-cream/40">
                    {active.word}
                  </span>
                </div>
                <p className="max-w-2xl text-base leading-relaxed text-ink/90 dark:text-cream/85 sm:text-lg">
                  {active.caption}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border-2 border-ink/40 text-ink transition hover:border-primary hover:text-primary dark:border-cream/35 dark:text-cream dark:hover:border-ochre dark:hover:text-ochre"
                  aria-label="Previous print"
                >
                  <i className="fas fa-arrow-left text-sm" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex min-h-[44px] items-center gap-2 bg-ink px-5 text-sm font-bold uppercase tracking-wide text-cream transition hover:bg-primary dark:bg-cream dark:text-charcoal dark:hover:bg-ochre"
                >
                  Next print
                  <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
                </button>
                {complete && (
                  <a
                    href="#portfolio"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex min-h-[44px] items-center gap-2 border-2 border-primary bg-primary/10 px-4 text-sm font-bold uppercase tracking-wide text-primary transition hover:bg-primary hover:text-white dark:border-ochre dark:text-ochre dark:hover:bg-ochre dark:hover:text-charcoal"
                  >
                    See the work
                    <i className="fas fa-arrow-down text-xs" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
            <div
              className="h-2 bg-gradient-to-b from-ink/20 to-ink/5 dark:from-black/40 dark:to-transparent"
              aria-hidden="true"
            />
          </div>

          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-5 text-center text-[0.7rem] font-bold uppercase tracking-[0.2em] text-foreground/45 dark:text-cream/40">
            <span>Shapes tell stories</span>
            <span className="hidden text-primary sm:inline" aria-hidden="true">
              ●
            </span>
            <span>Color creates impact</span>
            <span className="hidden text-ochre sm:inline" aria-hidden="true">
              ●
            </span>
            <span>Design breaks rules</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default StudioPuzzle;
