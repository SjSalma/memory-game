import React, { useState } from 'react';
import '../css/Setting.css';

export default function Settings({ onStart }) {
  const [theme, setTheme] = useState('Aléatoire');
  const [level, setLevel] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [maxTries, setMaxTries] = useState('∞');

  const start = () => {
    const themesDisponibles = ['Animaux', 'Emojis', 'Fruits', 'Food', 'Plantes'];
    const selectedTheme = theme === 'Aléatoire'
      ? themesDisponibles[Math.floor(Math.random() * themesDisponibles.length)]
      : theme;

    onStart({
      theme: selectedTheme,
      level: parseInt(level),
      showAll,
      maxTries: maxTries === '∞' ? Infinity : parseInt(maxTries)
    });
  };

  return (
    <div className="settings">
      <div className="form-group">
        <label>Thème des cartes :</label>
        <select value={theme} onChange={e => setTheme(e.target.value)}>
          <option>Aléatoire</option>
          <option>Animaux</option>
          <option>Emojis</option>
          <option>Fruits</option>
          <option>Food</option>
          <option>Plantes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Niveau de difficulté :</label>
        <div className="level-buttons">
          {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              className={level === n ? 'selected' : ''}
              onClick={() => setLevel(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Nombre d'erreur max autorisé :</label>
        <select value={maxTries} onChange={e => setMaxTries(e.target.value)}>
          <option value="∞">Illimité</option>
          <option value="10">10</option>
          <option value="6">6</option>
          <option value="4">4</option>
          <option value="2">2</option>
        </select>
      </div>

      <div className="checkbox-custom">
        <input
          type="checkbox"
          id="preview"
          checked={showAll}
          onChange={e => setShowAll(e.target.checked)}
        />
        <label htmlFor="preview">Prévisualisation des cartes</label>
      </div>

      <button className="btn-launch" onClick={start}>LANCER LA PARTIE</button>
    </div>
  );
}
