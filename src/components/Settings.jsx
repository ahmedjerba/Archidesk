// src/components/Settings.jsx
import { useConfigPageLogic } from '../hooks/ConfigPageLogic';

export function Settings() {
  const {
    projectsPath,
    backupPath,
    autoBackup,
    saveMessage,
    setProjectsPath,
    setBackupPath,
    setAutoBackup,
    handleBrowseProjects,
    handleBrowseBackup,
    handleSave,
  } = useConfigPageLogic();

  return (
    <div className="container-fluid m-0 p-0">
      {/* En-tête */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark m-0">⚙️ Paramètres</h2>
        <p className="text-muted small m-0">Configurez les dossiers locaux et le comportement d'ArchiDesk.</p>
      </div>

      <div className="row g-4">
        {/* Colonne Principale : Configuration des Chemins */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 p-4 mb-4">
            <h5 className="fw-bold text-dark mb-4">📂 Emplacements des fichiers</h5>
            
            {/* Dossier des Projets */}
            <div className="mb-4">
              <label className="form-label text-secondary small fw-bold text-uppercase">Dossier racine des projets</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-secondary">📁</span>
                <input 
                  type="text" 
                  className="form-control bg-light" 
                  value={projectsPath} 
                  onChange={(e)=>setProjectsPath(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={handleBrowseProjects}>
                  Parcourir...
                </button>
              </div>
              <div className="form-text text-muted">C'est ici que l'application cherchera et créera les dossiers de chantiers.</div>
            </div>

            {/* Dossier de Sauvegarde */}
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold text-uppercase">Dossier des sauvegardes (Backup)</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-secondary">🛡️</span>
                <input 
                  type="text" 
                  className="form-control bg-light" 
                  value={backupPath} 
                  onChange={(e) => setBackupPath(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={handleBrowseBackup}>
                  Parcourir...
                </button>
              </div>
              <div className="form-text text-muted">Emplacement des copies de sécurité automatiques.</div>
            </div>
          </div>

          {/* Options Générales */}
          <div className="card shadow-sm border-0 p-4 mb-4">
            <h5 className="fw-bold text-dark mb-3">🛠️ Options de l'application</h5>
            
            <div className="form-check form-switch py-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                id="autoBackupCheck"
                checked={autoBackup}
                onChange={(e) => setAutoBackup(e.target.checked)}
              />
              <label className="form-check-input-label fw-semibold text-dark ms-2" htmlFor="autoBackupCheck">
                Sauvegarde automatique à la fermeture
              </label>
              <div className="text-muted small ms-2">Crée un zip de sécurité du projet actif en quittant ArchiDesk.</div>
            </div>
          </div>

          {/* Bouton Enregistrer */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary px-4 py-2 shadow-sm fw-bold" onClick={handleSave}>
              Enregistrer les modifications
            </button>
          </div>
          {saveMessage && (
            <div className="alert alert-info mt-3 mb-0 py-2">
              {saveMessage}
            </div>
          )}
        </div>

        {/* Colonne Latérale : Infos Système */}
        <div className="col-12 col-lg-4">
          <div className="card bg-dark text-white border-0 p-4 h-100">
            <h5 className="fw-bold mb-3">💻 Infos Système</h5>
            <hr className="text-secondary" />
            <div className="small mb-2"><span className="text-secondary">Application :</span> ArchiDesk v1.0</div>
            <div className="small mb-2"><span className="text-secondary">Environnement :</span> NeutralinoJS / Preact</div>
            <div className="small mb-4"><span className="text-secondary">Utilisateur :</span> Bureau Principal</div>
            <div className="bg-secondary bg-opacity-25 p-3 rounded-3 border border-secondary border-opacity-25 text-center mt-auto">
              <span className="d-block small text-secondary">Statut du pont natif</span>
              <span className="badge bg-success mt-1 px-3 py-2 rounded-pill">Opérationnel ✅</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}