export function ProjectListFilters({ folderSearch, yearSearch, onFolderSearchChange, onYearSearchChange }) {
  return (
    <div className="card-body border-bottom bg-white">
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label small fw-bold text-secondary text-uppercase">Rechercher par nom de dossier</label>
          <input
            type="search"
            className="form-control"
            placeholder="Ex: Villa, Hotel, Residence..."
            value={folderSearch}
            onChange={(e) => onFolderSearchChange(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <label className="form-label small fw-bold text-secondary text-uppercase">Rechercher par année</label>
          <input
            type="number"
            className="form-control"
            placeholder="2026"
            value={yearSearch}
            onChange={(e) => onYearSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
