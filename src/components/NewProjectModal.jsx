export function NewProjectModal({
  isOpen,
  onClose,
  onSubmit,
  name,
  client,
  status,
  setName,
  setClient,
  setStatus,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal d-block fade show" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-light">
              <h5 className="modal-title fw-bold">➕ Ajouter un nouveau projet</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Nom du projet</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Nom du Client</label>
                  <input
                    type="text"
                    className="form-control"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Statut</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="En cours">En cours</option>
                    <option value="En attente">En attente</option>
                    <option value="Terminé">Terminé</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-light" onClick={onClose}>Annuler</button>
                <button type="submit" className="btn btn-primary fw-bold">Créer le Projet</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
