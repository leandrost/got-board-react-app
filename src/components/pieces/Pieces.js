import React from 'react';
import _ from 'lodash';

import { connect, build } from '~/redux/tools';

@connect(
  (state, props) => ({
    pieces: (build(state, props.collection) || []).filter(props.filter),
  })
)
export default class Pieces extends React.Component {
  get typeAttribute() {
    const type = _.singularize(this.props.collection);
    return `${type}Type`;
  }

  render() {
    const { pieces, steady } = this.props;
    const Piece = this.props.piece;
    return <div>
      { pieces.map(piece => <Piece
        key={piece.id}
        {...piece}
        type={piece[this.typeAttribute]}
        steady={steady}
      />) }
    </div>
  }
}
