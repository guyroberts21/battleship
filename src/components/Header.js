import React, { Component } from 'react';

export class Header extends Component {
  render() {
    return (
      <header className="site-header">
        <a
          href="https://github.com/guyroberts21/battleship"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fab fa-github github-link"></i>
        </a>

        <h1>Battleships</h1>
      </header>
    );
  }
}

export default Header;
