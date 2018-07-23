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
    const { steady, x, y, disabled, style } = this.props;
    const pieceStyle =  {
      transform: `translate(${x}px, ${y}px)`,
      position: steady ? 'static' : 'absolute',
      opacity: disabled ? 0.5 : 1,
    }
    return Object.assign(pieceStyle, style);
  }

  endDrag = (props, dropResult) => {
    if (this.props.beforeMovePiece) {
      this.props.beforeMovePiece(dropResult);
    }
    this.props.movePiece(props, dropResult);
  }

  render() {
    const type = _.kebabCase(this.props.type)
    return <Draggable
      onDragEnd={this.endDrag}
      {...this.props}
      type={type}
      style={this.getStyle()}
    >
      { this.props.children }
    </Draggable>;
  }
}
