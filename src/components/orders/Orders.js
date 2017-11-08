import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './Orders.scss';

import { connect, build } from '~/redux/tools';
import { reducerNames } from '~/redux/datatypes';

import OrderToken from '~/components/order-token/OrderToken';

@connect(
  (state, props) => {
    const collections = reducerNames('order').map(type => {
      return (build(state, type) || []).filter(props.filter)
    });
    const flatten = collections.reduce((a, b) => a.concat(b), []);

    return { pieces: flatten };
  }
)
@CSSModules(styles)
export default class Orders extends React.Component {
  isRevealed = (piece) => {
    return this.props.house === piece.houseName || piece.revealed;
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
