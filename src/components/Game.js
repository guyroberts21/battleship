import React, { Component } from 'react';
import Board from './Board';
import Ships from './Ships';
import { Player } from '../factories/player';
import { CreateShip } from '../factories/ship';

export class Game extends Component {
  constructor(props) {
    super(props);

    let player = Player('Player');
    let ships = [2, 3, 3, 4, 5];
    let cpu = Player('Computer');
    cpu.autoAddShips();
    player.enemy = cpu;
    cpu.enemy = player;

    this.state = {
      player,
      ships,
      cpu,
      isGameFinished: false,
      winner: null,
    };
  }

  componentDidMount() {
    this.state.player.board.addShip(CreateShip(5, false), 0, 0);
    this.state.player.board.addShip(CreateShip(4, true), 3, 1);
    this.state.player.board.addShip(CreateShip(3, false), 6, 8);
    this.state.player.board.addShip(CreateShip(2, true), 9, 7);
  }

  getIndexes = (position, size) => {
    let output = [];

    for (let i = 0; i < size; i++) {
      output.push(position - i);
    }

    return output;
  };

  handleDrop = (idx) => {
    console.log(idx);

    let squares = [];
    const indexes = this.getIndexes(0, 4);
    for (let num of indexes) {
      // if (isVertical === 'true') {
      //   const square = idx - num * 10;
      //   if (!droppableElements[square]) {
      //     return false;
      //   }
      //   squares.push(square);
      // }
      const square = idx - num;
      if (Math.floor(square / 10) !== Math.floor(idx / 10)) {
        return false;
      }
      squares.push(square);
    }
    console.log(squares);
  };

  handleClick = (i, j) => {
    if (this.state.isGameFinished) {
      console.log('dfsdfjsdlf');
      return false;
    }

    let updatedPlayer = this.state.player;
    let enemy = this.state.cpu;

    const playerWon = updatedPlayer.playTurn(enemy, i, j);
    const enemyWon = enemy.randomAttack(updatedPlayer);

    this.setState({
      player: updatedPlayer,
      cpu: enemy,
      isGameFinished: playerWon || enemyWon,
      winner: playerWon ? 'Player' : 'CPU',
    });
  };

  render() {
    return (
      <div className="game">
        <Ships ships={this.state.ships} />
        <Board
          name="player"
          handleClick={this.handleClick}
          handleDrop={this.handleDrop}
          squares={this.state.player.board.grid.flat()}
          hits={this.state.cpu.attacks}
          isGameFinished={this.state.isGameFinished}
        />
        <Board
          name="enemy"
          handleClick={this.handleClick}
          handleDrop={this.handleDrop}
          squares={this.state.cpu.board.grid.flat()}
          hits={this.state.player.attacks}
          isGameFinished={this.state.isGameFinished}
        />
      </div>
    );
  }
}

export default Game;
