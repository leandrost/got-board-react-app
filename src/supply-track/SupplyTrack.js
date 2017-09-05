import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './SupplyTrack.scss';

@CSSModules(styles)
export default class SupplyTrack extends React.Component {
  render() {
    return <ul styleName="track">
    </ul>
  }
}

