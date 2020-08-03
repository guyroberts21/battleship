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

  handleClick = (i, j) => {
    // console.log('Called from Gamejs');
    // console.log(i, j);
    let updatedEnemy = this.state.enemy;
    updatedEnemy.receiveAttack(i, j);
    this.setState({
      enemy: updatedEnemy,
    });
    console.log(this.state.enemy);
  };

  render() {
    return (
      <div className="game">
        <Board
          handleClick={this.handleClick}
          squares={this.state.player.grid.flat()}
        />
        <Board
          handleClick={this.handleClick}
          squares={this.state.enemy.grid.flat()}
        />
      </div>
    );
  }
}

export default Game;
