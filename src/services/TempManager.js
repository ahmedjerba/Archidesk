const hasNeutralino = () => typeof window !== 'undefined' && Boolean(window.Neutralino);

const normalizePath = (value = '') => value.replace(/\\/g, '/').replace(/\/+$/, '');

const joinPath = (basePath, name) => `${normalizePath(basePath)}/${name}`;

const formatDateFromTimestamp = (timestamp) => new Date(timestamp).toLocaleDateString('fr-FR');

const hasNeutralinoDialog = () =>
  typeof window !== 'undefined' &&
  Boolean(window.Neutralino?.os?.showFolderDialog);

export const getEntryStats = async (entryPath) => {
  if (!hasNeutralino() || !window.Neutralino.filesystem?.getStats) {
    return null;
  }

  try {
    return await window.Neutralino.filesystem.getStats(entryPath);
  } catch (error) {
    console.error('Impossible de lire les statistiques du dossier:', error);
    return null;
  }
};

export const getEntryDateLabel = async (entryPath) => {
  const stats = await getEntryStats(entryPath);

  if (stats?.modifiedAt) {
    return formatDateFromTimestamp(stats.modifiedAt);
  }

  return formatDateFromTimestamp(Date.now());
};

export const formatDateFromFileSystem = (timestamp) => formatDateFromTimestamp(timestamp);

const FILE_EXTENSIONS = {
  text: 'txt',
  word: 'docx',
  excel: 'xlsx',
  autocad: 'dwg',
};

const buildFileName = (fileName, extension) => {
  const safeName = fileName.trim();

  if (!safeName) {
    return '';
  }

  if (safeName.includes('.')) {
    return safeName;
  }

  return `${safeName}.${extension}`;
};

export async function createProjectDirectory(basePath, subFolders = []) {
  if (!hasNeutralino()) {
    return true;
  }

  if (!basePath || typeof basePath !== 'string') {
    console.error('Erreur : basePath est vide ou invalide', basePath);
    return false;
  }

  try {
    await window.Neutralino.filesystem.createDirectory(basePath);

    for (const subFolder of subFolders) {
      const fullPath = joinPath(basePath, subFolder);
      await window.Neutralino.filesystem.createDirectory(fullPath);
    }

    return true;
  } catch (error) {
    console.error('Erreur native :', error);
    return false;
  }
}

export async function getDirectoryContents(folderPath) {
  if (!hasNeutralino()) {
    return [];
  }

  try {
    const entries = await window.Neutralino.filesystem.readDirectory(folderPath);
    return entries.filter((item) => item.entry !== '.' && item.entry !== '..');
  } catch (error) {
    console.error('Erreur lors de la lecture du dossier :', error);
    return [];
  }
}

export async function createFileInFolder(folderPath, fileName, fileType = 'text', customExtension = '') {
  if (!hasNeutralino()) {
    return true;
  }

  if (!folderPath || typeof folderPath !== 'string') {
    console.error('Erreur : folderPath est vide ou invalide', folderPath);
    return false;
  }

  if (!fileName || typeof fileName !== 'string') {
    console.error('Erreur : fileName est vide ou invalide', fileName);
    return false;
  }

  const resolvedExtension = fileType === 'custom'
    ? customExtension.trim().replace(/^\./, '')
    : FILE_EXTENSIONS[fileType] || FILE_EXTENSIONS.text;

  if (!resolvedExtension) {
    console.error('Erreur : extension de fichier invalide', { fileType, customExtension });
    return false;
  }

  const finalFileName = buildFileName(fileName, resolvedExtension);

  if (!finalFileName) {
    return false;
  }

  try {
    const filePath = joinPath(folderPath, finalFileName);
    await window.Neutralino.filesystem.writeFile(filePath, '');
    return true;
  } catch (error) {
    console.error('Erreur lors de la création du fichier :', error);
    return false;
  }
}