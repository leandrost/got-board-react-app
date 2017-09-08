// import React from 'react';
import { DragSource } from 'react-dnd';

const source = {
	beginDrag(props) {
		return props;
	},
	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) { return false; }
		var dropResult = monitor.getDropResult();
		if (!component.endDrag) { return; };
		component.endDrag(dropResult, monitor);
	}
};
const collect = (connect, monitor) => {
	return {
    connectDragSource: connect.dragSource(),
	  isDragging: monitor.isDragging()
	}
};

// class Wrapper extends React.Component {
// 	render() {
// 		const { connectDragSource, children } = this.props;
// 		return connectDragSource(<div {...this.props}>{children}</div>);
// 	}
// }
// class Draggable extends React.Component {
// 	render() {
// 		const { type, children } = this.props;
// 		const EnhancedComponent = DragSource(type, source, collect)(Wrapper);
// 		return <EnhancedComponent {...this.props}>{children}</EnhancedComponent>
// 	}
// }		

export default (type) => {
	return (Component) => {
		return DragSource(type, source, collect)(Component);
	};
};

