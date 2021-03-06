import React, { Component } from 'react';
import Board from './Board';
import Ships from './Ships';
import Buttons from './Buttons';
import { Player } from '../factories/player';
import { CreateShip } from '../factories/ship';

export class Game extends Component {
  constructor(props) {
    super(props);

    let player = Player('Player');
    let cpu = Player('Computer');
    cpu.autoAddShips();
    player.enemy = cpu;
    cpu.enemy = player;

    this.state = {
      player,
      cpu,
      ships: [2, 3, 3, 4, 5],
      placeHorizontal: true,
      shipActive: null,
      draggedShips: [],
      hasGameStarted: false,
      isGameFinished: false,
      winner: null,
    };
  }

  getIndexes = (position, size, idx) => {
    let output = [];

    for (let i = 0; i < size; i++) {
      if (this.state.placeHorizontal) {
        output.push(idx - (position - i));
      } else {
        output.push(idx - (position - i) * 10);
      }
    }

    return output;
  };

  // function to convert from single num into array with i, j coords
  getCoords = (num) => {
    if (parseInt(num) < 10) {
      return [0, parseInt(num)];
    } else {
      return num
        .toString()
        .split('')
        .map((i) => parseInt(i));
    }
  };

  handleDrop = (quartileClicked, size, idx) => {
    const indexes = this.getIndexes(quartileClicked, size, idx);
    const [i, j] = this.getCoords(indexes[0]);

    const placeHorizontal = this.state.placeHorizontal;
    let updatedPlayer = this.state.player;

    const addShipSuccessfully = updatedPlayer.board.addShip(
      CreateShip(size, placeHorizontal),
      i,
      j
    );

    if (addShipSuccessfully) {
      this.setState((prevState) => ({
        player: updatedPlayer,
        hasGameStarted: true,
        draggedShips: [...prevState.draggedShips, prevState.shipActive],
      }));

      return true;
    } else {
      return false;
    }
  };

  handleClick = (i, j) => {
    if (this.state.isGameFinished) {
      return false;
    }

    let updatedPlayer = this.state.player;
    let enemy = this.state.cpu;

    const playerWon = updatedPlayer.playTurn(enemy, i, j);
    const enemyWon = enemy.randomAttack(updatedPlayer);
    console.log('Handle click i/j:', i, j);

    this.setState({
      player: updatedPlayer,
      cpu: enemy,
      isGameFinished: playerWon || enemyWon,
      winner: playerWon ? 'Player' : 'CPU',
    });
  };

  updateActiveShip = (idx) => {
    this.setState({
      shipActive: idx,
    });
  };

  flipShips = (e) => {
    this.setState((prevState) => ({
      placeHorizontal: !prevState.placeHorizontal,
    }));
  };

  render() {
    return (
      <div className="game">
        <Ships
          ships={this.state.ships}
          shipActive={this.updateActiveShip}
          draggedShips={this.state.draggedShips}
          horizontal={this.state.placeHorizontal}
        />
        <Buttons
          flipShips={this.flipShips}
          autoPlace={() => {
            if (this.state.player.board.ships.length !== 0) return;

            let updatedPlayer = this.state.player;
            updatedPlayer.autoAddShips();

            this.setState({
              player: updatedPlayer,
              // Show game has started
              hasGameStarted: true,
              // Set dragged ships to ships arr indexes
              draggedShips: [0, 1, 2, 3, 4],
            });
          }}
        />
        <Board
          name="player"
          handleClick={this.handleClick}
          handleDrop={this.handleDrop}
          getCoords={this.getCoords}
          squares={this.state.player.board.grid.flat()}
          hits={this.state.player.attacks}
          hasGameStarted={this.state.hasGameStarted}
          isGameFinished={this.state.isGameFinished}
        />
        <Board
          name="enemy"
          handleClick={this.handleClick}
          handleDrop={this.handleDrop}
          getCoords={this.getCoords}
          squares={this.state.cpu.board.grid.flat()}
          hits={this.state.cpu.attacks}
          hasGameStarted={this.state.hasGameStarted}
          isGameFinished={this.state.isGameFinished}
        />
        <div
          className={
            'winner-text' + (this.state.isGameFinished ? '' : ' hidden')
          }
        >
          <span>{this.state.winner} wins!</span>
        </div>
      </div>
    );
  }
}

export default Game;
