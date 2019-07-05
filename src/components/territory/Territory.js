import React from "react";
import CSSModules from "react-css-modules";

import styles from "./Territory.scss";

import { droppable } from "~/decorators";

@droppable(
  [
    "footman",
    "knight",
    "ship",
    "siege-engine",
    "power-token",
    "garrison-token",
    "neutral-force-token",
    "raid-order",
    "march-order",
    "support-order",
    "consolidation-order",
    "defense-order",
    "house-card"
  ],
  {
    canDrop(props, monitor) {
      console.log("canDrop", props);
      const item = monitor.getItem();
      switch (item.props.type) {
        case "neutral-force-token":
          return props.slug === item.props.territory;

        case "footman":
        case "knight":
        case "siege-engine":
          return (
            props.territoryType !== "Sea" && props.territoryType !== "Port"
          );

        case "ship":
          return (
            props.territoryType === "Sea" || props.territoryType === "Port"
          );

        default:
          return true;
      }
    }
  }
)
@CSSModules(styles)
export default class Territory extends React.Component {
  drop(monitor) {
    const piece = monitor.getItem();
    const result = monitor.getDropPosition();
    result.territory = this.props.slug;
    if (piece.props.type === "power-token") {
      result.available = false;
    }
    return result;
  }

  canDrop;

  render() {
    const props = this.props;
    const { connectDropTarget, isOver, canDrop } = props;
    let styleName = "territory";

    if (isOver) {
      styleName += `-${canDrop ? "actived" : "forbidden"}`;
    }

    return connectDropTarget(
      <g id={props.slug} styleName={styleName}>
        <path d={props.boundaries} />
      </g>
    );
  }
}
