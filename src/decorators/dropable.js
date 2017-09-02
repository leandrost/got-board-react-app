import { DropTarget } from 'react-dnd';

const specs = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    if (component.onDrop) { component.onDrop(item); }
    return props;
  }
};
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
};

export default (type) => {
	return (Component) => {
		return DropTarget(type, specs, collect)(Component);
	};
};

