import React from 'react';
import { droppable } from '~/decorators';

import InfluenceToken from '~/components/influence-token/InfluenceToken'

@droppable('influence-token')
export default class InfluenceTrackPosition extends React.Component {
  drop(monitor) {
    return { position: this.props.position, x: 0, y: 0 };
  }

  render() {
    const { connectDropTarget, token, isOver } = this.props;

    return connectDropTarget(
      <li data-dragging-over={isOver || null}>
        { token ? <InfluenceToken {...token} /> : null }
      </li>
    );
  }
}
