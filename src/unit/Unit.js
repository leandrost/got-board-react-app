import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import { draggable } from '../decorators';

import styles from './Unit.scss';

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
    this.setState(result);
  }

  render() {
    const { connectDragSource } = this.props;
    const { x, y } = this.state;
    const style = {
      position: 'absolute',
      left: x,
      top: y
    };
    return connectDragSource(
      <div id="42" styleName={this.props.name} style={style}></div>
      );
  }
}

