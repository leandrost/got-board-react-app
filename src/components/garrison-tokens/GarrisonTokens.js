import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import build from 'redux-object';

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
export default class GarrisonTokens extends React.Component {
  constructor() {
    super();
    this.state = {
      steady: false,
    };
  }
  movePiece = (props, dropResult) => {
    const { x, y, territory } = dropResult;
    this.props.movePiece(props, { x, y, territory });
  }

  render() {
    const { steady } = this.props;
    const Piece = this.props.piece;
    return <section>
      { this.props.tokens.map(token => <Piece
        key={token.id}
        {...token}
        steady={steady}
        onDragEnd={this.movePiece} />
      ) }
    </section>
  }
}
