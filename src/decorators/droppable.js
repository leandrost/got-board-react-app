import { DropTarget } from "react-dnd";

const specs = {
  drop(props, monitor, component) {
    const wrappedComponent = component.decoratedComponentInstance || component;
    if (!wrappedComponent.drop) {
      return props;
    }
    const offset = monitor.getSourceClientOffset();
    console.log("this is diff: offset", offset);
    monitor.getDropPosition = () => {
      return getPosition(offset);
    };
    return wrappedComponent.drop(monitor);
  }
};
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
};

const getPosition = offset => {
  return {
    x: window.pageXOffset + offset.x,
    y: window.pageYOffset + offset.y
  };
};

export default (type, customSpecs) => {
  const dropSpecs = { ...specs, ...customSpecs };
  return Component => {
    return DropTarget(type, dropSpecs, collect)(Component);
  };
};
