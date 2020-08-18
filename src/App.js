import React from 'react';
import Game from './components/Game';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Game />
      <p className="game-info">drag and drop the ships to play.</p>
    </div>
  );
}

export default App;
