// import React from 'react';
import { DragSource } from 'react-dnd';

const source = {
	beginDrag(props, monitor, component) {
		return { props: props, component: component };
	},
	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) { return false; }
		if (!component.endDrag) { return; };
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
		return DragSource(type, source, collect)(Component);
	};
};

