import React from "react";
import CSSModules from "react-css-modules";
import { draggable, droppable } from "~/decorators";
import { connect, actions, build } from "~/redux/tools";

import { resetCombat, updateCombat } from "~/redux/actions/";

import HouseCard from "../house-card/HouseCard";

import styles from "./Combat.scss";

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

// TODO:
// * Reducer being called 3 times!!!
// * When drag a card, only fill attacker space;
// * Show chosen card flipped to all opponents;
// * Reveal button;
// * Used card or return cards to war-room?

const defaultPosition = () => {
  const combatWindowWidth = styles.combatAreaWidth.replace("px", "");
  const combatWindowHeight = styles.combatAreaHeight.replace("px", "");
  const x = (window.innerWidth - combatWindowWidth) / 2;
  const y = (window.innerHeight - combatWindowHeight) / 2;
  return { x, y };
};

@connect(
  (state, props) => {
    const attacker = build(state.combat, "attacker");
    const defender = build(state.combat, "defender");

    return {
      attacker: attacker && attacker[0],
      defender: defender && defender[0],
      started: state.combat.started,
      gameId: state.current.gameId,
      houseName: state.current.house
    };
  },
  actions({ resetCombat, updateCombat })
)
@droppable(["house-card"])
@draggable("combat")
@CSSModules(styles)
export default class Combat extends React.Component {
  state = {
    ...defaultPosition()
  };

  endDrag(monitor) {
    const { x, y } = monitor.getDropResult();
    this.setState({ x, y });
  }

  close() {
    this.props.resetCombat(this.props.gameId, this.props.houseName);
  }

  open() {
    this.props.updateCombat({
      id: this.props.gameId,
      houseName: this.props.houseName,
      started: true
    });
  }

  getVisibility() {
    let isVisible = this.props.started;
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
    const choosenCard = { id, name, houseName };
    this.props.updateCombat({
      id: this.props.gameId,
      choosenCard,
      started: this.props.started
    });
    return {
      ...droppedItemPosition,
      territory: null
    };
  }

  render() {
    const {
      connectDragSource,
      isDragging,
      connectDropTarget,
      isOver,
      attacker,
      defender,
      started
    } = this.props;
    const { x, y } = this.state;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
      visibility: this.getVisibility()
    };

    return (
      <div>
        {started ? (
          connectDragSource(
            connectDropTarget(
              <div
                styleName="combat"
                data-dragging={isDragging}
                data-dragging-over={isOver || null}
                style={style}
              >
                {started ? (
                  <button onClick={() => this.close()}>Fechar</button>
                ) : null}
                <section styleName="combat-area">
                  <section styleName="combat-attacker-area">
                    {attacker && (
                      <HouseCard
                        name={attacker.name}
                        houseName={attacker.houseName}
                      />
                    )}
                  </section>

                  <section styleName="combat-defender-area">
                    {defender && (
                      <HouseCard
                        name={defender.name}
                        houseName={defender.houseName}
                      />
                    )}
                  </section>
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
