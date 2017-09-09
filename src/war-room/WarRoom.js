import React from 'react';
import CSSModules from 'react-css-modules';

import Unit from '../unit/Unit';

import styles from './WarRoom.scss';

@CSSModules(styles)
export default class WarRoom extends React.Component {
  render() {
    return (
      <div styleName="war-room">
				<Unit name="greyjoy-footman" />
			</div>
    );
  }
}
