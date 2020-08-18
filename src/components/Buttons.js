import React, { Component } from 'react';

export class Buttons extends Component {
  render() {
    return (
      <div className="ship-btns">
        <i
          className="fas fa-sync flip-ships"
          onClick={this.props.flipShips}
        ></i>

        <i
          className="fas fa-location-arrow auto-place"
          onClick={this.props.autoPlace}
        ></i>
      </div>
    );
  }
}

export default Buttons;
