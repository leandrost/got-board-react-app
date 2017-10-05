import React from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import { droppable } from '~/decorators';
import { connect } from 'react-redux';

import styles from './SupplyTrack.scss';
import HouseToken from '~/components/house-token/HouseToken';

import build from 'redux-object';

@connect(
  (state, props) => ({ tokens: build(state, `supplyTokens`) }),
)
@CSSModules(styles)
export default class SupplyTrack extends React.Component {
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
    const positions = _.rangeRight(7);
    return <ol styleName="track">
      { positions.map(position => this.renderPosition(position)) }
    </ol>
  }
}


@droppable('supply-token')
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

