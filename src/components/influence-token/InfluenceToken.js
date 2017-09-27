import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import build from 'redux-object';

import styles from './InfluenceToken.scss';

import { draggable } from '~/decorators';
import { moveInfluenceToken } from '~/redux/actions';

@connect(
  (state, props) => {
    return {
      token: build(state, 'influenceToken', props.id),
    }
  },
  dispatch => (
    bindActionCreators({
      moveInfluenceToken,
    }, dispatch)
  )
)
@draggable('influence-token')
@CSSModules(styles)
export default class InfluenceToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0, position: props.position };
  }

  endDrag(monitor) {
    const { x, y, position } = monitor.getDropResult();
    this.props.moveInfluenceToken(this.props.id, { x, y, position });
  }

  render() {
    const { connectDragSource, x, y, position, houseName } = this.props;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
      position: position ? 'static' : 'absolute',
    };
    return connectDragSource(
      <div styleName={`${houseName}-influence-token`} style={style}></div>
    );
  }
}
