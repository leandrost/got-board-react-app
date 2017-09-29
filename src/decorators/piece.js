import React from 'react';
import { draggable } from '~/decorators';
import { findDOMNode } from 'react-dom';

function wrapper(Component, type) {
  return @draggable(type)
  class Piece extends React.Component {
    static defaultProps = {
      steady: false,
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
      return <Component
        kind={type}
        style={this.getStyle()}
        ref={this.getRef}
        {...this.props}
        {...this.state}
      />;
    }
  }
}

export default (type) => {
	return (Component) => {
		return wrapper(Component, type);
	};
}
