import React from 'react';
import ReactDOM from 'react-dom';
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

  endDrag(r, monitor) {
    console.log(r);
    const el = ReactDOM.findDOMNode(this);
    const x = el.offsetLeft + r.x;
    const y = el.offsetTop + r.y;
    console.log(x, y);
    console.log('scrollTop', document.body.scrollTop);
    console.log('getClientOffset', monitor.getClientOffset());
    this.setState({ x: x, y: r.y });
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

