import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Piece.scss';

import { connect, actions } from '~/redux/tools';
import { movePiece } from '~/redux/actions';
import _ from 'lodash';

import Draggable from '~/components/draggable/Draggable';

@connect(
  state => ({ gameId: state.current.gameId }),
  actions({ movePiece })
)
@CSSModules(styles)
export default class Piece extends React.Component {
  static defaultProps = {
    steady: false,
    x: 0,
    y: 0,
  }

  getStyle() {
    const { steady, x, y, disabled } = this.props;
    return {
      transform: `translate(${x}px, ${y}px)`,
      position: steady ? 'static' : 'absolute',
      opacity: disabled ? 0.5 : 1,
    }
  }

  movePiece = (props, dropResult) => {
    this.props.movePiece(props, dropResult);
  }

  render() {
    const type = _.kebabCase(this.props.type)
    return <Draggable
      {...this.props}
      type={type}
      style={this.getStyle()}
      onDragEnd={this.movePiece}
    />;
  }
}
