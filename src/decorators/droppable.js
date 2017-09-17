import { DropTarget } from 'react-dnd';

const specs = {
  drop(props, monitor, component) {
    const wrappedComponent = component.decoratedComponentInstance || component;
    if (!wrappedComponent.drop) { return props; }
    const offset = monitor.getSourceClientOffset();
    monitor.getDropPosition = () => { return getPosition(offset); };
    return wrappedComponent.drop(monitor);
  },
};
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
};

const getPosition = (offset)  => {
  return {
    x: window.pageXOffset + offset.x,
    y: window.pageYOffset + offset.y,
  }
}

export default (type) => {
	return (Component) => {
		return DropTarget(type, specs, collect)(Component);
	};
};

