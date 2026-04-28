import { useState } from 'react';
import ListAppartement from './components/ListAppartement';
import AppartementDetail from './components/AppartementDetail';
import InterventionPage from './components/InterventionPage';
import ContratPage from './components/ContratPage';
import './App.css';

type View = 'list' | 'detail' | 'interventions' | 'contrats';

function App() {

  const [view, setView] = useState<View>('list');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelectAppartement = (id: number) => {
    setSelectedId(id);
    setView('detail');
  };

  const handleShowInterventions = (id: number) => {
    setSelectedId(id);
    setView('interventions');
  };

  const handleShowContrats = (id: number) => {
    setSelectedId(id);
    setView('contrats');
  };

  return (
    <div className="app-root">

      {/* Vue 1 : liste de tous les appartements */}
      {view === 'list' && (
        <ListAppartement
          onSelectAppartement={handleSelectAppartement}
        />
      )}

      {/* Vue 2 : détail d'un appartement */}
      {view === 'detail' && selectedId !== null && (
        <AppartementDetail
          appartementId={selectedId}
          onBack={() => setView('list')}
          onShowInterventions={handleShowInterventions}
          onShowContrats={handleShowContrats}
        />
      )}

      {/* Vue 3 : interventions d'un appartement */}
      {view === 'interventions' && selectedId !== null && (
        <InterventionPage
          appartementId={selectedId}
          onBack={() => setView('detail')}
        />
      )}

      {/* Vue 4 : contrats d'un appartement */}
      {view === 'contrats' && selectedId !== null && (
        <ContratPage
          appartementId={selectedId}
          onBack={() => setView('detail')}
        />
      )}

    </div>
  );
}

export default App;