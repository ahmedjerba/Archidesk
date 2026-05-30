// src/components/Dashboard.jsx
import { useDashboardLogic } from '../hooks/DashboardLogic';
import { StatCard } from './StatCard';

export function Dashboard() {
  const {
    totalProjects,
    projectsThisYear,
    projectsLastYear,
  } = useDashboardLogic();

  return (
    <div className="container-fluid m-0 p-0">
      {/* En-tête */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark m-0">📊 Tableau de bord</h2>
        <p className="text-muted small m-0">Vue d'ensemble de l'activité d'ArchiDesk.</p>
      </div>

      {/* Grille de Cartes Bootstrap - Appel direct avec paramètres */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <StatCard 
            title="Projets Totaux" 
            value={totalProjects} 
            icon="📁" 
            colorClass="bg-primary-subtle text-primary" 
          />
        </div>
        
        <div className="col-12 col-md-4">
          <StatCard 
            title="Projets Cette Année" 
            value={projectsThisYear.length} 
            icon="📅" 
            colorClass="bg-success-subtle text-success" 
          />
        </div>
        
        <div className="col-12 col-md-4">
          <StatCard 
            title="Projets Année Dernière" 
            value={projectsLastYear} 
            icon="🗓️" 
            colorClass="bg-warning-subtle text-warning" 
          />
        </div>
      </div>

      <div className="card shadow-sm border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">📂 Projets de cette année</h5>
          <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
            {projectsThisYear.length} projet(s)
          </span>
        </div>

        {projectsThisYear.length > 0 ? (
          <div className="list-group list-group-flush">
            {projectsThisYear.map((project) => (
              <div key={project.path} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                <div>
                  <strong className="d-block text-dark">{project.name}</strong>
                  <span className="text-muted small">
                    {project.date} · {project.path}
                  </span>
                </div>
                <span className="badge bg-primary-subtle text-primary rounded-pill">{project.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted mb-0">Aucun projet trouvé pour l’année en cours.</p>
        )}
      </div>
    </div>
  );
}