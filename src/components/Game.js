import React, { Component } from 'react';
import Board from './Board';
import Gameboard from '../factories/gameboard';
import { CreateShip } from '../factories/ship';

export class Game extends Component {
  state = {
    player: Gameboard(),
    enemy: Gameboard(),
    playerIsNext: true,
    isGameFinished: false,
    cpuAttacks: [],
    playerAttacks: [],
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

  parseAttack = (i, j) => parseInt(j.toString() + i.toString());

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
    } while (this.state.cpuAttacks.includes(this.parseAttack(i, j)));

    board.receiveAttack(i, j);

    // Update state of latest attack
    let attacks = this.state.cpuAttacks;
    let currentAttack = this.parseAttack(i, j);
    attacks.push(currentAttack);
    this.setState({
      cpuAttacks: attacks,
    });

    return board;
  };

  handleClick = (i, j) => {
    if (this.state.isGameFinished) return false;

    let attack = this.parseAttack(i, j);
    if (this.state.playerAttacks.includes(attack)) return;

    // append new attack
    let updatedPlayerAttacks = this.state.playerAttacks;
    updatedPlayerAttacks.push(attack);

    let updatedEnemy = this.state.enemy;
    updatedEnemy.receiveAttack(i, j);

    let updatedPlayer = this.randomAttack(this.state.player);

    this.setState({
      enemy: updatedEnemy,
      player: updatedPlayer,
      playerAttacks: updatedPlayerAttacks,
    });

    if (this.state.player.checkDone() || this.state.enemy.checkDone()) {
      console.log('Game Finished');
      this.setState({
        isGameFinished: true,
      });
    }
  };

  render() {
    return (
      <div className="game">
        <Board
          name="player"
          handleClick={this.handleClick}
          squares={this.state.player.grid.flat()}
          cpuAttacks={this.state.cpuAttacks}
          parseAttack={this.parseAttack}
          isGameFinished={this.state.isGameFinished}
        />
        <Board
          name="enemy"
          handleClick={this.handleClick}
          squares={this.state.enemy.grid.flat()}
          cpuAttacks={this.state.cpuAttacks}
          parseAttack={this.parseAttack}
          isGameFinished={this.state.isGameFinished}
        />
      </div>
    );
  }
}

export default Game;
