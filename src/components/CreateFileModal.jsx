export function CreateFileModal({
  isOpen,
  onClose,
  onSubmit,
  fileName,
  fileType,
  customExtension,
  setFileName,
  setFileType,
  setCustomExtension,
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
              <h5 className="modal-title fw-bold">➕ Créer un fichier</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Nom du fichier</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="ex: note, devis, plan"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Type</label>
                  <select
                    className="form-select"
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                  >
                    <option value="text">Texte (.txt)</option>
                    <option value="word">Word (.docx)</option>
                    <option value="excel">Excel (.xlsx)</option>
                    <option value="autocad">AutoCAD (.dwg)</option>
                    <option value="custom">Autre extension</option>
                  </select>
                </div>
                {fileType === 'custom' && (
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary text-uppercase">Extension</label>
                    <input
                      type="text"
                      className="form-control"
                      value={customExtension}
                      onChange={(e) => setCustomExtension(e.target.value)}
                      placeholder="ex: md, csv, rvt"
                      required
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-light" onClick={onClose}>Annuler</button>
                <button type="submit" className="btn btn-primary fw-bold">Créer le fichier</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
