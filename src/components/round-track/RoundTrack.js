import React from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import { droppable } from '~/decorators';
import { connect, actions } from '~/redux/tools';
import { movePiece } from '~/redux/actions';

import styles from './RoundTrack.scss';
import Draggable from '~/components/draggable/Draggable';

@connect(
  state => ({
  }),
  actions({ movePiece })
)
@CSSModules(styles)
export default class Track extends React.Component {
  handleMove = (_p, changes) => {
    const { gameId } = this.props;
    this.props.movePiece({ type: 'game', id: gameId }, changes);
  }

  renderMarker() {
    return <Draggable
      type='round-marker'
      styleName='round-marker'
      onDragEnd={this.handleMove}
    />;
  }

  renderPosition(position) {
    const { round } = this.props;
    if(!round) { return; }
    let marker = position === round ? this.renderMarker() : null;
    return <TrackPosition key={position} position={position}>
      { marker }
    </TrackPosition>
  }

  render() {
    const positions = _.rangeRight(1, 10);
    return <ol styleName="track">
      { positions.map(position => this.renderPosition(position)) }
    </ol>
  }
}


@droppable('round-marker')
class TrackPosition extends React.Component {
  drop(monitor) {
    return { round: this.props.position };
  }

  render() {
    const { connectDropTarget, isOver, children } = this.props;

    return connectDropTarget(
      <li data-dragging-over={isOver || null}>
        { children }
      </li>
    );
  }
}

