import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '~/components/house-token/HouseToken.scss';
import _ from 'lodash';

import Piece from '~/components/piece/Piece';

@CSSModules(styles)
export default class HouseCard extends React.Component {
  render() {
    const { houseName, name, revealed = true } = this.props;
    const cardName = _.kebabCase(name);
    const styleName = revealed ? `${houseName}-${cardName}` : `${houseName}-card-cover`;

    return (
      <Piece
        {...this.props}
        type='house-card'
        styleName={styleName}
      />
    );
  }
}
