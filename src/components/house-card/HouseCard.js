import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '~/components/house-token/HouseToken.scss';
import _ from 'lodash';

import Piece from '~/components/piece/Piece';

@CSSModules(styles)
export default class HouseCard extends React.Component {
  render() {
    const { houseName, name } = this.props;
    const cardName = _.kebabCase(name);
    return (
      <Piece
        {...this.props}
        type='house-card'
        styleName={`${houseName}-${cardName}`}
      />
    );
  }
}
