import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './NeutralForceToken.scss';

import Piece from '~/components/piece/Piece';

@CSSModules(styles)
export default class NeutralForceToken extends React.Component {
  render() {
    const { territory, playerRange } = this.props;
    const territoryName = territory.replace(/_/g, '');
    const styleName = `neutral-force-${playerRange}-${territoryName}`;
    console.log(this.props);
    return <Piece
      {...this.props}
      styleName={styleName}
      type="neutral-force-token"
    />;
  }
}
