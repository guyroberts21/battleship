import React, { Component } from 'react';

export class Square extends Component {
  state = {
    attacked: false,
  };

  // Note: In order to change the state of this component when the cpu attacks a specific square, I had to pass
  // down props from the top-level component and hold a list of the cpu attacks to check whether any given
  // square was part of the list.

  // This method is very rarely used and alternative options are encouraged but I am still working on finding
  // another way to structure my code.
  static getDerivedStateFromProps(props, currentState) {
    if (props.hasBeenAttacked && props.name === 'player') {
      return {
        attacked: true,
      };
    }
    return null;
  }

  // function to convert from single num into array with i, j coords
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

  // This method was created to get the status of any given square
  getSquareState = (s) => {
    // only add class if square has been attacked
    if (!this.state.attacked) return '';

    if (typeof s === 'object' && s !== null) return ' hit';
    else return ' missed';
  };

  attackSquare = (i, j) => {
    if (this.props.isGameFinished) return false;

    // stop fn running if player attacks own board
    if (this.props.name !== 'enemy' || this.state.attacked) return;

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
          'grid-square' +
          (this.state.attacked ? ' attacked' : '') +
          this.getSquareState(this.props.square)
        }
      ></div>
    );
  }
}

export default Square;
