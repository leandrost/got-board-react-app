import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './GarrisonToken.scss';

import { draggable } from '~/decorators';
import { movePiece } from '~/redux/actions';

@connect(
  state => ({
  }),
  dispatch => (
    bindActionCreators({
      movePiece,
    }, dispatch)
  )
)
@draggable('garrison-token')
@CSSModules(styles)
export default class GarrisonToken extends React.Component {
  endDrag(monitor) {
    const { x, y, territory } = monitor.getDropResult();
    this.props.movePiece('garrison_token', this.props.id, { x, y, territory });
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
