import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './RoundTrack.scss';

@CSSModules(styles)
export default class RoundTrack extends React.Component {
  render() {
    return <ul styleName="track">
    </ul>
  }
}

