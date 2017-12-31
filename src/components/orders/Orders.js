import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './Orders.scss';

import { connect, build } from '~/redux/tools';
import OrderToken from '~/components/order-token/OrderToken';

@connect(
  (state, props) => {
    const collections = (build(state, 'orders') || []).filter(props.filter);
    return { pieces: collections };
  }
)
@CSSModules(styles)
export default class Orders extends React.Component {
  isRevealed = (piece) => {
    return this.props.houseName === piece.houseName || piece.revealed;
  }

  render() {
    const { pieces, steady} = this.props;
    return <div>
      { pieces.map(piece => <OrderToken
        key={piece.id}
        {...piece}
        revealed={this.isRevealed(piece)}
        steady={steady}
      />) }
    </div>
  }
}
