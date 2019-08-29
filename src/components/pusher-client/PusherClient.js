import React from "react";
import Pusher from "pusher-js";
import normalize from "json-api-normalizer";
import _ from "lodash";

import { connect, actions } from "~/redux/tools";

import {
  update,
  bulkUpdate,
  receiveUpdatedCombat,
  resetCombat
} from "~/redux/actions/";

const camelCaseKeys = obj => {
  if (!_.isObject(obj)) {
    return obj;
  } else if (_.isArray(obj)) {
    return obj.map(v => camelCaseKeys(v));
  }
  return _.reduce(
    obj,
    (r, v, k) => {
      return {
        ...r,
        [_.camelCase(k)]: camelCaseKeys(v)
      };
    },
    {}
  );
};

@connect(
  (state, props) => ({
    gameId: state.current.gameId,
    houseName: state.current.house
  }),
  actions({ update, bulkUpdate, receiveUpdatedCombat, resetCombat })
)
export default class PusherClient extends React.Component {
  componentDidMount() {
    const pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: process.env.PUSHER_CLUSTER
    });
    const channel = pusher.subscribe("game");

    channel.bind("update", data => {
      let obj = camelCaseKeys(data);
      this.props.update(obj);
    });

    channel.bind("bulk_update", bulk => {
      const json = JSON.parse(bulk.payload);
      const data = normalize(json);
      this.props.bulkUpdate(bulk.type, data);
    });

    channel.bind("combat", data => {
      const { attributes, game_id, house_name } = data;
      const { gameId: currentGameId, houseName: currentHouseName } = this.props;

      if (game_id === currentGameId && house_name === currentHouseName) {
        // Same user that triggered pusher, so don't dispatch again!
        return;
      }

      if (attributes.reset) {
        return this.props.resetCombat(attributes.id, house_name, false);
      }

      this.props.receiveUpdatedCombat(attributes, false);
    });
  }

  render() {
    return null;
  }
}
