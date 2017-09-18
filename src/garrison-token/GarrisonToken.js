import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './GarrisonToken.scss';

import { draggable } from '~/decorators';

@draggable('garrison-token')
@CSSModules(styles)
export default class GarrisonToken extends React.Component {
  endDrag(monitor) {
    const result = monitor.getDropResult();
    this.props.onDragEnd(this.props, result);
  }

  render() {
    const { connectDragSource, name, territory, x, y } = this.props;
    const styleName = name ? `garrison-${name}` : null;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
      position: territory ? 'absolute' : null,
    };
    return connectDragSource(<div styleName={styleName} style={style}></div>);
  }
}
