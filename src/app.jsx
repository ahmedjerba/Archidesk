// src/app.jsx
import { useState } from 'preact/hooks';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/dashboard';
import { ProjectLists } from './components/ProjectLists'; 
import { Settings } from './components/Settings'; // <-- Ajoute cette ligne// <-- On importe uniquement le Dashboard

export function App() {
  // On démarre directement sur le tableau de bord pour le tester
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <div className="d-flex vh-100 bg-light-subtle m-0 p-0 overflow-hidden">
      {/* 1. La Barre Latérale */}
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* 2. Zone de Contenu Principal */}
      <main className="flex-grow-1 p-4 overflow-auto">
        
        {/* Test du Dashboard avec ses cartes autonomes */}
        {currentTab === 'dashboard' && (
          <Dashboard />
        )}

        {/* Simple conteneur temporaire pour éviter les erreurs si tu cliques dessus */}
        {currentTab === 'projects' && (
          <div className="container-fluid">
            <ProjectLists />
          </div>
        )}

        {currentTab === 'settings' && (
          <Settings />
        )}
      </main>
    </div>
  );
}