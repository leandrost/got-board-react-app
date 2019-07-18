import React from "react";
import CSSModules from "react-css-modules";
import styles from "./Game.scss";

import { droppable } from "~/decorators";
import Board from "~/components/board/Board";
import WarRoom from "~/components/war-room/WarRoom";
import Combat from "~/components/combat/Combat";
import { connect, build, actions } from "~/redux/tools";
import { fetchGame } from "~/redux/actions";

@connect(
  state => ({
    game: (build(state, `games`) || [])[0]
  }),
  actions({ fetchGame })
)
@droppable(["war-room", "combat"])
@CSSModules(styles)
export default class Game extends React.Component {
  componentDidMount() {
    const arr = window.location.search.split("=");
    window.gameId = arr[arr.length - 1];
    this.props.fetchGame(window.gameId);
  }

  drop(monitor) {
    return monitor.getDropPosition();
  }

  render() {
    const { game, connectDropTarget } = this.props;
    return connectDropTarget(
      <div styleName="app">
        <Board game={game} />
        <aside>
          <div styleName="iron-throne-token" />
          <div styleName="valyrian-steel-blade-token" />
          <div styleName="mensseger-raven-token" />
        </aside>
        <WarRoom visible={true} />
      </div>
    );
  }
}
