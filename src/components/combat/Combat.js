import React from "react";
import CSSModules from "react-css-modules";
import { droppable } from "~/decorators";
import { connect, actions } from "~/redux/tools";

import Pieces from "~/components/pieces/Pieces";
import HouseCard from "~/components/house-card/HouseCard";

import { updateCombat } from "~/redux/actions/";

import styles from "./Combat.scss";

@connect(
  (state, props) => ({
    //game: build(state, 'games', props.gameId) || {},
  }),
  actions({ updateCombat })
)
@droppable(["house-card"])
@CSSModules(styles)
export default class Combat extends React.Component {
  drop(monitor) {
    const {
      props: { id, name, houseName }
    } = monitor.getItem();
    const result = monitor.getDropPosition();
    const piece = { id, name, houseName };
    console.log("drop: drop in combat", result);
    console.log("drop: piece", piece);
    this.props.updateCombat({ piece, result });
    return result;
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
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div styleName="combat">
        <section>
          <Pieces
            piece={HouseCard}
            collection="combat"
            steady
            filter={piece => true} // No filter
          />
        </section>
      </div>
    );
  }
}
