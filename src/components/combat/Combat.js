import React from 'react';
import CSSModules from 'react-css-modules';
import { droppable } from '~/decorators';

import styles from './Combat.scss';

@droppable(['house-card', 'footman'])
@CSSModules(styles)
export default class Combat extends React.Component {
  drop(monitor) {
    const result = monitor.getDropPosition();
    return result;
  }

  render() {
    const  { connectDropTarget } = this.props;
    return connectDropTarget(<div styleName="combat" />);
  }
}
