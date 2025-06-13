import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import Themes from './Themes';
import '../css/Board.css';

function shuffle(array) {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

const gridByLevel = {
  1: { pairs: 3, cols: 3 },
  2: { pairs: 4, cols: 4 },
  3: { pairs: 5, cols: 5 },
  4: { pairs: 6, cols: 4 },
  5: { pairs: 8, cols: 4 },
  6: { pairs: 9, cols: 6 },
  7: { pairs: 12, cols: 6 },
  8: { pairs: 14, cols: 7 },
  9: { pairs: 15, cols: 6 },
  10: { pairs: 18, cols: 6 }
};

export default function Board({ theme, level, showAll, maxTries, onCancel }) {
  const config = gridByLevel[level] || { pairs: 3, cols: 2 };
  const numberOfPairs = config.pairs;
  const columns = config.cols;

  const [cards, setCards] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [matched, setMatched] = useState([]);
  const [errors, setErrors] = useState(0);
  const [canClick, setCanClick] = useState(false);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [countdown, setCountdown] = useState(showAll ? 3 : 0);
  const intervalRef = useRef(null);

  const getRandomTheme = () => {
    const options = Object.keys(Themes).filter(t => t !== 'Aléatoire');
    return options[Math.floor(Math.random() * options.length)];
  };

  const stopGame = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setGameOver(true);
    setCanClick(false);
  };

  const resetGame = () => {
    const selectedTheme = theme === 'Aléatoire' ? getRandomTheme() : theme;
    const base = Themes[selectedTheme];
    const symbols = shuffle([...base.slice(0, numberOfPairs), ...base.slice(0, numberOfPairs)]);
    const newCards = symbols.map((symbol, index) => ({
      id: index,
      symbol,
    }));

    stopGame();

    setCards(newCards);
    setRevealed([]);
    setMatched([]);
    setErrors(0);
    setCanClick(false);
    setMessage('');
    setGameOver(false);
    setElapsedTime(0);

    const start = Date.now();
    intervalRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - start) / 1000));
    }, 1000);

    if (showAll) {
      setCountdown(3);
      let c = 3;
      const count = setInterval(() => {
        setCountdown(--c);
        if (c === 0) {
          clearInterval(count);
          setRevealed([]);
          setCanClick(true);
        }
      }, 1000);
      setRevealed(newCards.map(c => c.id));
    } else {
      setCanClick(true);
    }
  };

  useEffect(() => {
    resetGame();
    return () => stopGame();
  }, [theme, level, showAll]);

  const handleClick = (index) => {
    if (!canClick || revealed.includes(index) || matched.includes(index) || gameOver) return;

    const newRevealed = [...revealed, index];
    setRevealed(newRevealed);

    if (newRevealed.length % 2 === 0) {
      setCanClick(false);
      const [first, second] = newRevealed.slice(-2);
      if (cards[first].symbol === cards[second].symbol) {
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setMessage('bravo !');

        if (newMatched.length === cards.length) {
          setMessage("C'EST GAGNÉ !");
          stopGame();
        } else {
          setCanClick(true);
        }
      } else {
        setErrors(prev => {
          const newErrors = prev + 1;
          if (maxTries !== Infinity && newErrors >= maxTries) {
            setMessage("Vous avez épuisé vos essais. Partie perdue...");
            stopGame();
          } else {
            setMessage('mauvaise paire...');
            setTimeout(() => {
              setRevealed(prev => prev.filter(i => i !== first && i !== second));
              setCanClick(true);
              setMessage('');
            }, 1000);
          }
          return newErrors;
        });
      }
    }
  };

  const essaisRestants = maxTries === Infinity ? '∞' : Math.max(0, maxTries - errors);

  const handleCancel = () => {
    stopGame();
    onCancel();
  };

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function getMessageClass(msg) {
    if (msg === "bravo !") return "message-success";
    if (msg === "mauvaise paire...") return "message-error";
    if (msg === "C'EST GAGNÉ !") return "message-win";
    if (msg.includes("épuisé")) return "message-loss";
    if (countdown > 0) return "message-countdown";
    return "";
  }

  function getTimerClass() {
    if (gameOver && matched.length === cards.length) return "timer-win";
    if (gameOver) return "timer-loss";
    return "";
  }

  const displayedMessage = countdown > 0
    ? `Fin de la prévisualisation dans : ${countdown}`
    : message;

  return (
    <div className="board">
      <h2 className="welcome-message">Bonne chance !</h2>

      <div className="status-bar">
        <p className={`timer ${getTimerClass()}`}>Temps : {formatTime(elapsedTime)}</p>
        {maxTries !== Infinity && (
          <p>Nombre d'erreur restant : {essaisRestants}</p>
        )}
      </div>

      <div className="message-zone-countdown">
        <p className={`message ${getMessageClass(displayedMessage)}`}>
          {displayedMessage || '\u00A0'}
        </p>
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${columns}, clamp(3.5rem, 6vw, 5rem))` }}

      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            symbol={card.symbol}
            onClick={() => handleClick(index)}
            flipped={revealed.includes(index) || matched.includes(index)}
          />
        ))}
      </div>

      <button className="cancel-button" onClick={handleCancel}>
        {gameOver ? 'Nouvelle partie' : 'Annuler la partie'}
      </button>
    </div>
  );
}
