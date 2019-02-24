import React from 'react';
import CSSModules from 'react-css-modules';
import { connect, build } from '~/redux/tools';

import styles from './PieceCounter.scss';

@connect(
  (state, props) => {
    const filter = (piece) => {
      return props.filter(piece, props);
    };
    const array = build(state, props.type) || [];
    return { pieces: array.filter(filter) };
  },
)
@CSSModules(styles)
export default class PieceCounter extends React.Component {
  render() {
    const { type, houseName, pieces } = this.props;
    const Component = this.props.piece
    const piece = pieces[0] || { houseName: houseName, disabled: true };

    return <div styleName="piece-counter">
      <strong>{pieces.length}</strong>
      <Component {...piece} type={type} steady={true} />
    </div>
  }
}
