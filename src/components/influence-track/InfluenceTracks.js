import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import build from 'redux-object';

import styles from './InfluenceTracks.scss';

import { droppable } from '~/decorators';

import InfluenceToken from '~/components/influence-token/InfluenceToken'

@connect(
  (state, props) => ({ tokens: build(state, `${props.type}Tokens`) }),
)
@CSSModules(styles)
export default class InfluenceTracks extends React.Component {
  renderTrack(track) {
  }

 findTokenBy(position) {
   const tokenType = {
     ironThrone: 'IronThroneToken',
     fiefdom: 'FiefdomToken',
     kingsCourt: 'KingsCourtToken'
   };
   const result = this.props.tokens.filter(
     token => token.type === tokenType[this.props.type] &&
       token.position === position
   );
   return result ? result[0] : null;
  }

  renderPosition(position) {
    return <InfluencePosition
      key={position}
      position={position}
      token={this.findTokenBy(position)}
    />
  }

  render() {
    console.log('InfluenceTracks#render');
    const positions = [6, 5, 4, 3, 2, 1];
    return <ol styleName="influence-track">
      { positions.map(position => this.renderPosition(position)) }
    </ol>
  }
}

@droppable('influence-token')
@CSSModules(styles)
export class InfluencePosition extends React.Component {
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
