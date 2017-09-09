import { DropTarget } from 'react-dnd';

const specs = {
  drop(props, monitor, component) {
    if (!component.drop) { return props; }
    const offset = monitor.getSourceClientOffset();
    monitor.getDropPosition = () => { return getPosition(offset); };
    return component.drop(monitor);
  }
};
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
};

const getPosition = (offset)  => {
  const parent = document.body;
  return {
    y: parent.scrollTop + offset.y,
    x: parent.scrollLeft + offset.x
  }
}

export default (type) => {
	return (Component) => {
		return DropTarget(type, specs, collect)(Component);
	};
};

