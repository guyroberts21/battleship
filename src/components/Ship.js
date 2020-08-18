import React, { Component } from 'react';

export class Ship extends Component {
  state = {
    quartileClicked: 0,
    horizontal: false,
  };

  // TODO: Find a better way of managing state which relies on props (perhaps redesign so it doesn't need to rely on props)
  static getDerivedStateFromProps(props) {
    if (props.horizontal) {
      return {
        horizontal: true,
      };
    }

    if (!props.horizontal) {
      return {
        horizontal: false,
      };
    }
    return null;
  }

  dragStart = (e) => {
    const styles = getComputedStyle(e.target);
    e.dataTransfer.setData('block', styles.backgroundColor);
    e.dataTransfer.setData('quartileClicked', this.state.quartileClicked);
    e.dataTransfer.setData('size', this.props.size);
  };

  handleMouseDown = (e) => {
    // let offset = elem.classList.contains('vertical') ? e.offsetY : e.offsetX;
    let offset = this.state.horizontal
      ? e.nativeEvent.offsetX
      : e.nativeEvent.offsetY;
    this.setState({
      // hard-coded 40 to represent the square width
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
