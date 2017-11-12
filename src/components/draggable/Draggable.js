import React from 'react';
import { draggable } from '~/decorators';

@draggable((props) => props.type)
export default class Draggable extends React.Component {
  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div className={this.props.className} style={this.props.style}>
        { this.props.children }
      </div>
    );
  }
}
