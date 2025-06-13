import React, { useState } from 'react';

import Settings from './components/Setting';
import Board from './components/Board';

import './css/App.css';

export default function App() {
  const [settings, setSettings] = useState(null);

  function handleCancel() {
    setSettings(null);
  }

  return (
    <div className="App">
      {settings === null && (
        <>
          <h1 className="titre-jeu">Bienvenu au</h1>
          <h2 className="soustitre-jeu">MEMORY GAME</h2>
        </>
      )}
      {settings === null ? (
        <Settings onStart={setSettings} />
      ) : (
        <Board {...settings} onCancel={handleCancel} />
      )}
    </div>
  );
}
