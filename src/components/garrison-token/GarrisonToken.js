import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './GarrisonToken.scss';

import Piece from '~/components/piece/Piece';

@CSSModules(styles)
export default class GarrisonToken extends React.Component {
  render() {
    const { name } = this.props;
    return <Piece styleName={`garrison-${name}`} type="garrison-token" {...this.props} />
  }
}

