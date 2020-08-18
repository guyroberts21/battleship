import React, { Component } from 'react';
import Ship from './Ship';

export class Ships extends Component {
  render() {
    const ships = {
      2: 'destroyer',
      3: 'cruiser',
      4: 'battleship',
      5: 'carrier',
    };
    return (
      <div
        className={'drag-ships' + (this.props.horizontal ? '' : ' vertical')}
      >
        {this.props.ships.map((ship, idx) => (
          <Ship
            name={ships[ship]}
            size={Object.keys(ships).find((key) => ships[key] === ships[ship])}
            key={idx}
            horizontal={this.props.horizontal}
          />
        ))}
      </div>
    );
  }
}

export default Ships;
