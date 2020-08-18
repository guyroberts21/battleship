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

  // Drag and Drop Methods
  dragEnter = (e) => {
    e.preventDefault();
  };

  dragOver = (e) => {
    e.preventDefault();
  };

  dragLeave = (e) => {};

  drop = (e) => {
    e.preventDefault();

    // When using data transfer, getData always returns string values!
    const quartileClicked = e.dataTransfer.getData('quartileClicked');
    const size = parseInt(e.dataTransfer.getData('size'));
    const idx = parseInt(this.props.num);

    // Handle event on parent
    if (this.props.handleDrop(quartileClicked, size, idx)) {
      return true;
    }

    return null;
  };

  // This method was created to get the status of any given square
  getSquareState = (s) => {
    // only add class if square has been attacked
    if (typeof s === 'object' && s !== null) {
      if (!this.state.attacked && this.props.name === 'player') {
        return ' ship';
      } else {
        return ' hit';
      }
    } else {
      if (this.state.attacked) {
        return ' missed';
      } else {
        return '';
      }
    }
  };

  attackSquare = (i, j) => {
    if (this.props.isGameFinished || !this.props.hasGameStarted) return false;

    // stop fn running if player attacks own board
    if (this.props.name !== 'enemy' || this.state.attacked) return;

    this.setState({
      attacked: true,
    });
    this.props.handleClick(i, j);
  };

  render() {
    const [i, j] = this.props.getCoords(this.props.num);
    return (
      <div
        onClick={() => this.attackSquare(i, j)}
        onDragEnter={this.dragEnter}
        onDragLeave={this.dragLeave}
        onDragOver={this.dragOver}
        onDrop={this.drop}
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
