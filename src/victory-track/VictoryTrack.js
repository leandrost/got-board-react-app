import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './VictoryTrack.scss';

@CSSModules(styles)
export default class VictoryTrack extends React.Component {
  render() {
    return <ul styleName="track">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  }
}

