import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import build from 'redux-object';
import _ from 'lodash';

import styles from './InfluenceTrack.scss';

import InfluenceTrackPosition from '~/components/influence-track/InfluenceTrackPosition'

@connect(
  (state, props) => ({ tokens: build(state, `${props.type}Tokens`) }),
)
@CSSModules(styles)
export default class InfluenceTracks extends React.Component {
 findTokenBy(position) {
   const { tokens,type } = this.props;
   const tokenType = _.startCase(`${type}Token`).replace(/\s/g, '');
   const result = tokens.filter(
     token => token.type === tokenType && token.position === position
   );

   return result ? result[0] : null;
  }

  renderPosition(position) {
    return <InfluenceTrackPosition
      key={position}
      position={position}
      token={this.findTokenBy(position)}
    />
  }

  render() {
    const positions = [6, 5, 4, 3, 2, 1];
    return <ol styleName="influence-track">
      { positions.map(position => this.renderPosition(position)) }
    </ol>
  }
}
