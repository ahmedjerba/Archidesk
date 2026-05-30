const hasNeutralino = () => typeof window !== 'undefined' && Boolean(window.Neutralino);

const normalizePath = (value = '') => value.replace(/\\/g, '/').replace(/\/+$/, '');

const joinPath = (basePath, name) => `${normalizePath(basePath)}/${name}`;

const SETTINGS_STORAGE_KEY = 'archidesk.settings';
const SETTINGS_FILE_NAME = 'archidesk-settings.json';

export const DEFAULT_SETTINGS = {
	projectsPath: 'C:/Projets_ArchiDesk',
	backupPath: 'D:/Sauvegardes_ArchiDesk',
	autoBackup: true,
};

const isBrowserStorageAvailable = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const getSettingsFilePath = () => {
	if (typeof window === 'undefined' || !window.NL_DATAPATH) {
		return null;
	}

	return joinPath(window.NL_DATAPATH, SETTINGS_FILE_NAME);
};

const readSettingsFromFile = async () => {
	const filePath = getSettingsFilePath();

	if (!filePath || !window.Neutralino?.filesystem?.readFile) {
		return null;
	}

	try {
		const fileContent = await window.Neutralino.filesystem.readFile(filePath);
		const parsedValue = JSON.parse(fileContent);

		return {
			...DEFAULT_SETTINGS,
			...parsedValue,
		};
	} catch (error) {
		return null;
	}
};

const writeSettingsToFile = async (settings) => {
	const filePath = getSettingsFilePath();

	if (!filePath || !window.Neutralino?.filesystem?.writeFile) {
		return false;
	}

	try {
		await window.Neutralino.filesystem.writeFile(filePath, JSON.stringify(settings, null, 2));
		return true;
	} catch (error) {
		console.error('Impossible de sauvegarder la configuration dans le fichier JSON:', error);
		return false;
	}
};

export const loadSettings = async () => {
	if (hasNeutralino()) {
		const fileSettings = await readSettingsFromFile();

		if (fileSettings) {
			return fileSettings;
		}
	}

	if (!isBrowserStorageAvailable()) {
		return { ...DEFAULT_SETTINGS };
	}

	try {
		const storedValue = window.localStorage.getItem(SETTINGS_STORAGE_KEY);

		if (!storedValue) {
			return { ...DEFAULT_SETTINGS };
		}

		const parsedValue = JSON.parse(storedValue);
		return {
			...DEFAULT_SETTINGS,
			...parsedValue,
		};
	} catch (error) {
		console.error('Impossible de charger la configuration de l’application:', error);
		return { ...DEFAULT_SETTINGS };
	}
};

export const saveSettings = async (settings) => {
	const normalizedSettings = {
		...DEFAULT_SETTINGS,
		...settings,
	};

	if (hasNeutralino()) {
		const fileSaved = await writeSettingsToFile(normalizedSettings);

		if (isBrowserStorageAvailable()) {
			try {
				window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(normalizedSettings));
			} catch (error) {
				console.error('Impossible de synchroniser la configuration dans localStorage:', error);
			}
		}

		return fileSaved;
	}

	if (!isBrowserStorageAvailable()) {
		return false;
	}

	try {
		window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(normalizedSettings));
		return true;
	} catch (error) {
		console.error('Impossible de sauvegarder la configuration de l’application:', error);
		return false;
	}
};

export const browseForFolder = async (dialogTitle = 'Choisir un dossier') => {
	if (hasNeutralino() && window.Neutralino?.os?.showFolderDialog) {
		try {
			return await window.Neutralino.os.showFolderDialog(dialogTitle);
		} catch (error) {
			console.error('Erreur lors de la sélection du dossier:', error);
			return null;
		}
	}

	const fallbackPath = window.prompt(`${dialogTitle}\nSaisis le chemin du dossier :`, '');
	return fallbackPath?.trim() || null;
};
