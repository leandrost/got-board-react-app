import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './HouseToken.scss';
import _ from 'lodash';

import { connect, actions } from '~/redux/tools';
import { movePiece } from '~/redux/actions';
import Piece from '~/components/piece/Piece';

@connect(
  state => ({}),
  actions({ movePiece })
)
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
