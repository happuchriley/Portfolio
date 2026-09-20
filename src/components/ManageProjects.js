import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import {
  clearLocalProjects,
  downloadProjectsJson,
  emptyProject,
  fetchSiteProjects,
  readLocalProjects,
  slugify,
  sortProjects,
  writeLocalProjects,
} from '../lib/projectsStore';

const FIELD =
  'w-full border-2 border-ink/15 bg-cream px-4 py-3 text-base text-ink placeholder:text-ink/35 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-cream/20 dark:bg-charcoal dark:text-cream dark:placeholder:text-cream/35';

function ProjectForm({ value, onChange, onSubmit, onCancel, submitLabel }) {
  const set = (key, v) => onChange({ ...value, [key]: v });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4 border-2 border-ink bg-cream p-5 dark:border-cream/20 dark:bg-charcoal-lift sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-cream/45">
            Title
          </span>
          <input
            required
            className={FIELD}
            value={value.title}
            onChange={(e) => {
              const title = e.target.value;
              const next = { ...value, title };
              if (!value.id || value.id === slugify(value.title)) {
                next.id = slugify(title);
              }
              onChange(next);
            }}
            placeholder="My New App"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-cream/45">
            ID (slug)
          </span>
          <input
            required
            className={FIELD}
            value={value.id}
            onChange={(e) => set('id', slugify(e.target.value) || e.target.value)}
            placeholder="my-new-app"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-cream/45">
            Category
          </span>
          <input
            required
            className={FIELD}
            value={value.category}
            onChange={(e) => set('category', e.target.value)}
            placeholder="E-commerce, Brand site…"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-cream/45">
            Short description
          </span>
          <textarea
            required
            rows={3}
            className={FIELD}
            value={value.blurb}
            onChange={(e) => set('blurb', e.target.value)}
            placeholder="One or two sentences about what it does."
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-cream/45">
            Cover image path
          </span>
          <input
            required
            className={FIELD}
            value={value.image}
            onChange={(e) => set('image', e.target.value)}
            placeholder="/img/projects/my-app.jpg"
          />
          <span className="mt-1 block text-xs text-foreground/50 dark:text-cream/40">
            Put the file in <code className="text-primary">public/img/projects/</code> then use that path.
          </span>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-cream/45">
            Live URL
          </span>
          <input
            className={FIELD}
            type="url"
            value={value.link || ''}
            onChange={(e) => set('link', e.target.value)}
            placeholder="https://example.com"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-cream/45">
            Technologies (comma-separated)
          </span>
          <input
            className={FIELD}
            value={(value.technologies || []).join(', ')}
            onChange={(e) =>
              set(
                'technologies',
                e.target.value
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
            placeholder="React, TypeScript, Tailwind"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-cream/45">
            Order
          </span>
          <input
            type="number"
            className={FIELD}
            value={value.order ?? 10}
            onChange={(e) => set('order', Number(e.target.value) || 0)}
          />
        </label>

        <div className="flex flex-wrap items-end gap-4 pb-1">
          <label className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-ink dark:text-cream">
            <input
              type="checkbox"
              checked={!!value.featured}
              onChange={(e) => set('featured', e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            Featured
          </label>
          <label className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-ink dark:text-cream">
            <input
              type="checkbox"
              checked={value.published !== false}
              onChange={(e) => set('published', e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            Published
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button type="submit" className="btn btn-primary min-h-[48px] px-6">
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-[48px] items-center border-2 border-ink/30 px-6 text-sm font-bold uppercase tracking-wide text-ink dark:border-cream/30 dark:text-cream"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const ManageProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('list'); // list | add | edit
  const [draft, setDraft] = useState(emptyProject());
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const local = readLocalProjects();
      if (local) {
        setProjects(sortProjects(local));
        setStatus('ready');
        return;
      }
      const site = await fetchSiteProjects();
      setProjects(sortProjects(site));
      setStatus('ready');
    } catch (err) {
      setError(err.message || 'Could not load projects');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const persist = (next) => {
    const sorted = sortProjects(next);
    setProjects(sorted);
    writeLocalProjects(sorted);
    setMessage('Saved. Recent work on this device will update — download JSON to ship it live.');
  };

  const startAdd = () => {
    const nextOrder =
      projects.reduce((max, p) => Math.max(max, Number(p.order) || 0), 0) + 1;
    setDraft({ ...emptyProject(), order: nextOrder });
    setEditingId(null);
    setMode('add');
    setMessage('');
  };

  const startEdit = (project) => {
    setDraft({ ...emptyProject(), ...project, technologies: [...(project.technologies || [])] });
    setEditingId(project.id);
    setMode('edit');
    setMessage('');
  };

  const saveDraft = () => {
    if (!draft.id || !draft.title) return;
    let next;
    if (mode === 'edit' && editingId) {
      next = projects.map((p) => (p.id === editingId ? { ...draft } : p));
      // if id changed, ensure uniqueness
      if (draft.id !== editingId && next.some((p) => p.id === draft.id && p !== draft)) {
        setMessage('That ID is already used by another project.');
        return;
      }
    } else {
      if (projects.some((p) => p.id === draft.id)) {
        setMessage('That ID already exists. Pick a different slug.');
        return;
      }
      next = [...projects, { ...draft }];
    }
    persist(next);
    setMode('list');
    setDraft(emptyProject());
    setEditingId(null);
  };

  const removeProject = (id) => {
    if (!window.confirm(`Remove “${id}” from the list?`)) return;
    persist(projects.filter((p) => p.id !== id));
  };

  const resetToSite = async () => {
    if (!window.confirm('Clear local edits and reload projects from the live site files?')) return;
    clearLocalProjects();
    setMessage('Local edits cleared.');
    await load();
  };

  return (
    <div className="flex min-h-dvh flex-col bg-[#F3EBD8] dark:bg-charcoal">
      <SEO
        title="Manage projects"
        description="Add and edit portfolio projects for THE MISFITS."
        path="/manage"
        noindex
      />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none pt-20 sm:pt-24">
        <div className="container mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-6 dark:border-cream/25">
            <div>
              <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-primary">
                Studio desk
              </p>
              <h1 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold uppercase leading-tight text-ink dark:text-cream">
                Manage projects
              </h1>
              <p className="mt-2 max-w-lg text-sm text-foreground/70 dark:text-cream/60">
                Add new work or edit existing cards. This is your project desk — not a link to any live app.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-sm font-bold uppercase tracking-wide text-ink/60 transition hover:text-primary dark:text-cream/50"
            >
              ← Back to site
            </button>
          </div>

          {message && (
            <p className="mb-6 border-l-4 border-ochre bg-cream px-4 py-3 text-sm text-ink dark:bg-charcoal-lift dark:text-cream">
              {message}
            </p>
          )}

          {status === 'loading' && (
            <p className="py-12 text-center text-sm font-semibold uppercase tracking-wider text-foreground/50">
              Loading projects…
            </p>
          )}

          {status === 'error' && (
            <div className="border-2 border-primary/40 bg-cream p-6 text-center dark:bg-charcoal-lift">
              <p className="mb-4 text-foreground dark:text-cream/85">{error}</p>
              <button type="button" onClick={load} className="btn btn-primary min-h-[44px] px-6">
                Retry
              </button>
            </div>
          )}

          {status === 'ready' && mode === 'list' && (
            <>
              <div className="mb-6 flex flex-wrap gap-3">
                <button type="button" onClick={startAdd} className="btn btn-primary min-h-[48px] px-6">
                  + Add new project
                </button>
                <button
                  type="button"
                  onClick={() => {
                    downloadProjectsJson(projects);
                    setMessage('Downloaded projects.json — replace public/data/projects.json and redeploy (or commit).');
                  }}
                  className="inline-flex min-h-[48px] items-center border-2 border-ink px-5 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-cream dark:border-cream dark:text-cream dark:hover:bg-cream dark:hover:text-charcoal"
                >
                  Download JSON
                </button>
                <button
                  type="button"
                  onClick={resetToSite}
                  className="inline-flex min-h-[48px] items-center px-4 text-sm font-bold uppercase tracking-wide text-foreground/50 transition hover:text-primary dark:text-cream/40"
                >
                  Reset to site files
                </button>
              </div>

              <ul className="space-y-3">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="flex flex-col gap-4 border-2 border-ink/15 bg-cream p-4 dark:border-cream/15 dark:bg-charcoal-lift sm:flex-row sm:items-center"
                  >
                    <div className="h-20 w-full shrink-0 overflow-hidden bg-ink/5 sm:h-16 sm:w-24">
                      <img
                        src={project.image}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.opacity = '0.3';
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-ochre">
                        {project.category}
                        {project.featured ? ' · Featured' : ''}
                        {project.published === false ? ' · Hidden' : ''}
                      </p>
                      <p className="font-display text-lg font-bold uppercase text-ink dark:text-cream">
                        {project.title}
                      </p>
                      <p className="truncate text-xs text-foreground/50 dark:text-cream/40">
                        {project.link || 'No live link'} · order {project.order}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(project)}
                        className="inline-flex min-h-[44px] items-center border-2 border-ink px-4 text-xs font-bold uppercase tracking-wide text-ink dark:border-cream dark:text-cream"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => removeProject(project.id)}
                        className="inline-flex min-h-[44px] items-center px-4 text-xs font-bold uppercase tracking-wide text-primary"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {projects.length === 0 && (
                <p className="py-10 text-center text-foreground/60 dark:text-cream/50">
                  No projects yet. Click <strong>Add new project</strong> to create one.
                </p>
              )}
            </>
          )}

          {status === 'ready' && (mode === 'add' || mode === 'edit') && (
            <div>
              <h2 className="mb-4 font-display text-xl font-bold uppercase text-ink dark:text-cream">
                {mode === 'add' ? 'Add new project' : `Edit · ${editingId}`}
              </h2>
              <ProjectForm
                value={draft}
                onChange={setDraft}
                onSubmit={saveDraft}
                onCancel={() => {
                  setMode('list');
                  setDraft(emptyProject());
                  setEditingId(null);
                }}
                submitLabel={mode === 'add' ? 'Save project' : 'Update project'}
              />
            </div>
          )}

          <p className="mt-10 text-center text-xs text-foreground/45 dark:text-cream/35">
            Looking at the live site?{' '}
            <Link to="/#portfolio" className="font-bold uppercase tracking-wide text-primary hover:text-ochre">
              Jump to Recent work
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManageProjects;
