import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux'
import build from 'redux-object';

import styles from './AvailableUnits.scss';

import Unit from '~/components/unit/Unit';

@connect(
  state => ({
    units: (build(state, 'units')  || []).filter(unit => !unit.territory)
  })
)
@CSSModules(styles)
export default class AvailableUnits extends React.Component {
  unitsByType() {
    const { units, type } = this.props;
    return units.filter(unit => unit.type === type);
  }

  getFirstUnit() {
    const units = this.unitsByType();
    if(units.length === 0) { return; }
    return units[0];
  }

  getUnitsCount() {
    return this.unitsByType().length;
  }

  render() {
    const { type, house } = this.props;
    const unit = this.getFirstUnit();
    return (
      <div styleName="available-units">
        <strong>{this.getUnitsCount(type)}</strong>
        { unit ? <Unit {...unit} /> : <Unit house={house} type={type} disabled={true} /> }
      </div>
      );
  }
}
