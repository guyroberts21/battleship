import React, { Component } from 'react';

export class Square extends Component {
  state = {
    attacked: false,
  };

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

  render() {
    const [i, j] = this.getCoords(this.props.num);
    return (
      <div
        onClick={() => this.props.handleClick(i, j)}
        className="grid-square"
      ></div>
    );
  }
}

export default Square;
