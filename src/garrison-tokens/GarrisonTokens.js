import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import build from 'redux-object';

import styles from './GarrisonTokens.scss';

import GarrisonToken from '~/garrison-token/GarrisonToken';
import { movePiece } from '~/redux/actions';

@connect(
  (state, props) => {
    return({
      tokens: (build(state, 'garrisonTokens') || []).filter(props.filter)
    })
  },
  dispatch => (
    bindActionCreators({
      movePiece,
    }, dispatch)
  )
)
@CSSModules(styles)
export default class GarrisonTokens extends React.Component {
  movePiece(props, dropResult) {
    const { x, y, territory } = dropResult;
    this.props.movePiece('garrison-token', props.id, { x, y, territory });
  }

  render() {
    return <section>
      { this.props.tokens.map(token => <GarrisonToken
        key={token.id}
        {...token}
        onDragEnd={this.movePiece} />
      ) }
    </section>
  }
}
