import React from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import { droppable } from '~/decorators';
import { connect } from 'react-redux';
import build from 'redux-object';

import styles from './VictoryTrack.scss';
import HouseToken from '~/components/house-token/HouseToken';


@connect(
  (state, props) => ({ tokens: build(state, `victoryToken`) }),
)
@CSSModules(styles)
export default class Track extends React.Component {
  findTokenBy(position) {
    const { tokens } = this.props;
    if (!tokens) { return []; }
    return tokens.filter(token => token.position === position);
  }

  renderPosition(position) {
    const tokens = this.findTokenBy(position);
    return <TrackPosition
      key={position}
      position={position}
      token={this.findTokenBy(position)}
    >
      { tokens.map(token => <HouseToken key={token.id} {...token} steady={true} />) }
    </TrackPosition>
  }

  render() {
    const positions = _.rangeRight(6);
    return <ol styleName="track">
      { positions.map(position => this.renderPosition(position)) }
    </ol>
  }
}


@droppable('victory-token')
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

