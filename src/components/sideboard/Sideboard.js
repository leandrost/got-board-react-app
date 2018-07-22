import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './Sideboard.scss';

import { droppable } from '~/decorators';

@droppable([
  'footman',
  'knight',
  'ship',
  'siege-engine',
  'power-token',
  'garrison-token',
  'neutral-force-token',
  'raid-order',
  'march-order',
  'support-order',
  'consolidation-order',
  'defense-order',
  'influence-token',
])
@CSSModules(styles)
export default class Sideboard extends React.Component {
  drop(monitor) {
    const position = monitor.getDropPosition();
    position.x = position.x - 1980;
    // position.y = position.y - 2975;
    return position;
  }

  render() {
    return this.props.connectDropTarget(
      <aside>
        <div styleName="iron-throne-token"></div>
        <div styleName="valyrian-steel-blade-token"></div>
        <div styleName="mensseger-raven-token"></div>
      </aside>
    );
  }
}
