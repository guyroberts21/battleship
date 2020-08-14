import React, { Component } from 'react';
import Ship from './Ship';

export class Ships extends Component {
  render() {
    const ships = {
      2: 'destroyer',
      3: 'cruiser',
      4: 'battleships',
      5: 'carrier',
    };
    return (
      <div className="drag-ships">
        {this.props.ships.map((ship, idx) => (
          <Ship name={ships[ship]} key={idx} />
        ))}
      </div>
    );
  }
}

export default Ships;
