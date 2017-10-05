import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import styles from './HouseToken.scss';

import { draggable } from '~/decorators';
import { movePiece } from '~/redux/actions';

@connect(
  state => ({}),
  dispatch => (
    bindActionCreators({
      movePiece,
    }, dispatch)
  )
)
@draggable((props, x) => {
  return _.kebabCase(props.type);
})
@CSSModules(styles)
export default class HouseToken extends React.Component {
  static defaultProps = {
    steady: false,
  }

  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  getStyle() {
    const { steady, x, y } = this.props;
    return {
      transform: `translate(${x}px, ${y}px)`,
      position: steady ? 'static' : 'absolute',
    }
  }

  endDrag(monitor) {
    const move = monitor.getDropResult();
    this.props.movePiece(this.props, move);
  }

  render() {
    const { connectDragSource, type, houseName } = this.props;
    const tokenType = _.kebabCase(type);
    return connectDragSource(
      <div styleName={`${houseName}-${tokenType}`} style={this.getStyle()}></div>
    );
  }
}
