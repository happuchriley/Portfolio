import { useCallback, useEffect, useState } from 'react';
import {
  fetchSiteProjects,
  readLocalProjects,
  sortProjects,
} from '../lib/projectsStore';

/**
 * Load projects for Recent work.
 * Prefer local manage-desk edits (localStorage), else public/data/projects.json.
 * Manage at /manage — add, edit, remove without touching React components.
 */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const local = readLocalProjects();
      const list = local || (await fetchSiteProjects());
      const published = sortProjects(list).filter((p) => p && p.published !== false);
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
    const onUpdate = () => load();
    window.addEventListener('misfits-projects-updated', onUpdate);
    window.addEventListener('storage', onUpdate);
    return () => {
      window.removeEventListener('misfits-projects-updated', onUpdate);
      window.removeEventListener('storage', onUpdate);
    };
  }, [load]);

  return { projects, status, error, reload: load };
}
