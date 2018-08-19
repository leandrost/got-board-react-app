import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './HouseToken.scss';
import _ from 'lodash';

import Piece from '~/components/piece/Piece';

@CSSModules(styles)
export default class HouseToken extends React.Component {
  render() {
    const { houseName } = this.props;
    console.log(this.props);
    const type = this.props.type || this.props.tokenType
    const tokenType = _.kebabCase(type);
    return <Piece
      {...this.props}
      type={tokenType}
      styleName={`${houseName}-${tokenType}`}
    />
  }
}
