import React from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import { droppable, draggable } from '~/decorators';
import { connect } from 'react-redux';
import build from 'redux-object';
import { movePiece } from '~/redux/actions';
import { bindActionCreators } from 'redux';

import styles from './RoundTrack.scss';

@connect(
  (state, props) => ({ game: build(state, `games`)[0] }),
)
@CSSModules(styles)
export default class Track extends React.Component {
  findTokenBy(position) {
    const { tokens } = this.props;
    if (!tokens) { return []; }
    return tokens.filter(token => token.position === position);
  }

  renderPosition(position) {
    const { game } = this.props;
    return <TrackPosition
      key={position}
      position={position}
      token={this.findTokenBy(position)}
    >
      { game.round === position ? <RoundMarker key={game.round} /> : null }
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
    return { x: 0, y: 0, position: this.props.position };
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

@connect(
  state => ({}),
  dispatch => (
    bindActionCreators({
      movePiece,
    }, dispatch)
  )
)
@draggable('round-marker')
@CSSModules(styles)
class RoundMarker extends React.Component {
  endDrag(monitor) {
    const move = monitor.getDropResult();
    this.props.movePiece(this.props, move);
  }

  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div styleName="round-marker"></div>
    );
  }
}
