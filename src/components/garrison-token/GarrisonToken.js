import React from 'react';
import CSSModules from 'react-css-modules';

import { draggable } from '~/decorators';
import { findDOMNode } from 'react-dom';

import styles from './GarrisonToken.scss';

@piece('garrison-token')
@CSSModules(styles)
export default class GarrisonToken extends React.Component {
  render() {
    console.log("GarrisonToken#render");
    const { name } = this.props;
    return <div styleName={`garrison-${name}`} style={this.props.style}></div>
  }
}

function wrapper(Component, type) {
  return @draggable(type)
  class Piece extends React.Component {
    static defaultProps = {
      steady: false,
    }

    applyPieceStyle(node) {
      if(!node) { return; }
      const { steady, x, y } = this.props;
      console.log('applyPieceStyle');
      node.style.transform = `translate(${x}px, ${y}px)`;
      node.style.position = steady ? 'static' : 'absolute';
    }

    getStyle() {
      const { steady, x, y } = this.props;
      return {
        transform: `translate(${x}px, ${y}px)`,
        position: steady ? 'static' : 'absolute',
      }
    }

    getRef = (instance) => {
      const node = findDOMNode(instance);
      return this.props.connectDragSource(node);
    }

    render() {
      console.log(9);
      return <Component
        kind={type}
        {...this.props}
        {...this.state}
        style={this.getStyle()}
        ref={this.getRef}
      />;
    }
  }
}



function piece(type) {
	return (Component) => {
		return wrapper(Component, type);
	};
}
