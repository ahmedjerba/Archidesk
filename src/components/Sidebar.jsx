export function Sidebar({currentTab,setCurrentTab}){
    return(
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100" style={{ width: '260px' }}>
      {/* Logo / Titre */}
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4 fw-bold">📁 ArchiDesk</span>
      </div>
      <hr />

      {/* Menu de Navigation */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button 
            className={`nav-link w-100 text-start text-white border-0 ${currentTab === 'dashboard' ? 'active bg-primary' : 'bg-transparent'}`}
            onClick={() => setCurrentTab('dashboard')}
          >
            <span className="me-2">📊</span> Tableau de bord
          </button>
        </li>
        <li className="nav-item mt-2">
          <button 
            className={`nav-link w-100 text-start text-white border-0 ${currentTab === 'projects' ? 'active bg-primary' : 'bg-transparent'}`}
            onClick={() => setCurrentTab('projects')}
          >
            <span className="me-2">💼</span> Liste des projets
          </button>
        </li>
        <li className="nav-item mt-2">
          <button 
            className={`nav-link w-100 text-start text-white border-0 ${currentTab === 'settings' ? 'active bg-primary' : 'bg-transparent'}`}
            onClick={() => setCurrentTab('settings')}
          >
            <span className="me-2">⚙️</span> Paramètres
          </button>
        </li>
      </ul>
      
      <hr />
      {/* Pied de page de la sidebar */}
      <div className="small text-muted text-center">
        Projet 3ammi Mahdi v1.0
      </div>
    </div>
  );
}