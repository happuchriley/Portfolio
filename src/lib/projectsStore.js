const STORAGE_KEY = 'misfits-projects-v1';
const DATA_URL = `${process.env.PUBLIC_URL || ''}/data/projects.json`;

export function emptyProject() {
  return {
    id: '',
    title: '',
    category: '',
    blurb: '',
    image: '/img/projects/',
    imageClass: 'object-cover object-top',
    technologies: [],
    link: '',
    featured: false,
    published: true,
    order: 10,
  };
}

export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

export function readLocalProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : data.projects || null;
  } catch {
    return null;
  }
}

export function writeLocalProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects }));
  window.dispatchEvent(new Event('misfits-projects-updated'));
}

export function clearLocalProjects() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('misfits-projects-updated'));
}

export async function fetchSiteProjects() {
  const res = await fetch(`${DATA_URL}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
  const data = await res.json();
  return Array.isArray(data) ? data : data.projects || [];
}

export function sortProjects(list) {
  return [...list].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function downloadProjectsJson(projects) {
  const blob = new Blob([`${JSON.stringify({ projects: sortProjects(projects) }, null, 2)}\n`], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'projects.json';
  a.click();
  URL.revokeObjectURL(url);
}
