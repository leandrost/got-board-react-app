import React from 'react';
import CSSModules from 'react-css-modules';

import Unit from '../unit/Unit';

import styles from './WarRoom.scss';

@CSSModules(styles)
export default class WarRoom extends React.Component {
  render() {
    return (
      <div styleName="war-room">
				{
				this.props.units.map(unit => {
						return (
								<Unit key={unit.id} name={`${unit.house}-${unit.type}`} />
								);
						})
				}
			</div>
    );
  }
}
