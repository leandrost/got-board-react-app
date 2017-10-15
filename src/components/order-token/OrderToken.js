import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './OrderToken.scss';
import _ from 'lodash';

import Piece from '~/components/piece/Piece'


@CSSModules(styles)
export default class OrderToken extends React.Component {
  render() {
    const { special, type } = this.props;
    const specialModifier = special ? 'special-' : '';
    const orderType = _.kebabCase(type);
    return (
      <Piece
        {...this.props}
        styleName={`${specialModifier}${orderType}`}
      />
    );
  }
}
