import { createProjectDirectory, getDirectoryContents } from './FileOperations';
import { getEntryDateLabel, getEntryStats } from './TempManager';
import { DEFAULT_SETTINGS, loadSettings } from './ConfigPage';

const normalizePath = (value = '') => value.replace(/\\/g, '/').replace(/\/+$/, '');

const joinPath = (basePath, name) => `${normalizePath(basePath)}/${name}`;

const getYearFromTimestamp = (timestamp) => new Date(timestamp).getFullYear();

export const loadProjectsFromSettings = async () => {
	const appSettings = await loadSettings();
	const basePath = appSettings.projectsPath || DEFAULT_SETTINGS.projectsPath;
	const contents = await getDirectoryContents(basePath);

	if (!contents) {
		return [];
	}

	const mappedProjects = await Promise.all(contents.map(async (item, index) => {
		const entryPath = joinPath(basePath, item.entry);
		const stats = await getEntryStats(entryPath);
		const modifiedAt = stats?.modifiedAt ?? null;

		return {
			id: index,
			name: item.entry,
			type: item.type,
			client: 'Dossier Système',
			date: modifiedAt ? new Date(modifiedAt).toLocaleDateString('fr-FR') : await getEntryDateLabel(entryPath),
			modifiedAt,
			status: 'En cours',
			path: entryPath,
		};
	}));

	return mappedProjects.sort((left, right) => (right.modifiedAt || 0) - (left.modifiedAt || 0));
};

export const summarizeProjectsByYear = (projects) => {
	const currentYear = new Date().getFullYear();
	const previousYear = currentYear - 1;

	const projectsThisYear = projects.filter((project) => {
		const projectYear = project.modifiedAt ? getYearFromTimestamp(project.modifiedAt) : null;
		return projectYear === currentYear;
	});

	const projectsLastYear = projects.filter((project) => {
		const projectYear = project.modifiedAt ? getYearFromTimestamp(project.modifiedAt) : null;
		return projectYear === previousYear;
	});

	return {
		totalProjects: projects.length,
		projectsThisYear,
		projectsLastYear: projectsLastYear.length,
	};
};

export { createProjectDirectory };
