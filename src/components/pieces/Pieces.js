import React from 'react';
import _ from 'lodash';

import { connect, build } from '~/redux/tools';

@connect(
  (state, props) => ({
    pieces: (build(state, props.type) || []).filter(props.filter),
  })
)
export default class Pieces extends React.Component {
  get typeAttribute() {
    const type = _.singularize(this.props.collection);
    return `${type}Type`;
  }

  render() {
    const Piece = this.props.piece;
    const { pieces, steady, type } = this.props;

    return <div>
      { pieces.map(piece => <Piece
        key={piece.id}
        {...piece}
        type={type}
        steady={steady}
      />) }
    </div>
  }
}
