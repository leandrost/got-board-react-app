import { DragSource } from 'react-dnd';

const specs = {
	beginDrag(props, monitor, component) {
		return { props: props, component: component };
	},
	canDrag(props) {
		if (props.disabled) { return false; };
    return true;
	},
	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) { return false; }
    if (props.onDragEnd) {
      const result = monitor.getDropResult();
      props.onDragEnd(props, result);
      return;
    };
    console.log(arguments);
		if (!component || !component.endDrag) { return; };
		component.endDrag(monitor);
	},
};
const collect = (connect, monitor) => {
	return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
	  isDragging: monitor.isDragging()
	}
};

export default (type) => {
	return (Component) => {
		return DragSource(type, specs, collect)(Component);
	};
};

