import { useCallback, useEffect, useState } from 'react';

const DATA_URL = `${process.env.PUBLIC_URL || ''}/data/projects.json`;

/**
 * Load published projects from /public/data/projects.json
 * Edit that file (or use /admin Decap CMS) — no React changes needed.
 */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch(`${DATA_URL}?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.projects || [];
      const published = list
        .filter((p) => p && p.published !== false)
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
      setProjects(published);
      setStatus('ready');
    } catch (err) {
      setError(err.message || 'Could not load projects');
      setProjects([]);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { projects, status, error, reload: load };
}
