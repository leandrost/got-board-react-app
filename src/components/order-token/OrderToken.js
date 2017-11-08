import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './OrderToken.scss';
import _ from 'lodash';

import Piece from '~/components/piece/Piece'
import HouseToken from '~/components/house-token/HouseToken'


@CSSModules(styles)
export default class OrderToken extends React.Component {
  render() {
    const { special, type, revealed } = this.props;
    const specialModifier = special ? 'special-' : '';
    const orderType = _.kebabCase(type);

    if (!revealed) {
      return <HouseToken {...this.props} type="order-cover" />
    }
    console.log(0);

    return (
      <Piece
        {...this.props}
        styleName={`${specialModifier}${orderType}`}
      />
    );
  }
}
