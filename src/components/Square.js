import React, { Component } from 'react';

export class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attacked: false,
      attackedByCpu: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ attackedByCpu: nextProps.attackedByCpu });
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
        className={
          (this.state.attacked || this.state.attackedByCpu ? 'attacked' : '') +
          ' grid-square'
        }
      ></div>
    );
  }
}

export default Square;
