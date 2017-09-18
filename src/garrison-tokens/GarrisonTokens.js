import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import build from 'redux-object';

import styles from './GarrisonTokens.scss';

import GarrisonToken from '~/garrison-token/GarrisonToken';

@connect(
  (state, props) => {
    return({
      tokens: (build(state, 'garrisonTokens') || []).filter(props.filter)
    })
  }
)
@CSSModules(styles)
export default class GarrisonTokens extends React.Component {
  render() {
    const { tokens } = this.props;
    return <section>
      { tokens.map(token => <GarrisonToken key={token.id} {...token} />) }
    </section>
  }
}
