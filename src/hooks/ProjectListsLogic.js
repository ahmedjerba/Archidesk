import { useEffect, useState } from 'preact/hooks';
import { createFileInFolder, createProjectDirectory, getDirectoryContents } from '../services/FileOperations';
import { getEntryDateLabel } from '../services/TempManager';
import { DEFAULT_SETTINGS, loadSettings } from '../services/ConfigPage';

export const PROJECTS_BASE_PATH = DEFAULT_SETTINGS.projectsPath;

export const PROJECT_SUBFOLDERS = ['Plans', 'Photos', 'Devis', 'Contrats'];

const normalizePath = (value = '') => value.replace(/\\/g, '/').replace(/\/+$/, '');

const joinPath = (basePath, name) => `${normalizePath(basePath)}/${name}`;

const formatProjectName = (projectName) => projectName.trim().replace(/\s+/g, '_');

export const buildProjectPath = (basePath, projectName) =>
  joinPath(basePath.trim(), formatProjectName(projectName));

export const mapDirectoryContentsToProjects = async (contents, basePath) =>
  Promise.all(contents.map(async (item, index) => ({
    id: index,
    name: item.entry,
    type: item.type,
    client: 'Dossier Système',
    date: await getEntryDateLabel(joinPath(basePath, item.entry)),
    status: 'En cours',
    path: joinPath(basePath, item.entry),
  })));

export const mapDirectoryContentsToFiles = (contents, projectPath) =>
  contents.map((item, index) => ({
    id: index,
    name: item.entry,
    path: joinPath(projectPath, item.entry),
    type: item.type,
  }));

const getFolderNameFromPath = (value) => {
  if (!value) {
    return '';
  }

  const normalized = value.replace(/\\/g, '/').replace(/\/$/, '');
  const chunks = normalized.split('/');
  return chunks[chunks.length - 1] || normalized;
};

export const createNewProjectRecord = async (projectName, client, status, finalPath) => ({
  id: Date.now(),
  name: projectName,
  type: 'DIRECTORY',
  client,
  status,
  date: await getEntryDateLabel(finalPath),
  path: finalPath,
});

export function useProjectListsLogic() {
  const [projects, setProjects] = useState([]);
  const [projectsBasePath, setProjectsBasePath] = useState(PROJECTS_BASE_PATH);
  const [selectedProjectName, setSelectedProjectName] = useState(null);
  const [currentEntries, setCurrentEntries] = useState([]);
  const [currentFolderPath, setCurrentFolderPath] = useState(null);
  const [folderHistory, setFolderHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [status, setStatus] = useState('En cours');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('text');
  const [customExtension, setCustomExtension] = useState('');

  useEffect(() => {
    const syncWithFileSystem = async () => {
      const appSettings = await loadSettings();
      const basePath = appSettings.projectsPath || DEFAULT_SETTINGS.projectsPath;
      setProjectsBasePath(basePath);

      const contents = await getDirectoryContents(basePath);
      if (contents) {
        const mappedProjects = await mapDirectoryContentsToProjects(contents, basePath);
        setProjects(mappedProjects);
      }
    };

    syncWithFileSystem();
  }, []);

  const handleOpenPath = async (folderPath) => {
    if (window.Neutralino) {
      try {
        await window.Neutralino.os.open(folderPath);
      } catch (error) {
        alert('Erreur : ' + error);
      }
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const finalPath = buildProjectPath(projectsBasePath, name);
    const success = await createProjectDirectory(finalPath, PROJECT_SUBFOLDERS);

    if (success) {
      const newProject = await createNewProjectRecord(name, client, status, finalPath);
      setProjects((previous) => [...previous, newProject]);
      setShowModal(false);
      setName('');
      setClient('');
    }
  };

  const handleCreateFile = async (e) => {
    e.preventDefault();

    if (!currentFolderPath) {
      return;
    }

    const success = await createFileInFolder(currentFolderPath, fileName, fileType, customExtension);

    if (success) {
      setShowFileModal(false);
      setFileName('');
      setFileType('text');
      setCustomExtension('');
      await loadFolderContents(currentFolderPath);
    }
  };

  const loadFolderContents = async (folderPath) => {
    const contents = await getDirectoryContents(folderPath);
    if (contents) {
      setCurrentFolderPath(folderPath);
      setCurrentEntries(mapDirectoryContentsToFiles(contents, folderPath));
    }
  };

  const handleBrowseProject = async (project) => {
    setSelectedProjectName(project.name);
    setFolderHistory([]);
    await loadFolderContents(project.path);
  };

  const handleBrowseEntry = async (entry) => {
    if (entry.type === 'DIRECTORY') {
      setFolderHistory((previous) => [...previous, currentFolderPath]);
      await loadFolderContents(entry.path);
      return;
    }

    await handleOpenPath(entry.path);
  };

  const handleBrowseBack = async () => {
    if (folderHistory.length === 0) {
      return;
    }

    const previousFolder = folderHistory[folderHistory.length - 1];
    setFolderHistory((previous) => previous.slice(0, -1));
    await loadFolderContents(previousFolder);
  };

  const handleBackToProjectList = () => {
    setSelectedProjectName(null);
    setCurrentFolderPath(null);
    setCurrentEntries([]);
    setFolderHistory([]);
  };

  const currentFolderName = getFolderNameFromPath(currentFolderPath) || selectedProjectName;

  return {
    projects,
    isBrowsingFiles: Boolean(currentFolderPath),
    currentFiles: currentEntries,
    currentFolderPath,
    currentFolderName,
    canGoBackFolder: folderHistory.length > 0,
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
  };
}