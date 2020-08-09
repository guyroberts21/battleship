import React, { Component } from 'react';
import Board from './Board';
import { Player } from '../factories/player';
import { CreateShip } from '../factories/ship';

export class Game extends Component {
  constructor(props) {
    super(props);

    let player = Player('Player');
    let cpu = Player('Computer');
    // cpu.autoAddShips();
    player.enemy = cpu;
    cpu.enemy = player;

    this.state = {
      player,
      cpu,
      isGameFinished: false,
      winner: null,
    };
  }

  componentDidMount() {
    this.state.player.board.addShip(CreateShip('Carrier', 5, false), 0, 0);
    this.state.player.board.addShip(CreateShip('Battleship', 4, true), 3, 1);
    this.state.player.board.addShip(CreateShip('Cruiser', 3, false), 6, 8);
    this.state.player.board.addShip(CreateShip('Destroyer', 2, true), 9, 7);

    this.state.cpu.board.addShip(CreateShip('Carrier', 5, false), 0, 0);
    this.state.cpu.board.addShip(CreateShip('Battleship', 4, true), 3, 1);
    this.state.cpu.board.addShip(CreateShip('Cruiser', 3, false), 6, 8);
    this.state.cpu.board.addShip(CreateShip('Destroyer', 2, true), 9, 7);
  }

  handleClick = (i, j) => {
    if (this.state.isGameFinished) {
      // console.log('dfsdfjsdlf');
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
    });
  };

  render() {
    return (
      <div className="game">
        <Board
          name="player"
          handleClick={this.handleClick}
          squares={this.state.player.board.grid.flat()}
          hits={this.state.cpu.attacks}
          isGameFinished={this.state.isGameFinished}
        />
        <Board
          name="enemy"
          handleClick={this.handleClick}
          squares={this.state.cpu.board.grid.flat()}
          hits={this.state.player.attacks}
          isGameFinished={this.state.isGameFinished}
        />
      </div>
    );
  }
}

export default Game;
