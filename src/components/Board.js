import React, { Component } from 'react';
import Square from './Square';

export class Board extends Component {
  render() {
    return (
      <div className="board-container">
        <p className="player-name">
          {this.props.name === 'player' ? 'P1' : 'CPU'}
        </p>
        <div className="gameboard">
          {this.props.squares.map((square, idx) => (
            <Square
              handleClick={this.props.handleClick}
              handleDrop={this.props.handleDrop}
              getCoords={this.props.getCoords}
              key={idx}
              square={square}
              num={idx}
              name={this.props.name}
              hasBeenAttacked={this.props.hits.includes(idx)}
              hasGameStarted={this.props.hasGameStarted}
              isGameFinished={this.props.isGameFinished}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
