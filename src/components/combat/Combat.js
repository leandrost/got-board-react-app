import React from "react";
import CSSModules from "react-css-modules";
import { draggable, droppable } from "~/decorators";
import { connect, actions } from "~/redux/tools";

import Pieces from "~/components/pieces/Pieces";
import HouseCard from "~/components/house-card/HouseCard";

import { updateCombat } from "~/redux/actions/";

import styles from "./Combat.scss";

const DEFAULT_POSITION = { x: 30, y: 30 };

@connect(
  (state, props) => ({
    //game: build(state, 'games', props.gameId) || {},
  }),
  actions({ updateCombat })
)
@droppable(["house-card"])
@draggable("combat")
@CSSModules(styles)
export default class Combat extends React.Component {
  state = {
    isVisible: this.props.visible || false,
    DEFAULT_POSITION
  };

  endDrag(monitor) {
    const { x, y } = monitor.getDropResult();
    console.log({ x, y });
    this.setState({ x, y });
  }

  close() {
    this.setState({ isVisible: false });
  }

  open() {
    this.setState({ isVisible: true });
  }

  getVisibility() {
    let isVisible = this.state.isVisible;
    if (this.props.isDragging) {
      isVisible = false;
    }
    return isVisible ? "" : "hidden";
  }

  drop(monitor) {
    const {
      props: { id, name, houseName }
    } = monitor.getItem();
    const droppedItemPosition = monitor.getDropPosition();
    const piece = { id, name, houseName };
    console.log("drop: piece", piece);
    this.props.updateCombat({ piece, droppedItemPosition });
    return {
      ...droppedItemPosition,
      territory: null
    };
  }

  // 1. when combat is initiated, shows combat modal to all players;
  // 2. attacker drags a card into combat modal (left side placeholder);
  // 3. when the attacker drops a card, his house symbol shows as attacker;
  // 4. combat component drop indentifies attacker card;
  // 5. show button to attacker set if he is ready;
  // 6. attacker clicks button to set that he is ready;
  // 7. his picked card is "locked" to the combat modal;
  // 8. if the defender is still deciding, the attacker card is locked
  // and in "waiting mode";
  // 9. when the defender drop his card and set as ready, the cards are revealed;
  // 10. A "end combat" button shows and when it's clicked, destroys the modal and resets it's state.

  render() {
    const {
      connectDragSource,
      isDragging,
      connectDropTarget,
      isOver
    } = this.props;
    const { x, y } = this.state;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
      visibility: this.getVisibility()
    };

    console.log("x, y", { x, y });

    return (
      <div>
        {this.state.isVisible ? (
          connectDragSource(
            connectDropTarget(
              <div
                styleName="combat"
                data-dragging={isDragging}
                data-dragging-over={isOver || null}
                style={style}
              >
                {this.state.isVisible ? (
                  <button onClick={() => this.close()}>Fechar</button>
                ) : null}
                <section>
                  <Pieces
                    piece={HouseCard}
                    collection="combat"
                    steady
                    filter={piece => true} // No filter
                  />
                </section>
              </div>
            )
          )
        ) : (
          <button styleName="combat-button" onClick={() => this.open()}>
            Combat
          </button>
        )}
      </div>
    );
  }
}
