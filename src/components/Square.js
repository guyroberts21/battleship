import React, { Component } from 'react';

export class Square extends Component {
  state = {
    attacked: false,
  };

  static getDerivedStateFromProps(props, currentState) {
    if (props.attackedByCpu && props.name === 'player') {
      return {
        attacked: true,
      };
    }
    return null;
  }

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

  attackSquare = (i, j) => {
    // stop fn running if player attacks own board
    if (this.props.name !== 'enemy') return;

    this.setState({
      attacked: true,
    });
    this.props.handleClick(i, j);
  };

  render() {
    const [i, j] = this.getCoords(this.props.num);
    return (
      <div
        onClick={() => this.attackSquare(i, j)}
        className={'grid-square' + (this.state.attacked ? ' attacked' : '')}
      ></div>
    );
  }
}

export default Square;
