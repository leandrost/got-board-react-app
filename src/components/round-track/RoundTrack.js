import React from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import { droppable, draggable } from '~/decorators';
import { connect } from 'react-redux';
import { movePiece } from '~/redux/actions';
import { bindActionCreators } from 'redux';

import styles from './RoundTrack.scss';

@connect(
  state => ({}),
  dispatch => (
    bindActionCreators({
      movePiece,
    }, dispatch)
  )
)
@CSSModules(styles)
export default class Track extends React.Component {
  updateRound(changes) {
    const { gameId } = this.props;
    this.props.movePiece({ type: 'game', id: gameId }, changes);
  }

  renderMarker() {
    return <RoundMarker onDragEnd={(_p, changes) => this.updateRound(changes) } />;
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

@draggable('round-marker')
@CSSModules(styles)
class RoundMarker extends React.Component {
  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div styleName="round-marker"></div>
    );
  }
}
