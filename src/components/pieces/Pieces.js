import React from 'react';

import { connect, build } from '~/redux/tools';

@connect(
  (state, props) => ({
    pieces: (build(state, props.collection) || []).filter(props.filter),
  })
)
export default class Pieces extends React.Component {
  render() {
    const { pieces, type, steady } = this.props;
    const Piece = this.props.piece;
    return <div>
      { pieces.map(piece => <Piece
        key={piece.id}
        {...piece}
        type={type || piece.type}
        steady={steady}
      />) }
    </div>
  }
}
