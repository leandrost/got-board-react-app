import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './Territory.scss';

import { droppable } from '~/decorators';

@droppable([
  'footman',
  'knight',
  'ship',
  'siege-engine',
  'garrison-token',
  'power-token'
])
@CSSModules(styles)
export default class Territory extends React.Component {
  drop(monitor) {
    const piece = monitor.getItem();
    const result = monitor.getDropPosition();
    result.territory = this.props.slug;
    if (piece.props.type === 'power-token') { result.available = false }
    return result;
  }

  render() {
    const props = this.props;
    const { connectDropTarget, isOver } = props;
    const styleName = isOver ? "territory-actived" : 'territory';

    return connectDropTarget(
      <g id={props.slug} styleName={styleName}>
        <path d={props.boundaries} />
      </g>
    );
  }
}
