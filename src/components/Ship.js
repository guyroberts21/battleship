import React, { Component } from 'react';

export class Ship extends Component {
  state = {
    quartileClicked: 0,
  };

  dragStart = (e) => {
    const styles = getComputedStyle(e.target);
    e.dataTransfer.setData('block', styles.backgroundColor);
  };

  handleMouseDown = (e) => {
    // let offset = elem.classList.contains('vertical') ? e.offsetY : e.offsetX;
    let offset = e.nativeEvent.offsetX;
    this.setState({
      quartileClicked: Math.floor(offset / 40),
    });
  };

  render() {
    return (
      <div
        className={this.props.name + ' ship'}
        draggable={true}
        onDragStart={this.dragStart}
        onMouseDown={this.handleMouseDown}
      ></div>
    );
  }
}

export default Ship;
