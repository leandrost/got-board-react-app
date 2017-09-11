import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { draggable } from '../decorators';
import { moveUnit } from '../redux/actions/';

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
@CSSModules(styles)
export default class Unit extends React.Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
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

  onDrag(monitor) {
    console.log(0);
  }

  render() {
    const props = this.props;
    const { connectDragSource } = props;
    const style = { left: props.x, top: props.y };
    if (props.territory) { style.position = 'absolute' };
    return connectDragSource(
      <div id={props.id} styleName={`${props.house}-${props.type}`} style={style}></div>
      );
  }
}

