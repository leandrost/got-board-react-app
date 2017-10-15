import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './HouseToken.scss';
import _ from 'lodash';

import Piece from '~/components/piece/Piece';

@CSSModules(styles)
export default class HouseToken extends React.Component {
  render() {
    const { type, houseName } = this.props;
    const tokenType = _.kebabCase(type);
    return <Piece
      {...this.props}
      type={tokenType}
      onDragEnd={this.move}
      styleName={`${houseName}-${tokenType}`}
    />
  }
}
