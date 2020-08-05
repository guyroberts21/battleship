import React, { Component } from 'react';
import Board from './Board';
import Gameboard from '../factories/gameboard';
import { CreateShip } from '../factories/ship';

export class Game extends Component {
  state = {
    lastCpuAttack: null,
    player: Gameboard(),
    enemy: Gameboard(),
    playerIsNext: true,
    isGameFinished: false,
  };

  componentDidMount() {
    this.state.player.addShip(CreateShip('Carrier', 5, false), 0, 0);
    this.state.player.addShip(CreateShip('Battleship', 4, true), 3, 1);
    this.state.player.addShip(CreateShip('Cruiser', 3, false), 6, 8);
    this.state.player.addShip(CreateShip('Destroyer', 2, true), 9, 7);

    this.state.enemy.addShip(CreateShip('Carrier', 5, false), 0, 0);
    this.state.enemy.addShip(CreateShip('Battleship', 4, true), 3, 1);
    this.state.enemy.addShip(CreateShip('Cruiser', 3, false), 6, 8);
    this.state.enemy.addShip(CreateShip('Destroyer', 2, true), 9, 7);
  }

  randomAttack = (board) => {
    // Helper fns
    function getRandomInt(i) {
      return Math.floor(Math.random() * i);
    }

    function getRandomCoords() {
      return [getRandomInt(10), getRandomInt(10)];
    }

    // Keep looking for new spot
    let i, j;
    do {
      [i, j] = getRandomCoords();
    } while (board.grid[i][j] !== null);

    board.receiveAttack(i, j);

    // Update state of latest attack
    this.setState({
      lastCpuAttack: parseInt(j.toString() + i.toString()),
    });

    return board;
  };

  handleClick = (i, j) => {
    let updatedEnemy = this.state.enemy;
    updatedEnemy.receiveAttack(i, j);

    let updatedPlayer = this.randomAttack(this.state.player);

    this.setState({
      enemy: updatedEnemy,
      player: updatedPlayer,
    });

    console.log(this.state.enemy);
    console.log(this.state.player);
  };

  render() {
    return (
      <div className="game">
        <Board
          name="player"
          handleClick={this.handleClick}
          squares={this.state.player.grid.flat()}
          lastCpuAttack={this.state.lastCpuAttack}
        />
        <Board
          name="enemy"
          handleClick={this.handleClick}
          squares={this.state.enemy.grid.flat()}
        />
      </div>
    );
  }
}

export default Game;
