import React, { Component } from 'react';
import Square from './Square';

export class Board extends Component {
  render() {
    return (
      <div className="gameboard">
        {this.props.squares.map((square, idx) => (
          <Square
            handleClick={this.props.handleClick}
            key={idx}
            square={square}
            num={idx}
            name={this.props.name}
            attackedByCpu={this.props.cpuAttacks.includes(idx)}
          />
        ))}
      </div>
    );
  }
}

export default Board;
