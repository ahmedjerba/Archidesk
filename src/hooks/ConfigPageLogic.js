import { useEffect, useState } from 'preact/hooks';
import { browseForFolder, loadSettings, saveSettings } from '../services/ConfigPage';

export function useConfigPageLogic() {
  const [projectsPath, setProjectsPath] = useState('');
  const [backupPath, setBackupPath] = useState('');
  const [autoBackup, setAutoBackup] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadCurrentSettings = async () => {
      const settings = await loadSettings();

      if (cancelled) {
        return;
      }

      setProjectsPath(settings.projectsPath);
      setBackupPath(settings.backupPath);
      setAutoBackup(settings.autoBackup);
      setIsReady(true);
    };

    loadCurrentSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      void saveSettings({
        projectsPath,
        backupPath,
        autoBackup,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [projectsPath, backupPath, autoBackup, isReady]);

  const handleBrowseProjects = async () => {
    const selectedPath = await browseForFolder('Choisir le dossier racine des projets');

    if (selectedPath) {
      setProjectsPath(selectedPath);
      setSaveMessage('');
    }
  };

  const handleBrowseBackup = async () => {
    const selectedPath = await browseForFolder('Choisir le dossier des sauvegardes');

    if (selectedPath) {
      setBackupPath(selectedPath);
      setSaveMessage('');
    }
  };

  const handleSave = async () => {
    const success = await saveSettings({
      projectsPath,
      backupPath,
      autoBackup,
    });

    setSaveMessage(success ? 'Paramètres enregistrés avec succès.' : 'Impossible d’enregistrer les paramètres.');
    return success;
  };

  return {
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
  };
}