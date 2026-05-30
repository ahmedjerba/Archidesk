const getStatusBadgeClass = (status) => {
  if (status === 'Terminé') {
    return 'bg-success-subtle text-success';
  }

  if (status === 'En cours') {
    return 'bg-primary-subtle text-primary';
  }

  return 'bg-warning-subtle text-warning';
};

const isDirectoryEntry = (project) => {
  if (project.type) {
    return project.type === 'DIRECTORY';
  }

  return !project.name.includes('.');
};

export const ProjectRow = ({ project, onOpenProject, onBrowseProject }) => (
  <tr>
    <td className="ps-4 fw-semibold text-dark">
      <span className="me-2 text-warning">{isDirectoryEntry(project) ? '📁' : '📄'}</span>{project.name}
    </td>
    <td className="text-secondary">{project.client}</td>
    <td className="text-secondary">{project.date}</td>
    <td>
      <span className={`badge px-2.5 py-1.5 rounded-pill ${getStatusBadgeClass(project.status)}`}>
        {project.status}
      </span>
    </td>
    <td className="text-end pe-4">
      <div className="btn-group gap-1">
        <button className="btn btn-sm btn-outline-secondary" onClick={() => onOpenProject(project.path)}>
          📂 Ouvrir
        </button>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => onBrowseProject(project)}
          disabled={!isDirectoryEntry(project)}
        >
          🔍 Fichiers
        </button>
      </div>
    </td>
  </tr>
);