import React, { Component } from 'react';

export class Board extends Component {
  render() {
    return (
      <div>
        {this.props.grid.map((square) => (
          <Square key="" />
        ))}
      </div>
    );
  }
}

export default Board;
