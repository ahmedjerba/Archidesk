import { useEffect, useMemo, useState } from 'preact/hooks';
import { loadProjectsFromSettings, summarizeProjectsByYear } from '../services/Bridge';

export function useDashboardLogic() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const syncDashboard = async () => {
      const loadedProjects = await loadProjectsFromSettings();
      setProjects(loadedProjects);
    };

    syncDashboard();
  }, []);

  const summary = useMemo(() => summarizeProjectsByYear(projects), [projects]);

  return {
    projects,
    totalProjects: summary.totalProjects,
    projectsThisYear: summary.projectsThisYear,
    projectsLastYear: summary.projectsLastYear,
  };
}