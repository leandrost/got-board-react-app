import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { draggable } from '~/decorators';
import { moveUnit } from '~/redux/actions/';

import styles from './Unit.scss';

@connect(
  state => ({ units: state.units }),
  dispatch => (
    bindActionCreators({
      moveUnit,
    }, dispatch)
  )
)
@draggable("unit")
@CSSModules(styles, { allowMultiple: true })
export default class Unit extends React.Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    disabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y
    };
  }

  endDrag(monitor) {
    const result = monitor.getDropResult();
    console.log(result);
    console.log('endDrag', result);
    this.props.moveUnit(this.props.id, result);
  }

  render() {
    const props = this.props;
    const { connectDragSource, house, type } = props;
    const style = { left: props.x, top: props.y };
    const disabled = props.disabled ? 'disabled' : '';
    if (props.territory) { style.position = 'absolute' };
    return connectDragSource(
      <div id={props.id} styleName={`${house}-${type} ${disabled}`} style={style}></div>
      );
  }
}

