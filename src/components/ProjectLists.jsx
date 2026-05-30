import { useMemo, useState } from 'preact/hooks';
import { useProjectListsLogic } from '../hooks/ProjectListsLogic';
import { CreateFileModal } from './CreateFileModal';
import { NewProjectModal } from './NewProjectModal';
import { ProjectListFilters } from './ProjectListFilters';
import { ProjectListTable } from './ProjectListTable';

export function ProjectLists() {
  const {
    projects,
    isBrowsingFiles,
    currentFiles,
    currentFolderPath,
    currentFolderName,
    canGoBackFolder,
    showModal,
    showFileModal,
    name,
    client,
    status,
    fileName,
    fileType,
    customExtension,
    setShowModal,
    setShowFileModal,
    setName,
    setClient,
    setStatus,
    setFileName,
    setFileType,
    setCustomExtension,
    handleOpenPath,
    handleCreateProject,
    handleCreateFile,
    handleBrowseProject,
    handleBrowseEntry,
    handleBrowseBack,
    handleBackToProjectList,
  } = useProjectListsLogic();

  const [sorting, setSorting] = useState([]);
  const [yearSearch, setYearSearch] = useState('');
  const [folderSearch, setFolderSearch] = useState('');

  const filteredProjects = useMemo(() => {
    const normalizedYear = yearSearch.trim();
    const normalizedFolder = folderSearch.trim().toLowerCase();

    return projects.filter((project) => {
      const projectYear = project.date?.split('/')?.[2] ?? '';
      const matchesYear = !normalizedYear || projectYear.includes(normalizedYear);
      const matchesFolder =
        !normalizedFolder ||
        project.name.toLowerCase().includes(normalizedFolder) ||
        project.path.toLowerCase().includes(normalizedFolder);

      return matchesYear && matchesFolder;
    });
  }, [projects, yearSearch, folderSearch]);

  // --- VUE ---
  return (
    <div className="container-fluid m-0 p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark m-0">💼 Liste des projets</h2>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>➕ Nouveau Projet</button>
      </div>

      {/* ZONE PRINCIPALE: TABLEAU OU EXPLORATEUR */}
      <div className="card shadow-sm border-0">
        {!isBrowsingFiles ? (
          <ProjectListFilters
            folderSearch={folderSearch}
            yearSearch={yearSearch}
            onFolderSearchChange={setFolderSearch}
            onYearSearchChange={setYearSearch}
          />
        ) : null}

        {!isBrowsingFiles ? (
          <ProjectListTable
            projects={filteredProjects}
            onOpenProject={handleOpenPath}
            onBrowseProject={handleBrowseProject}
          />
        ) : (
          <>
            <div className="card-header bg-white d-flex justify-content-between align-items-center gap-3">
              <div>
                <h5 className="fw-bold m-0">📁 {currentFolderName}</h5>
                <small className="text-muted">{currentFolderPath}</small>
              </div>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => setShowFileModal(true)}
                >
                  ➕ Nouveau fichier
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleBrowseBack}
                  disabled={!canGoBackFolder}
                >
                  ← Retour
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleBackToProjectList}
                >
                  Liste projets
                </button>
              </div>
            </div>
            <div className="card-body">
              {currentFiles.map((f) => (
                <div key={f.id} className="d-flex justify-content-between p-2 border-bottom">
                  <span>{f.type === 'DIRECTORY' ? '📁' : '📄'} {f.name}</span>
                  <div className="btn-group gap-1">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleOpenPath(f.path)}
                    >
                      📂 Ouvrir
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleBrowseEntry(f)}
                      disabled={f.type !== 'DIRECTORY'}
                    >
                      🔍 Fichiers
                    </button>
                  </div>
                </div>
              ))}
              {currentFiles.length === 0 && (
                <p className="text-muted m-0">Ce dossier est vide.</p>
              )}
            </div>
          </>
        )}
      </div>

      <NewProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateProject}
        name={name}
        client={client}
        status={status}
        setName={setName}
        setClient={setClient}
        setStatus={setStatus}
      />

      <CreateFileModal
        isOpen={showFileModal}
        onClose={() => setShowFileModal(false)}
        onSubmit={handleCreateFile}
        fileName={fileName}
        fileType={fileType}
        customExtension={customExtension}
        setFileName={setFileName}
        setFileType={setFileType}
        setCustomExtension={setCustomExtension}
      />
    </div>
  );
}