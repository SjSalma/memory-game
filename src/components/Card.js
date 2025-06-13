import React from 'react';
import '../css/Card.css';

export default function Card({ symbol, flipped, onClick }) {
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">{symbol}</div>
      </div>
    </div>
  );
}
