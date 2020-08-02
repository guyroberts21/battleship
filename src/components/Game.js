import React, { Component } from 'react'
import Gameboard from '../factories/gameboard'

export class Game extends Component {
  render() {
    return (
      <div>
        <Gameboard />
        <Gameboard />
      </div>
    )
  }
}

export default Game
